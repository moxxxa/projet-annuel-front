<template>
  <f7-app :params="f7params">
    <!-- Your main view, should have "view-main" class -->
    <f7-view
      main
      class="safe-areas"
      id="main-view" :stackPages="true" url="/"
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
              label="Password"
              name="password"
              :value="password"
              @input="password = $event.target.value"
              @keypress.native="onKeydown"
            ></f7-list-input>
          </f7-list>
          <f7-list>
            <f7-button @click="handleLogin" fill round class="margin-horizontal">{{ signInText }}</f7-button>
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

export default {
  data() {
    return {
      // Framework7 Parameters
      f7params: {
        name: "Soccer heist", // App name
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
      emailIncorrectText: "Email or Password is incorrect.",

      user: StorageService.getUser()
    };
  },
  computed: {

  },
  methods: {
    onKeydown(event) {
      // switch(event.key) {
      //   case 'Enter': this.handleLogin();
      //   break;
      //   default: break;
      // }
    },
    handleLogin() {
      let vm = this;

      vm.$f7.preloader.show();
      WebService.login(this.email, this.password)
        .then(response => {
          StorageService.setToken(response.data.data.token);
          StorageService.setMail(vm.email);
          StorageService.setIsPremium(response.data.data.user.profile.is_premium);
          StorageService.setCredits(response.data.data.user.credits);
          StorageService.setFullUser(response.data.data.user);
          WebService.setAuthorization(response.data.data.token);
          WebService.getUserProfile()
            .then(response => {
              StorageService.setUser(response.data.data.profile);
              location.reload();
            })
            .catch(err => {
              console.log("err =", err);
            });
        })
        .catch(() => {
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
</style>
