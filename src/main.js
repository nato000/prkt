import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'

import App from './components/App.vue'
import Students from './components/Students.vue'
import StudentsInfo from './components/StudentInfo.vue'
import store from './store.js'
import modal from './components/modal.vue'
import wysiwyg from 'vue-wysiwyg';

const routes = [
   {path: '/', component: Students},
   {path: '/student-info/:id', component: StudentsInfo, props: true},
]
const router = new VueRouter({
   routes
})
Vue.use(VueRouter)
Vue.use(VueAxios, axios)
Vue.use(modal)
Vue.use(wysiwyg, {})

new Vue({
    render: h => h(App),
    el: '#app',
    router,
    store
})


