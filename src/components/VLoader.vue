<template>
  <div class="v-loader">
    <div class="v-loader__wrapper">
      <img
          :src="src"
          alt="loader image"
          class="v-loader__item"
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "VLoader",
  computed: {
    src() {
      return require('../assets/images/g-cryo.png')
    }
  }
}
</script>

<style scoped lang="scss">
.v-loader {
  width: 100%;
  height: 100%;
  display: flex;
}

.v-loader__wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.v-loader__item {
  position: absolute;
  object-fit: contain;
  animation: infinite loader 2s alternate;
  width: 50%;
  height: 50%;
}

@keyframes loader {
  0% {
    filter: drop-shadow(0 0 0 rgb(207, 236, 252));
  }
  100% {
    filter: drop-shadow(0 0 6px rgb(207, 236, 252));
    transform: scale(0.9) rotate(60deg);
  }

}
</style>