<template>
  <el-menu
    router
    :defaultActive="firstRoute.path"
  >
    <el-menu-item :index="routeMap[RouteName.Home].path">
      Home
    </el-menu-item>
    <el-menu-item-group title="Nlog">
      <el-menu-item
        :index="routeMap[RouteName.Nlog].path"
      >
        log歷史資料查詢
      </el-menu-item>
    </el-menu-item-group>
    <el-menu-item-group title="Stopwatch">
      <el-menu-item
        :index="routeMap[RouteName.StopwatchRealtimeData].path"
      >
        即時統計資料
      </el-menu-item>
    </el-menu-item-group>
  </el-menu>
</template>

<script setup lang="ts">
import { RouteRecordNormalized } from 'vue-router';
import { RouteName } from '@/router/types';

const firstRoute = useRoute();
const routeMap = useRouter().getRoutes().reduce((map, route) => ({
  ...map,
  [route.name as RouteName]: route,
}), {} as Record<RouteName, RouteRecordNormalized>);
</script>

<style scoped>

.el-menu-item {
  padding-left: 30px !important;
}
</style>
