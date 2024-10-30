<template>
  <div>
    <h1>Orders</h1>
    <div v-if="orders.length === 0" class="no-orders-text">
      No current Orders.
    </div>
    <div v-for="item in orders" :key="item.id" class="order-container">
      <OrderDetails :order="item" />
    </div>
  </div>
</template>

<script>
import getCollection from '@/utils/getCollection';
import OrderDetails from '@/components/OrderDetails.vue';
import { computed } from 'vue';

export default {
  components: {
    OrderDetails,
  },
  setup() {
    const { documents: orders } = getCollection('orders');

    const sortedOrders = computed(() => {
      return orders.value
        ? orders.value.slice().sort((a, b) => b.createdAt - a.createdAt)
        : [];
    });

    return {
      orders: sortedOrders,
      OrderDetails,
    };
  },
};
</script>

<style scoped>
.order-container {
  height: 295px;
  width: 400px;
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 30px;
  border-radius: 5px;
}
h1 {
  padding: 0;
}
.no-orders-text {
  font-size: 20px;
  margin-top: 20px;
  padding-left: 5px;
}
</style>
