<template>
  <div class="dashboard-page">
    <div class="statistic-charts">
        <TotalSummaryChart />
        <div class="card-box">
          <div class="card upload">
            <span class="name">UPLOAD</span>
            <span class="count">6677</span>
          </div>
          <div class="card download">
            <span class="name">DOWNLOAD</span>
            <span class="count">6677</span>
          </div>
          <div class="card"></div>
          <div class="card"></div>
        </div>
    </div>
    <div class="file-list"></div>

  </div>
</template>
<script setup>
import TotalSummaryChart from '../components/charts/TotalSummaryChart.vue';



</script>
<style lang="scss" scoped>
@import '../variables.scss';


.dashboard-page {
  width: 100%;
  height: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;

  .statistic-charts {
    width: 100%;
    display: flex;
    
    .card-box {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      align-content: space-between;
      .card {
        width: calc((100% - 16px) /2);
        height: 180px;
        background-color: #fff;
        margin-left: 8px;
        border-radius: 4px;
        padding: 0;
        // border: 1px solid #ee6666;
        .count {
          font-size: 70px;
          display: block;
          // color: #ee6666;
          font-weight: 600;
          padding: 15px;
          text-align: center;
        }
        .name {
          // width: 45%;
          padding: 4px 20px;
          font-size: 20px;
          display: inline-block;
          color: #fff;
          // background: #ee6666;
          border-radius: 0 0 30px 0;
        }

        &.upload {
          color: #ee6666;
          border: 1px solid #ee6666;
          .name {
            background-color: #ee6666;
          }
        }
        &.download {
          color: #73c0de;
          border: 1px solid #73c0de;
          .name {
            background-color: #73c0de;
          }
        }
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