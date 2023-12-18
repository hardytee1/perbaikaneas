<!-- LogoutPage.vue -->

<template>
    <div class="logout-container">
      <h2>Thank You for Using Hardy Tee App!</h2>
      <p>We hope to see you again soon. Have a great day!</p>
      <router-link to="/">
        <button>Log In Again !!!</button>
      </router-link>
    </div>
  </template>
  
  <script>
  export default {
  };
  </script>
  
  <style scoped>
  .logout-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  h2 {
    color: #28a745;
  }
  
  p {
    color: #555;
  }
  
  button {
    padding: 10px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  