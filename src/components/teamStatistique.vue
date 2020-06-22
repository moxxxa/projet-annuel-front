<template>
  <div class="data-table">
    <center>
      <img :src="team.image" height="80px" width="80px">
    </center>
    <br>
    <table>
      <thead>
        <tr>
          <th style="text-align: center; vertical-align: middle;" class="light">Nom</th>
          <th style="text-align: center; vertical-align: middle;" class="light">Nombre total de buts</th>
          <th style="text-align: center; vertical-align: middle;" class="light">Nombre de joueurs</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="text-align: center; vertical-align: middle;" class="light"><strong>{{teamStats.name}}</strong></td>
          <td style="text-align: center; vertical-align: middle;" class="light">{{teamStats.goalCount}}</td>
          <td style="text-align: center; vertical-align: middle;" class="light">{{teamStats.players ? teamStats.players.length : 'N/F'}}</td>
        </tr>
      </tbody>
    </table>
    <br><br>
    <table>
      <thead>
        <tr>
          <th style="text-align: center; vertical-align: middle;" class="light">Matchs nulls à domicile</th>
          <th style="text-align: center; vertical-align: middle;" class="light">Matchs perdus à domicile</th>
          <th style="text-align: center; vertical-align: middle;" class="light">matchs gagnés à domicile</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="text-align: center; vertical-align: middle;" class="light">{{teamStats.homeDraws}}</td>
          <td style="text-align: center; vertical-align: middle;" class="light">{{teamStats.homeLoses}}</td>
          <td style="text-align: center; vertical-align: middle;" class="light">{{teamStats.homeWin}}</td>
        </tr>
      </tbody>
    </table>
    <br><br>
    <table>
      <thead>
        <tr>
          <th style="text-align: center; vertical-align: middle;" class="light">Matchs nulls à l'extérieur</th>
          <th style="text-align: center; vertical-align: middle;" class="light">Matchs perdus à l'extérieur</th>
          <th style="text-align: center; vertical-align: middle;" class="light">matchs gagnés à l'extérieur</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="text-align: center; vertical-align: middle;" class="light">{{teamStats.outDraws}}</td>
          <td style="text-align: center; vertical-align: middle;" class="light">{{teamStats.outLoses}}</td>
          <td style="text-align: center; vertical-align: middle;" class="light">{{teamStats.outWin}}</td>
        </tr>
      </tbody>
    </table>
    <br><br>
    <center>
      <table>
        <thead>
          <tr>
            <th style="text-align: center; vertical-align: middle;" class="light">Joueurs</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="player in teamStats.players" :key="player.id">
            <td style="text-align: center; vertical-align: middle;" class="light">{{player.name}}</td>
          </tr>
        </tbody>
      </table>
    </center>
  </div>
</template>

<script>
import WebService from '../services/web-service'
import StorageService from '../services/storage-service';

export default {
    props: [
      "teamStats",
      "team",
      "currentLeague"
    ],
    components: {
    },
    name: "teamStatistique",
    methods: {

    },
    computed: {

    },
    mounted() {
      //store the Statisqtiques
      const today = new Date();
      const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() + '-' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      WebService.storeStatistique("team", this.currentLeague.id, this.currentLeague.year, this.team.id, -1, date, this.team.name, "", this.team.image, StorageService.getUser().token).then(response => {
      }).catch((err) => {
        console.warn("err =", err);
      });
    },
    data() {
      return {

      }
    }
  }
</script>

<style scoped>

</style>
