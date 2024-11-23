import axios from 'axios';
import {User} from '@/models/User.js'

export async function getUser(nickname){
    const response = await axios.get(`http://localhost:8080/api/users/${nickname}`)
        .catch(function(error){
            if(error.response){
                throw 'Error fetching user info: ' + error.response.status;
            }
        });

        console.log(response.data);

    let user = new User(response.data);
    return user;
}