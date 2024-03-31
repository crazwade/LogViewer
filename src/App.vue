<template>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';

console.log(`版本號: ${import.meta.env.VITE_APP_VERSION}`);

</script>

<style lang="scss">
html,
body,
#app {
  height: 100%;
}
</style>
