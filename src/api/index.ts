// @ts-ignore
import axios from "axios";
export const BASE_URL = "https://jsonplaceholder.typicode.com";
export const fetchPosts =  () =>  {
  // @ts-ignore
  return axios.get(`${BASE_URL}/posts/1/`).then(res => res.data);
}


