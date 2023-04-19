<template>
  <div class="v-auth">
    <div
        class="user"
    >
      <button
          v-if="user.name"
          type="button"
          class="logout"
          @click.stop.prevent="logout"
      />
      <div class="user__name">
        <transition
            name="fade"
            appear
            mode="out-in"
        >
          <span
              v-if="user.name"
          >
          {{ user.name }}
        </span>
          <div
              v-else
              class="sign-in"
              @click="toggleSignIn"
          >
            Sign in
          </div>
        </transition>
      </div>
      <div
          class="user__avatar"
          :class="{
            'unauthorized': !user.name
          }"
      >
        <VImage
            v-if="user.image"
            :src="user.image"
            :alt="user.name"
            height="100%"
            width="100%"
            background="transparent"
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
        name="fade"
        appear
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
    }
  },
  methods: {
    toggleSignIn() {
      this.isShow = !this.isShow
    },
    logout() {
      this.$store.dispatch('logout')
    }
  },
  watch: {
    user: {
      handler(e) {
        console.log(e)
        if (e.name && this.$route.fullPath === '/auth') {
          this.$router.push('/')
        }
      },
      immediate: true
    }
  }
}
</script>

<style scoped lang="scss">
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

  img {
    width: 100%;
    height: 100%;

    background: #000;
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