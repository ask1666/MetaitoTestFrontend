<template>
  <div id="app">
    <h1 class="font-sans font-bold text-3xl text-red-500 text-center">
      {{msg}}
    </h1>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {

  },
  data() {
    return {
      msg: 'Tailwind Test!'
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
}
</style>
