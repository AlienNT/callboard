<template>
	<ul
		:class="{
        'column':isColumn
		}"
		class="row v-product-list"
	>
		<transition-group
			name="list"
		>
			<li
				v-for="product in data"
				:key="product._id"
				class="col v-product-item"
			>
				<VProductCard
					:data="product"
					:is-column="isColumn"
				/>
			</li>
		</transition-group>
	</ul>
</template>

<script>
import VProductCard from "@/components/VProductCard.vue";

export default {
    name: "VProductsList",
    components: {
        VProductCard
    },
    props: {
        data: {
            type: Object
        },
        isColumn: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        onBeforeEnter(el) {
            console.log('onBeforeEnter', el)
            el.style.position = 'absolute'
            el.style.opacity = 0
        }
    }
}
</script>

<style lang="scss" scoped>
.v-product-list {
  flex-direction: column;
  flex-wrap: nowrap;

  &.column {
    flex-direction: row;
    flex-wrap: wrap;

  }
}

.v-product-item {
  overflow: hidden;
  transition: .5s ease;
  margin-bottom: 15px;
  flex: 1 1 25%;
  min-width: 280px;
}
</style>