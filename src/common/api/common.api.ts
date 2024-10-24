import axios from "axios";

export const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    withCredentials: true,
    headers: {
        "API-KEY": "d5f6e719-5669-4f7d-b0a9-194fbb32bbfa",
    },
});