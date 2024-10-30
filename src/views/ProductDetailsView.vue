<template>
  <div class="product-container" v-if="!editMode">
    <div class="product-details" v-if="product">
      <h2>{{ product.name }}</h2>
      <img :src="product.pictureUrl" :alt="product.name" />
      <p class="price">Price: ${{ product.price }}</p>
    </div>
  </div>
</template>

<script>
import getDocument from '@/utils/getDocument';
import useDocument from '@/utils/useDocument';
import router from '@/router';
import { ref } from 'vue';

export default {
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

    const handleUpdate = async (value) => {
      await updateDoc({
        // Updates
      });
    };

    return {
      product,
      showPopup,
      handleDelete,
      handleUpdate,
    };
  },
};
</script>

<style scoped>
img {
  height: 250px;
  width: 250px;
}
</style>
