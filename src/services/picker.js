import axios from 'axios';
import {FactionBestMaps} from '@/models/Predictions.js';


export async function getPredictions(matchLink){
    const response = await axios.get(`http://localhost:8080/api/maps/pick?matchLink=${matchLink}`, {
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


    console.log('doing research: ', response.status);
    return new FactionBestMaps(response.data);
}

const jsonData = {
    "first_faction_best_maps": [
        { "map": "de_overpass", "win_possibility": 0.8666666666666667 },
        { "map": "de_mirage", "win_possibility": 0.7743589743589744 },
        { "map": "de_anubis", "win_possibility": 0.6571428571428571 },
        { "map": "de_inferno", "win_possibility": 0.49733333333333335 },
        { "map": "de_dust2", "win_possibility": 0.24166666666666667 }
    ],
    "second_faction_best_maps": [
        { "map": "de_mirage", "win_possibility": 0.9027251537521223 },
        { "map": "de_inferno", "win_possibility": 0.8313624689979123 },
        { "map": "de_nuke", "win_possibility": 0.8214285714285714 },
        { "map": "de_anubis", "win_possibility": 0.7153846153846154 },
        { "map": "de_ancient", "win_possibility": 0.603015873015873 }
    ]
};