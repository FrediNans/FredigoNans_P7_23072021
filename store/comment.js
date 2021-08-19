export const state = () => ({
  currentComment: {},
  errors: []
});

export const getters = {
  currentComment: state => state.currentComment,
  errors: state => state.errors
};

export const actions = {
  async tryCreateComment(store, credentials) {
    try {
      const response = await this.$axios.post(
        "http://localhost:8080/comment/new",
        credentials
      );
      if ((response.satus = 201)) {
        store.dispatch("publication/getOnePost", response.data.PublicationId, {
          root: true
        });
      }
    } catch (error) {
      console.log(error);
    }
  },

  async getOneComment(context, credentials) {
    try {
      const response = await this.$axios.get(
        `http://localhost:8080/comment/${credentials}`
      );
      context.commit("getOneCommentSuccess", response);
    } catch (error) {
      console.log(error);
    }
  },
  async tryDeleteComment(store, credentials) {
    try {
      const response = await this.$axios.delete(
        `http://localhost:8080/comment/deleteComment/${credentials.id}`
      );
      if ((response.satus = 200)) {
        store.dispatch("publication/getOnePost", credentials.postId, {
          root: true
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  async tryModifyComment(store, credentials) {
    console.log(credentials);
    try {
      const response = await this.$axios.put(
        `http://localhost:8080/comment/modifyComment/${credentials.id}`,
        credentials
      );
      if ((response.satus = 200)) {
        store.dispatch("publication/getOnePost", credentials.postId, {
          root: true
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
};

export const mutations = {
  getOneCommentSuccess(state, response) {
    state.currentComment = response.data;
  },
  updateCurrentComment(state, data) {
    state.currentComment.comment = data;
  }
};
