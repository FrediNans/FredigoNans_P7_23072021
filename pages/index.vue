<template>
  <section id="container" class="site-content">
    <h1 class="h3 text-danger text-center mt-4">
      Bienvenu sur votre réseau social d'entreprise !
    </h1>
    <b-form
      @submit="tryLogin"
      v-if="show"
      class="col-11 col-md-6 col-lg-4 mx-auto d-flex flex-column"
    >
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
      <div v-if="error.length" class="text-danger text-center mt-4">
        {{ error }}
      </div>
      <b-button
        type="submit"
        variant="info"
        class="mt-4"
        :class="{ disabled: isLoading }"
      >
        Se connecter
      </b-button>
      <nuxt-link class="btn btn-danger col-8 mt-5 mx-auto" to="/signup"
        >Inscription</nuxt-link
      >
    </b-form>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import { mapState } from "vuex";
export default {
  data() {
    return {
      form: {
        email: "",
        password: ""
      },

      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      show: true
    };
  },
  computed: {
    ...mapGetters({
      isLoading: "user/isLoading",
      error: "user/errors"
    }),
    ...mapState("user", {
      isLoggedIn: "isLoggedIn"
    })
  },
  updated() {
    if (this.isLoggedIn != false) {
      this.$router.push("/wall");
    }
  },
  methods: {
    tryLogin(event) {
      event.preventDefault();
      if (!this.isLoading) {
        this.$store.dispatch("user/tryLogin", this.form);
      }
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

<style lang="scss"></style>
