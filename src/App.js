console.log("app is running!");

class App {
  $target = null;
  data = [];
  loading = false;
  keyword = "";

  constructor($target) {
    this.$target = $target;

    this.searchInput = new SearchInput({
      $target,
      onSearch: async (keyword) => {
        this.keyword = keyword;

        this.searchResult.setScrollPaging(false);
        this.setState(this.data, true);

        const { data } = await api.fetchCats(keyword);
        this.setState(data, false);
      },
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: async (image) => {
        const {
          data: { temperament, origin },
        } = await api.fetchCatInfo(image.id);
        this.imageInfo.setState({
          visible: true,
          image: {
            ...image,
            temperament,
            origin,
          },
        });
      },
      loadMore: async (page) => {
        this.searchResult.setScrollPaging(true);
        this.setState(this.data, true);
        const { data } = await api.fetchByPage(page, this.keyword);
        const nextData = [...this.data, ...data];
        this.setState(nextData, false);
      },
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null,
      },
      onClose: (image) => {
        this.imageInfo.setState({
          visible: false,
          image,
        });
      },
    });
  }

  setState(nextData, loading) {
    this.data = nextData;
    this.loading = loading;
    this.searchResult.setState(nextData, loading);
  }
}
