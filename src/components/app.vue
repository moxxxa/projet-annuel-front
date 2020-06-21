<template>
  <f7-app :params="f7params">
    <!-- Your main view, should have "view-main" class -->
    <f7-view
      main
      class="safe-areas"
      id="main-view"
      url="/"
    >
    </f7-view>

    <!-- Login screen -->
    <f7-login-screen id="my-login-screen">
      <f7-view>
        <f7-page login-screen :color-theme="colorTheme">
          <f7-login-screen-title>{{ screenTitle }}</f7-login-screen-title>
          <f7-list form>
            <f7-list-input
              type="email"
              floating-label
              label="Email"
              name="email"
              :value="email"
              @keypress.native="onKeydown"
              @input="email = $event.target.value"
            ></f7-list-input>
            <f7-list-input
              type="password"
              floating-label
              label="Mot de passe"
              name="password"
              :value="password"
              @input="password = $event.target.value"
              @keypress.native="onKeydown"
            ></f7-list-input>
          </f7-list>
          <f7-list>
            <f7-button @click="handleLogin" fill round class="margin-horizontal">{{ signInText }}</f7-button>
            <br>
            <template>
              <button v-google-signin-button="clientId" class="google-signin-button"> Continue with Google</button>
            </template>
            <f7-block-footer>
              {{ dontHaveAccText }}
              <f7-link href="/registre/">{{ signUpText }}</f7-link>
            </f7-block-footer>
          </f7-list>
          <f7-list>
            <f7-list-button @click="$f7.loginScreen.close()">
              {{
              goBackText
              }}
            </f7-list-button>
          </f7-list>
        </f7-page>
      </f7-view>
    </f7-login-screen>
  </f7-app>
</template>
<script>
import routes from "../js/routes.js";
import WebService from "../services/web-service";
import StorageService from "../services/storage-service";
import GoogleSignInButton from 'vue-google-signin-button-directive'

export default {
  components: {
    GoogleSignInButton
  },
  data() {
    return {
      // Framework7 Parameters
      f7params: {
        name: "ClicFoot", // App name
        theme: "auto", // Automatic theme detection

        // App routes
        routes: routes
      },

      // Login screen data
      email: "",
      password: "",
      colorTheme: "blue",
      // html text
      screenTitle: "S'identifier",
      signInText: "Connexion",
      dontHaveAccText: "Pas encore inscrit ?",
      signUpText: "S'inscrire maintenant",
      goBackText: "Retourner",
      emailIncorrectText: "E-mail ou mot de passe incorrect.",
      clientId: '236557997475-brjtalksspr9epeksd8amep2hl5ddeqn.apps.googleusercontent.com',
      user: StorageService.getUser()
    };
  },
  computed: {

  },
  methods: {
    OnGoogleAuthSuccess (idToken) {
      WebService.googleRegistre(idToken).then(response => {
        StorageService.setToken(response.data.token);
        StorageService.setUser(response.data);
        WebService.setAuthorization(response.data.token);
        location.reload();
      }).catch((err) => {
        console.log('error google registry ', err);
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
    onKeydown(event) {
    },
    handleLogin() {
      // StorageService.setToken("pokemon007");
      // WebService.setAuthorization("pokemon007");
      // let profile = {
      //   pseudo: "userA",
      //   birthday: "20/07/1995"
      // }
      // StorageService.setUser(profile);
      // location.reload();
      let vm = this;
      vm.$f7.preloader.show();
      WebService.login(this.email, this.password)
        .then(response => {
          vm.$f7.preloader.hide();
          StorageService.setToken(response.data.token);
          StorageService.setUser(response.data);
          WebService.setAuthorization(response.data.token);
          location.reload();
        })
        .catch((err) => {
          console.log('err =', err)
          vm.$f7.preloader.hide();
          let dialog = vm.$f7.dialog.create({
            title: "",
            text: vm.emailIncorrectText,
            destroyOnClose: true,
            buttons: [
              {
                text: "OK",
                color: vm.colorTheme
              }
            ]
          });
          dialog.open();
        });
    }
  },
  mounted() {
    this.$f7ready(f7 => {
      // Call F7 APIs here
    });
  }
};
</script>

<style scoped>
@import "../../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-popups/styles/material.css";
@import "../../node_modules/@syncfusion/ej2-vue-inputs/styles/material.css";
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
