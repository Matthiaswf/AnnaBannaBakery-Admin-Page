<template>
  <div>Admin</div>
  <div class="add-product">
    <form @submit.prevent="handleSubmit">
      <input type="text" v-model="name" placeholder="Product Name" />
      <input type="text" v-model="price" placeholder="Product Price" />

      <label>Project Picture</label>
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

    const name = ref('');
    const price = ref('');
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

    const types = ['image/png', 'image/jpeg'];

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

    return { name, price, file, fileError, handleSubmit, handleFile };
  },
};
</script>

<style scoped></style>
