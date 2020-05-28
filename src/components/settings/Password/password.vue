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
                  <f7-col width="100" medium="80">
                    <f7-list form>
                      <f7-list-input
                      outline
                        label="Mot de passe actuel"
                        type="password"
                        required
                        clear-button
                        @input="currentMdp =  $event.target.value"
                      >
                      </f7-list-input>
                    </f7-list>
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
                  <f7-col width="100" medium="80">
                    <f7-list form>
                      <f7-list-input
                      outline
                        type="password"
                        placeholder="Nouveau mot de passe"
                        clear-button
                        required
                        @input="newMdp =  $event.target.value"
                      >
                      </f7-list-input>
                    </f7-list>
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
                  <f7-col width="100" medium="80">
                    <f7-list form>
                      <f7-list-input
                      outline
                        type="password"
                        placeholder="Confirmer le nouveau mot de passe"
                        clear-button
                        required
                        @input="newMdpConfirm = $event.target.value"
                      >
                      </f7-list-input>
                    </f7-list>
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
                  <f7-col width="90" medium="40">
                    <f7-button fill round raised @click="validateUserPassword" class="light">
                      Changement
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

export default {
  components: {

  },
  props: {

  },
  data() {
    return {
      currentMdp: '',
      newMdp: '',
      newMdpConfirm: ''
    };
  },
  methods: {
    validateUserPassword() {
      let vm = this;
      if ((vm.newMdp && vm.newMdpConfirm) && (vm.newMdp.length < 6 || !vm.hasLowerCase(vm.newMdp) || !vm.hasMajCase(vm.newMdp) || !vm.hasDigit(vm.newMdp))) {
        let dialog =  vm.$f7.dialog.create({
            title: 'Échec',
            text: 'Le mot de passe doit comporter au moins six caractères, une lettre majuscule, une lettre minuscule et un chiffre',
            destroyOnClose: true,
            buttons: [
                {
                    text: 'OK'
                }
            ]
        });
        dialog.open();
        return ;
      }

      if (vm.newMdp && vm.newMdpConfirm && vm.currentMdp && vm.newMdp === vm.currentMdp)  {
        let dialog =  vm.$f7.dialog.create({
            title: 'Échec',
            text: 'Le nouveau mot de passe doit être différent du mot de passe actuelle',
            destroyOnClose: true,
            buttons: [
                {
                    text: 'OK'
                }
            ]
        });
        dialog.open();
        return ;
      }

      if (vm.newMdp && vm.newMdpConfirm && vm.newMdp === vm.newMdpConfirm) {
          const app = vm.$f7;
          app.dialog.confirm('Veuillez confirmer votre choix', () => {
            app.dialog.close();
            vm.updateUserPassword();
            return;
          });
      } else {
          let dialog =  vm.$f7.dialog.create({
              title: 'Échec',
              text: 'Les mots de passe ne correspondent pas',
              destroyOnClose: true,
              buttons: [
                  {
                      text: 'OK'
                  }
              ]
          });
          dialog.open();
          return ;
      }
      return;
    },
    hasLowerCase(str) {
      return (/[a-z]/.test(str));
    },
    hasMajCase(str) {
      return (/[A-Z]/.test(str));
    },
    hasDigit(str) {
      return (/[0-9]/.test(str));
    },
    updateUserPassword() {
      let vm = this;
      WebService.updateUserPassword(vm.newMdp, vm.currentMdp, StorageService.getUser().id).then(response => {
        let dialog =  vm.$f7.dialog.create({
            title: 'Succès',
            text: 'Votre mot de passe vient d\'être mis a jour',
            destroyOnClose: true,
            buttons: [
                {
                    text: 'OK'
                }
            ]
        });
        dialog.open();
        setTimeout(function () {
          location.reload();
        }, 1200);
      }).catch((err) => {
        console.warn('error while trying to update user password', err);
        let dialog =  vm.$f7.dialog.create({
            title: 'Échec',
            text: 'Votre mot de passe est incorrect, veuillez ressayer',
            destroyOnClose: true,
            buttons: [
                {
                    text: 'OK'
                }
            ]
        });
        dialog.open();
      })
    }
  },
  computed: {

  },
  mounted() {

  }
}

</script>
