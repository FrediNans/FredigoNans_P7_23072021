<template>
  <section>
    <h1 class="text-center text-danger mt-4 h3">
      Modification de compte
    </h1>
    <b-form
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
          :placeholder="user.lastname"
          type="text"
          v-model="form.lastname"
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
          :placeholder="user.firstname"
          type="text"
          v-model="form.firstname"
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
          id="region"
          class="text-capitalize"
          :placeholder="user.region"
          type="text"
          v-model="form.region"
        >
        </b-form-input>
      </b-input-group>
      <ul v-if="errors.length">
        <li class="text-danger">
          {{ errors }}
        </li>
      </ul>
      <div class="d-flex justify-content-between mt-4">
        <b-button type="submit" variant="info" :class="{ disabled: isLoading }">
          Valider
        </b-button>
        <nuxt-link class="btn btn-danger" to="/account">Annuler</nuxt-link>
      </div>
    </b-form>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      canChange: true,
      form: {
        firstname: "",
        lastname: "",
        region: ""
      },
      show: true
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
  beforeMount() {
    if (!this.token) {
      this.$store.dispatch("user/fetchCurrentUser");
    }
  },
  methods: {
    trySubmit(event) {
      event.preventDefault();
      if (!this.isLoading) {
        if (this.form.firstname === "") {
          this.form.firstname = this.user.firstname;
        }
        if (this.form.lastname === "") {
          this.form.lastname = this.user.lastname;
        }
        if (this.form.region === "") {
          this.form.region = this.user.region;
        }
        this.$store.dispatch("user/modifyAccount", this.form);
      }
    }
  },
  head: {
    title: "Mon compte"
  }
};
</script>
