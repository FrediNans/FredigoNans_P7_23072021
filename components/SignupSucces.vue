<template>
  <b-modal
    size="lg"
    id="createAccountSuccess"
    header-bg-variant="secondary"
    body-bg-variant="primary"
    footer-bg-variant="secondary"
    centered
    ref="createAccountSuccess"
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
        @click="ok()"
        class="shadow"
        size="2rem"
      ></b-avatar>
    </template>
  </b-modal>
</template>
