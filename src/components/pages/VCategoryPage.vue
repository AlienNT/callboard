<template>
	<div class="v-category-page">
		<div class="sort-wrapper">
			<ul class="sort-list">
				<li
					v-for="(field, key) in filterFields"
					:key="key"
					class="sort-list__item"
				>
					<button
						:class="{
            'active': sortField === field.fieldName && announcements.length
					}"
						:title="`sort by ${field.title}`"
						class="sort-list__button"
						@click="onChangeSortField(field.fieldName)"
					>
						{{ field.title }}
					</button>
				</li>
			</ul>
			<button
				:class="sortMode === 'desc'? 'desc': 'asc'"
				class="sort-mode-button"
				title="sorting direction"
				@click.stop="onChangeSortMode"
			/>
			<div
				:class="column ? 'column-mode': 'row-mode'"
				class="view-mode"
				title="change view mode"
				@click.stop="column = !column"
			/>
		</div>
		<transition appear name="fade">
			<VProductsList
				v-if="announcements.length"
				:data="announcements"
				:is-column="isColumn"
			/>
		</transition>
		<transition appear name="fade">
			<button
				v-if="announcements.length && nextPage"
				class="load-more submit"
				@click.stop="loadMore"
			>
				load more
			</button>
		</transition>
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
            column: true,
            windowWidth: 0,
            filterFields: [
                {title: 'author', fieldName: 'author'},
                {title: 'active', fieldName: 'active'},
                {title: 'date', fieldName: 'updated_at'},
                {title: 'price', fieldName: 'price'},
            ]
        }
    },
    computed: {
        announcements() {
            return this.$store.getters['getAnnouncements']
        },
        announcementsPages() {
            return this.$store.getters['getAnnouncementsPages']
        },
        nextPage() {
            return this.announcementsPages?.nextPage
        },
        isMobile() {
            return this.windowWidth <= 768
        },
        isColumn() {
            return this.isMobile ? true : this.column
        },
        sortField() {
            return this.$store.getters['getAPSortField']
        },
        sortMode() {
            return this.$store.getters['getAPSortMode']
        },
        isChangeFilter() {
            return {
                sortField: this.sortField,
                sortMode: this.sortMode
            }
        }
    },
    watch: {
        isChangeFilter: {
            handler() {
                this.resetAnnouncements()
                this.resetPages()
                this.fetchAnnouncementsByParams()
            },
        }
    },
    methods: {
        setWidth() {
            return this.windowWidth = window.innerWidth
        },
        loadMore() {
            this.fetchAnnouncementsByParams()
        },
        resetPages() {
            this.$store.dispatch('setAnnouncementPages', {...this.announcementsPages, nextPage: 1})
        },
        fetchAnnouncementsByParams() {
            if (!this.nextPage && this.announcements.length) return
            const payload = {
                page: this.nextPage,
                limit: 8,
                sortMode: this.sortMode,
                sortField: this.sortField
            }
            this.$store.dispatch('fetchAnnouncements', payload)
        },
        resetAnnouncements() {
            this.$store.dispatch('resetAnnouncements')
        },
        onChangeSortField(e) {
            this.$store.dispatch('setAPSortField', e)
        },
        onChangeSortMode() {
            this.$store.dispatch('setAPSortMode', this.sortMode === 'desc' ? 'asc' : 'desc')
        },
    },
    mounted() {
        if (!this.announcements.length) {
            this.fetchAnnouncementsByParams()
        }
        window.addEventListener('load', () => this.setWidth())
        window.addEventListener('resize', () => this.setWidth())
    },
    beforeUnmount() {
        window.removeEventListener('load', () => this.setWidth())
        window.removeEventListener('resize', () => this.setWidth())
    }
}
</script>

<style lang="scss">
.v-category-page {
  width: 100%;
  overflow: hidden;
}

.sort-wrapper {
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
}

.sort-list {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.sort-list__button {
  transition: background-color .2s ease;
  border-radius: 5px;
  background: #78a6d5;
  color: white;
  padding: 5px 10px;

  &:first-letter {
    text-transform: uppercase;
  }

  &.active {
    background: darken(#78a6d5, 15%);
  }

  [disabled="false"] {
    &:hover {
      background: #78a6d5;
    }
  }

  &:hover {
    background: darken(#78a6d5, 15%);
  }
}

.sort-mode-button {
  width: 30px;
  height: 30px;
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;
  background-color: #3f6fa2;
  transition: .2s ease;

  &:hover {
    background-color: darken(#3f6fa2, 10%);
  }

  &.desc {
    mask-image: url("../../assets/images/sort_desc.svg");
  }

  &.asc {
    mask-image: url("../../assets/images/sort_asc.svg");
  }
}

.view-mode {
  height: 30px;
  width: 30px;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  justify-content: center;
  align-items: center;
  mask-size: contain;
  mask-position: center;
  mask-repeat: no-repeat;
  transition: .2s ease;
  background: #3e5871;
  cursor: pointer;

  &:hover {
    background: lighten(#3e5871, 10%);
  }

  &.column-mode {
    mask-image: url("../../assets/images/grid-view.svg");
  }

  &.row-mode {
    mask-image: url("../../assets/images/row-vertical.svg");
  }

  &:after {
    content: '';
    width: 28px;
    height: 28px;
    position: absolute;
    background-size: cover;
  }

}

.load-more {
  margin: auto;
}
</style>