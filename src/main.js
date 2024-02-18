import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// import prime vue 
import PrimeVue from 'primevue/config';

// import toat from primevue

import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';
//import "primevue/resources/themes/lara-light-indigo/theme.css";

import 'primevue/resources/themes/lara-light-teal/theme.css'


// import BadgeDirective from 'primevue/badgedirective';


// bootstrap css file
import 'bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle'; 

// Importing the global css file

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from '@fortawesome/free-regular-svg-icons';




import "@/assets/css/style.scss";

// import i18n 

// import VueI18n from "vue-i18n";
import i18n from './i18n';

import mitt from "mitt";

// import google map 

import GoogleMap from 'vue-google-maps-ui';

const emitter = mitt();

library.add(fas, fab, far);
dom.watch()

// import axios 

import axios from 'axios';
axios.defaults.baseURL = 'https://ekceer.com/api/v1/'
axios.defaults.headers.common['lang'] = `${localStorage.getItem('locale')}`;


// axios.defaults.headers.lang = localStorage.getItem("lang") || "ar";

export const vueApp = createApp(App);

// this function handle the numeric (only number)
vueApp.directive('numeric', {
    mounted(el) {
      el.addEventListener('input', function () {
        const nonNumReg = /[^0-9]/g;
        this.value = this.value.replace(nonNumReg, '');
      });
    },
  });


  
vueApp.component('fa', FontAwesomeIcon)
vueApp.component('Toast', Toast)
vueApp.provide("emitter", emitter).use(router)
.use(i18n)
.use(ToastService)
// .use(VueI18n)
.use(PrimeVue)
// .directive('badge', BadgeDirective)
.component('Googlemap', GoogleMap)
.mount("#app");

import "bootstrap/dist/js/bootstrap.js"
