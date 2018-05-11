<template>
  <el-table
    :data="tableData3"
    style="width: 100%"
    height="450">
    <el-table-column
      fixed
      prop="date"
      label="日期"
      width="150">
    </el-table-column>
    <el-table-column
      prop="tempture"
      label="温度"
      width="120">
    </el-table-column>
    <el-table-column
      prop="ax"
      label="x轴加速度"
      width="120">
    </el-table-column>
    <el-table-column
      prop="city"
      label="ay"
      width="120">
    </el-table-column>
    <el-table-column
      prop="az"
      label="z轴加速度 "
      width="300">
    </el-table-column>
    <el-table-column
      prop="wx"
      label=" x角速度"
      width="120">
    </el-table-column>
    <el-table-column
      prop="wz"
      label="z角速度"
      width="120">
    </el-table-column>
    <el-table-column
      prop="ir_value"
      label=" ir_value"
      width="120">
    </el-table-column>
    <el-table-column
      prop="red_value"
      label=" red_value"
      width="120">
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: 'ShowData',
    data() {
      return {
        tableData3: [{
          date: '2016-05-03',
          tempture: '王小虎',
          ax: '上海',
          ay: '普陀区',
          az: '上海市普陀区金沙江路 1518 弄',
          bz: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-08',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-06',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-07',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }]
      }
    }
  }
</script>
