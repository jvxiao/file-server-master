<template>
  <div class="manage-mobile">
    <div class="statistic-panel">
      <div class="card upload">
        <span class="count ">90</span>
        <span class="label">周上传量</span>
      </div>
      <div class="card download">
        <span class="count">800</span>
        <span class="label">周下载量</span></div>
    </div>
    <div class="search">
      <input v-model="state.keyword" type="text" placeholder="关键字搜索文件">
      <span class="search-btn" @click="searchByKeyword">搜索</span>
      <input  type="file" @change="hdlFileChange" id="file-upload" ref="fileuploader" multiple/>
      <span class="upload-btn" @click="chooseFile"> 上传 </span>
    </div>
    <div class="file-list-main">
        <!-- <div class="table-header">
          <div class="cell" v-for="prop in dataProps" :key="prop.value">{{ prop.label }}</div>
        </div> -->
        <div class="table-content">
          <div class="row" v-for="row in dataList" :key="row.id" @click="imgPreview(getFileURL(row))">
            <div class="cell" v-for="prop in dataProps" :key="prop.value">
              <div class="link" v-if="prop.value === 'originalname'" >{{ row[prop.value] }}</div>
              <div class="meta">
                <div class="meta-item" >size: {{ friendlyMemorySize(row['size']) }}</div>
                <div class="meta-item" >upload time: {{ friendlyTime(row['uploadTime']) }}</div>
                <!-- <div class="cell-content" v-else>{{ row[prop.value] }}</div>  -->
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { friendlyMemorySize, friendlyTime} from '@/utils/number';
import { useFileManageService } from '../services/fileManageService';
import { imgPreview} from '../services/previewService';
const BASE_URL = 'http://192.168.31.190:8001';

const dataProps = ref([
  {label: '文件名', value:'originalname'},
  // {label: '类型', value:'mimetype',},
  // {label: '文件大小', value: 'size'},
  // {label: '上传时间', value: 'uploadTime'}
  
]);
const state = reactive({
  keyword: ''
})
const {
  fileuploader,
  dataList,
  chooseFile,
  hdlFileChange,
  downloadFile,
  searchByKeyword
} = useFileManageService(dataProps, state);

const getFileURL = (file) => {
 return `${BASE_URL}/api/downloadFile?fid=${file.fid}`
}
</script>
<style lang="scss" scoped>
.manage-mobile {
  height: 100%;
  padding: 0 8px;
  .statistic-panel {
    display: flex;
    justify-content: space-between;
    height: 140px;
    width: 100%;
    // background-color: #1e3058;
    padding: 10px 0px;
    .card {
      height: 120px;
      width: 45%;
      border-radius: 4px;
      background-color: #fff;
      span { 
        display: block;
        text-align: center;
      }
      .count {
        font-weight: 700;
        font-size: 35px;
      }
    }
    .upload {
      color: yellowgreen;
    }
    .download {
      color: red;
    }
  }
  .search {
    margin-bottom: 8px;
    display: flex;
    input {
      padding: 0 8px;
      height: 40px;
      flex: 1;
      outline: none;
      border: 1px solid #ccc;
      border-radius: 3px;
      margin-right: 4px;
    }
    #file-upload {
      display: none;
    }
    span {
      display: inline-block;
      padding: 5px 12px;
      border: 1px solid;
      border-radius: 4px;
      margin: 0 4px;
      &.search-btn {
        background-color: #1e3058;
        color: #fff;
        border-color: #1e3058;
      }
      &.upload-btn {
        background-color: yellowgreen;
        border-color: yellowgreen;
        color: #fff;
      }
    }
    
  }
  .file-list-main {
    background-color: #fff;
    width: 100%;
    height: calc(100% - 200px);
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
      height: calc(100% - 0px);
      // border: 1px solid #1e3058;
      padding: 0 6px;
      overflow-y: auto;
      border-radius: 0 0 4px 4px;
      .row {
        // height: 32px;
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: 0 16px;
        line-height: 32px;
        box-shadow: -3px 4px 3px rgba(yellowgreen, .2) ;
        border-radius: 3px;
        margin-bottom: 4px;
        padding-bottom: 5px;
        &:hover {
          background-color: rgba(yellowgreen, .1);
        }
        .cell {
          width: 100%;
          display: inline-block;
          flex: 1;
          display: inline-block;
        }
      }
    }
    .link, .cell-content {
      width: 100%;
      display: inline-block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .link {
      // min-width: 180px;
      // max-width: 300px;
      // text-decoration: underline;
      color: #555;
      cursor: pointer;
    }
    .meta {
      display: flex;
      flex-direction: row;
      font-size: 12px;
      height: 18px;
      line-height: 1;
      color: #999;
      .meta-item {
        margin-right: 10px;
      }
    }
  }
}
</style>