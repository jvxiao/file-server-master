<template>
  <ManageMobile  v-if="isMobileExploer" />
  <ManagePC v-else />
</template>

<script setup>
import ManagePC from './ManagePC.vue';
import ManageMobile from './ManageMobile.vue';
import { isMobile } from '@/utils/devices';
import { onBeforeMount, ref, watch } from 'vue';
import { useComStore } from '@/store';

const comStore = useComStore();
const isMobileExploer = ref(false);
const info = navigator.userAgent;
onBeforeMount(() => {
  isMobileExploer.value = isMobile();
})
watch(() =>  isMobileExploer.value, (val) =>  {
  if(val) {
    comStore.setShowNavBar(false);
  }
})

</script>
<style>

</style>