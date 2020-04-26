<template>
  <f7-list>
    <f7-list-item title="Select the teams" smart-select :smart-select-params="{openIn: 'popup', searchbar: true, searchbarPlaceholder: 'Search a team'}" ref="teams">
      <select name="Select the teams" multiple :maxlength="numberOfTeams">
        <optgroup label="Premier league">
          <option v-for="team in englandTeams" :key="team.code" :value="team.name">{{team.name}}</option>
        </optgroup>
        <optgroup label="La liga">
          <option v-for="team in espagnolTeams" :key="team.code" :value="team.name">{{team.name}}</option>
        </optgroup>
        <optgroup label="Bundesliga">
          <option v-for="team in deutchTeams" :key="team.code" :value="team.name">{{team.name}}</option>
        </optgroup>
      </select>
    </f7-list-item>
  </f7-list>
</template>

<script>
import WebService from '../services/web-service'
import StorageService from '../services/storage-service';
import navbarAuth from '../components/navBar/navBarAuthentificated';
import profileChecker from '../components/profileChecker';


export default {
    name: "teamsSelector",
    props:["numberOfTeams"],
    methods: {
    },
    computed: {

    },
    mounted() {
      let vm = this;

      vm.$refs.teams.f7SmartSelect.on('close', function(el) {
        // vm.selectedTeams = el.selectEl.selectedOptions[0].value;
        console.log('selectedTeams = ', vm.$refs.teams.f7SmartSelect.$selectEl.val());
        vm.$emit('updateTeams', vm.$refs.teams.f7SmartSelect.$selectEl.val());
      });
    },
    data () {
      return {
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
