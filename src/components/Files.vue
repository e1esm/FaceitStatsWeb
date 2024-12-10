<template>
  <div class="files-view">
    <h1 class="title">Files</h1>
    <div class="files">
      <div class="file" v-for="(file, _) in files">
        <div class="file-entity">
          <h1>{{getPeriodOfReportAndConcatToName(file)}}</h1>
          </div>
          <div class="file-entity">
            <button class="file-button" @click="downloadFile(file)">⬇️</button>
          </div>
    </div>
  </div>
    </div>
</template>

<style scoped>

.title{
  text-align: center;
  font-weight: bold;
  font-size: 36px;
  color: white;
  height: 10%;
}

.files-view {
  background-color: #232323;
  width: 100%;
  height: 100%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

}

.file{
  width: 90%;
  max-height: 40%;
  display: flex;
  flex-direction: row;
  background-color: #1e1e1e;
  margin-top: 20px;
  border-radius: 10px;
}

.files{
  width: 100%;
  height: 90%;
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow: scroll;
}

.file-entity{
  overflow: scroll;
  color: white;
  align-items: center;
  text-align: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  flex-grow: 1;
  margin-left: 40px;
  position: relative;
}

.file-button{
  position: relative;
  align-items: center;
  height: 30px;
  background-color: inherit;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

</style>

<script>

import {getAllFiles} from "@/services/files.js";
import axios from "axios";

export default {
  name: 'Files',
  data() {
    return {
      files: null,
    }
  },

  created(){
    this.getFiles()
  },

  methods: {
    async getFiles() {
      try {
        this.files = await getAllFiles();
        console.log(this.files);
      } catch (error) {
        console.log(error);
      }
    },

    getPeriodOfReportAndConcatToName(filename){
      const regex = /\((\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{6}Z)_(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{6}Z)\)/;
      const match = filename.match(regex);
      if (match) {
        const startDate = match[1].split('.')[0];
        const endDate = match[2].split('.')[0];

        return 'Report: ' + startDate + ' to ' + endDate;
      } else {
        console.log("No dates found in the string.");
      }

      return '';
    },
    async downloadFile(path) {
      try {
        const response = await axios.get(`http://localhost:8080/api/files/path?filename=${path}`, {
          headers:{
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('token'))['token']}`,
          },
          responseType: 'blob',
        });


        const blob = response.data;
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = path.split('/')[1];
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('Error downloading file:', error);
      }
    },
  }
}
</script>