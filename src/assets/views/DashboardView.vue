<template>
    <div>
        <h1 v-if="dashboard"
        class="p-5 text-2xl text-center text-white">
            {{dashboard.title}}
        </h1>
        <NoteComponent v-if="dashboard" :dashboard_id="dashboardId" :notesProp="dashboard.notes"></NoteComponent>
    </div>
</template>

<script>
import Axios from 'axios';
import NoteComponent from '../components/NoteComponent'


export default {
    name: 'DashboardView',
    components: {
        NoteComponent
    },
    data() {
        return {
            dashboardId: this.$route.params.dashboardId,
            dashboard: null
        }
    },
    created() {
        this.getDashboard();
    },
    methods: {
        getDashboard() {
            Axios.get("http://localhost:4000/api/getDashboard", {
                params: {
                    id: this.dashboardId
                }
            })
            .then(res => {
                this.dashboard = res.data.data;
            })
            .catch(err => {
                console.log(err);
            })
        }
    }
}
</script>

<style scoped>

</style>