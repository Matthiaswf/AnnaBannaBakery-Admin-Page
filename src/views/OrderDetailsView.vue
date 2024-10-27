<template>
  <div v-if="order" class="order-container">
    <div class="name-date">
      <h3>Order Nr. {{ order.id }}</h3>
      <p>
        Order Date:
        {{ new Date(order.createdAt.toDate()).toLocaleDateString() }}
      </p>
    </div>
    <div class="cart">
      <h3>Ordered Products</h3>
      <div v-for="item in order.cart" :key="item.id" class="cart-item">
        <span class="item-name">{{ item.name }}</span>
        <span class="item-quantity"> {{ item.quantity }}</span>
      </div>
      <p class="total">Total: ${{ order.cartTotal }}</p>
    </div>
    <div class="customer-info">
      <h3>Customer Info</h3>
      <p>Email: {{ order.contact.email }}</p>
      <p>Phone Number: {{ order.contact.phoneNumber }}</p>
      <p>Country: {{ order.contact.country }}</p>
      <p>State: {{ order.contact.state }}</p>
      <p>City: {{ order.contact.city }}</p>
      <p>Street Address: {{ order.contact.streetAddress }}</p>
      <p>ZIP Code: {{ order.contact.zipCode }}</p>
      <p>Delivery Date: {{ order.contact.deliveryDate }}</p>
      <p>Delivery Time: {{ order.contact.deliveryTime }}</p>
    </div>
  </div>
</template>

<script>
import getDocument from '@/utils/getDocument';

export default {
  props: ['id'],
  setup(props) {
    const { document: order } = getDocument('orders', props.id);

    return {
      order,
    };
  },
};
</script>

<style scoped>
.order-container {
  display: flex;
  flex-direction: column;
  height: fit-content;
  padding: 0px;
  margin-left: 60px;
  margin-top: 60px;
}
h3 {
  margin: 0;
}
.name-date {
  border-bottom: 1px solid #ccc;
  margin: 10px 0;
  max-width: 520px;
}
.cart {
  border-bottom: 1px solid #ccc;
  margin: 10px 0;
  max-width: 520px;
}
.customer-info {
  margin: 10px 0;
  border-bottom: 1px solid #ccc;
  max-width: 520px;
}
.total {
  font-size: 1rem;
  font-weight: bold;
}
.cart-item {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  margin: 5px 0;
  border-bottom: solid 1px #ccc;
  padding-bottom: 5px;
}
.item-name {
  font-size: 1rem;
  width: 150px;
}
.item-quantity {
  font-size: 1rem;
  width: 50px;
}
</style>
