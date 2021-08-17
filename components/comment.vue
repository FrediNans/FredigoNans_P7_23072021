<template>
  <div class="d-flex">
    <b-form-input
      v-model="comment"
      placeholder="Ecrire un commentaire ..."
    ></b-form-input>
    <div class="d-flex ml-3 justify-content-center align-items-center">
      <b-avatar variant="info" icon="forward" button size="2rem"></b-avatar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      comment: ""
    };
  },
  methods: {
    trySubmit() {
      console.log();

      const formData = new FormData();
      formData.append("image", this.image);
      formData.append("post", JSON.stringify(this.currentPost));
      this.$store.dispatch("comment/tryModifyPost", formData);
    }
  }
};
</script>
