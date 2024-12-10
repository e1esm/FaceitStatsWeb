import axios from 'axios';

export async function getAllFiles(){
    const response = await axios.get(`http://localhost:8080/api/files/all`, {
        headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))['token']}`
        }
    })
        .catch(function(error){
            if(error.response){
                throw 'Error fetching files info: ' + error.response.status;
            }
        });

    return response.data;
}