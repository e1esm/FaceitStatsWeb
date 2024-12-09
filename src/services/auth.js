import axios from 'axios';
import {PlatformUser} from "@/models/User.js";

export async function signup(payload){
    const response = await axios.post(`http://localhost:8080/api/auth/signup`, payload)
        .catch(function(error){
            if(error.response){
                throw 'Error fetching user info: ' + error.response.status;
            }
        });

        return response.data;
}

export async function login(payload){
    const response = await axios.post(`http://localhost:8080/api/auth/signin`, payload)
        .catch(function(error){
            if(error.response){
                throw 'Error fetching user info: ' + error.response.status;
            }
        });

    return response.data;
}

export async function getCurrentUser(){
    const response = await axios.get(`http://localhost:8080/api/auth/me`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))['token']}`
        }
    })
        .catch(function(error){
            if(error.response){
                throw 'Error fetching user info: ' + error.response.status;
            }
        });

    console.log(response);
    return new PlatformUser(response.data);
}