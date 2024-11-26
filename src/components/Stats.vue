<template>
    <div class="user-info" v-if="user">
      <img :src="user.avatar" alt="User Avatar" class="user-avatar" />
      <div class="user-details">
        <h2><b>{{ user.nickname }}</b></h2>
        <p>CS2 Skill Level: {{ user.cs2SkillLevel }}</p>
      </div>
    </div>
    
    <div class="stats-grid" v-if="stats">
      <div
        class="stat-item"
        v-for="(value, key) in stats"
        :key="key" v-if="key!=='hltvRating' || isHLTVRequired">
        <span class="stat-key">{{formatKey(key) }}</span>
        <span class="stat-value">{{ formatValue(value) }}</span>
      </div>
    </div>

   
    <div class="matches-table" v-if="matchData">
    <h1 class="table-title">Match History</h1>
    <table class="matches-table-table">
      <thead class="table-header">
        <tr>
          <th v-for="header in headers.filter(header => header != 'HLTV' || (header && isHLTVRequired))" :key="header" class="header-cell">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(match, index) in matchData"
          :key="index"
          class="match-row"
        >
          <td class="cell">{{ match.stats.map }}</td>
          <td class="cell" :class="getScoreClass(match.stats.score)">
            {{ match.stats.score }}
          </td>
          <td class="cell" :class="getKDRatingClass(match.stats.kdRatio)">{{ match.stats.kdRatio }}</td>
          <td class="cell">{{ match.stats.krRatio }}</td>
          <td class="cell">{{ match.stats.pentaKills }}</td>
          <td class="cell">{{ match.stats.quadroKills }}</td>
          <td class="cell">{{ match.stats.tripleKills }}</td>
          <td class="cell">{{ match.stats.doubleKills }}</td>
          <td class="cell">{{ match.stats.headshotsPercentage }}%</td>
          <td class="cell" v-if="isHLTVRequired" :class="getHltvRatingClass(match.stats.hltvRating.toFixed(2))">{{ match.stats.hltvRating == 0 ? '-' :  match.stats.hltvRating.toFixed(2)}}</td>
          <td class="cell">{{ match.stats.mvps }}</td>
          <td class="cell">
            <a :href="`https://www.faceit.com/en/cs2/room/${match.matchId}`" target="_blank" class="link">🔗</a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

    <div class="content"  v-if="!user">
      <div class="input-container">
        <input v-model="inputData" type="text" placeholder="Enter nickname" />
        <button @click="submitData">Get stats</button>

        <div class="checkbox-container" v-if="!firstPlayer && !secondPlayer">
        <label>
          <input type="checkbox" id="all-matches-checkbox" v-model="allMatches" />
          <span>All matches</span>
        </label>
        <label>
          <input type="checkbox" id="hltv-rating-checkbox" v-model="isHLTVRequired" />
          <span>HLTV Rating</span>
        </label>
      </div>
      </div>
    </div>
</template>



<script>
import * as UserService from '@/services/user';
import * as StatsService from '@/services/stats';

export default {
  name: "Stats",
  data() {
    return {
      allMatches: false,
      isHLTVRequired: false,
      inputData: '', 
      user: null,
      stats: null,
      matchData: null,
    };
  },
  computed: {
    headers() {
      return [
          "Map", "Score", "K/D", "K/R", '5 kills', '4 kills', '3 kills', '2 kills', "HS (%)", "HLTV", 'MVPs', "Match"
      ];
    }
  },
  methods: {
    async submitData() {
        await this.getUserBasicInfo();
        await this.getAverageData();
        await this.getMatchHistory();
    },
    getScoreClass(score) {
      const [left, right] = score.split('/').map(Number);
      return left > right ? 'text-green-500' : 'text-red-500';
    },
    getHltvRatingClass(rating){
      if(rating < 0.8){
          return 'text-red-500';
      }else if(rating < 1.3){
        return 'text-yellow-500';
      }else{
        return 'text-green-500';
      }
    },
    getKDRatingClass(kd){
      if(kd < 0.65){
          return 'text-red-500';
      }else if(kd < 1.1){
        return 'text-yellow-500';
      }else{
        return 'text-green-500';
      }
    },
    clearResponse() {
      this.user = null;
      this.stats = null;
      this.inputData = '';
    },

    async getUserBasicInfo(){
      try {
        const nickname = this.inputData || '';
        this.user = await UserService.getUser(nickname);

        this.inputData = '';
      } catch (error) {
        console.error('Error fetching data:', error);
        this.user = null;
        this.inputData = '';
      }
    },

    async getAverageData() {
      try{
        this.stats = await StatsService.getAverageStatsOf(this.user.playerId, this.allMatches, this.isHLTVRequired);
        if(!this.isHLTVRequired){
          delete this.stats.hltvRating;
        }
      }catch(error){
        console.error('Error fetching data:', error);
        this.stats = null;
        this.inputData = '';
      }
    },

    async getMatchHistory(){
      try{
        this.matchData = await StatsService.getMatchesHistory(this.user.playerId, this.allMatches, this.isHLTVRequired);
      }catch(error){
        console.error('Error fetching match history: ', error);
        this.matchData = null;
        this.inputData = '';
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
    this.allMatches = false;
    next();
  },
};
</script>

<style scoped>


.content {
  width: 300px;
  z-index: 15;
  top: 50%;
  left: 50%;
  padding-top: 100px;
  margin: 0 auto;
}

.input-container {
  background-color: #333;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  width: 300px;
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
  width: 300px;
  z-index: 15;
  padding-top: 25px;
  margin: 0 auto;
}

.user-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-left: 100px;
}

.user-details h2 {
  margin: 0;
  margin-left: 100px;
  font-size: 1.5em;
}

.user-details p {
  margin: 0;
  margin-left: 100px;
  font-size: 1em;
  color: #555;
}

.stats-grid {
  position: relative; 
  margin: 0 auto;
  align-items: center;
  justify-content: space-between; 
  align-items: stretch;
  display: flex;  
  gap: 20px; 
  width: 100%;
  min-height: 100px;
  overflow: scroll;
  flex-wrap: nowrap;
}

.stat-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 auto;
  border-style: solid;
  border-radius: 8px;
  border-color: #ff590079;
  box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
  flex: 1; 
  width: 0 auto;
  min-height: 100px;
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

.checkbox-container {
  align-items: center;
  margin-bottom: -5px;
  width: 20px;
  margin-top: 20px;
}

label {
  display: flex;
  width: 100vw;
}

input[type="checkbox"] {
  cursor: pointer;
  width: 16px;
  height: 16px;
  margin-right: 8px;
}

span {
  font-size: 14px;
  color: white;
}

th {
  text-align: center;
}
td {
  text-align: center;
}

.matches-table {
  position: relative;
  align-self: center;
  padding-top: 50px;
}

.table-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center;
  color: white;
}

.matches-table-table {
  border-collapse: collapse;
}

.table-header {
  background-color: #414141;
  color: white;
}

th,
td {
  text-align: center;
  padding: 1rem;
  border: 1px solid #d1d5db;
}

.header-cell {
  font-weight: bold;
  text-transform: capitalize;
}

.match-row:nth-child(odd) {
  background-color: #23232352;
}

.match-row:nth-child(even) {
  background-color: #0d0d0d72;
}

.match-row:hover {
  background-color: #2b2b2b;
}

.cell {
  border: 1px solid #d1d5db;
}

.link {
  color: #3b82f6;
}

.link:hover {
  color: #2563eb;
}

.text-blue-500 {
  color: #3b82f6;
}

.text-green-500 {
  color: #10b981;
}

.text-red-500 {
  color: #ef4444;
}

.text-yellow-500 {
  color: #f59e0b;
}

</style>
