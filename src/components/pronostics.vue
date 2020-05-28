<template>
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
                <center><h3 class="light">Pour commencer, veuillez sélectionner la ligue de la première équipe</h3></center>
                <hr/>
                <br>
                <f7-list>
                  <f7-list-item :title="leaguesC" smart-select :smart-select-params="{openIn: 'sheet'}" ref="leagues1">
                    <select :name="leaguesC">
                      <option value="Select a league" selected>Selectionner une ligue</option>
                      <option :value="leagues[0]">{{leagues[0]}}</option>
                      <option :value="leagues[1]">{{leagues[1]}}</option>
                      <option :value="leagues[2]">{{leagues[2]}}</option>
                    </select>
                  </f7-list-item>
                </f7-list>
                <br><br>
                <f7-button fill round raised text-color="black" fill sheet-open=".demo-sheet-swipe-to-close1" :class="currentLeague1 === 'Select a league'? 'disabled' : ''">
                  Monter les équipes <span v-if="currentLeague1 !== 'Select a league'">de la {{currentLeague1}}</span>
                </f7-button>
                <br><br>
                <hr/>

                <center><h3 class="light">veuillez sélectionner la ligue de la deuxième équipe</h3></center>
                <br>
                <f7-list>
                  <f7-list-item :title="leaguesC" smart-select :smart-select-params="{openIn: 'sheet'}" ref="leagues2">
                    <select :name="leaguesC">
                      <option value="Select a league" selected>Selectionner une ligue</option>
                      <option :value="leagues[0]">{{leagues[0]}}</option>
                      <option :value="leagues[1]">{{leagues[1]}}</option>
                      <option :value="leagues[2]">{{leagues[2]}}</option>
                    </select>
                  </f7-list-item>
                </f7-list>
                <br><br>
                <f7-button fill round raised text-color="black" fill sheet-open=".demo-sheet-swipe-to-close2" :class="currentLeague2 === 'Select a league' ? 'disabled' : ''">
                  Monter les équipes <span v-if="currentLeague2 !== 'Select a league'">de la {{currentLeague2}}</span>
                </f7-button>
                <br><br>
              </div>


              <div v-else-if="currentStep === 2">
                <secondstep :currentLeague1="currentLeague1" :currentLeague2="currentLeague2" :teams1="currentTeamsLeague1" :teams2="currentTeamsLeague2" @prediction="setPrediction"/>
              </div>
              <div v-else-if="currentStep === 3">
                  <center><h2 class="light">Dernière étape</h2></center>
                  <center><h3 class="light">Cette étape est essentielle pour définir la précision de la prédiction</h3></center>
                  <br>
                  <f7-list>
                    <f7-list-item title="Based on the 1, 2, 3 ... last years" smart-select :smart-select-params="{openIn: 'sheet'}" ref="years">
                      <select name="Based on the 1, 2, 3 ... last years">
                        <option value="Select a benchmark" selected>Selctionner un benchmark</option>
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
                <center><h1 class="light">Résultats</h1></center>
                <div v-if="displayResult">
                  <br><br><br>
                  <h2 class="light">{{prediction.team0}}   : 60 %</h2>
                  <h2 class="light">{{prediction.team1}}   : 25 %</h2>
                  <h2 class="light">Égaliter   : 15 %</h2>
                  <f7-button fill round raised text-color="black" fill @click="restart">Nouveau simulation</f7-button>
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
                 Retourner
               </f7-button>
              </span>
              <span v-else>
                &nbsp;
              </span>
              <f7-button v-if="step < 4"
               :class="!currentStateC ? 'disabled margin-right' : 'margin-right'"
               @click="setInlineProgress(40); step = step + 1;">
               <span v-if="step < 3">Prochaine étape</span>
               <span v-else> Prédire</span>
             </f7-button>
            </f7-card-footer>
          </f7-card>
        </f7-col>
      </f7-row>
      <f7-sheet
      class="demo-sheet-swipe-to-close1"
      style="--f7-sheet-bg-color: #fff;"
      swipe-to-close
      backdrop
      >
      <f7-page-content>
        <f7-block-title large><font color="red">Les équipes de la {{currentLeague1}}</font></f7-block-title>
        <f7-block-title>2020-21</f7-block-title>
        <f7-list simple-list v-for="team in currentTeamsLeague1" :key="team.code">
          <f7-list-item :title="team.name">
            &nbsp;&nbsp;&nbsp;
            <!-- <img :src="calculateLogo(team.name)"/> -->
            <font color="red">{{team.code}}</font>
          </f7-list-item>
        </f7-list>
      </f7-page-content>
    </f7-sheet>
    <f7-sheet
    class="demo-sheet-swipe-to-close2"
    style="--f7-sheet-bg-color: #fff;"
    swipe-to-close
    backdrop
    >
    <f7-page-content>
      <f7-block-title large><font color="red">Les équipes de la {{currentLeague2}}</font></f7-block-title>
      <f7-block-title>2020-21</f7-block-title>
      <f7-list simple-list v-for="team in currentTeamsLeague2" :key="team.code">
        <f7-list-item :title="team.name">
          &nbsp;&nbsp;&nbsp;
          <!-- <img :src="calculateLogo(team.name)"/> -->
          <font color="red">{{team.code}}</font>
        </f7-list-item>
      </f7-list>
    </f7-page-content>
  </f7-sheet>
  </f7-block>
</template>

<script>
import WebService from '../services/web-service'
import StorageService from '../services/storage-service';
import navbarAuth from '../components/navBar/navBarAuthentificated';
import secondstep from '../components/second-step';
// import { logos } from '../teams_logo';
import logoFetcher from '../utility/logo-fetcher';

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
        currentLeague1: 'Select a league',
        currentLeague2: 'Select a league',
        match: [
          {
            name: "team1"
          },
          {
              name: "team2"
          }
        ],
        deutchTeams: [
          {
            "key": "bayern",
            "name": "Bayern München",
            "code": "FCB"
          },
          {
            "key": "dortmund",
            "name": "Borussia Dortmund",
            "code": "BVB"
          },
          {
            "key": "leverkusen",
            "name": "Bayer 04 Leverkusen",
            "code": "B04"
          },
          {
            "key": "schalke",
            "name": "FC Schalke 04",
            "code": "S04"
          },
          {
            "key": "frankfurt",
            "name": "Eintracht Frankfurt",
            "code": "FFM"
          },
          {
            "key": "mgladbach",
            "name": "Bor. Mönchengladbach",
            "code": "BMG"
          },
          {
            "key": "wolfsburg",
            "name": "VfL Wolfsburg",
            "code": "WOB"
          },
          {
            "key": "mainz",
            "name": "1. FSV Mainz 05",
            "code": "M05"
          },
          {
            "key": "bremen",
            "name": "Werder Bremen",
            "code": "BRE"
          },
          {
            "key": "hoffenheim",
            "name": "TSG 1899 Hoffenheim",
            "code": "HOF"
          },
          {
            "key": "augsburg",
            "name": "FC Augsburg",
            "code": "FCA"
          },
          {
            "key": "herthabsc",
            "name": "Hertha BSC",
            "code": "BSC"
          },
          {
            "key": "koeln",
            "name": "1. FC Köln",
            "code": "KOE"
          },
          {
            "key": "paderborn",
            "name": "SC Paderborn 07",
            "code": "SCP"
          },
          {
            "key": "freiburg",
            "name": "SC Freiburg",
            "code": "SCF"
          },
          {
            "key": "duesseldorf",
            "name": "Fortuna Düsseldorf",
            "code": "F95"
          },
          {
            "key": "unionberlin",
            "name": "1. FC Union Berlin",
            "code": "FCU"
          },
          {
            "key": "leipzig",
            "name": "RB Leipzig",
            "code": "RBL"
          }
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
          {
            "key": "barcelona",
            "name": "FC Barcelona",
            "code": "BAR"
          },
          {
            "key": "espanyol",
            "name": "RCD Espanyol",
            "code": "ESP"
          },
          {
            "key": "madrid",
            "name": "Real Madrid",
            "code": "RMD"
          },
          {
            "key": "atletico",
            "name": "Atlético Madrid",
            "code": "ATL"
          },
          {
            "key": "getafe",
            "name": "Getafe CF",
            "code": "GET"
          },
          {
            "key": "sevilla",
            "name": "Sevilla FC",
            "code": "SEV"
          },
          {
            "key": "valencia",
            "name": "Valencia CF",
            "code": "VAL"
          },
          {
            "key": "levante",
            "name": "Levante UD",
            "code": "LEV"
          },
          {
            "key": "athletic",
            "name": "Athletic Club Bilbao",
            "code": "ATH"
          },
          {
            "key": "granada",
            "name": "Granada CF",
            "code": "GRA"
          },
          {
            "key": "celta",
            "name": "RC Celta Vigo",
            "code": "CEL"
          },
          {
            "key": "realsociedad",
            "name": "Real Sociedad",
            "code": "RSO"
          },
          {
            "key": "valladolid",
            "name": "Real Valladolid CF",
            "code": "VID"
          },
          {
            "key": "eibar",
            "name": "SD Eibar",
            "code": null
          },
          {
            "key": "betis",
            "name": "Real Betis",
            "code": "BET"
          },
          {
            "key": "osasuna",
            "name": "CA Osasuna",
            "code": "OSA"
          },
          {
            "key": "villareal",
            "name": "Villarreal CF",
            "code": "VLL"
          },
          {
            "key": "alaves",
            "name": "Deportivo Alavés",
            "code": null
          },
          {
            "key": "mallorca",
            "name": "RCD Mallorca",
            "code": "MLL"
          },
          {
            "key": "leganes",
            "name": "CD Leganés",
            "code": null
          }
        ],
        currentProgress: 10,
        step: 1,
        prediction: null,
        yearsParams: '',
        displayResult: false
      }
    },
    methods: {
      restart() {
        this.step = 1;
        this.currentLeague1 = 'Select a league';
        this.currentLeague2 = 'Select a league';
        this.currentProgress = 10;
        this.yearsParams = '';
        this.displayResult = false;
        this.prediction = null;
      },
      calculateLogo(teamName) {
        let fetshResult = logoFetcher.findCodeLogo(teamName);
        if (fetshResult !== -1) {
          return "/https://sportteamslogo.com/api?key=acfb00c739f04cf6856a20128351ee94&size=small&tid=" + fetshResult;
        }
        return '';
      },
      handleBack() {
        this.currentLeague1 = 'Select a league';
        this.currentLeague2 = 'Select a league';
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
        if ((this.step === 1) && (this.currentLeague1 === 'Select a league' || this.currentLeague2 === 'Select a league')) {
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
      currentTeamsLeague1() {
        console.log('dans currentTeamsLeague, currentLeague =', this.currentLeague1);
        if (this.currentLeague1 === 'La liga') {
          return this.espagnolTeams;
        } else if (this.currentLeague1 === 'Premier league') {
          return this.englandTeams;
        } else if (this.currentLeague1 === 'Bundesliga') {
          return this.deutchTeams;
        }
        console.log('returning nothing');
        return [];
      },
      currentTeamsLeague2() {
        console.log('dans currentTeamsLeague, currentLeague =', this.currentLeague2);
        if (this.currentLeague2 === 'La liga') {
          return this.espagnolTeams;
        } else if (this.currentLeague2 === 'Premier league') {
          return this.englandTeams;
        } else if (this.currentLeague2 === 'Bundesliga') {
          return this.deutchTeams;
        }
        console.log('returning nothing');
        return [];
      }
    },
    mounted() {
      console.log('logoFetcher =', logoFetcher.findCodeLogo('FC Barcelona'));
      let vm = this;
      vm.$refs.leagues1.f7SmartSelect.on('close', function(el) {
        vm.currentLeague1 = el.selectEl.selectedOptions[0].value;
        console.log('dans le mounted, currentLeague =', vm.currentLeague1);
        let yearMinusOne = new Date().getFullYear() - 1;
        let currentYear = ( yearMinusOne % 100 ) + 1;
        // console.log('yearMinusOne = ', yearMinusOne, '   currentYear =', currentYear);

        // WebService.getTeamsOfLeague(vm.calculateLeagueCode(vm.currentLeague), yearMinusOne, currentYear)
        //   .then(response => console.log('response =', response));
          // .then(teams => vm.teams = teams);
      });

      vm.$refs.leagues2.f7SmartSelect.on('close', function(el) {
        vm.currentLeague2 = el.selectEl.selectedOptions[0].value;
        console.log('dans le mounted, currentLeague =', vm.currentLeague2);
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
            vm.$refs.leagues1.f7SmartSelect.on('close', function(el) {
              vm.currentLeague1 = el.selectEl.selectedOptions[0].value;
              // console.log('dans le mounted, currentLeague =', vm.currentLeague);
              let yearMinusOne = new Date().getFullYear() - 1;
              let currentYear = ( yearMinusOne % 100 ) + 1;
              // console.log('yearMinusOne = ', yearMinusOne, '   currentYear =', currentYear);
          }, 3000);

          vm.$refs.leagues2.f7SmartSelect.on('close', function(el) {
            vm.currentLeague2 = el.selectEl.selectedOptions[0].value;
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
