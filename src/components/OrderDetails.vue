<template>
  <div>
    <h4>Order Id: {{ order.id }}</h4>
    <p>
      Order Date: {{ new Date(order.createdAt.toDate()).toLocaleDateString() }}
    </p>
    <p class="product-count">
      Products Total:
      {{ order.cart.length }}
    </p>
    <p class="item-count">
      Total Units:
      {{ order.cart.reduce((total, item) => total + item.quantity, 0) }}
    </p>
    <p class="item-country">{{ order.contact.country }}</p>
  </div>
</template>

<script>
export default {
  props: ['order'],
  setup(props) {
    return {};
  },
};
</script>

<style scoped></style>
