<template>
  <div>
    <b-form
      @submit="onSubmit"
      @reset="onReset"
      v-if="show"
      class="w-50 mx-auto"
    >
      <b-input-group>
        <b-input-group-prepend>
          <b-input-group-text>
            <b-icon-person-circle></b-icon-person-circle>
          </b-input-group-text>
        </b-input-group-prepend>
        <b-form-input
          id="firstName"
          placeholder="Nom"
          type="text"
          v-model="form.firstName"
          required
        >
        </b-form-input>
      </b-input-group>
      <b-input-group>
        <b-input-group-prepend>
          <b-input-group-text>
            <b-icon-person-circle></b-icon-person-circle>
          </b-input-group-text>
        </b-input-group-prepend>
        <b-form-input
          id="lastName"
          placeholder="Prénom"
          type="text"
          v-model="form.lastName"
          required
        >
        </b-form-input>
      </b-input-group>
      <b-input-group>
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
        >
        </b-form-input>
      </b-input-group>
      <b-input-group>
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
        >
        </b-form-input>
      </b-input-group>
      <b-button type="submit" variant="primary">Inscription</b-button>
      <b-button type="reset" variant="danger">Effacer</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      },
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      show: true
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset(event) {
      event.preventDefault();
      // Reset our form values
      this.form.firstName = "";
      this.form.lastName = "";
      this.form.email = "";
      this.form.password = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
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

<style scoped></style>
