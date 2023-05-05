<template>
	<div class="v-auth">
		<div
			class="user"
			@click="onClick"
		>
			<button
				v-if="user._id"
				class="logout"
				type="button"
				@click.stop.prevent="logout"
			/>
			<div class="user__name">
				<transition
					appear
					mode="out-in"
					name="fade"
				>
          <span
            v-if="user.name"
          >
          {{ user.name }}
        </span>
					<div
						v-else
						class="sign-in"
					>
						Sign in
					</div>
				</transition>
			</div>
			<div
				:class="{
            'unauthorized': !user.name
          }"
				class="user__avatar"
				title="your announcements"
			>
				<VImage
					v-if="user.image"
					:alt="user.name"
					:src="user.image"
					background="transparent"
					height="100%"
					width="100%"
				/>
				<div
					v-else
					class="short-name"
				>
					{{ shortName }}
				</div>
			</div>
		</div>
		<transition
			appear
			name="fade"
		>
			<VAuthPopup
				v-if="isShow && !user.name"
				@onClick="toggleSignIn"
			/>
		</transition>
	</div>
</template>

<script>
import VImage from "@/components/VImage.vue";
import VAuthPopup from "@/components/auth/VAuthPopup.vue";

export default {
    name: "VAuth",
    components: {
        VImage,
        VAuthPopup
    },
    data() {
        return {
            isShow: false
        }
    },
    computed: {
        user() {
            return this.$store.getters['getAuthUser']
        },
        shortName() {
            const words = this.user?.name?.split(' ')
            if (words) {
                return words.length > 1 ? words.map(word => word[0].toUpperCase()).join('') : words[0][0].toUpperCase()
            }
            return null
        },
        token() {
            return this.$store.getters['getToken']
        }
    },
    methods: {
        toggleSignIn() {
            this.isShow = !this.isShow
        },
        logout() {
            this.$store.dispatch('logout')
            this.$router.push('/')
        },
        getAuthUser(token) {
            this.$store.dispatch('fetchAuthUser', token)
        },
        onClick() {
            if (!this.user?._id) {
                this.toggleSignIn()
            } else {
                this.$router.push(`/user-announcements/${this.user._id}`)
            }
        }
    },
    watch: {
        user: {
            handler(e) {
                if (e?.name && this.$route.fullPath === '/auth') {
                    this.$router.push('/')
                }
            },
            immediate: true
        },
        token: {
            handler(e) {
                if (e) {
                    this.getAuthUser(e)
                }
            },
            immediate: true
        }
    }
}
</script>

<style lang="scss" scoped>
.v-auth {
  height: 100%;
  display: flex;
  align-items: center;
}

.user {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #78a6d5;
}

.logout {
  background: #78a6d5;
  mask-image: url("../../assets/images/logout-svgrepo-com.svg");
  mask-position: center;
  mask-size: contain;
  mask-repeat: no-repeat;
  outline: none;
  border: none;
  height: 20px;
  width: 20px;
  cursor: pointer;
  font-size: 12px;
  color: #cccccc;
  border-radius: 5px;
}

.sign-in {
  cursor: pointer;
}

.user__avatar {
  width: 40px;
  height: 40px;
  background: #cfecfc;
  background-size: contain;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
	cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    background: #000;
  }
}

.user__name {
	cursor: pointer;
  @media all and (max-width: 500px) {
    display: none;

  }
}

.unauthorized {
  mask-image: url("../../assets/images/user-circle-svgrepo-com.svg");
  position: relative;
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;
}

.short-name {
  font-weight: 900;
  font-size: 14px;
}
</style>