<template>
  <f7-block>
    <f7-row>
      <f7-col width="0" medium="20">
        &nbsp;
      </f7-col>
      <f7-col width="100" medium="60">
        <f7-card>
          <f7-card-content>
            <br><br><br>
              <f7-block>
                <f7-row>
                  <f7-col width="100" medium="50">
                    <f7-list form>
                      <f7-list-input
                        ref="prenomProfile"
                        outline
                        label="Prénom"
                        type="text"
                        :placeholder="userLastName"
                        clear-button
                        required
                        :value="prenom"
                        @input="prenom =  $event.target.value"
                      >
                      </f7-list-input>
                    </f7-list>
                  </f7-col>
                  <f7-col width="100" medium="50">
                    <f7-list form>
                      <f7-list-input
                        ref="prenomProfile"
                        outline
                        label="Nom de famille"
                        type="text"
                        :placeholder="userName"
                        clear-button
                        required
                        :value="nom"
                        @input="nom =  $event.target.value"
                      >
                      </f7-list-input>
                    </f7-list>
                  </f7-col>
                  <f7-col width="100" medium="50">
                    <f7-list form>
                      <f7-list-input
                        outline
                        label="E-mail"
                        type="email"
                        :placeholder="userMail"
                        clear-button
                        required
                        :value="email"
                        @input="email =  $event.target.value"
                        id="email-registry"
                        class="email-profile-config"
                      >
                      </f7-list-input>
                    </f7-list>
                  </f7-col>

                  <f7-col widht="0" medium="50">
                    &nbsp;
                  </f7-col>
                  <f7-col width="100" medium="100">
                    &nbsp;
                  </f7-col>
                  <f7-col width="100" medium="100">
                    &nbsp;
                  </f7-col>
                  <f7-col width="90" medium="40">
                    <f7-button fill round raised @click="validateUserInput" class="light">
                      Sauvegarder
                      <f7-icon md="material:forward" class=""/>
                    </f7-button>
                  </f7-col>
                </f7-row>
              </f7-block>
            </f7-list>
            <br><br>
          </f7-card-content>
        </f7-card>
      </f7-col>
      <f7-col width="0" medium="20">
        &nbsp;
      </f7-col>
      <f7-col width="100" medium="100">
        &nbsp;
      </f7-col>
      <f7-col width="100" medium="100">
        &nbsp;
      </f7-col>
      <f7-col width="100" medium="100">
        &nbsp;
      </f7-col>
    </f7-row>
  </f7-block>
</template>

<script>
import StorageService from '../../../services/storage-service';
import WebService from '../../../services/web-service'

// Vue.use(VueGoogleMaps) ;
export default {
  props: {

  },
  data() {
    return {
      prenom: '',
      nom: '',
      email: '',
      oldName: '',
      oldLastName: '',
      oldMail: ''
    };
  },
  methods: {
    validateEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    verifyInput() {
      let vm = this;
      if (vm.prenom.length < 3 && vm.prenom.length > 0) {
        // console.log('here1');
        let dialog =  vm.$f7.dialog.create({
            title: 'Nom trop court',
            text: 'Le prènom doit comporter au moins trois caractères',
            destroyOnClose: true,
            buttons: [
                {
                    text: 'Ok',
                    color: vm.colorTheme,
                }
            ]
        });
        dialog.open();
        return false;
      }

      if (vm.nom.length < 3 && vm.nom.length > 0) {
        // console.log('here2');
        let dialog =  vm.$f7.dialog.create({
            title: 'Prènom trop court',
            text: 'Le nom doit comporter au moins trois caractères',
            destroyOnClose: true,
            buttons: [
                {
                    text: 'Ok',
                    color: vm.colorTheme,
                }
            ]
        });
        dialog.open();
        return false;
      }
      console.log('checking email');
      if (vm.email.length > 0 && !vm.validateEmail(vm.email)) {
        // console.log('here3');
        let dialog =  vm.$f7.dialog.create({
            title: 'E-mail non valide',
            text: 'L\'adresse mail saisi est non valide',
            destroyOnClose: true,
            buttons: [
                {
                    text: 'Ok',
                    color: vm.colorTheme,
                }
            ]
        });
        dialog.open();
        return false;
      }

      return true;
    },
    validateUserInput() {
      // console.log('pays =', this.pays);
      const shouldUpdate = this.verifyInput();
      console.log('shouldUpdate =', shouldUpdate);
      // console.log('here ', shouldUpdate);
      if ((shouldUpdate) && (this.email.length > 0 || this.nom.length > 0 || this.prenom.length > 0)) {
        const app = this.$f7;
        app.dialog.confirm('Veuillez valider votre choix', () => {
          app.dialog.close();
          this.updateUserInfo();
          return;
        });
      }
      return;
    },
    updateUserInfo() {
      // console.log('dans le validate userInfo');
      // this.$f7app.dialog.alert('Vos informations vient d\'être mise à jour');
      let vm = this;
      if (vm.email.length > 0 && this.validateEmail(vm.email)) {
        WebService.updateUserEmail(vm.email, StorageService.getUser().id).then(response => {
          // console.log('response =', response);
          vm.oldMail = vm.email;
          // StorageService.setUser(response.data.data.profile);
        }).catch((err) => {
          console.log('error =', err);
        });
      }

      if(vm.nom.length >= 3) {
        WebService.updateUserName(vm.nom).then(response => {
          vm.oldName = vm.nom;
          StorageService.setUser(response.data.data.profile);
          // console.log('new profile =', response.data.data.profile);
        }).catch((err) => {
          console.log('err while updating userName ', err)
        });
      }

      if (vm.prenom.length >= 3) {
        WebService.updateUserLastName(vm.prenom).then(response => {
          vm.oldLastName = vm.prenom;
          StorageService.setUser(response.data.data.profile);
          // console.log('new profile =', response.data.data.profile);
        }).catch((err) => {
          console.log('err while updating userlastName ', err)
        });
      }

      vm.$f7.dialog.preloader('Vos informations vient d\'être mise à jour, vous serez redirigé vers votre profil');
      setTimeout(() => {
        vm.$f7.dialog.close();
        vm.$f7router.navigate("/profile/0/");
      }, 4000);
    }
  },
  computed: {
    userName() {
      return this.oldName;
    },
    userLastName() {
      return this.oldLastName;
    },
    userMail() {
      return  this.oldMail;
    }
  },
  mounted() {

    this.oldName =(StorageService && StorageService.getUser()) ? StorageService.getUser().first_name : '';
    this.oldLastName =(StorageService && StorageService.getUser()) ? StorageService.getUser().last_name : '';
    this.oldMail = (StorageService && StorageService.getMail()) ? StorageService.getMail() : '';
    console.log('oldName =', this.oldName);
    console.log('oldLastName =', this.oldLastName);
    console.log('oldMail =', this.oldMail);
  }
}

</script>
