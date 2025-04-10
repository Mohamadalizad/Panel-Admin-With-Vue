import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import Toast from "vue-toastification";
// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

import { loadFonts } from './plugins/webfontloader'


loadFonts()

createApp(App)
.use(router)
.use(store)
.use(vuetify)
.use(Toast, {
  position: "top-right",
  rtl: true
})
  .mount('#app')
