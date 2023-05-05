<template>
	<form
		:class="{
        'form-error': status.error && !status.success,
        'form-success': status.success && !status.error
		}"
		class="v-registration-form"
		@submit.prevent.stop="onSubmit"
	>
		<div class="row">
			<div class=" form-title">
				{{ title }}
			</div>
		</div>
		<label
			class="label"
		>
			<input
				v-model="formData.name"
				:class="{
            'form-error': errors?.name
					}"
				class="registration-input name"
				name="name"
				placeholder="name *"
				required
				type="text"
				@input="errors.name = null"
			>
		</label>
		<label
			class="label"
		>
			<input
				v-model="formData.email"
				:class="{
            'form-error': errors?.email
					}"
				class="registration-input email"
				name="email"
				placeholder="email *"
				required
				type="email"
				@input="errors.email = null"
			>
		</label>
		<label
			class="label"
		>
			<input
				v-model="formData.phone"
				:class="{
            'form-error': errors?.phone
					}"
				class="registration-input phone"
				name="phone"
				placeholder="phone"
				type="tel"
				@input="errors.phone = null"
			>
		</label>
		<label
			class="label"
		>
			<input
				v-model="formData.password"
				:class="{
            'form-error': errors?.password
					}"
				class="registration-input password"
				name="password"
				placeholder="password *"
				required
				type="password"
				@input="errors.password = null"
			>
		</label>
		<label
			class="label"
		>
			<input
				v-model="formData.confirmPassword"
				class="registration-input password"
				name="confirm-password"
				placeholder="confirm password *"
				required
				type="password"
			>
		</label>
		<button
			:disabled="isButtonDisabled"
			class="submit"
			type="submit"
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
            },
            status: {
                error: false,
                success: false,
                action: false
            },
            errors: {},
            actionDelay: 2000
        }
    },
    computed: {
        isButtonDisabled() {
            return this.formData.password !== this.formData.confirmPassword ||
                !this.formData.email ||
                !this.formData.name ||
                this.formData.password.length < 8
        },
        title() {
            if (this.status.error) {
                return 'error!'
            }
            if (this.status.success) {
                return 'success!'
            }
            return 'create account'
        },
    },
    methods: {
        async onSubmit() {
            const response = await this.registration()
                .then(res => res)
                .catch(err => err.response)

            if (response?.data?.data?._id) {
                this.clearFormData()
            }
            this.setRequestStatus(response, this.actionDelay)
        },
        setRequestStatus(response, delay = 2000) {
            const isSuccess = response.status.toString()[0] === '2'
            if (isSuccess) {
                this.status = {
                    error: false,
                    success: true,
                }
                setTimeout(() => {
                    // this.$router.back()
                }, this.actionDelay)
            } else {
                this.status = {
                    error: true,
                    success: false,
                }
                this.errors = response.data.errors
            }
            setTimeout(() => {
                this.status = {
                    error: false,
                    success: false,
                }
            }, delay)
        },
        clearFormData() {
            this.formData = {
                name: '',
                email: '',
                phone: '',
                password: '',
                confirmPassword: ''
            }
        },
        async registration() {
            return this.$store.dispatch('registration', this.formData)
        },
        async fetchUsers() {
            return await this.$store.dispatch('fetchUsers')
        }
    }
}
</script>

<style lang="scss" scoped>
.v-registration-form {
  max-width: 400px;
  width: 100%;
  margin: auto;
  border-radius: 5px;
  padding: 0 15px 15px;
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
  text-align: center;
	&:first-letter {
    text-transform: uppercase;
	}
}

.registration-input {
  border-radius: 5px;
  padding: 5px 15px;
}

.submit {
  margin-left: auto;
}
</style>