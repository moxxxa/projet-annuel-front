<template>
  <div>
    <center><h2 class="light">Préférence</h2></center>
    <f7-list>
      <f7-list-item title="équipeN°1" smart-select :smart-select-params="{openIn: 'popup', searchbar: true, searchbarPlaceholder: 'Chercher une équipe'}" ref="item1">
        <select name="équipe N°1" @input="updateSmartSelect">
          <optgroup :label="currentLeague1.name">
            <option value="Select a team" selected>Sélectionnez une équipe</option>
            <div v-for="team in teams1" :key="team.id">
              <option :value="team.name">{{team.name}}</option>
            </div>
          </optgroup>
        </select>
      </f7-list-item>
    </f7-list>
    <center>
      <h1 class="light"><font color="#9921e8">Vs</font></h1>
    </center>
    <f7-list>
      <f7-list-item title="équipeN°2" smart-select :smart-select-params="{openIn: 'popup', searchbar: true, searchbarPlaceholder: 'Search a team'}" ref="item2" :class="team0 === '' ? 'disabled': ''">
        <select name="équipe N°2">
          <optgroup :label="currentLeague2.name">
            <option value="Select a team" selected>Sélectionnez une équipe</option>
            <div v-for="team in teamsAux" :key="team.id">
              <option :value="team.name">{{team.name}}</option>
            </div>
          </optgroup>
        </select>
      </f7-list-item>
    </f7-list>
    <hr/>
    <f7-list>
      <f7-list-item title="domicile" smart-select :smart-select-params="{openIn: 'sheet'}" :class="team0 === '' || team1 === '' || team0 === 'Select a team' || team1 === 'Select a team' ? 'disabled': ''" ref="hometeam">
        <select name="domicile">
          <option value="Home team" selected>Sélectionnez une équipe</option>
          <option :value="team0">{{team0}}</option>
          <option :value="team1">{{team1}}</option>
        </select>
      </f7-list-item>
    </f7-list>
  </div>
</template>

<script>
import WebService from '../services/web-service'
import StorageService from '../services/storage-service';
import navbarAuth from '../components/navBar/navBarAuthentificated';

export default {
    components: {
      // profileChecker,
      navbarAuth
    },
    props: [
      "currentLeague1",
      "currentLeague2",
      "teams1",
      "teams2",
      "validateSecondStep"
    ],
    name: "second-step",
    data () {
      return {
        team0: '',
        team1: '',
        homeTeam: '',
        teamsAux: []
      }
    },
    methods: {
      updateSmartSelect(event) {
      }
    },
    computed: {

    },
    mounted() {
      let vm = this;
      vm.$refs.item1.f7SmartSelect.on('close', function(el) {
        vm.team0 = el.$valueEl[0].innerText;
        vm.teamsAux = [];
        if (vm.currentLeague1 === vm.currentLeague2) {
          vm.teams1.forEach((team) => {
            if (team.name !== vm.team0) {
              vm.teamsAux.push(team);
            };
          });
        }
        else {
          vm.teamsAux = vm.teams2;
        }
      });
      vm.$refs.item2.f7SmartSelect.on('close', function(el) {
        vm.team1 = el.$valueEl[0].innerText;
      });

      vm.$refs.hometeam.f7SmartSelect.on('close', function(el) {
        vm.homeTeam = el.$valueEl[0].innerText;
        const team1Tmp = {
          teamImage: vm.teams1.find(div => div.name === vm.team0).image,
          teamName: vm.team0,
          teamId: vm.teams1.find(div => div.name === vm.team0).id,
          leagueName: vm.currentLeague1.name,
          leagueId: vm.currentLeague1.id,
          year: vm.currentLeague1.year,
          country: vm.currentLeague1.country
        };
        const team2Tmp = {
          teamImage: vm.teams2.find(div => div.name === vm.team1).image,
          teamName: vm.team1,
          teamId: vm.teams2.find(div => div.name === vm.team1).id,
          leagueName: vm.currentLeague2.name,
          leagueId: vm.currentLeague2.id,
          year: vm.currentLeague2.year,
          country: vm.currentLeague2.country
        };
        let prediction = {
          'awayTeam': (vm.homeTeam === vm.team0) ? team2Tmp : team1Tmp,
          'homeTeam': (vm.homeTeam === vm.team0) ? team1Tmp : team2Tmp
        };
        vm.$emit('prediction', prediction);
      });
    }
  }
</script>

<style scoped>
hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid #ccc;
  margin: 1em 0;
  padding: 0;
}
</style>
