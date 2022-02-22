import axios from "axios";

export const instance = axios.create({
   withCredentials: true,
   baseURL: "https://nameless-sea-40141.herokuapp.com/api"
})