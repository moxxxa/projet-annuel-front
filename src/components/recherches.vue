<template>
  <f7-block>
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
                    <th style="text-align: center; vertical-align: middle;" class="light">Numéro</th>
                    <th style="text-align: center; vertical-align: middle;" class="light">Date d'éxecution</th>
                    <th style="text-align: center; vertical-align: middle;" class="light">équipe à domicile</th>
                    <th style="text-align: center; vertical-align: middle;" class="light">équipe à l'extérieur</th>
                    <th style="text-align: center; vertical-align: middle;" class="light">équipe à domicile gagne</th>
                    <th style="text-align: center; vertical-align: middle;" class="light">équipe à l'extérieur gagne</th>
                    <th style="text-align: center; vertical-align: middle;" class="light">Matche null</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="p in pronostics" :key="p.id">
                    <td style="text-align: center; vertical-align: middle;" class="light">{{p.id}}</td>
                    <td style="text-align: center; vertical-align: middle;" class="light">{{p.date}}</td>
                    <td style="text-align: center; vertical-align: middle;" class="light">{{p.homeTeamName}}<br><img :src="p.imageHome" height="40px" weight="40px"></td>
                    <td style="text-align: center; vertical-align: middle;" class="light">{{p.awayTeamName}}<br><img :src="p.imageAway" height="40px" weight="40px"></td>
                    <td style="text-align: center; vertical-align: middle;" class="light">{{p.homeResult}}</td>
                    <td style="text-align: center; vertical-align: middle;" class="light">{{p.awayResult}}</td>
                    <td style="text-align: center; vertical-align: middle;" class="light">{{p.drawResult}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <br>
          <div v-if="statistiques.length > 0">
            <h2 class="light">Statistique</h2>
            <div class="statisitics data-table">
              <table>
                <thead>
                  <tr>
                    <th style="text-align: center; vertical-align: middle;" class="light">Type</th>
                    <th style="text-align: center; vertical-align: middle;" class="light">Date d'éxecution</th>
                    <th style="text-align: center; vertical-align: middle;" class="light">Nom</th>
                    <th style="text-align: center; vertical-align: middle;" class="light">Nombre total de buts</th>
                    <th style="text-align: center; vertical-align: middle;" class="light">Nombre de joueurs</th>
                    <th style="text-align: center; vertical-align: middle;" class="light">Matchs nulls à domicile</th>
                    <th style="text-align: center; vertical-align: middle;" class="light">Matchs perdus à domicile</th>
                    <th style="text-align: center; vertical-align: middle;" class="light">matchs gagnés à domicile</th>
                    <th style="text-align: center; vertical-align: middle;" class="light">Matchs nulls à l'extérieur</th>
                    <th style="text-align: center; vertical-align: middle;" class="light">Matchs perdus à l'extérieur</th>
                    <th style="text-align: center; vertical-align: middle;" class="light">matchs gagnés à l'extérieur</th>
                    <th style="text-align: center; vertical-align: middle;" class="light">Saison</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="p in teamsStats" :key="p.idTmp">
                    <td style="text-align: center; vertical-align: middle;" class="light">{{p.type === 'team' ? 'équipe' : 'joueur'}}</td>
                    <td style="text-align: center; vertical-align: middle;" class="light">{{p.date}}</td>
                    <td style="text-align: center; vertical-align: middle;" class="light"><strong>{{p.name}}</strong></td>
                    <td style="text-align: center; vertical-align: middle;" class="light">{{p.goalCount}}</td>
                    <td style="text-align: center; vertical-align: middle;" class="light">{{p.players ? p.players.length : 'N/F'}}</td>
                    <td style="text-align: center; vertical-align: middle;" class="light">{{p.homeDraws}}</td>
                    <td style="text-align: center; vertical-align: middle;" class="light">{{p.homeLoses}}</td>
                    <td style="text-align: center; vertical-align: middle;" class="light">{{p.homeWin}}</td>
                    <td style="text-align: center; vertical-align: middle;" class="light">{{p.outDraws}}</td>
                    <td style="text-align: center; vertical-align: middle;" class="light">{{p.outLoses}}</td>
                    <td style="text-align: center; vertical-align: middle;" class="light">{{p.outWin}}</td>
                    <td style="text-align: center; vertical-align: middle;" class="light">2019/2020</td>
                  </tr>
                </tbody>
              </table>
              <br>
              <hr/>
              <table>
                <thead>
                  <tr>
                    <th style="text-align: center; vertical-align: middle;" class="light">Type</th>
                    <th style="text-align: center; vertical-align: middle;" class="light">Date d'éxecution</th>
                    <th style="text-align: center; vertical-align: middle;" class="light">Nom</th>
                    <th style="text-align: center; vertical-align: middle;" class="light">Age</th>
                    <th style="text-align: center; vertical-align: middle;" class="light">Nationnalité</th>
                    <th style="text-align: center; vertical-align: middle;" class="light">Équipe</th>
                    <th style="text-align: center; vertical-align: middle;" class="light">Taille</th>
                    <th style="text-align: center; vertical-align: middle;" class="light">Poids</th>
                    <th style="text-align: center; vertical-align: middle;" class="light">Nombre d'assists</th>
                    <th style="text-align: center; vertical-align: middle;" class="light">Nombre de buts</th>
                    <th style="text-align: center; vertical-align: middle;" class="light">Carton jaune</th>
                    <th style="text-align: center; vertical-align: middle;" class="light">Carton rouge</th>
                    <th style="text-align: center; vertical-align: middle;" class="light">Numéro</th>
                    <th style="text-align: center; vertical-align: middle;" class="light">Saison</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="player in playersStats" :key="player.idTmp">
                    <td style="text-align: center; vertical-align: middle;" class="light">{{player.type === 'team' ? 'équipe' : 'joueur'}}</td>
                    <td style="text-align: center; vertical-align: middle;" class="light">{{player.date}}</td>
                    <td style="text-align: center; vertical-align: middle;" class="light">{{player.info.name}}</td>
                    <td style="text-align: center; vertical-align: middle;" class="light">{{player.age}}</td>
                    <td style="text-align: center; vertical-align: middle;" class="light">{{player.info.nationality}}</td>
                    <td style="text-align: center; vertical-align: middle;" class="light">{{player.team}}</td>
                    <td style="text-align: center; vertical-align: middle;" class="light">{{player.height ? player.height : 'N/F'}}</td>
                    <td style="text-align: center; vertical-align: middle;" class="light">{{player.weight ? player.weight : 'N/F'}}</td>
                    <td style="text-align: center; vertical-align: middle;" class="light">{{player.assistCount}}</td>
                    <td style="text-align: center; vertical-align: middle;" class="light">{{player.goalCount}}</td>
                    <td style="text-align: center; vertical-align: middle;" class="light"><font color="yellow">{{player.yellowCardCount}}</font></td>
                    <td style="text-align: center; vertical-align: middle;" class="light"><font color="red">{{player.redCardCount}}</font></td>
                    <td style="text-align: center; vertical-align: middle;" class="light">{{player.number !== 0 ? player.number : 'N/F'}}</td>
                    <td style="text-align: center; vertical-align: middle;" class="light">2019/2020</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </f7-card-content>
    </f7-card>
  </f7-block>
</template>




<script>
import WebService from '../services/web-service'
import StorageService from '../services/storage-service';

export default {
    components: {
    },
    name: "recherche",
    data() {
      return {
        pronostics: [],
        statistiques: [],
        globalStats: []
      };
    },
    methods: {
      refresh() {
        this.pronostics = [],
        this.statistiques = [],
        this.globalStats = []
        this.fetshData();
      },
      fetshData() {
        let vm = this;
        vm.$f7.preloader.show();
        WebService.getPronostics().then(response => {
          vm.pronostics = response.data;
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
      }
    },
    computed: {
      dataIsAvailable() {
        return this.pronostics.length + this.statistiques.length > 0;
      },
      teamsStats() {
        return this.globalStats.filter(div => div.type === 'team');
      },
      playersStats() {
        return this.globalStats.filter(div => div.type === 'player');
      }
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

</style>
