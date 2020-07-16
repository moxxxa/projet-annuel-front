<template>
    <f7-page name="home" :color-theme="colorTheme" class="home-page" hide-navbar-on-scroll>
        <!-- Top Navbar -->
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
              Inscription
            </f7-button>
          <f7-nav-title sliding text-color="white" class="text-italic margin-top">
            <a href="/" style="text-decorations:none; color:inherit;">ClicFoot&nbsp;</a>
          </f7-nav-title>
        </f7-navbar>
        <f7-fab v-if="showToTop" position="right-bottom" slot="fixed" color="black" @click="scrollToTop">
          <f7-icon md="material:arrow_upward"></f7-icon>
        </f7-fab>
        <!-- Content -->
        <f7-page-content class="margin-horizontal">
          <br><br><br><br><br><br><br><br>
            <h1 class="home-header" id="homePage">
                {{ headerText }}
            </h1>
            <h3 class="text-align-center text-color-white">{{ descSoocerHesitText }}</h3>
            <f7-block>
              <f7-row class="justify-content-center">
                <f7-button
                  fill
                  round
                  text-color="white"
                  class="margin-horizontal"
                   href="/registre/"
                >
                  {{ getStartedText }}
                </f7-button>

                <f7-button
                  text-color="white"
                  class="margin-horizontal"
                  @click="scrollToKnowMore"
                >
                  {{ knowMoreText }}
                </f7-button>
              </f7-row>
            </f7-block>
            <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
            <h3 class="home-header text-align-center text-color-white" id="howItWorks">
                {{ howSoocerHeistWork }}
            </h3>
            <br>
            <f7-block>
              <f7-row>
                <f7-col width="100" medium="30">
                  <f7-row class="text-align-center">
                    <f7-col width="100">
                      <!-- <img src="static/images/step2.png" height="200px" width="200px"> -->
                      <img src="static/images/predict.png" height="200px" width="200px">
                    </f7-col>
                    <f7-col width="100">
                      <h2 class="text-color-white">
                        {{createAccountText}}
                      </h2>
                    </f7-col>
                    <f7-col width="100">
                      <h4 class="text-color-white">
                        {{createAccountDesc}}
                      </h4>
                    </f7-col>
                  </f7-row>
                </f7-col>
                <f7-col width="100" medium="30">
                  <f7-row class="text-align-center">
                    <f7-col width="100">
                      <img src="static/images/step2.png" height="200px" width="200px">
                    </f7-col>
                    <f7-col width="100">
                      <h2 class="text-color-white">
                        {{chooseGame}}
                      </h2>
                    </f7-col>
                    <f7-col width="100">
                      <h4 class="text-color-white">
                        {{chooseGameDesc}}
                      </h4>
                    </f7-col>
                  </f7-row>
                </f7-col>
                <f7-col width="100" medium="30">
                  <f7-row class="text-align-center">
                    <f7-col width="100">
                      <img src="static/images/step3.png" height="200px" width="200px">
                    </f7-col>
                    <f7-col width="100">
                      <h2 class="text-color-white">
                        {{startPredictText}}
                      </h2>
                    </f7-col>
                    <f7-col width="100">
                      <h4 class="text-color-white">
                        {{startPredictDesc}}
                      </h4>
                    </f7-col>
                  </f7-row>
                </f7-col>
              </f7-row>
            </f7-block>
            <br><br><br><br>
            <f7-block>
              <f7-row>
                <f7-col width="100" medium="40" class="text-align-center">
                    <font color="white"><strong>{{droits}}</strong></font>
                </f7-col>
                <f7-col width="100" medium="20" class="text-align-center">
                  <f7-link href="/conditions/?id=a"><font color="white"><strong>{{apropos}}</strong></font></f7-link>
                </f7-col>
                <f7-col width="100" medium="20" class="text-align-center">
                  <f7-link href="/conditions/?id=b"><font color="white"><strong>{{politique}}</strong></font></f7-link>
                </f7-col>
                <f7-col width="100" medium="20" class="text-align-center">
                  <f7-link href="/conditions/?id=c"><font color="white"><strong>{{conditions}}</strong></font></f7-link>
                </f7-col>
              </f7-row>
            </f7-block>
        </f7-page-content>
    </f7-page>
</template>

<script>
import Vue from 'vue'
// import BackToTop from 'vue-backtotop'
//
// Vue.use(BackToTop)

export default {
    data() {
        return {
            colorTheme: "black",
            showToTop: false,
            lastScrollPosition: 0,
            // html text
            getStartedText: "Commencer",
            knowMoreText: "Savoir plus",
            headerText: "Vous pouvez posséder le jeu",
            descSoocerHesitText: "Rejoignez ClicFoot pour prédire les résultats du football et bien plus encore",
            howSoocerHeistWork: "Comment fonctionne ClicFoot",
            createAccountText: "Créez votre compte",
            createAccountDesc: "Abonnez-vous gratuitement et créez votre profil",
            chooseGame: "Choisissez vos matchs de football",
            chooseGameDesc: "Utilisez les filtres pour trouver le jeu dont vous avez besoin",
            startPredictText: "Commencez à prévoir",
            startPredictDesc: "Consultez les meilleures statistiques possibles pour le jeu sélectionné",
            droits: "Copyright © 2020 ClicFoot. Tous les droits sont réservés.",
            apropos: "À propos de nous",
            politique: "Politique de confidentialité",
            conditions: "Conditions d'utilisation"
        };
    },
    methods: {
      scrollToKnowMore() {
        document.getElementById("howItWorks").scrollIntoView({behavior: "smooth"});
      },
      scrollToTop() {
        document.getElementById("homePage").scrollIntoView({behavior: "smooth"});
      },
      contentScrolled(position) {
        if (position > 300) {
          this.showToTop = true;
        } else {
          this.showToTop = false;
        }

      }
    },
    mounted () {
      this.$f7.$('.page-content').on('scroll', (e) => {
       this.contentScrolled(e.srcElement.scrollTop);
     });
    }
};
</script>
<style>
</style>
