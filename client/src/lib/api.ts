import axios from "axios"

<<<<<<< HEAD
const api = axios.create({ 
    baseURL : import.meta.env.VITE_API_URL || "http://localhost:3000/api",
     headers : {
=======
const api = axios.create({ baseURL : import.meta.env.VITE_API_URL || "http://localhost:3000", headers : {
>>>>>>> efb1102fa514fb7abed47a80c60ae8150449cb34
    "Content-Type" : "application/json"
}})

// Request interveptor to attach JWT token

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if(token) {
            config.headers.Authorization = `Bearer ${token}`
        }
<<<<<<< HEAD

        return config;
=======
>>>>>>> efb1102fa514fb7abed47a80c60ae8150449cb34
    },

    (error) => {
        return Promise.reject(error);
    }
)

export default api;