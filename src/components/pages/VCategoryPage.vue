<template>
  <div class="v-category-page">
    <VProductsList
        :data="announcements"
    />
  </div>
</template>

<script>
import VProductsList from "@/components/VProductsList.vue";

export default {
  name: "VCategoryPage",
  components: {
    VProductsList
  },
  computed: {
    announcements() {
      return this.$store.getters['getAnnouncements']
    },
  }
}
</script>

<style lang="scss">
.v-category-page {
  width: 100%;
  overflow: hidden;
}

</style>