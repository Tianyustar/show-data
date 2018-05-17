<template>
  <div :id="id" class="chart" :style="{height:chartHeight,width:chartWidth}"></div>
</template>

<script>


  import echarts from 'echarts';

  export default {
    name: "e-charts",
    components: {},
    data() {
      return {
        id: this.generatorOnlyId(),
        chartHeight: '400px',
        chartWidth: '600px',
      }
    },
    props: {  // 参数
      chartType: {
        type: String,
        default() {
          return 'line';// line/pie/bar/
        } // 图表类型
      },
      unit: {
        type: String,
        default() {
          return ""; // 主标题
        }
      },
      titleText: {
        type: String,
        default() {
          return "title"; // 主标题
        }
      },
      subText: {
        type: String,
        default() {
          return 'subTitile'; // 次标题
        },
      },
      xText: {
        type: String,
        default() {
          // 横轴文本
          return 'x-text';
        }
      },
      yText: {
        type: String,
        default() {
          return 'y-text';
        }
      },
      chartData: {
        type: Array,
        default() {
          return [];// 图表数据
        }
      },
      width: {
        type: Number,
        default: 0
      },
      height: {
        type: Number,
        default: 0
      },
      lineColor:{
        type: String,
        default() {
          return '#c23531';
        }
      }
    },
    computed: {
      xAxisData() {
        return this.chartData.map(function (item) {
          return item[0];
        });
      },
      yAxisData() {
        return this.chartData.map(function (item) {
          return item[1];
        })
      }
    },
    methods: {  // 生成图表
      generatorOnlyId() {
        return (
          (new Date()).valueOf() +
          Math.floor(Math.random() * 10000) + ""
        );
      },
      generatorWithAndHeight() {    // 生成渲染图表div的宽度与高度
        this.chartWidth = `${
          this.width ? this.width : document.body.offsetWidth * 0.8
          }px`;
        this.chartHeight = `${
          this.height ? this.height : document.body.offsetHeight * 0.6
          }px`;
      },
      drawChart() {  // 绘制图表
        let chart = echarts.init(document.getElementById(this.id));
        if (chart == undefined) {
          console.error(`echarts init dom id ${this.id} failed`);
          return;
        }
        switch (this.chartType) {
          case "line":
            chart.setOption(this.generatorLineOption());
            break;
          case "bar":
            chart.setOption(this.generatorBarOption());
            break;
          case "pie":
            chart.setOption(this.generatorPieOption());
            break;
          default:
            console.error(`chartType ${this.chartType} is invalid`);
            break;
        }

        // 暂时没有弄懂下面这个是什么意思
        let self = this;
        let work = null;
        window.addEventListener("resize", function () {
          self.generatorWithAndHeight();
          if (work == null) {
            work = setTimeout(function () {
              chart.resize();
              work = null;
            }, 100);
          }
        });

      },
      generatorLineOption() {
        return {
          title: {
            text: this.titleText,
            subtext: this.subText,

          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: [this.yText]
          },
          toolbox: {
            show: true,
            feature: {
              dataZoom: {
                yAxisIndex: 'none'
              },
              dataView: {readOnly: false},
              magicType: {type: ['line', 'bar']},
              restore: {},
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            data: this.xAxisData

          },
          yAxis: {
            type: 'value',
            axisLabel: {
              formatter: '{value}' + this.unit
            }
          },
          series: [{
            name: this.yText,
            type: 'line',
            data: this.yAxisData,
            lineStyle:{
              normal:{
                color: this.lineColor
              }
            },
            itemStyle:{
              normal:{
                color: this.lineColor
              }
            },
            markPoint: {
              data: [
                {type: 'max', name: '最大值'},
                {type: 'min', name: '最小值'}
              ]
            },
            markLine: {
              data: [
                {type: 'average', name: '平均值'}
              ]
            }
          }]

        }
      },
      generatorBarOption(){
        return {
          title: {
            text: this.titleText,
            subtext: this.subText,
            x: "center"
          },
          color: ["#3398DB"],
          tooltip: {
            trigger: "axis",
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          toolbox: {
            show: true,
            feature: {
              dataZoom: {
                yAxisIndex: 'none'
              },
              dataView: {readOnly: false},
              magicType: {type: ['bar', 'line']},
              restore: {},
              saveAsImage: {}
            }
          },
          xAxis: [
            {
              type: "category",
              data: this.xAxisData,
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: "value",
              formatter: '{value}' + this.unit
            }
          ],
          series: [
            {
              name: this.yText,
              type: "bar",
              barWidth: "60%",
              data: this.yAxisData
            }
          ]
        };
      },
      generatorPieOption() {
        let pieData = [];
        for (let index in this.xAxisData) {
          pieData.push({
            value: this.yAxisData[index],
            name: this.xAxisData[index]
          });
        }

        return {
          title: {
            text: this.titleText,
            subtext: this.subText,
            x: "center"
          },
          toolbox: {
            show: true,
            feature: {
              dataZoom: {
                yAxisIndex: 'none'
              },
              dataView: {readOnly: false},
              restore: {},
              saveAsImage: {}
            }
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: "vertical",
            left: "left",
            data: this.xAxisData
          },
          series: [
            {
              name: "访问来源",
              type: "pie",
              radius: "55%",
              center: ["50%", "60%"],
              data: pieData,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              }
            }
          ]
        };
      },
    },
    mounted() {
      this.drawChart();
    },
    created() {
      this.generatorWithAndHeight();
    }
  }
</script>


<style scoped>
  .chart{
    text-align: center;
    margin: 0 auto;
  }
</style>
