<template>
    <div class="p-5">
        <div class=" w-1/2 bg-local rounded" style="background-image: url('NotepadBG.png'); background-size: cover;">
            <input type="text" id="inputTitle" placeholder="Enter Title"
            class="bg-transparent text-xl underline focus:outline-none font-bold text-center placeholder-gray-700 p-3 w-full">
            <textarea id="inputText" cols="30" rows="10" placeholder="Enter text for your note"
            class="bg-transparent text-lg focus:outline-none leading-8 text-black placeholder-gray-700 px-10 w-full"
            style="line-height: 2.10rem;"></textarea>
        </div>
    </div>
</template>

<script>

export default {
    name: 'NoteComponent',
    
    data() {
        return {
            notes: Array.isArray(this.$attrs.notesProp) && this.$attrs.notesProp.length 
            ? this.$attrs.notesProp : null,
        }
    },
    created() {
        console.log(this.notes)
    },
    methods: {

    }
}
</script>

<style scoped>

</style>