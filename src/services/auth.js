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

    return new PlatformUser(response.data);
}

export async function logout(token){
    const tokenObject = {
        token: token
    };
    const response = await axios.post(`http://localhost:8080/api/auth/logout`, JSON.stringify(tokenObject), {
        headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))['token']}`,
            'Content-Type': 'application/json',
        }
    })
        .catch(function(error){
            if(error.response){
                throw 'Error fetching user info: ' + error.response.status;
            }
        });
}