<template>
    <div class="chat-page">
      <div class="chat-header">
        <h2>{{ groupId }}</h2>
      </div>
  
      <div class="chat-container">
        <div class="member-list">
          <h3>Members</h3>
          <ul>
            <li v-for="member in members" :key="member.id">{{ member.member.email }}</li>
          </ul>
        </div>
  
        <div class="chat-content">
          <div v-for="chat in chats" :key="chat.id" class="message">
            <div class="message-content">
              <div class="sender">{{ chat.chatwho.email }}</div>
              <div class="text">{{ chat.chat }}</div>
            </div>
          </div>
        </div>
      </div>
  
      <div class="chat-input">
        <textarea v-model="newMessage" placeholder="Type your message"></textarea>
        <button @click.prevent="sendMessage">Send</button>
      </div>
    </div>
  
    <h3><router-link to="/homepage">Back to home</router-link></h3>
  </template>
  
  <script>
  export default {  
    props: ['chatId'],
  
    data() {
      return {
        friendName: "",
        members: [],
        chats: [],
        newMessage: "",
        userId: null,
      };
    },
  
    mounted() {
      this.fetchGroupData();
    },
  
    methods: {
  
      async fetchGroupData() {
        try {
          const chatId = this.chatId;
          console.log("this is chat id:", chatId)
  
          const response = await fetch(`http://localhost:3000/api/friends/${chatId}`, {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          });
  
          if (response.status === 401) {
            console.error("Unauthorized: Invalid credentials");
          } else if (response.ok) {
            const groupData = await response.json();
  
            this.friendName = groupData.friendName;
            this.members = groupData.members;
            this.chats = groupData.chats;
  
            console.log("Received friend Name:", this.friendName);
            console.log("Received Members:", this.members);
            console.log("Received Chats:", this.chats);
          } else {
            console.error("Error fetching group data");
          }
          const userResponse = await fetch("http://localhost:3000/api/users/me", {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          });
  
          if (userResponse.status === 401) {
            console.error("Unauthorized: Invalid credentials");
            return;
          }
  
          if (!userResponse.ok) {
            console.error("Error fetching user data");
            return;
          }
  
          const userData = await userResponse.json();
          this.userId = userData.user.id;
          console.log("this is user id", this.userId)
  
        } catch (error) {
          console.error("Error:", error);
        }
      },
      async sendMessage() {
        try {
  
          const groupId = this.groupId;
  
          const simplifiedChats = this.chats.map(chat => ({
            chat: chat.chat,
            chatwho: chat.chatwho.id,
          }));
  
  
          simplifiedChats.push({
            chat: this.newMessage,
            chatwho: this.userId,
          });
  
  
  
          const updateGroupResponse = await fetch(`http://localhost:3000/api/friends/${chatId}`, {
            method: "PATCH",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              chats: simplifiedChats
            }),
          });
  
          if (updateGroupResponse.status === 401) {
            console.error("Unauthorized: Invalid credentials");
            return;
          }
  
          if (!updateGroupResponse.ok) {
            console.error("Error updating chat content");
            return;
          } else{
            console.log("succeed");
          }
  
          const response = await fetch(`http://localhost:3000/api/friends/${friendId}`, {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          });
  
          if (response.status === 401) {
            console.error("Unauthorized: Invalid credentials");
          } else if (response.ok) {
            const groupData = await response.json();
  
            this.friendName = groupData.friendName;
            this.members = groupData.members;
            this.chats = groupData.chats;
  
            console.log("Received friend Name:", this.friendName);
            console.log("Received Members:", this.members);
            console.log("Received Chats:", this.chats);
          } else {
            console.error("Error fetching group data");
          }
  
        } catch (error) {
          console.error("Error:", error);
        }
      },
    }
  };
  </script>
  
  <style scoped>
  /* Chat page styling */
  .chat-page {
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .chat-header {
    text-align: center;
    margin-bottom: 20px;
  }
  
  .chat-container {
    display: flex;
  }
  
  .member-list {
    flex: 1;
  }
  
  .member-list h3 {
    margin-bottom: 10px;
  }
  
  .member-list ul {
    list-style-type: none;
    padding: 0;
  }
  
  .member-list li {
    margin-bottom: 5px;
  }
  
  .chat-content {
    flex: 3;
    overflow-y: auto;
    max-height: 300px; /* Adjust as needed */
  }
  
  .message {
    display: flex;
    margin-bottom: 10px;
  }
  
  .message-content {
    flex-grow: 1;
  }
  
  .sender {
    font-weight: bold;
  }
  
  .chat-input {
    display: flex;
    margin-top: 20px;
  }
  
  textarea {
    flex-grow: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    resize: none;
  }
  
  button {
    padding: 10px;
    background-color: #28a745;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-left: 10px;
  }
  
  button:hover {
    background-color: #218838;
  }
  </style>
  