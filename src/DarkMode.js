class DarkMode {
  $darkMode = null;
  $screen = null;

  constructor({ $target }) {
    const darkMode = document.createElement("button");
    const screen = document.body;

    if (screen.style.backgroundColor === "#000") {
      darkMode.className = "to-non-dark-mode";
    } else {
      darkMode.className = "to-dark-mode";
    }
    this.$darkMode = darkMode;
    this.$screen = screen;
    darkMode.addEventListener("click", () => {
      this.toggleMode();
    });
    $target.appendChild(darkMode);
    this.render();
  }
  toggleMode() {
    if (this.$darkMode.classList.contains("to-non-dark-mode")) {
      this.$darkMode.classList.remove("to-non-dark-mode");
      this.$darkMode.classList.add("to-dark-mode");
      this.$screen.style.backgroundColor = "#FFF";
      this.$screen.style.color = "#000";
    } else if (this.$darkMode.classList.contains("to-dark-mode")) {
      this.$darkMode.classList.remove("to-dark-mode");
      this.$darkMode.classList.add("to-non-dark-mode");
      this.$screen.style.backgroundColor = "#000";
      this.$screen.style.color = "#FFF";
    }
    this.render();
  }
  render() {
    if (this.$darkMode.classList.contains("to-non-dark-mode")) {
      this.$darkMode.innerText = "DarkMode OFF";
    } else {
      this.$darkMode.innerText = "DarkMode ON";
    }
  }
}
