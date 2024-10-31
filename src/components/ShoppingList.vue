<template>
  <div class="shopping-list-container">
    <h2>Shopping List</h2>
    <div
      v-if="order && order.cart"
      v-for="product in order.cart"
      :key="product.id"
    >
      <div v-for="ingredient in product.ingredients" :key="ingredient.id">
        {{ ingredient.name }}: {{ ingredient.quantity * product.quantity }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['order'],
};
</script>

<style scoped></style>
