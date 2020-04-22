// Import Vue
import Vue from "vue";

// Import Framework7
import Framework7 from "framework7/framework7-lite.esm.bundle.js";

// Import Framework7-Vue Plugin
import Framework7Vue from "framework7-vue/framework7-vue.esm.bundle.js";

// Import Framework7 Styles
import "framework7/css/framework7.bundle.css";

// Import Icons and App Custom Styles
import "../css/icons.css";
import "../css/app.scss";

// Import App Component
import App from "../components/app.vue";

import { SliderPlugin } from '@syncfusion/ej2-vue-inputs';

import VModal from 'vue-js-modal'

Vue.use(VModal)

// Init Framework7-Vue Plugin
Framework7.use(Framework7Vue);

Vue.use(SliderPlugin);

import VueCarousel from 'vue-carousel';
Vue.use(VueCarousel);

import vSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
Vue.component('v-select', vSelect);

// Init App
new Vue({
    el: "#app",
    render: h => h(App),

    // Register App Component
    components: {
        app: App
    }
});
