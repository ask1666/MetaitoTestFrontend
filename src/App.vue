<template>
  <div id="app"
  class="">
    <Header/>
    <!-- <Navigation/> -->
    <router-view/>
    
  </div>
</template>

<script>
import Header from './assets/components/Header';
/* import Navigation from './assets/components/Navigation'; */


export default {
  name: 'App',
  components: {
    Header,
    /* Navigation */
  },
  data() {
    return {
      headerProps: {
        username: "Log In"
      }
    }
  }
}
</script>

<style>

body {
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.4;
  background-color: #23395B;
}



</style>
