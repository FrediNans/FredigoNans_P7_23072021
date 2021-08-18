export const state = () => ({
  publication: {},
  posts: {},
  currentPost: {},
  token: localStorage.getItem("token"),
  isAuthor: false,
  errors: []
});

export const getters = {
  publication: state => state.publication,
  errors: state => state.errors,
  token: state => state.token,
  posts: state => state.posts,
  currentPost: state => state.currentPost
};

export const actions = {
  async tryCreatePublication(context, file) {
    try {
      const response = await this.$axios.post(
        "http://localhost:8080/publication/new",
        file
      );
      context.commit("createPublicationSuccess", response.data);
    } catch (error) {
      console.log(error);
    }
  },

  async tryModifyPost(context, credentials) {
    try {
      console.log(credentials);
      const response = await this.$axios.put(
        `http://localhost:8080/publication/modifyPost`,
        credentials
      );
      context.commit("modifyPostSuccess", response.data);
    } catch (error) {
      console.log(error);
    }
  },

  async getAllPost(context) {
    try {
      const response = await this.$axios.get(
        "http://localhost:8080/publication/all"
      );
      context.commit("getAllPostSuccess", response.data);
    } catch (error) {
      console.log(error);
    }
  },

  async getCurrentPost(context, credentials) {
    if (credentials > -1) {
      context.commit("getCurrentPostSuccess", credentials);
    }
  },
  async deletePost(context, credentials) {
    if (credentials > 0) {
      try {
        const response = await this.$axios.delete(
          `http://localhost:8080/publication/deletePost/${credentials}`
        );
        context.commit("deletePostSuccess", credentials);
      } catch (error) {
        console.log(error);
      }
    }
  }
};

export const mutations = {
  createPublicationSuccess(state, data) {
    state.publication = data;
    this.$router.push("/wall");
  },
  getAllPostSuccess(state, data) {
    state.posts = data;
  },
  getCurrentPostSuccess(state, data) {
    state.currentPost = state.posts.find(p => {
      if (p.id === data) {
        return p;
      }
    });
  },
  updateCurrentPost(state, data) {
    state.currentPost.map(p => {
      if (p.id == data.id) {
        p.title = data.title;
        p.content = data.content;
        p.imageUrl = data.imageUrl;
      }
      return p;
    });
  },
  updateCurrentPostTitle(state, data) {
    state.currentPost.title = data;
  },
  updateCurrentPostContent(state, data) {
    state.currentPost.content = data;
  },
  modifyPostSuccess(state, data) {
    state.posts = state.posts.map(p => {
      if (p.id == data.id) {
        p.title = data.title;
        p.content = data.content;
        p.imageUrl = data.imageUrl;
      }
      return p;
    });
  },
  deletePostSuccess(state, data) {
    const index = state.posts.findIndex(p => p.id == data);
    state.posts.splice(index, 1);
  },
  createCommentSuccess(state, data) {
    console.log(data);
    // state.posts = state.posts.map(p => {
    //  if (p.id == data.id) {
    // }
    // return p;
    // });
  }
};
