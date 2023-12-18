
<template>
  <div class="signup-container">
    <h2>Sign Up</h2>
    <form @submit.prevent="handleSignup">
      <label for="email">Email:</label>
      <input type="email" id="Email" v-model="Email" required />

      <label for="newPassword">New Password:</label>
      <input type="password" id="Password" v-model="Password" required />

      <button type="submit">Sign Up</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Email: "",
      Password: "",
    };
  },
  methods: {
    async handleSignup() {
      try {
        const res = await fetch("http://localhost:3000/api/users", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: this.Email,
            password: this.Password,
          }),
        });

        if (res.status === 401) {
          console.error("Unauthorized: Invalid credentials");
        } else {
          const json = await res.json();
          console.log(json);
          // Use Vue Router to navigate to the dashboard route
          this.$router.push("/homepage");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 8px;
}

input {
  padding: 8px;
  margin-bottom: 16px;
}

button {
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>