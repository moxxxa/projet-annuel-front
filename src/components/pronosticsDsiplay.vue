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

    <strong class="light">Équipe à domicile gagne: {{pronostic.homeResult}}</strong>
    <br><br>

    <strong class="light">Équipe à l'extérieur gagne: {{pronostic.awayResult}}</strong>
    <br><br>

    <strong class="light">Matche null: {{pronostic.drawResult}}</strong>
    <br><br>
    <strong class="light">Score finale AI : {{finalScoreAI}}</strong>
    <br><br>
    <strong class="light">Score final interprétation : {{finalScore}}</strong>

  </f7-block>
</template>
<script>
export default {
props: ["pronostic"],
computed: {
  finalScore() {
    let awayScore = this.pronostic.awayGoal + "";
    let homeScore = this.pronostic.homeGoal + "";
    let awayScoreComma = awayScore.split('.')[1].charAt(0);
    awayScore = awayScore.split('.')[0];
    if (awayScoreComma > 4) {
      awayScore += 1;
    }
    let homeScoreComma = homeScore.split('.')[1].charAt(0);
    homeScore = homeScore.split('.')[0];
    if (homeScoreComma >= 4) {
      homeScore += 1;
    }
    return Number(homeScore) + "-" + Number(awayScore);
  },
  finalScoreAI() {
    let awayScore = this.pronostic.awayGoal + "";
    let homeScore = this.pronostic.homeGoal + "";
    let awayScoreComma = awayScore.split('.')[1];
    awayScore = awayScore.split('.')[0];

    let homeScoreComma = homeScore.split('.')[1];
    homeScore = homeScore.split('.')[0];

    return homeScore + '.' + homeScoreComma.charAt(0) + homeScoreComma.charAt(1) + '-' + awayScore + '.' + awayScoreComma.charAt(0) + awayScoreComma.charAt(1);
  }
},
created() {
  console.log('pronostic =', this.pronostic);
}
}
</script>
<style scoped>
.second-team{
  float: right;
}
</style>
