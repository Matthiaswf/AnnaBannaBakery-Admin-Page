<template>
  <div>Admin</div>
  <div class="add-product">
    <form @submit.prevent="handleSubmit">
      <input type="text" v-model="name" placeholder="Product Name" />
      <input type="text" v-model="price" placeholder="Product Price" />
      <select v-model="selectedCategory">
        <option
          v-for="category in categories"
          :key="category"
          :value="category"
        >
          {{ category }}
        </option>
      </select>

      <label>Product Picture</label>
      <input type="file" @change="handleFile" />
      <div class="file-error">{{ fileError }}</div>
      <button type="submit">Add Product</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { timestamp } from '@/firebase/config';
import useStorage from '@/utils/useStorage';
import useCollection from '@/utils/useCollection';
export default {
  setup() {
    const { filePath, url, uploadImage } = useStorage();
    const { error, addDoc } = useCollection('products');

    const categories = [
      'Cookies',
      'Bars',
      'Fudge',
      'Scones',
      'Bread',
      'Cookie Dough',
      'Specials',
    ];
    const types = ['image/png', 'image/jpeg'];

    const name = ref('');
    const price = ref('');
    const selectedCategory = ref('');
    const file = ref(null);
    const fileError = ref(null);
    const isPending = ref(false);

    const handleSubmit = async () => {
      if (file.value) {
        isPending.value = true;

        await uploadImage(file.value);
        const res = await addDoc({
          name: name.value,
          price: price.value,
          filePath: filePath.value,
          category: selectedCategory.value,
          pictureUrl: url.value,
          createdAt: timestamp(),
        });
        isPending.value = false;
        if (!error.value) {
          name.value = '';
          price.value = '';
          file.value = null;
        }
      }
    };

    const handleFile = (e) => {
      const selected = e.target.files[0];

      if (selected && types.includes(selected.type)) {
        file.value = selected;
        fileError.value = null;
      } else {
        file.value = null;
        fileError.value = 'Please select an image file (png or jpeg)';
      }
    };

    return {
      categories,
      selectedCategory,
      name,
      price,
      file,
      fileError,
      handleSubmit,
      handleFile,
    };
  },
};
</script>

<style scoped>
.add-product {
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.add-product form {
  display: flex;
  flex-direction: column;
}
.add-product input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
}
</style>
