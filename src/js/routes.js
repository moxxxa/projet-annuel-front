import StorageService from '../services/storage-service';

import HomePage from "../pages/home.vue";

import MainPage from '../pages/main';

import RegistrePage from '../components/registry/registry.vue'

import ConditionsPage from '../pages/conditions'

import MainPrediction from '../pages/main-prediction'

import Tournament from '../pages/tournament'

import Profile from '../pages/profile'
var routes;

let token = StorageService.getToken();
if (token) {
    /**
     *  authenticated routes
     */

    routes = [
        {
            path: "/",
            component: MainPage
        },
        {
            path: "/profile/",
            component: Profile
        },
        {
          path: "/main-prediction/",
          component: MainPrediction
        },
        {
          path: "/tournament/",
          component: Tournament
        }
    ];
} else {
    /**
     * anonymous routes
     */

    routes =[
        {
            path: "/",
            component: HomePage
        },
        {
          path: '/registre/',
          component: RegistrePage,
        },
        {
          path: '/conditions/',
          component: ConditionsPage,
        }
    ];
}

export default routes;
