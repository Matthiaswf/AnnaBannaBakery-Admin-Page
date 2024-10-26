<template>
  <div class="products-container">
    <h3>Products</h3>
    <div v-for="(group, category) in groupedProducts" :key="category">
      <h4>{{ category }}</h4>
      <div v-for="item in group" :key="item.id" class="product">
        <span class="name"> {{ item.name }}</span>
        <span class="price">${{ item.price }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import CreateProductForm from '@/components/CreateProductForm.vue';
import getCollection from '@/utils/getCollection';
import { computed } from 'vue';

export default {
  setup() {
    const { documents: products } = getCollection('products');

    const groupedProducts = computed(() => {
      if (!products.value) return {};
      return products.value.reduce((acc, product) => {
        const category = product.category || 'Uncategorized';
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(product);
        return acc;
      }, {});
    });

    return {
      products,
      groupedProducts,
    };
  },
};
</script>

<style scoped>
.products-container {
  padding: 10px;
  margin-left: 60px;
}
h3 {
  margin: 0;
}
.product {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 1px solid #ccc;
  margin: 10px 0;
  max-width: 400px;
  gap: 80px;
}
.name {
  width: 400px;
}
.price {
  width: 100px;
}
</style>
