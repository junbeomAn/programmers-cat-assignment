class SearchResult {
  $searchResult = null;
  data = null;
  onClick = null;
  loading = false;
  isScrollPaging = false;
  loadMore = null;
  page = 1;

  constructor({ $target, initialData, onClick, loadMore }) {
    this.$searchResult = document.createElement("div");
    this.$searchResult.className = "SearchResult";
    $target.appendChild(this.$searchResult);

    this.loader = new Loader({
      $target: this.$searchResult,
    });

    // this.data = initialData;
    this.onClick = onClick;
    this.loadMore = loadMore;
    this.createObserver = this.createObserver.bind(this);
    this.render();
  }

  createObserver() {
    let io;

    const options = {
      rootMargin: "0px 0px -30px 0px",
    };

    const callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        this.loadMore(this.page + 1);
        this.page = this.page + 1;
      });
    };

    io = new IntersectionObserver(callback, options);
    const lastChild = this.$searchResult.lastElementChild;
    if (lastChild && lastChild.classList.contains("item")) {
      io.observe(lastChild);
    }
  }

  setState(nextData, loading) {
    this.data = nextData;
    this.loading = loading;
    this.render();
  }

  setScrollPaging(isScrollPaging) {
    this.isScrollPaging = isScrollPaging;
  }

  makeDOMString(data) {
    return data
      .map(
        (cat, i) => `
			<div class="item" id="${i}">
				<img class="cat-image" src=${cat.url} alt=${cat.name} />
			</div>
		`
      )
      .join("");
  }

  parseDOMString(str) {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = str;
    const arr = Array.from(wrapper.children);
    return arr;
  }

  appendDOMString(target, str) {
    const arr = this.parseDOMString(str);
    target.append(...arr);
  }

  render() {
    if (this.isScrollPaging) {
      if (this.loading === false) {
        this.loader.setLoader(false);
        const lastChildId = Number(this.$searchResult.lastElementChild.id);
        const nextData = this.data.slice(lastChildId + 1);
        this.appendDOMString(this.$searchResult, this.makeDOMString(nextData));
        setTimeout(this.createObserver, 1000);
      } else {
        this.loader.setLoader(true);
      }
    } else {
      if (this.loading === false) {
        if (!this.data) return;
        this.loader.setLoader(false);
        if (this.data.length > 0) {
          this.$searchResult.innerHTML = this.makeDOMString(this.data);
          this.$searchResult.addEventListener("click", ({ target }) => {
            if (target.classList.contains("cat-image")) {
              const id = target.src.split("images/")[1].split(".")[0];
              this.onClick(this.data.find((cat) => cat.id === id));
            }
          });
          setTimeout(this.createObserver, 1000);
        } else {
          this.$searchResult.innerHTML = `<div class="no-result">검색결과가 없어요 ㅠㅜ</div>`;
        }
      } else {
        this.loader.setLoader(true);
      }
    }
  }
}
