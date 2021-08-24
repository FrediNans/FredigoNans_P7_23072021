<template>
  <div>
    <h1 class="h4 text-danger text-center my-4">
      Désolés, nous ne parvenons pas à contacter le serveur !
    </h1>
    <b-img
      fluid
      center
      src="https://media.giphy.com/media/3o6ZtaRlFW0zPiTb0c/giphy.gif"
    ></b-img>
    <div class="d-flex justify-content-center">
      <nuxtLink class="btn btn-danger my-4" to="/wall">Retour</nuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>
