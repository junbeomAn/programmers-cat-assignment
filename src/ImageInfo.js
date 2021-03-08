class ImageInfo {
  $imageInfo = null;
  data = null;
  onClose = null;

  constructor({ $target, data, onClose }) {
    const $imageInfo = document.createElement("div");
    $imageInfo.className = "ImageInfo";
    this.$imageInfo = $imageInfo;
    $target.appendChild($imageInfo);

    this.data = data;
    this.onClose = onClose;
    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    if (this.data.visible) {
      const { name, url, temperament, origin } = this.data.image;
      this.$imageInfo.style.display = "block";
      this.$imageInfo.className = `${this.$imageInfo.className} fade-in`;
      this.$imageInfo.innerHTML = `
		  <div class="content-wrapper">
        <div class="title">
          <span>${name}</span>
          <div class="close">x</div>
        </div>
        <img src="${url}" alt="${name}"/>
        <div class="description">
          <div>성격: ${temperament}</div>
          <div>태생: ${origin}</div>
        </div>
		  </div>`;

      this.$imageInfo.querySelector(".close").addEventListener("click", () => {
        this.$imageInfo.classList.add("fade-out");
      });
      this.$imageInfo
        .querySelector(".content-wrapper")
        .addEventListener("click", (e) => {
          e.stopPropagation();
        });
      this.$imageInfo.addEventListener("click", function () {
        this.classList.add("fade-out");
      });
      this.$imageInfo.addEventListener("animationend", () => {
        if (this.$imageInfo.classList.contains("fade-out")) {
          this.onClose(this.data);
          this.$imageInfo.classList.remove("fade-out");
        } else if (this.$imageInfo.classList.contains("fade-in")) {
          this.$imageInfo.classList.remove("fade-in");
        }
      });
      document.addEventListener("keyup", ({ key }) => {
        if (key === "Escape") {
          this.$imageInfo.classList.add("fade-out");
        }
      });
    } else {
      this.$imageInfo.style.display = "none";
    }
  }
}
