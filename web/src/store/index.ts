import { defineStore } from 'pinia';

export const useComStore = defineStore('comStore', {
  state: () => ({
    showNavBar: true,  // 左侧目录是否显示 PC: 显示  Mobile: 不显示
  }),
  actions: {
    setShowNavBar(val) {
      this.showNavBar = val
    }
  }
})