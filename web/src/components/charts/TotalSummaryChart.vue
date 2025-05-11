<template>
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
</template>

<script setup>
import * as echarts from 'echarts';
import { onActivated, onMounted } from 'vue';

let chartDom = null;
let chart = null;
let option = {
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
      labelLine: {
        show: false
      },
      data:[]
    }
  ]
};
;
let data = [
  { value: 1048, name: 'Search Engine' },
  { value: 735, name: 'Direct' },
  { value: 580, name: 'Email' },
  { value: 484, name: 'Union Ads' },
  { value: 300, name: 'Video Ads' }
]

onMounted(() => {
  chartDom = document.getElementById('total');
  chart = echarts.init(chartDom);

  renderChart(data);
  window.onresize = () => {
    console.log('resize')
    renderChart(data);
  }
})

onActivated(() => {
  renderChart(data);
})
const renderChart = (data) => {
  chart && chart.dispose();
  option.series[0].data = data;
  chartDom = document.getElementById('total');
  chart = echarts.init(chartDom);
  option && chart.setOption(option);
}
</script>

<style lang="scss" scoped>
@import '../../variables.scss';

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


#total {
  width: 100%;
  height: calc(100% - 55px);
}
</style>