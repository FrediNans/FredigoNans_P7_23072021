<template>
  <div id="body">
    <BackgroundFilter />
    <TheHeader />
    <Nuxt />
    <TheFooter />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

// Vérification de la presence du token dans le local storage, si absent redirection vers la page login //
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
// scss qui s'applique à toute les vues //

body {
  background: url("../static/ville_nuit.webp") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
#body {
  margin: 0;
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
}
#__nuxt {
  flex: 1;
}
.btn:hover {
  box-shadow: 3px 3px 5px 0px #000000;
  border: 1px solid white;
  transform: scale(1.1);
  transition: all 0.2s;
}
article {
  border-radius: 10px;
}
@keyframes slide-left {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translateX(-500px);
  }
}
.slide-left-enter-active {
  animation: slide-left 0.5s;
}
.slide-left-leave-active {
  animation: slide-left 0.5s reverse;
}
</style>
