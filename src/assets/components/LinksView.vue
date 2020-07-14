<template>
  <div class="md:w-1/2 w-full p-5" style="background-color: #23395B;">
    <div class="bg-blue-800 flex rounded-t ">
      <h1 class="w-full font-sans text-2xl py-1 self-center text-center underline">Links</h1>
      <div class="pt-1 pb-2">
        <button
          @click="toggleEdit()"
          class="bg-blue-600 hover:bg-blue-500 shadow-xl text-black font-bold px-4 py-2 overflow-auto"
        >Edit</button>
      </div>
    </div>
    <ul
      class="flex content-start flex-wrap items-center shadow-2xl rounded-b border-blue-700"
      v-if="links"
    >
      <li class="flex p-3" v-for="link in links" v-bind:key="link.id">
        <a class="flex bg-blue-700 hover:bg-blue-500 rounded-l" :href="link.url">
          <img
            class="h-8 self-center"
            :src="'https://s2.googleusercontent.com/s2/favicons?sz=32&domain_url=' + link.url"
            alt="favicon"
          />
          <p class="px-1 self-center font-bold">{{link.title}}</p>
        </a>
        <button
          @click="deleteLink(link.id)"
          v-if="edit"
          class="bg-red-500 hover:bg-red-400 items-center pt-2 px-1"
        >
          <i class="fa fa-trash fa-2x h-10 rounded-r" aria-hidden="true" />
        </button>
      </li>
    </ul>
    <CreateLinkComponent class="p-3" :dashboard_id="dashboard_id" />
  </div>
</template>

<script>
import CreateLinkComponent from "../components/CreateLinkComponent";
import Axios from "axios";

export default {
  name: "LinksView",
  components: {
    CreateLinkComponent
  },
  data() {
    return {
      dashboard_id: this.$attrs.dashboard_id,
      links:
        Array.isArray(this.$attrs.linksProp) && this.$attrs.linksProp.length
          ? this.$attrs.linksProp
          : null,
      edit: false
    };
  },
  methods: {
    toggleEdit() {
      this.edit = !this.edit;
    },
    getLinks() {
      Axios.get("http://localhost:4000/api/getDashboard", {
        params: {
          id: this.dashboard_id
        }
      })
        .then(res => {
          this.links = res.data.data.links;
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteLink(id) {
      Axios.delete("http://localhost:4000/api/links", {
        params: {
          id: id
        }
      })
        .then(res => {
          console.log(res);
          this.getLinks();
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>