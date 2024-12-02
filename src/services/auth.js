import axios from 'axios';

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