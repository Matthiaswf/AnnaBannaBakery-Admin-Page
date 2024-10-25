<template>
  <div>
    <h4>Order Id: {{ order.id }}</h4>
    <p>
      Order Date: {{ new Date(order.createdAt.toDate()).toLocaleDateString() }}
    </p>
    <p>
      Items - Total Quantity:
      {{ order.cart.reduce((total, item) => total + item.quantity, 0) }}
    </p>
    <p>
      Unique Item IDs:
      {{ order.cart.map((item) => item.id).join(', ') }}
    </p>
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
