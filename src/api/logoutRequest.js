import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:4000" });


export const logoutUser = () =>{
  
 return   API.get(`/api/user/logout`, { withCredentials: true })}
