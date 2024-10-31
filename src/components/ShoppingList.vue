<template>
  <div class="shopping-list-container">
    <h2>Shopping List</h2>
    <div v-if="order && order.cart">
      <div v-for="(ingredient, name) in aggregatedIngredients" :key="name">
        {{ name }}: {{ ingredient.quantity }} {{ ingredient.unit }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['order'],
  computed: {
    aggregatedIngredients() {
      const ingredientsMap = {};
      if (this.order && this.order.cart) {
        this.order.cart.forEach((product) => {
          product.ingredients.forEach((ingredient) => {
            const totalQuantity = ingredient.quantity * product.quantity;
            if (ingredientsMap[ingredient.name]) {
              ingredientsMap[ingredient.name].quantity += totalQuantity;
            } else {
              ingredientsMap[ingredient.name] = {
                quantity: totalQuantity,
                unit: ingredient.unit,
              };
            }
          });
        });
      }
      return ingredientsMap;
    },
  },
};
</script>

<style scoped></style>

<style scoped></style>
