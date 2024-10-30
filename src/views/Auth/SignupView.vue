<template>
  <form @submit.prevent="handleSubmit">
    <h3>Signup</h3>
    <input type="text" placeholder="Displayname" v-model="displayname" />
    <input type="email" placeholder="Email" v-model="email" />
    <input type="password" placeholder="Password" v-model="password" />
    <div class="error" v-if="error">{{ error }}</div>
    <button type="submit" v-if="!isPending">Signup</button>
    <button type="submit" v-if="isPending" disable>Loading...</button>
  </form>
</template>

<script>
import { ref } from 'vue';
import useSignup from '@/utils/useSignup';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const { error, signup, isPending } = useSignup();

    const email = ref('');
    const password = ref('');
    const displayname = ref('');
    const router = useRouter();

    const handleSubmit = async () => {
      const res = await signup(email.value, password.value, displayname.value);
      if (!error.value) {
        router.push('/');
      }
    };

    return { email, password, displayname, isPending, error, handleSubmit };
  },
};
</script>

<style></style>
