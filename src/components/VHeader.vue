<template>
  <header class="v-header">
    <div class="container">
      <div class="row">
        <div class="col logo">
          <VLogo/>
        </div>
        <div v-if="isAuth" class="col add-new">
          <div
              class="add-new-wrapper"
              :class="{
                  'active': isEdit
                }"
          >
            <router-link
                :to="isEdit ? '/':'/new-announcement'"
                class="add-new-btn"

            />
          </div>
        </div>
        <div class="col user">
          <VAuth/>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import VLogo from "@/components/VLogo.vue";
import VAuth from "@/components/auth/VAuth.vue";

export default {
  name: "VHeader",
  components: {
    VLogo,
    VAuth
  },
  computed: {
    isAuth() {
      return !!this.$store.getters['getAuthUser']?.email
    },
    isEdit() {
      return this.$route?.path === '/new-announcement'
    }
  }
}
</script>

<style lang="scss">
.v-header {
  * {
    overflow-x: unset;
  }

  background: rgb(46, 78, 105);

  .row {
    justify-content: space-between;
    flex-wrap: nowrap;

    .logo,
    .add-new,
    .user {
      flex: 1 1 33%;
    }

    .logo {
      display: flex;
      justify-content: flex-start;
    }

    .add-new {
      justify-content: center;
    }

    .user {
      justify-content: flex-end;
    }
  }

  .add-new {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .add-new-wrapper {
    border-radius: 50%;
    transition: .2s ease;
    border: 2px double #6a93bd;

    &:hover {
      border-color: lighten(#6a93bd, 10%);

      .add-new-btn {
        background: lighten(#6a93bd, 10%);
        transform: scale(0.95);
      }
    }
  }

  .active {
    .add-new-btn {
      transform: rotate(45deg);
    }
    &:hover {
      .add-new-btn {
        transform: scale(0.95) rotate(45deg);
      }
    }
  }

  .add-new-btn {
    transition: .2s ease;
    cursor: pointer;
    background: #6a93bd;
    display: block;
    width: 30px;
    height: 30px;
    mask-image: url("../assets/images/add-svgrepo-com.svg");
    mask-repeat: no-repeat;
    mask-size: contain;
    mask-position: center;

  }
}

</style>