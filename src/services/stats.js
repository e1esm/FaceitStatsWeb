import axios from 'axios';
import { PlayerStats } from '@/models/Stats';

export async function getAverageStatsOf(id){
    const response = await axios.get(`http://localhost:8080/api/stats/average/${id}?all_matches=false&hltv_rating=true`)
        .catch(function(error){
            if(error.response){
                throw 'Error fetching user stats: ' + error.response.status;
            }
        });

    let stats = new PlayerStats(response.data);
    
    return stats;
}