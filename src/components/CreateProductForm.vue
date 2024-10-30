<template>
  <form @submit.prevent="handleSubmit">
    <h4>Add a new Product</h4>
    <label for="name">Product Name</label>
    <input type="text" required v-model="name" />
    <label for="price">Price</label>
    <p class="instruction">* 00.00 format please</p>
    <input type="number" placeholder="01.00" required v-model="price" />
    <label for="category">Category</label>
    <select v-model="category">
      <option v-for="category in categories" :key="category" :value="category">
        {{ category }}
      </option>
    </select>
    <label>Upload Product image </label>
    <p class="instruction">*Do not upload duplicate img names</p>
    <p class="instruction">*Recommended image size 200x200px</p>
    <input type="file" @change="handleChange" />
    <div v-if="fileError" class="error">{{ fileError }}</div>

    <button v-if="!isPending">Add Product</button>
    <button v-else disabled>Adding Product...</button>
  </form>
</template>

<script>
import { ref } from 'vue';
import useCollection from '@/utils/useCollection';
import useStorage from '@/utils/useStorage';
import { timestamp } from '@/firebase/config';
import { useRouter } from 'vue-router';
export default {
  setup() {
    const categories = [
      'Cookies',
      'Bars',
      'Fudge',
      'Scones',
      'Loaf',
      'Cookie  Dough',
      'Special',
    ];

    const router = useRouter();

    const { filePath, url, uploadImage } = useStorage();
    const { error, addDoc } = useCollection('products');

    const name = ref('');
    const price = ref(0);
    const category = ref('');
    const file = ref(null);
    const fileError = ref(null);
    const isPending = ref(false);

    const handleSubmit = async () => {
      if (file.value) {
        isPending.value = true;

        await uploadImage(file.value);
        const res = await addDoc({
          name: name.value,
          price: parseFloat(price.value).toFixed(2),
          category: category.value,
          pictureUrl: url.value,
          filePath: filePath.value,
          createdAt: timestamp(),
        });
        isPending.value = false;
        if (!error.value) {
          name.value = '';
          price.value = 0;
          category.value = '';
          file.value = null;
          fileError.value = null;
          router.push('/products');
        }
      }
    };

    const types = ['image/png', 'image/jpeg'];
    const handleChange = (e) => {
      const selected = e.target.files[0];

      if (selected && types.includes(selected.type)) {
        file.value = selected;
      } else {
        file.value = null;
        fileError.value = 'Please select an image file (png or jpeg)';
      }
    };
    return {
      categories,
      name,
      price,
      category,
      file,
      fileError,
      isPending,
      handleSubmit,
      handleChange,
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
  color: #777;
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
  color: #777;
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
