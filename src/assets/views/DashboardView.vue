<template>
    <div>
        <h1 v-if="dashboard"
        class="p-5 text-2xl text-center text-white">
            {{dashboard.title}}
        </h1>
        <div class=" w-full flex md:flex-row flex-col">
            <NoteComponent v-if="dashboard" :dashboard_id="dashboardId" :notesProp="dashboard.notes"></NoteComponent>
            <LinksView class="" v-if="dashboard" :dashboard_id="dashboardId" :linksProp="dashboard.links"></LinksView>
        </div>
    </div>
</template>

<script>
import Axios from 'axios';
import NoteComponent from '../components/NoteComponent';
import LinksView from '../components/LinksView';

export default {
    name: 'DashboardView',
    components: {
        NoteComponent,
        LinksView
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