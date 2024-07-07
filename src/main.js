import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store"


import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
import 'maz-ui/styles'
import MazBtn from 'maz-ui/components/MazBtn'
import MazInput from 'maz-ui/components/MazInput'
import MazSelect from 'maz-ui/components/MazSelect'
import MazAvatar from 'maz-ui/components/MazAvatar'
import MazTextarea from 'maz-ui/components/MazTextarea'
import MazSwitch from 'maz-ui/components/MazSwitch'
 import MazDropdown from 'maz-ui/components/MazDropdown'
 import MazInputPrice from 'maz-ui/components/MazInputPrice'
 import MazInputTags from 'maz-ui/components/MazInputTags'
 import MazCheckbox from 'maz-ui/components/MazCheckbox'
 import MazAccordion from 'maz-ui/components/MazAccordion'
 import MazInputCode from 'maz-ui/components/MazInputCode'
import 'sweetalert2/dist/sweetalert2.min.css';

const app = createApp(App)

 

  app.component('MazBtn', MazBtn)
  app.component('MazInput', MazInput)
  // app.component('MazPhoneNumberInput', MazPhoneNumberInput)
  app.component('MazSelect', MazSelect)
  app.component('MazAvatar', MazAvatar)
  app.component('MazTextarea', MazTextarea)
  app.component('MazSwitch', MazSwitch)
  app.component('MazDropdown', MazDropdown)
  app.component('MazInputPrice', MazInputPrice)
  app.component('MazInputTags', MazInputTags)
  app.component('MazCheckbox', MazCheckbox)
  app.component('MazAccordion', MazAccordion)
  app.component('MazInputCode', MazInputCode)



store.dispatch('auth/loadMyAuthenticatedUser').then(() => {
  app.use(router)
  app.use(store);
  app.use(Toast)
  app.mount('#app')
   
    });