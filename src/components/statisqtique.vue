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
            <f7-list-item :title="leaguesTitle"  smart-select :smart-select-params="{openIn: 'popup', searchbar: true, searchbarPlaceholder: 'Chercher une ligue'}" ref="leagues1" :class="choise === '' ? 'disabled' : ''">
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
            :class="choises === 'équipe / joueur' || currentLeague.name === 'Select a league' || currentLeague.name === '' ? 'disabled' : ''">
              <select name="équipe">
                <optgroup :label="currentLeague.name">
                  <option value="Select a team" selected>Sélectionner une équipe</option>
                  <div v-for="team in currentTeamsLeague" :key="team.id">
                    <option :value="team.name">{{team.name}}</option>
                  </div>
                </optgroup>
              </select>
            </f7-list-item>
          </f7-list>
          <br>

          <!-- joueur -->
          <f7-list>
            <f7-list-item title="Joueur" smart-select :smart-select-params="{openIn: 'popup', searchbar: true, searchbarPlaceholder: 'chercher un joueur'}" ref="joueur"
            :class="choises ==='Equipe' || choises === 'équipe / joueur' || team === '' || currentLeague === 'Select a league' || currentLeague === '' ? 'disabled' : ''">
              <select name="équipe">
                <optgroup :label="currentLeague.name">
                  <option value="Select a player" selected>Sélectionner un joueur</option>
                  <div v-for="player in teamStats.players" :key="player.id">
                    <option :value="player.name">{{player.name}}</option>
                  </div>
                </optgroup>
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
          <br>
          <div class="data-table" v-if="choises === 'Joueur'">
            <player-statistique :player="player" :playerStats="playerStats" :currentLeague="currentLeague"/>
          </div>
          <div v-else>
            <team-statistique :teamStats="teamStats" :team="team"/>
          </div>
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
import teamStatistique from './teamStatistique';
import playerStatistique from './playerStatistique';

export default {
    components: {
      teamStatistique,
      playerStatistique
    },
    name: "main",
    data () {
      return {
        user: StorageService.getUser(),
        teams: [],
        countryTeam1: '',
        team: '',
        player: '',
        teamStats: [],
        playerStats: [],
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
      fetshteams() {
        if (this.currentLeague && this.currentLeague.id !== -1) {
          let vm = this;
          WebService.teamsOfLeague(vm.currentLeague.id).then(response => {
            this.teams = response.data;
          }).catch((err) => {
            console.warn('can\'t get teams of the selected league, error= ', err);
          })
        }
      },
      restart() {
        this.displayResult = false;
        this.team = '';
        this.player = '';
        this.choise = '';
        this.teams = [];
        this.countryTeam1 = '';
        this.teamStats = [];
        this.playerStats = [];
        this.currentLeague = {
          name: 'Select a league',
          country: "",
          id: -1,
          name: "Selectionner une ligue",
          type: "",
          year: ""
        };
      },
      findStats() {
        let vm = this;
        vm.$f7.dialog.preloader('Veuillez patientez, la recherche pour les statistiques est en cours ...');
          setTimeout(() => {
            vm.displayResult = true;
            vm.$f7.dialog.close();
          }, 3000);
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
        let first_result =  this.team !== '' && this.team !== 'Sélectionner une équipe' && this.choise !== '';
        if (this.choise === 'Joueur') {
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
        return this.teams;
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
        const tmpName = el.selectEl.selectedOptions[0].value.substring(0, el.selectEl.selectedOptions[0].value.indexOf("!"));
        vm.countryTeam1 = el.selectEl.selectedOptions[0].value.substring(el.selectEl.selectedOptions[0].value.indexOf("!") + 1, el.selectEl.selectedOptions[0].value.length);
        vm.currentLeague = vm.leagues.filter(league => league.name === tmpName && league.country === vm.countryTeam1)[0];
        vm.fetshteams();
      });

      vm.$refs.equipe.f7SmartSelect.on('close', function(el) {
        vm.team = vm.teams.find(t => t.name === el.$valueEl[0].innerText);
        WebService.teamsStats(vm.currentLeague.id, vm.team.id, vm.currentLeague.year).then(response => {
          vm.teamStats = response.data;
        }).catch((err) => {
          console.warn('error fetshing stats=', err);
        })
      });

      vm.$refs.joueur.f7SmartSelect.on('close', function(el) {
        vm.player = vm.teamStats.players.find(p => p.name === el.$valueEl[0].innerText);
        WebService.playerStats(vm.player.id).then(response => {
          vm.playerStats = response.data;
        }).catch((err) => {
          console.warn('error fetshing player stats=', err);
        })
      });
    },
    watch: {
      displayResult(newv, oldv) {
        let vm = this;
        setTimeout(function () {
          vm.$refs.leagues1.f7SmartSelect.on('close', function(el) {
            const tmpName = el.selectEl.selectedOptions[0].value.substring(0, el.selectEl.selectedOptions[0].value.indexOf("!"));
            vm.countryTeam1 = el.selectEl.selectedOptions[0].value.substring(el.selectEl.selectedOptions[0].value.indexOf("!") + 1, el.selectEl.selectedOptions[0].value.length);
            vm.currentLeague = vm.leagues.filter(league => league.name === tmpName && league.country === vm.countryTeam1)[0];
            vm.fetshteams();
          });
        }, 3000);

        setTimeout(function () {
          vm.$refs.equipe.f7SmartSelect.on('close', function(el) {
            vm.team = vm.teams.find(t => t.name === el.$valueEl[0].innerText);
            WebService.teamsStats(vm.currentLeague.id, vm.team.id, vm.currentLeague.year).then(response => {
              vm.teamStats = response.data;
            }).catch((err) => {
              console.warn('error fetshing stats=', err);
            })
          });
        }, 2000);

        setTimeout(function () {
          vm.$refs.joueur.f7SmartSelect.on('close', function(el) {
            vm.player = vm.teamStats.players.find(p => p.name === el.$valueEl[0].innerText);
            WebService.playerStats(vm.player.id).then(response => {
              vm.playerStats = response.data;
            }).catch((err) => {
              console.warn('error fetshing player stats=', err);
            })
          });
        }, 2000);
      }
    }
  }
</script>

<style scoped>

</style>
