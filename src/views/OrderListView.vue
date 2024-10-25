<template>
  <div>
    <h1>Hello</h1>
    <div v-for="item in orders" :key="item.id">
      <div>{{ item.id }}</div>
      <div>{{ item.status }}</div>
    </div>
  </div>
</template>

<script>
import getCollection from '@/utils/getCollection';
export default {
  setup() {
    const { documents: orders } = getCollection('orders');
    return {
      orders,
    };
  },
};
</script>

<style scoped></style>
