<template>
	<div>
		<b-r-form :fields="fields" />
	</div>
</template>

<script>
export default {
	data() {
		return {
			fields: [
				{
					attrs: {
						id: 'height',
						is: 'v-text-field',
						label: 'Height (cm)',
						max: 300,
						type: 'number',
					},
					value: 0,
				},
				{
					attrs: {
						id: 'width',
						is: 'v-text-field',
						label: 'Width (cm)',
						max: 300,	
						type: 'number',
					},
					value: 0,
				},
				{
					attrs: {
						id: 'depth',
						is: 'v-text-field',
						label: 'Depth (cm)',
						type: 'number',
					},
					help: `<p>
						The shelf depth has a significant effect on the price.
						</p>
						<p>
							The price brackets are as follows:
						</p>
						<p>
							<ul>
								<li>22cm</li>
								<li>Less than 22cm</li>
								<li>22cm to 32cm</li>
								<li>33 or above</li>
							</ul>
						</p>
						<p>
							This is because the timber used is 22cm wide. Anything above or below this amount will require more material and/or labour hours. Please get in touch if you require more information.
						</p>`,
					value: 22,
				},
				{
					attrs: {
						id: 'thickness',
						disabled: true,
						is: 'v-text-field',
						label: 'Thickness (cm)',
						type: 'number',
					},
					value: 3.5,
				},
				{
					attrs: {
						id: 'waxed',
						is: 'v-checkbox',
						label: 'Waxed',
					},
					value: true,
				},
				{
					attrs: {
						id: 'notched',
						is: 'v-checkbox',
						label: 'Notched',
					},
					value: false,
				},
				{
					attrs: {
						id: 'friendship',
						is: 'v-slider',
						max: 4,
						step: 1,
						style: 'font-size: 0.7em',
						tickLabels: [
					        'Legends',
					        'Friends',
							'Returns',
					        'Normies',
					        'Dickheads',
					      ],
					    ticks: 'always',
					    tickSize: 4,
					},
					value: 3,
				},
				{
					attrs: {
						id: 'distance',
						is: 'v-text-field',
						label: 'Distance from Brown Reclaimed, S2 4BH (miles)',
						type: 'number',
					},
					value: 0,
				},
				{
					attrs: {
						id: 'journeyTime',
						is: 'v-text-field',
						label: 'Journey Time (hrs)',
						type: 'number',
					},
					value: 0,
				},
			]
		}
	},
	methods: {
		getField(id) {
			return this.fields.find(field => field.attrs.id === id);
		},
	},
}
</script>