import axios  from "axios";
import {json} from "react-router-dom";
import config from "bootstrap/js/src/util/config";

const API_URL = "http://localhost:8080/contacts-be/api/auth/";
class AuthService
{
 async login (email,password)
 {
     const config = {
         headers: {
             "Content-Type": "application/json",
         },
     };

     return await axios.post( API_URL+"signin", {
             email,password},config)
         .then((resp =>{

        if (resp.data.status)
        {
            localStorage.setItem("user",JSON.stringify(resp.data.accesstoken))

        }
         return resp.data;
         }));

 }

   async register(name, email, password) {
        return await axios.post(API_URL + "signup", {
            name,
            email,
            password
        },config).then((resp=>{
            return resp.data;
        }));
    }

}
export default new  AuthService()