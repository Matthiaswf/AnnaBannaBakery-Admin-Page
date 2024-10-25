<template>
  <div class="order">
    <h4>Order Id : {{ order.id }}</h4>
    <p>
      Order Date : {{ new Date(order.createdAt.toDate()).toLocaleDateString() }}
    </p>
    <p class="product-count">
      Unique Products :
      {{ order.cart.length }}
    </p>
    <p class="item-count">
      Total Units :
      {{ order.cart.reduce((total, item) => total + item.quantity, 0) }}
    </p>
    <p class="item-country">Country : {{ order.contact.country }}</p>
    <router-link :to="{ name: 'order', params: { id: order.id } }">
      Detailed View
    </router-link>
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

<style scoped>
.order {
  margin: 0px;
}
h4 {
  margin: 0px;
  font-size: 20px;
}
</style>
