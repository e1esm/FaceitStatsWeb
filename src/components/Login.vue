<template>
  <div class="registration-form">
    <h2>Login</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="username">Username</label>
        <input
            type="text"
            id="username"
            v-model="form.username"
            placeholder="Enter your username"
            required
        />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
            type="password"
            id="password"
            v-model="form.password"
            placeholder="Enter your password"
            required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>


<script>
import { login } from "@/services/auth.js";
import router from "@/routers/index.js";

export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async handleSubmit() {
      if (this.form.username.length === 0) {
        alert("Username cannot be empty!");
        return;
      }

      if (this.form.password.length < 6) {
        alert("Password must be at least 6 characters long!");
        return;
      }

      try {
        const jwtToken = await login(this.form);
        localStorage.setItem('token', JSON.stringify(jwtToken));
        await router.push("/stats");
      } catch (err) {
        console.error("Error logging in:", err);
        alert("Invalid username or password. Please try again.");
      }
    },
  },
};
</script>


<style scoped>
.registration-form {
  position: relative;
  width: 400px;
  height: 350px;
  margin: 0 auto;
  margin-top: 100px;
  padding: 20px;
  border: 1px solid #ff5b00;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: #1e1e1e;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #8a8a8a;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #8a8a8a;
}

input {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  color: #fff;
  background-color: #ff5b00;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #ff8138;
}
</style>