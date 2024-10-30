<template>
  <div class="products-container">
    <h1>Products</h1>
    <div class="is-pending-message" v-if="isPending">Loading Products...</div>
    <div
      v-if="!isPending && Object.keys(groupedProducts).length === 0"
      class="no-products-text"
    >
      No Products found
    </div>
    <div class="product-list">
      <div v-for="(group, category) in groupedProducts" :key="category">
        <h4>{{ category }}</h4>
        <div v-for="item in group" :key="item.id" class="product">
          <span class="name"> {{ item.name }}</span>
          <span class="price">${{ Number(item.price).toFixed(2) }}</span>
          <router-link :to="{ name: 'product', params: { id: item.id } }">
            <span class="material-symbols-outlined"> info </span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CreateProductForm from '@/components/CreateProductForm.vue';
import getCollection from '@/utils/getCollection';
import { computed } from 'vue';
import { ref } from 'vue';
import { watchEffect } from 'vue';

export default {
  setup() {
    const isPending = ref(false);
    const { documents: products } = getCollection('products');

    // Watch for changes in the products collection
    watchEffect(() => {
      isPending.value = !products.value;
    });

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
      groupedProducts,
      isPending,
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
.product-list {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  max-width: 1600px;
  gap: 20px;
}
.name {
  width: 400px;
}
.price {
  width: 100px;
}
.material-symbols-outlined {
  font-size: 24px;
  padding: 0;
  color: var(--highlight-light);
}
a {
  text-decoration: none;
  padding: 0;
  margin: 0;
}
.is-pending-message {
  font-size: 2rem;
  margin-top: 20px;
  padding-left: 5px;
}
.no-products-text {
  font-size: 20px;
  margin-top: 20px;
  padding-left: 5px;
}
</style>
