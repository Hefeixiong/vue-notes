<template>
  <div id="app">
    <sidebar></sidebar>
    <router-view/>
  </div>
</template>

<script>
import sidebar from '@/components/Sidebar.vue'
export default {
  name: 'App',
  components: {
    sidebar
  }
}
</script>

<style>
@import '//at.alicdn.com/t/font_496303_kqrjhri8l25d0a4i.css';
#app {
  height: 100%;
  display: flex;
  align-items: stretch;
}
</style>
