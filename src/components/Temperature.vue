
<!--左边数数据，右边数对应的图表
 有两个图，一个是实时的温度变化图，1min更新一次，
 一个是可以根据选择的数据绘可视化图的卡片-->

<template>
  <div class="whole">
    <el-container style="height: 100%">
    <el-aside  style="width:35% ; height: 100%;">
      <el-card class="box-card">
        <div slot="header" class="clearfix" >
          <span>温度数据</span>
          <el-button style="float: right" @click="HandleChart()">
            画图
          </el-button>
        </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        stripe
        ref="multipleTable"
        tooltip-effect="dark"
        @selection-change="handleSelectionChange"
        height="400px">
        <el-table-column
          fixed
          prop="date"
          label="日期"
          sortable
          width="150">
        </el-table-column>
        <el-table-column
          prop="temperature"
          label="温度"
          width="120">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          width="250">
        </el-table-column>
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
      </el-table>
      </el-card>
    </el-aside>

    <el-main style="color: #e9eef3; width: 60%">

        <el-card shadow="hover" class="box-card" style="height: 400px ; width: 70%">
          <e-charts
            :chartData="chartData"  chartType="line"   unit=" °C"  y-text="温度" ref="line1"
            :title-text="title"
            :sub-text="subtext"
            :height="380"
            :width="700">
          </e-charts>
        </el-card>
      <el-card shadow="hover" class="box-card"  style="height: 400px ;width:70%;margin-top: 10px">
        <e-charts
          :chartData="freshData"  chartType="line"   unit=" °C"  y-text="温度" ref="line2"
          :line-color="lineColor"
          :title-text="title"
          :sub-text="subtext"
          :height="380"
          :width="700">
        </e-charts>
      </el-card>
      <el-footer > </el-footer>
    </el-main>
    </el-container>
  </div>
</template>

<script>


    import ECharts from "./Echarts";
    export default {
        name: "Temperature",
      components: {ECharts},
      props:{
          tableData:{
            type:Array,
            default(){
              return this.tableData3;
            }
          },
        freshData:{
          type:Array,
          default(){
            return [['demo1',12],['demo2', 13]];
          }
        },
      },
      mounted(){
        let self = this;
        let work = null;
        window.addEventListener("resize", function () {
          if (work == null) {
            work = setTimeout(function () {
              work = null;
            }, 100);
          }
        });
      },
      data(){
          return{
            tableData3:[{
              date:'2018-05-15',
              temperature:18,
              address: '上海市普陀区金沙江路 1518 弄'
            },
              {
                date: '2018-05-15',
                temperature: 20,
                address: '上海市普陀区金沙江路 1518 弄'
              },
              {
                date: '2018-05-13',
                temperature: 10,
                address: '上海市普陀区金沙江路 1518 弄'
              },
              {
                date: '2018-05-12',
                temperature: 30,
                address: '上海市普陀区金沙江路 1518 弄'
              },
              {
                date: '2018-05-05',
                temperature: 38,
                address: '上海市普陀区金沙江路 1518 弄'
              }
            ],
            multipleSelection: [],
            chartData: [],
            title:"温度变化图",
            subtext:"根据选择数据所绘制的变化图",
            lineColor:'#394b5c'
          }
      },
      methods: {
        handleSelectionChange(val) {
          this.multipleSelection = val;
        },
        HandleChart() {

          this.chartData.length = 0;
          for (let i = 0; i < this.multipleSelection.length; i++) {

            this.chartData.push([this.multipleSelection[i].date, this.multipleSelection[i].temperature]);
          }
          this.chartData.sort(this.compare(0));
          this.$refs['line1'].drawChart();
       /*   this.$refs['line2'].drawChart();*/
        },
        compare(property) {
          return function (a, b) {
            return a[property] > b[property] ? 1 : -1;
          }
        },
        drawfreshTable() {
          this.$refs['line2'].drawChart();
        }
      }

    }
</script>

<style scoped>
  .whole {
    content: '';
    position: fixed;
    width: 100%;
    height: 100%;
  /*  background: url("./../assets/blur-bg.jpg") no-repeat center center;*/
    background-size: cover;
    will-change: transform;
    z-index: 0;
  }
  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .box-card {
    width: 100%;
  }
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

</style>
