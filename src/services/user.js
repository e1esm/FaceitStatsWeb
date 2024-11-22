import axios from 'axios';
import {User} from '@/models/User.js'

export async function getUser(nickname){
    const response = await axios.get(`http://localhost:8080/api/users/${nickname}`)
        .catch(function(error){
            if(error.response){
                throw 'Error fetching user info: ' + error.response.status;
            }
        });

    return new User(response.data);
}