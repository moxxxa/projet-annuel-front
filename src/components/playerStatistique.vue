<template>
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

      WebService.storeStatistique("player", this.currentLeague.id, this.currentLeague.year, this.team.id, this.player.id, date, this.team.name, this.player.name, "", StorageService.getUser().token).then(response => {
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
