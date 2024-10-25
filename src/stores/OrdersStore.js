import { defineStore } from 'pinia';
import getCollection from '@/utils/getCollection';

export const useOrdersStore = defineStore({
  id: 'orders',
  state: () => ({
    orders: [],
    loading: false,
  }),
  actions: {
    async fetchOrders() {
      this.loading = true;
      const { documents } = await getCollection('orders');
      this.orders = documents;
      this.loading = false;
      console.log('orders fetched');
      console.log(this.orders);
    },
  },
});
