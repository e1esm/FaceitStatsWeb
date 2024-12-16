<template>
  <div class ="link-field" v-if="!factionsBestMaps">
      <input v-model="matchLink" type="text" placeholder="Match link"/>
      <button class ="match-button" @click="submit">Submit Link</button>
  </div>

  <div class ="predictions-field" v-if="factionsBestMaps">
    <div class="clear-row">
      <button class="clear-button" @click="clear()">❌</button>
    </div>

    <div class ="match-link-row">
      <a :href="this.matchLink"><h1>Match</h1></a>
    </div>

    <div class="factions">
      <div class="faction-predictions">
        <h1 align="center">Left team</h1>
      <div
          class="faction-prediction-field"
          v-for="(value, _) in factionsBestMaps.getBestMapsForFaction('first')">
        <img class="map-img" :style="backgroundStyle(imageLinkByMap(value.map))" alt=""/>
        <h1>{{ value.map }}</h1>
        <h1 :class="getColor(value.winPossibility)">{{ formatValue(value.winPossibility) }}</h1>
      </div>
      </div>

      <div class="faction-predictions">
        <h1 align="center" text->Right team</h1>
        <div
            class="faction-prediction-field"
            v-for="(value, _) in factionsBestMaps.getBestMapsForFaction('second')">
          <img class="map-img" :style="backgroundStyle(imageLinkByMap(value.map))" alt=""/>
          <h1>{{ value.map }}</h1>
          <h1 :class="getColor(value.winPossibility)">{{ formatValue(value.winPossibility) }}</h1>
        </div>
      </div>

      </div>

    </div>

</template>

<script>
import {getPredictions} from "@/services/picker.js";

export default {
  name: "Pick",
  data() {
    return {
      matchLink: '',
      factionsBestMaps: null
    };
  },
  methods: {
    backgroundStyle(link) {
      return {
        backgroundImage: `url(${link})`,
      }
    },

    async submit() {
      if (this.matchLink === '') {
        alert("Empty match link")
      }

      try {
        this.factionsBestMaps = await getPredictions(this.matchLink);
      } catch (err) {
        console.error("Failed to get predictions: ", err)
        alert("Get map predictions failure");
      }
    },

    clear() {
      this.matchLink = '';
      this.factionsBestMaps = null;
    },

    formatValue(value){
      return Number(value).toFixed(2);
    },

    imageLinkByMap(map) {
      switch (map) {
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
    },
    getColor(probability) {
      if(probability > 0.7){
        return 'probability green';
      } else if (probability < 0.7 && probability > 0.4) {
        return 'probability yellow';
      } else {
        return 'probability red';
      }
    },
  }
}
</script>

<style scoped>

a{
  color: white
}

a:hover {
  color: #ff5b00;
}

.match-link-row{
  width: 100%;
  height: 10%;
  text-align: center;
  color: white;
}

.map-img{
  background-size: cover;
  height: 200px;
  width: 400px;
}

.faction-prediction-field{
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

.faction-predictions{
  display: flex;
  flex-direction: column;
  height: 85%;
  width: 50%;
  color: white;
  overflow: scroll;
  gap: 50px;
}

.clear-row{
  height: 5%;
}

.factions{
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-top: 10px;
  height: 100%;
}

.clear-button{
  position: relative;
  margin-right: 10px;
  padding: 10px;
  height: 30px;
  background-color: inherit;
  width: 30px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.predictions-field{
  position: relative;
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 75%;
  margin: 0 auto;
  margin-top: 100px;
  padding: 20px;
  border: 1px solid #ff5b00;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: #1e1e1e;
}

.link-field{
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: relative;
  width: 400px;
  height: 150px;
  margin: 0 auto;
  margin-top: 100px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  background-color: #333;
  border-radius: 10px;
}

input{
  position: relative;
  width: 80%;
  height: 50%;
  margin: 0 auto;
  font-size: 16px;
  background-color: #222;
  border-radius: 10px;
  border: 1px solid #444;
  color: white;
}

.match-button{
  position: relative;
  width: 55%;
  height: 30%;
  margin: 0 auto;
  background: #ff5b00;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  border-color: #ff5b00;
}

.match-button:hover {
  background-color: #ff7800;
}

.probability.green {
  color: rgb(18, 255, 18);
}

.probability.red {
  color: rgb(255, 35, 35);
}

.probability.yellow {
  color: rgb(255, 220, 0);
}

</style>