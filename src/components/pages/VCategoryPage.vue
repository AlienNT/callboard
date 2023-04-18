<template>
  <div class="v-category-page">
    <div class="categories-filter">
      <div
          v-for="item in categoriesFilter"
          :key="item?.id"
          class="filter-item"
          :class="{
            'filter-item--active' : item.select
          }"
          @click="toggleFilter(item.id)"
      >
        {{ item.title }}
      </div>
    </div>
    <VProductsList
        :data="products"
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
  data() {
    return {
      filterItems: []
    }
  },
  computed: {
    products() {
      return this.selectedCategories.length ?
          this.selectedCategories.map(id => this.$store.getters['getProductsByCategory'](id)).flat(1) :
          this.$store.getters['getProducts']
    },
    categories() {
      return this.$store.getters['getCategories']
    },
    selectedCategories() {
      return this.categoriesFilter.filter(item => item.select).map(item => item.id)
    },
    categoriesFilter() {
      return this.$store.getters['getCategoriesFilter']
    }
  },
  watch: {
    categories: {
      handler(e) {
        if (e) {
          this.setFilterItems(e)
        }
      },
      immediate: true
    }
  },
  methods: {
    toggleFilter(id) {
      this.setCategoriesFilterStatusById(id)
    },
    setCategoriesFilterStatusById(id) {
      this.$store.dispatch('setCategoriesFilterStatusById', id)
    },
    setFilterItems() {
      this.$store.dispatch('setCategoriesFilter', this.categories)
    },
  }
}
</script>

<style scoped lang="scss">
.categories-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 15px;
}

.filter-item {
  padding: 5px 10px;
  border-radius: 5px;
  background: #6a93bd;
  cursor: pointer;
  user-select: none;

}

.filter-item--active {
  background: #3f6fa2;
  color: white;
}
</style>