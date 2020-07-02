<template>
  <div id="app"
  class="">
    <Header/>
    <Navigation/>
    
  </div>
</template>

<script>
import Header from './assets/components/Header';
import Navigation from './assets/components/Navigation';


export default {
  name: 'App',
  components: {
    Header,
    Navigation
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
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  
}

body {
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.4;
  background-color: #23395B;
}



</style>
