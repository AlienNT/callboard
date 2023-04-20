<template>
  <form
      class="v-registration-form"
      @submit.prevent.stop="onSubmit"
  >
    <div class="form-title">
      Create account
    </div>
    <label
        class="label"
    >
      <input
          v-model="formData.name"
          type="text"
          name="name"
          placeholder="name"
          class="registration-input name"
          required
      >
    </label>
    <label
        class="label"
    >
      <input
          v-model="formData.email"
          type="email"
          name="email"
          placeholder="email"
          class="registration-input email"
          required
      >
    </label>
    <label
        class="label"
    >
      <input
          v-model="formData.phone"
          type="tel"
          name="phone"
          placeholder="phone"
          class="registration-input phone"
      >
    </label>
    <label
        class="label"
    >
      <input
          v-model="formData.password"
          type="password"
          name="password"
          placeholder="password"
          class="registration-input password"
          required
      >
    </label>
    <label
        class="label"
    >
      <input
          v-model="formData.confirmPassword"
          type="password"
          name="confirm-password"
          placeholder="confirm password"
          class="registration-input password"
          required
      >
    </label>
    <button
        class="submit"
        type="submit"
        :disabled="isButtonDisabled"
    >
      submit
    </button>
  </form>
</template>

<script>
export default {
  name: "VAuthForm",
  data() {
    return {
      formData: {
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  computed: {
    isButtonDisabled() {
      return this.formData.password !== this.formData.confirmPassword ||
          !this.formData.email ||
          !this.formData.name ||
          this.formData.password.length < 8
    }
  },
  methods: {
    onSubmit() {
      this.registration()
    },
    async registration() {
      this.$store.dispatch('registration', this.formData)
    },
    async fetchUsers() {
      return await this.$store.dispatch('fetchUsers')
    }
  }
}
</script>

<style scoped lang="scss">
.v-registration-form {
  max-width: 400px;
  width: 100%;
  margin: auto;
  border-radius: 5px;
  padding: 15px;
  background: #cfecfc;

  label {
    margin-bottom: 10px;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.form-title {
  margin-bottom: 15px;
  font-size: 22px;
}

.registration-input {
  border-radius: 5px;
  padding: 5px 15px;
}

.submit {
  margin-left: auto;
}
</style>