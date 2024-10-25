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
      <div v-for="item in order.cart" :key="item.id">
        <p>{{ item.name }} : {{ item.quantity }}</p>
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
  height: fit-content;
  padding: 10px;
  margin: 10px;
  border-left: 1px solid #ccc;
  box-shadow: -5px 0 5px -5px #ccc;
}
h3 {
  margin: 0;
}
.name-date {
  padding: 10px;
  border-bottom: 1px solid #ccc;

  margin: 10px 0;
  max-width: 800px;
}
.cart {
  padding: 10px;
  border-bottom: 1px solid #ccc;

  margin: 10px 0;
  max-width: 800px;
}
.customer-info {
  margin: 10px 0;
  max-width: 800px;
  border-bottom: 1px solid #ccc;
}
.total {
  font-size: 1rem;
  font-weight: bold;
}
</style>
