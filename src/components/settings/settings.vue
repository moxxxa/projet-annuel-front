<template>
  <f7-page name="setting-page" class="accueil-page" :page-content="false">
    <f7-navbar title="Paramètres" back-link="Back"></f7-navbar>
    <f7-toolbar tabbar bottom scrollable color-theme="black" bg-color="white">
      <f7-link tab-link="#general" class="light" style="flex-grow: 1;">Mon Profil</f7-link>
      <f7-link tab-link="#password" class="light" style="flex-grow: 1;">Mot de passe</f7-link>
      <f7-link tab-link="#DeleteAccount" class="light" style="flex-grow: 1;">Supprimer le compte</f7-link>
    </f7-toolbar>
    <f7-tabs animated>
      <f7-tab id="general" class="page-content" tab-active>
        <br>
        <center><f7-icon md="material:account_circle" color="white" size="50"></f7-icon></center>
        <f7-block>
          <general-settings/>
        </f7-block>
      </f7-tab>
      <f7-tab id="password" class="page-content">
        <br>
        <center><f7-icon md="material:security" color="white" size="50"></f7-icon></center>
        <f7-block>
          <p><password/></p>
        </f7-block>
      </f7-tab>
      <f7-tab id="DeleteAccount" class="page-content">
        <br>
        <center><f7-icon md="material:delete_forever" color="white" size="50"></f7-icon></center>
        <f7-block>
          <delete-account/>
        </f7-block>
      </f7-tab>
    </f7-tabs>
  </f7-page>
</template>

<script>
import generalSettings from './generalSettings/general';
import password from './Password/password';
import deleteAccount from './deleteAccount/deleteAccount'
export default {
  components: {
    generalSettings,
    password,
    deleteAccount
  },
  props: {

  },
  data() {
    return {

    };
  },
  methods: {

  },
  computed: {

  },
  mounted() {

  }
}
</script>
