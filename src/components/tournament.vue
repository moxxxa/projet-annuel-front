<template>
  <f7-block>
    <f7-card>
      <f7-card-content>
        <div v-if="!displayResult">
          <center><h1 class="light">Simuler un tournoi</h1></center>
          <center><h3 class="light">Prédire le résultat d'un tournoi</h3></center>
          <br>
          <!-- number of teams -->
          <f7-button popover-open=".popover-number-teams"><font size="2"> Pour commencer, merci de choisir le nombre des équipes : &nbsp;{{numberOfTeams}}</font></f7-button>
          <br><br>
          <!-- years caluclation -->
          <f7-list>
            <f7-list-item title="baser sur le 1, 2, 3 ... dernière années" smart-select :smart-select-params="{openIn: 'sheet'}" ref="years">
              <select name="Based on the 1, 2, 3 ... last years">
                <option value="Selectionner un benchmark" selected>Selectionner un benchmark</option>
                <option value="1">Années en cours</option>
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
          <div v-if="numberOfTeamC !== 0">
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
          <center><h1 class="light">Résultats</h1></center>
          <br><br><br>
          <h2 class="light">Prémiere place: {{selectedTeams[1]}}  <font color="red">( 58 % )</font></h2>
          <h2 class="light">Deuxième place: {{selectedTeams[3]}}  <font color="red">( 42 % )</font></h2>
          <br><br>
          <f7-button fill round raised text-color="black" fill @click="restart">Nouveau simulation</f7-button>
          <br><br>
        </div>
      </f7-card-content>
    </f7-card>
    <f7-popover class="popover-number-teams">
      <f7-list>
        <f7-list-item link="#" popover-close title="2" @click="numberOfTeams = 2"></f7-list-item>
        <f7-list-item link="#" popover-close title="4" @click="numberOfTeams = 4"></f7-list-item>
        <f7-list-item link="#" popover-close title="6" @click="numberOfTeams = 6"></f7-list-item>
        <f7-list-item link="#" popover-close title="8" @click="numberOfTeams = 8"></f7-list-item>
        <f7-list-item link="#" popover-close title="10" @click="numberOfTeams = 10"></f7-list-item>
        <f7-list-item link="#" popover-close title="12" @click="numberOfTeams = 12"></f7-list-item>
        <f7-list-item link="#" popover-close title="14" @click="numberOfTeams = 14"></f7-list-item>
        <f7-list-item link="#" popover-close title="16" @click="numberOfTeams = 16"></f7-list-item>
        <f7-list-item link="#" popover-close title="18" @click="numberOfTeams = 18"></f7-list-item>
      </f7-list>
    </f7-popover>
  </f7-block>
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
    name: "main",
    data () {
      return {
        displayResult: false,
        user: StorageService.getUser(),
        selectedTeams: [],
        numberOfTeams: 0,
        yearsParams: '',
        leagues: []

      }
    },
    methods: {
      restart() {
        this.selectedTeams = [];
        this.numberOfTeams = 0;
        this.yearsParams = '';
        this.displayResult = false;
      },
      updateTeams(payload) {
        this.selectedTeams = payload;
      },
      predict() {
      let vm = this;
      vm.$f7.dialog.preloader('Processing for the prediction ...., please wait');
        setTimeout(() => {
          vm.displayResult = true;
          vm.$f7.dialog.close();
        }, 10000);
      }
    },
    computed: {
      numberOfTeamC() {
        console.log('getting number of teams');
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
        console.log('leagues =', vm.leagues);
        }).catch((err) => {
        vm.$f7.preloader.hide();
        console.warn('can\t fetsh leagues , error =', err);
      });
      vm.$refs.years.f7SmartSelect.on('close', function(el) {
        vm.yearsParams = el.selectEl.selectedOptions[0].value;
        console.log('yearsParams = ', vm.yearsParams);
      });
    }
  }
</script>

<style scoped>

</style>
