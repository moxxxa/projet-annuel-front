<template>
  <f7-navbar
    class="navbar-authentificated scrim-navbar-authentificated"
    :sliding="false"
    no-hairline
  >

  <!-- Title -->
  <f7-nav-title sliding class="text-italic">
    <a @click="goToPredict" style="text-decorations:none;"><font color="#9921e8">ClicFoot</font></a>
  </f7-nav-title>

  <f7-nav-left
    <a @click="logout">
      <img src="static/images/logout.png" />
    </a>
  </f7-nav-left>
  <!-- logout.png -->
  <div slot="right" class="align-items-center display-flex">
    <a @click="goToProfile">
      <img :src="profileAvatarC" class="img-avatar margin-right" slot="right" />
    </a>
  </div>
  </f7-navbar>
</template>

<script>
import StorageService from "../../services/storage-service";

export default {
  props: ["avatar", "checkProfil"],
  data() {
    return {

    };
  },
  methods: {
    logout() {
      let vm = this;
      vm.$f7.dialog.preloader('Logout ...');
      setTimeout(() => {
        vm.$f7.dialog.close();
        StorageService.removeAll();
        location.href = "";
      }, 3000);
    },
    goToPredict() {
      if (this.checkProfil) {
        this.$f7router.navigate("/welcome/");
      }
    },
    goToProfile() {
      if (this.checkProfil) {
        this.$f7router.navigate("/profile/");
      }
    },
    goToTournament() {
      if (this.checkProfil) {
        this.$f7router.navigate("/tournament/");
      }
    },
    _avatar() {
      return StorageService.avatarFromUser(StorageService.getUser());
    }
  },
  computed: {
    profileAvatarC() {
      return this.avatar && this.avatar !== undefined &&
        typeof this.avatar === "string" &&
        this.avatar !== ""
        ? this.avatar
        : this._avatar();
    }
  },
  created() {

  },
  mounted() {

  }
};
</script>

<style scoped>

</style>
