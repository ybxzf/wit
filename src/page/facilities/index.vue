<template>
  <div class="indexBox">
    <el-row>
      <el-col :span="6" style=" height: 77rem; padding: 1rem 0 1rem 1rem">
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
        <electric-meter-watch v-if="this.$route.query.equipType == '电能表'" />
        <normal-meter-watch v-if="this.$route.query.equipType == '标准表'" />
        <transformer-watch v-if="this.$route.query.equipType == '互感器'" />
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
import normalMeterWatch from "./components/normalMeterWatch.vue";
import transformerWatch from "./components/transformerWatch.vue";
import { electricMeterData } from "./virtualData.js";

export default {
  components: {
    deviceInform,
    tester,
    envWatch,
    realTimeData,
    electricMeterWatch,
    normalMeterWatch,
    transformerWatch,
  }, //注册组件
  name: "facilities",
  data() {
    return {
      deviceList: [
        // { name: "设备名称", value: "互感器鉴定装置" },
        // { name: "设备编号", value: "02031" },
        // { name: "设备厂家信息", value: "深圳科陆电子" },
        // { name: "所属实验室", value: "2308" },
        // { name: "设备检定日期", value: "20220513" },
        // { name: "检定有效期", value: "20240512" },
        // { name: "设备运行状态", value: "闲置" },
      ],
      testerList: [],
      envList: {},
      realTimeList: {},
    };
  },
  mounted() {
    console.log(this.$route);
    this.init();
  },
  methods: {
    init() {
      //设备信息API
      this.$request(
        "post", "/bigScreen/getEquipInfoByNo", {
        "equipNo": this.$route.query.equipNo
      }
      ).then(res => {
        this.deviceList.length = 0
        // const res = {
        //   "msg": "操作成功",
        //   "code": 0,
        //   "data": {
        //     "createBy": null,
        //     "createTime": null,
        //     "updateBy": null,
        //     "updateTime": null,
        //     "remark": null,
        //     "id": 6,
        //     "equipName": "三相谐波表检定装置",//设备名称
        //     "equipNo": "2304##002##WSD001",//设备编号
        //     "manufacturers": "山东威斯顿",//厂商
        //     "laboratoryNo": "2304",//所属实验室
        //     "checkTime": "20220513",//检定时间
        //     "validDate": "20240512",//检定有效期
        //     "isDetail": "运行",//设备状态
        //     "model": "WE0129",//型号
        //     "equipType": "互感器"//设备类型
        //   }
        // }
        this.deviceList.push({ name: "设备名称", value: res.data.equipName })
        this.deviceList.push({ name: "设备编号", value: res.data.equipNo })
        this.deviceList.push({ name: "设备厂家信息", value: res.data.manufacturers })
        this.deviceList.push({ name: "所属实验室", value: res.data.laboratoryNo })
        this.deviceList.push({ name: "设备检定日期", value: res.data.checkTime })
        this.deviceList.push({ name: "检定有效期", value: res.data.validDate })
        this.deviceList.push({ name: "设备运行状态", value: res.data.isDetail })
      });
      //检定人员
      this.$request(
        "post", "/bigScreen/personnelInfo", {
        "equipNo": this.$route.query.equipNo
      }
      ).then(res => {
        this.testerList = res.data
        //   this.testerList = [
        //   {
        //     personnelName: "江正涛",
        //     post: "电能，电阻",
        //   },
        // ]
      })
      //环境监测
      this.$request(
        "post", "/bigScreen/onlineLab", {
        labNo: window.localStorage.getItem('labNo'),
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      }
      ).then((res) => {
        this.envList = res.data.sensorInfo;
        // this.envList = {
        //   temperature: "50.5℃",
        //   temperatureState: "异常",
        //   humidity: "50.%RH",
        //   humidityState: "异常",
        //   illumination: "685lux",
        //   illuminationState: "异常",
        //   electromagnetism: "10mg/L",
        //   electromagnetismState: "异常",
        // }
      });
      //实时数据
      this.$request(
        "post", "/bigScreen/equipDataInfo", {
        equipNo: this.$route.query.equipNo
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      }
      ).then((res) => {
        this.realTimeList = res.data[0];
        // this.realTimeList = {
        //   "equipName": "三相标准表检定装置",
        //   "phia": "0.00",
        //   "phib": "240.00",
        //   "phic": "120.00",
        //   "checker": "江正涛",
        //   "Ua": "99.99",
        //   "Ub": "100.01",
        //   "Uc": "99.10",
        //   "La": "5.01",
        //   "equipType": "电能表",
        //   "Lb": "4.99",
        //   "Lc": "4.98",
        //   "equipNo": "2303##001##HP001",
        //   "projectName": "Q+ 合元 0.8C 1.0Ib 基本误差"
        // }

        //   {
        //   phase: "123",
        //   equipName: "三相谐波表检定装置",
        //   lightLoad: "123",
        //   rating: "123",
        //   accuracy: "123",
        //   oneCurrent: "123",
        //   updateTime: 1702650566000,
        //   checker: "江正涛",
        //   params: {},
        //   booster: "123",
        //   twoCurrent: "123",
        //   equipType: "互感器",
        //   taskNo: "1202002",
        //   equipNo: "2304##002##WSD001",
        //   id: 1,
        //   resistor: "123",
        //   projectName: "Q+ 合元 0.8C 1.0Ib 基本误差",
        //   powerFactor: "123",
        // }
      });
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
