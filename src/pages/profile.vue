<template>
    <f7-page name="accueil" class="accueil-page">
      <navbar-auth :avatar="user.avatar" :checkProfil="true"/>
      <br><br><br>
      <f7-card>
        <f7-card-content>
          <center>
            <div class="img-cont">
              <div class="container">
                <a>
                  <img
                    :src="userAvatar"
                    class="img-profile"
                    @click="openGalleryOfIndex(-1)"
                  />
                </a>
                <div @click="$refs.fileInput4.click()">
                  <a>
                    <f7-icon f7="photo" color="black"></f7-icon>
                  </a>
                </div>
              </div>
            </div>
          </center>
          <br>
          <center><h3 class="light">{{user.pseudo}}</h3></center>
          <f7-photo-browser
            :photos="gallery"
            routable-modals
            ref="standalone"
            virtualSlides
            photobrowser:swipetoclose
            popup-close-link-text="Fermer"
          ></f7-photo-browser>
          <input style="display: none" type="file" @change="onPhotoUpload" ref="fileInput4" />
        </f7-card-content>
      </f7-card>
      <br><br><br><br>
    </f7-page>
</template>

<script>
import WebService from '../services/web-service'
import StorageService from '../services/storage-service';
import navbarAuth from '../components/navBar/navBarAuthentificated';



export default {
    components: {
      navbarAuth
    },
    name: "main",
    data () {
      return {
        user: StorageService.getUser(),
      }
    },
    methods: {
      openGalleryOfIndex(payload) {
        this.$refs.standalone.open(payload + 1);
      },
      async onPhotoUpload(event) {
        // let vm = this;
        // vm.$f7.preloader.show();
        // this.getBase64(event.target.files[0]).then(data =>
        //   WebService.insertPhotoIntoUser(data.substr(data.indexOf(",") + 1))
        //     .then(response => {
        //       // console.log('data =', data);
        //       vm.$f7.preloader.hide();
        //       this.profilePhoto =
        //         "http://localhost:8000" + response.data.data.profile.avatar.url;
        //       // console.log('profile photoUpdated, response =', response);
        //       StorageService.setUser(response.data.data.profile);
        //       // console.log('user =', StorageService.getUser());
        //     })
        //     .catch(err => {
        //       vm.$f7.preloader.hide();
        //       console.log("err =", err);
        //     })
        // );
      }
    },
    computed: {
      userAvatar() {
        console.log('avatar =', StorageService.avatarFromProfile(StorageService.getUser()));
        return StorageService.avatarFromProfile(StorageService.getUser());
      },
      gallery() {
        let res = [
          {
            url: this.userAvatar
          }
        ];
        return res;
      }
    },
    mounted() {

    }
  }
</script>

<style scoped>

</style>
