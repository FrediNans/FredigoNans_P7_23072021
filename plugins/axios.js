export default function({ $axios, store }) {
  $axios.onRequest(config => {
    if (store.state.user.token) {
      config.headers.common[
        "Authorization"
      ] = `Bearer ${store.state.user.token}`;
    }
  });
}
