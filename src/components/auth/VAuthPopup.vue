<template>
  <div
      class="v-auth-popup"
      @click.stop="$emit('onClick')"
  >
    <form
        class="sign-in-form"
        @submit.prevent.stop="onSubmit"
        @click.stop.prevent
    >
      <div class="sign-in-title">
        Sign In
      </div>
      <label
          class="label"
      >
        <input
            type="email"
            class="sign-in-input"
            v-model="formData.email"
            minlength="5"
            placeholder="Email"
        >
      </label>
      <label
          class="label"
      >
        <input
            type="password"
            class="sign-in-input"
            v-model="formData.password"
            minlength="6"
            placeholder="Password"
        >
      </label>
      <div
          class="registration-link"
          @click="$emit('onClick')"
      >
        <router-link
            to="/auth"
        >
          Registration
        </router-link>
      </div>
      <button
          class="submit"
          type="submit"
          :disabled="buttonDisable"
          @click.stop
      >
        Sign In
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "VAuthPopup",
  data() {
    return {
      formData: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
    buttonDisable () {
      return this.formData.password.length < 6 || this.formData.email.length < 5
    }
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('signIn', this.formData)
    }
  }
}
</script>

<style scoped lang="scss">
.v-auth-popup {
  z-index: 99999;
  position: fixed;
  top: 0;
  left: 0;
  padding: 15px;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
}

.sign-in-title {
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  width: 100%;
}

.sign-in-form {
  max-width: 360px;
  border-radius: 5px;
  background: rgb(180, 220, 250);
  padding: 15px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: flex-end;

  .label {
    display: flex;
    width: 100%;
  }

  .sign-in-input {
    padding: 5px 15px;
    width: 100%;
    border: none;
    border-radius: 5px;
    background: #ffffff;

    &:focus {
      border: none;
      outline: none;
    }
  }
}
.registration-link {
  display: flex;
  align-items: center;
  font-size: 14px;
  > * {
    color: #3f6fa2;
  }
}
.submit {
  display: block;
  border: none;
  background: #3f6fa2;
  border-radius: 5px;
  color: #cfecfc;
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
}
[disabled] {
  opacity: 0.5;
  cursor: default;
}
</style>