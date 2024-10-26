<template>
  <div class="app-container">
    <SideBarView class="sidebar-view" />
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
  overflow: auto;
}
.router-view {
  flex: 1;
  padding: 20px;
  height: auto;
  margin-left: 60px;
  margin-bottom: 0;
  padding-bottom: 0;
}
.sidebar-view {
  position: -webkit-sticky; /* For Safari */
  position: sticky;
  top: 0;
  height: 100vh;
}
</style>
