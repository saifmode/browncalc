<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline">
          <div style="width: 100%; text-align: center; white-space: nowrap; font-size: 21px;">
              Brown Reclaimed Shelving Unit Price Calculator
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