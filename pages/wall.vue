<template>
  <section class="mt-4 ">
    <div class="d-flex justify-content-center mb-4">
      <nuxt-link id="postButton" class="btn btn-info" to="/publicationForm">
        <b-icon-journal-plus></b-icon-journal-plus> Nouveau post</nuxt-link
      >
    </div>
    <modifyPost />
    <article
      v-for="post of posts"
      :key="post.id"
      class="col-11 bg-secondary mx-auto rounded py-2 mt-3 col-sm-8 col-lg-7 text-primary"
    >
      <div class="d-flex justify-content-between">
        <div class="d-flex">
          <b-avatar variant="info"></b-avatar>
          <div class="d-flex align-items-center ml-2 font-weight-bold">
            {{
              post.User.lastname.charAt(0).toUpperCase() +
                post.User.lastname.slice(1) +
                " " +
                post.User.firstname.charAt(0).toUpperCase() +
                post.User.firstname.slice(1)
            }}
          </div>
        </div>

        <div
          v-if="post.UserId === user.id || isAdmin"
          class="d-flex align-items-center justify-content-end"
        >
          <b-avatar
            v-b-tooltip.hover
            title="Supprimer"
            variant="danger"
            button
            icon="x-circle"
            class="shadow"
            @click="deletePost(post.id)"
            size="2rem"
          ></b-avatar>
          <b-avatar
            v-b-tooltip.hover
            title="Modifier"
            button
            v-b-modal.modifyPost
            icon="pen"
            variant="info"
            @click="getCurrentPost(post.id)"
            class="shadow ml-2"
            size="2rem"
          ></b-avatar>
        </div>
      </div>
      <hr />
      <div class="mt-2 font-weight-bold text-center">
        {{ post.title }}
      </div>
      <div
        v-if="post.imageUrl !== null"
        class="d-flex justify-content-center py-3"
      >
        <img id="imgContent" :src="post.imageUrl" />
      </div>
      <div class="d-flex justify-content-start align-items-center px-2">
        <p class="my-2">{{ post.content }}</p>
      </div>
      <hr />
      <div v-for="comment of post.Comments" :key="comment.id">
        <div class="d-flex mb-2">
          <b-avatar size="2rem" variant="info"></b-avatar>
          <div class="d-flex align-items-center font-weight-bold ml-2">
            {{
              comment.User.lastname.charAt(0).toUpperCase() +
                comment.User.lastname.slice(1) +
                " " +
                comment.User.firstname.charAt(0).toUpperCase() +
                comment.User.firstname.slice(1)
            }}
          </div>
        </div>
        <p
          class="bg-light mb-2 ml-5 mr-3 text-break rounded-pill w-auto px-4 py-2 shadow"
        >
          {{ comment.comment }}
        </p>
      </div>
      <hr v-if="post.Comments.length > 0" />
      <comment :postId="post.id"></comment>
    </article>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import { mapState } from "vuex";
import Comment from "../components/comment.vue";
import modifyPost from "../components/modifyPost.vue";

export default {
  components: {
    modifyPost,
    Comment
  },
  data() {
    return {
      comment: "",
      isAdmin: false,
      index: -1
    };
  },
  beforeMount() {
    this.$store.dispatch("publication/getAllPost");
  },

  computed: {
    ...mapGetters({
      errors: "user/errors",
      isLoggedIn: "user/isLoggedIn",
      user: "user/currentUser"
    }),
    ...mapState("publication", {
      currentPost: "currentPost",
      posts: "posts"
    })
  },
  methods: {
    getCurrentPost(id) {
      this.$store.dispatch("publication/getCurrentPost", id);
    },
    deletePost(id) {
      this.$store.dispatch("publication/deletePost", id);
    }
  },

  head: {
    title: "Groupomania Wall"
  }
};
</script>

<style lang="scss" scoped>
#imgContent {
  max-width: 100%;
  max-height: 250px;
  object-fit: cover;
}
</style>
