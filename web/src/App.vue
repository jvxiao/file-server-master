
<template>
  <div class="app-main">
    <div class="side-bar" v-if="comStore.showNavBar">
      <div class="side-item" v-for="nav in navList" :key="nav.path" :class="{'active': curNav === nav.path}">{{ nav.name }}</div>
    </div>
    <div class="main-content">
      <router-view ></router-view>
    </div>
  </div>
</template>
<script lang="ts" setup>
import  { ref } from 'vue';
import { useComStore } from '@/store';
const comStore = useComStore();
const navList = ref([
  {
    name: 'dashboard',
    path: '/'
  }, {
    name: '文件管理',
    path: '/manage'
  }
]);

const curNav = ref('/manage');

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
    width: 200px;
    height: 100%;
    padding-top: 50px;
    background-color: #fff;
    .side-item {
      height: 42px;
      line-height: 42px;
      width: 100%;
      padding: 0 16px;
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
}
</style>
