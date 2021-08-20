<template>
  <b-modal
    size="lg"
    id="modifyPost"
    scrollable
    header-bg-variant="secondary"
    body-bg-variant="secondary"
    footer-bg-variant="secondary"
    centered
    ref="modal"
    title="Modifier votre post"
  >
    <div class="d-flex flex-column py-4">
      <div class="mx-auto col-10">
        <b-form>
          <input
            class="form-control"
            :value="title"
            @input="updateTitle"
            type="text"
            placeholder="Ajouter un titre ..."
          />
          <div class="d-flex justify-content-between my-2">
            <b-form-file
              @change="onFileAdded"
              v-model="image"
              accept="image/jpeg, image/png, image/gif"
              browse-text="Parcourir"
              :state="Boolean(image)"
              placeholder="Changer image ..."
            ></b-form-file>
          </div>
          <div class="mb-2" v-if="imagePreview">
            <b-img thumbnail center fluid :src="imagePreview" alt=""> </b-img>
          </div>
          <div
            v-if="
              currentPost.imageUrl != null && !imagePreview && isImageDeleted
            "
          >
            <div class="mb-2 position-relative">
              <b-avatar
                v-b-tooltip.hover
                title="Supprimer"
                variant="danger"
                button
                icon="x-circle"
                class="shadow position-absolute ml-2 mt-2"
                size="2rem"
                @click="deleteImage"
              >
              </b-avatar>
              <b-img thumbnail center fluid :src="imageUrl" alt=""> </b-img>
            </div>
          </div>
          <textarea
            class="mb-2 col-12  form-control"
            :value="content"
            @input="updateContent"
            rows="6"
          ></textarea>
        </b-form>
      </div>
    </div>
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
import { mapState } from "vuex";
export default {
  data() {
    return {
      imagePreview: null,
      image: null,
      imageToDelete: null,
      isImageDeleted: true
    };
  },
  created() {},
  computed: {
    ...mapGetters({
      isLoggedIn: "user/isLoggedIn",
      currentPost: "publication/currentPost"
    }),
    ...mapState("publication", {
      title: state => state.currentPost.title,
      content: state => state.currentPost.content,
      imageUrl: state => state.currentPost.imageUrl
    })
  },
  methods: {
    updateTitle(e) {
      this.$store.commit("publication/updateCurrentPostTitle", e.target.value);
    },
    updateContent(e) {
      this.$store.commit(
        "publication/updateCurrentPostContent",
        e.target.value
      );
    },
    onFileAdded(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    },

    async trySubmit() {
      const formData = new FormData();
      formData.append("image", this.image);
      formData.append("imageToDelete", this.imageToDelete);
      formData.append("postId", this.currentPost.id);
      formData.append("post", JSON.stringify(this.currentPost));
      this.$store.dispatch("publication/tryModifyPost", formData);
      this.imageToDelete = null;
      this.isImageDeleted = true;
      this.imagePreview = null;
      this.image = null;
    },
    deleteImage() {
      this.imageToDelete = this.currentPost.imageUrl;
      this.isImageDeleted = false;
    }
  }
};
</script>
