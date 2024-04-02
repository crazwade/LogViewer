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
  isLoading.value = true;

  const res = await getReport();

  tableHtml.value = res.data;

  isLoading.value = false;
}

onMounted(() => {
  getData();
});

</script>
