<template>
  <div
    v-loading="isLoading"
    class="w-fit bg-[#414141]"
  >
    <div v-html="tableHtml" />
  </div>
</template>

<script setup lang="ts">
import getReport from '@/api/stopwatchRealtimeData/getReport';

const isLoading = ref(false);

const tableHtml = ref();

async function getData() {
  const res = await getReport();
  console.log(res);
  tableHtml.value = res.data;
}

onMounted(() => {
  getData();
});

</script>
