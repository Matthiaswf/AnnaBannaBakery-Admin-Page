<template>
  <div class="app-container">
    <side-bar-view />
    <router-view class="router-view" />
  </div>
</template>

<script>
import SideBarView from './views/SideBarView.vue';

export default {
  components: {
    SideBarView,
  },
};
</script>

<style>
.app-container {
  display: flex;
  height: 100vh;
  width: 100vw;
}
.router-view {
  flex: 1;
  padding: 20px;
}
</style>
