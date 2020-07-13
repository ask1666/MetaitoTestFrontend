<template>
    <div id="header" class="flex p-5 items-center bg-blue-800 shadow-lg">
      <div class="w-1/12"></div>
        <h1
        class="text-center w-10/12 text-3xl font-bold text-red-500">
            {{viewTitle}}
        </h1>
        <div class="text-lg text-right w-1/12 text-white flex  " v-if="user">
            <Navigation class="pr-3"/>
            <button @click=" () => {
              if($route.name !== 'Login')
                $router.push('/login')}" 
                class="  bg-blue-800 hover:bg-blue-900 shadow-xl px-2 py-1">
                {{user}}
            </button>
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
            user: sessionStorage.getItem('user'),
            viewTitle: this.$route.name
        }
    },
    watch: {
    '$route' () {
      this.user = sessionStorage.getItem('user');
      this.viewTitle = this.$route.name;
    }
  }
    
}
</script>

<style scoped>

</style>

