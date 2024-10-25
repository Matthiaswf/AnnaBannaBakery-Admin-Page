<template>
  <div>
    <h1>Orders</h1>
    <span>{{ orders.length }}</span>
    <div v-for="item in orders" :key="item.id">
      <OrderDetails :order="item" />
    </div>
  </div>
</template>

<script>
import { useOrdersStore } from '@/stores/OrdersStore';
import { storeToRefs } from 'pinia';
import OrderDetails from '@/components/OrderDetails.vue';
export default {
  components: {
    OrderDetails,
  },
  setup() {
    const ordersStore = useOrdersStore();
    const { orders } = storeToRefs(ordersStore);

    ordersStore.fetchOrders();

    return {
      orders,
      OrderDetails,
    };
  },
};
</script>

<style scoped></style>
