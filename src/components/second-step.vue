<template>
  <div>
    <center><h2 class="light">prediction preference</h2></center>
    <f7-list>
      <f7-list-item title="First team" smart-select :smart-select-params="{openIn: 'popup', searchbar: true, searchbarPlaceholder: 'Search a team'}" ref="item1">
        <select name="First team" @input="updateSmartSelect">
          <optgroup :label="currentLeague1">
            <option value="Select a team" selected>Select a team</option>
            <div v-for="team in teams1" :key="team.code">
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
      <f7-list-item title="Second team" smart-select :smart-select-params="{openIn: 'popup', searchbar: true, searchbarPlaceholder: 'Search a team'}" ref="item2" :class="team0 === '' ? 'disabled': ''">
        <select name="Second team">
          <optgroup :label="currentLeague2">
            <option value="Select a team" selected>Select a team</option>
            <div v-for="team in teamsAux" :key="team.code">
              <option :value="team.name">{{team.name}}</option>
            </div>
          </optgroup>
        </select>
      </f7-list-item>
    </f7-list>
    <hr/>
    <f7-list>
      <f7-list-item title="The home team" smart-select :smart-select-params="{openIn: 'sheet'}" :class="team0 === '' || team1 === '' ? 'disabled': ''" ref="hometeam">
        <select name="Home team">
          <option value="Home team" selected>Select the home team</option>
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
        console.log('event =', event);
      }
    },
    computed: {

    },
    mounted() {
      console.log('currentLeague1 =', this.currentLeague1);
      console.log('currentLeague2 =', this.currentLeague2);
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
          console.log('teamsAux =', vm.teamsAux);
        }
      });
      vm.$refs.item2.f7SmartSelect.on('close', function(el) {
        vm.team1 = el.$valueEl[0].innerText;
      });

      vm.$refs.hometeam.f7SmartSelect.on('close', function(el) {
        vm.homeTeam = el.$valueEl[0].innerText;
        console.log('vm.homeTeam =', vm.homeTeam);
        let prediction = {
          'team0': vm.team0,
          'team1': vm.team1,
          'homeTeam': vm.homeTeam
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
