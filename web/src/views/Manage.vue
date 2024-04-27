<template>
  <div class="manage-page">
    <div class="filter-panel"></div>
    <div class="file-list">
      <div class="operation-bars">
        <input  type="file" @change="hdlFileChange" id="file-upload" ref="fileuploader" multiple/>
        <button @click="chooseFile"> 上传 </button>
      </div>
      <div class="file-list-main">
        <div class="table-header">
          <div class="cell" v-for="prop in dataProps" :key="prop.value">{{ prop.label }}</div>
        </div>
        <div class="table-content">
          <div class="row" v-for="row in dataList" :key="row.id">
            <div class="cell" v-for="prop in dataProps" :key="prop.value">
              <div class="link" v-if="prop.value === 'originalname'" @click="downloadFile(row)">{{ row[prop.value] }}</div>
              <div class="cell-content" v-else>{{ row[prop.value] }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios from 'axios';
const BASE_URL = 'http://192.168.31.190:8001';
const fileuploader = ref(HTMLInputElement);

const dataList = ref([]);
const dataProps = ref([
  {label: '文件名', value:'originalname'},
  {label: '类型', value:'mimetype',},
  {label: '文件大小', value: 'size'},
  {label: '上传时间', value: 'uploadTime'}
  

])

onMounted(() => {
  fetchFileList();
})

const fetchFileList = async () => {
  const res = await axios.get(`${BASE_URL}/api/getFileList`);
  if(res.data && res.data.length) {
    dataList.value = res.data;
    return;
  }
  dataList.value.splice(0);
}

const chooseFile = () => {
  fileuploader.value && fileuploader.value.click();
}
const hdlFileChange = async () => {
  console.log(fileuploader.value.files);

  const fileList = Array.from(fileuploader.value.files);
  const formData = new FormData();
  
  if(fileList.length) {
    fileList.forEach(file => {
      console.log(file);
      formData.append('file', file);
    })
  }
  let headers = {
    'Content-Type': 'multipart/form-data'
  }
  const res = await axios.post('/api/upload', formData, {headers: headers});
  debugger
  if(res.data.code === 0) {
    fetchFileList();
  }
  console.log(res);
}

const downloadFile = (file) => {
  const link = document.createElement('a');
  link.href = `${BASE_URL}/api/downloadFile?fid=${file.fid}`;
  link.download = file.originalname;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
</script>
<style lang="scss" scoped>
.manage-page {
  height: 100%;
  width: 100%;
  padding: 16px;
  .filter-panel {
    height: 150px;
    width: 100%;
    background-color: #1e3058;
  }
  .file-list {
    height: calc(100% - 150px);
    width: 100%;
    margin-top: 12px;
    background-color: #1e3058;
  }
  .filter-panel, .file-list {
    border-radius: 4px;
  }
  .operation-bars {
    display: flex;
    flex-direction: row-reverse;
    #file-upload {
      display: none;
    }
    button {
      height: 32px;
      line-height: 32px;
      padding: 0 24px;
      margin: 6px 8px;
      outline: none;
    }
  }
  .file-list-main {
    background-color: #fff;
    width: 100%;
    height: calc(100% - 44px);
    .table-header {
      width: 100%;
      display: flex;
      height: 40px;
      padding: 0 16px;
      background-color: rgba(#1e3058, 1);
      border: 1px solid #1e3058;
      color: #fff;
      .cell {
        flex: 1;
        display: inline-block;
      }
    }
    .table-content {
      width: 100%;
      height: calc(100% - 40px);
      border: 1px solid #1e3058;
      overflow-y: auto;
      border-radius: 0 0 4px 4px;
      .row {
        height: 32px;
        display: flex;
        padding: 0 16px;
        line-height: 32px;
        &:hover {
          background-color: rgba(#1e3058, .1);
        }
        .cell {
          display: inline-block;
          flex: 1;
          display: inline-block;
        }
      }
    }
    .link, .cell-content {
      // width: 100%;
      display: inline-block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .link {
      // min-width: 180px;
      // max-width: 300px;
      flex: 1;
      width: 240px;
      text-decoration: underline;
      color: blue;
      cursor: pointer;
    }
  }
}
</style>