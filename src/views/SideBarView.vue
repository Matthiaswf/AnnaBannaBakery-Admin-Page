<template>
  <div class="sidebar-container">
    <div class="greeting">
      <img src="../assets/welcomePic.png" alt="welcome picture" />
      <span class="welcome-message" v-if="!user"
        >Hello there, please log in
      </span>
      <span class="welcome-message" v-if="user">Welcome back Anna !</span>
      <div class="logout" @click="handleLogout" v-if="user">
        <span class="material-symbols-outlined"> logout </span>
        <span class="logout-text">Logout</span>
      </div>
    </div>
    <div class="links" v-if="user">
      <ul>
        <li>
          <router-link to="/orders" active-class="active-link">
            <img
              src="../assets/dashboard_icon.svg"
              alt="dashboard icon"
              class="icon"
            />
            Orders
          </router-link>
        </li>
        <li>
          <router-link to="/products" active-class="active-link">
            <img
              src="../assets/dashboard_icon.svg"
              alt="dashboard icon"
              class="icon"
            />
            Products
          </router-link>
        </li>
        <li>
          <router-link to="/products/create" active-class="active-link">
            <img
              src="../assets/add_icon.svg"
              alt="dashboard icon"
              class="icon"
            />
            Create Product
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import getUser from '@/utils/getUser';
import useLogout from '@/utils/useLogout';
import router from '@/router';
export default {
  setup() {
    const { user } = getUser();
    const { logout } = useLogout();

    const handleLogout = async () => {
      await logout();
      router.push('/login');
    };
    return {
      handleLogout,
      user,
    };
  },
};
</script>

<style scoped>
.sidebar-container {
  width: 300px;
  height: 100vh;
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
  align-items: center;
  padding: 10px;
  padding-left: 20px;
  text-decoration: none;
  width: 100%;
  box-sizing: border-box;
  color: var(--text);
}
.links a img {
  width: 25px;
  height: 25px;
  margin-right: 20px;
  filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg) brightness(100%)
    contrast(100%);
}

.links a.active-link {
  background-color: var(--background);
  border-radius: 20px 0 0 20px;
  color: var(--primary);
}
.links a.active-link img {
  filter: brightness(0) saturate(100%) invert(92%) sepia(7%) saturate(2255%)
    hue-rotate(328deg) brightness(93%) contrast(86%);
}

.logout {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  text-decoration: none;
  width: 100%;
  box-sizing: border-box;
  color: var(--text);
}
.logout-text {
  cursor: pointer;
}
.material-symbols-outlined {
  width: 25px;
  height: 25px;
  cursor: pointer;
}
</style>
