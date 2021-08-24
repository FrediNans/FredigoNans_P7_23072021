<template>
  <b-modal
    size="lg"
    id="modifyAccount"
    header-bg-variant="secondary"
    body-bg-variant="light"
    footer-bg-variant="secondary"
    centered
    ref="modal"
    title="Modification de compte"
  >
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
    trySubmit() {
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
};
</script>
