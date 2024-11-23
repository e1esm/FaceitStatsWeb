<template>
  <nav>
    <div class="nav-container">
      <div class="left-side">
        <img src="https://seeklogo.com/images/F/faceit-logo-B519B0AC75-seeklogo.com.png" alt="Logo" width="25px" height="25px" />
        <ul class="menu left-menu">
          <li><router-link to="/stats">Stats</router-link></li>
          <li><router-link to="/compare">Compare</router-link></li>
          <li><router-link to="/pick">Pick map</router-link></li>
        </ul>
      </div>
      <ul class="menu right-menu">
        <li><router-link to="/profile">Sign in</router-link></li>
        <li><router-link to="/settings">Sign up</router-link></li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar"
};
</script>

<style scoped>
nav {
  width: 100%;
  background-color: #1e1e1e;
  position: fixed;
  top: 0;
  left: 0;
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
  background-color: #ff5b00;
  border-radius: 5px;
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
