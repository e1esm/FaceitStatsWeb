import axios from 'axios';
import {PlayerStats} from '@/models/Stats';

export async function getAverageStatsOf(id, allMatches, hltvRequired){
    const response = await axios.get(`http://localhost:8080/api/stats/average/${id}?all_matches=${allMatches}&hltv_rating=${hltvRequired}`)
        .catch(function(error){
            if(error.response){
                throw 'Error fetching user stats: ' + error.response.status;
            }
        });

    return new PlayerStats(response.data);
}