<template>
  <div class="d-flex flex-column rounded">
    <form @submit.prevent="trySubmit" class="d-flex">
      <b-form-input
        v-model="form.comment"
        class="rounded-pill shadow border-0"
        placeholder="Ecrire un commentaire ..."
        required
      ></b-form-input>
      <div class="d-flex ml-3 justify-content-center align-items-center">
        <b-avatar
          variant="info"
          icon="forward"
          button
          button-type="submit"
          size="2rem"
        ></b-avatar>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        comment: "",
        postId: this.postId
      }
    };
  },

  props: ["postId"],
  methods: {
    trySubmit() {
      const formData = new FormData();
      formData.append("data", JSON.stringify(this.form));
      this.$store.dispatch("comment/tryCreateComment", formData);
      this.form.comment = "";
    }
  }
};
</script>
