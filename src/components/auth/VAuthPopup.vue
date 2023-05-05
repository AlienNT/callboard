<template>
	<div
		class="v-auth-popup"
		@click.stop="$emit('onClick')"
	>
		<form
			:class="{
        'form-error': status.error && !status.success,
        'form-success': status.success && !status.error
		}"
			class="sign-in-form"
			@submit.prevent.stop="onSubmit"
			@click.stop.prevent
		>
			<div class="row">
				<div class="sign-in-title form-title">
					{{ title }}
				</div>
			</div>
			<label
				class="label"
			>
				<input
					v-model="formData.email"
					:class="{
            'form-error': errors?.email
					}"
					class="sign-in-input"
					minlength="5"
					placeholder="Email"
					type="email"
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
					class="sign-in-input"
					minlength="6"
					placeholder="Password"
					type="password"
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
				:disabled="buttonDisable"
				class="submit"
				type="submit"
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
        buttonDisable() {
            return this.formData.password.length < 6 || this.formData.email.length < 5
        },
        title() {
            if (this.status.error) {
                return 'Error!'
            }
            if (this.status.success) {
                return 'Success!'
            }
            return 'Sign In'
        },
    },
    methods: {
        signIn() {
            return this.$store.dispatch('signIn', this.formData)
        },
        async onSubmit() {
            const response = await this.signIn()
                .then(res => res)
                .catch(err => err.response)

            this.setRequestStatus(response, this.actionDelay)
        },
        setRequestStatus(response, delay = 2000) {
            const isSuccess = response.status.toString()[0] === '2'
            if (isSuccess) {
                this.status = {
                    error: false,
                    success: true,
                }
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
    }
}
</script>

<style lang="scss" scoped>
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
  margin-bottom: 0;
}

.sign-in-form {
  overflow: hidden;
  max-width: 360px;
  border-radius: 5px;
  background: rgb(180, 220, 250, 0.95);
  padding: 0 15px 15px;
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

</style>