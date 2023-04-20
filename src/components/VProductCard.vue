<template>
  <router-link
      class="v-product-card"
      :to="'/' + data?._id"
  >
    <div class="image">
      <VImage
          :src="data?.image"
          :alt="data?.title"
          background="rgb(46, 78, 105, 0.8)"
      />
    </div>
    <div class="product-card__info">
      <div
          class="title"
      >
        {{ data?.title }}
      </div>
      <div
          class="description"
      >
        {{ data?.description }}
      </div>
      <div
          class="price"
      >
        {{ data?.price }}
      </div>
    </div>
  </router-link>
</template>

<script>
import VImage from "@/components/VImage.vue";

export default {
  name: "VProductCard",
  props: {
    data: {
      type: Object
    }
  },
  components: {
    VImage
  }
}
</script>

<style scoped lang="scss">
.v-product-card {
  transition: .5s ease;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  background: rgb(216, 239, 252);
}

.image {
  min-width: 240px;
  flex: 1 1 auto;
}

.product-card__info {
  flex: 1 1 auto;
  text-align: left;
  padding: 15px;

  .title {
    font-weight: 600;
    font-size: 18px;

    &:first-letter {
      text-transform: uppercase;
    }
  }

  .description {
    font-size: 16px;

    &:first-letter {
      text-transform: uppercase;
    }
  }

  .price {
    font-weight: 900;
    font-size: 24px;
  }
}
</style>