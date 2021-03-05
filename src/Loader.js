class Loader {
  $target = null;
  $wrapper = null;

  constructor({ $target }) {
    const $wrapper = document.createElement("div");
    const $loader = document.createElement("div");
    $wrapper.className = "loading-wrapper";
    $loader.className = "loader";

    $loader.innerText = "loading";
    $wrapper.appendChild($loader);
    this.$target = $target;
    this.$wrapper = $wrapper;
  }

  setLoader(loading) {
    if (loading) {
      this.$target.appendChild(this.$wrapper);
    } else {
      this.$target.removeChild(this.$wrapper);
    }
  }
}
