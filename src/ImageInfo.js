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
      this.$imageInfo.style.display = "block";

      this.$imageInfo.querySelector(".close").addEventListener("click", (e) => {
        this.onClose(this.data);
      });
      this.$imageInfo
        .querySelector(".content-wrapper")
        .addEventListener("click", (e) => {
          e.stopPropagation();
        });
      this.$imageInfo.addEventListener("click", ({ target }) => {
        this.onClose(this.data);
      });
      document.addEventListener("keyup", ({ key }) => {
        if (key === "Escape") this.onClose(this.data);
      });
    } else {
      this.$imageInfo.style.display = "none";
    }
  }
}
