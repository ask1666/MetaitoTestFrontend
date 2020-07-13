<template>
  <div>
    <div class="pb-10"/>
    <div class="pt-5 w-full flex justify-center">
      <form class="bg-blue-800 shadow-xl px-8 pt-6 pb-8 mb-4" @submit="login">
        <div class="mb-4">
          <label class="block text-gray-200 text-md font-bold font-sans mb-2" for="email">Email</label>
          <input
            v-model="email"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Email"
            required
          />
        </div>
        <div class="mb-6">
          <label class="block text-gray-200 text-md font-bold font-sans mb-2" for="password">Password</label>
          <input
            v-model="password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <h1 v-if="errorMessage" class="text-red-700 pb-2 font-bold">{{errorMessage}}</h1>
        <div class="flex items-center justify-between">
          <button
            class="bg-blue-500 hover:bg-blue-700 shadow-lg text-white font-bold py-2 px-4 "
            type="submit"
          >Sign In</button>
          <a
            @click="$router.push('createUser')"
            class="inline-block align-baseline font-bold text-sm text-white hover:text-gray-400"
            href="#"
          >Create account</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Axios from "axios";

Axios.defaults.withCredentials = true;
export default {
  name: "Login",
  data() {
    return {
      email: null,
      password: null,
      errorMessage: null
    };
  },
  methods: {
    login: function(e) {
      e.preventDefault();

      Axios.post("http://localhost:4000/api/users/sign_in", {
        email: this.email,
        password: this.password
      })
        .then(res => {
          console.log(res);
          this.errorMessage = null;
          this.setCookie('user',this.email,1);
          this.$router.push("/");
        })
        .catch(err => {
          console.log(err);
          this.errorMessage = "Invalid username or password!";
        });
    },
    setCookie(cname,cvalue,exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      var expires = "expires="+ d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
  }
};
</script>

<style scoped>
</style>