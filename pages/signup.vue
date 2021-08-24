<template>
  <section>
    <h1 class="text-center text-danger mt-4 h3">
      Création de compte
    </h1>
    <b-form
      v-if="show"
      @reset="onReset"
      @submit="trySubmit"
      class="col-11 col-md-6 col-lg-4 mx-auto d-flex flex-column"
    >
      <b-input-group class="mt-4">
        <b-input-group-prepend>
          <b-input-group-text>
            <b-icon-person-circle></b-icon-person-circle>
          </b-input-group-text>
        </b-input-group-prepend>
        <b-form-input
          class="text-capitalize"
          id="lastName"
          placeholder="Nom"
          type="text"
          v-model="form.lastname"
          required
        >
        </b-form-input>
      </b-input-group>
      <b-input-group class="mt-4">
        <b-input-group-prepend>
          <b-input-group-text>
            <b-icon-person-circle></b-icon-person-circle>
          </b-input-group-text>
        </b-input-group-prepend>
        <b-form-input
          class="text-capitalize"
          id="firstName"
          placeholder="Prénom"
          type="text"
          v-model="form.firstname"
          required
        >
        </b-form-input>
      </b-input-group>
      <b-input-group class="mt-4">
        <b-input-group-prepend>
          <b-input-group-text>
            <b-icon-map></b-icon-map>
          </b-input-group-text>
        </b-input-group-prepend>
        <b-form-input
          class="text-capitalize"
          id="region"
          placeholder="Région"
          type="text"
          v-model="form.region"
        >
        </b-form-input>
      </b-input-group>
      <b-input-group class="mt-4">
        <b-input-group-prepend>
          <b-input-group-text>
            <b-icon-envelope></b-icon-envelope>
          </b-input-group-text>
        </b-input-group-prepend>
        <b-form-input
          id="email"
          placeholder="monemail@mail.com"
          type="email"
          :state="isEmailValid()"
          v-model="form.email"
          required
        >
        </b-form-input>
      </b-input-group>
      <b-input-group class="mt-4">
        <b-input-group-prepend>
          <b-input-group-text>
            <b-icon-key></b-icon-key>
          </b-input-group-text>
        </b-input-group-prepend>
        <b-form-input
          id="password"
          type="password"
          v-model="form.password"
          placeholder="Mot de passe"
          required
        >
        </b-form-input>
      </b-input-group>
      <ul v-if="formErrors.length < 0">
        <li class="text-danger" v-for="error in formErrors" :key="error">
          {{ error }}
        </li>
      </ul>
      <div class="d-flex justify-content-end mt-4">
        <b-button
          v-b-tooltip.hover
          title="Annuler"
          variant="danger"
          type="reset"
          class="shadow "
          size="2.5rem"
          ><b-icon-x></b-icon-x
        ></b-button>
        <b-button
          v-b-tooltip.hover
          title="Valider"
          variant="info"
          icon="check2-circle"
          type="submit"
          class="shadow ml-3"
          size="2.5rem"
          ><b-icon-check2-circle></b-icon-check2-circle
        ></b-button>
      </div>
    </b-form>
    <b-modal
      size="lg"
      id="createAccountSuccess"
      header-bg-variant="secondary"
      body-bg-variant="primary"
      footer-bg-variant="secondary"
      centered
      ref="modal"
    >
      <p class="font-weight-bold text-danger text-center">
        Compte créer avec succès ! <br />
        Vous pouvez désormais vous connecter !
      </p>
      <template #modal-footer="{ ok }">
        <b-avatar
          v-b-tooltip.hover
          title="Valider"
          variant="info"
          button
          icon="check2-circle"
          @click="ok(), goLogin()"
          class="shadow"
          size="2rem"
        ></b-avatar>
      </template>
    </b-modal>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      formErrors: [],
      form: {
        firstname: "",
        lastname: "",
        email: "",
        password: ""
      },
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      show: true,
      message: "je suis une variable de l'enfant"
    };
  },
  computed: {
    ...mapGetters({
      isLoading: "user/isLoading",
      errors: "user/errors",
      isLoggedIn: "user/isLoggedIn"
    })
  },
  watch: {
    errors(newValue) {
      this.formErrors = newValue;
    }
  },
  methods: {
    async trySubmit(event) {
      event.preventDefault();
      if (!this.isLoading) {
        this.$store.dispatch("user/trySignup", this.form);
        this.$bvModal.show("createAccountSuccess");
      }
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.firstname = "";
      this.form.lastname = "";
      this.form.email = "";
      this.form.password = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
    goLogin() {
      this.$router.push("/");
    },
    isEmailValid() {
      if (this.form.email.length > 5) {
        return this.reg.test(this.form.email);
      } else {
        return null;
      }
    }
  }
};
</script>
<style lang="scss" scoped></style>
