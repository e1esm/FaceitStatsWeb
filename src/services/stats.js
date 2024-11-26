import axios from 'axios';
import {PlayerStats} from '@/models/Stats';
import { MatchStats } from '@/models/Match';

export async function getAverageStatsOf(id, allMatches, hltvRequired){
    const response = await axios.get(`http://localhost:8080/api/stats/average/${id}?all_matches=${allMatches}&hltv_rating=${hltvRequired}`)
        .catch(function(error){
            if(error.response){
                throw 'Error fetching user stats: ' + error.response.status;
            }
        });

    return new PlayerStats(response.data);
}

export async function getMatchesHistory(id, allMatches, hltvRequired){
    const response = await axios.get(`http://localhost:8080/api/stats/matches/${id}?all_matches=${allMatches}&hltv_rating=${hltvRequired}`)
        .catch(function(error){
            if(error.response){
                throw 'Error fetching user stats: ' + error.response.status;
            }
        });
    const matchStatsArray = response.data.map(MatchStats.fromJSON);
    return matchStatsArray;
}