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
import NavBar from '@/components/NavBar.vue';
import * as UserService from '@/services/user';
import * as StatsService from '@/services/stats';

export default {
  name: "Stats",
  components: {
    NavBar,
  },
  data() {
    return {
      inputData: '', 
      user: null,
      stats: null,
    };
  },
  methods: {
    async submitData() {
        await this.getUserBasicInfo();
        await this.getAverageData();
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
        this.stats = await StatsService.getAverageStatsOf(this.user.playerId);
      }catch(error){
        console.error('Error fetching data:', error);
        this.stats = null;
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
    next();
  },
};
</script>

<style scoped>

#app{
  width: 100%;
  height: 100%
}

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
