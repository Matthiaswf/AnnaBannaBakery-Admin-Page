<template>
  <div>Order Details</div>
  <div v-if="order">{{ order.id }}</div>
</template>

<script>
import getDocument from '@/utils/getDocument';

export default {
  props: ['id'],
  setup(props) {
    const { document: order } = getDocument('orders', props.id);

    return {
      order,
    };
  },
};
</script>

<style lang="scss" scoped></style>
