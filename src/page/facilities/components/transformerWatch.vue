<template>
  <div class="page">
    <el-row>
      <el-col class="title" :span="24">
        <!-- <div class="title-botton" @click="toggleStatus('start')">
          <img
            v-show="buttonMun.start"
            src="../../../assets/img/start_click.png"
          />
          <img
            class="default"
            v-show="!buttonMun.start"
            src="../../../assets/img/start_default.png"
          />
        </div>
        <div class="title-botton" @click="toggleStatus('step')">
          <img
            v-show="buttonMun.step"
            src="../../../assets/img/step_click.png"
          />
          <img
            class="default"
            v-show="!buttonMun.step"
            src="../../../assets/img/step_default.png"
          />
        </div>
        <div class="title-botton" @click="toggleStatus('pause')">
          <img
            v-show="buttonMun.pause"
            src="../../../assets/img/pause_click.png"
          />
          <img
            class="default"
            v-show="!buttonMun.pause"
            src="../../../assets/img/pause_default.png"
          />
        </div>
        <div class="title-botton" @click="toggleStatus('stop')">
          <img
            v-show="buttonMun.stop"
            src="../../../assets/img/stop_click.png"
          />
          <img
            class="default"
            v-show="!buttonMun.stop"
            src="../../../assets/img/stop_default.png"
          />
        </div> -->
      </el-col>
      <el-col class="content" :span="24">
        <table class="content-table">
          <!-- 表头 -->
          <thead>
            <tr>
              <th rowspan="3">检定项目</th>
              <th colspan="2" v-for="(item, index) in listTitles" :key="index">
                表{{ index + 1 }}
              </th>
              <!-- <th colspan="2">表2</th>
              <th colspan="2">表3</th>
              <th colspan="2">表4</th>
              <th colspan="2">表5</th>
              <th colspan="2">表6</th> -->
            </tr>
            <tr>
              <th colspan="2" v-for="(item, index) in listTitles" :key="index">
                {{ item }}
              </th>
              <!-- <th colspan="2">000002</th>
              <th colspan="2">000003</th>
              <th colspan="2">000004</th>
              <th colspan="2">000005</th>
              <th colspan="2">000006</th> -->
            </tr>
            <tr>
              <th v-for="(item, index) in listTitles.length * 2" :key="index">
                {{ index % 2 == 0 ? "比角" : "角差" }}
              </th>
              <!-- <th>比角</th>
              <th>角差</th>
              <th>比角</th>
              <th>角差</th>
              <th>比角</th>
              <th>角差</th>
              <th>比角</th>
              <th>角差</th>
              <th>比角</th>
              <th>角差</th>
              <th>比角</th>
              <th>角差</th> -->
            </tr>
          </thead>
          <!-- 表格体，使用 v-for 渲染数据 -->
          <tbody v-loading="tableLoad">
            <tr v-for="(item, index) in showData" :key="index">
              <td class="project">{{ item.itemName }}</td>
              <td :class="item['1b'] == '不合格' ? 'unqualified' : ''">
                {{ item["1b"] }}
              </td>
              <td :class="item['1j'] == '不合格' ? 'unqualified' : ''">
                {{ item["1j"] }}
              </td>
              <td :class="item['2b'] == '不合格' ? 'unqualified' : ''">
                {{ item["2b"] }}
              </td>
              <td :class="item['2j'] == '不合格' ? 'unqualified' : ''">
                {{ item["2j"] }}
              </td>
              <td :class="item['3b'] == '不合格' ? 'unqualified' : ''">
                {{ item["3b"] }}
              </td>
              <td :class="item['3j'] == '不合格' ? 'unqualified' : ''">
                {{ item["3j"] }}
              </td>
              <td :class="item['4b'] == '不合格' ? 'unqualified' : ''">
                {{ item["4b"] }}
              </td>
              <td :class="item['4j'] == '不合格' ? 'unqualified' : ''">
                {{ item["4j"] }}
              </td>
              <td :class="item['5b'] == '不合格' ? 'unqualified' : ''">
                {{ item["5b"] }}
              </td>
              <td :class="item['5j'] == '不合格' ? 'unqualified' : ''">
                {{ item["5j"] }}
              </td>
              <td :class="item['6b'] == '不合格' ? 'unqualified' : ''">
                {{ item["6b"] }}
              </td>
              <td :class="item['6j'] == '不合格' ? 'unqualified' : ''">
                {{ item["6j"] }}
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
        <button
          class="page-button"
          @click="() => (currentPage > 1 ? currentPage-- : '')"
        >
          上一页
        </button>

        <el-pagination
          class="page-list"
          :page-size="19"
          layout="pager"
          :current-page="currentPage"
          :total="total"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
        <button
          class="page-button"
          @click="() => (currentPage < pages ? currentPage++ : '')"
        >
          下一页
        </button>
        <button class="first-end-page-button" @click="toLastPage()">
          末页
        </button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { transformerData } from "../virtualData.js";

export default {
  data() {
    return {
      // buttonMun: {
      //   start: false,
      //   step: false,
      //   pause: false,
      //   stop: true,
      // },
      //表格表头列表
      listTitles: [
        "1_meterNo",
        "2_meterNo",
        "3_meterNo",
        "4_meterNo",
        "5_meterNo",
        "6_meterNo",
      ],
      //每页能显示19行
      initData: [],
      showData: [],
      tableLoad: false,
      total: 1001,
      currentPage: 1,
    };
  },
  computed: {
    pages() {
      return Math.ceil(this.total / 19);
    },
  },
  watch: {
    currentPage(newValue, oldValue) {
      console.log(newValue, oldValue);
      this.tableLoad = true;
      this.showData = this.initData.slice(
        19 * (newValue - 1),
        19 * (newValue - 1) + 19
      );
      this.tableLoad = false;
    },
  },
  mounted() {
    this.init();
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
        .then((res1) => {
          console.log("互感器过程监测", res1);
          const res = [
            {
              itemName: "基本误差|正向无功|ABC|0.5L|1.0Ib",
              itemId: "12",
              "1b": "-0.0211",
              "1j": "+0.0395",
              "1_meterNo": "00010223",
              "2b": "-0.0211",
              "2j": "+0.0395",
              "2_meterNo": "00010224",
              "3b": "-0.0211",
              "3j": "+0.0395",
              "3_meterNo": "00010225",
              "4b": "-0.0211",
              "4j": "+0.0395",
              "4_meterNo": "00010226",
              "5b": "-0.0211",
              "5j": "+0.0395",
              "5_meterNo": "00010227",
              "6b": "-0.0211",
              "6j": "+0.0395",
              "6_meterNo": "00010228",
            },
            {
              itemName: "基本误差1|正向无功|ABC|0.5L|1.0Ib",
              itemId: "12",
              "1b": "-0.0211",
              "1j": "+0.0395",
              "1_meterNo": "00010223",
              "2b": "-0.0211",
              "2j": "+0.0395",
              "2_meterNo": "00010224",
              "3b": "-0.0211",
              "3j": "+0.0395",
              "3_meterNo": "00010225",
              "4b": "-0.0211",
              "4j": "+0.0395",
              "4_meterNo": "00010226",
              "5b": "-0.0211",
              "5j": "+0.0395",
              "5_meterNo": "00010227",
              "6b": "-0.0211",
              "6j": "+0.0395",
              "6_meterNo": "00010228",
            },
            {
              itemName: "基本误差2|正向无功|ABC|0.5L|1.0Ib",
              itemId: "12",
              "1b": "-0.0211",
              "1j": "+0.0395",
              "1_meterNo": "00010223",
              "2b": "-0.0211",
              "2j": "+0.0395",
              "2_meterNo": "00010224",
              "3b": "-0.0211",
              "3j": "+0.0395",
              "3_meterNo": "00010225",
              "4b": "-0.0211",
              "4j": "+0.0395",
              "4_meterNo": "00010226",
              "5b": "-0.0211",
              "5j": "+0.0395",
              "5_meterNo": "00010227",
              "6b": "-0.0211",
              "6j": "+0.0395",
              "6_meterNo": "00010228",
            },
          ];
          this.initData = res;
          this.total = this.initData.length;
          this.showData = this.initData.slice(0, 19);
        })
        .finally(() => {
          this.tableLoad = false;
        });
      // this.initData = transformerData;
      // this.total = transformerData.length;
      // this.showData = this.initData.slice(0, 19);
      // this.tableLoad = false;
    },
    //切换功能
    // toggleStatus(bt) {
    //   // console.log(bt);
    //   for (const key in this.buttonMun) {
    //     this.buttonMun[key] = key == bt ? true : false;
    //   }
    // },
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
};
</script>
<style scoped>
.page {
  /* border: 1px solid red; */
  height: 77rem;
  padding: 1rem 2rem;
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

.title-botton img {
  position: absolute;
  width: 10rem;
  bottom: 0.65rem;
}

.title-botton .default {
  width: 9rem;
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

thead tr {
  height: 2rem;
}

thead > :first-child > :first-child {
  width: 16rem !important;
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

.footer > * {
  margin-right: 0.5rem;
}

.footer > :first-child {
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
