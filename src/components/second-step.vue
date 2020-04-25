<template>
  <div>
    <center><h2 class="light">prediction preference</h2></center>
    <f7-list>
      <f7-list-item title="First team" smart-select :smart-select-params="{openIn: 'popup', searchbar: true, searchbarPlaceholder: 'Search a team'}">
        <select name="First team" @input="updateSmartSelect">
          <optgroup :label="currentLeague">
            <option value="Select a team" selected>Select a team</option>
            <div v-for="team in teams" :key="team.code">
              <option :value="team.name">{{team.name}}</option>
            </div>
          </optgroup>
        </select>
      </f7-list-item>
    </f7-list>
    <center>
      <h1>Vs</h1>
    </center>
    <f7-list>
      <f7-list-item title="Second team" smart-select :smart-select-params="{openIn: 'popup', searchbar: true, searchbarPlaceholder: 'Search a team'}">
        <select name="Second team">
          <optgroup :label="currentLeague">
            <option value="Select a team" selected>Select a team</option>
            <div v-for="team in teams" :key="team.code">
              <option :value="team.name">{{team.name}}</option>
            </div>
          </optgroup>
        </select>
      </f7-list-item>
    </f7-list>
    <hr/>
    <f7-list>
      <f7-list-item title="The home team" smart-select :smart-select-params="{openIn: 'sheet'}">
        <select name="Home team">
          <option value="Home team" selected>Select the home team</option>
          <option value="team1">team1</option>
          <option value="Team2">team2</option>
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
      "currentLeague",
      "teams"
    ],
    name: "second-step",
    data () {
      return {
        match: [
          {
            name: "team1"
          },
          {
            name: "team2"
          }
        ],
        teamsAux: []
      }
    },
    methods: {
      calculateTeamName(name) {
        console.log('name =', name);
        return "" + name+ "";
      },
      updateSmartSelect(event) {
        console.log('event =', event);
      }
    },
    computed: {

    },
    mounted() {
      let vm = this;
      const app = vm.$f7;
      let smartSelect = app.smartSelect.get('.smart-select');
      smartSelect.on('close', function (el) {
        // console.log('vm.f7SmartSelect =', vm.f7SmartSelect);
        // console.log('smartSelect =', smartSelect);
        // console.log('el =', el);
        console.log('value =', el.$valueEl[0].innerText);
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
