<template>
	<div class="main-wrapper">
		<div class="header-wrapper">
			<VHeader></VHeader>
		</div>
		<div class="content-wrapper">
			<div class="container">
				<router-view/>
			</div>
		</div>
	</div>
</template>
<script>
//todo fix animation
import VHeader from "@/components/VHeader.vue";

export default {
    name: "App",
    components: {
        VHeader
    },
    data() {
        return {
            windowHeight: 0
        }
    },
    methods: {
        async fetchAnnouncements() {
            this.$store.dispatch('fetchAnnouncements')
        },
        setVH(value) {
            document.documentElement.style.setProperty('--vh', `${value * 0.01}px`)
        },
    },
    watch: {
        windowHeight: {
            handler(e) {
                this.setVH(e)
            },
            immediate: true
        }
    },
    mounted() {
        // this.fetchAnnouncements()
        document.title = 'Genshin Bulletin Board'
        window.onload = () => {
            this.windowHeight = window.innerHeight
        }
        window.onresize = () => {
            this.windowHeight = window.innerHeight
        }
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
