<template>
  <div>
    <center>
      <img :src="team.image" height="80px" width="80px">
    </center>
    <br><br>
    <strong class="light">Nom de l'équipe: </strong> {{teamStats.name}}
    <br><br>
    <strong class="light">Nombre total de buts de cette saison: </strong> {{teamStats.goalCount}}
    <br><br>
    <strong class="light">Nombre de joueurs: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</strong> {{teamStats.players && teamStats.players.length ? teamStats.players.length : 'N/F'}}
    <br><br>
    <strong class="light">Matchs nulls à domicile: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;</strong> {{teamStats.homeDraws}}
    <br><br>
    <strong class="light">Matchs perdus à domicile: </strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{teamStats.homeLoses}}
    <br><br>
    <strong class="light">Matchs gagnés à domicile: </strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{teamStats.homeWin}}
    <br><br>
    <strong class="light">Matchs nulls à l'extérieur: </strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    {{teamStats.outDraws}}
    <br><br>
    <strong class="light">Matchs perdus à l'extérieur: </strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    {{teamStats.outLoses}}
    <br><br>
    <strong class="light">Matchs gagnés à l'extérieur: </strong> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    {{teamStats.outWin}}
    <br><br>
    <center><strong>Joueurs</strong></center>
    <br>
    <center>
      <div v-for="player in teamStats.players" :key="player.id">
        <div class="light">{{player.name}}</div>
      </div>
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
