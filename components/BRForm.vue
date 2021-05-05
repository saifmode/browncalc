<template>
	<v-form>
		<div v-for="field in fields" :key="field.attrs.id">
			<v-text-field
				v-if="field.attrs.is === 'v-text-field'"
				v-bind="field.attrs"
				v-model="field.value"
				:append-icon='field.help ? "mdi-help-circle-outline" : null'
				@click:append="$store.dispatch('updateHelpText', field.help)"
			/>
			<v-checkbox
				v-else-if="field.attrs.is === 'v-checkbox'"
				v-bind="field.attrs"
				v-model="field.value"
				:append-icon='field.help ? "mdi-help-circle-outline" : null'
				@click:append="$store.dispatch('updateHelpText', field.help)"
			/>
			<v-slider
				v-else-if="field.attrs.is === 'v-slider'"
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