<template>
	<div class="d-flex row">
		<div class="d-flex col">
			<div>
				<b>
					Total
				</b>
			</div>
			<div>
				£{{ getCostDisplay(totalCost) }}
			</div>
		</div>
		<div class="d-flex col">
			<div
				v-for="output in outputs"
				class="right"
			>
				<span>
					<b>
						{{ output.label }}
					</b>
				</span>
				<span v-if="output.unit.prepend">
					{{ output.unit.label }}{{output.value}}
				</span>
				<span v-else>
					{{ output.value }} {{ output.unit.label }}
				</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		fields: {
			type: Object,
			required: true,
		}
	},
	data() {
		return {
			costs: {
				boards: 6.5,
				fixings: 5,
				sandpaper: 0.6,
				labour: 15,
				notchLt: 30,
				notchGt: 50,
			},
			markup: 1.3,
		};
	},
	computed: {
		/**
		 * Costs
		 */
		boardsCost() {
			return this.costs.boards * this.boardsLength;
		},
		fixingsCost() {
			return this.costs.fixings + this.costs.fixings * Math.floor(this.fields.width.value / 100)
		},
		sandpaperCost() {
			return this.costs.sandpaper + this.costs.sandpaper * this.boardsLength;
		},
		labourCost() {
			return this.costs.labour * this.labourHours;
		},
		notchedCost() {
			if (this.fields.notched.value) {
				return this.fields.depth.value <= 22 ? this.costs.notchLt : this.costs.notchGt;
			}

			return 0;
		},
		waxedCost() {
			if (this.fields.waxed.value) {
				return this.boardsLength;
			}

			return 0;
		},
		totalCost() {
			const total = (
				this.labourCost * this.markup
				+ this.boardsCost * this.markup
				+ this.waxedCost * this.markup
				+ this.notchedCost
				+ this.fixingsCost
				+ this.sandpaperCost
			)
			
			return total * this.fields.friendship.multipliers[
				this.fields.friendship.value
			]
		},
		

		/**
		 * Other outputs
		 */
		boardsLength() {
			return Math.ceil(
				(
					(this.fields.height.value * 2)
					+ (this.fields.width.value * 8)
				)
				/ 100
			)
		},
		boardsArea() {
			if (this.fields.depth.value <= 22) {
				return this.boardsLength;
			} else if (this.fields.depth.value > 22 && this.fields.depth.value <= 32) {
				return this.boardsLength * 1.5;
			} else if (this.fields.depth.value > 32) {
				return this.boardsLength * 2;
			};
		},
		weight() {
			return this.boardsLength * 1.1;
		},
		labourHours() {
			let hours = this.boardsLength;

			if (this.fields.waxed.value) {
				hours += Math.ceil(this.boardsArea / 10);
			}
			
			if (this.fields.depth.value < 22) {
				hours = hours * 1.2
			}

			if (this.fields.depth.value > 22) {
				hours = hours * 2
			}

			return hours;
		},

		/**
		 * Outputs
		 */
		outputs() {
			return {
				fixings: {
					label: 'Fixings',
					unit: {
						label: '£',
						prepend: true,
					},
					value: this.getCostDisplay(this.fixingsCost),
				},
				sandpaper: {
					label: 'Sandpaper',
					unit: {
						label: '£',
						prepend: true,
					},
					value: this.getCostDisplay(this.sandpaperCost),
				},
				waxing: {
					label: 'Waxing',
					unit: {
						label: '£',
						prepend: true,
					},
					value: this.getCostDisplay(this.waxedCost),
				},
				materials: {
					label: 'Materials',
					unit: {
						label: 'm',
						prepend: false,
					},
					value: this.boardsLength,
				},
				labour: {
					label: 'Labour',
					unit: {
						label: 'hrs',
						prepend: false,
					},
					value: this.labourHours,
				},
				weight: {
					label: 'Weight',
					unit: {
						label: 'kg',
						prepend: false,
					},
					value: Math.round(this.weight * 100) / 100,
				}
			}
		}
	},
	methods: {
		getCostDisplay(cost) {
			let roundedCost = (Math.round(cost * 100) / 100).toString();
			let splitCost = roundedCost.split('.')

			if (splitCost.length === 1) {
				return roundedCost + '.00';
			}

			return splitCost[1].length > 1 ? roundedCost : roundedCost + '0';
		}
	}
}
</script>