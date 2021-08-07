export default async function({ $axios, store, redirect }) {
  const token = store.getters["user/token"];
  console.log(token);
  if (token != null) {
    $axios.setToken(token, "Bearer");
  }
}
