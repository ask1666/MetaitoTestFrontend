<template>
  <div class="p-5 md:w-1/2 ">
    <h1
      class="py-3 bg-blue-800 rounded-t text-2xl font-sans underline text-center"
      style="color: black"
    >Notes</h1>
    <form class=" shadow-lg" @submit="save()">
      <div class="rounded-t">
        <div
          class="flex w-auto rounded-t bg-blue-800"
          
        >
          <div id="noteSelectDiv" class="w-1/3 p-1 self-center">
            <span class="text-sm block">Select Note:</span>
            <select
              @change="fillNote()"
              v-model="currentNote"
              class="w-3/4 text-xs h-6 bg-blue-700 shadow-lg"
              id="noteSelect"
            >
              <option
                class="text-xs"
                v-for="note in notes"
                :value="note"
                v-bind:key="note.id"
              >{{note.title}}</option>
              <option class="text-xs" :value="null">New</option>
            </select>
          </div>
          <div id="markdownSelectDiv" class="w-1/3 p-1 self-center">
            <span class="text-sm block pl-1">Markdown:</span>
            <select
              v-model="markdown"
              class="w-3/4 text-xs h-6 bg-blue-700 shadow-lg"
              id="markdown"
            >
              <option class="text-xs" :value="false">Text</option>
              <option class="text-xs" :value="true">Markdown</option>
            </select>
          </div>
          <div class="w-1/3 p-1 flex justify-end">
            <div>
              <button
                @click="toggleEdit()"
                type="button"
                class="bg-blue-600 hover:bg-blue-500 text-black font-bold px-2 py-2 overflow-auto focus:outline-none focus:shadow-outline"
              >
                <p v-if="!edit">Edit</p>
                <p v-else>Done</p>
              </button>
            </div>
            <div class="px-1">
              <button type="button" @click="deleteNote()" class="self-align">
                <i
                  class="fa fa-trash fa-2x bg-red-500 overflow-auto hover:bg-red-400 px-2 py-1"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="edit" class="w-auto" style=" background-size: cover;">
        <input
          @change="getText()"
          :value="inputTitle"
          type="text"
          id="inputTitle"
          placeholder="Enter Title"
          class="bg-transparent text-xl text-white border-b-2 border-opacity-25 border-gray-600 focus:outline-none font-bold text-center placeholder-gray-600 p-3 w-full"
        />
        <textarea
          @change="getText()"
          id="inputText"
          data-preview="#noteText"
          cols="50"
          rows="10"
          placeholder="Enter text for your note..."
          class="bg-transparent text-lg focus:outline-none leading-8 text-white placeholder-gray-600 pt-2 px-10 w-full"
          style="line-height: 1.5rem; min-height: 15rem;"
          :value="inputText"
        ></textarea>
      </div>
      <div v-else class="w-auto" >
        <h1
          type="text"
          id="noteTitle"
          class="bg-transparent text-lg text-gray-200 border-b border-opacity-25 border-gray-600 focus:outline-none text-center placeholder-gray-700 p-3 w-full"
        >
          <p v-if="inputTitle || inputTitle === undefined">{{inputTitle}}</p>
          <p v-else>Nothing</p>
        </h1>
        <div
          id="noteText"
          class="markdown text-white pt-2 px-10"
          style="min-height: 15rem;"
        ></div>
      </div>
      <div
        class="flex justify-end shadow-lg p-2 border-opacity-25 border-gray-800 w-auto rounded-b"
        style= "background-size: cover;"
      >
        <button
          type="submit"
          class="bg-blue-700 hover:bg-blue-600 text-black font-bold py-2 px-2 focus:outline-none focus:shadow-outline"
        >Save</button>
      </div>
    </form>
  </div>
</template>

<script>
import Axios from "axios";
let md = require("markdown-it")({
  html: true,
  linkify: true,
  typographer: true
});

export default {
  name: "NoteComponent",

  data() {
    return {
      notes:
        Array.isArray(this.$attrs.notesProp) && this.$attrs.notesProp.length
          ? this.$attrs.notesProp
          : null,
      dashboardId: this.$attrs.dashboard_id,
      edit: false,
      inputText: "",
      inputTitle: "",
      markdown: false,
      storeHTML: false,
      currentNote: null,
      result: ""
    };
  },
  updated() {
    if (document.getElementById("noteText") && this.markdown)
      document.getElementById("noteText").innerHTML = this.result.replace(
        /\n/g,
        "<br>"
      );
    else if (document.getElementById("noteText") && !this.markdown)
      document.getElementById("noteText").innerHTML = this.inputText.replace(
        /\n/g,
        "<br>"
      );
  },
  methods: {
    toggleEdit() {
      let noteSelect = document.getElementById("noteSelectDiv");
      let markdown = document.getElementById("markdownSelectDiv");

      if (!this.edit) {
        noteSelect.style.visibility = "hidden";
        markdown.style.visibility = "hidden";
      } else {
        noteSelect.style.visibility = "visible";
        markdown.style.visibility = "visible";
      }

      if (!this.currentNote && !this.edit) {
        /* this.inputText = "";
        this.inputTitle = ""; */
      }

      this.edit = !this.edit;
    },
    getText() {
      this.inputText = document.querySelector("textarea").value;
      this.inputTitle = document.getElementById("inputTitle").value;
      this.result = md.render(this.inputText);
    },
    getNotes() {
      Axios.get("http://localhost:4000/api/getDashboard", {
        params: {
          id: this.dashboardId
        }
      })
        .then(res => {
          this.notes = res.data.data.notes;

          if (this.notes.length) {
            this.currentNote = this.notes[0];
          } else {
            this.currentNote = null;
          }
          this.fillNote();
        })
        .catch(err => {
          console.log(err);
        });
    },
    save() {
      if (!this.currentNote) {
        this.createNote();
      } else {
        this.updateNote(this.currentNote.id);
      }
    },
    createNote() {
      if (this.storeHTML) {
        Axios.post("http://localhost:4000/api/notes", {
          dashboard_id: this.dashboardId,
          note: {
            html_saved: this.storeHTML,
            markdown: this.markdown,
            text: this.result,
            title: this.inputTitle
          }
        })
          .then(() => {
            this.getNotes();
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        Axios.post("http://localhost:4000/api/notes", {
          dashboard_id: this.dashboardId,
          note: {
            html_saved: this.storeHTML,
            markdown: this.markdown,
            text: this.inputText,
            title: this.inputTitle
          }
        })
          .then(() => {
            this.getNotes();
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    updateNote(id) {
      Axios.put("http://localhost:4000/api/notes", {
        id: id,
        note: {
          html_saved: this.storeHTML,
          markdown: this.markdown,
          text: this.inputText,
          title: this.inputTitle
        }
      })
        .then(() => {
          this.getNotes();
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteNote() {
      Axios.delete("http://localhost:4000/api/notes", {
        params: {
          id: this.currentNote.id
        }
      })
        .then(() => {
          this.getNotes();
        })
        .catch(err => {
          console.log(err, this.currentNote.id);
        });
    },
    fillNote() {
      if (this.currentNote) {
        this.inputText = this.currentNote.text;
        this.inputTitle = this.currentNote.title;
        document.getElementById("noteText").innerText = this.inputText;
        document.getElementById("noteTitle").innerText = this.inputTitle;
        if (this.currentNote.markdown) {
          this.markdown = this.currentNote.markdown;
          this.result = md.render(this.inputText);
        }
      } else {
        this.inputText = "";
        this.inputTitle = "";
        this.result = "";
        document.getElementById("noteText").innerHTML = this.inputText;
        document.getElementById("noteTitle").innerText = this.inputTitle;
      }
    }
  }
};
</script>

<style scoped>
@import url("../styles/markdown.css");
</style>