<template>
  <el-row>
    <el-space>
      <el-image style="width: 50px; height: 50px" :src="'../../../Icon.jpeg'" />
      <span class="text-[32px]">LogViewer</span>
    </el-space>
    <!-- <el-space>
        <span class="text-[32px]">{{'現在時間 :' + ' ' + currentTime }}</span>
      </el-space> -->
  </el-row>
</template>
<script setup lang="ts">
import { ref, watchEffect } from 'vue';

// 定義一個 ref 來保存當前時間
const currentTime = ref('');

// 定義一個函數來更新時間
const updateTime = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  currentTime.value = `${hours}:${minutes}:${seconds}`;
  setTimeout(() => {
    updateTime();
  }, 1000);
};

watchEffect(() => {
  updateTime();
});

</script>

<style scoped lang="scss">
</style>
