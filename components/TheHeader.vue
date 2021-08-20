<template>
  <header>
    <div id="spacer"></div>
    <b-navbar
      fixed="top"
      id="header"
      toggleable="lg"
      type="dark"
      variant="primary"
      class="d-flex justify-content-between"
    >
      <b-img
        src="../static/icon-left-white.png"
        fluid
        alt="logo"
        class="col-7 col-sm-4"
      ></b-img>
      <div v-if="isLoggedIn" class="d-flex flex-column">
        <div class="d-flex justify-content-center pt-2">
          <b-avatar
            button
            @click="goTo"
            variant="info"
            v-b-tooltip.hover
            title="Mon compte"
          ></b-avatar>
        </div>
        <div @click="trySubmit" class="text-white text-center btn">
          Déconnexion
        </div>
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
      isLoggedIn: "user/isLoggedIn"
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
