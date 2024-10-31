<template>
  <div class="product-details-container">
    <div class="product-preview-container">
      <h1>Preview</h1>
      <div class="product-container" v-if="!editMode">
        <div class="product" v-if="product">
          <img :src="product.pictureUrl" :alt="product.name" />
          <h3>{{ product.name }}</h3>

          <p class="description">{{ product.description }}</p>
          <p class="price">
            Price: ${{
              typeof product.price === 'number'
                ? product.price.toFixed(2)
                : product.price
            }}
          </p>

          <div class="quantity-selector">
            <button class="quantity-button">-</button>
            <div class="quantity">0</div>
            <button class="quantity-button">+</button>
          </div>
          <button class="add-to-cart">Add to Cart</button>
        </div>
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
      <UpdateProductForm
        v-if="editMode"
        :product="product"
        @changeEditMode="editMode = false"
      />
    </div>
    <IngredientsList v-if="product" :product="product" />
  </div>
</template>

<script>
import getDocument from '@/utils/getDocument';
import useDocument from '@/utils/useDocument';
import router from '@/router';
import { ref } from 'vue';
import UpdateProductForm from '@/components/UpdateProductForm.vue';
import IngredientsList from '@/components/IngredientsList.vue';

export default {
  components: {
    UpdateProductForm,
    IngredientsList,
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
      IngredientsList,
    };
  },
};
</script>

<style scoped>
.product-preview-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: fit-content;
  max-width: 600px;
  padding: 0px;
  margin-left: 60px;
  margin-top: 60px;
}
.product-container {
  height: 400px;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  padding: 10px;
  border: solid 1px var(--primary);
  border-radius: 5px;
  background-color: transparent;
}
.product {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}
.product p {
  min-height: 22px;
  margin: 0;
  margin-bottom: 10px;
  font-size: 1rem;
  text-align: center;
}
.product h3 {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 1.5rem;
  text-align: center;
  font-size: 1.2rem;
  white-space: nowrap;
}
.product img {
  width: 200px;
  height: 200px;
  object-fit: cover;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid var(--primary);
}
.quantity-selector {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  width: 100%;
  justify-content: space-evenly;
  border-radius: 5px;
}
.quantity-selector button {
  background-color: var(--secondary);
  height: 40px;
  width: 40px;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  margin: 0 5px;
  font-size: 1.5rem;
}
.quantity-selector button:hover {
  background-color: var(--primary);
}
.quantity-selector div {
  font-size: 1.5rem;
}

.add-to-cart {
  width: 130px;
  height: 40px;
  color: #fff;
  padding: 5px 10px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  outline: none;
  border-radius: 5px;
  border: none;
  box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
    7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
  background: var(--secondary);
  z-index: 1;
}
.add-to-cart:hover {
  background-color: var(--secondary);
}
.add-to-cart:hover:after {
  width: 100%;
  left: 0;
}
.add-to-cart:after {
  border-radius: 5px;
  position: absolute;
  content: '';
  width: 0;
  height: 100%;
  top: 0;
  z-index: -1;
  box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
    7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  background-color: var(--secondary);
  right: 0;
}
.add-to-cart:active {
  top: 2px;
}

.quantity-selector button {
  width: 40px;
  height: 40px;
  box-shadow: none;
  transition: none;
  z-index: 1;
  cursor: pointer;
}
.quantity-selector button:hover::after {
  width: 0;
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
.product-actions button {
  padding: 8px 12px;
  min-width: 100px;
  font-size: 1em;
  color: white;
  background: #333;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
}
</style>
