<template>
  <section>
    <h1 class="text-center text-danger mt-4 h3">Mon compte</h1>
    <div
      class="d-flex flex-column bg-secondary rounded col-11 col-md-6 col-lg-4 mx-auto mt-4"
    >
      <div class="font-weight-bold mt-3 text-primary text-capitalize">
        Nom : {{ user.lastname }}
      </div>
      <div class="font-weight-bold mt-3 text-primary text-capitalize">
        Prénom : {{ user.firstname }}
      </div>
      <div class="font-weight-bold mt-3 text-primary text-capitalize">
        Région : {{ user.region }}
      </div>
      <div class="font-weight-bold mt-3 mb-3 text-primary">
        Email : {{ user.email }}
      </div>
    </div>
    <div class="w-100 d-flex justify-content-center mt-4">
      <nuxt-link class="btn btn-danger" to="/modifyAccount">Modifier</nuxt-link>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      isLoading: "user/isLoading",
      user: "user/currentUser",
      isLoggedIn: "user/isLoggedIn"
    })
  }
};
</script>
