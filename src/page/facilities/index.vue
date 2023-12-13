<template>
  <div class="indexBox">
    <el-row>
      <el-col :span="6">
        <el-row>
          <el-col :span="24">
            <error-watch :deviceList="this.deviceList"></error-watch>
          </el-col>
          <el-col :span="24">
            <tester :testerList="this.testerList"></tester>
          </el-col>
          <el-col :span="24">
            <env-condition :envList="this.envList"></env-condition>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="18">
        <device-status :envList="this.envList"></device-status>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import errorWatch from "./components/errorWatch.vue";
import tester from "./components/tester.vue";
import envCondition from "./components/envCondition.vue";
import deviceStatus from "./components/deviceStatus.vue";
export default {
  components: { errorWatch, tester, envCondition, deviceStatus }, //注册组件
  name: "facilities",
  data() {
    return {
      deviceList: [
        { name: "设备名称", value: "XXXXX" },
        { name: "设备编号", value: "XXXXX" },
        { name: "设备厂家信息", value: "XXXXX" },
        { name: "所属实验室", value: "XXXXX" },
        { name: "设备运行状态", value: "正常" },
      ],
      testerList: [
        { name: "张三" },
        { name: "李四" },
        { name: "王五" },
        { name: "赵六" },
        { name: "赵六" },
        { name: "赵六" },
      ],
      envList: {
        temperature: "50",
        humidity: "20",
        illumination: "100",
        magneticField: "210",
      },
    };
  },
  methods: {
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
  padding: 10px;
}
::-webkit-scrollbar {
  display: none;
}
/* 
.unusual {
  width: 100%;
  height: 24rem;
  background-image: url("../../assets/img/frame_0_new.png");
  background-size: 100% 100%;
}
.title {
  font-size: 1.72rem;
  text-shadow: 0px 3px 0px rgba(0, 9, 17, 0.52);
  color: #fff;
  padding: 0 0 1rem 4rem;
  font-family: "YS";
  letter-spacing: 0.15rem;
  line-height: 2.58rem;
}
.indexBox .unusual .swiperHead {
  width: 28.42rem;
  margin: 0 auto;
  height: 3.58rem;
  font-size: 1.28rem;
  color: #4bf8fe;
  line-height: 3.58rem;
} */
</style>
