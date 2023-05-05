<template>
	<router-link
		:class="{
        'column': isColumn
		}"
		:to="'/' + data?._id"
		class="v-product-card"
	>
		<div class="product-card__image-wrapper">
			<div class="image">
				<div class="image-inner">
					<VImage
						:alt="data?.title"
						:src="data?.image || ''"
						background="rgb(46, 78, 105, 0.8)"
					/>
				</div>
			</div>
		</div>
		<div class="product-card__info">
			<div
				class="title"
			>
				{{ title }}
			</div>
			<div
				class="description"
			>
				{{ description }}
			</div>
			<div class="row field-row">
				<div
					v-if="data?.price"
					class="col price"
				>
					{{ data?.price }}$
				</div>
				<div class="col date">
					{{ updatedAt }}
				</div>
			</div>
			<ActionButtons
				v-if="authorship && editRoute"
				@onDelete="onDelete"
				@onEdit="onEdit"
			/>
			<transition name="fade">
				<VNotification
					v-if="notification?.show"
					:message="notification?.message"
					:type="notification?.type"
					@onClick="notificationResult"
					@onClose="notification.show = false"
				/>
			</transition>
		</div>
	</router-link>
</template>
<script>
import VNotification from "@/components/VNotification.vue";
import ActionButtons from "@/components/ActionButtons.vue";
import VImage from "@/components/VImage.vue";
import {checkAuthorship} from "@/store";
import {formattedDate} from "@/helper";

export default {
    name: "VProductCard",
    props: {
        data: {
            type: Object
        },
        isColumn: {
            type: Boolean,
            default: true
        }
    },
    components: {
        VImage,
        ActionButtons,
        VNotification
    },
    data() {
        return {
            notification: {
                show: false
            }
        }
    },
    computed: {
        title() {
            return this.truncateStr(this.data?.title, 30)
        },
        description() {
            return this.truncateStr(this.data?.description, 50)
        },
        authUser() {
            return this.$store.getters['getAuthUser']
        },
        authorship() {
            return checkAuthorship(this.data?.author?._id)
        },
        createdAt() {
            return formattedDate(this.data.created_at)
        },
        updatedAt() {
            return formattedDate(this.data.updated_at)
        },
        editRoute() {
            return this.$route?.name === "userAnnouncements"
        }
    },
    methods: {
        truncateStr(str, maxLength) {
            if (!maxLength || !str) return str

            return maxLength < str.length ? str.slice(0, maxLength + 3) + '...' : str
        },
        onEdit() {
            this.$router.push(`/${this.data._id}/edit`)
        },
        onDelete() {
            this.notification = {
                show: true,
                type: 'confirm',
                message: 'Delete this announcement?'
            }
        },
        deleteAnnouncement() {
            this.$store.dispatch('deleteAnnouncement', this.data._id)
        },
        notificationResult(e) {
            if (e) this.deleteAnnouncement()
        }
    }
}
</script>

<style lang="scss" scoped>
.v-product-card {
  position: relative;
  height: 100%;
  transition: .5s ease;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  background: rgb(216, 239, 252);
  align-content: flex-start;

  &.column {
    flex-direction: column;
    max-width: 600px;
    margin: auto;
  }
}

.product-card__image-wrapper {
  max-width: 280px;
  flex: 1 1 50%;

  .column & {
    max-width: 100%;
  }
}

.image {
  width: 0;
  height: 0;
  padding-left: 100%;
  padding-top: 70%;
  position: relative;
  display: flex;
}

.image-inner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.product-card__info {
  flex: 1 1 50%;
  text-align: left;
  padding: 15px;
  gap: 10px;
  display: flex;
  flex-direction: column;

  .title {
    font-weight: 600;
    font-size: 18px;
    color: #2c3e50;

    &:first-letter {
      text-transform: uppercase;
    }
  }

  .description {
    font-size: 16px;
    color: lighten(#2c3e50, 10%);

    &:first-letter {
      text-transform: uppercase;
    }
  }

  .field-row {
    flex: 0;
    margin-top: auto;
    align-items: center;

    .date {
      margin-left: auto;
      color: #3f6fa2;
      font-size: 14px;
    }
  }

  .price {
    font-weight: 900;
    font-size: 24px;
    color: lighten(#27527e, 10%);
  }
}
</style>