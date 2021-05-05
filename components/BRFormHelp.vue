<template>
	<v-overlay
		absolute
		opacity="0.9"
		:value="showOverlay"
	>
		<div style="text-align: center; margin: 34px">
			<div 
				style="text-align: left"
				v-html='helpText'
			/>
			<v-btn color="danger" @click="onClickClose">
				Close
			</v-btn>
		</div>
	</v-overlay>
</template>

<script>
export default {
	computed: {
		helpText() {
			return this.$store.getters.helpText;
		},
		showOverlay() {
			return !!this.$store.getters.helpText;
		},
	},
	methods: {
		onClickClose() {
			this.$store.dispatch('updateHelpText', '');
		}
	}
}
</script>