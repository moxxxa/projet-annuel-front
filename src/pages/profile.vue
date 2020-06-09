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
          <center>
            <h3 class="light">{{userLastName}}</h3>
            <f7-button outline size="50" href="/settings/">{{proileModify}}</f7-button>
          </center>
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
        numMaillot: 7,
        proileModify: "Modifier mon profil",
        selectedFile: null
      }
    },
    methods: {
      openGalleryOfIndex(payload) {
        this.$refs.standalone.open(payload + 1);
      },
      async onPhotoUpload(event) {
        this.selectedFile = event.target.files[0];
        const uploadImageData = new FormData();
        uploadImageData.append('imageFile', this.selectedFile, this.selectedFile.name);
        WebService.uploadPhoto(uploadImageData).then(response => {
            console.log('response upload photo =', response);
        }).catch((err) => {
            console.warn('error uploading profile photo ', err);
        });
      }
    },
    computed: {
      userLastName() {
        console.log('user last name =', (StorageService.getUser() && StorageService.getUser().lastName) ? StorageService.getUser().lastName: 'ClicFoot');
        return (StorageService.getUser() && StorageService.getUser().lastName) ? StorageService.getUser().lastName: 'ClicFoot';
      },
      userAvatar() {
        console.log('avatar =', StorageService.avatarFromUser(StorageService.getUser()));
        return StorageService.avatarFromUser(StorageService.getUser());
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
