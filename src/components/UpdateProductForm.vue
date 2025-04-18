<template>
  <div>
    <form @submit.prevent="handleUpdate">
      <h4>Edit Product Info</h4>

      <label>Name:</label>
      <input type="text" v-model="name" />
      <label>Description:</label>
      <p class="instructions">*Keep it short, one line</p>
      <input type="text" v-model="description" />
      <label>Price</label>
      <input type="number" v-model="price" class="price" step="0.01" />
      <div class="discount-check">
        <label for="dozenDiscount">Dozen Discount: </label>
        <input type="checkbox" v-model="dozenDiscount" />
      </div>

      <div class="dozen-discount-details" v-if="dozenDiscount">
        <p class="instruction">Price decution per dozen</p>
        <input type="number" step="0.01" v-model="dozenDiscountAmount" />
      </div>

      <label for="category">Category</label>
      <select v-model="category">
        <option
          v-for="category in categories"
          :key="category"
          :value="category"
        >
          {{ category }}
        </option>
      </select>

      <div class="form-actions">
        <button v-if="!isPending">Update Info</button>
        <button v-else disabled>Updating Info...</button>
        <button type="button" @click="$emit('changeEditMode')">Cancel</button>
      </div>
    </form>
    <form @submit.prevent="handlePictureUpdate" class="update-picture-form">
      <h4>Change Product Image</h4>
      <p class="instruction">*Min size 200x200px</p>
      <input type="file" @change="handleChange" />
      <p class="error" v-if="fileError">{{ fileError }}</p>
      <div class="form-actions">
        <button v-if="!isPending">Update Image</button>
        <button v-else disabled>Updating...</button>
        <button type="button" @click="$emit('changeEditMode')">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
import useDocument from '@/utils/useDocument';
import useStorage from '@/utils/useStorage';
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
    const types = ['image/png', 'image/jpeg'];

    const { isPending, updateDoc } = useDocument('products', props.product.id);
    const { filePath, url, uploadImage, deleteImage } = useStorage();
    const name = ref(props.product.name);
    const description = ref(props.product.description);
    const price = ref(props.product.price);
    const dozenDiscount = ref(props.product.dozenDiscount);
    const dozenDiscountAmount = ref(props.product.dozenDiscountAmount);
    const category = ref(props.product.category);
    const file = ref(null);
    const fileError = ref(null);
    const originalFilePath = ref(props.product.filePath);

    const handleUpdate = async () => {
      await updateDoc({
        name: name.value,
        description: description.value,
        price: price.value,
        dozenDiscount: dozenDiscount.value,
        dozenDiscountAmount: dozenDiscountAmount.value,
        category: category.value,
      });
      context.emit('changeEditMode');
    };

    const handlePictureUpdate = async () => {
      isPending.value = true;
      fileError.value = null;

      if (file.value && types.includes(file.value.type)) {
        await uploadImage(file.value);
        await deleteImage(originalFilePath.value);
        await updateDoc({
          pictureUrl: url.value,
          filePath: filePath.value,
        });
        if (!fileError.value) {
          file.value = null;
          fileError.value = null;
          context.emit('changeEditMode');
        }
      } else {
        isPending.value = false;
        fileError.value = 'Please select an image file (png or jpeg)';
      }
    };

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
      name,
      description,
      price,
      dozenDiscount,
      dozenDiscountAmount,
      category,
      categories,
      handleUpdate,
      handleChange,
      handlePictureUpdate,
      isPending,
      fileError,
    };
  },
};
</script>

<style scoped>
h4 {
  margin: 0;
}
p {
  margin: 0;
  padding: 0;
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
  cursor: not-allowed;
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
.form-actions {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  margin-top: 20px;
}
.update-picture-form {
  margin-top: 20px;
}
input[type='file'] {
  color: white;
}

.discount-check {
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: left;
}
.discount-check input {
  width: 20px;
  margin-left: 0;
}
</style>
