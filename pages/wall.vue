<template>
  <section class="mt-4 ">
    <div class="d-flex justify-content-center mb-4">
      <b-button v-b-modal.createPost variant="info">
        <b-icon-journal-plus></b-icon-journal-plus> Nouveau post</b-button
      >
    </div>
    <CreatePost />
    <ModifyPost />
    <article
      v-for="post of posts"
      :key="post.id"
      class="col-11 bg-light mx-auto rounded py-2 mt-3 col-sm-8 col-lg-6 text-primary"
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
            icon="x"
            class="shadow ml-2"
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

      <div v-if="post.imageUrl !== null" id="imgContainer">
        <img id="imgContent" :src="post.imageUrl" />
      </div>
      <div
        class="mt-3 font-weight-bold text-center text-primary py-2 px-4 text-break"
      >
        {{ post.title }}
      </div>
      <div
        class="d-flex justify-content-start align-items-center px-4 py-2 text-break text-primary mt-1"
      >
        {{ post.content }}
      </div>
      <div
        class="d-flex justify-content-end mt-2"
        v-if="post.Comments.length > 0"
      >
        <b-button
          variant="light"
          v-b-toggle.collapse
          v-if="!showComment"
          @click="showComment = !showComment"
          ><b-icon-caret-down></b-icon-caret-down> Afficher
          {{ post.Comments.length }} commentaire(s)
        </b-button>
        <b-button
          variant="light"
          v-b-toggle.collapse
          v-if="showComment"
          @click="showComment = !showComment"
          ><b-icon-caret-up></b-icon-caret-up> Masquer
          {{ post.Comments.length }} commentaire(s)
        </b-button>
      </div>
      <hr />
      <b-collapse id="collapse">
        <div v-for="comment of post.Comments" :key="comment.id">
          <div class="d-flex mb-2 justify-content-between">
            <div class="d-flex align-items-center">
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
            <div
              v-if="comment.UserId === user.id || isAdmin == true"
              class="d-flex align-items-center justify-content-end"
            >
              <b-avatar
                v-b-tooltip.hover
                title="Supprimer"
                variant="danger"
                button
                icon="x"
                class="shadow"
                @click="deleteComment(comment.id, comment.PublicationId)"
                size="1.5rem"
              ></b-avatar>
              <b-avatar
                v-b-tooltip.hover
                title="Modifier"
                button
                v-b-modal.modifyComment
                icon="pen"
                variant="info"
                @click="getCurrentComment(comment.id)"
                class="shadow ml-2"
                size="1.5rem"
              ></b-avatar>
            </div>
          </div>
          <p
            class="bg-light mb-2 ml-5 mr-3 text-break textContainer w-auto px-4 py-2 shadow rounded-pill"
          >
            {{ comment.comment }}
          </p>
        </div>
      </b-collapse>
      <hr v-if="post.Comments.length > 0 && showComment" />
      <Comment :postId="post.id"></Comment>
      <ModifyComment :postId="post.id"></ModifyComment>
    </article>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import { mapState } from "vuex";

export default {
  data() {
    return {
      comment: "",
      index: -1,
      showComment: false
    };
  },
  beforeMount() {
    this.$store.dispatch("publication/getAllPost");
  },

  computed: {
    ...mapGetters({
      errors: "user/errors",
      isLoggedIn: "user/isLoggedIn",
      isAdmin: "user/isAdmin",
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
    },
    deleteComment(id, postId) {
      this.$store.dispatch("comment/tryDeleteComment", {
        id: id,
        postId: postId
      });
    },
    getCurrentComment(id) {
      this.$store.dispatch("comment/getOneComment", id);
    }
  },

  head: {
    title: "Groupomania Wall"
  }
};
</script>

<style lang="scss">
#imgContent {
  max-height: 150px;
  max-width: 100%;
}
#imgContainer {
  display: flex;
  justify-content: center;
  overflow: hidden;
  border-radius: 30px;
  width: fit-content;
  margin: 0 auto;
  box-shadow: 5px 5px 11px 0px #000000;
}

@keyframes slide-left {
  0% {
    opacity: 0;
  }
  100% {
    transform: translateX(-500px);
    opacity: 1;
  }
}
.slide-left-enter-active {
  animation: slide-left 0.3s;
}
.slide-left-leave-active {
  animation: slide-left 0.3s reverse;
}
</style>
