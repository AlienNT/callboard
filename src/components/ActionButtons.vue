<template>
	<div class="action-buttons-wrapper">
		<div
			class="button edit"
			title="edit"
			@click.prevent.stop="$emit('onEdit')"
		>
			<div class="button-inner"/>
		</div>
		<div
			class="button delete"
			title="delete"
			@click.prevent.stop="$emit('onDelete')"
		>
			<div class="button-inner"/>
		</div>
	</div>
</template>

<script>
export default {
    name: "ActionButtons"
}
</script>

<style lang="scss" scoped>

.action-buttons-wrapper {
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px;
  display: flex;
  gap: 10px;

  .button {
    display: flex;
    position: relative;
    height: 25px;
    width: 25px;
    cursor: pointer;
    padding: 3px;
    border-radius: 5px;
    transition: .2s ease;

    &.edit {
      background-color: transparentize(#5ca45c, .5);

      &:hover {
        background-color: darken(#5ca45c, 5%);
      }
    }

    &.delete {
      background-color: transparentize(#c47575, .5);

      &:hover {
        background-color: darken(#c47575, 5%);
      }
    }

  }
}

.button-inner {
  display: block;
  flex: auto;
  mask-position: center;
  mask-size: contain;
  mask-repeat: no-repeat;

  .edit & {
    background: white;
    mask-image: url("/src/assets/images/edit-svgrepo-com.svg");

  }

  .delete & {
    background: white;
    mask-image: url("/src/assets/images/delete-svgrepo-com.svg");
  }
}
</style>