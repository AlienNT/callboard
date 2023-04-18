<template>
  <div
      class="v-image"
      :style="{
          'padding-top': height,
          'padding-left': width,
          'background': background
        }"
  >
    <img
        v-show="isLoad"
        :src="src"
        :alt="alt"
        :style="{
          'object-fit': objectFit
        }"
        @load="onLoad"
        @error="onError"
        @click="onClick"
    >
    <div
        v-if="!isLoad && isError"
        class="error"
    />
  </div>
</template>

<script>
export default {
  name: "VImage",
  data() {
    return {
      isLoad: false,
      isError: false
    }
  },
  props: {
    src: {
      type: String
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
    onLoad(e) {
      this.isLoad = e
    },
    onError(e) {
      this.isError = e
    },
    onClick() {
      if (this.isLoad && !this.isError) {
        this.$emit('onClick')
      }
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
    background: url("../assets/images/icons8-no-image-90.png") no-repeat center;
    background-size: 50px;
  }
}
</style>