import axios from "axios";

const API = axios.create({ baseURL: "https://skillop-back.onrender.com" });

export const createPost = (data) => {
    const token = localStorage.getItem("skilloptoken");

    const config = {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
        },
        withCredentials: true,
    };
    return API.post(`/api/post/create`, data, config);
};
export const getAllPost = () => {
    const token = localStorage.getItem("skilloptoken");

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        withCredentials: true,
    };
    return API.get(`/api/post/from/all`, config);
};
export const getSpecificPost = (postId) => {
    const token = localStorage.getItem("skilloptoken");

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        withCredentials: true,
    };
    return API.get(`/api/post/${postId}`, config);
};
export const likeOrDislikePost = (postId) => {
    const token = localStorage.getItem("skilloptoken");

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        withCredentials: true,
    };
    return API.put(`/api/post/like/${postId}`, {}, config);
};

export const getPostFromSpecificUser = (userId) => {
    const token = localStorage.getItem("skilloptoken");

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        withCredentials: true,
    };
    return API.get(`/api/post/from/${userId}`, config);
};
