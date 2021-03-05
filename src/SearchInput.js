const TEMPLATE = '<input type="text">';

class SearchInput {
  $searchHistory = null;
  history = [];

  constructor({ $target, onSearch }) {
    const $searchInput = document.createElement("input");
    const $randomBtn = document.createElement("button");
    this.$searchHistory = document.createElement("div");

    this.$searchInput = $searchInput;
    this.$searchInput.placeholder = "고양이를 검색해보세요.";
    this.history =
      JSON.parse(window.localStorage.getItem("search_history")) || [];

    $searchInput.className = "SearchInput";
    $searchInput.autofocus = true;
    $target.appendChild($searchInput);

    $searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        if (this.history.length >= 5) this.history.shift();

        const newState = [...this.history, e.target.value];
        onSearch(e.target.value);
        window.localStorage.setItem("search_history", JSON.stringify(newState));
        this.setState(newState);
      }
    });

    $searchInput.addEventListener("click", (e) => {
      if (e.target.value) {
        $searchInput.value = "";
      }
    });

    $randomBtn.innerText = "랜덤 검색!";
    $target.appendChild($randomBtn);

    $randomBtn.addEventListener("click", (e) => {
      onSearch("");
      $searchInput.value = "";
    });

    this.$searchHistory.addEventListener("click", ({ target }) => {
      if (target.classList.contains("history-keyword")) {
        const keyword = target.innerText;
        const newState = [...this.history, keyword];
        onSearch(keyword);
        window.localStorage.setItem("search_history", JSON.stringify(newState));
        this.setState(newState);
      }
    });
    $target.appendChild(this.$searchHistory);
    this.render();
    console.log("SearchInput created.", this);
  }

  setState(nextState) {
    this.history = nextState;
    this.render();
  }

  render() {
    if (this.history && this.history.length !== 0) {
      this.$searchHistory.innerHTML = this.history
        .map(
          (keyword) => `
              <span class="history-keyword">
                  ${keyword}
              </span>
          `
        )
        .join("");
    } else {
      this.$searchHistory.innerHTML = `검색 기록이 없습니다.`;
    }
  }
}
