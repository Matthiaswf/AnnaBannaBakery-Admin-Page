<template>
  <div>
    <h1>Orders</h1>
    <div v-for="item in orders" :key="item.id" class="order-container">
      <OrderDetails :order="item" />
    </div>
  </div>
</template>

<script>
import getCollection from '@/utils/getCollection';
import OrderDetails from '@/components/OrderDetails.vue';

export default {
  components: {
    OrderDetails,
  },
  setup() {
    const { documents: orders } = getCollection('orders');

    return {
      orders,
      OrderDetails,
    };
  },
};
</script>

<style scoped>
.order-container {
  height: 220px;
  width: 400px;
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  box-shadow: 0 0 5px #ccc;
}
</style>
