<template>
  <f7-block>
    <f7-card>
      <f7-card-content>
        <div v-if="!displayResult">
          <center><h1 class="light">Statisqtiques</h1></center>
          <center><h3 class="light">consulter les statistiques d'une équipe / joueur</h3></center>
          <br>
          <f7-button popover-open=".popover-choise"><font size="2"> Pour commencer, merci de choisir une option : &nbsp;{{choises}}</font></f7-button>
          <br><br>
          <hr/>
          <br>
          <center v-if="choises === 'équipe / joueur'"class="light">Veuillez Selectionner une ligue</center>
          <center v-else class="light">Afin de trouver {{calculateLabelChoice()}}, merci de selectionner la ligue en question</center>
          <br>
          <f7-list>
            <f7-list-item :title="leaguesC" smart-select :smart-select-params="{openIn: 'sheet'}" ref="leagues1" :class="choises === 'équipe / joueur' ? 'disabled' : ''">
              <select :name="leaguesC">
                <option value="Select a league" selected>Selectionner une ligue</option>
                <option :value="leagues[0]">{{leagues[0]}}</option>
                <option :value="leagues[1]">{{leagues[1]}}</option>
                <option :value="leagues[2]">{{leagues[2]}}</option>
              </select>
            </f7-list-item>
          </f7-list>
          <br><br>
          <hr/>
          <br>
          <center v-if="choises === 'équipe / joueur'"class="light">Veuillez Selectionner l'équipe en question</center>
          <center v-else class="light">{{calculateLabelChoiceTeam()}}</center>
          <f7-list>
            <br>
            <f7-list-item title="équipe" smart-select :smart-select-params="{openIn: 'popup', searchbar: true, searchbarPlaceholder: 'chercher une équipe'}" ref="equipe"
            :class="choises === 'équipe / joueur' || currentLeague === 'Select a league' || currentLeague === '' ? 'disabled' : ''">
              <select name="équipe">
                <optgroup :label="currentLeague">
                  <option value="Select a team" selected>Sélectionner une équipe</option>
                  <div v-for="team in currentTeamsLeague" :key="team.code">
                    <option :value="team.name">{{team.name}}</option>
                  </div>
                </optgroup>
              </select>
            </f7-list-item>
          </f7-list>
          <br>

          <!-- joueur -->
          <f7-list v-if="choises === 'Joueur'">
            <f7-list-item title="Joueur" smart-select :smart-select-params="{openIn: 'popup', searchbar: true, searchbarPlaceholder: 'chercher un joueur'}" ref="joueur"
            :class="choises === 'équipe / joueur' || team === '' || currentLeague === 'Select a league' || currentLeague === '' ? 'disabled' : ''">
              <select name="équipe">
                <optgroup :label="currentLeague">
                  <option value="Select a player" selected>Sélectionner un joueur</option>
                  <div v-for="team in currentTeamsLeague" :key="team.code">
                    <option :value="team.name">{{team.name}}</option>
                  </div>
                </optgroup>
              </select>
            </f7-list-item>
          </f7-list>

          <br><br>
          <hr/>
          <center class="light">Réferences</center>
          <br>
          <f7-list>
            <f7-list-item title="baser sur le 1, 2, 3 ... dernière années" smart-select :smart-select-params="{openIn: 'sheet'}" ref="years">
              <select name="Based on the 1, 2, 3 ... last years">
                <option value="Selectionner un benchmark" selected>Selectionner un benchmark</option>
                <option value="1">Années en cours</option>
                <option value="2">2 dernières années</option>
                <option value="3">3 dernières années</option>
                <option value="4">4 dernières années</option>
                <option value="5">5 dernières années</option>
                <option value="6">6 dernières années</option>
                <option value="7">7 dernières années</option>
                <option value="8">8 dernières années</option>
                <option value="9">9 dernières années</option>
              </select>
            </f7-list-item>
          </f7-list>
          <br><br>
          <f7-button fill round raised text-color="black" :class="!currentStateC ? 'disabled' : ''" @click="findStats">
            Chercher
          </f7-button>
        </div>
        <div v-else>
          <br>
          <center><h1 class="light">Résultats</h1></center>
          <br><br><br>
          <!-- <h2 class="light">Prémiere place: {{selectedTeams[1]}}  <font color="red">( 58 % )</font></h2>
          <h2 class="light">Deuxième place: {{selectedTeams[3]}}  <font color="red">( 42 % )</font></h2> -->
          <br><br>
          <f7-button fill round raised text-color="black" fill @click="restart">Nouvelle recherche</f7-button>
          <br><br>
        </div>
      </f7-card-content>
    </f7-card>
    <f7-popover class="popover-choise">
      <f7-list>
        <f7-list-item link="#" popover-close title="Equipe" @click="choise = 'Equipe'"></f7-list-item>
        <f7-list-item link="#" popover-close title="Joueur" @click="choise = 'Joueur'"></f7-list-item>
      </f7-list>
    </f7-popover>
  </f7-block>
</template>

<script>
import WebService from '../services/web-service'
import StorageService from '../services/storage-service';

export default {
    components: {
      
    },
    name: "main",
    methods: {
      restart() {
        this.displayResult = false;
        this.yearsParams = '';
        this.team = '';
        this.player = '';
        this.choise = '';
        this.currentLeague = '';
      },
      findStats() {
        let vm = this;
        vm.$f7.dialog.preloader('Veuillez patientez, la recherche pour les statistiques est en cours ...');
          setTimeout(() => {
            vm.displayResult = true;
            vm.$f7.dialog.close();
          }, 10000);
      },
      calculateLabelChoice() {
        if (this.choise === 'Equipe') {
          return 'cette equipe'
        }
        return 'ce joueur';
      },
      calculateLabelChoiceTeam() {
        if (this.choise === 'Equipe') {
          return 'Veuillez sélectionner l\'équipe en question';
        }
        return 'Veuillez sélectionner l\'équipe dans laquelle figure ce joueur';
      }
    },
    computed: {
      currentStateC() {
        let first_result =  this.team !== '' && this.team !== 'Sélectionner une équipe' && this.yearsParams !== '' && this.yearsParams !== 'Selectionner un benchmark'
               && this.choise !== '';
        if (this.choise == 'Joueur') {
          first_result = first_result && this.player !== '' && this.player !== 'Sélectionner un joueur';
        }
        return first_result;
      },
      leaguesC() {
        return this.leagues[0] + ", " + this.leagues[1] + ", " + this.leagues[2];
      },
      choises() {
        if (this.choise == '')
          return 'équipe / joueur';
        return this.choise;
      },
      currentTeamsLeague() {
        console.log('dans currentTeamsLeague, currentLeague =', this.currentLeague);
        if (this.currentLeague === 'La liga') {
          return this.espagnolTeams;
        } else if (this.currentLeague === 'Premier league') {
          return this.englandTeams;
        } else if (this.currentLeague === 'Bundesliga') {
          return this.deutchTeams;
        }
        console.log('returning nothing');
        return [];
      }
    },
    mounted() {
      let vm = this;
      vm.$refs.leagues1.f7SmartSelect.on('close', function(el) {
        vm.currentLeague = el.selectEl.selectedOptions[0].value;
        console.log('dans le mounted, currentLeague =', vm.currentLeague);
      });

      vm.$refs.equipe.f7SmartSelect.on('close', function(el) {
        vm.team = el.$valueEl[0].innerText;
        console.log('this.team =', vm.team);
      });

      vm.$refs.years.f7SmartSelect.on('close', function(el) {
        vm.yearsParams = el.selectEl.selectedOptions[0].value;
        console.log('yearsParams = ', vm.yearsParams);
      });
    },
    data () {
      return {
        user: StorageService.getUser(),
        yearsParams: '',
        team: '',
        player: '',
        choise: '',
        displayResult: false,
        leagues: [
          "La liga",
          "Premier league",
          "Bundesliga"
        ],
        currentLeague: '',
        deutchTeams: [
          {
            "key": "bayern",
            "name": "Bayern München",
            "code": "FCB"
          },
          {
            "key": "dortmund",
            "name": "Borussia Dortmund",
            "code": "BVB"
          },
          {
            "key": "leverkusen",
            "name": "Bayer 04 Leverkusen",
            "code": "B04"
          },
          {
            "key": "schalke",
            "name": "FC Schalke 04",
            "code": "S04"
          },
          {
            "key": "frankfurt",
            "name": "Eintracht Frankfurt",
            "code": "FFM"
          },
          {
            "key": "mgladbach",
            "name": "Bor. Mönchengladbach",
            "code": "BMG"
          },
          {
            "key": "wolfsburg",
            "name": "VfL Wolfsburg",
            "code": "WOB"
          },
          {
            "key": "mainz",
            "name": "1. FSV Mainz 05",
            "code": "M05"
          },
          {
            "key": "bremen",
            "name": "Werder Bremen",
            "code": "BRE"
          },
          {
            "key": "hoffenheim",
            "name": "TSG 1899 Hoffenheim",
            "code": "HOF"
          },
          {
            "key": "augsburg",
            "name": "FC Augsburg",
            "code": "FCA"
          },
          {
            "key": "herthabsc",
            "name": "Hertha BSC",
            "code": "BSC"
          },
          {
            "key": "koeln",
            "name": "1. FC Köln",
            "code": "KOE"
          },
          {
            "key": "paderborn",
            "name": "SC Paderborn 07",
            "code": "SCP"
          },
          {
            "key": "freiburg",
            "name": "SC Freiburg",
            "code": "SCF"
          },
          {
            "key": "duesseldorf",
            "name": "Fortuna Düsseldorf",
            "code": "F95"
          },
          {
            "key": "unionberlin",
            "name": "1. FC Union Berlin",
            "code": "FCU"
          },
          {
            "key": "leipzig",
            "name": "RB Leipzig",
            "code": "RBL"
          }
        ],
        englandTeams: [
          {
            "key": "chelsea",
            "name": "Chelsea FC",
            "code": "CHE"
          },
          {
            "key": "arsenal",
            "name": "Arsenal FC",
            "code": "ARS"
          },
          {
            "key": "tottenham",
            "name": "Tottenham Hotspur FC",
            "code": "TOT"
          },
          {
            "key": "westham",
            "name": "West Ham United FC",
            "code": "WHU"
          },
          {
            "key": "crystalpalace",
            "name": "Crystal Palace FC",
            "code": "CRY"
          },
          {
            "key": "manutd",
            "name": "Manchester United FC",
            "code": "MUN"
          },
          {
            "key": "mancity",
            "name": "Manchester City FC",
            "code": "MCI"
          },
          {
            "key": "everton",
            "name": "Everton FC",
            "code": "EVE"
          },
          {
            "key": "liverpool",
            "name": "Liverpool FC",
            "code": "LIV"
          },
          {
            "key": "newcastle",
            "name": "Newcastle United FC",
            "code": "NEW"
          },
          {
            "key": "astonvilla",
            "name": "Aston Villa FC",
            "code": "AVL"
          },
          {
            "key": "southampton",
            "name": "Southampton FC",
            "code": "SOU"
          },
          {
            "key": "leicester",
            "name": "Leicester City FC",
            "code": "LEI"
          },
          {
            "key": "bournemouth",
            "name": "AFC Bournemouth",
            "code": "BOU"
          },
          {
            "key": "norwich",
            "name": "Norwich City FC",
            "code": "NOR"
          },
          {
            "key": "watford",
            "name": "Watford FC",
            "code": "WAT"
          },
          {
            "key": "burnley",
            "name": "Burnley FC",
            "code": "BUR"
          },
          {
            "key": "brightonhovealbionfc",
            "name": "Brighton & Hove Albion FC",
            "code": "BHA"
          },
          {
            "key": "sheffieldunitedfc",
            "name": "Sheffield United FC",
            "code": "SFU"
          },
          {
            "key": "wolverhamptonwanderersfc",
            "name": "Wolverhampton Wanderers FC",
            "code": "WHW"
          }
        ],
        espagnolTeams: [
          {
            "key": "barcelona",
            "name": "FC Barcelona",
            "code": "BAR"
          },
          {
            "key": "espanyol",
            "name": "RCD Espanyol",
            "code": "ESP"
          },
          {
            "key": "madrid",
            "name": "Real Madrid",
            "code": "RMD"
          },
          {
            "key": "atletico",
            "name": "Atlético Madrid",
            "code": "ATL"
          },
          {
            "key": "getafe",
            "name": "Getafe CF",
            "code": "GET"
          },
          {
            "key": "sevilla",
            "name": "Sevilla FC",
            "code": "SEV"
          },
          {
            "key": "valencia",
            "name": "Valencia CF",
            "code": "VAL"
          },
          {
            "key": "levante",
            "name": "Levante UD",
            "code": "LEV"
          },
          {
            "key": "athletic",
            "name": "Athletic Club Bilbao",
            "code": "ATH"
          },
          {
            "key": "granada",
            "name": "Granada CF",
            "code": "GRA"
          },
          {
            "key": "celta",
            "name": "RC Celta Vigo",
            "code": "CEL"
          },
          {
            "key": "realsociedad",
            "name": "Real Sociedad",
            "code": "RSO"
          },
          {
            "key": "valladolid",
            "name": "Real Valladolid CF",
            "code": "VID"
          },
          {
            "key": "eibar",
            "name": "SD Eibar",
            "code": null
          },
          {
            "key": "betis",
            "name": "Real Betis",
            "code": "BET"
          },
          {
            "key": "osasuna",
            "name": "CA Osasuna",
            "code": "OSA"
          },
          {
            "key": "villareal",
            "name": "Villarreal CF",
            "code": "VLL"
          },
          {
            "key": "alaves",
            "name": "Deportivo Alavés",
            "code": null
          },
          {
            "key": "mallorca",
            "name": "RCD Mallorca",
            "code": "MLL"
          },
          {
            "key": "leganes",
            "name": "CD Leganés",
            "code": null
          }
        ]
      }
    }
  }
</script>

<style scoped>

</style>
