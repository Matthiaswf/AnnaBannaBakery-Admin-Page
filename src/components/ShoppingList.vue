<template>
  <div class="shopping-list-container">
    <h2>Shopping List</h2>
    <div v-if="!order || !order.cart || order.cart.length === 0">
      <p>No items in the cart</p>
    </div>
    <div class="ingredient-list-container">
      <div v-if="order && order.cart">
        <div
          v-for="(ingredient, name) in aggregatedIngredients"
          :key="name"
          class="ingredient"
        >
          <div class="name">{{ name }}</div>
          <div class="quantity">
            {{ ingredient.quantity.toFixed(2) }} {{ ingredient.unit }}
          </div>
        </div>
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

<style scoped>
.shopping-list-container {
  margin-top: 20px;
}
h2 {
  margin-bottom: 10px;
}
.ingredient-list-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.ingredient {
  display: flex;
  align-items: left;
  justify-content: space-between;
  gap: 10px;
  border: 1px solid #ccc;
  padding: 10px;
}
.name {
  width: 100px;
}
.quantity {
  width: 100px;
  text-align: right;
}
</style>
