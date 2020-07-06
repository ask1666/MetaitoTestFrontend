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
            name: 'home',
            component: Home
        },
        {
            path: '/createUser',
            name: 'createUser',
            component: CreateUser
        }, 
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/dashboard/:dashboardId',
            name: 'dashboard',
            component: DashboardView
        }
    ]
})
