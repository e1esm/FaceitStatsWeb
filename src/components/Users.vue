<template>
  <div class="users-view">
    <h1 class="title">Users</h1>
    <div class="users">
      <div class="user" v-for="(user, _) in users">
        <div class="user-entity">
          <h1>{{user.id}}</h1>
        </div>
        <div class="user-entity">
          <h1>{{user.username}}</h1>
        </div>
        <div class="user-entity">
          <h1>{{getRoleByApiRole(user.role)}}</h1>
        </div>
        <div class="user-entity">
          <a :href="user.faceitLink" target="_blank" class="link">🔗</a>
        </div>
        <div class="user-entity">
          <button class="user-button" @click="setNewRole(user)">⬆️</button>
        </div>
        <div class="user-entity">
          <button class="user-button" @click="deleteUser(user)">❌️</button>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import {deleteUser, getPlatformUsers, updateUser} from "@/services/user.js";

  export default {
    name: "Users",
    data() {
      return {
        users: null,
      }
    },

      created(){
        this.getUsers()
      },

      methods: {
        async getUsers(){
          try {
            this.users = await getPlatformUsers();
          }catch (error) {
            console.log(error);
          }
        },

        async deleteUser(user){
          if(user.role === 'ROLE_ADMIN'){
            alert('No permission to delete');
            return;
          }

          this.users = this.users.filter(u => u.id !== user.id);

          await deleteUser(user);
        },

        getRoleByApiRole(role){
          return role.substring(role.indexOf('_') + 1).toLowerCase()
        },

        async setNewRole(user){
            try{
              user.role = 'ROLE_ADMIN';
              await updateUser(user, '', '');
            }catch (error) {
              console.log(error);
            }
        },
      }
  }
</script>


<style scoped>

.user-button{
  position: relative;
  align-items: center;
  height: 30px;
  background-color: inherit;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.users-view {
  background-color: #232323;
  width: 100%;
  height: 100%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

}

.title{
  text-align: center;
  font-weight: bold;
  font-size: 36px;
  color: white;
  height: 10%;
}

.users{
  width: 100%;
  height: 90%;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow: scroll;
}

.user{
  width: 90%;
  max-height: 40%;
  display: flex;
  flex-direction: row;
  background-color: #1e1e1e;
  margin-top: 20px;
  border-radius: 10px;
  overflow: scroll;
}

.user-entity{
  color: white;
  align-items: center;
  text-align: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  flex-grow: 1;
  margin-left: 40px;
  position: relative;
}


</style>