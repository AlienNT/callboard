<template>
	<div
		class="v-product-page"
	>
		<div
			class="product-page__image"

		>
			<VImage
				:alt="product?.title"
				:src="product?.image"
				background="rgb(46, 78, 105, 0.8)"
				height="70%"
				object-fit="cover"
				@onClick="toggleImage"
			/>
			<transition
				appear
				name="fade"
			>
				<div
					v-if="isOpen"
					class="opened-image"
					@click.stop="toggleImage"
				>
					<img
						:alt="product?.title"
						:src="product?.image"
					/>
				</div>
			</transition>
		</div>
		<div class="product-page-info">
			<div
				v-if="product?.title"
				class="product-page__item product-page__title title"
			>
				{{ product.title }}
			</div>
			<div
				v-if="product?.description"
				class="product-page__item product-page__description"
			>
				{{ product.description }}
			</div>
			<div
				class="product-page__item product-page__contacts"
			>
				<div
					v-if="product?.price"
					class="product-page__item product-page__price"
				>
					{{ product.price }}$
				</div>
				<router-link
					v-if="shortName"
					:to="`/user-announcements/${author?._id}`"
					class="name"
				>
					{{ name }}
					<span class="logo">{{ shortName }}</span>
				</router-link>
				<a
					v-if="phone"
					:href="'tel:' + phone"
					class="phone"
				>
					{{ phone }}
				</a>
				<a
					v-if="email"
					:href="'mailto:' + email"
					class="email"
				>
					{{ email }}
				</a>
			</div>
		</div>
		<ActionButtons
			v-if="authorship"
			@onDelete="onDelete"
			@onEdit="onEdit"
		/>
		<transition appear name="fade">
			<VNotification
				v-if="notification?.show"
				:message="notification?.message"
				:type="notification?.type"
				@onClick="notificationResult"
				@onClose="notification.show = false"
			/>
		</transition>
	</div>
</template>

<script>
import VImage from "@/components/VImage.vue";
import ActionButtons from "@/components/ActionButtons.vue";
import {checkAuthorship} from "@/store";
import VNotification from "@/components/VNotification.vue";

export default {
    name: "VProductPage",
    components: {
        VNotification,
        VImage,
        ActionButtons
    },
    data() {
        return {
            isOpen: false,
            notification: {
                show: false
            }
        }
    },
    computed: {
        id() {
            return this.$route.params.id
        },
        product() {
            return this.$store.getters['getAnnouncement'](this.id)
        },
        products() {
            return this.$store.getters['getAnnouncements']
        },
        author() {
            return this.product?.author
        },
        name() {
            return this.author?.name
        },
        email() {
            return this.author?.email
        },
        phone() {
            return this.author?.phone
        },
        authorId() {
            return this.author?._id
        },
        shortName() {
            if (this.name) {
                const words = this.name.split(' ')
                return words.length > 1 ? words.map(word => word[0].toUpperCase()).join('') : words[0][0].toUpperCase()
            }
            return null
        },
        authorship() {
            return checkAuthorship(this.authorId)
        },
    },
    methods: {
        toggleImage() {
            this.isOpen = !this.isOpen
        },
        fetchAnnouncement() {
            this.$store.dispatch('fetchAnnouncementById', this.id)
        },
        onEdit() {
            this.$router.push(`/${this.id}/edit`)
        },
        onDelete() {
            this.notification = {
                show: true,
                type: 'confirm',
                message: 'Delete this announcement?'
            }
        },
        notificationResult(e) {
            if (e) {
                this.deleteAnnouncement()
                this.$router.back()
            }
        },
        deleteAnnouncement() {
            return this.$store.dispatch('deleteAnnouncement', this.id)
        }
    },
    created() {
        if (!this.product) {
            this.fetchAnnouncement()
        }
    },
    beforeUnmount() {
        if (this.products.length <= 1) {
            this.$store.dispatch('resetAnnouncements')
        }
    }
}
</script>

<style lang="scss" scoped>
.v-product-page {
  position: relative;
  height: 100%;
  width: 100%;
  margin: auto;
  background: rgb(216, 239, 252);
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;

  > * {
    flex: 1 1 50%
  }
}

.product-page__image {
  cursor: pointer
}

.product-page-info {
  padding: 15px;
  text-align: left;
  display: flex;
  flex-direction: column;
}

.product-page__item {
  margin-bottom: 15px;

  &:first-letter {
    text-transform: uppercase;
  }

  &:last-child {
    margin-bottom: 0;
  }
}

.product-page__title {
  font-size: 18px;
  color: #2c3e50;
  font-weight: 600;

}

.product-page__description {
  font-size: 16px;
  color: lighten(#2c3e50, 20%);
}

.product-page__price {
  font-size: 24px;
  margin-bottom: 0;
  margin-right: auto;
  font-weight: 900;
}

.product-page__contacts {
  margin-top: auto;
  border-radius: 5px;
  padding: 10px;
  border: 2px dashed #99b3c5;
  font-size: 16px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-end;
  min-width: 240px;
  gap: 10px;

  .name {
    padding: 5px;
    font-weight: 900;
    color: #58778c;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
  }

  .logo {
    cursor: default;
    border-radius: 50%;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    color: rgb(83, 188, 248);
    overflow: hidden;
  }

  .email,
  .phone {
    color: #2c3e50;
    font-weight: 600;
    border-radius: 5px;
    background-size: 20px;
    padding: 5px 5px 5px 40px;
    overflow-x: hidden;
    text-overflow: ellipsis;
  }

  .email {
    background: url("../../assets/images/email.svg") no-repeat 5px, #ffffff;
  }

  .phone {
    background: url("../../assets/images/phone.svg") no-repeat 5px, #ffffff;
  }
}

.opened-image {
  position: fixed;
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  padding: 15px;
  cursor: pointer;

  img {
    max-width: 900px;
    width: 100%;
    height: auto;
    max-height: 100%;
    object-fit: contain;
    border-radius: 5px;
  }
}
</style>