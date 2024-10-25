import { defineStore } from 'pinia';
import getCollection from '@/utils/getCollection';

export const useOrdersStore = defineStore({
  id: 'orders',
  state: () => ({
    orders: [],
    error: null,
  }),
  actions: {
    async fetchOrders() {
      const { error, documents } = getCollection('orders');
      this.error = error;
      this.orders = documents;
    },
  },
});
