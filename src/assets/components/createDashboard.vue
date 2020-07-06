<template>
    <div class="p-5 text-center text-white">
        
        <div v-if="!createBtn" class="pt-5 w-full w-full flex justify-center">
            <form @submit="createDashboard"
            class="bg-blue-500 shadow-md rounded px-8 pt-6 pb-6 mb-4">
                <button @click="toggleCreateForm()" class="float-right" type="button">
                    <i class="fa fa-times" aria-hidden="true"/>
                </button>
                <label for=""
                class="block text-black text-sm font-bold mb-2">
                    Enter a title
                </label>
                <input v-model="title" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Title">
                <div class="pt-5">
                    <p v-if="errorMessage" class="text-red-800 font-bold">
                        {{errorMessage}}
                    </p>
                    <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Submit
                    </button>
                </div>
            </form>
        </div>

        <button v-else @click="toggleCreateForm()" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline">
            Create new
        </button>
    </div>
</template>

<script>
import Axios from 'axios';


export default {
    name: 'CreateDashboard',
    
    data() {
        return {
            createBtn: true,
            title: null,
            errorMessage: null
        }
    },
    methods: {
        createDashboard(e) {
            e.preventDefault();
            this.title = this.title.charAt(0).toUpperCase() + this.title.slice(1);
            Axios.post('http://localhost:4000/api/dashboards', {
                title: this.title
            })
            .then( () => {
                this.toggleCreateForm();
                this.errorMessage = null;
                this.$emit('inputChange');
            })
            .catch(err => {
                console.log(err);
                this.errorMessage = "You already have a dashboard with that title!"
            })
        },
        toggleCreateForm() {
            this.errorMessage = null;
            this.createBtn = !this.createBtn;
        }
    }
}
</script>