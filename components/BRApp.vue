<template>
	<div id="app">
		<b-r-form :fields="fields" />
		<b-r-report :fields="fields" />
	</div>
</template>

<script>
export default {
	data() {
		return {
			fields: {
				height: {
					attrs: {
						id: 'height',
						is: 'v-text-field',
						label: 'Height (cm)',
						max: 300,
						type: 'number',
					},
					value: 0,
				},
				width: {
					attrs: {
						id: 'width',
						is: 'v-text-field',
						label: 'Width (cm)',
						max: 300,	
						type: 'number',
					},
					value: 0,
				},
				depth: {
					attrs: {
						id: 'depth',
						is: 'v-text-field',
						label: 'Depth (cm)',
						max: 42,
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
				thickness: {
					attrs: {
						id: 'thickness',
						disabled: true,
						is: 'v-text-field',
						label: 'Thickness (cm)',
						type: 'number',
					},
					value: 3.5,
				},
				waxed: {
					attrs: {
						id: 'waxed',
						is: 'v-checkbox',
						label: 'Waxed',
					},
					value: true,
					help: `
					<p>
						Wax is not essential but is highly recommended.
					</p>
					<p>
						Available in a selection of colours, it will protect the wood from moisture, adding longevity to your shelves
						to create a smooth, unmatchable finish.
					</p>
					`,
				},
				notched: {
					attrs: {
						id: 'notched',
						is: 'v-checkbox',
						label: 'Notched',
					},
					value: false,
					help: `<p>
						Does your shelving unit require notching to fit around skirting boards, plug sockets, or anything similar?
					</p>`,
				},
				divisionSpeciality: {
					attrs: {
						is: 'division',
					},
					value: "Speciality Shelves"
				},
				collapsing: {
					attrs: {
						is: 'v-checkbox',
						id: 'collapsing',
						label: "Collapsing",
					},
					value: false,
				},
				melting: {
					attrs: {
						is: 'v-checkbox',
						id: 'melting',
						label: "Melting",
					},
					value: false,
				},
				irregularDepth: {
					attrs: {
						is: 'v-checkbox',
						id: 'irregularDepth',
						label: "Irregular Depth",
					},
					value: false,
				},
				multiBrown: {
					attrs: {
						is: 'v-checkbox',
						id: 'multiBrown',
						label: "Multi-brown",
					},
					value: false,
				},
				divisionFriendship: {
					attrs: {
						is: 'division',
					},
					value: "Customer Type"
				},
				friendship: {
					attrs: {
						id: 'friendship',
						is: 'v-slider',
						max: 4,
						step: 1,
						style: 'font-size: 0.7em',
						tickLabels: [
					        'Legend',
					        'Friend',
							'Returning',
					        'New',
					        'Dickhead',
					      ],
					    ticks: 'always',
					    tickSize: 4,
					},
					multipliers: [
						0.85,
						0.9,
						0.95,
						1,
						1.2,
					],
					value: 3,
				},
				divisionDelivery: {
					attrs: {
						is: 'division',
					},
					value: "Delivery"
				},
				distance: {
					attrs: {
						id: 'distance',
						is: 'v-text-field',
						label: 'Distance from Brown Reclaimed, S2 4BH (miles)',
						type: 'number',
					},
					value: 0,
				},
				journeyTime: {
					attrs: {
						id: 'journey-time',
						is: 'v-text-field',
						label: 'Journey Time (hrs)',
						type: 'number',
					},
					value: 0,
				},
				divisionCost: {
					attrs: {
						is: 'division',
					},
					value: "Costs"
				},
			},
		};
	},
}
</script>