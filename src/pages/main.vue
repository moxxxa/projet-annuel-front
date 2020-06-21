<template>
    <f7-page name="accueil" class="accueil-page">
      <navbar-auth :avatar="userAvatar" :checkProfil="checkProfile"/>
        <div v-if="clicAnimation" class="fullscreenDiv">
          <h4 class="center-soccer-heist">ClicFoot</h4>
        </div>
        <div v-if="!checkProfile && !clicAnimation">
          <center>
            <profile-checker :user="userC" @inscriptionCompleted="finishInscription" @avatar="sendAvatarToNavbar"/>
          </center>
        </div>
    </f7-page>
</template>

<script>
import WebService from '../services/web-service'
import StorageService from '../services/storage-service';
import navbarAuth from '../components/navBar/navBarAuthentificated';
import profileChecker from '../components/profileChecker';


export default {
    components: {
      profileChecker,
      navbarAuth
    },
    name: "MainPage",
    data () {
      return {
        retrievedImage: null,
        clicAnimation: true,
        user: StorageService.getUser(),
        logOutText: 'Log out',
        inscriptionFinished: true,
        tmpAvatar: ''
      }
    },
    methods: {
      finishInscription() {
        this.inscriptionFinished = true;
        let vm = this;
        vm.$f7.dialog.preloader('Welcome to Soccer heist');
        setTimeout(() => {
          vm.$f7.dialog.close();
          vm.$f7router.navigate("/main-prediction/");
        }, 3000);
      },
      async profileIsCompleted() {
      },
      sendAvatarToNavbar(avatar) {
        if (avatar) {
          // console.log('dans sendAvatarToNavBar');
          this.tmpAvatar = avatar;
        }
      }
    },
    computed: {
      userC() {
        return this.user;
      },
      checkProfile() {
        return this.inscriptionFinished;
      },
      userAvatar() {
        return (this.retrievedImage !== null) ? this.retrievedImage :
          (StorageService.avatarFromUser(StorageService.getUser()) !== '') ? this.retrievedImage : 'static/images/d-avatar.jpg';
      },
    },
    mounted() {
      let vm = this;
      this.profileIsCompleted();
      setTimeout(function () {
        vm.clicAnimation = false;
        if (vm.inscriptionFinished) {
          console.log('inscriptionFinished =', vm.inscriptionFinished);
          // redirection to macth page
          vm.$f7router.navigate("/welcome/");
        }
      }, 4000);
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

<style scoped>

</style>
