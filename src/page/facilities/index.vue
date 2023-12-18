<template>
  <div class="indexBox">
    <el-row>
      <el-col :span="6" style="border: 1px solid red;height: 77rem ;padding: 1rem 0 1rem 1rem;">
        <el-row>
          <el-col :span="24">
            <device-inform :deviceList="this.deviceList" />
          </el-col>
          <el-col :span="24">
            <tester :testerList="this.testerList" />
          </el-col>
          <el-col :span="24">
            <env-watch :envList="this.envList" />
          </el-col>
          <el-col :span="24">
            <real-time-data :realTimeList="this.realTimeList" />
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="18">
        <electric-meter-watch :processWatchList="this.processWatchList" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import deviceInform from "./components/deviceInform.vue";
import tester from "./components/tester.vue";
import envWatch from "./components/envWatch.vue";
import realTimeData from "./components/realTimeData.vue";
import electricMeterWatch from "./components/electricMeterWatch.vue";
import { electricMeterData } from "./virtualData.js";

export default {
  components: { deviceInform, tester, envWatch, realTimeData, electricMeterWatch }, //注册组件
  name: "facilities",
  data() {
    return {
      deviceList: [
        { name: "设备名称", value: "互感器鉴定装置" },
        { name: "设备编号", value: "02031" },
        { name: "设备厂家信息", value: "深圳科陆电子" },
        { name: "所属实验室", value: "2308" },
        { name: "设备检定日期", value: "20220513" },
        { name: "检定有效期", value: "20240512" },
        { name: "设备运行状态", value: "闲置" },
      ],
      testerList: [
        {
          "personnelName": "江正涛",
          "post": "电能，电阻"
        },
      ],
      envList: {
        temperature: "50.5℃",
        humidity: "50.%RH",
        illumination: "685lux",
        magneticField: "10mg/L",
      },
      // realTimeList: {
      //   "equipName": "直流电能表检定装置",
      //   "phia": "0.00",
      //   "phib": "240.00",
      //   "phic": "120.00",
      //   "checker": "江正涛",
      //   "Ua": "219.99",
      //   "Ub": "220.01",
      //   "Uc": "220.10",
      //   "La": "5.01",
      //   "equipType": "电能表",
      //   "Lb": "4.99",
      //   "Lc": "4.98",
      //   "equipNo": "2304##002##TH001",
      //   "projectName": "Q+ 合元 0.8C 1.0Ib 基本误差"
      // },
      realTimeList: {
        "phase": "123",
        "equipName": "三相谐波表检定装置",
        "lightLoad": "123",
        "rating": "123",
        "accuracy": "123",
        "oneCurrent": "123",
        "updateTime": 1702650566000,
        "checker": "江正涛",
        "params": {},
        "booster": "123",
        "twoCurrent": "123",
        "equipType": "互感器",
        "taskNo": "1202002",
        "equipNo": "2304##002##WSD001",
        "id": 1,
        "resistor": "123",
        "projectName": "Q+ 合元 0.8C 1.0Ib 基本误差",
        "powerFactor": "123"
      },
      processWatchList: [],
    };
  },
  mounted() {
    console.log(this.$route);
    this.init();
  },
  methods: {
    init() {
      this.processWatchList = electricMeterData;
    },
    clickBack() {
      // this.$router.push("/")
    },
  },
};
</script>
<style scoped>
@import url("../../assets/css/index.css");
</style>
<style scoped>
.indexBox {
  /* padding: 10px; */
}

::-webkit-scrollbar {
  display: none;
}
</style>
