<template>
  <div class="data-table">
    <table>
      <thead>
        <tr>
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
        <tr>
          <td style="text-align: center; vertical-align: middle;" class="light">{{player.name}}</td>
          <td style="text-align: center; vertical-align: middle;" class="light">{{playerStats.age}}</td>
          <td style="text-align: center; vertical-align: middle;" class="light">{{player.nationality}}</td>
          <td style="text-align: center; vertical-align: middle;" class="light">{{playerStats.team}}</td>
          <td style="text-align: center; vertical-align: middle;" class="light">{{playerStats.height ? playerStats.height : 'N/F'}}</td>
          <td style="text-align: center; vertical-align: middle;" class="light">{{playerStats.weight ? playerStats.weight : 'N/F'}}</td>
          <td style="text-align: center; vertical-align: middle;" class="light">{{playerStats.assistCount}}</td>
          <td style="text-align: center; vertical-align: middle;" class="light">{{playerStats.goalCount}}</td>
          <td style="text-align: center; vertical-align: middle;" class="light"><font color="yellow">{{playerStats.yellowCardCount}}</font></td>
          <td style="text-align: center; vertical-align: middle;" class="light"><font color="red">{{playerStats.redCardCount}}</font></td>
          <td style="text-align: center; vertical-align: middle;" class="light">{{playerStats.number !== 0 ? playerStats.number : 'N/F'}}</td>
          <td style="text-align: center; vertical-align: middle;" class="light">{{currentLeague.year}}/{{currentLeague.year + 1}}</td>
        </tr>
        <!-- </div> -->
      </tbody>
    </table>
  </div>
</template>

<script>
import WebService from '../services/web-service'
import StorageService from '../services/storage-service';

export default {
    props: [
      "player",
      "playerStats",
      "currentLeague",
      "team"
    ],
    components: {
    },
    name: "playerStatistique",
    methods: {

    },
    computed: {

    },
    mounted() {
      //store the Statisqtiques
      const today = new Date();
      const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate() + '-' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

      WebService.storeStatistique("player", this.currentLeague.id, this.currentLeague.year, this.team.id, this.player.id, date, this.team.name, this.player.name).then(response => {
        console.log('player statistique successfully stored');
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
