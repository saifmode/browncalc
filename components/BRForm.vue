<template>
	<v-form>
		<div v-for="field in fields" :key="field.attrs.id">
			<div v-if="field.attrs.is === 'division'" style="margin-top: 21px;">
				
				<h2 style="margin-top: 21px; margin-bottom: 34px">
					{{field.value}}
				</h2>
			</div>
			<v-text-field
				v-else-if="field.attrs.is === 'v-text-field'"
				v-bind="field.attrs"
				v-model="field.value"
				:append-icon='field.help ? "mdi-help-circle-outline" : null'
				@click:append="$store.dispatch('updateHelpText', field.help)"
			/>
			<v-checkbox
				v-else-if="field.attrs.is === 'v-checkbox'"
				v-bind="field.attrs"
				v-model="field.value"
				style="width: 28%;"
				:append-icon='field.help ? "mdi-help-circle-outline" : null'
				:disabled="field.attrs.id === 'multiBrown' ? multiBrownDisabled : false"
				@click="onClickCheckbox(field.attrs.id)"
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
	computed: {
		multiBrownDisabled() {
			return !this.waxed;
		},
		waxed() {
			return this.$store.getters.waxed;
		},
	},
	methods: {
		onClickCheckbox(id) {
			if (id === 'waxed') {
				this.$store.commit("setWaxed", !this.waxed);
			}
		}
	},
}
</script>