import { onMounted, ref, computed } from 'vue';
import axios from 'axios';
const BASE_URL = 'http://192.168.31.190:8001';
// const BASE_URL = 'http://localhost:8001';
const fileuploader = ref(HTMLInputElement);

const dataList = ref([]);
const backup = ref([]);
export const useFileManageService = (props, state) => {


  onMounted(() => {
    fetchFileList();
  })

  
  
  const fetchFileList = async () => {
    const res = await axios.get(`${BASE_URL}/api/getFileList`);
    if(res.data && res.data.length) {
      dataList.value = res.data.sort(sortFn);
      backup.value = JSON.parse(JSON.stringify(dataList.value));
      return;
    }
    dataList.value.splice(0);
    backup.value.splice(0);
  }
  
  const chooseFile = () => {
    fileuploader.value && fileuploader.value.click();
  }
  const hdlFileChange = async () => {
    alert('确定上传？')
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
    const res = await axios.post(`${BASE_URL}/api/upload`, formData, {headers: headers});
    alert(JSON.stringify(res.data))
    if(res.data.code === 0) {
      fetchFileList();
    }
    fileuploader.value.value = '';
    console.log(fileuploader.value.files);
  }
  
  const downloadFile = (file) => {
    const link = document.createElement('a');
    link.href = `${BASE_URL}/api/downloadFile?fid=${file.fid}`;
    link.download = file.originalname;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const sortFn = (a, b) => {
    if(!a.uploadTime) return 1;
    if(!b.uploadTime) return -1;
    return `${b.uploadTime}`.localeCompare(`${a.uploadTime}`);
  }

  const searchByKeyword = () => {
    if(!state.keyword) dataList.value = backup.value;
    const reg = new RegExp(`${state.keyword}`, 'ig');
    let result = backup.value.filter(o => reg.test(o.originalname));
    dataList.value = result;
  }

  return {
    fileuploader,
    dataList,
    downloadFile,
    chooseFile,
    hdlFileChange,
    searchByKeyword
  }
}

