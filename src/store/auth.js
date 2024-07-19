
// store/modules/auth.js
import { isTokenExpired } from '@/functions/util.js';

const state = {
  // Modifier le nom de l'utilisateur authentifié si nécessaire
  myAuthenticatedUser: null,
};

const getters = {
  // Modifier le nom du getter de l'utilisateur authentifié si nécessaire
  myAuthenticatedUser: (state) => state.myAuthenticatedUser,
  isAuthenticated: (state) => state.myAuthenticatedUser !== null,
};

const mutations = {
  // Modifier le nom de la mutation si nécessaire
  SET_MY_AUTHENTICATED_USER(state, user) {
    state.myAuthenticatedUser = user;
  },
  CLEAR_MY_AUTHENTICATED_USER(state) {
    state.myAuthenticatedUser = null;
  },
};

const actions = {
  // Modifier le nom de l'action si nécessaire
  setMyAuthenticatedUser({ commit }, user) {
    console.log(user);
    const now = Math.floor(Date.now() / 1000);
    const tokenExpiration = now + user.expires_in;
    let role_id;

    if (Array.isArray(user.roles)) {
      role_id = user.roles.length > 0 ? user.roles[0].id : null;
    } else {
      role_id = user.role_id;
    }

    const userSessionData = {
      id: user.user.id,
      nom: user.user.Nom,
      prenom: user.user.Prenoms,
      email: user.user.email,
      username:user.user.username,
      whatsapp: user.user.Whatsapp,
      profile: user.user.photo,
      role_id: role_id,
      token: user.access_token,
      tokenExpiration: tokenExpiration,
    };


    commit('SET_MY_AUTHENTICATED_USER', userSessionData);
    localStorage.setItem('myAuthenticatedBssp', JSON.stringify(userSessionData));
  },
  clearMyAuthenticatedUser({ commit }) {
    commit('CLEAR_MY_AUTHENTICATED_USER');
    localStorage.removeItem('myAuthenticatedBssp');
  },
  loadMyAuthenticatedUser({ commit }) {
    const storedUserData = localStorage.getItem('myAuthenticatedBssp');
    if (storedUserData) {
      // const data = JSON.parse(storedUserData);
      // if (!isTokenExpired(data.tokenExpiration)) {
        commit('SET_MY_AUTHENTICATED_USER', JSON.parse(storedUserData));
      // } else {
      //   commit('CLEAR_MY_AUTHENTICATED_USER');
      //   localStorage.removeItem('myAuthenticatedBssp');
      // }
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
