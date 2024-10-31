<template>
  <div class="ingredients-list-container">
    <h3>Ingredients</h3>
    <AddIngredientForm :product="product" />
    <div class="ingredient-list">
      <div
        v-for="ingredient in product.ingredients"
        :key="ingredient.name"
        class="ingredient"
      >
        <p class="name">{{ ingredient.name }}</p>
        <p class="quantity">{{ ingredient.quantity }}</p>
        <p class="unit">{{ ingredient.unit }}</p>
        <div class="icons">
          <i class="material-icons" @click="removeIngredient(ingredient)"
            >delete</i
          >
        </div>
      </div>
      <div
        v-if="
          product && product.ingredients && product.ingredients.length === 0
        "
      >
        No ingredients found.
      </div>
    </div>
  </div>
</template>

<script>
import AddIngredientForm from './AddIngredientForm.vue';
import useDocument from '@/utils/useDocument';
export default {
  components: {
    AddIngredientForm,
  },
  props: ['product'],
  setup(props) {
    const { updateDoc } = useDocument('products', props.product.id);

    const removeIngredient = async (ingredient) => {
      const newIngredients = props.product.ingredients.filter(
        (i) => i.name !== ingredient.name
      );
      await updateDoc({
        ingredients: newIngredients,
      });
    };

    return {
      AddIngredientForm,
      removeIngredient,
    };
  },
};
</script>

<style scoped>
.ingredients-list-container {
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: flex-start;
  margin-top: 2rem;
  max-width: fit-content;
}
.ingredient-list {
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: flex-start;
  max-width: fit-content;
  margin-top: 10px;
}
.ingredient {
  display: flex;
  align-items: left;
  justify-content: flex-start;
  gap: 1rem;
  padding: 10px;
  padding-bottom: 1px;
  border-bottom: 1px solid #ccc;
}
.name {
  margin: 0;
  width: 200px;
}
.quantity {
  margin: 0;
  width: 50px;
}
.unit {
  margin: 0;
  width: 50px;
}
.icons {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
</style>
