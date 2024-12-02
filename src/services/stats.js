import axios from 'axios';
import {MapStats, PlayerStats} from '@/models/Stats';
import { MatchStats } from '@/models/Match';

export async function getAverageStatsOf(id, allMatches, hltvRequired){
    const response = await axios.get(`http://localhost:8080/api/stats/average/${id}?all_matches=${allMatches}&hltv_rating=${hltvRequired}`,{
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
                throw 'Error fetching user stats: ' + error.response.status;
            }
        });

    return new PlayerStats(response.data);
}

export async function getMatchesHistory(id, allMatches, hltvRequired){
    const response = await axios.get(`http://localhost:8080/api/stats/matches/${id}?all_matches=${allMatches}&hltv_rating=${hltvRequired}`, {
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
                throw 'Error fetching user stats: ' + error.response.status;
            }
        });
    return response.data.map(MatchStats.fromJSON);
}

export async function getAverageStatsPerEachMap(id, allMatches, hltvRequired){
    const response = await axios.get(`http://localhost:8080/api/stats/maps/${id}?all_matches=${allMatches}&hltv_rating=${hltvRequired}`, {
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
                throw 'Error fetching user stats: ' + error.response.status;
            }
        });

    return response.data.map(data => new MapStats(data));
}