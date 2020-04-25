<template>
    <f7-page name="accueil" class="accueil-page">


    </f7-page>
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
    name: "main-prediction",
    data () {
      return {

      }
    },
    methods: {

    },
    computed: {

    },
    mounted() {
      
    }
  }
</script>

<style scoped>

</style>
