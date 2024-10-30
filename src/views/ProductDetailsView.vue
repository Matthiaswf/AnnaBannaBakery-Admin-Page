<template>
  <div class="product-container" v-if="!editMode">
    <div class="product-details" v-if="product">
      <h2>{{ product.name }}</h2>
      <img :src="product.pictureUrl" :alt="product.name" />
      <p class="price">
        Price: ${{
          typeof product.price === 'number'
            ? product.price.toFixed(2)
            : product.price
        }}
      </p>
    </div>
    <div class="product-actions">
      <button @click="editMode = true">Edit</button>
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
    const { deleteDoc, updateDoc } = useDocument('products', props.id);

    const editMode = ref(false);
    const showPopup = ref(false);

    const handleDelete = async () => {
      await deleteDoc();
      router.push('/orders');
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
img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  margin-bottom: 10px;
  border-radius: 5px;
}
</style>
