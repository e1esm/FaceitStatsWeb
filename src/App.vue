<template>
  <nav>
    <div class="nav-container">
      <div class="left-side">
        <img
            src="https://play-lh.googleusercontent.com/4iFS-rI0ImIFZyTwjidPChDOTUGxZqX2sCBLRsf9g_noMIUnH9ywsCmCzSu9vSM9Jg"
            alt="Logo"
            width="25px"
            height="25px"
        />
        <ul class="menu left-menu" v-if="this.authStore.$state.isAuthenticated">
          <li><router-link to="/stats">Stats</router-link></li>
          <li><router-link to="/compare">Compare</router-link></li>
          <li><router-link to="/pick">Pick map</router-link></li>
        </ul>
      </div>

      <ul class="menu right-menu" v-if="!this.authStore.$state.isAuthenticated">
        <li><router-link to="/login">Sign in</router-link></li>
        <li><router-link to="/signup">Sign up</router-link></li>
      </ul>
    </div>
    </nav>
    <router-view />
  </template>

<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #232323;
}

#app {
  display: flex;
  flex-direction: column;
}

nav {
  width: 100%;
  background-color: #1e1e1e;
  padding: 10px 20px;
  box-shadow: 10px 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left-side {
  display: flex;
  align-items: center;
}

.left-side img {
  margin-right: 15px;
}

.menu {
  list-style: none;
  display: flex;
  gap: 15px;
  padding: 0;
  margin: 0;
}

.left-menu {
  margin-left: 25px;
  display: flex;
  gap: 30px;
}

.menu li {
  margin: 0;
}

.menu a {
  text-decoration: none;
  color: #b5b5b5;
  font-size: 18px;
  transition: color 0.3s ease, background-color 0.3s ease;
}

.menu a:hover {
  background-color: #1e1e1e;
  color: white;
}

.right-menu {
  margin: 0;
}

.right-menu li {
  list-style: none;
  width: 100px;
  background-color: #ff5b00;
  border-radius: 5px;
  padding-left: 10px;
}

.right-menu a {
  color: #ffffff;
  border-radius: 5px;
}

.right-menu a:hover {
  background-color: #ff7800;
  color: white;
}

</style>

<script>
import {useSharedStore} from "@/utils/store.js";

export default {
  name: 'App',
  setup(){
    const authStore = useSharedStore();
    return {authStore};
  },
}
</script>