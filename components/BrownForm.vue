<template>
	<div>
		<div id="app">
		    <v-form
		      ref="form"
		      v-model="valid"
		      lazy-validation
		    >

		    	<v-text-field
					v-model="form.height"
					label="Height (cm)"
					:max="300"
					type="number"
				/>

				<v-text-field
					v-model="form.width"
					label="Width (cm)"
					:max="400"
					type="number"
				/>

				<v-text-field
					v-model="form.depth"
					label="Depth (cm)"
					type="number"
				/>

				<div style="display: flex">

					<v-checkbox
						v-model="form.waxed"
						label="Waxed"
						style="margin-right: 21px;"
					/>

					<v-checkbox
						v-model="form.notched"
						label="Notched"
					/>

				</div>

				<v-slider
					v-model="form.friendshipLevel"
					class="friendship-slider"
					:tick-labels="friendMarkers"
					:max="3"
					step="1"
					ticks="always"
					tick-size="4"
			    />

		    </v-form>

		    <div>
		    	<!-- <div>
		    		Number of shelves I need: {{ shelves }}
		    	</div> -->
		    	<!-- Total metres: {{ scaffLengthCm }}<br> -->
		    	<!-- <div style="display: flex">
		    		<div style="margin-right: 34px">Screws: {{ screwsCost }}</div>
		    		<div>Sanding belts cost: {{ sandingBeltsCost }}</div>
		    	</div> -->
		    	<div style="display: flex; margin-bottom: 34px">
		    		<div style="margin-right: 34px">Labour hours: {{ displayedHours }}</div>
		    		<div>Scaff metres: {{ totalScaffLengthCm }}</div>
		    	</div>
		    	
			    <div style="font-size: 21px;">
			    	£{{ total }}
			    </div>
		    </div>
		  
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			valid: false,
			form: {
				height: 220,
				width: 200,
				depth: 22,
				notched: false,
				waxed: false,
				friendshipLevel: 2,
			},
			standardPricePerMetre: {
				// depth: null,
				screws: 5,
				sandingBelts: 0.6,
			},
			hourlyRate: 15,
			markup: 1.3,
			friendMarkers: [
		        'Legends',
		        'Acquaintances',
		        'Normies',
		        'Dickheads',
		      ],
		    friendshipMultiplier: {
				'Legends': 0.85,
				'Acquaintances': 0.9,
				'Normies': 1,
				'Dickheads': 1.2,
			}
		}
	},
	computed: {
		depthHoursMultiplier() {
			if (this.form.depth === 22) {
				return 1;
			} else if (this.form.depth < 22) {
				return 1.2
			} else if (this.form.depth > 22) {
				return 2
			}
		},
		depthScaffMultiplier() {
			if (this.form.depth <= 22) {
				return 1;
			} else if (this.form.depth > 22 && this.form.depth <= 32) {
				return 1.5;
			} else if (this.form.depth > 32) {
				return 2;
			};
		},
		scaffLengthCm() {
			return Math.ceil((this.form.height * 2) + (this.form.width * 8)) //* this.depthScaffMultiplier
		},
		totalScaffLengthCm() {
			return Math.ceil(this.scaffLengthCm * this.depthScaffMultiplier / 100);
		},
		scaffLengthMetres() {
			return Math.ceil(this.scaffLengthCm / 100)
		},
		scaffCost() {
			return this.scaffLengthCm * 0.065
		},
		screwsCost() {
			return this.standardPricePerMetre.screws + (this.standardPricePerMetre.screws * Math.floor(this.form.width / 100))
		},
		sandingBeltsCost() {
			return this.standardPricePerMetre.sandingBelts + (this.standardPricePerMetre.sandingBelts * Math.floor(this.scaffLengthCm / 100))
		},
		labourHours() {
			let hours = Math.floor(this.scaffLengthCm / 100); // hours per metre
			hours += this.form.waxed ? Math.ceil(this.totalScaffLengthCm / 10) : 0

			if (this.form.depth < 22) {
				hours = hours * 1.2
			} else if (this.form.depth > 22) {
				hours = hours * 2
			}

			return hours;
		},
		labourCosts() {
			return this.hourlyRate * this.labourHours
		},
		displayedHours() {
			return Math.ceil(this.labourHours)
		},
		waxCosts() {
			return 0.01  * this.totalScaffLengthCm * 100 * (this.form.waxed ? 1 : 0)
		},
		notchCosts() {
			if (this.form.notched) {
				if (this.form.depth <= 22) {
					return 30
				} else {
					return 50
				}
			}

			return 0
		},
		total() {
			let cost = ((this.scaffCost + this.labourCosts + this.waxCosts) * this.markup)
			+ this.notchCosts + this.screwsCost + this.sandingBeltsCost
			
			return Math.round(
				cost
				* 100
				* this.friendshipMultiplier[this.friendMarkers[this.form.friendshipLevel]]
			) / 100
		}
	},
	methods: {
		validate () {
			this.$refs.form.validate()
		},
		reset () {
			this.$refs.form.reset()
		},
		resetValidation () {
			this.$refs.form.resetValidation()
		},
	}
}
</script>

<style>
.friendship-slider {
	font-size: 0.8em;
}
</style>