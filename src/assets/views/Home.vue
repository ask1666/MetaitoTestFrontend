<template>
    <div>
        <h1
        class="p-5 text-2xl text-center text-white">
        Dashboards
        </h1>
        <h1 v-if="errorMessage">
            {{errorMessage}}
        </h1>
        <div v-if="(this.dashboards === undefined || this.dashboards.length === 0)">
            <h1 class="p-5 text-xl text-center text-red-700">
                You have no dashboards. 
            </h1>
            
        </div>
        <ul v-else-if="!(this.dashboards === undefined || this.dashboards.length === 0)">
            <li class="flex p-3" v-for="dashboard in dashboards" v-bind:key="dashboard.id">
                
                <router-link :to="{name: 'dashboard', params: {dashboardId: dashboard.id}}" class="p-2 text-xl text-center py-4 self-center text-black bg-blue-500 w-11/12 rounded">
                    {{dashboard.title}}
                </router-link>
                <button @click="deleteDash(dashboard.id)">
                    <i class="fa fa-trash fa-2x bg-red-500 py-4 px-4 rounded" aria-hidden="true"/>
                </button>
            </li>
        </ul>
        <CreateDashboard v-on:inputChange="handleChange"/>
    </div>
</template>

<script>
import Axios from 'axios';
import CreateDashboard from '../components/createDashboard';

Axios.defaults.withCredentials = true;

export default {
    name: 'Home',
    components: {
        CreateDashboard
    },
    data() {
        return {
            dashboards: [],
            errorMessage: null
        };
    },
    created() {
        console.log(this.dashboards);
        if (this.dashboards === undefined || this.dashboards.length === 0) 
            this.handleChange();
        
    }, methods: {
        handleChange() {
            Axios.get("http://localhost:4000/api/users/show_user")
            .then (res => {
                this.dashboards = res.data.data.dashboards;
            })
            .catch (err => {
                console.log(err);
                this.errorMessage = "You are not logged in" 
            })
        },
        deleteDash(id) {
            Axios.delete("http://localhost:4000/api/dashboards", {
                params: {
                    id: id
                }
            })
            .then (() => {
                this.handleChange();
            })
            .catch (err => {
                console.log(err);
            })
        }
    }
}
</script>

<style scoped>

</style>