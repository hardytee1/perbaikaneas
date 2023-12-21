<template>
	<main>
    <div class="item">
      <h1>Hello, {{ userEMAIL }}</h1>
      <h2>Send Message</h2>
      <form @submit="filterChats">
        <input type="text" placeholder="Recipient Email" v-model="resepEMAIL" class="rec-input" />
        <button type="submit" class="rec-submit">Open Chats</button>
      </form>
    </div>
    <div class="item">
      <h2>Chats from {{ resepEMAIL }}</h2>
      <p v-for="c in chat">> {{ c.Sender == userEMAIL ? "You" : "Them" }} : {{ c.content }}</p>
    </div>
    <form class="message-group" @submit="sendMessage">
      <input type="text" placeholder="Type your chat here" v-model="msgContent" />
      <button type="submit">Send</button>
    </form>
	</main>
</template>

<script>
export default {
  data() {
    return {
      userEMAIL: "",
      resepEMAIL: null,
      chat: [],
      msgContent: null,
    };
  },
  mounted() {
    // Fetch the data for the username, group name, and members
    this.getuserid();
  },
  methods: {
    async getuserid() {
    try {
      const response = await fetch(`http://localhost:3000/api/users/me`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 401) {
        console.error("Unauthorized: Invalid credentials");
      } else if (response.ok) {
        const Data = await response.json();
        this.userEMAIL = Data.user.email;
          // Log the received data for verification
        console.log("User email:", this.userEMAIL);
      } else {
        console.error("Error fetching group data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  },
    async filterChats(event) {
      event.preventDefault();
      try {
        const res = await fetch("http://localhost:3000/api/friends", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const json = await res.json();
        this.chat = json.docs.filter(c =>
        (c.Sender == this.userEMAIL && c.Reciever == this.resepEMAIL) || 
      (c.Sender == this.resepEMAIL && c.Reciever == this.userEMAIL))
      } catch (error) {
        console.error("Error:", error);
      }
    },
    async sendMessage(event) {
      event.preventDefault();
      try {
        const res = await fetch("http://localhost:3000/api/friends", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            Sender: this.userEMAIL,
            content: this.msgContent,
            Reciever: this.resepEMAIL,
      })
        });
        if (res.ok) {
      // Do something with a successful response
      console.log("Message sent successfully");
    } else {
      console.error("Error sending message");
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