import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "https://mern-chat-app-backend-puys.onrender.com/api",
    withCredentials:true,
})