<template>
	<div class="d-flex row">
		<div class="d-flex col">
			<div style="margin-bottom: 3px;">
				<b>
					Total
				</b>
			</div>
			<div style="font-size: 1.6em;">
				£{{ totalCost.toFixed(2) }}
			</div>
		</div>
		<div class="d-flex col">
			<div
				v-for="output in outputs"
				:key="output.label"
				class="right"
			>
				<hr v-if="output.newSection" style="margin: 5px 0 5px 0;"/>
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
				petrol: 0.4,
				vanHire: 40,
			},
			markup: 1.3,
		};
	},
	computed: {
		/**
		 * Costs
		 */
		deliveryCost() {
			return (
				this.fields.distance.value * this.costs.petrol
				+ this.fields.journeyTime.value * this.costs.vanHire
			);
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
		boardsCost() {
			return this.costs.boards * this.boards;
		},
		fixingsCost() {
			if (!this.boardsLengthCm) {
				return 0;
			}

			return this.costs.fixings + this.costs.fixings * Math.floor(this.fields.width.value / 100)
		},
		sandpaperCost() {
			if (!this.boardsLengthCm) {
				return 0;
			}

			return this.costs.sandpaper + this.costs.sandpaper * Math.floor(this.boardsLengthCm / 100);
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
				return this.boardsArea;
			}

			return 0;
		},
		
		/**
		 * Other outputs
		 */
		boardsLengthCm() {
			let boardsLengthCm = (
				this.fields.height.value * 2
				+ this.fields.width.value * 8
			);

			return boardsLengthCm;
		},
		boards() {
			let boardMeters = Math.ceil(this.boardsLengthCm / 100);
			
			if (this.depth > 22 && this.depth <= 25) {
				boardMeters * 1.2;
			}

			if (this.depth > 25 && this.depth <= 32) {
				boardMeters * 1.5;
			}

			if (this.depth > 32) {
				boardMeters *= 2;
			}

			if (this.fields.melting.value) {
				boardMeters * 1.2;
			}

			if (this.fields.irregularDepth.value) {
				boardMeters * 1.2;
			}

			return boardMeters;
		},
		boardsArea() {
			let area = this.boards;
			
			if (this.fields.depth.value > 22 && this.fields.depth.value <= 32) {
				area *= 1.5;
			}

			if (this.fields.depth.value > 32) {
				area *= 2;
			}

			return Math.ceil(area);
		},
		weight() {
			return Math.floor(this.boardsLengthCm / 100) * 1.1;
		},
		labourHours() {
			let hours = this.boards;

			if (this.fields.waxed.value) {
				let waxingHours = Math.ceil(this.boardsArea / 10);

				if (this.fields.multiBrown.value) {
					waxingHours *= 2;
				}

				hours += waxingHours;
			}
			
			if (this.fields.depth.value < 22) {
				hours *= 1.2;
			}

			// 22cm is no change to hours

			if (this.fields.depth.value > 22 && this.fields.depth.value <= 25) {
				hours *= 1.8;
			}
			
			if (this.fields.depth.value > 25 && this.fields.depth.value <= 32) {
				hours *= 2;
			}

			if (this.fields.depth.value > 32) {
				hours *= 2.5;
			}

			// Add specialty labour
			
			let collapsingHours = 0;
			let meltingHours = 0;
			let irregularDepthHours = 0;

			if (this.fields.collapsing.value) {
				collapsingHours = hours * 1.5;
			}

			if (this.fields.melting.value) {
				meltingHours = hours * 3;
			}

			if (this.fields.irregularDepth.value) {
				irregularDepthHours = hours * 1.5;
			}

			hours = hours + collapsingHours + meltingHours + irregularDepthHours;

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
					value: this.fixingsCost.toFixed(2),
				},
				sandpaper: {
					label: 'Sandpaper',
					unit: {
						label: '£',
						prepend: true,
					},
					value: this.sandpaperCost.toFixed(2),
				},
				waxing: {
					label: 'Wax',
					unit: {
						label: '£',
						prepend: true,
					},
					value: this.waxedCost.toFixed(2),
				},
				materialCost: {
					label: 'Material cost',
					unit: {
						label: '£',
						prepend: true,
					},
					value: this.boardsCost.toFixed(2),
				},
				materials: {
					label: 'Material length',
					unit: {
						label: 'm',
						prepend: false,
					},
					value: this.boards,
				},
				labour: {
					label: 'Labour',
					unit: {
						label: 'hrs',
						prepend: false,
					},
					value: this.labourHours.toFixed(2),
				},
				weight: {
					label: 'Weight',
					unit: {
						label: 'kg',
						prepend: false,
					},
					value: Math.round(this.weight * 100) / 100,
				},
				delivery: {
					label: 'Delivery',
					unit: {
						label: '£',
						prepend: true,
					},
					value: this.deliveryCost.toFixed(2),
					newSection: true,
				}
			}
		}
	},
}
</script>