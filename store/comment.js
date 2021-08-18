export const state = () => ({
  comment: {},
  comments: [],
  errors: []
});

export const getters = {
  comment: state => state.comment,
  comments: state => state.comments,
  errors: state => state.errors
};

export const actions = {
  async tryCreateComment(store, credentials) {
    try {
      const response = await this.$axios.post(
        "http://localhost:8080/comment/new",
        credentials
      );
    } catch (error) {
      console.log(error);
    }
  },
  async getAllCommentForThisPost(context, credentials) {
    try {
      const response = await this.$axios.get(
        `http://localhost:8080/comment/all/${credentials}`
      );
      commit("comment/publication/getAllCommentSuccess", response.data);
    } catch (error) {
      console.log(error);
    }
  }
};

export const mutations = {
  getAllCommentSuccess(state, data) {
    state.comments = data;
  }
};
