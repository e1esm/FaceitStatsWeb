<template>
    <div id="app">
  <div class="container">
    <div class="half">
      <input v-model="firstInput" placeholder="Enter first user to compare" v-if="!firstPlayer"/>
      <button @click="handleComparisonButton(1)" v-if="!firstPlayer">Submit</button>

      <div class="user-info" v-if="firstPlayer">
      <img :src="firstPlayer.avatar" alt="User Avatar" class="user-avatar" />
      <div class="user-details">
        <h2><b>{{ firstPlayer.nickname }}</b></h2>
        <p>Skill Level: {{ firstPlayer.cs2SkillLevel }}</p>
      </div>
        </div>
        <div class="stats-container" v-if="firstStats">
        <div class="left-column">
          <div v-for="(value, key) in firstStats" :key="key" class="stat-row">
            <span class="stat-key">{{ formatKey(key) }}</span>
            
            <span class="stat-value" :class="getColor(value, secondStats[key])" v-if="secondStats">{{ formatValue(value) }}</span>
            <span class="stat-value" :class="'blue'" v-else>{{ formatValue(value) }}</span>
          </div>
      </div>
    </div>
  </div>

  <div class="checkbox-field" v-if="!firstPlayer && !secondPlayer">
      <input type="checkbox" name="all-checkbox" id="all-matches-checkbox" v-model="allMatches">
      <label for="all-matches-checkbox">All matches</label>
  </div>

    <div class="checkbox-field">
      <input type="checkbox" name="all-checkbox" id="all-matches-checkbox" v-model="hltvRequired">
      <label for="all-matches-checkbox">HLTV Rating</label>
    </div>

  <div class="half">
    <input v-model="secondInput" placeholder="Enter second user to compare" v-if="!secondPlayer"/>
    <button @click="handleComparisonButton(2)" v-if="!secondPlayer">Submit</button>

      <div class="user-info" v-if="secondPlayer">
      <img :src="secondPlayer.avatar" alt="User Avatar" class="user-avatar" />
      <div class="user-details">
        <h2><b>{{ secondPlayer.nickname }}</b></h2>
        <p>Skill Level: {{ secondPlayer.cs2SkillLevel }}</p>
      </div>
    </div>
    <div class="stats-container" v-if="secondStats">
        <div class="right-column">
          <div v-for="(value, key) in secondStats" :key="key" class="stat-row">
            <span class="stat-key">{{ formatKey(key) }}</span>
            <span class="stat-value" :class="getColor(value, firstStats[key])"v-if="firstStats">{{ formatValue(value) }}</span>
            <span class="stat-value" :class="'blue'" v-else>{{ formatValue(value) }}</span>
          </div>
        </div>
      </div>
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
      hltvRequired: false,
      firstInput: '',
      secondInput: '',
      firstPlayer: null,
      firstStats: null,
      secondPlayer: null,
      secondStats: null,
    };
  },
  methods: {
    async handleComparisonButton(id) {
      if(id == 1){
        this.firstPlayer = await UserService.getUser(this.firstInput);
        this.firstStats = await StatsService.getAverageStatsOf(this.firstPlayer.playerId, this.allMatches, this.hltvRequired);
      }else{
        this.secondPlayer = await UserService.getUser(this.secondInput);
        this.secondStats = await StatsService.getAverageStatsOf(this.secondPlayer.playerId, this.allMatches, true);
      }
    },

    beforeRouteLeave(to, from, next) {
      this.clearResponse();
      next();
    },
    clearResponse() {
      this.firstPlayer = null;
      this.secondPlayer = null;
      this.firstStats = null;
      this.secondStats = null;
      this.firstInput = '';
      this.secondInput = '';
    },
    formatKey(key) {
      // Format the key to be more human-readable
      return key
        .replace(/([A-Z])/g, ' $1')  // Add space before capital letters
        .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
    },
    getColor(value1, value2) {
      if (value1 > value2) {
        return 'green';
      } else if (value1 < value2) {
        return 'red';
      } else {
        return 'blue';
      }
    },
    formatValue(value){
      return Number(value).toFixed(2);
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  height: 100vh;
  width: 100vw;
}

.half {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;    
}

input {
  position: absolute;
  top: 100px;
  padding: 10px;
  height: 40px;
  font-size: 16px;
  width: 25%;
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

input:hover {
  outline: none;
  border-color: #ff5b00;
}


button {
  position: absolute;
  top: 155px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #ff5b00;
  box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.1);
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  width: 20%;
}

button:hover {
  background-color: #ff7800;
}

.user-info {
  position: absolute;
  top: 75px;
  padding: 10px;
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

.stats-container {
  position: absolute;
  top: 150px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  padding: 100px;
  width: 50%;
}

.left-column, .right-column {
  width: 100%;
  padding: 20px;
  background-color: #333;
  border-radius: 10px;
  box-shadow: 20px 20px 20px 20px rgba(0, 0, 0, 0.1);
}

.left-column {
  margin-right: 10px;
}

.right-column {
  margin-left: 10px;
}

.title {
  font-size: 24px;
  margin-bottom: 10px;
}

.stat-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.stat-key {
  flex: 1;
  font-size: 18px;
}

.stat-value {
  font-size: 18px;
  flex: 1;
  text-align: right;
}

.stat-value.green {
  color: rgb(18, 255, 18);
}

.stat-value.red {
  color: rgb(255, 35, 35);
}

.stat-value.blue {
  color: rgb(61, 168, 255);
}

.checkbox-field{
  display:inline;
  margin-right: -50px;
  margin-left: -10px;
  padding-top: 5px;
  margin-top: 90px;
  width: 10%;
  height: 10%;
  align-items: center;
}

label{
  display: inline;
  margin-left: -20px;
  padding-bottom: -10px;
  color: white;
}

#all-matches-checkbox{
  cursor: pointer;
  width: 16px;
  height: 16px;
  margin-left: -45px;
}

</style>
