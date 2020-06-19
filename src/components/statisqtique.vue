<template>
  <f7-block>
    <f7-card>
      <f7-card-content>
        <div v-if="!displayResult">
          <center><h1 class="light">Statisqtiques</h1></center>
          <center><h3 class="light">consulter les statistiques d'une équipe / joueur</h3></center>
          <br>
          <f7-button popover-open=".popover-choise"><font size="2"> Pour commencer, merci de choisir une option : &nbsp;{{choises}}</font></f7-button>
          <br><br>
          <hr/>
          <br>
          <center v-if="choises === 'équipe / joueur'"class="light">Veuillez Selectionner une ligue</center>
          <center v-else class="light">Afin de trouver {{calculateLabelChoice()}}, merci de selectionner la ligue en question</center>
          <br>
          <f7-list>
            <f7-list-item :title="leaguesTitle"  smart-select :smart-select-params="{openIn: 'popup', searchbar: true, searchbarPlaceholder: 'Chercher une ligue'}" ref="leagues1">
              <select :name="leaguesTitle">
                <optgroup>
                  <option v-for="league in leaguesList" :key="league.id" :value="league.name + '!' + league.country">{{league.name}}{{(league.id !== -1) ? `,&nbsp;&nbsp;${league.country}` : "" }}</option>
                </optgroup>
              </select>
            </f7-list-item>
          </f7-list>
          <br><br>
          <hr/>
          <br>
          <center v-if="choises === 'équipe / joueur'"class="light">Veuillez Selectionner l'équipe en question</center>
          <center v-else class="light">{{calculateLabelChoiceTeam()}}</center>
          <f7-list>
            <br>
            <f7-list-item title="équipe" smart-select :smart-select-params="{openIn: 'popup', searchbar: true, searchbarPlaceholder: 'chercher une équipe'}" ref="equipe"
            :class="choises === 'équipe / joueur' || currentLeague === 'Select a league' || currentLeague === '' ? 'disabled' : ''">
              <select name="équipe">
                <optgroup :label="currentLeague">
                  <option value="Select a team" selected>Sélectionner une équipe</option>
                  <div v-for="team in currentTeamsLeague" :key="team.code">
                    <option :value="team.name">{{team.name}}</option>
                  </div>
                </optgroup>
              </select>
            </f7-list-item>
          </f7-list>
          <br>

          <!-- joueur -->
          <f7-list v-if="choises === 'Joueur'">
            <f7-list-item title="Joueur" smart-select :smart-select-params="{openIn: 'popup', searchbar: true, searchbarPlaceholder: 'chercher un joueur'}" ref="joueur"
            :class="choises === 'équipe / joueur' || team === '' || currentLeague === 'Select a league' || currentLeague === '' ? 'disabled' : ''">
              <select name="équipe">
                <optgroup :label="currentLeague">
                  <option value="Select a player" selected>Sélectionner un joueur</option>
                  <div v-for="team in currentTeamsLeague" :key="team.code">
                    <option :value="team.name">{{team.name}}</option>
                  </div>
                </optgroup>
              </select>
            </f7-list-item>
          </f7-list>

          <br><br>
          <hr/>
          <center class="light">Réferences</center>
          <br>
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
          <br><br>
          <f7-button fill round raised text-color="black" :class="!currentStateC ? 'disabled' : ''" @click="findStats">
            Chercher
          </f7-button>
        </div>
        <div v-else>
          <br>
          <center><h1 class="light">Résultats</h1></center>
          <br><br><br>
          <!-- <h2 class="light">Prémiere place: {{selectedTeams[1]}}  <font color="red">( 58 % )</font></h2>
          <h2 class="light">Deuxième place: {{selectedTeams[3]}}  <font color="red">( 42 % )</font></h2> -->
          <br><br>
          <f7-button fill round raised text-color="black" fill @click="restart">Nouvelle recherche</f7-button>
          <br><br>
        </div>
      </f7-card-content>
    </f7-card>
    <f7-popover class="popover-choise">
      <f7-list>
        <f7-list-item link="#" popover-close title="Equipe" @click="choise = 'Equipe'"></f7-list-item>
        <f7-list-item link="#" popover-close title="Joueur" @click="choise = 'Joueur'"></f7-list-item>
      </f7-list>
    </f7-popover>
  </f7-block>
</template>

<script>
import WebService from '../services/web-service'
import StorageService from '../services/storage-service';

export default {
    components: {

    },
    name: "main",
    data () {
      return {
        user: StorageService.getUser(),
        yearsParams: '',
        team: '',
        player: '',
        choise: '',
        displayResult: false,
        leagues: [
          {
            name: "Selectionner une ligue",
            country: "",
            id: -1,
            type: "",
            year: ""
          }
        ],
        currentLeague: {
          name: 'Select a league',
          country: "",
          id: -1,
          name: "Selectionner une ligue",
          type: "",
          year: ""
        }
      };
    },
    methods: {
      restart() {
        this.displayResult = false;
        this.yearsParams = '';
        this.team = '';
        this.player = '';
        this.choise = '';
        this.currentLeague = '';
      },
      findStats() {
        let vm = this;
        vm.$f7.dialog.preloader('Veuillez patientez, la recherche pour les statistiques est en cours ...');
          setTimeout(() => {
            vm.displayResult = true;
            vm.$f7.dialog.close();
          }, 10000);
      },
      calculateLabelChoice() {
        if (this.choise === 'Equipe') {
          return 'cette equipe'
        }
        return 'ce joueur';
      },
      calculateLabelChoiceTeam() {
        if (this.choise === 'Equipe') {
          return 'Veuillez sélectionner l\'équipe en question';
        }
        return 'Veuillez sélectionner l\'équipe dans laquelle figure ce joueur';
      }
    },
    computed: {
      leaguesList() {
        return this.leagues;
      },
      leaguesTitle() {
        return "LaLiga, Bundesliga, Ligue1 ..";
      },
      currentStateC() {
        let first_result =  this.team !== '' && this.team !== 'Sélectionner une équipe' && this.yearsParams !== '' && this.yearsParams !== 'Selectionner un benchmark'
               && this.choise !== '';
        if (this.choise == 'Joueur') {
          first_result = first_result && this.player !== '' && this.player !== 'Sélectionner un joueur';
        }
        return first_result;
      },
      leaguesC() {
        return this.leagues[0] + ", " + this.leagues[1] + ", " + this.leagues[2];
      },
      choises() {
        if (this.choise == '')
          return 'équipe / joueur';
        return this.choise;
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
      WebService.getAvailableLeague().then(response => {
        this.leagues = this.leagues
                          .concat(response.data.filter(league => league.year >= 2019 && league.country !== 'China' && !league.name.includes('Cup') && !league.name.includes('World') && !league.name.includes('Euro') && !league.name.includes('Segunda')));
        }).catch((err) => {
        console.warn('can\t fetsh leagues , error =', err);
      });

      let vm = this;
      vm.$refs.leagues1.f7SmartSelect.on('close', function(el) {
        vm.currentLeague = el.selectEl.selectedOptions[0].value;
        console.log('dans le mounted, currentLeague =', vm.currentLeague);
      });

      vm.$refs.equipe.f7SmartSelect.on('close', function(el) {
        vm.team = el.$valueEl[0].innerText;
        console.log('this.team =', vm.team);
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
