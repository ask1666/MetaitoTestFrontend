<template>
  <div class="flex justify-center">
    <div v-if="!createBtn" class="pt-5 w-full flex justify-center">
      <form @submit="createLink()" class="bg-blue-800 shadow-xl px-8 pt-6 pb-6 mb-4">
        <button @click="toggleCreateForm()" class="float-right" type="button">
          <i class="fa fa-times" aria-hidden="true" />
        </button>
        <label for class="block text-gray-200 text-md font-bold font-sans mb-2">Enter a title for your link</label>
        <input
          v-model="newLinkTitle"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Title"
          required
        />
        <div class="pt-5">
          <label for class="block text-gray-200 text-md font-bold font-sans mb-2">Enter url</label>
          <input
            v-model="newUrl"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="http://www.example.com"
            required
          />
        </div>
        <div class="pt-5">
          <p v-if="errorMessage" class="text-red-800 font-bold">{{errorMessage}}</p>
          <button
            class="bg-blue-600 hover:bg-blue-700 shadow-lg text-white font-bold py-2 px-4"
            type="submit"
          >Submit
          </button>
        </div>
      </form>
    </div>

    <button
      v-else
      @click="toggleCreateForm()"
      class="bg-blue-600 hover:bg-blue-500 text-black shadow-lg font-bold py-2 px-2 "
    >Create new link</button>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  name: "CreateLinkComponent",
  data() {
    return {
      dashboard_id: this.$attrs.dashboard_id,
      createBtn: true,
      newLinkTitle: null,
      newUrl: null,
      errorMessage: null
    };
  },
  methods: {
    createLink() {
      if (this.validURL(this.newUrl)) {
        Axios.post("http://localhost:4000/api/links", {
          dashboard_id: this.dashboard_id,
          link: {
            title: this.newLinkTitle,
            url: this.newUrl
          }
        })
          .then(res => {
            console.log(res);
            this.errorMessage = null;
            this.createBtn = true;
            this.getLinks();
          })
          .catch(err => {
            console.log(err);
            this.errorMessage = "Already link with that title";
          });
      }
    },
    toggleCreateForm() {
      this.errorMessage = null;
      this.createBtn = !this.createBtn;
    },
    validURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

            if (!pattern.test(str) || !str.startsWith("http://") || !str.startsWith("https://"))
                this.errorMessage = 'Not valid url';
            else
                this.errorMessage = null;
        return (!!pattern.test(str) && (str.startsWith("http://") || str.startsWith("https://")));
    },
    getLinks() {
        this.$parent.getLinks();
    }
  }
};
</script>