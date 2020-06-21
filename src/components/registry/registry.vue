<!-- Registry screen -->
<template>
  <f7-page login-screen :color-theme="colorTheme">
      <f7-login-screen-title>
        {{introRegistre}}
      </f7-login-screen-title>
      <f7-list form>

        <f7-list-input
          ref="nomProfile"
          outline
          label="Nom"
          floating-label
          type="text"
          placeholder="Votre nom"
          clear-button
          error-message="The name must consist of alphabetical letters only!"
          required
          validate
          pattern="[a-zA-Z]*"
          :value="nomRegistration"
          @input="nomRegistration =  $event.target.value"
        >
        </f7-list-input>
        <!-- fin Nom -->

        <!-- Prenom -->

        <f7-list-input
          outline
          label="Prènom"
          floating-label
          type="text"
          placeholder="Votre prénom"
          clear-button
          required
          error-message="The first name must consist of alphabetical letters only!"
          validate
          pattern="[a-zA-Z]*"
          :value="prenomRegistration"
          @input="prenomRegistration =  $event.target.value"
        >
        </f7-list-input>
        <!-- fin prenom -->

        <!-- Email -->

        <f7-list-input
          outline
          label="E-mail"
          floating-label
          type="email"
          placeholder="Your e-mail"
          clear-button
          required
          validate
          :value="emailRegistration"
          @input="emailRegistration =  $event.target.value"
          id="email-registry"
        >
        </f7-list-input>
        <!-- fin email -->

        <!-- Password -->
        <f7-list-input
          outline
          label="Mot de passe"
          floating-label
          type="password"
          placeholder="Votre mot de passe"
          info="au moins  8 characters contenant un nombre, une lettre majuscule et une lettre miniscule"
          clear-button
          :value="passwordRegistration"
          @input="passwordRegistration =  $event.target.value"
        >
        </f7-list-input>
        <!--fin Password -->

        <!-- Password confirmation -->
        <f7-list-input
          outline
          label="Mot de passe confirmation"
          floating-label
          type="password"
          placeholder="Confirmation mot de passe"
          clear-button
          :value="passwordConfirmationRegistration"
          @input="passwordConfirmationRegistration =  $event.target.value"
        >
        </f7-list-input>
        <!--fin Password  confirmation-->
          <f7-block>
            <f7-row>
                <f7-col width="10">
                  <f7-checkbox name="checkbox-1" @change="acceptDeclineConditions">
                  </f7-checkbox>
                </f7-col>
                <f7-col width="90">
                  &nbsp;<font size="2">{{termsText}}&nbsp;<a href="/conditions/">{{conditionRedirect}}</a></font>
                </f7-col>
            </f7-row>
          </f7-block>
      </f7-list>
      <f7-list>
          <f7-button
              @click="handleRegistre"
              fill
              round
              :class="userAccept && passwordRegistration.length > 0 && passwordConfirmationRegistration.length > 0 && nomRegistration.length > 0 && prenomRegistration.length > 0 && validateEmail(emailRegistration)? 'margin-horizontal' : 'disabled margin-horizontal'"
          >
              {{ registreText }}
          </f7-button>
          <br>
            <template>
              <button v-google-signin-button="clientId" class="google-signin-button"> Continue with Google</button>
            </template>
          <f7-block-footer>
              {{ haveAccount }}
              <f7-link login-screen-open="#my-login-screen">{{ LoginText }}</f7-link>
          </f7-block-footer>
      </f7-list>
      <f7-list>
          <f7-list-button @click="$f7router.back()">
            {{ goBackText}}
          </f7-list-button>
      </f7-list>
  </f7-page>
</template>
<script>
import WebService from '../../services/web-service';
import StorageService from '../../services/storage-service';
import GoogleSignInButton from 'vue-google-signin-button-directive'

export default {
  components: {
    GoogleSignInButton
  },
  data() {
    return {
        goBackText: "Revenir",
        colorTheme: "blue",
        //Registre
        introRegistre: 'ClicFoot, plus qu\'un jeu',
        registreText:  "Register",
        haveAccount: "Vous avez déjà un compte ?",
        LoginText: "S'identifier",
        emailRegistration: "",
        nomRegistration: "",
        prenomRegistration: "",
        passwordRegistration: "",
        passwordConfirmationRegistration: "",
        nomUtilisateurInvalide: "Le nom doit contenir au moins trois caractères!",
        prenomUtilisateurInvalide: "Le prénom doit contenir au moins trois caractères!",
        emailInvalide: "L'adresse mail est invalide!",
        motInmatch: "Votre mot de passe ne correspond pas",
        mdpFaible: "Le mot de passe doit contenir au moins un chiffre, un majuscules, un minuscules et entre 8 et 64.",
        errorRegistre: "une erreur s'est produite lors de votre inscription, veuillez réessayer plus tard",
        termsText: "En créant votre compte, vous acceptez nos",
        conditionRedirect: "conditionsd'utilisation",
        userAccept: false,
        clientId: '236557997475-brjtalksspr9epeksd8amep2hl5ddeqn.apps.googleusercontent.com'
    };
  },
  methods: {
    OnGoogleAuthSuccess (idToken) {
      WebService.googleRegistre(idToken).then(response => {
        StorageService.setUser(response.data);
        StorageService.setToken(response.data.token);
        WebService.setAuthorization(response.data.token);
        location.reload();
      }).catch((err) => {
        console.warn('error google registry ', err);
      });
    },
    OnGoogleAuthFail (error) {
      let vm = this;
      let dialog =  vm.$f7.dialog.create({
          title: 'Ouups ..',
          text: error,
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
    },
    acceptDeclineConditions(event) {
      this.userAccept = !this.userAccept;
    },
    handleRegistre() {
      let vm = this;
      if (this.nomRegistration.length < 3) {
        let dialog =  vm.$f7.dialog.create({
            title: '',
            text: vm.nomUtilisateurInvalide,
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
      }

      if (this.prenomRegistration.length < 3) {
        let dialog =  vm.$f7.dialog.create({
            title: '',
            text: vm.prenomUtilisateurInvalide,
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
      }
      if (!this.validateEmail(this.emailRegistration)) {
        let dialog =  vm.$f7.dialog.create({
            title: '',
            text: vm.emailInvalide,
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
      }

      if (vm.passwordRegistration!== vm.passwordConfirmationRegistration) {
        let dialog =  vm.$f7.dialog.create({
            title: '',
            text: vm.motInmatch,
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
      }
      if (vm.passwordRegistration.length < 8 || !vm.PermittedPassword(vm.passwordRegistration)) {
        let dialog =  vm.$f7.dialog.create({
            title: '',
            text: vm.mdpFaible,
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
      }
      vm.$f7.preloader.show();
      WebService.registre(vm.emailRegistration, vm.passwordRegistration, vm.nomRegistration, vm.prenomRegistration)
      .then((response) => {
            StorageService.setUser(response.data);
            StorageService.setToken(response.data.token);
            WebService.setAuthorization(response.data.token);
            location.reload();
          })
          .catch((err) => {
            vm.$f7.preloader.hide();
            if(err.message.includes("409")) {
              let dialog =  vm.$f7.dialog.create({
                title: 'Ops ....',
                content: `Cette adresse e-mail est déjà utilisée par un autre utilisateur`,
                destroyOnClose: true,
                buttons: [
                  {
                    text: 'OK',
                    color: vm.colorTheme,
                  }
                ]
              });
              dialog.open();
            } else {
              vm.$f7.preloader.hide();
              let dialog =  vm.$f7.dialog.create({
                title: '',
                text: vm.errorRegistre,
                destroyOnClose: true,
                buttons: [
                  {
                    text: 'Ok',
                    color: vm.colorTheme,
                  }
                ]
              });
              dialog.open();
            }
            console.log('error =', err);
      });
    },
    validateEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    PermittedPassword(password) {
      let scoreMin = 0;
      let scoreMaj = 0;
      let scoreDigit = 0;
      let i = 0;
      for (i = 0; i < password.length; i++) {
        if (password.charAt(i) >= 'a' && password.charAt(i) <= 'z') {
          scoreMin ++;
        }
        if (password.charAt(i) >= 'A' && password.charAt(i) <= 'Z') {
          scoreMaj ++;
        }
        if (password.charAt(i) >= '0' && password.charAt(i) <= '9') {
          scoreDigit ++;
        }
      }
      // console.log('scoreMin =', scoreMin);
      // console.log('scoreMaj =', scoreMaj);
      // console.log('scoreDigit =', scoreDigit);
      return scoreMin > 0 && scoreMaj > 0 && scoreDigit > 0;
    }
  },
  mounted() {
    // let vm = this;
    // this.$refs.nomProfile.focus();
    this.$f7ready(f7 => {
    // Call F7 APIs here
    });
    // $Scriptjs('https://maps.googleapis.com/maps/api/js?key=AIzaSyAok9kCOSqUdeMRsN5CvHDhRudUOR48H7I', () => {
    //   // this.initMap()
    // });
    // self.$refs.address.focus();
  }
};
</script>

<style>
.google-signin-button {
  color: white;
  background-color: red;
  height: 50px;
  font-size: 16px;
  border-radius: 10px;
  padding: 10px 20px 25px 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>
