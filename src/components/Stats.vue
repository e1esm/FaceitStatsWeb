<template>
  <div id="app">
    <NavBar />

    <div class="user-info" v-if="user">
      <img :src="user.avatar" alt="User Avatar" class="user-avatar" />
      <div class="user-details">
        <h2><b>{{ user.nickname }}</b></h2>
        <p>CS2 Skill Level: {{ user.cs2SkillLevel }}</p>
      </div>
    </div>
    

    <!-- Fixed Stats Grid in one line -->
    <div class="stats-grid" v-if="stats">
      <div
        class="stat-item"
        v-for="(value, key) in stats"
        :key="key"
      >
        <span class="stat-key">{{ formatKey(key) }}</span>
        <span class="stat-value">{{ formatValue(value) }}</span>
      </div>
    </div>

    <div class="content">
      <div class="input-container" v-if="!user">
        <input v-model="inputData" type="text" placeholder="Enter nickname" />
        <button @click="submitData">Get stats</button>
      </div>
    </div>
  </div>
</template>



<script>
import axios from 'axios';
import NavBar from '@/components/NavBar.vue';


class User {
  constructor({ nickname, country, avatar, player_id, games }) {
    this.nickname = nickname;
    this.country = country;
    this.avatar = avatar;
    this.playerId = player_id;
    this.games = games;

    const cs2Game = games.find((game) => game.name === 'cs2');
    this.cs2SkillLevel = cs2Game ? cs2Game.skill_level : 'Not available';
  }
}

class PlayerStats {
  constructor(data) {
    this.kdRate = data.kd_rate;
    this.krRate = data.kr_rate;
    this.quadroKills = data.quadro_kills;
    this.trippleKills = data.tripple_kills;
    this.doubleKills = data.double_kills;
    this.mvps = data.mvps;
    this.deaths = data.deaths;
    this.kills = data.kills;
    this.assists = data.assists;
    this.headshotPercentage = data.headshot_percentage;
    this.hltvRating = data.hltv_rating;
    this.adr = data.adr;
    this.aces = data.aces;
  }
}

export default {
  name: "Stats",
  components: {
    NavBar,
  },
  data() {
    return {
      inputData: '', // Input for the nickname
      user: null, // Holds the mapped User instance
      stats: null,
    };
  },
  methods: {
    async submitData() {
        await this.getUserBasicInfo();
        await this.getAverageData();
    },
    clearResponse() {
      this.user = null; // Clear user data
    },

    async getUserBasicInfo(){
      try {
        const nickname = this.inputData || '';
        const response = await axios.get(`http://localhost:8080/api/users/${nickname}`);

        this.user = new User(response.data);
        this.inputData = '';
      } catch (error) {
        console.error('Error fetching data:', error);
        this.user = null; // Handle error by clearing user data
      }
    },

    async getAverageData() {
      try{
        const response = await axios.get(`http://localhost:8080/api/stats/average/${this.user.playerId}?all_matches=false&hltv_rating=true`);
        this.stats = new PlayerStats(response.data); 

      }catch(error){
        console.error('Error fetching data:', error);
        this.stats = null;
      }
    },
    formatKey(key) {
    return key
      .replace(/([a-z])([A-Z])/g, '$1 $2') 
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
    },

    formatValue(value){
      return Number(value).toFixed(2);
    }
  },
  beforeRouteLeave(to, from, next) {
    this.clearResponse();
    next();
  },
};
</script>

<style scoped>

.content {
  position: absolute;
  width: 300px;
  z-index: 15;
  top: 50%;
  left: 50%;
  margin: -100px 0 0 -150px;
}

.input-container {
  background-color: #333;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  width: 300px; /* Optional: limit width */
}

input {
  padding: 10px;
  font-size: 16px;
  width: 100%;
  margin-bottom: 10px;
  border: 1px solid #444;
  border-radius: 5px;
  background-color: #222;
  color: white;
}

input:focus {
  outline: none;
  border-color: #ff5b00;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #ff5b00;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  width: 100%;
}

button:hover {
  background-color: #ff7800;
}

.user-info {
position: absolute;
width: 300px;
z-index: 15;
top: 200px;
left: 50%;
margin: -100px 0 0 -150px;
}

.user-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 15px;
}

.user-details h2 {
  margin: 0;
  font-size: 1.5em;
}

.user-details p {
  margin: 0;
  font-size: 1em;
  color: #555;
}

.stats-grid {
  position: fixed; 
  top: 250px; 
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: space-between; 
  align-items: stretch;
  gap: 20px; 
  width: 100%;
  padding: 10px;
  z-index: 10;
  flex-wrap: nowrap;
}

.stat-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px;
  border-style: solid;
  border-radius: 8px;
  border-color: #ff590079;
  box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
  flex: 1; 
  min-width: 0;
  min-height: 100px;
  height: 100%;
}

.stat-key {
  font-weight: bold;
  font-size: 16px;
  color: #ffffff;
}

.stat-value {
  font-size: 14px;
  color: #ffffff;
  margin-top: 5px;
}


</style>
