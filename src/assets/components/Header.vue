<template>
    <div id="header" class="flex p-5 items-center bg-blue-800 shadow-lg">
      <div class="w-4/12"></div>
        <h1
        class="text-center w-4/12 text-3xl font-bold text-red-500">
            {{viewTitle}}
        </h1>
        <div class="text-lg text-right w-4/12 text-white flex flex-row-reverse " v-if="user">
            <button @click=" () => {
              if($route.name !== 'Login')
                $router.push('/login')}" 
                class="  bg-blue-800 hover:bg-blue-900 shadow-xl px-2 py-1">
                <p v-if="user">{{user}}</p>
                <p v-else>Login</p>
            </button>
            <Navigation class="pr-3"/>
        </div>
        
    </div>
</template>

<script>
import Navigation from './Navigation';

export default {
    name: 'Header',
    components: {
      Navigation,
    },
    data() {
        return {
            user: this.getCookie('user'),
            viewTitle: this.$route.name
        }
    },
    watch: {
    '$route' () {
      this.user = this.getCookie('user'),
      this.viewTitle = this.$route.name;
    }
  },
  methods: {
    getCookie(cname) {
      var name = cname + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }
  }
    
}
</script>

<style scoped>

</style>

