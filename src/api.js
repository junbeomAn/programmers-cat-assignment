const API_ENDPOINT =
  "https://oivhcpn8r9.execute-api.ap-northeast-2.amazonaws.com/dev";

const api = {
  fetchCats: async (keyword) => {
    let url = "";
    if (keyword) {
      url = `${API_ENDPOINT}/api/cats/search?q=${keyword}`;
    } else {
      url = `${API_ENDPOINT}/api/cats/random50`;
    }
    const result = await request(url);
    return result;
  },
  fetchCatInfo: async (id) => {
    let url = `${API_ENDPOINT}/api/cats/${id}`;
    const result = await request(url);
    return result;
  },
  fetchByPage: async (page, keyword) => {
    let url = `${API_ENDPOINT}/api/cats/search?q=${keyword}&page=${page}`;
    const result = await request(url);
    return result;
  },
};

const request = async (url) => {
  try {
    const result = await fetch(url);
    return result.json();
  } catch (e) {
    console.warn(e);
  }
};
// const api = {
//   fetchGif: keyword => {
//     return request(`${API_ENDPOINT}/api/gif/search?q=${keyword}`);
//   },
//   fetchGifAll: () => {
//       return request(`${API_ENDPOINT}/api/gif/all`);
//   }
// };
