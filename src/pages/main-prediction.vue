<template>
    <f7-page name="main-prediction" class="accueil-page">
      <f7-block>
        <f7-row>
          <f7-col width="100">
            <f7-card class="demo-facebook-card">
              <f7-card-header>
                <f7-progressbar :progress="currentProgress" id="demo-inline-progressbar"></f7-progressbar>
              </f7-card-header>
              <f7-card-content :padding="true">
                <center><h2 class="light">1 Vs 1 Prediction</h2></center>
                <center><h3 class="light">To start, please choose a league</h3></center>
                <hr/>
                <br><br><br><br>
                <f7-list>
                  <f7-list-item :title="leaguesC" smart-select :smart-select-params="{openIn: 'sheet'}">
                    <select :name="leaguesC">
                      <option value="Select a league" selected>Select a league</option>
                      <option :value="leagues[0]" fill sheet-open=".demo-sheet-swipe-to-close">{{leagues[0]}}</option>
                      <option :value="leagues[1]">{{leagues[1]}}</option>
                      <option :value="leagues[2]">{{leagues[2]}}</option>
                    </select>
                  </f7-list-item>
                </f7-list>
                <br><br>
                <f7-button fill round raised text-color="black" fill sheet-open=".demo-sheet-swipe-to-close" :class="!currentStateC ? 'disabled' : ''">
                  Show teams <span v-if="currentLeague !== 'Select a league'">of {{currentLeague}}</span>
                </f7-button>
                <br><br>
              </f7-card-content>
              <f7-card-footer class="no-border">
                <p>&nbsp;</p>
                <f7-button
                 :class="!currentStateC ? 'disabled margin-right' : 'margin-right'"
                 @click="setInlineProgress(40); step = step + 1;">
                 Next step
               </f7-button>
              </f7-card-footer>
            </f7-card>
          </f7-col>

        </f7-row>
      </f7-block>
      <f7-sheet
      class="demo-sheet-swipe-to-close"
      style="--f7-sheet-bg-color: #fff;"
      swipe-to-close
      backdrop
    >
      <f7-page-content>
        <f7-block-title large><font color="red">{{currentLeague}} teams</font></f7-block-title>
        <f7-block-title>2020-21</f7-block-title>
        <f7-list simple-list>
          <f7-list-item title="Item 1"></f7-list-item>
          <f7-list-item title="Item 2"></f7-list-item>
          <f7-list-item title="Item 3"></f7-list-item>
          <f7-list-item title="Item 1"></f7-list-item>
          <f7-list-item title="Item 2"></f7-list-item>
          <f7-list-item title="Item 3"></f7-list-item>
          <f7-list-item title="Item 1"></f7-list-item>
          <f7-list-item title="Item 2"></f7-list-item>
          <f7-list-item title="Item 3"></f7-list-item>
        </f7-list>
      </f7-page-content>
    </f7-sheet>
  </f7-page>
</template>

<script>
import WebService from '../services/web-service'
import StorageService from '../services/storage-service';
import navbarAuth from '../components/navBar/navBarAuthentificated';

export default {
    components: {
      // profileChecker,
      navbarAuth
    },
    name: "main-prediction",
    data () {
      return {
        leagues: [
          "La liga",
          "Premier league",
          "Bundesliga"
        ],
        currentLeague: 'Select a league',
        currentProgress: 10,
        step: 1
      }
    },
    methods: {
      setInlineProgress(value) {
        const self = this;
        const app = self.$f7;
        app.progressbar.set('#demo-inline-progressbar', value);
        this.currentProgress = this.currentProgress + value;
      }
    },
    computed: {
      leaguesC() {
        return this.leagues[0] + ", " + this.leagues[1] + ", " + this.leagues[2];
      },
      currentStateC() {
        console.log('current league =', this.currentLeague);
        if (this.step === 1 && this.currentLeague === 'Select a league') {
          return false;
        }
        return true;
      }
    },
    mounted() {
      let vm = this;
      const app = vm.$f7;
      let smartSelect = app.smartSelect.get('.smart-select');
      smartSelect.on('close', function (el) {
        vm.currentLeague = el.selectEl.selectedOptions[0].value;
      });
    }
  }
</script>

<style scoped>
hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid #ccc;
  margin: 1em 0;
  padding: 0;
}
</style>
