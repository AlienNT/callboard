<template>
  <div class="v-auth-page">
    <VAuthForm/>
  </div>
</template>

<script>
import VAuthForm from "@/components/auth/VAuthForm.vue";

export default {
  name: "VAuthPage",
  components: {
    VAuthForm
  }
}
</script>

<style scoped>
.v-auth-page {
  margin: auto;
  width: 100%;
}
</style>