<template>
  <div class="container">
    <div class="half">
      <input v-model="firstInput" placeholder="Enter first user to compare" v-if="!firstPlayer"/>
      <button @click="handleComparisonButton(1)" v-if="!firstPlayer">Get stats</button>

      <div class="user-info" v-if="firstPlayer">
      <img :src="firstPlayer.avatar" alt="User Avatar" class="user-avatar" />
      <div class="user-details">
        <h2 style="color: white"><b>{{ firstPlayer.nickname }}</b></h2>
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
  <div class="checkbox-field">
    <div v-if="firstPlayer && secondPlayer && allMatches">
      <h1 style="text-align: center;margin-top: -300px">All matches</h1>
    </div>

    <div v-if="firstPlayer && secondPlayer && !allMatches">
      <h1 style="text-align: center;margin-top: -300px;color: white">20 matches</h1>
    </div>

      <div  v-if="!firstPlayer && !secondPlayer">
        <input type="checkbox" name="all-checkbox" id="all-matches-checkbox" v-model="allMatches">
        <label for="all-matches-checkbox">All matches</label>
    </div>

      <div  v-if="!firstPlayer && !secondPlayer">
        <input type="checkbox" name="all-checkbox" id="all-matches-checkbox" v-model="hltvRequired">
        <label for="all-matches-checkbox">HLTV Rating</label>
      </div>
  </div>
  <div class="half">
    <input v-model="secondInput" placeholder="Enter second user to compare" v-if="!secondPlayer"/>
    <button @click="handleComparisonButton(2)" v-if="!secondPlayer">Get stats</button>

      <div class="user-info" v-if="secondPlayer">
      <img :src="secondPlayer.avatar" alt="User Avatar" class="user-avatar" />
      <div class="user-details">
        <h2 style="color: white"><b>{{ secondPlayer.nickname }}</b></h2>
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
        if(!this.hltvRequired){
          delete this.firstStats.hltvRating;
        }
      }else{
        this.secondPlayer = await UserService.getUser(this.secondInput);
        this.secondStats = await StatsService.getAverageStatsOf(this.secondPlayer.playerId, this.allMatches, true);
        if(!this.hltvRequired){
          delete this.secondStats.hltvRating;
        }
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
  margin-top: 20px;
}

.half {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 auto;
  width: auto;
}

input {
  padding: 10px;
  font-size: 16px;
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
  padding: 10px 20px;
  font-size: 16px;
  background-color: #ff5b00;
  box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.1);
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  width: 30%;
}

button:hover {
  background-color: #ff7800;
}

. user-info {
  position: relative;
  padding: 0 auto;
  color: white;
}

.user-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 15px;
}

.user-details h2 {
  margin: 0;
  text-align: center;
  font-size: 1.5em;
}

.user-details p {
  margin: 0;
  font-size: 1em;
  text-align: center;
  color: #555;
}

.stats-container {
  position: relative;
  padding-top: 10px;
  display: flex;
  justify-content: space-between;
  width: 0 auto;
  overflow:hidden;
}

.left-column, .right-column {
  width: 100%;
  padding: 5%;
  background-color: #333;
  border-radius: 10px;
  box-shadow: 20px 20px 20px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 10%;
}

.left-column {
  margin-right: 10px;
}

.right-column {
  margin-left: 10px;
}

.stat-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.stat-key {
  flex: 1;
  font-size: 18px;
  color: white;
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
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

label{
  color: white;
}

#all-matches-checkbox{
  cursor: pointer;
  width: 16px;
  height: 16px;
}

</style>
