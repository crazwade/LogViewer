<template>
  <div>
    <div class="h-[calc(100vh-60px-20px)] w-full">
      <el-auto-resizer>
        <template #default="{ height, width }">
          <el-table-v2
            :columns="columns"
            :data="props.data"
            :row-class="rowClass"
            :width="width"
            :height="height"
            :estimatedRowHeight="35"
            :headerHeight="18"
            :footerHeight="28"
            headerClass="text-[14px] "
            fixed
            :row-event-handlers="{ onDblclick: getRowData }"
            :scrollbar-always-on="true"
            @endReached="handleEndReached"
            ref="tableRef"
          >
            <template #empty>
              <div class="flex items-center justify-center h-100%">
                <el-empty
                  :description="noDataInfo"
                />
              </div>
            </template>
            <template #footer>
              <el-button
                class="mt-1"
                size="small"
                @click="handleEndReached"
              >
                讀取更多
              </el-button>
            </template>
          </el-table-v2>
        </template>
      </el-auto-resizer>
    </div>

  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import { ElTableV2, RowEventHandlerParams } from 'element-plus';
import type { Column, RowClassNameGetter } from 'element-plus';

const props = defineProps<{
  data: any[];
  respType: 'none' | 'success' | 'error' | 'timeOut';
}>();
const tableRef = ref<InstanceType<typeof ElTableV2> | null>(null);

const emit = defineEmits(['fetchNextPage', 'openDialog']);

/** 卷軸滑到底需要fetch下一頁的資料 */
const handleEndReached = () => {
  emit('fetchNextPage');
};

const getRowData = (row: RowEventHandlerParams) => {
  emit('openDialog', row.rowData);
};

const noDataInfo = computed(() => {
  switch (props.respType) {
    case 'error':
      return 'Fetch Error';
    case 'timeOut':
      return 'Timeout';
    case 'success':
      return 'Success No Data';
    case 'none':
    default:
      return 'No Data';
  }
});

// table columns 資料
const columns: Column[] = [
  {
    key: 'id',
    dataKey: 'id',
    title: '資料ID',
    width: 80,
    align: 'center',
  },
  {
    key: 'createtime',
    dataKey: 'createtime',
    title: '創建時間',
    width: 140,
    align: 'center',
  },
  {
    key: 'pid',
    dataKey: 'pid',
    title: 'pid',
    width: 65,
    align: 'center',
  },
  {
    key: 'level',
    dataKey: 'level',
    title: 'level',
    width: 50,
    align: 'center',
  },
  {
    key: 'source',
    dataKey: 'source',
    title: '來源',
    width: 250,
    align: 'center',
  },
  {
    key: 'message',
    dataKey: 'message',
    title: '訊息',
    width: 1000,
    align: 'left',
  },
  {
    key: 'ip',
    dataKey: 'ip',
    title: 'IP',
    width: 120,
    align: 'center',
  },
  {
    key: 'cn',
    dataKey: 'cn',
    title: 'CN',
    width: 250,
    align: 'center',
  },
  {
    key: 'log_state',
    dataKey: 'log_state',
    title: '資料狀態',
    width: 75,
    align: 'center',
  },
  {
    key: 'log_time',
    dataKey: 'log_time',
    title: '伺服器紀錄時間',
    width: 155,
    align: 'center',
  },
  {
    key: 'table',
    dataKey: 'table',
    title: '資料表',
    width: 120,
    align: 'center',
  },
];

const rowClass = (
  { rowIndex }: Parameters<RowClassNameGetter<any>>[0],
) => {
  const getLevel = props.data[rowIndex].level;

  switch (getLevel) {
    case '100':
      return 'text-[#01FF2F]';
    case '99':
      return 'text-[#0c5]';
    case '98':
      return 'text-[#0a4]';
    case '97':
      return 'text-[#093]';
    case '96':
      return 'text-[#072]';
    case '70':
      return 'text-[#FFCC53]';
    case '50':
      return 'text-[#FF1212]';
    case '103':
      return 'text-[#ad81ca]';
    case '101':
    case '102':
    case '104':
    case '105':
    case '106':
    case '107':
    case '108':
    case '109':
      return 'text-[#45AED0]';
    case '111':
      return 'text-[#9fa0cd]';
    case '110':
    case '150':
      return 'text-[#888888]';
    default:
      return 'text-[#FFFFF]';
  }
};

// 在重新設置表格數據後，滾動到頂部
const resetTableScrollbar = () => {
  (tableRef.value as any)?.scrollToTop(0);
};

defineExpose({ tableRef, resetTableScrollbar });

</script>

<style scoped lang="scss">

:deep(.el-table-v2__cell-text) {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>
