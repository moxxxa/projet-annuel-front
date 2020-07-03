<template>
    <div>
      <f7-row>
        <f7-col width="100">
          <f7-card class="demo-facebook-card">
            <f7-card-header>
              <f7-progressbar :progress="currentProgress" id="demo-inline-progressbar"></f7-progressbar>
            </f7-card-header>
            <f7-card-content :padding="true">
              <center><h1 class="light">Pronostics</h1></center>
              <div v-if="currentStep === 1">
                <center><h3 class="light">1 Vs 1 Prediction</h3></center>
                <center><h4 class="light">Pour commencer, veuillez sélectionner la ligue de la première équipe</h4></center>
                <hr/>
                <br>
                <f7-list>
                  <f7-list-item :title="leaguesTitle" smart-select :smart-select-params="{openIn: 'popup', searchbar: true, searchbarPlaceholder: 'Chercher une ligue'}" ref="leagues1">
                    <select :name="leaguesTitle">
                      <optgroup>
                        <option v-for="league in leaguesList" :key="league.id" :value="league.name + '!' + league.country">{{league.name}}{{(league.id !== -1) ? `,&nbsp;&nbsp;${league.country}` : "" }}</option>
                      </optgroup>
                    </select>
                  </f7-list-item>
                </f7-list>
                <br><br>
                <f7-button fill round raised text-color="black" fill sheet-open=".demo-sheet-swipe-to-close1" :class="currentLeague1.id === -1 ? 'disabled' : ''">
                  Monter les équipes <span v-if="currentLeague1.id !== -1">de la {{currentLeague1.name}}</span>
                </f7-button>
                <br><br>
                <hr/>
                <center><h3 class="light">Veuillez sélectionner la ligue de la deuxième équipe</h3></center>
                <br>
                <f7-list>
                  <f7-list-item :title="leaguesTitle" smart-select :smart-select-params="{openIn: 'popup', searchbar: true, searchbarPlaceholder: 'Chercher une ligue'}" ref="leagues2">
                    <select :name="leaguesTitle">
                      <optgroup>
                        <option v-for="league in leaguesList" :key="league.id" :value="league.name + '!' + league.country">{{league.name}}{{(league.id !== -1) ? `,&nbsp;&nbsp;${league.country}` : "" }}</option>
                      </optgroup>
                    </select>
                  </f7-list-item>
                </f7-list>
                <br><br>
                <f7-button fill round raised text-color="black" fill sheet-open=".demo-sheet-swipe-to-close2" :class="currentLeague2.id === -1  ? 'disabled' : ''">
                  Monter les équipes <span v-if="currentLeague2.id !== -1">de la {{currentLeague2.name}}</span>
                </f7-button>
                <br><br>
              </div>


              <div v-else-if="currentStep === 2">
                <secondstep :currentLeague1="currentLeague1" :currentLeague2="currentLeague2" :teams1="currentTeamsLeague1" :teams2="currentTeamsLeague2" @prediction="setPrediction"/>
              </div>
              <div v-else-if="currentStep === 3">
                  <center><h2 class="light">Dernière étape</h2></center>
                  <center><h3 class="light">Cette étape est essentielle pour ajuster la précision de la prédiction</h3></center>
                  <br>
                  <f7-list>
                    <f7-list-item title="Sur la base de" smart-select :smart-select-params="{openIn: 'sheet'}" ref="years">
                      <select name="Sur la base de ">
                        <option value="1" selected>L'année en cours</option>
                        <option value="2">2 dernières années</option>
                        <option value="3">3 dernières années</option>
                        <option value="4">4 dernières années</option>
                        <option value="5">5 dernières années</option>
                        <option value="6">6 dernières années</option>
                        <option value="7">7 dernières années</option>
                        <option value="8">8 dernières années</option>
                        <option value="9">9 dernières années</option>
                      </select>
                    </f7-list-item>
                  </f7-list>
                  <br><br><br><br><br><br>
              </div>
              <div v-else-if="step === 4">
                <div v-if="displayResult">
                  <br>
                  <!-- <span>
                    <img :src="prediction.awayTeam.teamImage" height="80px" width="80px">
                    <font class="light" size="5">{{prediction.awayTeam.name}}   : 60 %</font>
                  </span>
                  <br><br>
                  <span>
                    <img :src="prediction.homeTeam.teamImage" height="80px" width="80px">
                    <font class="light" size="5">{{prediction.homeTeam.name}}   : 25 %</font>
                  </span>
                  <br><br> -->
                  <center><h2 class="light">Vous pouvez suivre votre demande dans l'onglet Mes recherches</h2></center>
                  <br><br>
                </div>
                <div>
                  <f7-button fill round raised text-color="black" fill @click="restart">Nouvelle simulation</f7-button>
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
        <f7-block-title large><font color="red" size="4">Les équipes de la {{currentLeague1.name}}</font></f7-block-title>
        <f7-block-title>2020-21</f7-block-title>
        <f7-list media-list v-for="team in currentTeamsLeague1" :key="team.code">
          <f7-list-item :title="team.name" :after="currentLeague1.country">
                  <img slot="media" :src="team.image" width="50" />
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
      <f7-block-title large><font color="red" size="4">Les équipes de la {{currentLeague2.name}}</font></f7-block-title>
      <f7-block-title>2020-21</f7-block-title>
      <f7-list media-list v-for="team in currentTeamsLeague2" :key="team.code">
        <f7-list-item :title="team.name" :after="currentLeague2.country">
                <img slot="media" :src="team.image" width="50" />
        </f7-list-item>
      </f7-list>
    </f7-page-content>
  </f7-sheet>
</div>
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
          {
            name: "Selectionner une ligue",
            country: "",
            id: -1,
            name: "Selectionner une ligue",
            type: "",
            year: ""
          }
        ],
        currentLeague1: {
          country: "",
          id: -1,
          name: "Selectionner une ligue",
          type: "",
          year: ""
        },
        currentLeague2: {
          country: "",
          id: -1,
          name: "Selectionner une ligue",
          type: "",
          year: ""
        },
        countryTeam1: '',
        countryTeam2: '',
        match: [
          {
            name: "team1"
          },
          {
            name: "team2"
          }
        ],
        teams1: [
        ],
        teams2: [
        ],
        currentProgress: 10,
        step: 1,
        prediction: null,
        yearsParams: '',
        displayResult: false,
        predictionResult: []
      }
    },
    methods: {
      fetshTeams1() {
        if (this.currentLeague1 && this.currentLeague1.id !== -1) {
          let vm = this;
          vm.$f7.preloader.show();
          WebService.teamsOfLeague(vm.currentLeague1.id).then(response => {
            this.teams1 = response.data;
            vm.$f7.preloader.hide();
          }).catch((err) => {
            vm.$f7.preloader.hide();
            console.warn('can\'t get teams of the selected league, error= ', err);
          })
        }
      },
      fetshTeams2() {
        if (this.currentLeague2 && this.currentLeague2.id !== -1) {
          let vm = this;
          vm.$f7.preloader.show();
          WebService.teamsOfLeague(vm.currentLeague2.id).then(response => {
            this.teams2 = response.data;
            vm.$f7.preloader.hide();
          }).catch((err) => {
            vm.$f7.preloader.hide();
            console.warn('can\'t get teams of the selected league, error= ', err);
          })
        }
      },
      restart() {
        this.step = 1;
        this.currentLeague1 = {
          country: "",
          id: -1,
          name: "Selectionner une ligue",
          type: "",
          year: ""
        };
        this.currentLeague2 = {
          country: "",
          id: -1,
          name: "Selectionner une ligue",
          type: "",
          year: ""
        };
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
        this.currentLeague1 = {
          country: "",
          id: -1,
          name: "Selectionner une ligue",
          type: "",
          year: ""
        };
        this.currentLeague2 = {
          country: "",
          id: -1,
          name: "Selectionner une ligue",
          type: "",
          year: ""
        };
        this.step = this.step - 1;
        this.yearsParams = '';
      },
      setPrediction(payload) {
        if (payload) {
          this.prediction = payload;
          console.log('this.prediction =', this.prediction);
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
      leaguesList() {
        return this.leagues;
      },
      currentStep() {
        // console.log('currentStep =', this.step);
        return this.step;
      },
      leaguesTitle() {
        return "Ligue";
      },
      currentStateC() {
        // console.log('current league =', this.currentLeague);
        if ((this.step === 1) && (this.currentLeague1.name === 'Selectionner une ligue' || this.currentLeague2.name === 'Selectionner une ligue')) {
          return false;
        }
        if ((this.step === 2 && this.prediction === null) || (this.prediction && (this.prediction.awayTeam.teamName === 'Select a team' || !this.prediction.homeTeam.teamName === 'Select a team'))) {
          return false;
        }
        if (this.step === 3 && this.yearsParams === '') {
          return false;
        }
        return true;
      },
      currentTeamsLeague1() {
        return this.teams1;
      },
      currentTeamsLeague2() {
        return this.teams2;
      }
    },
    mounted() {
      let vm = this;
      vm.$f7.preloader.show();
      WebService.getAvailableLeague().then(response => {
        this.leagues = this.leagues
                          .concat(response.data.filter(league => league.year >= 2019 && league.country !== 'China' && !league.name.includes('Cup') && !league.name.includes('World') && !league.name.includes('Euro') && !league.name.includes('Segunda')));
        vm.$f7.preloader.hide();
        }).catch((err) => {
          vm.$f7.preloader.hide();
        console.warn('can\t fetsh leagues , error =', err);
      })

      vm.$refs.leagues1.f7SmartSelect.on('close', function(el) {
        const tmpName = el.selectEl.selectedOptions[0].value.substring(0, el.selectEl.selectedOptions[0].value.indexOf("!"));
        vm.countryTeam1 = el.selectEl.selectedOptions[0].value.substring(el.selectEl.selectedOptions[0].value.indexOf("!") + 1, el.selectEl.selectedOptions[0].value.length);
        vm.currentLeague1 = vm.leagues.filter(league => league.name === tmpName && league.country === vm.countryTeam1)[0];
        vm.fetshTeams1();
      });

      vm.$refs.leagues2.f7SmartSelect.on('close', function(el) {
        const tmpName = el.selectEl.selectedOptions[0].value.substring(0, el.selectEl.selectedOptions[0].value.indexOf("!"));
        vm.countryTeam2 = el.selectEl.selectedOptions[0].value.substring(el.selectEl.selectedOptions[0].value.indexOf("!") + 1, el.selectEl.selectedOptions[0].value.length);
        vm.currentLeague2 = vm.leagues.filter(league => league.name === tmpName && league.country === vm.countryTeam2)[0];
        vm.fetshTeams2();
      });


      if (vm.step === 3) {
        vm.$refs.years.f7SmartSelect.on('close', function(el) {
          vm.yearsParams = el.selectEl.selectedOptions[0].value;
          vm.prediction.yearsFilter = vm.yearsParams;
        });
      }

    },
    watch: {
      step(newv, oldv) {
        if (this.step === 1) {
          let vm = this;
          setTimeout(function () {
              vm.$refs.leagues1.f7SmartSelect.on('close', function(el) {
                const tmpName = el.selectEl.selectedOptions[0].value.substring(0, el.selectEl.selectedOptions[0].value.indexOf("!"));
                vm.countryTeam1 = el.selectEl.selectedOptions[0].value.substring(el.selectEl.selectedOptions[0].value.indexOf("!") + 1, el.selectEl.selectedOptions[0].value.length);
                vm.currentLeague1 = vm.leagues.filter(league => league.name === tmpName && league.country === vm.countryTeam1)[0];
                vm.fetshTeams1();
              });
          }, 3000);

          setTimeout(function () {
            vm.$refs.leagues2.f7SmartSelect.on('close', function(el) {
              const tmpName = el.selectEl.selectedOptions[0].value.substring(0, el.selectEl.selectedOptions[0].value.indexOf("!"));
              vm.countryTeam2 = el.selectEl.selectedOptions[0].value.substring(el.selectEl.selectedOptions[0].value.indexOf("!") + 1, el.selectEl.selectedOptions[0].value.length);
              vm.currentLeague2 = vm.leagues.filter(league => league.name === tmpName && league.country === vm.countryTeam2)[0];
              vm.fetshTeams2();
            });
          }, 3000);
        }
        if (this.step === 2) {

        }
        if (this.step === 3) {
          let vm = this;
          setTimeout(function () {
            vm.$refs.years.f7SmartSelect.on('close', function(el) {
              vm.yearsParams = el.selectEl.selectedOptions[0].value;
              vm.prediction.yearsFilter = vm.yearsParams;
            });
          }, 3000);
        }

        if (this.step === 4) {
          let vm = this;
          const today = new Date();
          const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() + '-' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
          WebService.pronostics(vm.prediction, date, StorageService.getUser().token).then(response => {
            vm.displayResult = true;
          }).catch((err) => {
            console.warn("error while calculating prediction ", err);
            let dialog =  vm.$f7.dialog.create({
                title: 'Oups...',
                text: 'quelque chose s\'est mal passé, veuillez ressayer plus tard',
                destroyOnClose: true,
                buttons: [
                    {
                        text: 'ok',
                        color: vm.colorTheme,
                    }
                ]
            });
            dialog.open();
          });

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
