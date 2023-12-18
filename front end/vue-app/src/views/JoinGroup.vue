<template>
  <div class="login-container">
    <h2>Choose the group chat room !!!</h2>
    <form @submit.prevent="joinGroup">
      <label for="groupname">Group name:</label>
      <input type="text" id="groupname" v-model="groupName" required />
      <button type="submit">Join group</button>
      <br>
      <button type="submit">Enter group</button>
    </form>
  </div>
  <button @click="backtocreate">Create Group instead</button>

</template>

<script>
export default {
  data() {
    return {
      groupName: "",
      groupMembers: [],
    };
  },
  methods: {

    backtocreate(){
      this.$router.push("/homepage");
    },

    async joinGroup() {
      try {
        // Step 1: Fetch user data to get the user ID
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
        const userId = userData.user.id;
        console.log("this is user id", userId)

        // Step 2: Fetch all groups to find the group ID based on the provided group name
        const groupsResponse = await fetch("http://localhost:3000/api/groups", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (groupsResponse.status === 401) {
          console.error("Unauthorized: Invalid credentials");
          return;
        }

        if (!groupsResponse.ok) {
          console.error("Error fetching all groups");
          return;
        }

        const groupsData = await groupsResponse.json();

        if (groupsData.docs && Array.isArray(groupsData.docs)) {
          // Find the target group by group name
          const targetGroup = groupsData.docs.find((group) => group.groupName === this.groupName);

          if (!targetGroup) {
            console.error(`Group with name '${this.groupName}' not found`);
            return;
          }

          console.log("this is group id", targetGroup.id);

          // Store group members in the data property
          this.groupMembers = targetGroup.members.map((member) => member.member.id);
          
          console.log("Group members:", this.groupMembers);

          if (!this.groupMembers.includes(userId)) {
            this.groupMembers.push(userId);
            console.log("New member added to the group:", userId);
          } else {
            console.log("User is already a member of the group:", userId);
          }
        const updateGroupResponse = await fetch(`http://localhost:3000/api/groups/${targetGroup.id}`, {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            members: this.groupMembers.map(memberId => ({ member: memberId })),
          }),
        });

        if (updateGroupResponse.status === 401) {
          console.error("Unauthorized: Invalid credentials");
          return;
        }

        if (!updateGroupResponse.ok) {
          console.error("Error updating group members");
          return;
        } else{
          this.$router.push(`/chat/${targetGroup.id}`);
          console.log("Group members in the server");
        }

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
