<template>
  <div class="credential-views">
    <h1 class="title">Credentials</h1>
        <div class="credentials-entity">
          <h1>New faceit link</h1>
          <input v-model="faceitLink" type="text" placeholder="Enter new link"/>
        </div>

    <div class="credentials-entity">
      <h1>Change password</h1>
      <input v-model="currPassword" type="text" placeholder="Enter current password"/>
      <input v-model="newPassword" type="text" placeholder="Enter new password"/>
    </div>

    <div class="credentials-entity" align="center">
      <button @click="submitData" class="stats-button">Submit credentials</button>
    </div>

    </div>
</template>

<style scoped>


input{
  position: relative;
  width: 70%;
  height: 40%;
  margin-top: 1%;
  padding-left: 1%;
  font-size: 16px;
  background-color: #222;
  color: white;
  border-radius: 10px;
  border: 1px solid #ffffff;
  overflow: scroll;
}

.credential-views {
  background-color: #232323;
  width: 100%;
  height: 100%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  overflow: scroll;
  display: flex;
  gap: 3%;
  flex-direction: column;
}

.credentials-entity{
  width: 100%;
  height: 0 auto;
  padding-left: 10px;
  display: flex;
  flex-direction: column;
}

.credentials-entity h1{
  position: relative;
  color: white;
  font-size: 18px;
}

.title{
  text-align: center;
  font-weight: bold;
  font-size: 36px;
  color: white;
  height: 10%;
}

.stats-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #ff5b00;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  width: 50%;
}

.stats-button:hover {
  background-color: #ff7800;
}

</style>

<script>

import {useSharedStore} from "@/utils/store.js";
import {updateUser} from "@/services/user.js";
import { toRaw } from 'vue';

export default {
  name: 'Credentials',

  setup() {
    const store = useSharedStore();
    return {store};
  },

  data() {
    return {
      faceitLink: '',
      currPassword: '',
      newPassword: ''
    }
  },

  methods: {
    async submitData() {
      let user = toRaw(this.store.$state.user);
      let updatedUser = user;
      let onlyFaceit = true;
      if (this.faceitLink.length > 0) {
        updatedUser.faceitLink = this.faceitLink;
      }

      if (this.currPassword.length === 0 && this.newPassword.length === 0 && this.faceitLink.length === 0) {
        alert('No options were provided');
        return;
      }

      if (this.currPassword.length > 0 && this.newPassword.length === 0) {
        alert('No new password entered.');
        return;
      }

      if (this.newPassword.length > 0 && this.currPassword.length === 0) {
        alert('Previous password was not entered.');
        return;
      }

      if (this.newPassword.length > 0) {
        onlyFaceit = false;
      }

      let afterUpdateUser;
      try{
        afterUpdateUser = await updateUser(updatedUser, this.newPassword, this.currPassword);
      }catch (err){
        console.log(err);
        this.store.setUser(user);
        return;
      }
      this.store.setUser(afterUpdateUser);
      this.faceitLink = '';

      if(!onlyFaceit) {
        this.$router.push('/login');
        localStorage.clear();
      }
    }
  },
}
</script>