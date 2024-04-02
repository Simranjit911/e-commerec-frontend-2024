import axios from "axios";
axios.defaults.withCredentials=true
let instance = axios.create({
    baseURL: "https://prokart-ecommerce-backend-2024.vercel.app",
    credentials: 'include',
})
export default instance
