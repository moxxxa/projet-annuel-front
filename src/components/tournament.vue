<template>
  <div>
    <f7-card>
      <f7-card-content>
        <div v-if="!displayResult">
          <center><h1 class="light">Simuler un tournoi</h1></center>
          <center><h3 class="light">Prédire le résultat d'un tournoi</h3></center>
          <br>
          <!-- number of teams -->
          <center>
            Pour commencer, merci de choisir le
          </center>
          <f7-button popover-open=".popover-number-teams"><font size="2">nombre des équipes : &nbsp;{{numberOfTeams}}</font></f7-button>
          <br><br>
          <!-- years caluclation -->

          <f7-list>
            <f7-list-item title="Sur la base de" smart-select :smart-select-params="{openIn: 'sheet'}" ref="years">
              <select name="Sur la base de">
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

          <!-- teams selection -->
          <br><br>
          <div v-if="numberOfTeamC !== 0 && canPick">
            <teams-selector @updateTeams="updateTeams" :numberOfTeams="numberOfTeamC" :leagues="leagues"/>
          </div>
          <div v-else>
            <p><font size="3" class="disabled">&nbsp;&nbsp;&nbsp;Selectionner une équipe</font></p>
          </div>
          <br><br>
          <f7-button fill round raised text-color="black" :class="!currentStateC ? 'disabled' : ''" @click="predict">
            Prédire
          </f7-button>
        </div>
        <div v-else>
          <br>
          <center><h2 class="light">Vous pouvez suivre votre demande dans l'onglet Mes recherches</h2></center>
          <!-- <br><br><br>
          <h2 class="light" v-if="predictionResult.firstPlace">Prémiere place: {{predictionResult.firstPlace}}  <font color="red">{{predictionResult.firstPlacePrediction}}</font></h2>
          <h2 class="light" v-if="predictionResult.secondPlace">Deuxième place: {{predictionResult.secondPlace}}  <font color="red">{{predictionResult.secondPlacePrediction}}</font></h2>
          <h2 class="light" v-if="predictionResult.thirdPlace">Troisième place: {{predictionResult.thirdPlace}}  <font color="red">{{predictionResult.thirdPlacePrediction}}</font></h2> -->
          <br><br>
          <f7-button fill round raised text-color="black" fill @click="restart">Nouvelle simulation</f7-button>
          <br><br>
        </div>
      </f7-card-content>
    </f7-card>
    <f7-popover class="popover-number-teams">
      <f7-list>
        <f7-list-item link="#" popover-close title="2" @click="numberOfTeams = 2; canPick = false;"></f7-list-item>
        <f7-list-item link="#" popover-close title="4" @click="numberOfTeams = 4; canPick = false;" disabled></f7-list-item>
        <f7-list-item link="#" popover-close title="6" @click="numberOfTeams = 6; canPick = false;" disabled></f7-list-item>
        <f7-list-item link="#" popover-close title="8" @click="numberOfTeams = 8; canPick = false;" disabled></f7-list-item>
        <f7-list-item link="#" popover-close title="10" @click="numberOfTeams = 10; canPick = false;" disabled></f7-list-item>
        <f7-list-item link="#" popover-close title="12" @click="numberOfTeams = 12; canPick = false;" disabled></f7-list-item>
        <f7-list-item link="#" popover-close title="14" @click="numberOfTeams = 14; canPick = false;" disabled></f7-list-item>
        <f7-list-item link="#" popover-close title="16" @click="numberOfTeams = 16; canPick = false;" disabled></f7-list-item>
        <f7-list-item link="#" popover-close title="18" @click="numberOfTeams = 18; canPick = false;" disabled></f7-list-item>
      </f7-list>
    </f7-popover>
  </div>
</template>

<script>
import WebService from '../services/web-service'
import StorageService from '../services/storage-service';
import navbarAuth from '../components/navBar/navBarAuthentificated';
import teamsSelector from '../components/teamsSelector';

export default {
    components: {
      navbarAuth,
      teamsSelector
    },
    name: "Tournament",
    data () {
      return {
        displayResult: false,
        user: StorageService.getUser(),
        selectedTeams: [],
        numberOfTeams: 0,
        yearsParams: '',
        leagues: [],
        predictionResult: null,
        canPick: false

      }
    },
    methods: {
      restart() {
        this.selectedTeams = [];
        this.numberOfTeams = 0;
        this.yearsParams = '';
        this.displayResult = false;
        this.canPick = false;
        this.predictionResult = null;
      },
      updateTeams(payload) {
        this.selectedTeams = payload;
      },
      predict() {
        let vm = this;
        vm.selectedTeams = vm.selectedTeams.map(div => div.substring(0, div.indexOf("-")));
        const today = new Date();
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() + '-' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        WebService.saveTournament(vm.selectedTeams, StorageService.getUser().token, date).then(response => {
          vm.displayResult = true;
        }).catch((err) => {
          vm.restart();
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
    },
    computed: {
      canPickC() {
        return this.canPick;
      },
      numberOfTeamC() {
        return this.numberOfTeams;
      },
      currentStateC() {
        if (this.numberOfTeams === 0 || this.selectedTeams.length === 0 || this.selectedTeams.length !== this.numberOfTeams || this.yearsParams === '' || this.yearsParams === 'Select a benchmark') {
          return false;
        }
        return true;
      }
    },
    mounted() {
      let vm = this;
      vm.$f7.preloader.show();
      WebService.getAvailableLeague().then(response => {
        this.leagues = this.leagues
                          .concat(response.data.filter(league => league.year >= 2019 && !league.name.includes('Cup') && !league.name.includes('Championship') &&!league.name.includes('National') &&!league.name.includes('Non') && !league.name.includes('World')
                           && !league.name.includes('Euro') && !league.name.includes('Segunda') && !league.name.includes('Women') && !league.name.includes('Tercera') && !league.name.includes('Girone') && !league.name.includes('Regionalliga') &&
                             !league.name.includes('Feminine') &&
                          (league.country === 'Germany' || league.country === 'France' || league.country === 'Spain' || league.country === 'Italy' || league.country === 'England')));
        vm.$f7.preloader.hide();
        }).catch((err) => {
        vm.$f7.preloader.hide();
        console.warn('can\t fetsh leagues , error =', err);
      });
      vm.$refs.years.f7SmartSelect.on('close', function(el) {
        vm.yearsParams = el.selectEl.selectedOptions[0].value;
      });
    },
    watch: {
      numberOfTeamC(newv, oldv) {
        let vm = this;
        vm.$f7.preloader.show();
        for (const league of vm.leagues.slice(0, 4)) {
          WebService.teamsOfLeague(league.id).then(response => {
            league.teams = response.data;
          }).catch((err) => {
            vm.$f7.preloader.hide();
            console.warn('can\'t get teams of the selected league, error= ', err);
          });
        }
        setTimeout(function () {
          vm.canPick = true;
          vm.$f7.preloader.hide();
        }, 4000);
      },
      displayResult(newv, oldv) {
        let vm = this;
        setTimeout(function () {
          vm.$refs.years.f7SmartSelect.on('close', function(el) {
            vm.yearsParams = el.selectEl.selectedOptions[0].value;
          });
        }, 2000);
      }
    }
  }
</script>

<style scoped>

</style>
