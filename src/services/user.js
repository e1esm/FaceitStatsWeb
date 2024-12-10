import axios from 'axios';
import {PlatformUser, User} from '@/models/User.js'

export async function getUser(nickname){
    const response = await axios.get(`http://localhost:8080/api/users/${nickname}`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))['token']}`
        }
    })
        .catch(function(error){
            if(error.response){
                if(error.response.status === 403){
                    alert("You do not have access to this page.");
                    return;
                }

                throw 'Error fetching user info: ' + error.response.status;
            }
        });

    return new User(response.data);
}

export async function getPlatformUsers(){
    const response = await axios.get(`http://localhost:8080/api/profile/users`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))['token']}`
        }
    })
        .catch(function(error){
            if(error.response){
                if(error.response.status === 403){
                    alert("You do not have access to this page.");
                    return;
                }

                throw 'Error fetching user info: ' + error.response.status;
            }
        });

    return response.data.map(data => new PlatformUser(data))
}

export async function updateUserRole(user){
    const response = await axios.put(`http://localhost:8080/api/profile/users/${user.id}`, JSON.stringify(user.toJson()), {
        headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))['token']}`,
            'Content-Type': 'application/json',
        },
    }).catch(function(error){
        if(error.response){
            console.log(error);
            if(error.response.status === 403){
                alert("You do not have access to this page.");
                return;
            }
            throw 'Error fetching user info: ' + error.response.status;
        }
    })

    return new PlatformUser(response.data);
}

export async function deleteUser(user){
    const response = await axios.delete(`http://localhost:8080/api/profile/users/${user.id}`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))['token']}`,
        }
    }).catch(function(error){
        if(error.response){
            if(error.response.status === 403){
                alert("You do not have access to this page.");
                return;
            }
            throw 'Error fetching user info: ' + error.response.status;
        }
    })
}