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
  height: 255px;
  width: 400px;
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 30px;
  border-radius: 5px;
}
</style>
