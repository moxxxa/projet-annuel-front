import StorageService from '../services/storage-service';

import HomePage from "../pages/home.vue";

import MainPage from '../pages/main';

import RegistrePage from '../components/registry/registry.vue'

import ConditionsPage from '../pages/conditions'

import Profile from '../pages/profile'

import Welcome from '../pages/welcome'

import Settings from '../components/settings/settings'

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
          path: "/settings/",
          component: Settings
        },
        {
          path: "/welcome/",
          component: Welcome
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
