import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:4000" });


export const postSlot = (data) =>{
    const token = localStorage.getItem("skilloptoken");

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: token,
  },
  withCredentials: true,
};
  return  API.put(`/api/mentor/become`, data, config)}

export const getActualAvail = () =>{
    const token = localStorage.getItem("skilloptoken");

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: token,
  },
  withCredentials: true,
};
 return   API.get(`/api/mentor/getAvailability`, config)}
