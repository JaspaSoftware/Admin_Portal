// src/store/index.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    sessionUser: null,
  },
  mutations: {
    setSessionUser(state, user) {
      state.sessionUser = user;
    }
  },
  getters: {
    sessionUser: (state) => state.sessionUser,
  },
});
