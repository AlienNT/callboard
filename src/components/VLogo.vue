<template>
  <router-link
      class="v-logo"
      to="/"
  >
    <VImage
        :src="imagePath"
        background="transparent"
        height="50px"
        width="50px"
        alt="logo"
    />
  </router-link>
</template>

<script>
import VImage from "@/components/VImage.vue";

export default {
  name: "VLogo",
  components: {
    VImage
  },
  computed: {
    imagePath() {
      return require('../assets/images/shenhe.png');
    }
  }
}
</script>

<style scoped lang="scss">
.v-logo {
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>