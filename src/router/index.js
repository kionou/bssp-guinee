import { createRouter, createWebHistory } from 'vue-router'

import store from '../store'

import Dashboard from '../views/dashboard/default.vue'
import SignIn from '../views/auth/signIn.vue'

import Users from '../views/users/default.vue'

import Projets from '../views/projets/default.vue'
import ProjetsAdd from '../views/projets/add.vue'
import ProjetsDetail from '../views/projets/detail.vue'
import ProjetsSuivi from '../views/projets/suivi_detail.vue'
import ProjetsDetails from '../views/projets/detail1.vue'

import Bailleurs from '../views/bailleurs/default.vue'

import Insfrastructures from '../views/infrastructure/default.vue'
import ListeInsfrastructures from '../views/infrastructure/liste.vue'
import DetailInsfrastructures from '../views/infrastructure/detail.vue'

import Zones from '../views/zones/default.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Connexion',
      component: SignIn
    },
    {
      path: '/bssp',
      name: 'Accueil',
      component: Dashboard,
      meta: { requiresAuth: true },
      children:[
        // {
        //   path: '',
        //   name: 'dashboard-home',
        //   meta: { requiresAuth: true },
        //    component: Accueil
        // },
        {
          path: 'utilisateurs',
          name: 'utilisateurs',
          meta: { requiresAuth: true },
           component: Users
        },
        {
          path: 'projets',
          name: 'projets',
          meta: { requiresAuth: true },
           component: Projets
        },
        {
          path: 'ajouter-projets',
          name: 'ajouter-projets',
          meta: { requiresAuth: true },
           component: ProjetsAdd
        },
        {
          path: 'detail-projet',
          name: 'detail-projet',
          meta: { requiresAuth: true },
           component: ProjetsDetail
        },
        {
          path: 'suivi-projet',
          name: 'suivi-projet',
          meta: { requiresAuth: true },
           component: ProjetsSuivi
        },
        {
          path: 'detail-projet1',
          name: 'detail-projet1',
          meta: { requiresAuth: true },
           component: ProjetsDetails
        },
        {
          path: 'bailleurs',
          name: 'bailleurs',
          meta: { requiresAuth: true },
           component: Bailleurs
        },
        {
          path: 'types-infrastructures',
          name: 'types-infrastructures',
          meta: { requiresAuth: true },
           component: Insfrastructures
        },
        {
          path: 'infrastructures',
          name: 'infrastructures',
          meta: { requiresAuth: true },
           component: ListeInsfrastructures
        },
        {
          path: 'detail-infrastructures',
          name: 'detail_infrastructures',
          meta: { requiresAuth: true },
           component: DetailInsfrastructures
        },
        {
          path: 'zones',
          name: 'zones',
          meta: { requiresAuth: true },
           component: Zones
        },
       


      ]
       
    },
   
  ]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta.requiresAuth;
  const isAuthenticated = store.getters["auth/isAuthenticated"];
  const authenticatedUser = store.getters["auth/myAuthenticatedUser"];
  console.log("isAuthenticated", isAuthenticated);
  console.log(authenticatedUser);
  if (requiresAuth && !isAuthenticated) {
    // Si la route nécesite une authentification et l'utilisateur n'est pas connecté,
    // redirigez-le vers la page de connexion
    next("/");
  } else if (to.name === "login" && isAuthenticated) {
    // Si l'utilisateur est connecté et essaie d'accéder aux pages d'inscription ou de connexion,
    // redirigez-le vers la page mon_espace
   
      next("/bssp");
    
  } else {
    next();
  }
});

export default router
