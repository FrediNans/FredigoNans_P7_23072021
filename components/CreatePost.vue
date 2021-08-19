<template>
  <b-modal
    size="lg"
    id="createPost"
    scrollable
    header-bg-variant="secondary"
    body-bg-variant="light"
    footer-bg-variant="secondary"
    centered
    ref="modal"
    title="Créer un post"
  >
    <div class="d-flex flex-column py-4">
      <b-form>
        <b-form-input
          v-model="form.title"
          type="text"
          placeholder="Ajouter un titre ..."
          required
        ></b-form-input>
        <div class="d-flex justify-content-between flex-wrap my-2">
          <b-form-file
            @change="onFileAdded"
            v-model="image"
            accept="image/jpeg, image/png, image/gif"
            browse-text="Parcourir"
            :state="Boolean(image)"
            placeholder="Choisir une image ..."
          ></b-form-file>
        </div>
        <b-img
          v-if="imagePreview != null"
          thumbnail
          center
          fluid
          :src="imagePreview"
          alt=""
        ></b-img>
        <div v-if="imagePreview" class="mx-auto mt-2">
          <b-button class="mb-2 shadow" variant="danger">
            Annuler
          </b-button>
        </div>

        <b-form-textarea
          class="mb-2"
          v-model="form.content"
          placeholder="Ecrire votre texte ..."
          rows="3"
          max-rows="12"
        ></b-form-textarea>
      </b-form>
    </div>
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
const FormData = require("form-data");
export default {
  data() {
    return {
      imagePreview: null,
      image: null,
      form: {
        title: "",
        content: ""
      }
    };
  },
  computed: {
    ...mapGetters({
      isLoading: "user/isLoading",
      errors: "user/errors",
      isLoggedIn: "user/isLoggedIn",
      user: "user/currentUser",
      token: "user/token"
    })
  },
  methods: {
    onFileAdded(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    },

    trySubmit() {
      const formData = new FormData();
      formData.append("image", this.image);
      formData.append("title", this.form.title);
      formData.append("content", this.form.content);

      this.$store.dispatch("publication/tryCreatePublication", formData);
      this.form.title = "";
      this.form.content = "";
      this.image = null;
      this.imagePreview = null;
    }
  }
};
</script>
