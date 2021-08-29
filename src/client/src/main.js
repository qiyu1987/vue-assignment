import Vue from "vue";
import App from "./App.vue";
import * as VueGoogleMaps from "vue2-google-maps";
import { BootstrapVue } from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

const { key } = require("./googleApiKey.json");

// Make BootstrapVue available throughout your project
Vue.config.productionTip = false;
Vue.use(VueGoogleMaps, {
  load: {
    key,
  },
});
Vue.use(BootstrapVue);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
