<template>
	<div class="row v-category-page">
		<div class="col user-info">
			<div class="title">user info</div>
			<div
				v-if="authorInfo?.name"
				class="user-field"
			>
				<span class="user-info__label">name:</span>
				<span>{{ authorInfo?.name }}</span>
			</div>
			<div
				v-if="authorInfo?.email"
				class="user-field"
			>
				<span class="user-info__label">email:</span>
				<a
					:href="`mailto:${ authorInfo?.email }`"
				>
					{{ authorInfo?.email }}
				</a>

			</div>
			<div
				v-if="authorInfo?.phone"
				class="user-field"
			>
				<span class="user-info__label">phone:</span>
				<a
					:href="`tel:${authorInfo?.phone }`"
				>
					{{ authorInfo?.phone }}
				</a>

			</div>
			<div
				v-if="date"
				class="user-field"
			>
				<span class="user-info__label">registration date:</span>
				{{ date }}

			</div>
			<div
				v-if="userAnnouncements?.length"
				class="user-field"
			>
				<span class="user-info__label">posts:</span>
				{{ userAnnouncements?.length }}

			</div>
		</div>
		<div class="col product-list">
			<transition appear name="fade">
				<VProductsList
					v-if="userAnnouncements.length"
					:data="userAnnouncements"
				/>
				<div v-else-if="loading" class="loader">
					<VLoader/>
				</div>
				<div v-else class="not-found">
					Not Found
				</div>
			</transition>
		</div>
	</div>
</template>

<script>
import VLoader from "@/components/VLoader.vue";
import VProductsList from "@/components/VProductsList.vue";
import {httpRequest} from "@/store";
import {formattedDate} from "@/helper";

export default {
    name: "VUserAnnouncementsPage",
    components: {
        VProductsList,
        VLoader
    },
    data() {
        return {
            authorInfo: {},
            announcements: [],
            loading: false
        }
    },
    computed: {
        authorId() {
            return this.$route.params.authorId
        },
        userAnnouncements() {
            return this.$store.getters['getAnnouncements']
        },
        date() {
            return this.formattedDate(this.authorInfo?.created_at)
        }
    },
    methods: {
        formattedDate(date) {
            return formattedDate(date)

        },
        async fetchUserAnnouncements() {
            const response = await httpRequest('get', `/announcementsByAuthor`)
            const {data} = response?.data

            await this.$store.dispatch('setAnnouncements', data)
            this.loading = false
        },
        async fetchUser() {
            const response = await httpRequest('get', `/user/${this.authorId}`)
            const {data} = response?.data
            if (data) {
                this.authorInfo = data
            }
        }
    },
    watch: {
        authorId: {
            handler(e) {
                if (e) {
                    this.fetchUser()
                }
            }, immediate: true
        }
    },
    mounted() {
        this.loading = true
        setTimeout(() => {
            this.fetchUserAnnouncements()
        }, 2000)
    }
}
</script>

<style lang="scss" scoped>
.v-category-page {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
}

.product-list {
  flex: 1 1 75%;
  position: relative;
  min-height: 200px;
  display: flex;

  .loader {
    top: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    background: #3e5871;
    border-radius: 5px;
  }
}

.user-info {
  padding: 15px;
  flex: 1 1 25%;
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-bottom: 15px;
  gap: 5px;

  .title {
    font-size: 20px;
    text-align: center;

    &:first-letter {
      text-transform: uppercase;
    }
  }
}

.user-field {
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  padding: 5px 15px;
  background: #cfecfc;
  font-size: 16px;
}

.user-info__label {
  font-weight: 600;
  display: block;

  &:first-letter {
    text-transform: uppercase;
  }
}

.not-found {
  margin: auto;
}
</style>