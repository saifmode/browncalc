<template>
	<div>
		<div id="app">
		    <v-form
		      ref="form"
		      v-model="valid"
		      lazy-validation
		    >

				<div style="display: flex">

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
						append-icon="mdi-help-circle-outline"
						label="Depth (cm)"
						type="number"
						@click:append="onClickHelpDepth"
					/>

					<v-text-field
						disabled
						label="Thickness (cm)"
						type="number"
						value="3.5"
					/>

				</div>

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
					style="font-size: 0.8em"
					:tick-labels="friendMarkers"
					:max="friendMarkers.length - 1"
					step="1"
					ticks="always"
					tick-size="4"
			    />
			
				<div>
					<div>
						<div style="display: flex">
							<div style="margin: 0 12px">Fixings £{{ getCost(screwsCost) }}</div>
							<div style="margin: 0 12px">Sandpaper £{{ getCost(sandingBeltsCost) }}</div>
							<div style="margin: 0 12px">Waxing £{{ getCost(waxCosts) }}</div>
						</div>
					</div>
					<div style="margin-bottom: 34px">
						<div style="display: flex">
							<div style="margin: 0 12px">Materials {{scaffLengthMetres }} m</div>
							<div style="margin: 0 12px">Labour {{ displayedHours }} hrs</div>
							<div style="margin: 0 12px">Weight {{Math.round(weight*100) /100}} kg</div>
						</div>
					</div>

					<v-text-field
						v-model="form.distance"
						label="Distance from Brown Reclaimed, S2 4BH (miles)"
						type="number"
					/>
					<v-text-field
						v-model="form.journeyTime"
						label="Journey Time (hrs)"
						type="number"
					/>
					
					<div style="font-size: 21px;">
						£{{ getCost(total) }}
					</div>

					<div style="font-size: 13px;">
						<b>Plus delivery: £{{ getCost(deliveryCost) }}</b>
					</div>

					<v-btn style="width: 1px; height: 1px"></v-btn>
				</div>
			
			</v-form>
			<v-overlay
				absolute
				opacity="0.9"
				:value="overlay"
			>
				<div style="text-align: center; margin: 34px">
					<div v-if="helpText = 'depth'" style="text-align: left">
						The shelf depth has a significant effect on the price.<br>
						The price brackets are as follows:<br>
						<ul>
							<li>22cm</li>
							<li>Less than 22cm</li>
							<li>22cm to 32cm</li>
							<li>33 or above</li>
						</ul>
						This is because the timber used is 22cm wide. Anything above or below this amount will require more material and/or labour hours. Please get in touch if you require more information.
						
					</div>
					
					<v-btn color="danger" @click="overlay=false">
						Close
					</v-btn>
				</div>

			</v-overlay>
		  
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			helpText: '',
			overlay: false,
			valid: false,
			form: {
				height: 0,
				width: 0,
				depth: 22,
				notched: false,
				waxed: true,
				friendshipLevel: 3,
				distance: 0,
				journeyTime: 0,
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
		        'Friends',
				'Returns',
		        'Normies',
		        'Dickheads',
		      ],
		    friendshipMultiplier: {
				'Legends': 0.85,
				'Friends': 0.9,
				'Returns': 0.95,
				'Normies': 1,
				'Dickheads': 1.2,
			},
			constants: {
				deliveryCostPerMile: 0.4,
				journeyCostPerHour: 40, 
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
		weight() {
			return this.scaffLengthMetres * 1.1;
		},
		deliveryCost() {
			return (this.form.distance * this.constants.deliveryCostPerMile) + (this.form.journeyTime * this.constants.journeyCostPerHour)
		},
		total() {
			let cost = ((this.scaffCost + this.labourCosts + this.waxCosts) * this.markup)
			+ this.notchCosts + this.screwsCost + this.sandingBeltsCost

			return cost * this.friendshipMultiplier[this.friendMarkers[this.form.friendshipLevel]]
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
		onClickHelpDepth() {
			this.helpText = "depth";
			this.overlay = true;
		},
		getCost(cost) {
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