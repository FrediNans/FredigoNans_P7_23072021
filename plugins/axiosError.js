export default function({ $axios, redirect }) {
  $axios.onError(error => {
    if (error.response.status === 500) {
      console.log(error);
      redirect("/sorry");
    }
    if (error.response.status === 400) {
      console.log(error);
      redirect("/expiredSession");
    }
    return error;
  });
}
