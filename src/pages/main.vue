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
    name: "main",
    data () {
      return {
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
          console.log('redirected succesfully')
        }, 3000);
      },
      async profileIsCompleted() {
        // let status = false;
        // await WebService.checkIfProfileIsCompleted().then(response => {
        //   this.inscriptionFinished = response.data.data.is_completed;
        //   // console.log('response completed =', response);
        // }).catch((err) => {
        //   console.log('error =', err);
        // });
        // console.log('status =', status);
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
        if (this.tmpAvatar && this.tmpAvatar !== '') {
          // console.log('dans le userAvatar computed');
          return this.tmpAvatar;
        }
        return StorageService.avatarFromUser(StorageService.getUser());
      }
    },
    mounted() {
      let vm = this;
      this.profileIsCompleted();
      console.log('inscriptionFinished =', this.inscriptionFinished);
      setTimeout(function () {
        vm.clicAnimation = false;
        if (vm.inscriptionFinished) {
          // console.log('inscriptionFinished =', vm.inscriptionFinished);
          //redirection to macth page
          vm.$f7router.navigate("/welcome/");
        }
      }, 4000);
      //4000
    }
  }
</script>

<style scoped>

</style>
