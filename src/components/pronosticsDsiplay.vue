<template>
  <f7-block>
      <img :src="pronostic.imageHome" height="40px" weight="40px">
    <center>
      <h1>Vs</h1>
    </center>
    <div class="second-team">
      <img :src="pronostic.imageAway" height="40px" weight="40px">
    </div>
    <br><br><br>
    <strong class="light">Date d'éxecution: {{pronostic.date}}  </strong>
    <br><br>

    <strong class="light">Équipe à domicile: {{pronostic.homeTeamName}}</strong>
    <br><br>

    <strong class="light">Équipe à l'extérieur: {{pronostic.awayTeamName}}</strong>
    <br><br>

    <strong class="light">Équipe à domicile gagne: {{pronostic.homeResult}} </strong>
    <br><br>

    <strong class="light">Équipe à l'extérieur gagne: {{pronostic.awayResult}} </strong>
    <br><br>

    <strong class="light">Matche null: {{pronostic.drawResult}} </strong>
    <br><br>

  </f7-block>
</template>
<script>
export default {
props: ["pronostic"]

}
</script>
<style scoped>
.second-team{
  float: right;
}
</style>
