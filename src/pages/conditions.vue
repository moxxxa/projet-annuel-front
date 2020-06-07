<template>
  <f7-page class="conditions-page">
    <f7-navbar
        :sliding="false"
        no-shadow
        no-hairlin
        class="navbar-transparent scrim-navbar"
    >
      <a href="#" slot="right">
        <f7-button login-screen-open="#my-login-screen">
          <font color="white">Login</font>
        </f7-button>
      </a>
        <f7-button fill round raised text-color="white" href="/registre/" slot="right" class="margin-left">
          Registre
        </f7-button>
      <f7-nav-title sliding text-color="white" class="text-italic margin-top">
        <a href="/" style="text-decorations:none; color:inherit;">ClicFoot&nbsp;</a>
      </f7-nav-title>
    </f7-navbar>
    <br>
    <f7-block>
      <f7-row>
        <f7-col width="10" medium="10" class="display-flex">
        &nbsp;
        </f7-col>
        <f7-col width="90" medium="30" class="display-flex">
            <f7-row>
              <f7-col width="100" class="display-flex text-align-left">
                <a @click="choice = 'c'">Conditions d'utilisation</a>
              </f7-col>
              <f7-col width="100" class="display-flex text-align-left">
                &nbsp;
              </f7-col>
              <f7-col width="100" class="display-flex text-align-left">
                <a @click="choice = 'b'">Politique de confidentialité</a>
              </f7-col>
              <f7-col width="100" class="display-flex">
                &nbsp;
              </f7-col>
              <f7-col width="100" class="display-flex">
                <a @click="choice = 'a'">À propos de nous</a>
              </f7-col>
          </f7-row>
        </f7-col>
        <f7-col width="90" medium="50" class="text-align-left">
          <conditions v-if="currentChoice === 'c'"/>
          <politique v-if="currentChoice === 'b'"/>
          <apropos v-if="currentChoice === 'a'"/>
        </f7-col>
        <f7-col width="10" medium="10" class="display-flex">
          &nbsp;
        </f7-col>
      </f7-row>
    </f7-block>
  </f7-page>
</template>
<script>
import conditions from '../components/conditions/conditionsUtilisation';
import politique from '../components/conditions/politique';
import apropos from '../components/conditions/apropos';

export default {
  components: {
    conditions,
    politique,
    apropos
  },
  data() {
    return {
      choice: 'c'
    };
  },
  computed: {
    currentChoice() {
      return this.choice;
    }
  },
  mounted() {
    // console.log('$f7route.query.id =', this.$f7route.query.id);
    if (this.$f7route.query && this.$f7route.query.id) {
        this.choice = this.$f7route.query.id;
    }
  }
}
</script>
