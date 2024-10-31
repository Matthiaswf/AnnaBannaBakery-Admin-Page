<template>
  <div class="product-container" v-if="!editMode">
    <div class="product-details" v-if="product">
      <h2>{{ product.name }}</h2>
      <img :src="product.pictureUrl" :alt="product.name" />
      <p>
        Description: <br />
        {{ product.description }}
      </p>
      <p class="price">
        Price: ${{
          typeof product.price === 'number'
            ? product.price.toFixed(2)
            : product.price
        }}
      </p>
    </div>
    <div class="product-actions">
      <button @click="editMode = true" v-if="!showPopup">Edit</button>
      <button @click="showPopup = true" v-if="!showPopup">Delete</button>
      <div
        v-if="showPopup"
        @close="showPopup = false"
        class="delete-confirmation"
      >
        <div class="delete-warning-text">
          <h3>Warning!</h3>
          <p>This will permanently delete the product!</p>
        </div>
        <div class="delete-buttons">
          <button @click="showPopup = false">Cancel</button>
          <button @click="handleDelete">Delete</button>
        </div>
      </div>
    </div>
  </div>
  <UpdateProductForm
    v-else
    :product="product"
    @changeEditMode="editMode = false"
  />
</template>

<script>
import getDocument from '@/utils/getDocument';
import useDocument from '@/utils/useDocument';
import router from '@/router';
import { ref } from 'vue';
import UpdateProductForm from '@/components/UpdateProductForm.vue';

export default {
  components: {
    UpdateProductForm,
  },
  props: ['id'],
  setup(props) {
    const { document: product } = getDocument('products', props.id);
    const { deleteDoc } = useDocument('products', props.id);

    const editMode = ref(false);
    const showPopup = ref(false);

    const handleDelete = async () => {
      await deleteDoc();
      router.push('/products');
    };

    return {
      product,
      showPopup,
      handleDelete,
      editMode,
      UpdateProductForm,
    };
  },
};
</script>

<style scoped>
.-product-container {
  display: flex;
  flex-direction: column;
  height: fit-content;
  padding: 0px;
  margin-left: 60px;
  margin-top: 60px;
}
img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  margin-bottom: 10px;
  border-radius: 5px;
}
.product-actions {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  margin: 10px 0;
  max-width: 520px;
}
.delete-confirmation {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 520px;
  border: 1px solid #ccc;
  padding: 10px;
}
.delete-warning-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
.delete-buttons {
  display: flex;
  justify-content: space-around;
}
button {
  height: 40px;
  width: 100px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #f1f1f1;
  cursor: pointer;
}
</style>
