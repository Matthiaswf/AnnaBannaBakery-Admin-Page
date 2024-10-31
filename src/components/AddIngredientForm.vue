<template>
  <form @submit.prevent="handleSubmit">
    <h4>Add ingredient</h4>
    <input type="text" placeholder="Ingredient" v-model="name" />
    <input type="number" placeholder="Quantity" v-model="quantity" />
    <input type="text" placeholder="Unit" v-model="unit" />
    <button>Add Ingredient</button>
  </form>
</template>

<script>
import { ref } from 'vue';
import useDocument from '@/utils/useDocument';
export default {
  props: ['product'],
  setup(props) {
    const { updateDoc } = useDocument('products', props.product.id);
    const name = ref('');
    const quantity = ref('');
    const unit = ref('');

    const handleSubmit = async () => {
      const newIngredient = {
        name: name.value,
        quantity: quantity.value,
        unit: unit.value,
      };

      await updateDoc({
        ingredients: [...props.product.ingredients, newIngredient],
      });
      name.value = '';
      quantity.value = '';
      unit.value = '';
    };

    return {
      name,
      quantity,
      unit,
      handleSubmit,
    };
  },
};
</script>

<style scoped>
form {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  padding-bottom: 5px;
  border-bottom: 1px solid #ccc;
}
h4 {
  margin: 0;
}
input {
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  max-width: 80px;
  height: 12px;
}
button {
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background-color: #333;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
