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
          label="Name"
          floating-label
          type="text"
          placeholder="Your name"
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
          placeholder="Your first name"
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
          label="Password"
          floating-label
          type="password"
          placeholder="Your password"
          info="At least 8 characters and at least one number, upper and lower case"
          clear-button
          :value="passwordRegistration"
          @input="passwordRegistration =  $event.target.value"
        >
        </f7-list-input>
        <!--fin Password -->

        <!-- Password confirmation -->
        <f7-list-input
          outline
          label="Password confirmation"
          floating-label
          type="password"
          placeholder="Please confirm the password"
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

export default {
  components: {

  },
  data() {
    return {
        goBackText: "Return",
        colorTheme: "black",
        //Registre
        introRegistre: 'Soccer heist, more then a game',
        registreText:  "Register",
        haveAccount: "Vous avez déjà un compte ?",
        LoginText: "Identify",
        emailRegistration: "",
        nomRegistration: "",
        prenomRegistration: "",
        passwordRegistration: "",
        passwordConfirmationRegistration: "",
        nomUtilisateurInvalide: "The name must contain at least three characters!",
        prenomUtilisateurInvalide: "The first name must contain at least three characters!",
        emailInvalide: "The email address is invalid!",
        motInmatch: "Your password does not match",
        mdpFaible: "The password must contain at least one number, upper case, lower case and between 8 and 64 in length.",
        errorRegistre: "an error occurred during your registration, please try again later",
        termsText: "By creating your account, you accept our",
        conditionRedirect: "Terms of use",
        userAccept: false
    };
  },
  methods: {
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
      console.log('rule =', vm.passwordRegistration.length < 8 || !vm.PermittedPassword(vm.passwordRegistration));
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
      WebService.registre(vm.emailRegistration, vm.passwordRegistration)
      .then((response) => {
        StorageService.setToken(response.data.data.token);
        WebService.setAuthorization(response.data.data.token);
        StorageService.setUser(response.data.data.user);
        StorageService.setCredits(response.data.data.user.credits);
        StorageService.setMail(vm.emailRegistration);
        WebService.updateUser(vm.nomRegistration, vm.prenomRegistration)
          .then((response) =>  {
            // console.log('response =', response);
            StorageService.setUser(response.data.data.profile);
            // console.log('user registry =', response.data.data.profile);
            // console.log('user updated !!');
            window.location.href = "/";
          })
          .catch((err) => {
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
            console.log('error =', err);
          });
        // console.log('registration success');
      })
      .catch((err) => {
          vm.$f7.preloader.hide();
          if(err.message.includes("406")) {
            let dialog =  vm.$f7.dialog.create({
              title: 'Ops ....',
              content: `This email address is already in use by another user`,
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
