import axios from 'axios';

const API_KEY = '35921971-1e573a853b9182cbe66d281b3';
axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.headers.common['Authorization'] = API_KEY;
axios.defaults.headers = 'Access-Control-Allow-Origin';
axios.defaults.params = {
  orientation: 'horizontal',
  per_page: 12,
  //   image_type: 'photo',
};
// const url = `${axios.defaults.baseURL}?q=${query}&page=${page}&key=${API_KEY}&image_type=${axios.defaults.params.image_type}&orientation=${axios.defaults.params.orientation}&per_page=${axios.defaults.params.per_page}`;

export const fetchImages = async (query, page) => {
  try {
    const { data } = await axios.get(`?key=${API_KEY}&q=${query}&page=${page}`);
    return data;
  } catch {
    window.alert('Somthing went wrong backend');
  }
};
