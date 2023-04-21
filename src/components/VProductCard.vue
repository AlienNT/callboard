<template>
  <router-link
      class="v-product-card"
      :to="'/' + data?._id"
  >
    <div class="image">
      <VImage
          :src="data?.image || ''"
          :alt="data?.title"
          background="rgb(46, 78, 105, 0.8)"
      />
    </div>
    <div class="product-card__info">
      <div
          class="title"
      >
        {{ title }}
      </div>
      <div
          class="description"
      >
        {{ description }}
      </div>
      <div
          class="price"
      >
        {{ data?.price }}$
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
  },
  computed: {
    title() {
      return this.truncateStr(this.data?.title, 30)
    },
    description() {
      return this.truncateStr(this.data?.description, 50)
    },
  },
  methods: {
    truncateStr(str, maxLength) {
      if (!maxLength || !str) return str

      return maxLength < str.length ? str.slice(0, maxLength + 3) + '...' : str
    }
  }
}
</script>

<style scoped lang="scss">
.v-product-card {
  height: 100%;
  transition: .5s ease;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  background: rgb(216, 239, 252);
  align-content: flex-start;
}

.image {
  min-width: 240px;
  flex: 1 1 50%;
}

.product-card__info {
  flex: 1 1 50%;
  text-align: left;
  padding: 15px;
  gap: 10px;
  display: flex;
  flex-direction: column;

  .title {
    font-weight: 600;
    font-size: 18px;
    color: #2c3e50;

    &:first-letter {
      text-transform: uppercase;
    }
  }

  .description {
    font-size: 16px;
    color: lighten(#2c3e50, 10%);

    &:first-letter {
      text-transform: uppercase;
    }
  }

  .price {
    font-weight: 900;
    font-size: 24px;
    color: lighten(#27527e, 10%);
  }
}
</style>