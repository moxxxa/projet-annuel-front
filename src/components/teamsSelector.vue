<template>
  <f7-list>
    <f7-list-item title="Select the teams" smart-select :smart-select-params="{openIn: 'popup', searchbar: true, searchbarPlaceholder: 'Search a team'}" ref="teams">
      <select name="Select the teams" multiple :maxlength="numberOfTeams">
        <optgroup v-for="league in leagues" :key="league.id" :label="league.name">
          <option v-for="team in league.teams" :key="team.id" :value="team.name">{{team.name}}</option>
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

    },
    mounted() {
      let vm = this;
      vm.$f7.preloader.show();
      setTimeout(function () {
        for (const league of vm.leagues) {
          WebService.teamsOfLeague(league.id).then(response => {
            league.teams = response.data;
          }).catch((err) => {
            vm.$f7.preloader.hide();
            console.warn('can\'t get teams of the selected league, error= ', err);
          });
        }
        vm.$f7.preloader.hide();
        console.log('leagues =', vm.leagues);
      }, 3000);

      vm.$refs.teams.f7SmartSelect.on('close', function(el) {
        // vm.selectedTeams = el.selectEl.selectedOptions[0].value;
        console.log('selectedTeams = ', vm.$refs.teams.f7SmartSelect.$selectEl.val());
        vm.$emit('updateTeams', vm.$refs.teams.f7SmartSelect.$selectEl.val());
      });
    },
    data () {
      return {

      }
    }
  }
</script>
