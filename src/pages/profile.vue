<template>
    <f7-page name="accueil" class="accueil-page">
      <navbar-auth :avatar="userAvatar" :checkProfil="true"/>
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
        selectedFile: null,
        retrievedImage: null
      }
    },
    methods: {
      openGalleryOfIndex(payload) {
        this.$refs.standalone.open(payload + 1);
      },
      async onPhotoUpload(event) {
        WebService.deletePhoto(StorageService.getUser().email).then(response => {
          console.log('response delete photo =' , response);
          this.triggerUpload(event);
        }).catch((err) => {
          console.warn('err deleting photo', err);
        });
      },
      triggerUpload(event) {
        this.selectedFile = event.target.files[0];
        const uploadImageData = new FormData();
        uploadImageData.append('imageFile', this.selectedFile, StorageService.getUser().email);
        WebService.uploadPhoto(uploadImageData).then(response => {
            console.log('response upload photo =', response);
            this.base64Data = response.data.picByte;
            this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
            console.log('retrievedImage =', this.retrievedImage);
        }).catch((err) => {
          console.log("error =", err);
          let vm = this;
          let dialog =  vm.$f7.dialog.create({
              title: 'Ouups ..',
              text: 'Image size is too large, try with smaller image please',
              destroyOnClose: true,
              buttons: [
                  {
                      text: 'OK',
                      color: vm.colorTheme,
                  }
              ]
          });
          dialog.open();
          return ;
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
        return (this.retrievedImage !== null) ? this.retrievedImage :
          (StorageService.avatarFromUser(StorageService.getUser()) !== '') ? StorageService.avatarFromUser(StorageService.getUser()) : 'static/images/d-avatar.jpg';
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
.img-profile {
  height: 200px;
  width: 200px;
  object-fit: cover;
  border-radius: 50%;
  display: block;
  margin: auto;
}
</style>
