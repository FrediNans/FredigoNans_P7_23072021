export const state = () => ({
  data: {},
  isLoading: false,
  isLoggedIn: false,
  token: localStorage.getItem("token"),
  errors: []
});

export const getters = {
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
    } catch (error) {
      context.commit("signError", error);
    }
  },

  async trySignup(context, user) {
    try {
      context.commit("updateIsLoading", true);
      await this.$axios.post("http://localhost:8080/user/signup", user);
      context.commit("signupSuccess");
    } catch (err) {
      context.commit("signError", err);
    }
  },

  async fetchCurrentUser(context, credentials) {
    try {
      context.commit("updateIsLoading", true);
      const response = await this.$axios.get("/user/account", credentials);
      context.commit("fetchCurrentUserSuccess", response.data);
    } catch (error) {
      context.commit("signError", error);
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
  },

  async tryDeleteAccount(context, credentials) {
    try {
      context.commit("updateIsLoading", true);
      const response = await this.$axios.delete(
        `/user/deleteUser/${credentials}`
      );
      localStorage.removeItem("token");
      context.commit("deleteAccountSuccess", response);
      this.$router.push("/");
    } catch (error) {
      console.log(error);
    }
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

  signError(state, err) {
    state.isLoading = false;
    console.log(err);
    state.errors.push(err);
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
  },
  deleteAccountSuccess(state, response) {
    if ((response.status = 201)) {
      state.data = {};
      state.isLoading = false;
      state.isLoggedIn = false;
      state.errors = [];
      state.token = null;
    }
  }
};
