<template>

    <div class="p-5">
        <form>
            <div class="flex w-1/2 rounded-t border-b-2 border-opacity-25 border-gray-800" style="background-color: #FDF288;">
                <div class=" w-1/3 p-1">
                    <span class="text-sm block text-center">Select Note:</span>
                    <select class=" text-xs h-6 w-full self-center block" id="noteSelect" style="background-color: #FCE93B;">
                        <option class="text-xs" v-for="note in notes" v-bind:key="note.id">{{note.title}}</option>
                    </select>
                </div>
                <div class=" w-1/3 p-1">
                    <span class="text-sm block text-center">Markdown:</span>
                    <select class="text-xs h-6 w-full self-center block" id="markdown" style="background-color: #FCE93B;">
                        <option class="text-xs" value="Markdown">Markdown</option>
                        <option class="text-xs" value="Text">Text</option>
                    </select>
                </div>
                <button @click="toggleEdit()" type="button" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline">
                    <p v-if="!edit">Edit</p>
                    <p v-else>Done</p>
                </button>
            </div>
            <div v-if="edit" class=" w-1/2" style="background-color: #FDF288; background-size: cover;">
                <input @change="getText()" :value="inputTitle" type="text" id="inputTitle" placeholder="Enter Title"
                class="bg-transparent text-xl border-b-2 border-opacity-25 border-gray-800 focus:outline-none font-bold text-center placeholder-gray-700 p-3 w-full">
                <textarea @change="getText()" id="inputText" data-preview="#noteText" cols="50" rows="10" placeholder="Enter text for your note..."
                class="bg-transparent h-64 text-lg focus:outline-none leading-8 text-black placeholder-gray-700 pt-2 px-10 w-full"
                style="line-height: 1.5rem;" :value="inputText"></textarea>
            </div>
            <div v-else class=" w-1/2" style="background-color: #FDF288; background-size: cover;">
                <h1 type="text" id="noteTitle"
                class="bg-transparent text-xl border-b-2 border-opacity-25 border-gray-800 focus:outline-none font-bold text-center placeholder-gray-700 p-3 w-full">
                    <p v-if="inputTitle">{{inputTitle}}</p>
                    <p v-else>Nothing</p>
                </h1>
                <div id="noteText" class=" markdown h-64 placeholder-gray-700 pt-2 px-10">
                    {{result}}
                </div>
            </div>
            <div class="flex justify-end border-t-2 p-2 border-opacity-25 border-gray-800 w-1/2 rounded-b" style="background-color: #FDF288; background-size: cover;">
                <div class=" px-10">
                    <span class="text-sm block text-center">Store As:</span>
                    <select class="text-xs h-6 w-full self-center block" id="saveAs" style="background-color: #FCE93B;">
                        <option class="text-xs" value="Markdown">Markdown</option>
                        <option class="text-xs" value="HTML">HTML</option>
                    </select>
                </div>
                <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline">
                    Save
                </button>
            </div>
        </form>
    </div>
</template>

<script>
let md = require('markdown-it')( {
    html: true,
    linkify: true,
    typographer: true
});




export default {
    name: 'NoteComponent',
    
    data() {
        return {
            notes: Array.isArray(this.$attrs.notesProp) && this.$attrs.notesProp.length 
            ? this.$attrs.notesProp : null,
            edit: false,
            inputText: "",
            inputTitle: "",
            result: "",
        }
    },
    updated() {
        if (document.getElementById("noteText"))
                document.getElementById("noteText").innerHTML = this.result;
    },
    methods: {
        toggleEdit() {
            
            this.edit = !this.edit;
            
        },
        getText() {
            this.inputText = document.querySelector("textarea").value;
            this.inputTitle = document.getElementById("inputTitle").value;
            this.result = md.render(this.inputText);
            
        }
    }
}
</script>

<style scoped>

@import url('../styles/markdown.css');

</style>