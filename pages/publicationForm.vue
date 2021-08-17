<template>
  <section class="mt-4 ">
    <article class="col-11 bg-secondary mx-auto rounded">
      <div class="d-flex flex-column py-4">
        <b-form @submit.prevent="trySubmit">
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
          <div class="d-flex justify-content-between">
            <nuxt-link class="btn btn-danger" to="/wall">Annuler</nuxt-link>
            <b-button variant="success" class="shadow" type="submit"
              >Valider</b-button
            >
          </div>
        </b-form>
      </div>
    </article>
  </section>
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
    }
  }
};
</script>
