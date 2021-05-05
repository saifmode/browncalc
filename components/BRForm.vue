<template>
	<v-form>
		<div v-for="field in fields" :key="field.attrs.id">
			<component
				v-bind="field.attrs"
				v-model="field.value"
				:append-icon='field.help ? "mdi-help-circle-outline" : null'
				@click:append="$store.dispatch('updateHelpText', field.help)"
			/>
		</div>
		<b-r-form-help />
	</v-form>
</template>

<script>
export default {
	props: {
		fields: {
			type: Object,
			required: true,
		},
	},
}
</script>