<template>
  <div>
    <h1>Hello</h1>
    <div v-for="item in products" :key="item.id">
      <div>{{ item.id }}</div>
    </div>
  </div>
</template>

<script>
import getCollection from '@/utils/getCollection';
export default {
  setup() {
    const { documents: products } = getCollection('products');
    return {
      products,
    };
  },
};
</script>

<style scoped></style>
