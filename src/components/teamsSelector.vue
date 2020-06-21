<template>
  <f7-list>
    <f7-list-item title="Select the teams" smart-select :smart-select-params="{openIn: 'popup', searchbar: true, searchbarPlaceholder: 'Search a team'}" ref="teams">
      <select name="Select the teams" multiple :maxlength="numberOfTeams">
        <optgroup v-for="league in leaguesC" :key="league.id" :label="league.name">
          <option v-for="team in league.teams" :key="team.id + '-' + league.name" :value="team.id + '-' + team.name + '-' + league.name">{{team.name}}</option>
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
    props:["numberOfTeams", "leagues"],
    methods: {
    },
    computed: {
      uniqueNumber() {
        return new Date().getUTCMilliseconds() + "";
      },
      leaguesC() {
        return this.leagues;
      }
    },
    mounted() {
      let vm = this;
      vm.$refs.teams.f7SmartSelect.on('close', function(el) {
        // vm.selectedTeams = el.selectEl.selectedOptions[0].value;
        vm.$emit('updateTeams', vm.$refs.teams.f7SmartSelect.$selectEl.val());
      });
    },
    data () {
      return {

      }
    }
  }
</script>
