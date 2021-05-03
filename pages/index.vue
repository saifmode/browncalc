<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline">
          <div style="display: flex; justify-content: space-between; width: 100%;">
            <div>
              <div>
                <b>Brown Reclaimed</b>
              </div>
              <div style="font-size: 17px; white-space: nowrap">
                  Shelving Unit Price Calculator
              </div>
            </div>
            <div>
              <img src="breclaimed-sm.jpg" width="94">
            </div>
          </div>
        </v-card-title>
        <v-card-text>
          <b-r-app />
          <br><br><hr /><br><br>
          <brown-form />
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

<style>
.d-flex {
  display: flex;
}

.row {
  flex-direction: row;
}

.col {
  flex-direction: column;
}

.right {
  text-align: right;
}
</style>