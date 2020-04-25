<template>
    <f7-page name="accueil" class="accueil-page">
        <div v-if="SoccerAnimation" class="fullscreenDiv">
          <h3 class="center-soccer-heist">Soccer heist</h3>
        </div>
        <div v-if="!checkProfile && !SoccerAnimation">
          <center>
            <profile-checker :user="userC" @inscriptionCompleted="finishInscription" @avatar="sendAvatarToNavbar"/>
          </center>
        </div>
    </f7-page>
</template>

<script>
import WebService from '../services/web-service'
import StorageService from '../services/storage-service';
// import navbarAuth from '../components/navBar/navBarAuthentificated';
import profileChecker from '../components/profileChecker';


export default {
    components: {
      profileChecker
      // navbarAuth
    },
    name: "main",
    data () {
      return {
        SoccerAnimation: true,
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
        return StorageService.avatarFromProfile(StorageService.getUser());
      }
    },
    mounted() {
      let vm = this;
      this.profileIsCompleted();
      // console.log('inscriptionFinished =', this.inscriptionFinished);
      setTimeout(function () {
        vm.SoccerAnimation = false;
        if (vm.inscriptionFinished) {
          // console.log('inscriptionFinished =', vm.inscriptionFinished);
          //redirection to macth page
          vm.$f7router.navigate("/main-prediction/");
        }
      }, 4000);
    }
  }
</script>

<style scoped>

</style>
