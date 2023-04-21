<template>
  <ul
      class="row v-product-list"
  >
    <transition-group
        name="list"
    >
      <li
          class="col v-product-item"
          v-for="product in data"
          :key="product._id"
      >
        <VProductCard
            :data="product"
        />
      </li>
    </transition-group>
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
  },
  methods: {
    onBeforeEnter(el) {
      console.log('onBeforeEnter', el)
      el.style.position = 'absolute'
      el.style.opacity = 0
    }
  }
}
</script>

<style scoped lang="scss">
.v-product-item {
  overflow: hidden;
  transition: .5s ease;
  margin-bottom: 15px;
  flex: 1 1 25%;
  min-width: 280px;
}
</style>