<template>
    <div>
        <h1
        class="p-5 text-2xl text-center text-white">
        Home
        </h1>
        <h1 v-if="errorMessage">
            {{errorMessage}}
        </h1>
        <div v-if="(this.dashboards === undefined || this.dashboards.length === 0)">
            <h1 class="p-5 text-xl text-center text-red-700">
                You have no dashboards. 
            </h1>
            <!-- TODO create new createDashboardComponent -->
        </div>
        <ul v-else-if="!(this.dashboards === undefined || this.dashboards.length === 0)">
            <li class="p-3" v-for="dashboard in dashboards" v-bind:key="dashboard.title">
                <p class="p-2 text-xl text-center text-black bg-blue-500 rounded">
                    {{dashboard.title}}
                </p>
            </li>
        </ul>
    </div>
</template>

<script>
import Axios from 'axios';

Axios.defaults.withCredentials = true;

export default {
    name: 'Home',
    
    data() {
        return {
            dashboards: [],
            errorMessage: null
        };
    },
    created() {
        Axios.get("http://localhost:4000/api/users/show_user")
            .then (res => {
                this.dashboards = res.data.data.dashboards;
                //console.log(this.dashboards)
            })
            .catch (err => {
                console.log(err);
                this.errorMessage = "You are not logged in" 
            })
    }, methods: {
        
    }
}
</script>

<style scoped>

</style>