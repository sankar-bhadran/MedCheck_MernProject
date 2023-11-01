import axios from 'axios'
import { baseurl } from "./constants";

const instance = axios.create({
  baseURL: "https://app.medcheckin.shop/",
  withCredentials:true
});


export default instance
