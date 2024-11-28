<template>
    <div class="user-info" v-if="user">
      <button class="clear-button" @click="clearPlayer()">❌</button>
      <img :src="user.avatar" alt="User Avatar" class="user-avatar" />
      <div class="user-details">
        <h2><b>{{ user.nickname }}</b></h2>
        <p>CS2 Skill Level: {{ user.cs2SkillLevel }}</p>
      </div>
    </div>

  <h1 style="color: white;text-align: center" v-if="allMatches && stats">Stats for all matches</h1>
  <h1 style="color: white;text-align: center" v-if="!allMatches && stats">Stats for last 20 matches</h1>

    <h1 style="text-align: center;color: white;margin-top: 40px" v-if="stats">Overall statistics</h1>
    <div class="stats-grid" v-if="stats">
      <div
        class="stat-item"
        v-for="(value, key) in stats"
        :key="key" v-if="key!=='hltvRating' || isHLTVRequired">
        <span class="stat-key">{{formatKey(key) }}</span>
        <span class="stat-value">{{ formatValue(value) }}</span>
      </div>
    </div>

    <div class="average-field" v-if="averageStatByMap">
      <h1 style="text-align: center;color: white">Average stats by map</h1>
    <div class="average-slider">
    <div class="map_img"
             v-for="(value, key) in averageStatByMap"
             :key="key" v-if="key !== 'hltvRating' || isHLTVRequired" :style="backgroundStyle(imageLinkByMap(value.map))">
            <div class="blur">
              <div class="map_name">{{value.map}}</div>
            <div class="average-row">
                <div class="average-column">
                  <div class="average-row_entry">Kills</div>
                  <div class="average-row_entry">{{formatValue(value.kills)}}</div>
                </div>
              <div class="average-column">
                <h1 class="average-row_entry">Assists</h1>
                <h2 class="average-row_entry">{{formatValue(value.assists)}}</h2>
              </div>
              <div class="average-column">
                <h1 class="average-row_entry">Deaths</h1>
                <h2 class="average-row_entry">{{formatValue(value.deaths)}}</h2>
              </div>
            </div>
      <div class="average-row">
        <div class="average-column">
          <h1 class="average-row_entry">2k</h1>
          <h2 class="average-row_entry">{{formatValue(value.doubleKills)}}</h2>
        </div>
        <div class="average-column">
          <h1 class="average-row_entry">3k</h1>
          <h2 class="average-row_entry">{{formatValue(value.trippleKills)}}</h2>
        </div>
        <div class="average-column">
          <h1 class="average-row_entry">4k</h1>
          <h2 class="average-row_entry">{{formatValue(value.quadroKills)}}</h2>
        </div>
        <div class="average-column">
          <h1 class="average-row_entry">5k</h1>
          <h2 class="average-row_entry">{{formatValue(value.aces)}}</h2>
        </div>
      </div>
      <div class="average-row">
        <div class="average-column" v-if="isHLTVRequired">
          <h1 class="average-row_entry">HLTV</h1>
          <h2 class="average-row_entry">{{formatValue(value.hltvRating)}}</h2>
        </div>
        <div class="average-column">
          <h1 class="average-row_entry">MVP</h1>
          <h2 class="average-row_entry">{{formatValue(value.mvps)}}</h2>
        </div>
      </div>
      <div class="average-row">
        <div class="average-column">
          <h1 class="average-row_entry">K/D</h1>
          <h2 class="average-row_entry">{{formatValue(value.kdRate)}}</h2>
        </div>
        <div class="average-column">
          <h1 class="average-row_entry">K/R</h1>
          <h2 class="average-row_entry">{{formatValue(value.krRate)}}</h2>
        </div>
        <div class="average-column">
          <h1 class="average-row_entry">HS(%)</h1>
          <h2 class="average-row_entry">{{formatValue(value.headshotPercentage)}}</h2>
        </div>
      </div>
      </div>
    </div>
    </div>
    </div>
   
    <div class="matches-table" v-if="matchData">
    <h1 class="table-title">Match History</h1>
      <div class="matches-table-scrollable">
    <table class="matches-table-table">
      <thead class="table-header">
        <tr>
          <th v-for="header in headers.filter(header => header !== 'HLTV' || (header && isHLTVRequired))" :key="header" class="header-cell">
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
  </div>

    <div class="content"  v-if="!user">
      <div class="input-container">
        <input v-model="inputData" type="text" placeholder="Enter nickname" />
        <button @click="submitData" class="stats-button">Get stats</button>

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
      averageStatByMap: null,
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
    clearPlayer(){
      this.stats = null;
      this.user = null;
      this.inputData = '';
      this.averageStatByMap = null
      this.matchData = null;
      this.isHLTVRequired = false;
      this.allMatches = false;
    },
    backgroundStyle(link) {
      return {
        backgroundImage: `url(${link})`,
      }
    },
    async submitData() {
        await this.getUserBasicInfo();
        await this.getAverageData();
        await this.getAverageStatsByMap();
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
        delete this.stats.timesPlayed;
      }catch(error){
        console.error('Error fetching data:', error);
        this.stats = null;
        this.inputData = '';
      }
    },
    async getAverageStatsByMap(){
      try{
        this.averageStatByMap = await StatsService.getAverageStatsPerEachMap(this.user.playerId, this.allMatches, this.isHLTVRequired);
      }catch (error){
        console.error('Error fetching map stats: ', error);
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
    },

    imageLinkByMap(map){
      switch(map){
        case "de_train":
          return "https://distribution.faceit-cdn.net/images/9e2d5b60-e16e-4309-8e77-8d4427938095.jpeg"
        case "de_nuke":
          return "https://distribution.faceit-cdn.net/images/faa7775b-f42b-4627-891a-21ee7cc13637.jpeg"
        case "de_vertigo":
          return "https://distribution.faceit-cdn.net/images/a8d0572f-8a89-474a-babc-c2009cdc42f7.jpeg"
        case "de_inferno":
          return "https://distribution.faceit-cdn.net/images/d71cae42-b38c-470d-a548-0c59d6c71fbe.jpeg"
        case "de_mirage":
          return "https://distribution.faceit-cdn.net/images/c47710c4-4407-4dbd-ac89-2ef3b20a262e.jpeg"
        case "de_dust2":
          return "https://distribution.faceit-cdn.net/images/4eafa800-b504-4dd2-afd0-90882c729140.jpeg"
        case "de_anubis":
          return "https://distribution.faceit-cdn.net/images/1c2412c7-ae0c-4fa1-ad86-82a3287cb479.jpeg"
        case "de_ancient":
          return "https://distribution.faceit-cdn.net/images/6f72ffec-7607-44cf-9c31-09a865fa92f5.jpeg"
        case "de_overpass":
          return "https://distribution.faceit-cdn.net/images/8ba6f730-fa31-4dd7-9b41-4cff81d79fef.jpeg"
        default:
          return "";
      }
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

.stats-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #ff5b00;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  width: 100%;
}

.stats-button:hover {
  background-color: #ff7800;
}

.user-info {
  width: 300px;
  z-index: 15;
  padding-top: 25px;
  margin: 0 auto;
  color: white;
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
  color: #b1b1b1;
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

.stats-grid::-webkit-scrollbar {
  display: none;
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
  padding-top: 85px;
  width: 100%;
}

.matches-table-scrollable{
  width: 100%;
  overflow: scroll;
  text-align: center;
}

.matches-table-scrollable::-webkit-scrollbar {
  display: none;
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
  overflow: scroll;
  margin: 0 auto;
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
  color: #b1b1b1;
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

.average-field{
  width: 100%;
  height: 450px;
  min-height: 450px;
  margin-top: 50px;
  position: relative;
  background-color: inherit;
}

.average-slider{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  gap: 20px;
  overflow: scroll;
  position: relative;
}

.average-slider::-webkit-scrollbar {
  display: none;
}

.blur{
  backdrop-filter: blur(5px) brightness(65%);
  height: 100%;
  width: 100%;
  max-width: 100%;
}

.map_name{
  text-align: center;
  padding-top: 7px;
  padding-bottom: 5px;
  font-size: 20px;
  color: #ffffff;
  font-family: "Times New Roman",serif;
  font-weight: bold;
}

.average-row{
  flex-direction: row;
  display: flex;
  color: white;
  border-color: white;
  border-style: solid;
  border-width: 1px;
  box-sizing: border-box;
  width: 100%;
  height: calc(100% / 4.8);
  max-width: 100%;
}


.average-column{
  display: flex;
  flex: 1;
  flex-direction: column;
  color: white;
  font-size: 14px;
}

.average-row_entry{
  font-weight: bold;
  font-size: 20px;
  color: #ffffff;
  text-align: center;
  height: 50%;
}

.map_img{
  height: 100%;
  background-size: cover;
  min-width: 450px;
  border-style: solid;
  border-radius: 8px;
  border-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.clear-button {
  position: relative;
  top: -40px;
  left: 10px;
  margin-bottom: 10px;
  padding-left: 30px;
  margin-left: -40px;
  height: 30px;
  background-color: inherit;
  width: 30px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}


</style>
