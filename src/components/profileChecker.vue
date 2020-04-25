<template>
  <div>
    <br>
    <f7-card class="card-profile-complete margin-top no-border" valign="bottom">
      <f7-card-content>
        <div class="step-1" v-if="step === 1">
          <p class="text-align-center">
            {{userName}}{{messagePictureOne}}
          </p>
          <p class="text-align-center">
            {{messagePictureTwo}}
          </p>
          <br>
          <input
            style="display: none"
            type="file"
            @change="onFileSelected"
            ref="fileInput"/>
            <!-- {{profilePhotoC}} -->
          <a><img :style="profilePhotoC !== '' ? 'display: none' : ''" src="static/images/d-avatar.jpg" class="uploadImage justify-content-center" @click="$refs.fileInput.click()"/></a>
          <a><img :style="profilePhotoC === '' ? 'display: none' : ''" :src="profilePhotoC" class="uploadImage justify-content-center" @click="$refs.fileInput.click()"/></a>
        </div>
    </f7-card-content>
    <f7-card-footer>
      <p>&nbsp;</p>
      <f7-button
       :class="!currentStateC ? 'disabled margin-right' : 'margin-right'"
       @click="step = step + 1;">
       Finish
     </f7-button>
    </f7-card-footer>
  </f7-card>
  </div>
</template>
<script>
  import WebService from '../services/web-service';
  import StorageService from '../services/storage-service';

  export default {
    props: [
      'user'
    ],
    components: {
    },
    data() {
      return {
        messagePictureOne: ', We need a photo in order to establish your profile',
        messagePictureTwo: 'Donwload a photo please',
        selectedFile: null,
        currentState : true,
        profilePhoto: '',
        step: 1
      };
    },
    methods: {
      onFileSelected(event) {
        // console.log('event =', event);
        this.selectedFile = event.target.files[0];
        // console.log('selectedFile =', this.selectedFile);
        this.uploadPhoto();
      },
      async getBase64(file) {
        return new Promise((resolve, reject) => {
          // console.log('dans la promise');
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        });
      },
      async uploadPhoto() {
        // let vm = this;
        // vm.$f7.preloader.show();
        // this.getBase64(vm.selectedFile).then(
        //   data =>
        //   WebService.insertPhotoIntoUser(data.substr(data.indexOf(',')+1)).then(response => {
        //     // console.log('data =', data);
        //     vm.$f7.preloader.hide();
        //     this.currentState = true;
        //     this.profilePhoto = StorageService.backendHost() + response.data.data.profile.avatar.url+'';
        //     this.$emit("avatar", this.profilePhoto);
        //     // console.log('response =', response);
        //     StorageService.setUser(response.data.data.profile);
        //     // console.log('user =', StorageService.getUser());
        //   }).catch((err) => {
        //     vm.$f7.preloader.hide();
        //     console.log('err =', err);
        //   })
        // );
          // console.log('profilePhoto =', this.profilePhoto);
      }
    },
    computed: {
      currentStateC() {
          return this.currentState;
      },
      userName() {
        return this.user.pseudo;
      },
      profilePhotoC() {
        // console.log('here ', this.profilePhoto);
        return this.profilePhoto;
      }
    },
    watch : {
      step(newv, oldv) {
        if (newv !== oldv) {
          let vm = this;
          if (vm.step === 2) {
              this.$emit("inscriptionCompleted");
          }
        }
      }
    }
  }
  </script>
