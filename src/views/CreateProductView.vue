<template>
  <div class="container">
    <CreateProductForm />
  </div>
</template>

<script>
import CreateProductForm from '@/components/CreateProductForm.vue';
export default {
  components: {
    CreateProductForm,
  },
  setup() {
    return {
      CreateProductForm,
    };
  },
};
</script>

<style scoped></style>
