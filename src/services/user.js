import axios from 'axios';
import {User} from '@/models/User.js'

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