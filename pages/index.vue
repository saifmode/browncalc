<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <div class="text-center">
        <img src="breclaimed.jpg" style="width: 144px">
      </div>
      <v-card>
        <v-card-title class="headline">
          <div style="text-align: center; width: 100%">
            Brown Reclaimed AI BlockChain Algorithm
          </div>
        </v-card-title>
        <v-card-text>
          <BrownForm />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo
  }
}
</script>
