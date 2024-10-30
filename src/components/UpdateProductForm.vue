<template>
  <form @submit.prevent="handleUpdate">
    <h4>Edit Product</h4>

    <label>Name:</label>
    <input type="text" v-model="name" />

    <label>Price</label>
    <input type="number" v-model="price" class="price" step="0.01" />
    <label for="category">Category</label>
    <select v-model="category">
      <option v-for="category in categories" :key="category" :value="category">
        {{ category }}
      </option>
    </select>

    <button v-if="!isPending">Update Product</button>
    <button v-else disabled>Updating Product...</button>
    <button type="button" @click="$emit('changeEditMode')">Cancel</button>
  </form>
</template>

<script>
import useDocument from '@/utils/useDocument';
import { ref } from 'vue';

export default {
  props: ['product'],
  setup(props, context) {
    const categories = [
      'Cookies',
      'Bars',
      'Fudge',
      'Scones',
      'Loaf',
      'Cookie Dough',
      'Special',
    ];

    const { isPending, updateDoc } = useDocument('products', props.product.id);
    const name = ref(props.product.name);
    const price = ref(props.product.price);
    const category = ref(props.product.category);

    const handleUpdate = async () => {
      await updateDoc({
        name: name.value,
        price: price.value,
        category: category.value,
      });
      context.emit('changeEditMode');
    };

    return {
      name,
      price,
      category,
      categories,
      handleUpdate,
      isPending,
    };
  },
};
</script>

<style scoped>
h4 {
  margin: 0;
}

form {
  margin-top: 60px;
  max-width: 400px;
  height: fit-content;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
label {
  display: block;
  margin-top: 10px;
}
label span {
  display: block;
  margin-bottom: 6px;
}
input,
textarea {
  padding: 8px 6px;
  font-size: 1em;
  color: black;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 4px;
}
textarea {
  min-height: 160px;
  resize: none;
}
select {
  padding: 8px 6px;
  margin-top: 1px;
  font-size: 1em;
  color: black;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 4px;
}
button {
  padding: 8px 12px;
  font-size: 1em;
  color: white;
  background: #333;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
}
button:disabled {
  background: #ddd;
  color: #777;
}

.instruction {
  font-size: 0.8em;
  color: #777;
  margin-top: 1px;
  padding: 0;
}

.error {
  color: red;
  background: pink;
  border: 1px solid red;
  border-radius: 4px;
  padding: 8px;
  margin: 10px 0;
}
</style>
