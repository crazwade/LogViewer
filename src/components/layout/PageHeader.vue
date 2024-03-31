<template>
  <h1>{{ title }}</h1>
</template>

<script setup lang="ts">
import { RouteRecordName } from 'vue-router';

defineProps<{
  title: RouteRecordName | null | undefined;
}>();

</script>

<style scoped lang="scss">

</style>
