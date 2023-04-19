<template>
  <div class="main-wrapper">
    <div class="header-wrapper">
      <VHeader></VHeader>
    </div>
    <div class="content-wrapper">
      <div class="container">
        <router-view v-slot="{ Component, route }">
          <transition
              :name="route.meta.transition || 'fade'"
              appear
              mode="out-in"
          >
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>
<script>
import VHeader from "@/components/VHeader.vue";

export default {
  name: "App",
  components: {
    VHeader
  },
  mounted() {
    document.title = 'Genshin Bulletin Board'
  }
}
</script>
<style lang="scss">
@import "./assets/css/main.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.main-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.content-wrapper {
  max-width: 100vw;
  flex: auto;
  display: flex;
  height: 100%;
  overflow-y: overlay;
  padding-top: 15px;
  padding-bottom: 30px;
  background: rgba(148, 184, 215, 0.81);
  overflow-x: hidden;
  .container {
    min-height: 100%;
    display: flex;
  }
}

</style>
