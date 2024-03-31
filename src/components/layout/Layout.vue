<template>
  <el-container
    class="
        h-full
      "
  >
    <el-header class="bg-[#0c7098] flex items-center">
      <Header />
    </el-header>
    <el-container
      class="
          h-full
          overflow-clip
        "
    >
      <el-aside
        :width="'200px'"
        class="bg-[#242825]"
      >
        <ElScrollbar>
          <Navigation />
        </ElScrollbar>
      </el-aside>
      <el-main class="bg-[#000] !p-0">
        <el-scrollbar>
          <div class="p-[20px] w-full h-full">
            <PageHeader :title="$route.name" class="mb-2" />
            <RouterView />
          </div>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import Navigation from './Navigation.vue';
import Header from './Header.vue';
import PageHeader from './PageHeader.vue';

</script>

<style scoped lang="scss">

</style>
