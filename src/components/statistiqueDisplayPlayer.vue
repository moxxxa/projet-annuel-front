<template>
  <f7-block class="team-info">
    <br><br>
    <strong class="light">Date d'éxecution: {{player.date}}  </strong>
    <br><br>

    <strong class="light">Nom du joueur: {{player.info.name}}</strong>
    <br><br>

    <strong class="light">Age: {{player.age}}</strong>
    <br><br>

    <strong class="light">Pays d'origin: {{player.info.nationality}} </strong>
    <br><br>

    <strong class="light">Équipe: {{player.team}} </strong>
    <br><br>

    <strong class="light">Taille: {{player.height ? player.height : 'N/F'}} </strong>
    <br><br>

    <strong class="light">Poids: {{player.weight ? player.weight : 'N/F'}}</strong>
    <br><br>

    <strong class="light">Nombre d'assists: {{player.assistCount}}</strong>
    <br><br>

    <strong class="light">Nombre de buts: {{player.goalCount}} </strong>
    <br><br>

    <strong class="light">Carton jaune: <font color="yellow">{{player.yellowCardCount}}</font></strong>
    <br><br>

    <strong class="light">Carton rouge: <font color="red">{{player.redCardCount}}</font></strong>
    <br><br>

    <strong class="light">Numéro: {{player.number !== 0 ? player.number : 'N/F'}} </strong>
    <br><br>

    <strong class="light">Saison: 2019/2020</strong>
    <br><br>
  </f7-block>
</template>
<script>
export default {
props: ["player"]

}
</script>
