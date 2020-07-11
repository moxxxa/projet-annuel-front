<template>
  <div>
    <f7-card>
      <f7-card-content>
        <center><h3 class="light">Mes recherches</h3></center>
        <center><f7-button fill round raised text-color="black" @click="refresh">Actualiser</f7-button></center>
        <br>
        <center v-if="!dataIsAvailable">
          <f7-icon md="material:cloud_off" size="70"></f7-icon>
          <br><br><br>
        </center>
        <div v-else>
          <div v-if="pronostics.length > 0">
            <h2 class="light">Pronostics</h2>
            <div class="pronostics data-table">
              <table>
                <thead>
                  <tr>
                    <th style="text-align: center; vertical-align: middle;" class="light"></th>
                    <th style="text-align: center; vertical-align: middle;" class="light">Statut</th>
                    <th style="text-align: center; vertical-align: middle;" class="light">Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="p in pronostics" :key="p.id">
                    <td style="text-align: center; vertical-align: middle;" class="light">
                      <f7-button v-if="p.status === 'Pending'" class="disabled">
                        <f7-icon md="material:visibility_off" color="red" size="20"></f7-icon>
                      </f7-button>
                      <f7-button v-else popup-open=".pronostics-popup-swipe" @click="currentPronostic = p; statistiqueDisplayPlayer = null; statistiqueDisplayTeam = null; currentTournament = null;popupOpenedPr=true;">
                        <f7-icon md="material:visibility" color="green" size="20"></f7-icon>
                      </f7-button>
                    </td>
                    <td style="text-align: center; vertical-align: middle;" class="light">
                      <span v-if="p.status === 'Pending'"><font color="red">En cours</font></span>
                      <span v-else><font color="green">Terminé</font></span>
                    </td>
                    <td style="text-align: center; vertical-align: middle;" class="light"><font size="1">{{p.date}}</font></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <br>
          <hr/>
          <div v-if="statistiques.length > 0">
            <h2 class="light">Statistique équipe</h2>
            <div class="statisitics data-table">
              <table v-if="statistiqueTeams">
                <thead>
                  <tr>
                    <th style="text-align: center; vertical-align: middle;" class="light"></th>
                    <th style="text-align: center; vertical-align: middle;" class="light">Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="p in teamsStats" :key="p.idTmp">
                    <td style="text-align: center; vertical-align: middle;" class="light">
                      <f7-button popup-open=".teamstatistiques-popup-swipe" @click="currentStatistiqueTeam = p; currentPronostic = null; currentStatistiquePlayer = null; currentTournament = null;popupOpenedTe=true;">
                        <f7-icon md="material:visibility" color="green" size="20"></f7-icon>
                      </f7-button>
                    </td>
                    <td style="text-align: center; vertical-align: middle;" class="light">{{p.date}}</td>
                  </tr>
                </tbody>
              </table>
              <br>
              <hr v-if="playersStats"/>
              <h2 class="light" v-if="playersStats">Statistique joueur </h2>
              <table v-if="statistiquePlayers">
                <thead>
                  <tr>
                    <th style="text-align: center; vertical-align: middle;" class="light"></th>
                    <th style="text-align: center; vertical-align: middle;" class="light">Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="player in playersStats" :key="player.idTmp">
                    <td style="text-align: center; vertical-align: middle;" class="light">
                      <f7-button popup-open=".playerstatistique-popup-swipe" @click="currentStatistiquePlayer = player; currentStatistiqueTeam = null; currentPronostic = null;currentTournament = null;popupOpenedPl=true;">
                        <f7-icon md="material:visibility" color="green" size="20"></f7-icon>
                      </f7-button>
                    </td>
                    <td style="text-align: center; vertical-align: middle;" class="light">{{player.date}}</td>
                  </tr>
                </tbody>
              </table>
              <div v-if="tournaments.length > 0">
                <hr/>
                <h2 class="light">Tournois</h2>
                <div class="pronostics data-table" v-if="pendingTournaments">
                  <table>
                    <thead>
                      <tr>
                        <th></th>
                        <th style="text-align: center; vertical-align: middle;" class="light">Statut</th>
                        <th style="text-align: center; vertical-align: middle;" class="light">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="p in tournaments" :key="p.id" v-if="p.status === 'Pending'">
                        <td style="text-align: center; vertical-align: middle;" class="light">
                          <f7-button v-if="p.status === 'Pending'" class="disabled">
                            <f7-icon md="material:visibility_off" color="red" size="20"></f7-icon>
                          </f7-button>
                          <f7-button v-else popup-open=".tournament-popup-swipe" @click="currentTournament = p; statistiqueDisplayPlayer = null; statistiqueDisplayTeam = null; currentPronostic = null;popupOpenedTr=true;">
                            <f7-icon md="material:visibility" color="green" size="20"></f7-icon>
                          </f7-button>
                        </td>
                        <td style="text-align: center; vertical-align: middle;" class="light">
                          <span v-if="p.status === 'Pending'"><font color="red">En cours</font></span>
                          <span v-else><font color="green">Terminé</font></span>
                        </td>
                        <td style="text-align: center; vertical-align: middle;" class="light">{{p.date}}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </f7-card-content>
    </f7-card>
    <div v-if="loaded">
      <f7-popup class="pronostics-popup-swipe" swipe-to-close :opened="popupOpenedPrC && currentPronosticC !== null" @popup:closed="popupOpenedPr = false">
        <f7-page>
          <f7-navbar title="Pronostic">
            <f7-nav-right>
              <f7-link popup-close>Fermer</f7-link>
            </f7-nav-right>
          </f7-navbar>
          <pronostics-dsiplay v-if="currentPronosticC !== null" :pronostic="currentPronosticC"/>
        </f7-page>
      </f7-popup>
      <f7-popup class="tournament-popup-swipe" swipe-to-close :opened="popupOpenedTrC &&  currentTournamentC !== null" @popup:closed="popupOpenedTr = false">
        <f7-page>
          <f7-navbar title="Tournois">
            <f7-nav-right>
              <f7-link popup-close>Fermer</f7-link>
            </f7-nav-right>
          </f7-navbar>
            <tournament-display v-if=" currentTournamentC !== null" :tournament="currentTournamentC"/>
          </f7-page>
        </f7-popup>
        <f7-popup class="teamstatistiques-popup-swipe" swipe-to-close :opened="popupOpenedTeC && currentStatistiqueTeamC !== null" @popup:closed="popupOpenedTe = false">
          <f7-page>
            <f7-navbar title="Statistique équipe">
              <f7-nav-right>
                <f7-link popup-close>Fermer</f7-link>
              </f7-nav-right>
            </f7-navbar>
            <statistique-displayTeam v-if="currentStatistiqueTeamC !== null" :team="currentStatistiqueTeamC"/>
          </f7-page>
        </f7-popup>
        <f7-popup class="playerstatistique-popup-swipe" swipe-to-close :opened="popupOpenedPlC && currentStatistiquePlayerC !== null" @popup:closed="popupOpenedPl = false">
          <f7-page>
            <f7-navbar title="Statistique joueur">
              <f7-nav-right>
                <f7-link popup-close>Fermer</f7-link>
              </f7-nav-right>
            </f7-navbar>
            <statistique-display-player :player="currentStatistiquePlayerC"/>
          </f7-page>
        </f7-popup>
      </div>
  </div>
</template>




<script>
import WebService from '../services/web-service'
import StorageService from '../services/storage-service';
import pronosticsDsiplay from './pronosticsDsiplay'
import statistiqueDisplayPlayer from './statistiqueDisplayPlayer'
import statistiqueDisplayTeam from './statistiqueDisplayTeam'
import tournamentDisplay from './tournamentDisplay'

export default {
    components: {
      pronosticsDsiplay,
      statistiqueDisplayTeam,
      statistiqueDisplayPlayer,
      tournamentDisplay
    },
    name: "recherche",
    data() {
      return {
        pronostics: [],
        statistiques: [],
        globalStats: [],
        tournaments: [],
        currentPronostic: null,
        currentStatistiqueTeam: null,
        currentStatistiquePlayer: null,
        currentTournament: null,
        popupOpenedPr: false,
        popupOpenedTe: false,
        popupOpenedPl: false,
        popupOpenedTr: false,
        loaded: false
      };
    },
    methods: {
      handlePanelClose() {
        console.log('panel closed');
        this.currentPronostic = null;
        this.currentStatistiqueTeam  = null;
        this.currentTournament = null;
        this.currentPronostic = null;
      },
      refresh() {
        this.pronostics = [];
        this.statistiques = [];
        this.globalStats = [];
        this.tournaments = [];
        this.fetshData();
      },
      fetshData() {
        let vm = this;
        setTimeout(function () {
          vm.loaded = true;
        }, 500);
        vm.$f7.preloader.show();
        WebService.getPronostics().then(response => {
          vm.pronostics = response.data;
          // console.log('pronostics =', vm.pronostics);
        }).catch((err) => {
          console.warn("can't getPronostics ", err);
        });

        WebService.getStatistique().then(response => {
          vm.statistiques = response.data;
          for (const element of vm.statistiques) {
            if (element.type === 'team') {
              WebService.teamsStats(element.leagueId, element.teamId, element.year).then(response1 => {
                const tmp = response1.data;
                tmp.type = "team";
                tmp.date = element.date;
                tmp.idTmp = new Date().getUTCMilliseconds();
                vm.globalStats.push(tmp);
              }).catch((err) => {
                console.warn('error fetshing stats=', err);
              });
            } else {
              WebService.playerStats(element.playerId).then(response2 => {
                const tmp = response2.data;
                tmp.type = "player";
                tmp.date = element.date;
                vm.globalStats.push(tmp);
                tmp.idTmp = new Date().getUTCMilliseconds();
              }).catch((err) => {
                console.warn('error fetshing player stats=', err);
              })
            }
          }
          vm.$f7.preloader.hide();
        }).catch((err) => {
          vm.$f7.preloader.hide();
          console.warn("can't get statisitics ", err);
        });

        WebService.getTournaments().then(response => {
          vm.tournaments = response.data;
          for (const element of vm.tournaments) {
            element.teams = [];
            for (const id of element.tournament) {
              WebService.teamById(id).then(response1 => {
                element.teams.push(response1.data);
              }).catch((err) => {
                console.warn('error fetshing player =', err);
              });
            }
          }
          vm.$f7.preloader.hide();
        }).catch((err) => {
          vm.$f7.preloader.hide();
          console.warn("can't get tournaments ", err);
        });

      }
    },
    computed: {
      popupOpenedPrC() {
        return this.popupOpenedPr;
      },
      popupOpenedTeC() {
        return this.popupOpenedTe;
      },
      popupOpenedPlC() {
        return this.popupOpenedPl;
      },
      popupOpenedTrC() {
        return this.popupOpenedTr;
      },
      currentStatistiquePlayerC() {
        return this.currentStatistiquePlayer;
      },
      currentStatistiqueTeamC() {
        return this.currentStatistiqueTeam;
      },
      currentPronosticC() {
        return this.currentPronostic;
      },
      currentTournamentC() {
        return this.currentTournament;
      },
      panelLeftC() {
        return this.panelLeft;
      },
      panelRightC() {
        console.log('this.panelRight =', this.panelRight);
        return this.panelRight;
      },
      statistiqueTeams() {
        return this.statistiques.filter(div => div.type === 'team').length > 0;
      },
      statistiquePlayers() {
        return this.statistiques.filter(div => div.type === 'player').length > 0;
      },
      dataIsAvailable() {
        return this.pronostics.length + this.statistiques.length + this.tournaments.length > 0;
      },
      teamsStats() {
        return this.globalStats.filter(div => div.type === 'team');
      },
      playersStats() {
        return this.globalStats.filter(div => div.type === 'player');
      },
      completedPronostics() {
        return this.pronostics.filter(div => div.status === 'Finished').length > 0;
      },
      pendingPronostics() {
        return this.pronostics.filter(div => div.status === 'Pending').length > 0;
      },
      pendingTournaments() {
        return this.tournaments.filter(div => div.status === 'Pending').length > 0;
      },
      completedTournaments() {
        return this.tournaments.filter(div => div.status === 'Finished').length > 0;
      },
    },
    mounted() {
      this.fetshData();
    },
    watch: {
      pronostics(newv, oldv) {
        this.dataAvailable;
      },
      statistiques(newv, oldv) {
        this.dataAvailable;
      }
    }
  }
</script>

<style scoped>
.panel {
  min-width: 100px;
  max-width: 90vw;
}
</style>
