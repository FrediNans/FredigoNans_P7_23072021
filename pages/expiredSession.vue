<template>
  <div>
    <h1 class="h4 text-danger text-center my-4">
      Votre session a expiré merci de vous reconnecter !
    </h1>
    <b-img
      center
      fluid
      src="https://media.giphy.com/media/lvQe7YwEEJoaIluvs6/giphy.gif"
    ></b-img>
    <div class="d-flex justify-content-center">
      <nuxt-link class="btn btn-danger mx-auto my-4" to="/"
        >Connexion</nuxt-link
      >
    </div>
  </div>
</template>
