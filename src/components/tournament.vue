<template>
  <f7-block>
    <f7-card>
      <f7-card-content>
        <div v-if="!displayResult">
          <center><h1 class="light">Simuler un tournoi</h1></center>
          <center><h3 class="light">Prédire le résultat d'un tournoi</h3></center>
          <br>
          <!-- number of teams -->
          <f7-button popover-open=".popover-number-teams"><font size="2"> Pour commencer, merci de choisir le nombre des équipes : &nbsp;{{numberOfTeams}}</font></f7-button>
          <br><br>
          <!-- years caluclation -->
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

          <!-- teams selection -->
          <br><br>
          <div v-if="numberOfTeamC !== 0">
            <teams-selector @updateTeams="updateTeams" :numberOfTeams="numberOfTeamC"/>
          </div>
          <div v-else>
            <p><font size="3" class="disabled">&nbsp;&nbsp;&nbsp;Selectionner une équipe</font></p>
          </div>
          <br><br>
          <f7-button fill round raised text-color="black" :class="!currentStateC ? 'disabled' : ''" @click="predict">
            Prédire
          </f7-button>
        </div>
        <div v-else>
          <br>
          <center><h1 class="light">Résultats</h1></center>
          <br><br><br>
          <h2 class="light">Prémiere place: {{selectedTeams[1]}}  <font color="red">( 58 % )</font></h2>
          <h2 class="light">Deuxième place: {{selectedTeams[3]}}  <font color="red">( 42 % )</font></h2>
          <br><br>
          <f7-button fill round raised text-color="black" fill @click="restart">Nouveau simulation</f7-button>
          <br><br>
        </div>
      </f7-card-content>
    </f7-card>
    <f7-popover class="popover-number-teams">
      <f7-list>
        <f7-list-item link="#" popover-close title="2" @click="numberOfTeams = 2"></f7-list-item>
        <f7-list-item link="#" popover-close title="4" @click="numberOfTeams = 4"></f7-list-item>
        <f7-list-item link="#" popover-close title="6" @click="numberOfTeams = 6"></f7-list-item>
        <f7-list-item link="#" popover-close title="8" @click="numberOfTeams = 8"></f7-list-item>
        <f7-list-item link="#" popover-close title="10" @click="numberOfTeams = 10"></f7-list-item>
        <f7-list-item link="#" popover-close title="12" @click="numberOfTeams = 12"></f7-list-item>
        <f7-list-item link="#" popover-close title="14" @click="numberOfTeams = 14"></f7-list-item>
        <f7-list-item link="#" popover-close title="16" @click="numberOfTeams = 16"></f7-list-item>
        <f7-list-item link="#" popover-close title="18" @click="numberOfTeams = 18"></f7-list-item>
      </f7-list>
    </f7-popover>
  </f7-block>
</template>

<script>
import WebService from '../services/web-service'
import StorageService from '../services/storage-service';
import navbarAuth from '../components/navBar/navBarAuthentificated';
import teamsSelector from '../components/teamsSelector';

export default {
    components: {
      navbarAuth,
      teamsSelector
    },
    name: "main",
    methods: {
      restart() {
        this.selectedTeams = [];
        this.numberOfTeams = 0;
        this.yearsParams = '';
        this.displayResult = false;
      },
      updateTeams(payload) {
        this.selectedTeams = payload;
      },
      predict() {
      let vm = this;
      vm.$f7.dialog.preloader('Processing for the prediction ...., please wait');
        setTimeout(() => {
          vm.displayResult = true;
          vm.$f7.dialog.close();
        }, 10000);
      }
    },
    computed: {
      numberOfTeamC() {
        console.log('getting number of teams');
        return this.numberOfTeams;
      },
      currentStateC() {
        if (this.numberOfTeams === 0 || this.selectedTeams.length === 0 || this.selectedTeams.length !== this.numberOfTeams || this.yearsParams === '' || this.yearsParams === 'Select a benchmark') {
          return false;
        }
        return true;
      }
    },
    mounted() {
      let vm = this;
      vm.$refs.years.f7SmartSelect.on('close', function(el) {
        vm.yearsParams = el.selectEl.selectedOptions[0].value;
        console.log('yearsParams = ', vm.yearsParams);
      });

      // vm.$refs.teams.f7SmartSelect.on('close', function(el) {
      //   // vm.selectedTeams = el.selectEl.selectedOptions[0].value;
      //   console.log('selectedTeams = ', vm.$refs.teams.f7SmartSelect.$selectEl.val());
      // });
    },
    data () {
      return {
        displayResult: false,
        user: StorageService.getUser(),
        selectedTeams: [],
        numberOfTeams: 0,
        yearsParams: '',
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
