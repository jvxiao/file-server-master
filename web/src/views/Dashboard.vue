<template>
  <div class="dashboard-page">
    <div class="statistic-charts">
        <div id="chart1">
          <div class="wraper">
            <div class="statistic">
              <span class="title">Total: </span>
              <span class="count">6884</span>
            </div>
            
            <div class="range-bar">
              <div class="week">week</div>
              <div class="month">month</div>
              <div class="year">year</div>
            </div>
          </div>
          <div class="total-chart" id="total"></div>
        </div>
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
import * as echarts from 'echarts';
import { onMounted } from 'vue';

onMounted(() => {
  var chartDom = document.getElementById('total');
var myChart = echarts.init(chartDom);
var option;

option = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      // emphasis: {
      //   label: {
      //     show: true,
      //     fontSize: 40,
      //     fontWeight: 'bold'
      //   }
      // },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' }
      ]
    }
  ]
};

option && myChart.setOption(option);
})


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
    
    #chart1 {
      width: 45%;
      min-width: 420px;
      height: 380px;
      background-color: #fff;
      border-radius: 4px;
      margin-right: 5px;
      border: 1px solid #ccc;
      .wraper {
        // text-align: center;
        display: flex;
        justify-content: space-between;
        padding: 8px;
        .title, .count {
          color: $theme-color;
          font-size: 26px;
          font-weight: 600;
        }
        .range-bar {
          display: flex;
          .week, .month, .year {
            padding: 6px 12px;
            border: 1px solid #ccc;
            margin-right: -1px;
            cursor: pointer;
            color: #666;
          }
          .week {
            border-radius: 4px 0 0 4px;
          }
          .year {
            border-radius: 0 4px 4px 0;
          }
        }
      }
    }
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

#total {
  width: 100%;
  height: calc(100% - 55px);
}
</style>