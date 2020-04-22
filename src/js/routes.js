import StorageService from '../services/storage-service';

import HomePage from "../pages/home.vue";

import MainPage from '../pages/main';

import RegistrePage from '../components/registry/registry.vue'

import ConditionsPage from '../pages/conditions'

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
            path: "/profile/:id/",
            component: Profile
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
