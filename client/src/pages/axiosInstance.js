import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:4300/',
    withCredentials: true,
    
    
});