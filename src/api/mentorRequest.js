import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:4000" });

export const getMentorAvaibility= (date, mentorId) => {
    const token = localStorage.getItem("skilloptoken");

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        withCredentials: true,
    };
    // give date in body
    return API.post(`/api/mentor/availability/${mentorId}`, date, config);
    // return API.get(`/api/mentor/availability/${mentorId}`, config);
};
