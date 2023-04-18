<template>
  <ul class="row v-product-list">
    <li
        class="col v-product-item"
        v-for="product in data"
        :key="product.id"
    >
      <VProductCard
          :data="product"
      />
    </li>
  </ul>
</template>

<script>
import VProductCard from "@/components/VProductCard.vue";

export default {
  name: "VProductsList",
  components: {
    VProductCard
  },
  props: {
    data: {
      type: Object
    }
  }
}
</script>

<style scoped lang="scss">
.v-product-list {
  flex-wrap: wrap;
}

.v-product-item {
  margin-bottom: 15px;
  flex: 1 1 25%;
  min-width: 240px;

  &:last-child {
    margin-bottom: 0;
  }
}
</style>