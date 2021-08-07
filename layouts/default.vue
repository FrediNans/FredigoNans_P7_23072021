<template>
  <div>
    <BackgroundFilter />
    <TheHeader />
    <Nuxt />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("user", ["token"])
  },
  beforeMount() {
    if (this.token) {
      this.$store.dispatch("user/fetchCurrentUser");
    } else {
      this.$router.push("/");
    }
  }
};
</script>
<style lang="scss">
body {
  background: url("../static/ville_nuit.webp") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
</style>
