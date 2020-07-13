<template>
  <div>
    <div class="pb-10"/>
    <div class="pt-5 w-full flex justify-center">
      <form class="bg-blue-800 shadow-xl px-8 pt-6 pb-8 mb-4" @submit="createUser">
        <div class="mb-4">
          <label class="block text-gray-200 text-md font-bold font-sans mb-2" for="Email">Email</label>
          <input
            v-model="email"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Email"
            required
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-200 text-md font-bold font-sans mb-2" for="password">Password</label>
          <input
            v-model="password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <div class="items-center">
          <h1 v-if="errorMessage" class="text-center pb-2 text-red-700 font-bold">{{errorMessage}}</h1>
          <button
            class="w-full bg-blue-500 hover:bg-blue-700 shadow-lg text-white font-bold py-2 px-4"
            type="submit"
          >Create User</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  name: "CreateUser",
  data() {
    return {
      email: null,
      password: null,
      errorMessage: null
    };
  },
  methods: {
    createUser: function(e) {
      if (this.validateEmail(this.email)) {
        e.preventDefault();
        Axios.post("http://localhost:4000/api/users", {
          email: this.email,
          password: this.password
        })
          .then(res => {
            console.log(res);
            this.errorMessage = null;
            this.$router.push("login");
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        this.errorMessage = "Invalid Email!";
      }
    },
    validateEmail(str) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(str).toLowerCase());
    }
  }
};
</script>

<style scoped>
</style>