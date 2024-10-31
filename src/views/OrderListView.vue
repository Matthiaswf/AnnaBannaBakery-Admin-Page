<template>
  <div>
    <h1>Orders</h1>

    <!-- Filter Nav -->
    <nav class="filter">
      <button @click="filter = 'all'" :class="{ active: filter === 'all' }">
        All
      </button>
      <button
        @click="filter = 'Pending'"
        :class="{ active: filter === 'Pending' }"
      >
        Pending
      </button>
      <button
        @click="filter = 'Complete'"
        :class="{ active: filter === 'Complete' }"
      >
        Complete
      </button>
    </nav>

    <div class="pending-text" v-if="isPending">Loading Orders...</div>
    <div v-if="!isPending && sortedOrders.length === 0" class="no-orders-text">
      No current Orders.
    </div>
    <div v-if="filter === 'all'">
      <div v-for="item in sortedOrders" :key="item.id">
        <OrderDetails v-if="item" :order="item" class="order-container" />
      </div>
    </div>
    <div v-else>
      <div v-for="item in sortedOrders" :key="item.id">
        <OrderDetails
          v-if="item && item.status === filter"
          :order="item"
          class="order-container"
        />
      </div>
    </div>
  </div>
</template>

<script>
import getCollection from '@/utils/getCollection';
import OrderDetails from '@/components/OrderDetails.vue';
import { computed } from 'vue';
import { ref } from 'vue';
import { watchEffect } from 'vue';

export default {
  components: {
    OrderDetails,
  },
  setup() {
    const isPending = ref(false);
    const { documents: orders } = getCollection('orders');

    const filter = ref('all');

    // Watch for changes in the orders collection
    watchEffect(() => {
      isPending.value = !orders.value;
    });
    const sortedOrders = computed(() => {
      return orders.value
        ? orders.value.slice().sort((a, b) => b.createdAt - a.createdAt)
        : [];
    });

    return {
      isPending,
      sortedOrders,
      filter,
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
.pending-text {
  font-size: 2rem;
  margin-top: 20px;
  padding-left: 5px;
}
.no-orders-text {
  font-size: 20px;
  margin-top: 20px;
  padding-left: 5px;
}

.filter {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  margin-bottom: 60px;
}

.filter button {
  min-width: 130px;
  height: 40px;
  color: var(--primary);
  padding: 5px 10px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  outline: none;
  border-radius: 5px;
  border: 2px solid var(--primary);
  background: var(--background);
  margin: 0 5px;
}

.filter button:hover {
  background-color: var(--background);
  color: var(--primary);
}
.filter button.active {
  background-color: var(--background);
  color: white;
}
</style>
