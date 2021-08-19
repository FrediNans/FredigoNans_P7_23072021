<template>
  <b-modal
    size="lg"
    id="modifyComment"
    header-bg-variant="secondary"
    body-bg-variant="light"
    footer-bg-variant="secondary"
    centered
    ref="modal"
    title="Modifier votre commentaire"
  >
    <b-form>
      <input
        @input="updateComment"
        :value="currentCommentContent"
        type="text"
        class="form-control"
        placeholder="Ecrire un commentaire ..."
      />
    </b-form>
    <template #modal-footer="{ ok, cancel }">
      <b-avatar
        v-b-tooltip.hover
        title="Annuler"
        variant="danger"
        button
        icon="arrow-left"
        @click="cancel()"
        class="shadow"
        size="2rem"
      ></b-avatar>
      <b-avatar
        v-b-tooltip.hover
        title="Valider"
        variant="info"
        button
        icon="check2-circle"
        @click="trySubmit(), ok()"
        class="shadow"
        size="2rem"
      ></b-avatar>
    </template>
  </b-modal>
</template>

<script>
import { mapGetters } from "vuex";
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  props: ["postId"],
  computed: {
    ...mapGetters({
      currentComment: "comment/currentComment"
    }),
    ...mapState("comment", {
      currentCommentContent: state => state.currentComment.comment
    })
  },
  methods: {
    updateComment(e) {
      this.$store.commit("comment/updateCurrentComment", e.target.value);
    },
    trySubmit() {
      console.log(this.currentComment);
      this.$store.dispatch("comment/tryModifyComment", {
        postId: this.postId,
        id: this.currentComment.id,
        comment: this.currentComment.comment
      });
    }
  }
};
</script>
