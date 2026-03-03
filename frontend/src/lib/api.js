import axios from "axios";

export const api = axios.create({
    baseURL: "https://brew-internship.onrender.com/api/v1" || "http://localhost:5000/api/v1",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            if (typeof window !== "undefined") {
                window.dispatchEvent(new Event("auth-unauthorized"));
            }
        }
        return Promise.reject(error);
    }
);
