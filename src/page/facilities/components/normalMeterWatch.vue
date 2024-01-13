<template>
  <div class="page">
    <el-row>
      <el-col class="title" :span="24">
        <div class="title-botton start" v-loading="buttonLoad.start" element-loading-background="rgba(0, 0, 0, 0.1)"
          @click="changeStatus('start')" />
        <div class="title-botton pause" v-loading="buttonLoad.pause" element-loading-background="rgba(0, 0, 0, 0.1)"
          @click="changeStatus('pause')" />
        <div class="title-botton stop" v-loading="buttonLoad.stop" element-loading-background="rgba(0, 0, 0, 0.1)"
          @click="changeStatus('stop')" />
      </el-col>
      <el-col class="content" :span="24">
        <table class="content-table">
          <!-- 表头 -->
          <thead>
            <tr>
              <th colspan="6">检定项目</th>
              <th colspan="8">表位1</th>
            </tr>
            <tr>
              <th colspan="6">基本误差</th>
              <th colspan="8">
                {{
                  this.showData.length > 0
                  ? this.showData[0]["1_meterNo"] || "--"
                  : "--"
                }}
              </th>
            </tr>
            <tr>
              <th rowspan="2">电量</th>
              <th rowspan="2">限量</th>
              <th rowspan="2">摘要</th>
              <th rowspan="2">测试点</th>
              <th rowspan="2">计量单位</th>
              <th rowspan="2">检定值</th>
            </tr>
            <tr>
              <th>标准示值</th>
              <th>被检示值</th>
              <th>绝对误差</th>
              <th>允许误差</th>
              <th>相对误差%</th>
              <th>引用误差%</th>
              <th>准确度</th>
              <th>结论</th>
            </tr>
          </thead>
          <!-- 表格体，使用 v-for 渲染数据 -->
          <tbody v-loading="tableLoad" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.6)">
            <tr v-for="(item, index) in showData" :key="index">
              <td class="project">
                {{
                  Object.prototype.hasOwnProperty.call(item, "itemNameValues")
                  ? item.itemNameValues[2] || "--"
                  : "--"
                }}
              </td>
              <td>
                {{
                  Object.prototype.hasOwnProperty.call(item, "itemNameValues")
                  ? item.itemNameValues[3] || "--"
                  : "--"
                }}
              </td>
              <td>
                {{
                  Object.prototype.hasOwnProperty.call(item, "itemNameValues")
                  ? item.itemNameValues[4] || "--"
                  : "--"
                }}
              </td>
              <td>
                {{
                  Object.prototype.hasOwnProperty.call(item, "itemNameValues")
                  ? item.itemNameValues[5] || "--"
                  : "--"
                }}
              </td>
              <td>
                {{
                  Object.prototype.hasOwnProperty.call(item, "itemNameValues")
                  ? item.itemNameValues[6] || "--"
                  : "--"
                }}
              </td>
              <td>
                {{
                  Object.prototype.hasOwnProperty.call(item, "itemNameValues")
                  ? item.itemNameValues[7] || "--"
                  : "--"
                }}
              </td>
              <td>
                {{
                  Object.prototype.hasOwnProperty.call(item, "1_Values")
                  ? item["1_Values"][0] || "--"
                  : "--"
                }}
              </td>
              <td>
                {{
                  Object.prototype.hasOwnProperty.call(item, "1_Values")
                  ? item["1_Values"][1] || "--"
                  : "--"
                }}
              </td>
              <td>
                {{
                  Object.prototype.hasOwnProperty.call(item, "1_Values")
                  ? item["1_Values"][2] || "--"
                  : "--"
                }}
              </td>
              <td>
                {{
                  Object.prototype.hasOwnProperty.call(item, "1_Values")
                  ? item["1_Values"][3] || "--"
                  : "--"
                }}
              </td>
              <td>
                {{
                  Object.prototype.hasOwnProperty.call(item, "1_Values")
                  ? item["1_Values"][4] || "--"
                  : "--"
                }}
              </td>
              <td>
                {{
                  Object.prototype.hasOwnProperty.call(item, "1_Values")
                  ? item["1_Values"][5] || "--"
                  : "--"
                }}
              </td>
              <td>
                {{
                  Object.prototype.hasOwnProperty.call(item, "1_Values")
                  ? item["1_Values"][6] || "--"
                  : "--"
                }}
              </td>
              <td :class="item.epitope13 == '不合格' ? 'unqualified' : ''">
                {{
                  Object.prototype.hasOwnProperty.call(item, "trialResult")
                  ? item["trialResult"] || "--"
                  : "--"
                }}
              </td>
            </tr>
          </tbody>
        </table>
      </el-col>
      <el-col class="footer" :span="24">
        <button class="back-page" @click="goBack()"></button>
        <button class="first-end-page-button" @click="toFirstPage()">
          首页
        </button>
        <button class="page-button" @click="() => (currentPage > 1 ? currentPage-- : '')">
          上一页
        </button>

        <el-pagination class="page-list" :page-size="18" layout="pager" :current-page="currentPage" :total="total"
          @current-change="handleCurrentChange">
        </el-pagination>
        <button class="page-button" @click="() => (currentPage < pages ? currentPage++ : '')">
          下一页
        </button>
        <button class="first-end-page-button" @click="toLastPage()">
          末页
        </button>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="messageDetails.visible" width="30%" :close-on-click-modal="false">
      <span slot="title" :class="`dialog_title_${messageDetails.type}`">
        <i :class="`el-icon-${messageDetails.type}`"></i>
        <span> 温馨提示</span>
      </span>
      <div class="dialog_content">{{ messageDetails.message }}</div>
      <span slot="footer">
        <el-button type="primary" @click="messageDetails.visible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { normalMeterData } from "../virtualData.js";
import { Message } from "element-ui";

import { mapState, mapActions, useStore } from "pinia";
import useDeviceStore from "../../../store/index.js";

const store = useDeviceStore();

export default {
  data() {
    return {
      //按钮加载
      buttonLoad: {
        start: false,
        pause: false,
        stop: false,
      },
      //提示框
      messageDetails: {
        visible: false,
        type: "warning",
        message: "请重试！",
      },
      //定时器
      interval: null,
      //每页能显示18行
      initData: [],
      showData: [],
      tableLoad: false,
      total: 1,
      currentPage: 1,
    };
  },
  computed: {
    pages() {
      return Math.ceil(this.total / 18);
    },
    deviceStatus() {
      return store.status;
    },
  },
  watch: {
    deviceStatus(newValue, oldValue) {
      // console.log("变化了", newValue, oldValue);
      this.$emit("statusChange", true);
    },
    currentPage(newValue, oldValue) {
      this.tableLoad = true;
      this.showData = this.initData.slice(
        18 * (newValue - 1),
        18 * (newValue - 1) + 18
      );
      this.showData.map((item) => {
        item.itemNameValues = Object.prototype.hasOwnProperty.call(
          item,
          "itemName"
        )
          ? item.itemName.split("|")
          : [];
        item["1_Values"] = Object.prototype.hasOwnProperty.call(item, "1")
          ? item["1"].split("|")
          : [];
      });
      this.tableLoad = false;
    },
  },
  mounted() {
    this.init();
    this.interval = setInterval(() => {
      this.init();
    }, 10000);
  },
  methods: {
    //初始化
    init() {
      this.tableLoad = true;
      //过程监测
      this.$request(
        "post",
        "/bigScreen/processMonitor",
        {
          equipNo: this.$route.query.equipNo,
          taskNo: this.$route.query.taskNo,
          equipType: this.$route.query.equipType,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          // console.log(res);
          this.initData = res.data;
          this.total = this.initData.length;
          if (this.currentPage !== 1) {
            this.showData = this.initData.slice(
              18 * (this.currentPage - 1),
              18 * (this.currentPage - 1) + 18
            );
          } else {
            this.showData = this.initData.slice(0, 18);
          }
        })
        .finally(() => {
          this.showData.map((item) => {
            item.itemNameValues = Object.prototype.hasOwnProperty.call(
              item,
              "itemName"
            )
              ? item.itemName.split("|")
              : [];
            item["1_Values"] = Object.prototype.hasOwnProperty.call(item, "1")
              ? item["1"].split("|")
              : [];
          });
          // console.log("this.showData", this.showData);
          this.tableLoad = false;
        });
    },
    //新切换功能
    changeStatus(bt) {
      // console.log("status", this.deviceStatus);
      for (const key in this.buttonLoad) {
        if (this.buttonLoad[key]) {
          this.tipDialog("有功能正在执行，请稍后再试！", "warning");
          return;
        }
      }
      this.buttonLoad[bt] = true;
      const statusHeaders = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      if (bt == "stop") {
        if (this.deviceStatus == "空闲") {
          this.tipDialog("当前正处于此状态！", "warning");
          this.buttonLoad[bt] = false;
          return;
        }
        if (this.deviceStatus == "运行") {
          this.$requestSys(
            "post",
            "/meterInfo/equipStateControl",
            {
              equipNo: this.$route.query.equipNo,
              checkState: 2,
            },
            statusHeaders
          )
            .then((res) => {
              if (res.code == 0) {
                this.tipDialog("停止成功！", "success");
                this.$emit("statusChange", true);
                this.init();
              } else {
                this.tipDialog("停止失败！", "error");
              }
            })
            .catch(() => {
              this.tipDialog("停止失败！", "error");
            })
            .finally(() => {
              this.buttonLoad[bt] = false;
              return;
            });
        }
      }
      if (bt == "pause") {
        if (this.deviceStatus == "空闲") {
          this.tipDialog("请先点击启动！", "warning");
          this.buttonLoad[bt] = false;
          return;
        }
        if (this.deviceStatus == "运行") {
          this.$requestSys(
            "post",
            "/meterInfo/equipStateControl",
            {
              equipNo: this.$route.query.equipNo,
              checkState: 1,
            },
            statusHeaders
          )
            .then((res) => {
              if (res.code == 0) {
                this.tipDialog("暂停成功！", "success");
                this.$emit("statusChange", true);
                this.init();
              } else {
                this.tipDialog("暂停失败！", "error");
              }
            })
            .catch(() => {
              this.tipDialog("暂停失败！", "error");
            })
            .finally(() => {
              this.buttonLoad[bt] = false;
              return;
            });
        }
      }
      if (bt == "start") {
        if (this.deviceStatus == "空闲") {
          this.$requestSys(
            "post",
            "/meterInfo/equipStateControl",
            {
              equipNo: this.$route.query.equipNo,
              checkState: 0,
            },
            statusHeaders
          )
            .then((res) => {
              if (res.code == 0) {
                this.tipDialog("启动成功！", "success");
                this.$emit("statusChange", true);
                this.init();
              } else {
                this.tipDialog("启动失败！", "error");
              }
            })
            .catch(() => {
              this.tipDialog("启动失败！", "error");
            })
            .finally(() => {
              this.buttonLoad[bt] = false;
              return;
            });
        }
        if (this.deviceStatus == "运行") {
          this.tipDialog("当前正处于此状态！", "warning");
          this.buttonLoad[bt] = false;
          return;
        }
      }
    },
    //调提示框的方法
    tipDialog(_message, _type) {
      this.messageDetails = {
        visible: true,
        message: _message,
        type: _type,
      };
    },
    //返回上一级
    goBack() {
      this.$router.go(-1);
    },
    //去首页
    toFirstPage() {
      this.currentPage = this.currentPage = 1;
    },
    //去末页
    toLastPage() {
      this.currentPage = this.pages;
    },
    //页码变化
    handleCurrentChange(val) {
      this.currentPage = val;
    },
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
};
</script>
<style scoped>
.page {
  /* border: 1px solid red; */
  height: 77rem;
  padding: 1rem 2rem;
}

.el-dialog__wrapper /deep/ .el-dialog {
  background-color: rgba(136, 178, 255, 0.3);
  box-shadow: inset 0 0 10px rgba(76, 134, 243, 1);
  border-radius: 10px;
}

.dialog_title_success {
  font-size: 2rem;
  color: #67c23a;
}

.dialog_title_warning {
  font-size: 2rem;
  color: #e6a23c;
}

.dialog_title_error {
  font-size: 2rem;
  color: #f56c6c;
}

.dialog_content {
  text-align: center;
  font-size: 3rem;
  color: #fff;
}

.title {
  margin-top: 1rem;
  background-image: url("../../../assets/img/process_watch.png");
  background-size: 100% 100%;
  height: 3.5rem;
  display: flex;
  justify-content: flex-end;
}

.title-botton {
  position: relative;
  width: 10rem;
  cursor: pointer;
}

.start {
  background-image: url("../../../assets/img/start_default.png");
  background-size: 100% 100%;
  height: 4rem;
  margin-top: -1rem;
}

.start:active {
  background-image: url("../../../assets/img/start_click.png");
  background-size: 100% 100%;
  height: 6rem;
  margin-top: -3rem;
}

.pause {
  background-image: url("../../../assets/img/pause_default.png");
  background-size: 100% 100%;
  height: 4rem;
  margin-top: -1rem;
}

.pause:active {
  background-image: url("../../../assets/img/pause_click.png");
  background-size: 100% 100%;
  height: 6rem;
  margin-top: -3rem;
}

.stop {
  background-image: url("../../../assets/img/stop_default.png");
  background-size: 100% 100%;
  height: 4rem;
  margin-top: -1rem;
}

.stop:active {
  background-image: url("../../../assets/img/stop_click.png");
  background-size: 100% 100%;
  height: 6rem;
  margin-top: -3rem;
}

.content {
  height: 66.4rem;
  padding: 2rem 0;
  /* border: 1px solid red; */
}

.content-table {
  background-color: rgba(0, 68, 255, 0.12);
  color: #fff;
  width: 100%;
}

tr,
th,
td {
  border: 1px solid #77c1f3;
  text-align: center;
  font-size: 1rem;
  font-weight: bold;
}

thead tr th {
  height: 2.8rem;
  font-size: 1.2rem;
}

thead> :nth-child(2)>* {
  color: #ffe117;
}

thead> :nth-child(3)>* {
  width: 7rem !important;
}

thead> :nth-child(3)> :first-child {
  /* width: 14rem !important; */
}

thead> :nth-child(4)>* {
  width: 7rem !important;
}

tbody tr {
  height: 3rem;
}

tbody td {
  width: 7rem;
}

tbody tr:hover {
  /* 边框颜色向内发散 */
  box-shadow: inset 0 0 15px #00f7ff;
}

.content-table .project {
  font-size: 0.9rem;
  color: #26f0f7;
  /* text-shadow: 2px 2px 5px #6fa3ef, -2px -2px 5px #6fa3ef, 0 0 10px #6fa3ef; */
}

.content-table td {
  color: #acacac;
}

tbody .unqualified {
  box-shadow: inset 0 0 12px #df1e1e;
  color: #a34040;
}

.footer {
  height: 4.4rem;
  padding: 2rem 0 2rem 0;
  /* border: 1px solid red; */
  display: flex;
  align-items: center;
  justify-content: flex-end;
  justify-content: space-between;
}

.footer>* {
  margin-right: 0.5rem;
}

.footer> :first-child {
  margin-right: auto;
  margin-left: 0.5rem;
}

.footer .back-page {
  background-image: url("../../../assets/img/back_default.png");
  background-size: 100% 100%;
  width: 10rem;
  height: 3rem;
  background-color: transparent;
  border: none;
}

.footer .back-page:active {
  background-image: url("../../../assets/img/back_click.png");
}

.footer .page-button {
  background-image: url("../../../assets/img/page_button_default.png");
  background-size: 100% 100%;
  width: 9rem;
  height: 3rem;
  background-color: transparent;
  border: none;
  color: #fff;
  font-size: 1.35rem;
}

.footer .page-button:active {
  background-image: url("../../../assets/img/page_button_click.png");
}

.footer .first-end-page-button {
  background-image: url("../../../assets/img/first_end_page_default.png");
  background-size: 100% 100%;
  width: 6rem;
  height: 5rem;
  background-color: transparent;
  border: none;
  color: #72edf1;
  font-size: 1.35rem;
}

.footer .first-end-page-button:active {
  background-image: url("../../../assets/img/first_end_page_click.png");
}

.page-list /deep/ ul {
  /* width: 2.5rem; */
  display: flex;
  align-items: center;
  justify-content: center;
}

.page-list /deep/ li {
  background-color: transparent;
  min-width: auto;
  width: 2.5rem;
  height: 2.5rem;
  color: #fff;
  font-size: 1rem;
  margin-left: 0.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.page-list /deep/ li.active {
  background-color: transparent;

  border-radius: 0.4rem;
  border: 1px solid #0095f8;
  box-shadow: inset 0 0 10px #47aef3;
}
</style>
