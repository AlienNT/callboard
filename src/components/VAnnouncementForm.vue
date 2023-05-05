<template>
	<form
		:class="{
        'form-error': status.error && !status.success,
        'form-success': status.success && !status.error
		}"
		class="v-announcement-form"
		@submit.prevent.stop="onSubmit"
	>
		<div class="form-title">
			{{ title }}
		</div>
		<div class="announcement-form__image-preview">
			<div class="image-wrapper">
				<VImage
					:src="fileImage || uploadImage"
					alt="preview"
					background="rgb(46, 78, 105, 0.8)"
				/>
			</div>
		</div>
		<div class="announcement-form__fields">
			<label
				class="announcement-form__label"
			>
				<input
					v-model="formData.title"
					:class="{
            'form-error': errors?.title
					}"
					class="announcement-form__input"
					placeholder="title *"
					type="text"
					@input="errors.title = null"
				>
			</label>
			<div class="image-loader">
				<label
					class="announcement-form__label"
				>
					<input
						v-model="formData.image"
						:disabled="isFile"
						class="announcement-form__input"
						placeholder="image"
						type="text"
						@blur="onBlur"
					>
				</label>
				<label
					class="announcement-form__label"
				>
					<input
						:disabled="isLink"
						accept="image/png, image/jpeg"
						class="announcement-form__input"
						placeholder="image"
						type="file"
						@change="uploadFile"
					>
				</label>
			</div>
			<label
				class="announcement-form__label"
			>
				<input
					v-model="formData.price"
					:class="{
            'form-error': errors?.price
					}"
					class="announcement-form__input"
					placeholder="price"
					type="number"
					@input="errors.price = null"
				>
			</label>
			<label
				class="announcement-form__label"
			>
<textarea
	v-model="formData.description"
	:class="{
      'form-error': errors?.description
	}"
	class="announcement-form__input"
	placeholder="description"
	@input="errors.description = null"
/>
			</label>
			<button
				:disabled="!isValid || isEqualFormData || status.error"
				class="form-submit submit"
			>
				{{ !isNew ? 'update' : 'submit' }}
			</button>
		</div>
	</form>
</template>

<script>
import VImage from "@/components/VImage.vue";

export default {
    name: "VAnnouncementForm",
    components: {
        VImage
    },
    data() {
        return {
            formData: {
                title: '',
                description: '',
                price: null
            },
            uploadImage: null,
            fileImage: null,
            status: {
                error: false,
                success: false,
                action: false
            },
            errors: {},
            oldFormDataStr: '',
            actionDelay: 2000
        }
    },
    computed: {
        isFile() {
            return !!this.fileImage
        },
        isLink() {
            return !!this.uploadImage || !!this.formData.image
        },
        isValid() {
            return !!this.formData.title?.trim()?.length
        },
        router() {
            return this.$route
        },
        id() {
            return this.$route?.params?.id
        },
        announcement() {
            return this.id ? this.$store.getters['getAnnouncement'](this.id) : null
        },
        isNew() {
            return !this.id
        },
        title() {
            if (this.status.error) {
                return 'error!'
            }
            if (this.status.success) {
                return 'success!'
            }
            return !this.isNew ? 'Update post' : 'Add new post'
        },
        isEqualFormData() {
            return this.oldFormDataStr === JSON.stringify(this.formData)
        }
    },
    watch: {
        announcement: {
            handler(e) {
                this.setAnnouncementFields(e)
            },
            immediate: true
        },
        id: {
            handler(e) {
                if (!e) this.clearFormData()
            },
            immediate: true
        }
    },
    methods: {
        setAnnouncementFields(data) {
            if (!data) return
            const {title, description, price, image} = data
            this.formData = {
                title,
                description,
                price,
                image
            }
            this.uploadImage = image
        },
        getFormData() {
            return {...this.formData, image: this.formData.image || this.uploadImage || this.fileImage || null}
        },
        onBlur(e) {
            this.uploadImage = e.target.value
        },
        clearFormData(e) {
            if (e) e.target.reset()
            this.formData = {
                title: '',
                description: '',
                price: null
            }
            this.uploadImage = ''
            this.fileImage = ''
        },
        async onSubmit(e) {
            if (!this.isValid) return
            if (this.isNew) {
                const response = await this.createAnnouncement()
                    .then(res => res)
                    .catch(err => err.response)

                if (response?.data?.data?._id) {
                    this.clearFormData(e)
                }

                this.setRequestStatus(response, this.actionDelay)
            } else {
                const response = await this.updateAnnouncement();
                this.setRequestStatus(response, this.actionDelay)
            }
        },
        async createAnnouncement() {
            return await this.$store.dispatch('createAnnouncement', this.getFormData())
        },
        async updateAnnouncement() {
            return await this.$store.dispatch('updateAnnouncement', {data: this.getFormData(), _id: this.id})
        },
        async fileToData(file) {
            if (!file) return

            return await new Promise(resolve => {
                const reader = new FileReader();

                reader.onloadend = () => resolve(reader.result)
                reader.readAsDataURL(file);
            })
        },
        async uploadFile(e) {
            this.fileImage = await this.fileToData(e.target.files[0])
        },
        setRequestStatus(response, delay = 2000) {
            const isSuccess = response.status.toString()[0] === '2'
            if (isSuccess) {
                this.status = {
                    error: false,
                    success: true,
                }
                setTimeout(() => {
                    this.$router.back()
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
        }
    },
    mounted() {
        this.oldFormDataStr = JSON.stringify(this.formData)
    }
}
</script>

<style lang="scss" scoped>

.v-announcement-form {
  overflow: hidden;
  transition: .5s ease;
  transform: translate(0);
  margin: auto;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  background: #cce2ff;
  border-radius: 5px;
}

.announcement-form__image-preview {
  width: 100%;

  .image-wrapper {
    border-radius: 5px;
    overflow: hidden;
  }
}

.announcement-form__image-preview,
.announcement-form__fields {
  padding: 10px;
  flex: 1 1 50%;
}

.announcement-form__fields {
  min-width: 240px;

  > * {
    margin-bottom: 10px;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.announcement-form__label {
  width: 100%;
  display: flex;
  flex-direction: column;

  textarea {
    height: 120px;
  }
}

.image-loader {
  display: flex;
  gap: 10px;
  justify-content: space-between;
}

.announcement-form__input {
  border-radius: 5px;
  padding: 5px 10px;
  background: #fff;

}
</style>