<template>
  <div class="charts">

    <e-charts
      :chartData="chartData"  chartType="line"   unit=" °C"  y-text="温度" ref="line"
      :title-text="title"
      :sub-text="subtext"
      :height="600"
      :width="700"
    ></e-charts>
  </div>
</template>

<script>

  import ECharts from './Echarts'
  import echarts from 'echarts'

  export default {
    name: "Tempture",
    components: {
      ECharts
    },
    data() {
      return {
        chartData: [["星期一", 10], ["星期二", 20],["星期三", 10],["星期四", 5],["星期五", 20]],
        chartRefs: ["line", "bar", "pie"],
        title: "未来一个星期气温的变化",
        subtext:"纯属虚构"
      }
    },
    mounted() {
      setInterval(()=>{
        var x = "new" + this.chartData.length ;
        var y = Math.ceil(Math.random() * 100); // 随机生成
        this.chartData.shift(); // 队列
        this.chartData.push(["新的一列",y]);
        this.$refs["line"].drawChart();
      },2000)
    },
    methods: {}
  }
</script>

<style scoped>

</style>
