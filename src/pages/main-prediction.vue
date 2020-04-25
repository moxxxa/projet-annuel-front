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
                <div v-if="currentStep === 1">
                  <center><h2 class="light">1 Vs 1 Prediction</h2></center>
                  <center><h3 class="light">To start, please choose a league</h3></center>
                  <hr/>
                  <br><br><br><br>
                  <f7-list>
                    <f7-list-item :title="leaguesC" smart-select :smart-select-params="{openIn: 'sheet'}">
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
                  <secondstep :currentLeague="currentLeague" :teams="currentTeamsLeague"/>
                </div>


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
        leagues: [
          "La liga",
          "Premier league",
          "Bundesliga"
        ],
        currentLeague: 'Premier league',
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
        step: 2
      }
    },
    methods: {
      setInlineProgress(value) {
        const self = this;
        const app = self.$f7;
        app.progressbar.set('#demo-inline-progressbar', value);
        this.currentProgress = this.currentProgress + value;
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
        return this.step;
      },
      leaguesC() {
        return this.leagues[0] + ", " + this.leagues[1] + ", " + this.leagues[2];
      },
      currentStateC() {
        console.log('current league =', this.currentLeague);
        if (this.step === 1 && this.currentLeague === 'Select a league') {
          return false;
        }
        return true;
      },
      currentTeamsLeague() {
        if (this.currentLeague === 'La liga') {
          return this.espagnolTeams;
        } else if (this.currentLeague === 'Premier league') {
          return this.englandTeams;
        } else if (this.currentLeague === 'Bundesliga') {
          return this.deutchTeams;
        }
        return [];
      }
    },
    mounted() {
      let vm = this;
      const app = vm.$f7;
      let smartSelect = app.smartSelect.get('.smart-select');
      smartSelect.on('close', function (el) {
        vm.currentLeague = el.selectEl.selectedOptions[0].value;
        let yearMinusOne = new Date().getFullYear() - 1;
        let currentYear = ( yearMinusOne % 100 ) + 1;
        console.log('yearMinusOne = ', yearMinusOne, '   currentYear =', currentYear);

        // WebService.getTeamsOfLeague(vm.calculateLeagueCode(vm.currentLeague), yearMinusOne, currentYear)
        //   .then(response => console.log('response =', response));
          // .then(teams => vm.teams = teams);
      });

      //WebService calls
      //fetching available leagues
      // WebService.getAvailableLeague()
      //   .then(response => response.data.data.leagues)
      //   .then(leagues => vm.leagues = leagues);

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
