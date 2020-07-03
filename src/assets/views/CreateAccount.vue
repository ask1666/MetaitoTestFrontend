<template>
    <div>
        <h1
        class="p-5 text-2xl text-center text-white">
        Create User
        </h1>
        <div class=" pt-5 w-full w-full flex justify-center ">
            <form class="bg-blue-500 shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit="createUser">
                <div class="mb-4">
                <label class="block text-black text-sm font-bold mb-2" for="Email">
                    Email
                </label>
                <input v-model="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Email">
                </div>
                <div class="mb-6">
                <label class="block text-black text-sm font-bold mb-2" for="password">
                    Password
                </label>
                <input v-model="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="Password" >
                </div>
                <div class="flex items-center">
                <button class=" w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Create Account
                </button>
                
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import Axios from 'axios';
export default {
    name: 'CreateUser',
    data() {
        return {
            email: null,
            password: null
        }
    },
    methods: {
        createUser: function (e) {
            e.preventDefault()
            Axios.post('http://localhost:4000/api/users', {
                email: this.email,
                password: this.password
            })
            .then (res => {
                console.log(res);
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