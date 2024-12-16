<template>
  <div class="tasks-view">
    <h1 class="title">Tasks</h1>
    <div class="tasks">
        <div class="task" v-for="(task, _) in tasks">
          <div class="task-entity">
              <h1>{{task.wonFaction}}</h1>
          </div>
          <div class="task-entity">
            <img class="map-img" :style="backgroundStyle(imageLinkByMap(task.playedMap))" alt=""/>
            <h1>{{task.playedMap}}</h1>
          </div>
          <div class="task-entity">
              <h1 :class="getColor(task.wasPredictionRight)">{{task.wasPredictionRight}}</h1>
          </div>
          <div class="task-entity">
            <a :href="task.matchLink" target="_blank" class="link">🔗</a>
          </div>
          <div class="task-entity">
            <h2>{{getDateFromUnix(task.createdAt)}}</h2>
          </div>
          </div>
      </div>
  </div>
</template>

<script>
import {useSharedStore} from "@/utils/store.js";
import {getUserTasks} from "@/services/tasks.js";

export default {
  name: 'tasks',
  setup(){
    const store = useSharedStore();
    return {store};
  },

  data(){
    return {
      tasks: null
    }
  },

  created() {
    this.getUserTask();
  },

  beforeRouteLeave(to, from, next){
    this.tasks = null;
    next();
  },

  methods: {
    async getUserTask() {
      try {
        console.log(this.store.$state.user.id);
        this.tasks = await getUserTasks(this.store.$state.user.id)
      } catch (error) {
        console.log(error);
      }
    },
    backgroundStyle(link) {
      return {
        backgroundImage: `url(${link})`,
      }
    },

    getDateFromUnix(timestamp) {
        return new Date(timestamp * 1000).toLocaleString();
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

    getColor(result) {
      if(result){
        return 'result green';
      }
        return 'result red';
      }
  },
};
</script>

<style scoped>

.task-entity{
  color: white;
  align-items: center;
  text-align: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  flex-grow: 1;
  margin-left: 40px;
  position: relative;
}

.title{
  text-align: center;
  font-weight: bold;
  font-size: 36px;
  color: white;
  height: 10%;
}
.tasks-view {
  background-color: #232323;
  width: 100%;
  height: 100%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

}

.task{
  width: 90%;
  max-height: 40%;
  display: flex;
  flex-direction: row;
  background-color: #1e1e1e;
  margin-top: 20px;
  border-radius: 10px;
}

.tasks{
  width: 100%;
  height: 90%;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow: scroll;
}

.map-img{
  background-size: cover;
  height: 110px;
  width: 100%;
}

.result.green {
  color: rgb(18, 255, 18);
}

.result.red {
  color: rgb(255, 35, 35);
}

</style>
