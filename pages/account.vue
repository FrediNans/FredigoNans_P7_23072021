<template>
  <section>
    <h1 class="text-center text-danger mt-4 h3">Mon compte</h1>
    <article
      class="d-flex flex-column bg-secondary col-11 col-md-6 col-lg-4 mx-auto mt-4"
    >
      <div class="d-flex justify-content-between">
        <div class="font-weight-bold mt-3 text-primary text-capitalize">
          Nom : {{ user.lastname }}
        </div>
        <b-avatar
          v-b-tooltip.hover
          title="Supprimer mon compte"
          variant="danger"
          button
          icon="x"
          class="shadow ml-2 mt-2"
          size="2rem"
          v-b-modal.deleteAccount
        >
        </b-avatar>
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
      <div class="d-flex justify-content-end mb-4 p-0 col-12">
        <b-avatar
          v-b-tooltip.hover
          title="Retour"
          variant="danger"
          button
          @click="goBack()"
          icon="arrow-left"
          class="shadow"
          size="2rem"
        ></b-avatar>
        <b-avatar
          v-b-tooltip.hover
          title="Modifier votre compte"
          v-b-modal.modifyAccount
          variant="info"
          button
          icon="pen"
          class="shadow  ml-3"
          size="2rem"
        ></b-avatar>
      </div>
    </article>

    <ModifyAccount />
    <b-modal
      size="lg"
      id="deleteAccount"
      header-bg-variant="secondary"
      body-bg-variant="primary"
      footer-bg-variant="secondary"
      centered
      ref="modal"
      title="Supprimer mon compte"
    >
      <p class="font-weight-bold text-danger text-center">
        Cette action est irréversible ! <br />
        Voulez-vous continuer ?
      </p>
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
  },

  methods: {
    trySubmit() {
      this.$store.dispatch("user/tryDeleteAccount", this.user.id);
    },
    goBack() {
      this.$router.push("/wall");
    }
  }
};
</script>
