import axios from "axios";
axios.defaults.withCredentials=true
let instance = axios.create({
    baseURL: "https://prokart-ecommerce-backend-2024.onrender.com"
    // baseURL: "https://prokart-ecommerce-backend-2024.vercel.app"
    // baseURL: "https://busy-rose-perch.cyclic.app"
})
export default instance
