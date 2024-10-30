<template>
  <form @submit.prevent="handleSubmit">
    <h3>Login</h3>
    <input type="email" placeholder="email" v-model="email" />
    <input type="password" placeholder="password" v-model="password" />
    <div class="error" v-if="error">{{ error }}</div>
    <button type="submit" v-if="!isPending">Login</button>
    <button type="submit" disabled v-else>Loading...</button>
  </form>
</template>

<script>
import useLogin from '@/utils/useLogin';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

export default {
  setup() {
    const { error, login, isPending } = useLogin();

    const router = useRouter();
    const email = ref('');
    const password = ref('');

    const handleSubmit = async () => {
      const res = await login(email.value, password.value);
      if (!error.value) {
        router.push('/orders');
      }
      isPending.value = false;
    };

    return { email, password, handleSubmit, error, isPending };
  },
};
</script>

<style scoped>
form {
  max-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
input {
  border-radius: 50px;
  height: 2rem;
  padding-left: 0.5rem;
}
button {
  border-radius: 50px;
  max-width: 100px;
  height: 2rem;
  background-color: var(--primary);
  color: white;
  font-weight: bold;
  cursor: pointer;
}
.error {
  color: red;
}
</style>
