<template>
  <div>
    <h1>Orders</h1>
    <span>{{ orders.length }}</span>
    <div v-for="item in orders" :key="item.id">
      <div>{{ item.id }}</div>
      <div>{{ item.status }}</div>
    </div>
  </div>
</template>

<script>
import { useOrdersStore } from '@/stores/OrdersStore';
import { storeToRefs } from 'pinia';
export default {
  setup() {
    const ordersStore = useOrdersStore();
    const { orders } = storeToRefs(ordersStore);

    ordersStore.fetchOrders();

    return {
      orders,
    };
  },
};
</script>

<style scoped></style>
