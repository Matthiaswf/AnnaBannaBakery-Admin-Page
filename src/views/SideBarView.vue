<template>
  <div class="sidebar-container">
    <div class="greeting">
      <img src="../assets/welcomePic.png" alt="welcome picture" />
      <span class="welcome-message">Welcome back Anna !</span>
    </div>
    <div class="links">
      <ul>
        <li>
          <router-link to="/orders">Orders</router-link>
        </li>
        <li></li>
        <li></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  setup() {
    return {};
  },
};
</script>

<style scoped>
.sidebar-container {
  width: 300px;
  height: 100%;
  background-color: var(--highlight-dark);
}

.greeting {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  padding: 40px 30px;
  border-bottom: 1px solid #fff3;
}

img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.welcome-message {
  font-size: 20px;
  color: var(--white);
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
