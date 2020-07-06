<template>
    <div id="nav">
        <div class="flex">
            <router-link class="border-gray-800 border-l-2 border-r-2 text-center flex-auto bg-blue-600 p-2 hover:bg-blue-400 rounded"
             to="/login">Login</router-link>
            <router-link class="border-gray-800 border-r-2 text-center flex-auto bg-blue-600 p-2 hover:bg-blue-400 rounded"
             to="/createUser">Create user</router-link>
            <router-link class="border-gray-800 border-r-2 text-center flex-auto bg-blue-600 p-2 hover:bg-blue-400 rounded"
             to="/">Dashboards</router-link>
        </div>
        <router-view/>
    </div>
</template>

<script>
export default {
    name: 'Navigation'
}
</script>

<style scoped>
   
</style>