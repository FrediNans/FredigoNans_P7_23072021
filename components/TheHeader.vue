<template>
  <header>
    <div id="spacer"></div>
    <b-navbar
      fixed="top"
      id="header"
      toggleable="lg"
      type="dark"
      variant="primary"
      class="d-flex justify-content-between flex-wrap p-0"
    >
      <b-img
        src="../static/icon-left-white.png"
        fluid
        alt="logo"
        class="col-6 col-sm-4 col-lg-3"
      ></b-img>
      <div v-if="isLoggedIn" class="d-flex col-12 justify-content-end">
        <b-button
          @click="goTo"
          size="sm"
          variant="primary"
          class="text-white mr-2"
          >Mon compte</b-button
        >
        <b-button
          @click="trySubmit"
          size="sm"
          variant="primary"
          class="text-white"
        >
          Déconnexion
        </b-button>
      </div>
    </b-navbar>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  methods: {
    goTo() {
      this.$router.push("/account");
    },
    trySubmit() {
      this.$store.dispatch("user/tryLogout");
    }
  },
  computed: {
    ...mapGetters({
      isLoggedIn: "user/isLoggedIn",
      user: "user/currentUser"
    })
  }
};
</script>

<style lang="scss" scoped>
#header {
  height: 100px;
  margin-bottom: 100px;
}
#spacer {
  height: 100px;
}
</style>
