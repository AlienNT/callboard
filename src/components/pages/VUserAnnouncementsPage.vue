<template>
  <div class="row v-category-page">
    <div class="col user-info">
      <div class="title">user info</div>
      <div
          v-if="authorInfo?.name"
          class="user-field"
      >
        <span class="user-info__label">name:</span>
        <span>{{ authorInfo?.name }}</span>
      </div>
      <div
          v-if="authorInfo?.email"
          class="user-field"
      >
        <span class="user-info__label">email:</span>
        <a
            :href="`mailto:${ authorInfo?.email }`"
        >
          {{ authorInfo?.email }}
        </a>

      </div>
      <div
          v-if="authorInfo?.phone"
          class="user-field"
      >
        <span class="user-info__label">phone:</span>
        <a
            :href="`tel:${authorInfo?.phone }`"
        >
          {{ authorInfo?.phone }}
        </a>

      </div>
      <div
          v-if="date"
          class="user-field"
      >
        <span class="user-info__label">registration date:</span>
        {{ date }}

      </div>
      <div
          v-if="userAnnouncements?.length"
          class="user-field"
      >
        <span class="user-info__label">posts:</span>
        {{ userAnnouncements?.length }}

      </div>
    </div>
    <div class="col product-list">
      <VProductsList
          :data="userAnnouncements"
      />
    </div>
  </div>
</template>

<script>
import VProductsList from "@/components/VProductsList.vue";
import {httpRequest} from "@/store";

export default {
  name: "VUserAnnouncementsPage",
  components: {
    VProductsList
  },
  data() {
    return {
      authorInfo: {}
    }
  },
  computed: {
    authorId() {
      return this.$route.params.authorId
    },
    userAnnouncements() {
      return this.$store.getters['getAnnouncements'].filter(item => item?.author?._id === this.authorId)
    },
    date() {
      return this.formattedDate(this.authorInfo?.created_at)
    }
  },
  methods: {
    formattedDate(date) {
      return new Date(date).toLocaleDateString()

    },
    async fetchUser() {
      const response = await httpRequest('get', `/user/${this.authorId}`)
      const {data} = response?.data
      if (data) {
        this.authorInfo = data
      }
    }
  },
  watch: {
    authorId: {
      handler(e) {
        if (e) {
          this.fetchUser()
        }
      }, immediate: true
    }
  },
  mounted() {
    console.log('authorId', this.authorId)

  }
}
</script>

<style scoped lang="scss">
.v-category-page {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
}

.product-list {
  flex: 1 1 75%
}

.user-info {
  padding: 15px;
  flex: 1 1 25%;
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-bottom: 15px;
  gap: 5px;

  .title {
    font-size: 20px;
    text-align: center;

    &:first-letter {
      text-transform: uppercase;
    }
  }
}

.user-field {
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  padding: 5px 15px;
  background: #cfecfc;
  font-size: 16px;
}

.user-info__label {
  font-weight: 600;
  display: block;

  &:first-letter {
    text-transform: uppercase;
  }
}
</style>