
<template>
  <div class="app-main">
    <div class="side-bar" v-if="comStore.showNavBar">
      <div class="side-item" v-for="nav in navList" :key="nav.path" :class="{'active': curNav === nav.path}" @click="routeTo(nav.path)">
        <component :is="nav.icon" />
        <span>{{ nav.name }} </span>
        </div>
        <div class="qrcode">
          <img :src="qrcode" alt="QR Code" >
          <span style="display:inline-block;">扫一扫，手机端快速打开</span>
        </div>
        
    </div>
    <div class="main-content">
      <router-view ></router-view>
    </div>
  </div>
</template>
<script lang="ts" setup>
import  { onMounted, ref, shallowRef } from 'vue';
import { TrendCharts, Delete, List, DeleteFilled } from '@element-plus/icons-vue'
import { useComStore } from '@/store';
import router from '@/router';
import { useQRCode } from '@vueuse/integrations/useQRCode'
import axios from 'axios';
const comStore = useComStore();
const size = ref(14)
const navList = ref([
  {
    name: '看板',
    path: '/dashboard',
    icon: TrendCharts
  }, {
    name: '文件管理',
    path: '/manage',
    icon: List
  }, {
    name: '回收站',
    path: '/trashbin',
    icon: DeleteFilled
  }
]);

const curNav = ref('/dashboard');

const text = ref('http://192.168.31.190:9000//#/manage')
let qrcode = useQRCode(text)

const routeTo = (routePath:string) => {
  console.log(routePath)
  curNav.value = routePath;
  router.push({
    path: routePath
  }) 
}

onMounted(async () => {
  const res = await axios.get('/api/gethostandport');
  const { ip, port } = res.data.data;
  text.value = `http://${ip}:${port}/#/manage`;
  qrcode = useQRCode(text)
})

</script>
<style lang="scss" scoped>
@import './variables.scss';
.app-main {
  text-align: left;
  width: 100%;
  height: 100%;
  display: flex;
  color: #333;
  .side-bar {
    position: relative;
    min-width: 200px;
    height: 100%;
    padding-top: 50px;
    background-color: #fff;
    .side-item {
      height: 42px;
      line-height: 42px;
      width: 100%;
      padding: 0 16px;
      cursor: pointer;
      display: flex;
      align-items: center;
      border-radius: 4px;
      span {
        margin-left: 5px;
      }
      &.active {
        background-color: $theme-color;
        color: #fff;
      }
    }
  }
  .main-content {
    // width: calc(100% - 20px);
    width: 100%;
    height: 100%;
  }
  .qrcode {
    width: 100%;
    position: absolute;
    bottom: 18px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 3px;
    // border: 1px solid #ccc;
    border-radius: 6px;
    margin: 0 auto;
    // background-color: #1e3058;
    img {
      border: 1px solid #ccc;
      width: 120px;
      border-radius: 8px; 
    }
    span {
      padding-top: 4px;
      color: #999;
    }

  }
}
</style>
