<template>
  <div v-loading="isLoading">
    <NlogDialog
      :data="dialogData"
      v-model:dialog-control="dialogControl"
    />
    <SearchBar
      :sourceOption="nlogStore.sourceOptions"
      :cnOption="nlogStore.cnOptions"
      :ipOption="nlogStore.ipOptions"
      @submit="handleFormSubmit"
      @reset="reset()"
    />
    <el-divider class="!my-0" />
    <el-pagination
      v-model:page-size="pageSize"
      class="justify-end py-2"
      background
      layout="sizes"
      :total="pageSize"
      :page-sizes="Config.defaultPageSizeOption"
      @size-change="handleSizeChange"
    />
    <NlogTable
      :data="tableDataRef"
      :respType="tableRespTypeRef"
      @fetchNextPage="fetchLogs(undefined, true)"
      @openDialog="openDialogHandler"
      ref="tableRef"
    />
  </div>
</template>

<script setup lang="ts">
import NlogDialog from '@/components/Dialog/NlogDialog.vue';
import type { FindLogResponse, FindLogPayload } from '@/api/nlog/findLog';
import useNlogStore from './store/NlogStore';
import SearchBar from './components/SearchBar.vue';
import NlogTable from './components/NlogTable.vue';

const Config = {
  defaultPageSizeOption: [100, 500, 1000, 2000, 5000, 10000],
  defaultPageSize: 100,
  defaultPage: 1,
};

const nlogStore = useNlogStore();
const tableDataRef = ref<FindLogResponse[]>([]);
const tableRespTypeRef = ref< 'none' | 'success' | 'error' | 'timeOut'>('none');

const tableRef = ref<InstanceType<typeof NlogTable>>();
const dialogData = ref<FindLogResponse>();
const dialogControl = ref(false);
const pageSize = ref(Config.defaultPageSize);
const isLoading = ref(false);
const isEndofData = ref(false);

const fetchLogs = async (
  formData?: FindLogPayload,
  isNext: boolean = false,
) => {
  // 代表資料到底了
  if (isEndofData.value) return;

  isLoading.value = true;

  tableRespTypeRef.value = 'none';

  // 是否為第一次或是有更新payload內容
  const respData = isNext
    ? await nlogStore.getNextLogs()
    : await nlogStore.getLogs(formData!, pageSize.value, Config.defaultPage);

  tableRespTypeRef.value = respData.respType;

  // 檢查是否資料已經到底了
  if (respData.data.length < nlogStore.payload.limit!) {
    isEndofData.value = true;
  }

  tableDataRef.value = [...tableDataRef.value, ...respData.data];

  setTimeout(() => {
    isLoading.value = false;
  }, 500);
};

const reset = (pagesize: number | null = null) => {
  pageSize.value = pagesize ?? Config.defaultPageSize;
  tableDataRef.value = [];
  nlogStore.payload.page = Config.defaultPage;
  isEndofData.value = false;
  tableRef.value?.resetTableScrollbar();
};

const handleSizeChange = (val: number) => {
  reset(val);
};

const handleFormSubmit = (formData: FindLogPayload) => {
  reset(pageSize.value);
  fetchLogs(formData, false);
};

const openDialogHandler = (rowData: FindLogResponse) => {
  dialogData.value = rowData;
  dialogControl.value = true;
};

onMounted(() => {
  nlogStore.initOptions();
});

</script>

<style scoped>

</style>
