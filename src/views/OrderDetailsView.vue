<template>
  <div v-if="order" class="order-container">
    <h3>Order Nr. {{ order.id }}</h3>
    <p>
      Order Date: {{ new Date(order.createdAt.toDate()).toLocaleDateString() }}
    </p>
    <h4>Ordered Products</h4>
    <div v-for="item in order.cart" :key="item.id">
      <p>{{ item.name }} : {{ item.quantity }}</p>
    </div>
    <p class="total">Total: ${{ order.cartTotal }}</p>
    <div class="customer-info">
      <h4>Customer Info</h4>
      <p>Email: {{ order.contact.email }}</p>
      <p>Phone Number: {{ order.contact.phoneNumber }}</p>
      <p>Country: {{ order.contact.country }}</p>
      <p>State: {{ order.contact.state }}</p>
      <p>City: {{ order.contact.city }}</p>
      <p>Street Address: {{ order.contact.streetAddress }}</p>
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
.total {
  font-size: 1rem;
  font-weight: bold;
}
</style>
