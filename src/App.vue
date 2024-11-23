<template>
  <div id="app">
    <nav>
      <div class="nav-container">
        <ul class="menu center-menu">
          <li><router-link to="/stats">Stats</router-link></li>
          <li><router-link to="/pick">Compare</router-link></li>
          <li><router-link to="/compare">Pick map</router-link></li>
        </ul>

        <ul class="menu right-menu">
          <li><router-link to="/profile">Sign in</router-link></li>
          <li><router-link to="/settings">Sign up</router-link></li>
        </ul>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<style>


body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #232323;
}

#app {
  text-align: center;
  width: 100%;
  height: 100%;
}

nav {
  width: 100%;
  background-color: #1e1e1e;
  position: fixed;
  top: 0;
  left: 0;
  padding: 10px 20px;
  box-shadow: 10px 2px 5px rgba(0, 0, 0, 0.1);
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.menu {
  list-style: none;
  display: flex;
  gap: 15px;
  padding: 0;
  margin: 0;
}

.center-menu {
  margin: 0 auto;
}

.menu li {
  margin: 0;
}

.menu a {
  text-decoration: none;
  color: #b5b5b5;
  font-size: 18px;
  transition: color 0.3s ease, background-color 0.3s ease; /* Smooth hover effect */
}

.menu a:hover {
  background-color: #1e1e1e;
  color: white;
}

.right-menu {
  margin: 0;
}

.right-menu li{
  list-style: none;
  background-color: #ff5b00;
  border-radius: 5px;
}

.right-menu a{
  color: #ffffff;
  border-radius: 5px;
}

.right-menu a:hover {
  background-color: #ff7800;
  color: white;
}

</style>
