<template>
  <form
      class="v-announcement-form"
      @submit.prevent.stop="onSubmit"
  >
    <div class="announcement-form__image-preview">
      <div class="image-wrapper">
        <VImage
            :src="fileImage || uploadImage"
            background="rgb(46, 78, 105, 0.8)"
            alt="preview"
        />
      </div>
    </div>
    <div class="announcement-form__fields">
      <label
          class="announcement-form__label"
      >
        <input
            placeholder="title"
            type="text"
            class="announcement-form__input"
            v-model="formData.title"
        >
      </label>
      <div class="image-loader">
        <label
            class="announcement-form__label"
        >
          <input
              placeholder="image"
              type="text"
              class="announcement-form__input"
              :disabled="isFile"
              @blur="onBlur"
          >
        </label>
        <label
            class="announcement-form__label"
        >
          <input
              placeholder="image"
              type="file"
              class="announcement-form__input"
              :disabled="isLink"
              @change="uploadFile"
          >
        </label>
      </div>
      <label
          class="announcement-form__label"
      >
        <input
            placeholder="price"
            type="number"
            class="announcement-form__input"
            v-model="formData.price"
        >
      </label>
      <label
          class="announcement-form__label"
      >
      <textarea
          placeholder="description"
          class="announcement-form__input"
          v-model="formData.description"
      />
      </label>
      <button
          class="submit"
          :disabled="!isValid"
      >
        submit
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
      fileImage: null
    }
  },
  computed: {
    isFile() {
      return !!this.fileImage
    },
    isLink() {
      return !!this.uploadImage
    },
    isValid () {
      return !!this.formData.title?.trim()?.length
    }
  },
  methods: {
    getFormData() {
      return {...this.formData, image: this.uploadImage || this.fileImage || null}
    },
    async onSubmit(e) {
      if (this.isValid) {
        const result = await this.createAnnouncement();
        console.log('onSubmit', result)
        if (result._id) {
          alert('create success')
          this.clearFormData(e)
        }
      }
    },
    onBlur(e) {
      this.uploadImage = e.target.value
    },
    clearFormData(e) {
      e.target.reset()
      this.formData = {
        title: '',
        description: '',
        price: null
      }
      this.uploadImage = ''
      this.fileImage = ''
    },
    async createAnnouncement() {
      return await this.$store.dispatch('createAnnouncement', this.getFormData())
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
      const image = await this.fileToData(e.target.files[0])
      this.fileImage = image
    }
  },
}
</script>

<style scoped lang="scss">
.v-announcement-form {
  margin: auto;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
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