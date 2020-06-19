<template>
  <f7-page name="setting-page" class="accueil-page">
    <navbar-auth :avatar="userAvatar" :checkProfil="checkProfile"/>
    <f7-toolbar tabbar bottom scrollable color-theme="black" bg-color="white">
      <f7-link tab-link="#pronostics" class="light" style="flex-grow: 1;">Pronostics</f7-link>
      <f7-link tab-link="#tournament" class="light" style="flex-grow: 1;">Tournois</f7-link>
      <f7-link tab-link="#statisqtique" class="light" style="flex-grow: 1;">Statisqtique</f7-link>
      <f7-link tab-link="#recherches" class="light" style="flex-grow: 1;">Mes recherches</f7-link>
    </f7-toolbar>
    <f7-tabs animated>
      <f7-tab id="pronostics" class="page-content" tab-active>
        <br>
        <f7-block>
          <pronostics/>
        </f7-block>
      </f7-tab>
      <f7-tab id="tournament" class="page-content">
        <br>
        <f7-block>
          <tournament/>
        </f7-block>
      </f7-tab>
      <f7-tab id="statisqtique" class="page-content">
        <br>
        <f7-block>
          <statisqtique/>
        </f7-block>
      </f7-tab>
      <f7-tab id="recherches" class="page-content">
        <br>
        <f7-block>
          <recherches/>
        </f7-block>
      </f7-tab>
    </f7-tabs>
  </f7-page>
</template>

<script>
import pronostics from '../components/pronostics';
import tournament from '../components/tournament';
import statisqtique from '../components/statisqtique';
import recherches from '../components/recherches';
import navbarAuth from '../components/navBar/navBarAuthentificated';
import StorageService from '../services/storage-service';
import WebService from '../services/web-service'
// import pronostics from '../components/pronostics';

export default {
  components: {
    pronostics,
    tournament,
    statisqtique,
    recherches,
    navbarAuth
  },
  props: {

  },
  data() {
    return {
      retrievedImage: null
    };
  },
  methods: {

  },
  computed: {
    checkProfile() {
      return true;
    },
    userAvatar() {
      console.log('avatar =', StorageService.avatarFromUser(StorageService.getUser()));
      return (this.retrievedImage !== null) ? this.retrievedImage :
        (StorageService.avatarFromUser(StorageService.getUser()) !== '') ? this.retrievedImage : 'static/images/d-avatar.jpg';
    }
  },
  mounted() {
    WebService.getImage(StorageService.getUser().email).then(response => {
        const base64Data = response.data.picByte;
        if (base64Data) {
          this.retrievedImage = 'data:image/jpeg;base64,' + base64Data;
        }
    }).catch((err) => {
      console.warn("can't fetsh photo, error :", err);
    });
  }
}
</script>
