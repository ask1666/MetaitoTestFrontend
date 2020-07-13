import Vue from 'vue'
import Router from 'vue-router'
import Home from './assets/views/Home'
import CreateUser from './assets/views/CreateAccount'
import Login from './assets/views/Login'
import DashboardView from './assets/views/DashboardView'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/createUser',
            name: 'Create User',
            component: CreateUser
        }, 
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/dashboard/:dashboardId',
            name: 'Dashboard',
            component: DashboardView
        }
    ]
})
