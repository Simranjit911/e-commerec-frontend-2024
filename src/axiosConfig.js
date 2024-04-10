import axios from "axios";
axios.defaults.withCredentials = true
let instance = axios.create({
    // baseURL: "https://prokart-ecommerce-backend-2024.vercel.app",
    baseURL: "http://localhost:8000",
    credentials: 'include',
})
export default instance
