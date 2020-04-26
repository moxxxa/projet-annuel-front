<template>
    <f7-page name="main-prediction" class="accueil-page">
      <navbar-auth :avatar="user.avatar" :checkProfil="true"/>
      <f7-block>
        <f7-row>
          <f7-col width="100">
            <f7-card class="demo-facebook-card">
              <f7-card-header>
                <f7-progressbar :progress="currentProgress" id="demo-inline-progressbar"></f7-progressbar>
              </f7-card-header>
              <f7-card-content :padding="true">
                <div v-if="currentStep === 1">
                  <center><h2 class="light">1 Vs 1 Prediction</h2></center>
                  <center><h3 class="light">To start, please choose a league</h3></center>
                  <hr/>
                  <br><br><br>
                  <f7-list>
                    <f7-list-item :title="leaguesC" smart-select :smart-select-params="{openIn: 'sheet'}" ref="leagues">
                      <select :name="leaguesC">
                        <option value="Select a league" selected>Select a league</option>
                        <option :value="leagues[0]">{{leagues[0]}}</option>
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
                </div>


                <div v-else-if="currentStep === 2">
                  <secondstep :currentLeague="currentLeague" :teams="currentTeamsLeague" @prediction="setPrediction"/>
                </div>
                <div v-else-if="currentStep === 3">
                    <center><h2 class="light">The final step</h2></center>
                    <center><h3 class="light">This step is essential for defining the accurecy of the prediction</h3></center>
                    <br>
                    <f7-list>
                      <f7-list-item title="Based on the 1, 2, 3 ... last years" smart-select :smart-select-params="{openIn: 'sheet'}" ref="years">
                        <select name="Based on the 1, 2, 3 ... last years">
                          <option value="Select a benchmark" selected>Select a benchmark</option>
                          <option value="Current year">Current year</option>
                          <option value="Last 2 years">Last 2 years</option>
                          <option value="Last 3 years">Last 3 years</option>
                          <option value="Last 4 years">Last 4 years</option>
                          <option value="Last 5 years">Last 5 years</option>
                          <option value="Last 6 years">Last 6 years</option>
                          <option value="Last 7 years">Last 7 years</option>
                          <option value="Last 8 years">Last 8 years</option>
                          <option value="Last 9 years">Last 9 years</option>
                        </select>
                      </f7-list-item>
                    </f7-list>
                    <br><br><br><br><br><br>
                </div>
                <div v-else-if="step === 4">
                  <center><h1 class="light">Results</h1></center>
                  <div v-if="displayResult">
                    <br><br><br>
                    <h2 class="light">{{prediction.team0}}   : 60 %</h2>
                    <h2 class="light">{{prediction.team1}}   : 25 %</h2>
                    <h2 class="light">Draw   : 15 %</h2>
                  </div>
                  <div v-else>
                    <br><br><br><br><br>
                  </div>
                </div>
              </f7-card-content>
              <f7-card-footer class="no-border">
                <span v-if="step > 1 && step < 4">
                  <f7-button
                   @click="setInlineProgress(-40); handleBack()">
                   Back
                 </f7-button>
                </span>
                <span v-else>
                  &nbsp;
                </span>
                <f7-button v-if="step < 4"
                 :class="!currentStateC ? 'disabled margin-right' : 'margin-right'"
                 @click="setInlineProgress(40); step = step + 1;">
                 <span v-if="step < 3">Next step</span>
                 <span v-else> Predict</span>
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
          <f7-list simple-list v-for="team in currentTeamsLeague" :key="team.code">
            <f7-list-item :title="team.name">&nbsp;&nbsp;&nbsp;<font color="red">{{team.code}}</font></f7-list-item>
          </f7-list>
        </f7-page-content>
    </f7-sheet>
  </f7-page>
</template>

<script>
import WebService from '../services/web-service'
import StorageService from '../services/storage-service';
import navbarAuth from '../components/navBar/navBarAuthentificated';
import secondstep from '../components/second-step';


export default {
    components: {
      // profileChecker,
      navbarAuth,
      secondstep
    },
    name: "main-prediction",
    data () {
      return {
        user: StorageService.getUser(),
        leagues: [
          "La liga",
          "Premier league",
          "Bundesliga"
        ],
        currentLeague: 'Select a league',
        match: [
          {
            name: "team1"
          },
          {
              name: "team2"
          }
        ],
        deutchTeams: [

        ],
        englandTeams: [
          {
            "key": "chelsea",
            "name": "Chelsea FC",
            "code": "CHE"
          },
          {
            "key": "arsenal",
            "name": "Arsenal FC",
            "code": "ARS"
          },
          {
            "key": "tottenham",
            "name": "Tottenham Hotspur FC",
            "code": "TOT"
          },
          {
            "key": "westham",
            "name": "West Ham United FC",
            "code": "WHU"
          },
          {
            "key": "crystalpalace",
            "name": "Crystal Palace FC",
            "code": "CRY"
          },
          {
            "key": "manutd",
            "name": "Manchester United FC",
            "code": "MUN"
          },
          {
            "key": "mancity",
            "name": "Manchester City FC",
            "code": "MCI"
          },
          {
            "key": "everton",
            "name": "Everton FC",
            "code": "EVE"
          },
          {
            "key": "liverpool",
            "name": "Liverpool FC",
            "code": "LIV"
          },
          {
            "key": "newcastle",
            "name": "Newcastle United FC",
            "code": "NEW"
          },
          {
            "key": "astonvilla",
            "name": "Aston Villa FC",
            "code": "AVL"
          },
          {
            "key": "southampton",
            "name": "Southampton FC",
            "code": "SOU"
          },
          {
            "key": "leicester",
            "name": "Leicester City FC",
            "code": "LEI"
          },
          {
            "key": "bournemouth",
            "name": "AFC Bournemouth",
            "code": "BOU"
          },
          {
            "key": "norwich",
            "name": "Norwich City FC",
            "code": "NOR"
          },
          {
            "key": "watford",
            "name": "Watford FC",
            "code": "WAT"
          },
          {
            "key": "burnley",
            "name": "Burnley FC",
            "code": "BUR"
          },
          {
            "key": "brightonhovealbionfc",
            "name": "Brighton & Hove Albion FC",
            "code": "BHA"
          },
          {
            "key": "sheffieldunitedfc",
            "name": "Sheffield United FC",
            "code": "SFU"
          },
          {
            "key": "wolverhamptonwanderersfc",
            "name": "Wolverhampton Wanderers FC",
            "code": "WHW"
          }
        ],
        espagnolTeams: [

        ],
        currentProgress: 10,
        step: 1,
        prediction: null,
        yearsParams: '',
        displayResult: false
      }
    },
    methods: {
      handleBack() {
        this.currentLeague = 'Select a league';
        this.step = this.step - 1;
        this.yearsParams = '';
      },
      setPrediction(payload) {
        if (payload) {
          this.prediction = payload;
          // console.log('this.prediction =', this.prediction);
        }
      },
      setInlineProgress(value) {
        const self = this;
        const app = self.$f7;
        app.progressbar.set('#demo-inline-progressbar', value);
        if (this.currentProgress + value > 100) {
          this.currentProgress = 100;
        } else {
          this.currentProgress = this.currentProgress + value;
        }
      },
      calculateLeagueCode(league) {
        if (league === 'La liga') {
          return 'es';
        } else if (league === 'Premier league') {
          return 'en';
        } else if (league === 'Bundesliga') {
          return 'de';
        }
        return '';
      }
    },
    computed: {
      currentStep() {
        // console.log('currentStep =', this.step);
        return this.step;
      },
      leaguesC() {
        return this.leagues[0] + ", " + this.leagues[1] + ", " + this.leagues[2];
      },
      currentStateC() {
        // console.log('current league =', this.currentLeague);
        if (this.step === 1 && this.currentLeague === 'Select a league') {
          return false;
        }
        if (this.step === 2 && this.prediction === null) {
          return false;
        }
        if (this.step === 3 && this.yearsParams === '') {
          return false;
        }
        return true;
      },
      currentTeamsLeague() {
        console.log('dans currentTeamsLeague, currentLeague =', this.currentLeague);
        if (this.currentLeague === 'La liga') {
          return this.espagnolTeams;
        } else if (this.currentLeague === 'Premier league') {
          return this.englandTeams;
        } else if (this.currentLeague === 'Bundesliga') {
          return this.deutchTeams;
        }
        console.log('returning nothing');
        return [];
      }
    },
    mounted() {
      let vm = this;
      vm.$refs.leagues.f7SmartSelect.on('close', function(el) {
        vm.currentLeague = el.selectEl.selectedOptions[0].value;
        console.log('dans le mounted, currentLeague =', vm.currentLeague);
        let yearMinusOne = new Date().getFullYear() - 1;
        let currentYear = ( yearMinusOne % 100 ) + 1;
        // console.log('yearMinusOne = ', yearMinusOne, '   currentYear =', currentYear);

        // WebService.getTeamsOfLeague(vm.calculateLeagueCode(vm.currentLeague), yearMinusOne, currentYear)
        //   .then(response => console.log('response =', response));
          // .then(teams => vm.teams = teams);
      });
      if (vm.step === 3) {
        vm.$refs.years.f7SmartSelect.on('close', function(el) {
          vm.yearsParams = el.selectEl.selectedOptions[0].value;
          // console.log('yearsParams = ', vm.yearsParams);
        });
      }

      // let smartSelect = app.smartSelect.get('.smart-select');
      // smartSelect.on('close', function (el) {
      //   vm.currentLeague = el.selectEl.selectedOptions[0].value;
      // });

      //WebService calls
      //fetching available leagues
      // WebService.getAvailableLeague()
      //   .then(response => response.data.data.leagues)
      //   .then(leagues => vm.leagues = leagues);

    },
    watch: {
      step(newv, oldv) {
        if (this.step === 1) {
          let vm = this;
          setTimeout(function () {
            vm.$refs.leagues.f7SmartSelect.on('close', function(el) {
              vm.currentLeague = el.selectEl.selectedOptions[0].value;
              // console.log('dans le mounted, currentLeague =', vm.currentLeague);
              let yearMinusOne = new Date().getFullYear() - 1;
              let currentYear = ( yearMinusOne % 100 ) + 1;
              // console.log('yearMinusOne = ', yearMinusOne, '   currentYear =', currentYear);
          }, 3000);

            // WebService.getTeamsOfLeague(vm.calculateLeagueCode(vm.currentLeague), yearMinusOne, currentYear)
            //   .then(response => console.log('response =', response));
              // .then(teams => vm.teams = teams);
          });
        }
        if (this.step === 2) {

        }
        if (this.step === 3) {
          let vm = this;
          setTimeout(function () {
            vm.$refs.years.f7SmartSelect.on('close', function(el) {
              vm.yearsParams = el.selectEl.selectedOptions[0].value;
              // console.log('yearsParams = ', vm.yearsParams);
            });
          }, 3000);
        }

        if (this.step === 4) {
          let vm = this;
          vm.$f7.dialog.preloader('Processing for the prediction ...., please wait');
          setTimeout(() => {
            vm.displayResult = true;
            vm.$f7.dialog.close();
          }, 10000);

      }
    }
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
