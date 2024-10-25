<template>
  <div>
    <h1>Orders</h1>
    <div v-for="item in orders" :key="item.id" class="order-container">
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

    ordersStore
      .fetchOrders()
      .then(() => {
        console.log('Orders fetched:', orders.value);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });

    return {
      orders,
      OrderDetails,
    };
  },
};
</script>

<style scoped>
.order-container {
  height: 180px;
  width: 400px;
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  box-shadow: 0 0 5px #ccc;
}
</style>
