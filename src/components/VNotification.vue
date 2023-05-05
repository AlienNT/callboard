<template>
	<div
		:class="{
        'active':isMounted
			}"
		class="notification"
		@click.stop="onClick(false)"
	>
		<div class="notification__container">
			<div class="title">
				{{ message }}
			</div>
			<div
				v-if="type === 'confirm'"
				class="notification__buttons"
			>
				<button
					class="accept"
					type="button"
					@click.stop.prevent="onClick(true)"
				>
					Ok
				</button>
				<button
					class="cancel"
					type="button"
					@click.stop.prevent="onClick(false)"
				>
					Cancel
				</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
    name: "VNotification",
    props: {
        type: {
            type: String,
            default: 'alert'
        },
        message: {
            type: String,
            default: null
        },
        delay: {
            type: Number,
            default: 2000
        }
    },
    data() {
        return {
            isMounted: false
        }
    },
    methods: {
        onClick(val) {
            this.$emit('onClick', val)
            this.$emit('onClose')
        }
    },
    mounted() {
        if (this.type === 'alert') {
            setTimeout(() => {
                this.$emit('onClose')
            }, this.delay)
        }
       setTimeout(() => this.isMounted = true)
    }
}
</script>

<style lang="scss" scoped>
.notification {
  position: fixed;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.49);
  top: 0;
  left: 0;
  padding: 15px;
  display: flex;
	z-index: 99999;

}

.notification__container {
  margin: auto;
  border-radius: 5px;
  padding: 15px;
  background: white;
  width: fit-content;
  transition: .5s ease;
  transform: translateY(-100vh);

  .active & {
    transform: translateY(0);
  }
}

.title {
  margin-bottom: 15px;
}

.notification__buttons {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.accept,
.cancel {
  transition: .2s ease;
  display: block;
  border-radius: 5px;
  letter-spacing: 1px;
  padding: 5px 15px;
}

.accept {
  background: #e8e6e6;

  &:hover {
    background: darken(#e8e6e6, 5%);
  }
}

.cancel {
  background: #3f6fa2;
  color: white;

  &:hover {
    background: lighten(#3f6fa2, 5%);
  }
}

</style>