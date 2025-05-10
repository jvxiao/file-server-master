<template>
  <div class="dashboard-page">
    <div class="statistic-charts">
        <div id="chart1"></div>
        <div class="card-box">
          <div class="card"></div>
          <div class="card"></div>
          <div class="card"></div>
          <div class="card"></div>
        </div>
    </div>
    <div class="file-list"></div>

  </div>
</template>
<script setup>

</script>
<style lang="scss" scoped>
.dashboard-page {
  width: 100%;
  height: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;

  .statistic-charts {
    width: 100%;
    display: flex;
    
    #chart1 {
      width: 45%;
      min-width: 420px;
      height: 380px;
      background-color: #1e3058;
      border-radius: 4px;
      margin-right: 5px;
    }
    .card-box {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      align-content: space-between;
      .card {
        width: calc((100% - 16px) /2);
        height: 180px;
        background-color: #1e3058;
        margin-left: 8px;
        border-radius: 4px;
      }
    }
  }
  .file-list {
      width: 100%;
      margin-top: 14px;
      height: calc(100% - 380px);
      background-color: #1e3058;
      border-radius: 4px;
    }
}
</style>