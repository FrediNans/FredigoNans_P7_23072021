export const state = () => ({
  data: {},
  isAdmin: false,
  isLoading: false,
  isLoggedIn: false,
  token: localStorage.getItem("token"),
  errors: []
});

export const getters = {
  isAdmin: state => state.isAdmin,
  isLoading: state => state.isLoading,
  isLoggedIn: state => state.isLoggedIn,
  errors: state => state.errors,
  currentUser: state => state.data,
  token: state => state.token
};

export const actions = {
  async tryLogin(context, credentials) {
    try {
      context.commit("updateIsLoading", true);
      const response = await this.$axios.post("/user/login", credentials);
      localStorage.setItem("token", response.data.token);
      context.commit("loginSuccess", response.data);
      this.$router.push("/wall");
    } catch (err) {
      context.commit("signError", err);
    }
  },
  async trySignup(context, user) {
    try {
      context.commit("updateIsLoading", true);
      await this.$axios.post("http://localhost:8080/user/signup", user);
      context.commit("signupSuccess");
      this.$router.push("/");
    } catch (err) {
      context.commit("signError", err);
    }
  },

  async fetchCurrentUser(context, credentials) {
    try {
      context.commit("updateIsLoading", true);
      const response = await this.$axios.get("/user/account", credentials);
      context.commit("fetchCurrentUserSuccess", response.data);
    } catch (err) {
      context.commit("signError", err);
      this.$router.push("/");
    }
  },

  async modifyAccount(context, credentials) {
    try {
      context.commit("updateIsLoading", true);
      const response = await this.$axios.put(
        "/user/modifyAccount",
        credentials
      );
      context.commit("modifyAccountSuccess", response.data);
      this.$router.push("/account");
    } catch (error) {
      context.commit("signError", error);
    }
  },

  tryLogout(context) {
    localStorage.removeItem("token");
    context.commit("logoutSuccess");
    this.$router.push("/");
  },

  async tryUpdateToken(context) {
    const token = localStorage.getItem("token");
    context.commit("updateToken", token);
  }
};

export const mutations = {
  logoutSuccess(state) {
    state.token = null;
    state.isLoggedIn = false;
    state.data = {};
  },
  updateIsLoading(state, isLoading) {
    state.isLoading = isLoading;
  },
  updateToken(token) {
    state.token = token;
  },
  signupSuccess(state) {
    state.isLoading = false;
    state.errors = [];
  },

  signError(state, errors) {
    state.isLoading = false;
    console.log(errors.response.data);
    state.errors = errors.response.data;
  },
  modifyAccountSuccess(state, user) {
    state.data = user;
    state.isLoading = false;
    state.isLoggedIn = true;
    state.errors = [];
  },
  loginSuccess(state, data) {
    state.isLoading = false;
    state.errors = [];
    state.isLoggedIn = true;
    delete data.user.password;
    state.data = data.user;
    state.token = data.token;
  },
  signOut(state) {
    state.token = null;
  },
  fetchCurrentUserSuccess(state, user) {
    state.data = user;
    state.isLoading = false;
    state.isLoggedIn = true;
    state.errors = [];
  }
};
