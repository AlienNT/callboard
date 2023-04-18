<template>
  <header class="v-header">
    <div class="container">
      <div class="row">
        <div class="col logo">
          <VLogo/>
        </div>
        <div class="col user">
          <VAuth/>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import VLogo from "@/components/VLogo.vue";
import VAuth from "@/components/auth/VAuth.vue";

export default {
  name: "VHeader",
  components: {
    VLogo,
    VAuth
  }
}
</script>

<style scoped lang="scss">
.v-header {
  background: rgb(46, 78, 105);
  .row {
    justify-content: space-between;
  }
}

</style>