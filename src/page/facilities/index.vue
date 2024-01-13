<template>
  <div class="indexBox" @mousemove="move">
    <vue-particles v-if="isShow" color="#00C6FB" :particleOpacity="0.8" shapeType="circle" :particleSize="40"
      :lineLinked="false" :moveSpeed="3" :hoverEffect="false" :clickEffect="false" class="particles">
    </vue-particles>
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
        <component :is="showComponent" @statusChange="statusChange"></component>
        <!-- <electric-meter-watch v-if="this.$route.query.equipType == '电能表'" />
        <normal-meter-watch v-if="this.$route.query.equipType == '标准表'" />
        <transformer-watch v-if="this.$route.query.equipType == '互感器'" /> -->
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

import { mapState, mapActions, } from 'pinia';
import useDeviceStore from '../../store/index.js';

const store = useDeviceStore();

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
      isShow: false,
      showComponent: '',
      processWatchList: {
        '电能表': 'electricMeterWatch',
        '标准表': 'normalMeterWatch',
        '互感器': 'transformerWatch',
      },
      deviceList: [
        // { name: "设备名称", value: "互感器检定装置" },
        // { name: "设备编号", value: "02031" },
        // { name: "设备厂家信息", value: "深圳科陆电子" },
        // { name: "所属实验室", value: "2308" },
        // { name: "设备等级", value: "0.05" },
        // { name: "设备检定日期", value: "20220513" },
        // { name: "检定有效期", value: "20240512" },
        // { name: "设备运行状态", value: "运行" },
      ],
      testerList: [],
      envList: {},
      realTimeList: {},
      // watchList: [],
      interval: null,
      intervalSum: 0,
      hideTime: 1,
      tempObj: {},
    };
  },
  mounted() {
    this.init();
    this.interval = setInterval(() => {
      if (this.intervalSum > 100) {
        location.reload();
      }
      this.init();
      this.intervalSum++;
    }, 10000);
  },
  methods: {
    init() {
      // console.log('route', this.$route.query);
      //定时器
      this.$request("get", "/bigScreen/durationLock").then((res) => {
        this.hideTime = res.data;
        if (this.hideTime) {
          this.updateHide();
        }
      });
      this.showComponent = this.processWatchList[this.$route.query.equipType]
      //设备信息API
      this.$request(
        "post", "/bigScreen/getEquipInfoByNo", {
        "equipNo": this.$route.query.equipNo
      }
      ).then(res => {
        // const res = {
        //   "msg": "操作成功",
        //   "code": 0,
        //   "data":  {
        //     "createBy": null,
        //     "createTime": null,
        //     "updateBy": null,
        //     "updateTime": null,
        //     "remark": null,
        //     "id": 7,
        //     "equipNo": "2308##003##KL001",
        //     "equipName": "三相电能表检定装置",
        //     "laboratoryNo": "2308",
        //     "manufacturers": "深圳科陆电子",
        //     "model": "CL3000D",
        //     "isDetail": "空闲",
        //     "checkTime": "2023-12-20",
        //     "validDate": "2024-12-31",
        //     "equipType": "电能表",
        //     "equipDj": "0.05"
        // }
        // }
        this.deviceList.length = 0
        this.deviceList.push({ name: "设备名称", value: res.data.equipName })
        this.deviceList.push({ name: "设备编号", value: res.data.equipNo })
        this.deviceList.push({ name: "设备厂家信息", value: res.data.manufacturers })
        this.deviceList.push({ name: "所属实验室", value: res.data.laboratoryNo })
        this.deviceList.push({ name: "设备等级", value: res.data.equipDj })
        this.deviceList.push({ name: "设备检定日期", value: res.data.checkTime })
        this.deviceList.push({ name: "检定有效期", value: res.data.validDate })
        this.deviceList.push({ name: "设备运行状态", value: res.data.isDetail })
        // console.log('状态更新:', store.status);
      }).finally(() => {
        store.updateStatus(this.deviceList[this.deviceList.length - 1].value);
      })
      //检定人员
      this.$request(
        "post", "/bigScreen/personnelInfo", {
        "equipNo": this.$route.query.equipNo
      }
      ).then(res => {
        this.testerList = res.data
        if (this.testerList.length == 0) {
          this.testerList = [
            {
              personnelName: "",
              post: "",
            },
          ]
        }
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
        if (!res.data.sensorInfo) {
          this.envList = {
            temperature: "",
            temperatureState: "正常",
            humidity: "",
            humidityState: "正常",
            illumination: "",
            illuminationState: "正常",
            electromagnetism: "",
            electromagnetismState: "正常",
          }
        }
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
      //过程监测
      // this.$request(
      //   "post",
      //   "/bigScreen/processMonitor",
      //   {
      //     equipNo: this.$route.query.equipNo,
      //     taskNo: this.$route.query.taskNo,
      //     equipType: this.$route.query.equipType,
      //   },
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // )
      //   .then((res) => {
      //     this.watchList = res.data;
      //   })
    },
    move() {
      if (this.isShow) {
        this.isShow = false;
        window.clearTimeout(this.tempObj.hide);
        this.tempObj.hide = null;
        this.updateHide();
      }
    },
    updateHide() {
      if (!this.tempObj.hide) {
        this.tempObj.hide = setTimeout(() => {
          this.isShow = true;
        }, this.hideTime * 1000);
      }
    },
    //点击按钮回调事件
    statusChange(status) {
      if (status) {
        this.init();
        // this.deviceList.length = 0
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
        // this.deviceList.push({ name: "设备名称", value: res.data.equipName })
        // this.deviceList.push({ name: "设备编号", value: res.data.equipNo })
        // this.deviceList.push({ name: "设备厂家信息", value: res.data.manufacturers })
        // this.deviceList.push({ name: "所属实验室", value: res.data.laboratoryNo })
        // this.deviceList.push({ name: "设备检定日期", value: res.data.checkTime })
        // this.deviceList.push({ name: "检定有效期", value: res.data.validDate })
        // this.deviceList.push({ name: "设备运行状态", value: res.data.isDetail })
        // updateStatus('运行');
      }
    },
  },
  beforeDestroy() {
    clearInterval(this.interval);
    store.updateStatus('');
    // 清空 localStorage
    // localStorage.clear();
  }
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
