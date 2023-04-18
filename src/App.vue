<template>
  <div class="main-wrapper">
    <div class="header-wrapper">
      <VHeader></VHeader>
    </div>
    <div class="content-wrapper">
      <div class="container">
        <router-view></router-view>
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
  background: rgba(148, 184, 215, 0.81);
}

.main-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.content-wrapper {
  overflow-y: auto;
  flex: auto;
  padding-top: 15px;
  padding-bottom: 30px;
  display: flex;
  height: 100%;
  .container {
    height: 100%;
  }
}

</style>
