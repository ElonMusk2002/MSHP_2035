<template>
  <div class="custom-scroll-bar">
    <SiteHeader v-if="$route.path !== '/'" />
    <RouterView />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import SiteHeader from './components/SiteHeader.vue';

</script>

<style>
* {
  scrollbar-width: thin;
  scrollbar-color: #333 #F5F5F5;
}

/* Works on Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 12px;
}

*::-webkit-scrollbar-track {
  background: #F5F5F5;
}
.element::-webkit-scrollbar {
  width: 0;
  background: transparent;
}

*::-webkit-scrollbar-thumb {
  background-color: #333;
  border-radius: 10px;
  border: 3px solid #F5F5F5;
}

</style>