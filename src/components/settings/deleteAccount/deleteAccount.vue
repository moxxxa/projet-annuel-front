<template>
  <f7-block>
    <f7-row>
      <f7-col width="0" medium="20">
        &nbsp;
      </f7-col>
      <f7-col width="100" medium="60">
        <f7-card class="demo-card-header-pic">
          <f7-card-header class="no-border">
            <div>
              <h2 class="light">Supprimer le compte?</h2>
              <p class="light">Êtes-vous sûr de vouloir supprimer votre compte? Tout le contenu, y compris les recherches et autres données, sera définitivement supprimé!</p>
            </div>
            <br>
          </f7-card-header>
          <f7-card-content>
            <f7-block>
              <f7-row>
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
                      ref="prenomProfile"
                      label="Mot de passe actuel"
                      type="password"
                      clear-button
                      required
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
                <f7-col width="90" medium="40">
                  <f7-button fill round raised @click="validateUserInput">
                    <font face="arial">Effacer</font>
                    <f7-icon md="material:forward" class=""/>
                  </f7-button>
                </f7-col>
                <f7-col width="100" medium="100">
                  &nbsp;
                </f7-col>
                <f7-col width="100" medium="100">
                  &nbsp;
                </f7-col>
              </f7-row>
            </f7-block>
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
      currentMdp: ''
    };
  },
  methods: {
    validateUserInput() {
      let vm = this;
      if ((vm.currentMdp) && (!vm.hasLowerCase(vm.currentMdp) || !vm.hasMajCase(vm.currentMdp) || !vm.hasDigit(vm.currentMdp)))  {
        let dialog =  vm.$f7.dialog.create({
            title: 'Échec',
            text: 'Votre mot de passe est incorrect',
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

      if (vm.currentMdp) {
          const app = vm.$f7;
          app.dialog.confirm('Cette action est irréversible, Veuillez confirmer votre choix', () => {
            app.dialog.close();
            vm.deleteUserAccount();
            return;
          });
      }
    },
    deleteUserAccount() {
      let vm = this;
      WebService.deleteUserAccount(vm.currentMdp, StorageService.getUser().id).then(response => {
        let dialog =  vm.$f7.dialog.create({
            title: 'L\'équipe ClicFoot',
            text: 'Vous allez nous manquer, votre compte vient d\'être supprimée :(',
            destroyOnClose: true,
            buttons: [
                {
                    text: 'OK'
                }
            ]
        });
        dialog.open();
        StorageService.removeToken();
        setTimeout(function () {
          location.href = "";
        }, 2500);
      }).catch((err) => {
        console.warn('error while trying to delete user account', err);
        let dialog =  vm.$f7.dialog.create({
            title: 'Échec',
            text: 'Votre mot de passe est incorrect',
            destroyOnClose: true,
            buttons: [
                {
                    text: 'OK'
                }
            ]
        });
        dialog.open();
      })
    },
    hasLowerCase(str) {
      return (/[a-z]/.test(str));
    },
    hasMajCase(str) {
      return (/[A-Z]/.test(str));
    },
    hasDigit(str) {
      return (/[0-9]/.test(str));
    }
  },
  computed: {

  },
  mounted() {

  }
}

</script>
