<template>
  <f7-navbar
    class="navbar-authentificated scrim-navbar-authentificated"
    :sliding="false"
    no-hairline
  >

  <!-- Title -->
  <f7-nav-title sliding class="text-italic">
    <a @click="goToPredict" style="text-decorations:none;"><font color="#9921e8">Soccer heist</font></a>
  </f7-nav-title>

  <!-- Find matchs -->
  <f7-nav-left class="tournament margin-left">
    <f7-link @click="goToPredict">
      <h5><font colot="black">Tournament</font></h5>
    </f7-link>
  </f7-nav-left>

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
  props: ["avatar"],
  data() {
    return {

    };
  },
  methods: {
    goToPredict() {

    },
    goToProfile() {

    },
    _avatar() {
      return StorageService.avatarFromProfile(StorageService.getUser());
      console.log('_avatar :', StorageService.avatarFromProfile(StorageService.getUser()));
    },
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
