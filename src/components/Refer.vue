<template>
  <div id="gps_map" class="whole">
    <el-container style="height: 100%; border: 1px solid #eee">

      <el-header style="text-align: right; font-size: 12px">
<!--      &lt;!&ndash;  <el-button icon="el-icon-more-outline" style="margin-right: 100% ; background: #1c2b36; border-color: #1c2b36" circle></el-button> -->
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>item1</el-dropdown-item>
            <el-dropdown-item>item2</el-dropdown-item>
            <el-dropdown-item><span @click="quitSystem">退出登录</span></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span style="color:#ffffff ">{{username}}</span>
      </el-header>

      <el-container>

        <el-aside width="200px" style="background-color: rgb(28, 43, 54)">
          <el-menu :default-openeds="['1', '2']"
                   class="el-menu-vertical-demo"
                   @open="handleOpen"
                   @close="handleClose"
                   background-color="#1c2b36"
                   text-color="#fff"
                   active-text-color="#9FCDFF"

          >
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-location-outline"></i>监控中心</template>
              <el-menu-item-group>
                <template slot="title">数据监测</template>
                <el-menu-item index="1-1" @click="show_it(0)">GPS定位地图</el-menu-item>
                <el-menu-item index="1-2" @click="show_it(1)">历史数据</el-menu-item>
                <el-menu-item index="1-3" @click="show_it(2)">云交换机</el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group title="其他数据">
                <el-menu-item index="1-4" @click="show_it(3)">传感器1</el-menu-item>
              </el-menu-item-group>

            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-menu"></i>导航二</template>
              <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="1-1">选项1</el-menu-item>
                <el-menu-item index="1-2">选项2</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"><i class="el-icon-setting"></i>导航三</template>

            </el-submenu>
          </el-menu>
        </el-aside>

        <el-main>
          <el-container v-show=controlShow[0] id="show_map">
            <el-header
              style="background:rgb(245,245,245); border-color: rgb(215,215,215) ; border-style: solid; border-width: 1px 0px 1px 0px;">
              地图显示
            </el-header>
            <div id="allmap" style="height: 750px; width: 100%; background: aliceblue; "></div>
          </el-container>
          <el-container v-show=controlShow[1] id="show_data">
            <el-aside width=50%>
              <el-header
                style="background:rgb(245,245,245); border-color: rgb(215,215,215) ; border-style: solid; border-width: 1px 0px 1px 0px;">
                历史数据展示
              </el-header>
              <el-table
                :data="tableData"
                style="width: 100%"
                height="400"
                :default-sort="{prop: 'date', order: 'descending'}"
              >
                <el-table-column
                  prop="date"
                  label="时间"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="latitude"
                  label="经度"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="longitude"
                  label="纬度"
                  width="180">
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      @click="handleEdit(scope.$index, scope.row)">显示
                    </el-button>

                  </template>
                </el-table-column>
              </el-table>
              <div style="margin-top: 20px">
                <el-header
                  style="background:rgb(245,245,245); border-color: rgb(215,215,215) ; border-style: solid; border-width: 1px 0px 1px 0px;">
                  设备列表
                </el-header>
                <div>
                  <el-table
                    :data="deviceList"
                    style="width: 100%"
                    :default-sort="{prop: 'date', order: 'descending'}"
                  >
                    <el-table-column
                      prop="devid"
                      label="id"
                      width=150px>
                    </el-table-column>
                    <el-table-column
                      prop="name"
                      label="名称"
                      width=150px>
                    </el-table-column>
                    <el-table-column
                      prop="address"
                      label="地址"
                      width=300px>
                    </el-table-column>
                    <el-table-column label="操作">
                      <template slot-scope="scope">
                        <el-button
                          size="mini"
                          @click="showAddress(scope.$index, scope.row)">显示
                        </el-button>

                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </el-aside>


            <el-aside width=50% style="margin-left: 10px;">
              <el-header
                style="background:rgb(245,245,245); border-color: rgb(215,215,215) ; border-style: solid; border-width: 1px 0px 1px 0px;">
                数据展示
              </el-header>
              <div id="historyMap" style="height: 750px; width: 100%; background: rgba(241,248,255,0.2)">

              </div>

            </el-aside>

          </el-container>

          <el-container v-show=controlShow[2] id="show_list">
            <el-container>
              <el-aside width="30%" style="padding: 20px">
                <el-header
                  style="background:rgb(245,245,245); border-color: rgb(215,215,215) ; border-style: solid; border-width: 1px 0px 1px 0px;">
                  操作
                </el-header>
                <div id="data" style=" width: 100%; background: aliceblue; ">
                  <div style="padding: 20px">
                    <div>
                      <el-row>
                        <el-radio v-model="radio" label="1">单个设备id</el-radio>
                      </el-row>
                      <el-row>
                        <el-input class="deviceId" placeholder="请输入内容" v-model="deviceId">
                          <template slot="prepend">设备id</template>
                        </el-input>
                      </el-row>

                      <el-row>
                        <el-input class="deviceId" placeholder="请输入内容" v-model="deviceNum">
                          <template slot="prepend">从机序号</template>
                        </el-input>
                      </el-row>
                    </div>
                    <el-radio v-model="radio" label="2">所有设备</el-radio>
                    <el-row>
                      <el-button type="success" @click="SubscribeDevRaw">订阅</el-button>
                      <el-button type="danger" @click="unSubscribeDevRaw">取消订阅</el-button>
                    </el-row>
                  </div>
                </div>
              </el-aside>
              <el-aside width="70%" style="padding: 20px">
                <el-header
                  style="background:rgb(245,245,245); border-color: rgb(215,215,215) ; border-style: solid; border-width: 1px 0px 1px 0px;">
                  已订阅设备
                </el-header>
                <div id="info" style=" height: 300px; width: 100%; background: aliceblue; ">
                  <div style="padding: 20px">
                    <ul id="topic2"></ul>
                  </div>
                </div>

              </el-aside>
            </el-container>

            <el-footer style="height: 400px">
              <el-header
                style="background:rgb(245,245,245); border-color: rgb(215,215,215) ; border-style: solid; border-width: 1px 0px 1px 0px;">
                接收的数据
                <el-button @click="clearData">
                  清空数据
                </el-button>
                <el-tag>{{countMsg}}</el-tag>
              </el-header>
              <div id="devInfo"
                   style="height: 300px ; background: aliceblue; margin-top: 0px;overflow-y:auto;max-height:300px;">
                <div style="padding: 20px">
                  <ul id="rcvData2" style="margin-top: 0px"></ul>
                </div>

              </div>
            </el-footer>

          </el-container>
          <div v-show="controlShow[3]">
            <temperature
              :table-data="tableData3" :fresh-data="arrData" ref="tab3" @click="ss">
            </temperature>
          </div>

        </el-main>
      </el-container>
    </el-container>


  </div>


</template>

<script>

  import $ from 'jquery'
  import Temperature from './Temperature'

  export default {
    name: "Refer",
    components: {
      Temperature
    },
    data() {
      return {
        tableData: [{
          date: '2',
          latitude: '117',
          longitude: '32.9',
          strformat: "117,32.9"
        }, {
          date: '1',
          latitude: '118.9',
          longitude: '31.9',
          strformat: "118.9,31.9"
        }], /*Array(4).fill(item),*/
        isShow: true,
        controlShow: [false, false, true, false, false, false, false, false],
        radio: '2',
        username: sessionStorage.getItem("username"),
        deviceId: '',
        deviceNum: '',
        usrCloud: '',
        deviceList: [],
        countMsg: 0,
        baiduMap: '',
        tableData3: [{
          date: '2017-05-15',
          temperature: 18,
          address: '上海市普陀区金沙江路 1518 弄'
        },
          {
            date: '2017-05-15',
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
        arrData: [['data', 30], ['data', 28]],
        isCollapse:false
      }
    }

    ,
    mounted: function () {  // 初始化usrcloud

      var callback = {
        USR_onConnAck: USR_onConnAck,
        USR_onConnLost: this.USR_onConnLost,
        USR_onSubscribeAck: USR_onSubscribeAck,
        USR_onUnSubscribeAck: USR_onUnSubscribeAck,
        USR_onRcvParsedDataPointPush: USR_onRcvParsedDataPointPush,
        USR_onRcvParsedOptionResponseReturn: USR_onRcvParsedOptionResponseReturn,
        USR_onRcvParsedDevStatusPush: USR_onRcvParsedDevStatusPush,
        USR_onRcvRawFromDev: this.USR_onRcvRawFromDev,
        USR_onRcvParsedDevAlarmPush: USR_onRcvParsedDevAlarmPush
      };

      this.$nextTick(() => {
      /*  this.baiduMap = new BMap.Map("allmap");*/
        this.usrCloud = new UsrCloud();
        this.usrCloud.Usr_Init("clouddata.usr.cn", 8080, 2, callback);  // 定义回掉函数
        this.usrCloud.USR_Connect(sessionStorage.getItem('username'), sessionStorage.getItem('md5_password'));
        console.log("init usrCloud");
      });

 /*     var date = new  Date();
      console.log(dateFormat("yyyy-MM-dd hh:mm:ss", date));*/
    },
    methods: {
      handleOpen(key, keyPath) {
      },
      handleClose(key, keyPath) {
      },
      quitSystem() {
        this.usrCloud.USR_DisConnect(); //  退出登陆
        console.log("退出登陆");
        this.$router.push('/');
      },
      getDeviceInfo() {

        $.post("https://cloudapi.usr.cn/usrCloud/dev/getDevs", JSON.stringify({

            "token": sessionStorage.getItem('token')
          }),
          (result) => {
            result = JSON.parse(result);
            if (result.info === "ok") {
              this.deviceList = result.data.dev;
            }
          })
      },
      handleEdit(index, row) {

        this.$nextTick(function () {
          var length = this.tableData.length;
          var map = new BMap.Map("historyMap");
          var point = new BMap.Point(row.latitude, row.longitude); // 创建点坐标，汉得公司的经纬度坐标
          map.centerAndZoom(point, 15);
          map.enableScrollWheelZoom();
          var marker = new BMap.Marker(point);

          function transform(ggPoint) {
            var convertor = new BMap.Convertor();
            var pointArr = [];
            pointArr.push(ggPoint);
            convertor.translate(pointArr, 1, 5, function (data) {
              if (data.status === 0) {
                marker = new BMap.Marker(data.points[0]);
                map.addOverlay(marker);
                var label = new BMap.Label(row.strformat, {offset: new BMap.Size(20, -10)});
                marker.setLabel(label); //添加百度label
                map.setCenter(data.points[0]);

              }

            })
          }

          setTimeout(transform(point), 1000);

        })

      },
      showAddress(index, row) {
        var strpo = row.position;
        var posdata = strpo.split(',');
        this.$nextTick(function () {
          var map = new BMap.Map("historyMap");
          var point = new BMap.Point(posdata[0], posdata[1]); // 创建点坐标，汉得公司的经纬度坐标
          map.centerAndZoom(point, 15);
          map.enableScrollWheelZoom();
          var marker = new BMap.Marker(point);

          function transform(ggPoint) {
            var convertor = new BMap.Convertor();
            var pointArr = [];
            pointArr.push(ggPoint);
            convertor.translate(pointArr, 1, 5, function (data) {
              if (data.status === 0) {
                marker = new BMap.Marker(data.points[0]);
                map.addOverlay(marker);
                var label = new BMap.Label(strpo, {offset: new BMap.Size(20, -10)});
                marker.setLabel(label); //添加百度label
                map.setCenter(data.points[0]);

              }
            })
          }

          setTimeout(transform(point), 1000);

        })

      },
      initMap(entry) {
        this.$nextTick(function () {
          var map = new BMap.Map("allmap");
          var point = new BMap.Point(entry.latitude, entry.longitude); // 创建点坐标，经纬度坐标
          map.centerAndZoom(point, 15);
          map.enableScrollWheelZoom();
          var marker = new BMap.Marker(point);

          function transform(ggPoint) {
            var convertor = new BMap.Convertor();
            var pointArr = [];
            pointArr.push(ggPoint);
            convertor.translate(pointArr, 1, 5, function (data) {
              if (data.status === 0) {
                marker = new BMap.Marker(data.points[0]);
                map.addOverlay(marker);
                var label = new BMap.Label(entry.strformat, {offset: new BMap.Size(20, -10)});
                marker.setLabel(label); //添加百度label
                map.setCenter(data.points[0]);
              }
            })
          }

          transform(point);
        });
      },
      show_it(index) {
        if (index == 0) {
          this.initMap(this.tableData[this.tableData.length - 1]);
        }
        if (index == 1) {
          this.getDeviceInfo(); // 获取设备列表信息
        }
        if (index === 3){
          this.testDate();
        }
        for (var i = 0; i < this.controlShow.length; i++) {
          this.$set(this.controlShow, i, false);
        }
        this.$set(this.controlShow, index, true);
      },
      SubscribeDevRaw() {
        // 先进行连接*/
        if (this.radio == '1') {
          var result = this.usrCloud.USR_SubscribeDevRaw(this.deviceId);

          if (result != 0) {
            this.$alert("id 为 " + this.deviceId + " 订阅失败，错误代码" + result);
          }
        } else {
          result = this.usrCloud.USR_SubscribeUserRaw(sessionStorage.getItem('username'));
          if (result != 0) {
            this.$alert(" 全部设备订阅失败，错误代码" + result);
          }
        }

      },
      clearData() {
        $("#rcvData2").html("");
        this.countMsg = 0;
      },
      showDataInMap(position) {

        var arrPostion = position.split(',');
        var longitude = parseFloat(arrPostion[0]);
        var latitude = parseFloat(arrPostion[2]);
        var str;
        var du, min, second;
        du = Math.floor(Math.floor(longitude) / 100);
        min = (Math.floor(longitude) % 100);
        second = (longitude - Math.floor(longitude));
        str = "( " + du + "°" + min + "'" + Math.ceil(second * 60) + "''N , ";
        longitude = du + min / 60 + second / 60;
        du = Math.floor(Math.floor(latitude) / 100);
        min = (Math.floor(latitude) % 100);
        second = (latitude - Math.floor(latitude));
        latitude = du + min / 60 + second / 60;
        str = str + du + "°" + min + "'" + Math.ceil(second * 60) + "''E ) ";
        var entry = this.tableData[0];
        var date = new Date();
        entry.date = dateFormat("yyyy-MM-dd hh:mm:ss",date); // 格式化时间
        entry.latitude = latitude;
        entry.longitude = longitude;
        entry.strformat = str;
        this.tableData.push(entry);
      },
      USR_onRcvRawFromDev(event) {
        $("#rcvData2").append("<li>devId:" + event.devId + "\tdata:" + buf2HexStr(event.payload) + "Str: " + buf2str(event.payload) + "</li>");
        this.countMsg = this.countMsg + 1;
        this.showDataInMap(buf2str(event.payload));
      },
      USR_onConnLost(event) {
        console.log(event);
        console.log("丢失连接");
      },
      unSubscribeDevRaw() {
        if (this.radio == '1') {
          result = this.usrCloud.USR_UnSubscribeDevRaw(this.deviceId);
        } else {
          result = this.usrCloud.USR_UnSubscribeUserRaw(sessionStorage.getItem('username'));
        }
      },
      ss(){
        alert("hah")
      },
      testDate(){
        var self = this;
        setInterval(()=>{
          var date = new Date();
          this.arrData.push([dateFormat("hh:mm:ss",date),Math.ceil(Math.random()*10+20)]);
          if (this.arrData.length >= 8){
            this.arrData.shift();
          }
          self.$refs["tab3"].drawfreshTable();
        },3000)
      }


    }

  }

  /**
   * 连接成功回调（云组态和云交换机共用）
   */
  function USR_onConnAck(event) {

    console.log(event);
    if (event.code == 0) {
      console.log("连接成功");
    } else {
      console.log("连接回调用失败");
    }
  }

  /**
   * 连接丢失回调（云组态和云交换机共用）
   */


  /**
   * 订阅成功回调（云组态和云交换机共用）
   */
  function USR_onSubscribeAck(event) {
    console.log(event);
    //判断返回函数名
    if (event.SubFunName === 'SubscribeDevParsed') { //云组态
      if (event.code === 0) {
        console.log("通过全部订阅成功");
        //判断返回函数名
      } else {
        console.log("订阅失败");
      }
    } else if (event.SubFunName === 'SubDevRaw' || event.SubFunName === 'SubscribeUserRaw' || event.SubFunName === 'UnSubscribeDevRaw') { //云交换机
      if (event.code === 0) {
        $('#topic2').append("<li>" + event.SubParam.split('/')[2] + "</li>");  // 显示数据
        console.log("订阅成功");  //  不知道为什么没办法使用this.alert
      } else {
        console.log("订阅失败");
      }
    }
  }

  /**
   * 取消订阅成功回调（云组态和云交换机共用）
   */
  function USR_onUnSubscribeAck(event) {
    console.log(event);
    if (event.SubFunName === 'UnSubscribeDevParsed') { //云组态
      if (event.code === 0) {

        alert('取消订阅成功');
        console.log("qxdycg");

      } else {
        /*    $("#info2").text('取消订阅失败');*/
        alert('取消订阅失败');
        console.log("qxdysb");
      }
    } else if (event.SubFunName === 'UnSubDevRaw' || event.SubFunName === 'UnSubscribeUserRaw' || event.SubFunName === 'UnSubscribeDevRaw') { //云交换机
      if (event.code === 0) {
        $("#topic2 li").each(function () {
          if ($(this).text() === event.SubParam.split('/')[2]) {
            $(this).remove();
          }
        });
        console.log("qxcg");
      } else {
        alert('取消订阅失败');
        console.log("qxsb");
      }
    }
  }


  /**
   * 数据点数据推送回调（云组态）
   */
  //todo 看一下返回的字段
  function USR_onRcvParsedDataPointPush(event) {
    console.log(event);
  }

  /**
   * 接收数据状态回调（云组态）
   */
  function USR_onRcvParsedOptionResponseReturn(event) {

    console.log(event);
  }

  /**
   * 接收上下线回调（云组态）
   */
  function USR_onRcvParsedDevStatusPush(event) {
    console.log(event);
    alert('devId:' + event.devId + 'status:' + event.status);
  }

  /**
   * 接收设备报警回调（云组态）
   */
  function USR_onRcvParsedDevAlarmPush(event) {

    console.log(event);
  }

  /**
   * 接收设备原始数据流回调（云交换机）
   */


  function dateFormat(fmt,date){
    var o ={
      "M+" : date.getMonth() +1,
      "d+" : date.getDate(),
      "h+" : date.getHours(),
      "m+" : date.getMinutes(),
      "s+" : date.getSeconds(),
      "q+" : Math.floor((date.getMonth()+3)/3),
      "S"  : date.getMilliseconds()
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
      if(new RegExp("("+ k +")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
  }






</script>

<style scoped>


  .whole {
    content: '';
    position: fixed;
    width: 100%;
    height: 100%;
    background: url("./../assets/blur-bg.jpg") no-repeat center center;
    background-size: cover;
    will-change: transform;
  }

  a {
    color: #ffffff;
  }

  .el-radio {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .el-header {
    background-color: #1c2b36;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }

  .deviceId {

    width: 90%;
  }

  .el-input {
    margin-top: 15px;
  }
</style>
