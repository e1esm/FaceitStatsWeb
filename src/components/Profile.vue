<template>
  <div class="profile">
    <h1 class="username">{{user.username}}</h1>
    <div class="active-tab">
      <div class="menu-column">
        <ul>
          <li>
            <button @click="selectView('tasks')" :class="{ active: currentView === 'tasks' }" class="menu-item">Tasks</button>
          </li>
          <li>
            <button @click="selectView('news')" :class="{ active: currentView === 'news' }" class="menu-item">Change credentials</button>
          </li>
          <li>
            <button @click="selectView('users')" :class="{ active: currentView === 'users' }" class="menu-item" v-if="user.role==='ROLE_ADMIN'">Users</button>
          </li>
          <li>
            <button @click="selectView('about')" :class="{ active: currentView === 'about' }" class="menu-item" v-if="user.role==='ROLE_ADMIN'">Reports</button>
          </li>
        </ul>
      </div>

      <div class="content">
        <component :is="currentView"></component>
      </div>

    </div>
  </div>
</template>

<style scoped>
.active-tab {
  display: flex;
  flex-direction: row;
  width: 90%;
  height: 90%;
  background-color: #191919;
  left: 50%;
  margin-top: 10px;
  position: relative;
  transform: translateX(-50%);
}

.menu-column {
  width: 30%;
  height: 100%;
  background-color: #1e1e1e;
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 20px;
}

.menu-item {
  color: white;
  background-color: #ff5b00;
  border: none;
  padding: 10px;
  cursor: pointer;
  font-size: 2vw;
  width: 100%;
  text-align: center;
  filter: brightness(100%);
  overflow: scroll;
}

.menu-item.active {
  background-color: #ff711f;
}

ul {
  list-style-type: none;
}

.menu-item:hover {
  background-color: #ff8134;
}

.username {
  text-align: center;
  color: white;
    font-size: 36px;
  text-shadow: 1px 1px 2px white;
}


.profile {
  width: 90%;
  height: 90%;
  position: relative;
  left: 50%;
  margin-top: 25px;
  transform: translateX(-50%);
  background-color: #1e1e1e;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.content {
  width: 70%;
  height: 100%;
  background-color: #1e1e1e;
}

</style>

<script>
import {getCurrentUser} from "@/services/auth.js";
import {useSharedStore} from "@/utils/store.js";
import TaskView from "@/components/Tasks.vue"
import UserView from "@/components/Users.vue"

export default {
  name: 'Profile',

  setup(){
    const store = useSharedStore();
    return {store};
  },

  data(){
    return{
      user: null,
      currentView: '',
    }
  },

  components: {
    users: UserView,
    tasks: TaskView
  },

  created(){
    this.currUser();
  },

  methods:{
    selectView(view) {
      console.log(view);
      this.currentView = view;
    },

    async currUser(){
      try {
        this.user = await getCurrentUser()
        this.store.setUser(this.user);
      }catch(error){
        console.log(error)
      }
    }
  },
}
</script>