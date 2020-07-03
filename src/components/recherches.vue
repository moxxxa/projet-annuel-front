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
                      <f7-button v-else panel-open="right" @click="currentPronostic = p; statistiqueDisplayPlayer = null; statistiqueDisplayTeam = null; currentTournament = null;">
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
                      <f7-button panel-open="left" @click="currentStatistiqueTeam = p; currentPronostic = null; currentStatistiquePlayer = null; currentTournament = null;">
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
                      <f7-button panel-open="left" @click="currentStatistiquePlayer = player; currentStatistiqueTeam = null; currentPronostic = null;currentTournament = null;">
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
                          <f7-button v-else panel-open="right" @click="currentTournament = p; statistiqueDisplayPlayer = null; statistiqueDisplayTeam = null; currentPronostic = null;">
                            <f7-icon md="material:visibility" color="green" size="20"></f7-icon>
                          </f7-button>
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
    <f7-panel right theme-dark swipe v-if="currentPronostic !== null || currentTournament !== null">
      <f7-view>
        <f7-page>
          <pronostics-dsiplay v-if="currentPronostic !== null" :pronostic = "currentPronostic"/>
          <tournament-display v-if=" currentTournament !== null" :tournament = "currentTournament"/>
        </f7-page>
      </f7-view>
    </f7-panel>
    <f7-panel left theme-dark swipe v-if="currentStatistiqueTeam !== null || currentStatistiquePlayer !== null">
      <f7-view>
        <f7-page>
          <statistique-displayTeam v-if="currentStatistiqueTeam !== null" :team = "currentStatistiqueTeam"/>
          <statistique-display-player v-else :player = "currentStatistiquePlayer"/>
        </f7-page>
      </f7-view>
    </f7-panel>
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
        currentTournament: null
      };
    },
    methods: {
      refresh() {
        this.pronostics = [];
        this.statistiques = [];
        this.globalStats = [];
        this.tournaments = [];
        this.fetshData();
      },
      fetshData() {
        let vm = this;
        vm.$f7.preloader.show();
        WebService.getPronostics().then(response => {
          vm.pronostics = response.data;
          console.log('pronostics =', vm.pronostics);
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
