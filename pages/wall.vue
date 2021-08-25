<template>
  <section class="mt-4">
    <nav id="nav" class="mb-4 py-2">
      <div
        class="d-flex flex-sm-column col-sm-2 justify-content-center align-items-sm-center"
      >
        <b-avatar
          v-b-tooltip.hover
          title="Rafraichir les posts"
          button
          icon="arrow-repeat"
          variant="info"
          @click="refreshPost()"
          class="shadow mr-5 mr-sm-0"
          size="2rem"
        ></b-avatar>
        <b-avatar
          v-b-tooltip.hover
          title="Créer un post"
          v-b-modal.createPost
          variant="info"
          class="shadow my-sm-3"
          size="2rem"
          icon="journal-plus"
        >
        </b-avatar>
        <b-avatar
          v-b-tooltip.hover
          title="Afficher les commentaires"
          class="ml-5 ml-sm-0 shadow"
          variant="info"
          button
          icon="chat"
          v-b-toggle.collapse
          v-if="!showComment"
          @click="showComment = !showComment"
          size="2rem"
        >
        </b-avatar>
        <b-avatar
          v-b-tooltip.hover
          title="Masquer les commentaires"
          class="ml-5 ml-sm-0 shadow"
          variant="info"
          button
          icon="chat-dots"
          v-b-toggle.collapse
          v-if="showComment"
          @click="showComment = !showComment"
          size="2rem"
        >
        </b-avatar>
      </div>
    </nav>
    <CreatePost />
    <ModifyPost />
    <article
      v-for="post of posts"
      :key="post.id"
      class="col-11 bg-light mx-auto py-2 mt-5 mt-sm-2 col-sm-8 col-lg-6 text-primary slide-left-enter-active slide-left-leave-active"
    >
      <div class="d-flex justify-content-between">
        <div class="d-flex">
          <b-avatar
            variant="info"
            src=""
            :text="
              post.User.lastname.charAt(0).toUpperCase() +
                post.User.firstname.charAt(0).toUpperCase()
            "
          ></b-avatar>
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
          v-if="user.isAdmin || post.UserId === user.id"
          class="d-flex align-items-center justify-content-end"
        >
          <b-avatar
            v-b-tooltip.hover
            title="Supprimer"
            variant="danger"
            button
            icon="x"
            class="ml-2"
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
            class="ml-2"
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
        v-if="post.Comments.length > 0"
        class="d-flex justify-content-end text-muted"
      >
        <div>{{ post.Comments.length }} commentaires</div>
      </div>
      <hr />
      <b-collapse id="collapse">
        <div
          v-for="comment of post.Comments"
          :key="comment.id"
          class="slide-left-enter-active slide-left-leave-active"
        >
          <div class="d-flex mb-2 justify-content-between">
            <div class="d-flex align-items-center">
              <b-avatar
                size="2rem"
                :text="
                  comment.User.lastname.charAt(0).toUpperCase() +
                    comment.User.firstname.charAt(0).toUpperCase()
                "
                variant="info"
              ></b-avatar>
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
              v-if="comment.UserId === user.id || user.isAdmin == true"
              class="d-flex align-items-center justify-content-end"
            >
              <b-avatar
                v-b-tooltip.hover
                title="Supprimer"
                variant="danger"
                button
                icon="x"
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
                class=" ml-2"
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
      <CommentForm :postId="post.id"></CommentForm>
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
    },
    refreshPost() {
      this.$store.dispatch("publication/getAllPost");
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
  border-radius: 10px;
  border: 1px solid white;
  width: fit-content;
  margin: 0 auto;
  box-shadow: 5px 5px 11px 0px #000000;
}
#nav {
  position: fixed;
  top: 99px;
  width: 100%;
  z-index: 2;
  background: $primary;
}
@media screen and(min-width: 750px) {
  #nav {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    top: 125px;
    background: transparent;
  }
}
</style>
