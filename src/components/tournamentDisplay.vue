<template>
  <f7-block>
    <br><br>
    <strong class="light">Date d'éxecution: {{tournament.date}}  </strong>
    <br><br>
    <center><h3>Liste des équipes</h3></center>
    <div v-for="team in tournament.teams" :key="team.id">{{team.name}}&nbsp;&nbsp;<img :src="team.image" height="30px" weight="30px"><br><br></div>
    <br><br>
    <strong class="light">Prémiere place: {{teamById(tournament.firstPlace)}}</strong>
    <br><br>

    <strong class="light">Prémiere place taux: {{tournament.firstPlacePrediction}}</strong>
    <br><br>

    <strong class="light">Deuxième place: {{teamById(tournament.secondPlace)}} </strong>
    <br><br>

    <strong class="light">Deuxième place taux: {{tournament.secondPlacePrediction}} </strong>
    <br><br>

    <strong class="light" v-if="tournament.thirdPlace !== '-1'">Troisième place: {{tournament.thirdPlace !== '-1' ? teamById(tournament.thirdPlace) : 'N/F'}} </strong>
    <br><br>

    <strong class="light" v-if="tournament.thirdPlace !== '-1'">Troisième place taux: {{tournament.thirdPlace !== '-1' ? tournament.thirdPlacePrediction : 'N/F'}} </strong>
    <br><br>
  </f7-block>
</template>
<script>
export default {
props: ["tournament"],
methods: {
  teamById(id) {
    if (this.tournament) {
      return this.tournament.teams.find(team => team.id + "" === id).name;
    }
    return '';
  }
},
created() {
  console.log('this.tournament =', this.tournament.teams);
}
}
</script>
