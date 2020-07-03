<template>
  <f7-block>
    <br><br>
    <strong class="light">Date d'éxecution: {{tournament.date}}  </strong>
    <br><br>
    <center><h3>Liste des équipes</h3></center>
    <div v-for="team in tournament.teams" :key="team.id">{{team.name}}&nbsp;&nbsp;<img :src="team.image" height="30px" weight="30px"><br><br></div>
    <br><br>
    <strong class="light">Prémiere place: {{tournament.firstPlace}}</strong>
    <br><br>

    <strong class="light">Prémiere place taux: {{tournament.firstPlacePrediction}}</strong>
    <br><br>

    <strong class="light">Deuxième place: {{tournament.secondPlace}} </strong>
    <br><br>

    <strong class="light">Deuxième place taux: {{tournament.secondPlacePrediction}} </strong>
    <br><br>

    <strong class="light">Troisième place: {{tournament.thirdPlace ? tournament.thirdPlace : 'N/F'}} </strong>
    <br><br>

    <strong class="light">Troisième place taux: {{tournament.thirdPlace ? tournament.thirdPlacePrediction : 'N/F'}} </strong>
    <br><br>
  </f7-block>
</template>
<script>
export default {
props: ["tournament"]

}
</script>
