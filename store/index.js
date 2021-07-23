const user = {
  namespaced: true,
  state: {
    data: {},
    isLoadind: false,
    isLoggedIn: false,
    token: null,
    errors: []
  },
  getters: {
    isLoggedIn: state => state.isLoggedIn,
    errors: state => state.errors,
    currentUser: state => state.data,
    token: state => state.token
  },
  actions: {
    trySignIn(context, credentials) {},
    trySignIn(context, user) {},
    fetchCurrentUser(context, user) {}
  },
  mutations: {
    signInSuccess(state, data) {},
    signUpSuccess(state, data) {},
    signOut(state) {},
    signError(state, errors) {}
  }
};
