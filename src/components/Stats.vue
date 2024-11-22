<template>
  <div id="app">
    <NavBar />

    <div class="content">
      <div class="input-container">
        <input v-model="inputData" type="text" placeholder="Enter nickname" />
        <button @click="submitData">Get stats</button>
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
      inputData: '',
    };
  },
  methods: {
    submitData() {
      console.log('Data submitted:', this.inputData);
      this.inputData = '';
    }
  }
};
</script>

<style scoped>
/* Content styles specific to the Stats view */
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
  width: 300px; /* Optional: limit width */
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
</style>
