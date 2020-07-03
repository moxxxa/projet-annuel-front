<template>
  <f7-block class="player-info">
    <center>
      <img :src="team.image" height="40px" weight="40px">
    </center>
    <center><h3>{{team.name}}</h3></center>
    <br><br>
    <strong class="light">Date d'éxecution: {{team.date}}  </strong>
    <br><br>

    <strong class="light">Nombre total de buts: {{team.goalCount}}</strong>
    <br><br>

    <strong class="light">Nombre de joueurs: {{team.players ? team.players.length : 'N/F'}} </strong>
    <br><br>

    <strong class="light">Matchs nulls à domicile: {{team.homeDraws}} </strong>
    <br><br>

    <strong class="light">Matchs perdus à domicile: {{team.homeLoses}} </strong>
    <br><br>

    <strong class="light">Matchs gagnés à domicile: {{team.homeWin}}</strong>
    <br><br>

    <strong class="light">Matchs nulls à l'extérieur: {{team.outDraws}}</strong>
    <br><br>

    <strong class="light">Matchs perdus à l'extérieur: {{team.outLoses}} </strong>
    <br><br>

    <strong class="light">Matchs gagnés à l'extérieur: {{team.outWin}} </strong>
    <br><br>

    <strong class="light">Saison: 2019/2020</strong>
    <br><br><br>
    <center><h1>Liste de joueurs</h1></center>
    <div v-for="joueur in team.players" :key="joueur.id">
      {{joueur.name}}&nbsp;-&nbsp;{{joueur.nationality}}
    </div>
  </f7-block>
</template>
<script>
export default {
props: ["team"]

}
</script>
