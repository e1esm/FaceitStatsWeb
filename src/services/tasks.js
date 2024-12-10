import axios from 'axios';
import {MatchData} from '@/models/MatchPrediction.js';

export async function getUserTasks(id){
    const response = await axios.get(`http://localhost:8080/api/profile/matches/${id}`,{
        headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))['token']}`
        }
    })
        .catch(function(error){
            if(error.response){
                throw 'Error fetching user info: ' + error.response.status;
            }
        });

    return response.data.map(data=> new MatchData(data));
}