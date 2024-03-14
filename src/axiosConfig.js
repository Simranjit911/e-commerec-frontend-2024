import axios from "axios";
axios.defaults.withCredentials=true
let instance = axios.create({
    baseURL: "http://localhost:8000"
})
export default instance