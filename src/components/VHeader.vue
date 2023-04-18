<template>
  <header class="v-header">
    <div class="container">
      <div class="row">
        <div class="col logo">
          <VLogo/>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import VLogo from "@/components/VLogo.vue";

export default {
  name: "VHeader",
  components: {
    VLogo
  }
}
</script>

<style scoped lang="scss">
.v-header {
  background: rgb(46, 78, 105);
}

</style>