import axios from "axios";

export const instance = axios.create({
  baseURL: 'https://evening-gorge-55285.herokuapp.com/'
})