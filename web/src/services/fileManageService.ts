import { onMounted, ref, computed, watch } from 'vue';
import { FILE_ICONS, FILE_TYPES, getApplicationType } from './fileTypeConst';
import axios from 'axios';
const fileuploader = ref(HTMLInputElement);

const dataList = ref([]);
const backup = ref([]);
export const useFileManageService = (props, state) => {

  onMounted(() => {
    fetchFileList();
  })

  watch(() => state.keyword, (newV, old) => {
    if(old && !newV) {
      fetchFileList();
    }
  })
  
  const countWeeklyUpload = computed(() => {
    const weekago = Date.now() - 7 * 1000 * 60 * 24;
    const items = backup.value.filter(o => {
      if(!o.uploadTime) return false;
      return o.uploadTime > weekago;
    })
    return items.length || 0;
  })
  
  const fetchFileList = async () => {
    const res = await axios.get(`/api/getFileList`);
    if(res.data && res.data.length) {
      dataList.value = res.data.sort(sortFn);
      backup.value = JSON.parse(JSON.stringify(dataList.value));
      return;
    }
    dataList.value.splice(0);
    backup.value.splice(0);
  }
  
  const chooseFile = () => {
    fileuploader.value && (fileuploader.value as any).click();
  }
  const hdlFileChange = async () => {
    alert('确定上传？')
    console.log((fileuploader.value as any).files);
    debugger
    const fileList = Array.from((fileuploader.value as any).files);
    const formData = new FormData();
    
    if(fileList.length) {
      fileList.forEach(file => {
        console.log(file);
        formData.append('file', file as File);
      })
    }
    let headers = {
      'Content-Type': 'multipart/form-data'
    }
    const res = await axios.post(`/api/upload`, formData, {headers: headers});
    alert(JSON.stringify(res.data))
    if(res.data.code === 0) {
      fetchFileList();
    }
    (fileuploader.value as any).value = '';
    console.log((fileuploader.value as any).files);
  }
  
  const downloadFile = (file) => {
    const link = document.createElement('a');
    link.href = `/api/downloadFile?fid=${file.fid}`;
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

  const getFileType = (minetype:string | undefined) => {
    if(!minetype) return FILE_TYPES.UNKNOWN;
    const [cate, subcate] = minetype.split('/');
    let result = '';
    switch(cate) {
      case FILE_TYPES.IMAGE:
        result = FILE_TYPES.IMAGE;
        break;
      case FILE_TYPES.VIDEO:
        result = FILE_TYPES.VIDEO;
        break;
      case FILE_TYPES.TEXT:
        result = FILE_TYPES.TEXT;
        break;
      case FILE_TYPES.APPLICATION: 
        result = getApplicationType(subcate);
        break;
      default:
        result = FILE_TYPES.UNKNOWN;
    }
    
    return result;
  }

  const getFileIcon = (minitype:string) => {
    const type = getFileType(minitype);
    return FILE_ICONS[type];
  }

  return {
    fileuploader,
    dataList,
    countWeeklyUpload,
    downloadFile,
    chooseFile,
    hdlFileChange,
    searchByKeyword,
    getFileType,
    getFileIcon
  }
}

