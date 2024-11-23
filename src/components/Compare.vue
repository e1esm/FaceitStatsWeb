<template>
    <div id="app">
    <NavBar />
  <div class="container">
    <div class="half">
      <input v-model="input1" placeholder="Enter first user to compare" />
      <button @click="handleClick(1)">Submit</button>
    </div>

        <div class="divider"></div>

    <div class="half">
      <input v-model="input2" placeholder="Enter second user to compare" />
      <button @click="handleClick(2)">Submit</button>
    </div>
  </div>
</div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';

export default {
  name: "Stats",
  components: {
    NavBar,
  },
  data() {
    return {
      input1: '',
      input2: ''
    };
  },
  methods: {
    handleClick(buttonNumber) {
      alert(`Вы нажали кнопку ${buttonNumber}`);
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  height: 100vh;
  width: 100vw;
}

.divider {
  width: 2px;
  background-color: #575757; 
  height: 100vh;
}

.half {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;    
}

input {
  position: absolute;
  top: 100px;
  padding: 10px;
  height: 40px;
  font-size: 16px;
  width: 25%;
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
  position: absolute;
  top: 155px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #ff5b00;
  box-shadow: 10px 10px 5px rgba(0, 0, 0, 0.1);
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  width: 20%;
}

button:hover {
  background-color: #ff7800;
}
</style>
