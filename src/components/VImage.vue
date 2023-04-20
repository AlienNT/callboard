<template>
  <div
      class="v-image"
      :style="{
          'padding-top': height,
          'padding-left': width,
          'background': background
        }"
  >
    <transition
        name="fade"
        appear
    >
      <img
          v-show="isLoad && !isError"
          :src="src || ''"
          :alt="alt"
          :style="{
          'object-fit': objectFit
        }"
          @load="onLoad"
          @error="onError"
          @click="onClick"
      >
    </transition>
    <transition
        name="fade"
        appear
    >
      <div
          v-if="!isLoad && !isError"
          class="loader"
      >
        <VLoader/>
      </div>
      <div
         v-else-if="isError && !isLoad"
          class="error"
      />
    </transition>
  </div>
</template>

<script>
import VLoader from "@/components/VLoader.vue";

export default {
  name: "VImage",
  components: {
    VLoader
  },
  data() {
    return {
      isLoad: false,
      isError: false
    }
  },
  props: {
    src: {
      type: String,
      default: null
    },
    alt: {
      type: String
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '60%'
    },
    objectFit: {
      type: String,
      default: 'cover'
    },
    background: {
      type: String,
      default: 'rgba(0, 0, 0, 0.49)'
    }
  },
  methods: {
    onLoad() {
      this.isLoad = true
    },
    onError() {
      this.isError = true
    },
    onClick() {
      if (this.isLoad && !this.isError) {
        this.$emit('onClick')
      }
    }
  },
  watch: {
    src: {
      handler() {
        this.isLoad = false
        this.isError = false
      },
      immediate: true
    }
  }
}
</script>

<style scoped lang="scss">
.v-image {
  position: relative;
  width: 0;
  height: 0;

  img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  .error {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    mask-image: url("../assets/images/icons8-no-image-90.png");
    background: rgba(109, 137, 164, 0.63);
    mask-position: center;
    mask-size: 50px;
    mask-repeat: no-repeat;
  }
}

.loader {
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>