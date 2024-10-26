<template>
  <div class="sidebar-container">
    <div class="greeting">
      <img src="../assets/welcomePic.png" alt="welcome picture" />
      <span class="welcome-message">Welcome back Anna !</span>
    </div>
    <div class="links">
      <ul>
        <li>
          <router-link to="/orders" active-class="active-link"
            >Orders</router-link
          >
        </li>
        <li>
          <router-link to="/products" active-class="active-link"
            >Products</router-link
          >
        </li>
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
  color: var(--text);
  margin-top: 10px;
  margin-bottom: 10px;
}
.links li {
  margin-top: 10px;
}
.links a {
  display: flex;
  padding: 10px;
  padding-left: 20px;
  text-decoration: none;
  width: 100%;
  box-sizing: border-box;
  color: var(--text);
}
.links a {
  text-decoration: none;
}

.links a.active-link {
  background-color: var(--background);
  border-radius: 20px 0 0 20px;
  color: var(--primary);
}
</style>
