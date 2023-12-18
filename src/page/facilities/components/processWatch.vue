<template>
  <div class="page">
    <el-row>
      <el-col class="title" :span="24">
        <div class="title-botton" @click="toggleStatus('start')">
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
        </div>
      </el-col>
      <el-col class="content" :span="24">
        <table class="content-table">
          <!-- 表头 -->
          <thead>
            <tr>
              <th rowspan="2" style="width: 10.5rem">检定项目</th>
              <th>表1</th>
              <th>表2</th>
              <th>表3</th>
              <th>表4</th>
              <th>表5</th>
              <th>表6</th>
              <th>表7</th>
              <th>表8</th>
              <th>表9</th>
              <th>表10</th>
              <th>表11</th>
              <th>表12</th>
              <th>表13</th>
              <th>表14</th>
              <th>表15</th>
              <th>表16</th>
            </tr>
            <tr>
              <th>123456</th>
              <th>123456</th>
              <th>123456</th>
              <th>123456</th>
              <th>123456</th>
              <th>123456</th>
              <th>123456</th>
              <th>123456</th>
              <th>123456</th>
              <th>123456</th>
              <th>123456</th>
              <th>123456</th>
              <th>123456</th>
              <th>123456</th>
              <th>123456</th>
              <th>123456</th>
            </tr>
          </thead>

          <!-- 表格体，使用 v-for 渲染数据 -->
          <tbody>
            <tr v-for="(item, index) in tableData" :key="index">
              <td class="project">{{ item.project }}</td>
              <td :class="item.epitope1 == '不合格' ? 'unqualified' : ''">
                {{ item.epitope1 }}
              </td>
              <td :class="item.epitope2 == '不合格' ? 'unqualified' : ''">
                {{ item.epitope2 }}
              </td>
              <td :class="item.epitope3 == '不合格' ? 'unqualified' : ''">
                {{ item.epitope3 }}
              </td>
              <td :class="item.epitope4 == '不合格' ? 'unqualified' : ''">
                {{ item.epitope4 }}
              </td>
              <td :class="item.epitope5 == '不合格' ? 'unqualified' : ''">
                {{ item.epitope5 }}
              </td>
              <td :class="item.epitope6 == '不合格' ? 'unqualified' : ''">
                {{ item.epitope6 }}
              </td>
              <td :class="item.epitope7 == '不合格' ? 'unqualified' : ''">
                {{ item.epitope7 }}
              </td>
              <td :class="item.epitope8 == '不合格' ? 'unqualified' : ''">
                {{ item.epitope8 }}
              </td>
              <td :class="item.epitope9 == '不合格' ? 'unqualified' : ''">
                {{ item.epitope9 }}
              </td>
              <td :class="item.epitope10 == '不合格' ? 'unqualified' : ''">
                {{ item.epitope10 }}
              </td>
              <td :class="item.epitope11 == '不合格' ? 'unqualified' : ''">
                {{ item.epitope11 }}
              </td>
              <td :class="item.epitope12 == '不合格' ? 'unqualified' : ''">
                {{ item.epitope12 }}
              </td>
              <td :class="item.epitope13 == '不合格' ? 'unqualified' : ''">
                {{ item.epitope13 }}
              </td>
              <td :class="item.epitope14 == '不合格' ? 'unqualified' : ''">
                {{ item.epitope14 }}
              </td>
              <td :class="item.epitope15 == '不合格' ? 'unqualified' : ''">
                {{ item.epitope15 }}
              </td>
              <td :class="item.epitope16 == '不合格' ? 'unqualified' : ''">
                {{ item.epitope16 }}
              </td>
            </tr>
          </tbody>
        </table>
      </el-col>
      <el-col class="pagination" :span="24">
        <button class="first-end-page-button" @click="toFirstPage()">
          首页
        </button>
        <button
          class="page-button"
          @click="() => (this.currentPage > 1 ? this.currentPage-- : '')"
        >
          上一页
        </button>

        <el-pagination
          class="page-list"
          :page-size="20"
          layout="pager"
          :current-page="this.currentPage"
          :total="total"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
        <!-- <div
          class="page-list"
          v-for="(item, index) in pages"
          :key="index"
          :style="{
            border: item === currentPage ? '1px solid #0095f8' : '',
            boxShadow: item === currentPage ? 'inset 0 0 10px #47aef3' : '',
          }"
        >
          {{ item }}
        </div> -->
        <button
          class="page-button"
          @click="
            () => (this.currentPage < this.pages ? this.currentPage++ : '')
          "
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
export default {
  props: ["envList"],
  data() {
    return {
      buttonMun: {
        start: false,
        step: false,
        pause: false,
        stop: true,
      },
      //每页能显示20行
      tableData: [
        {
          project: "通信测试",
          epitope1: "+0.172",
          epitope2: "+0.172",
          epitope3: "+0.172",
          epitope4: "+0.172",
          epitope5: "+0.172",
          epitope6: "+0.172",
          epitope7: "+0.172",
          epitope8: "+0.172",
          epitope9: "+0.172",
          epitope10: "+0.172",
          epitope11: "+0.172",
          epitope12: "不合格",
          epitope13: "+0.172",
          epitope14: "+0.172",
          epitope15: "+0.172",
          epitope16: "+0.172",
        },
        {
          project: "正向有功接线调试",
          epitope1: "+0.172",
          epitope2: "+0.172",
          epitope3: "+0.172",
          epitope4: "+0.172",
          epitope5: "+0.172",
          epitope6: "+0.172",
          epitope7: "+0.172",
          epitope8: "+0.172",
          epitope9: "+0.172",
          epitope10: "+0.172",
          epitope11: "+0.172",
          epitope12: "+0.172",
          epitope13: "+0.172",
          epitope14: "+0.172",
          epitope15: "+0.172",
          epitope16: "+0.172",
        },
        {
          project: "正向有功接线调试",
          epitope1: "+0.172",
          epitope2: "+0.172",
          epitope3: "+0.172",
          epitope4: "+0.172",
          epitope5: "+0.172",
          epitope6: "+0.172",
          epitope7: "+0.172",
          epitope8: "+0.172",
          epitope9: "+0.172",
          epitope10: "+0.172",
          epitope11: "+0.172",
          epitope12: "+0.172",
          epitope13: "+0.172",
          epitope14: "+0.172",
          epitope15: "+0.172",
          epitope16: "+0.172",
        },
        {
          project: "正向有功接线调试",
          epitope1: "+0.172",
          epitope2: "+0.172",
          epitope3: "+0.172",
          epitope4: "+0.172",
          epitope5: "+0.172",
          epitope6: "+0.172",
          epitope7: "+0.172",
          epitope8: "+0.172",
          epitope9: "+0.172",
          epitope10: "+0.172",
          epitope11: "+0.172",
          epitope12: "+0.172",
          epitope13: "+0.172",
          epitope14: "+0.172",
          epitope15: "+0.172",
          epitope16: "+0.172",
        },
        {
          project: "正向有功接线调试",
          epitope1: "+0.172",
          epitope2: "+0.172",
          epitope3: "+0.172",
          epitope4: "+0.172",
          epitope5: "+0.172",
          epitope6: "+0.172",
          epitope7: "+0.172",
          epitope8: "+0.172",
          epitope9: "+0.172",
          epitope10: "+0.172",
          epitope11: "+0.172",
          epitope12: "+0.172",
          epitope13: "+0.172",
          epitope14: "+0.172",
          epitope15: "+0.172",
          epitope16: "+0.172",
        },
        {
          project: "正向有功接线调试",
          epitope1: "+0.172",
          epitope2: "+0.172",
          epitope3: "+0.172",
          epitope4: "+0.172",
          epitope5: "+0.172",
          epitope6: "+0.172",
          epitope7: "+0.172",
          epitope8: "+0.172",
          epitope9: "+0.172",
          epitope10: "+0.172",
          epitope11: "+0.172",
          epitope12: "+0.172",
          epitope13: "+0.172",
          epitope14: "+0.172",
          epitope15: "+0.172",
          epitope16: "+0.172",
        },
        {
          project: "正向有功接线调试",
          epitope1: "+0.172",
          epitope2: "+0.172",
          epitope3: "+0.172",
          epitope4: "+0.172",
          epitope5: "+0.172",
          epitope6: "+0.172",
          epitope7: "+0.172",
          epitope8: "+0.172",
          epitope9: "+0.172",
          epitope10: "+0.172",
          epitope11: "+0.172",
          epitope12: "+0.172",
          epitope13: "+0.172",
          epitope14: "+0.172",
          epitope15: "+0.172",
          epitope16: "+0.172",
        },
        {
          project: "正向有功接线调试",
          epitope1: "+0.172",
          epitope2: "+0.172",
          epitope3: "+0.172",
          epitope4: "+0.172",
          epitope5: "+0.172",
          epitope6: "+0.172",
          epitope7: "+0.172",
          epitope8: "+0.172",
          epitope9: "+0.172",
          epitope10: "+0.172",
          epitope11: "+0.172",
          epitope12: "+0.172",
          epitope13: "+0.172",
          epitope14: "+0.172",
          epitope15: "+0.172",
          epitope16: "+0.172",
        },
        {
          project: "正向有功接线调试",
          epitope1: "+0.172",
          epitope2: "+0.172",
          epitope3: "+0.172",
          epitope4: "+0.172",
          epitope5: "+0.172",
          epitope6: "+0.172",
          epitope7: "+0.172",
          epitope8: "+0.172",
          epitope9: "+0.172",
          epitope10: "+0.172",
          epitope11: "+0.172",
          epitope12: "+0.172",
          epitope13: "+0.172",
          epitope14: "+0.172",
          epitope15: "+0.172",
          epitope16: "+0.172",
        },
        {
          project: "正向有功接线调试",
          epitope1: "+0.172",
          epitope2: "+0.172",
          epitope3: "+0.172",
          epitope4: "+0.172",
          epitope5: "+0.172",
          epitope6: "+0.172",
          epitope7: "+0.172",
          epitope8: "+0.172",
          epitope9: "+0.172",
          epitope10: "+0.172",
          epitope11: "+0.172",
          epitope12: "+0.172",
          epitope13: "+0.172",
          epitope14: "+0.172",
          epitope15: "+0.172",
          epitope16: "+0.172",
        },
        {
          project: "正向有功接线调试",
          epitope1: "+0.172",
          epitope2: "+0.172",
          epitope3: "+0.172",
          epitope4: "+0.172",
          epitope5: "+0.172",
          epitope6: "+0.172",
          epitope7: "+0.172",
          epitope8: "+0.172",
          epitope9: "+0.172",
          epitope10: "+0.172",
          epitope11: "+0.172",
          epitope12: "+0.172",
          epitope13: "+0.172",
          epitope14: "+0.172",
          epitope15: "+0.172",
          epitope16: "+0.172",
        },
        {
          project: "正向有功接线调试",
          epitope1: "+0.172",
          epitope2: "+0.172",
          epitope3: "+0.172",
          epitope4: "+0.172",
          epitope5: "+0.172",
          epitope6: "+0.172",
          epitope7: "+0.172",
          epitope8: "+0.172",
          epitope9: "+0.172",
          epitope10: "+0.172",
          epitope11: "+0.172",
          epitope12: "+0.172",
          epitope13: "+0.172",
          epitope14: "+0.172",
          epitope15: "+0.172",
          epitope16: "+0.172",
        },
        {
          project: "正向有功接线调试",
          epitope1: "+0.172",
          epitope2: "+0.172",
          epitope3: "+0.172",
          epitope4: "+0.172",
          epitope5: "+0.172",
          epitope6: "+0.172",
          epitope7: "+0.172",
          epitope8: "+0.172",
          epitope9: "+0.172",
          epitope10: "+0.172",
          epitope11: "+0.172",
          epitope12: "+0.172",
          epitope13: "+0.172",
          epitope14: "+0.172",
          epitope15: "+0.172",
          epitope16: "+0.172",
        },
        {
          project: "正向有功接线调试",
          epitope1: "+0.172",
          epitope2: "+0.172",
          epitope3: "+0.172",
          epitope4: "+0.172",
          epitope5: "+0.172",
          epitope6: "+0.172",
          epitope7: "+0.172",
          epitope8: "+0.172",
          epitope9: "+0.172",
          epitope10: "+0.172",
          epitope11: "+0.172",
          epitope12: "+0.172",
          epitope13: "+0.172",
          epitope14: "+0.172",
          epitope15: "+0.172",
          epitope16: "+0.172",
        },
        {
          project: "正向有功接线调试",
          epitope1: "+0.172",
          epitope2: "+0.172",
          epitope3: "+0.172",
          epitope4: "+0.172",
          epitope5: "+0.172",
          epitope6: "+0.172",
          epitope7: "+0.172",
          epitope8: "+0.172",
          epitope9: "+0.172",
          epitope10: "+0.172",
          epitope11: "+0.172",
          epitope12: "+0.172",
          epitope13: "+0.172",
          epitope14: "+0.172",
          epitope15: "+0.172",
          epitope16: "+0.172",
        },
        {
          project: "正向有功接线调试",
          epitope1: "+0.172",
          epitope2: "+0.172",
          epitope3: "+0.172",
          epitope4: "+0.172",
          epitope5: "+0.172",
          epitope6: "+0.172",
          epitope7: "+0.172",
          epitope8: "+0.172",
          epitope9: "+0.172",
          epitope10: "+0.172",
          epitope11: "+0.172",
          epitope12: "+0.172",
          epitope13: "+0.172",
          epitope14: "+0.172",
          epitope15: "+0.172",
          epitope16: "+0.172",
        },
        {
          project: "正向有功接线调试",
          epitope1: "+0.172",
          epitope2: "+0.172",
          epitope3: "+0.172",
          epitope4: "+0.172",
          epitope5: "+0.172",
          epitope6: "+0.172",
          epitope7: "+0.172",
          epitope8: "+0.172",
          epitope9: "+0.172",
          epitope10: "+0.172",
          epitope11: "+0.172",
          epitope12: "+0.172",
          epitope13: "+0.172",
          epitope14: "+0.172",
          epitope15: "+0.172",
          epitope16: "+0.172",
        },
        {
          project: "正向有功接线调试",
          epitope1: "+0.172",
          epitope2: "+0.172",
          epitope3: "+0.172",
          epitope4: "+0.172",
          epitope5: "+0.172",
          epitope6: "+0.172",
          epitope7: "+0.172",
          epitope8: "+0.172",
          epitope9: "+0.172",
          epitope10: "+0.172",
          epitope11: "+0.172",
          epitope12: "+0.172",
          epitope13: "+0.172",
          epitope14: "+0.172",
          epitope15: "+0.172",
          epitope16: "+0.172",
        },
        {
          project: "正向有功接线调试",
          epitope1: "+0.172",
          epitope2: "+0.172",
          epitope3: "+0.172",
          epitope4: "+0.172",
          epitope5: "+0.172",
          epitope6: "+0.172",
          epitope7: "+0.172",
          epitope8: "+0.172",
          epitope9: "+0.172",
          epitope10: "+0.172",
          epitope11: "+0.172",
          epitope12: "+0.172",
          epitope13: "+0.172",
          epitope14: "+0.172",
          epitope15: "+0.172",
          epitope16: "+0.172",
        },
        {
          project: "正向有功接线调试",
          epitope1: "+0.172",
          epitope2: "+0.172",
          epitope3: "+0.172",
          epitope4: "+0.172",
          epitope5: "+0.172",
          epitope6: "+0.172",
          epitope7: "+0.172",
          epitope8: "+0.172",
          epitope9: "+0.172",
          epitope10: "+0.172",
          epitope11: "+0.172",
          epitope12: "+0.172",
          epitope13: "+0.172",
          epitope14: "+0.172",
          epitope15: "+0.172",
          epitope16: "+0.172",
        },
      ],
      total: 20001,
      // pages: Math.ceil(1601 / 20),
      currentPage: 1,
    };
  },
  computed: {
    pages() {
      return Math.ceil(this.total / 20);
    },
  },
  watch: {
    currentPage(newValue, oldValue) {
      // console.log(newValue, oldValue);
    },
  },
  mounted() {},
  methods: {
    toggleStatus(bt) {
      console.log(bt);
      for (const key in this.buttonMun) {
        this.buttonMun[key] = key == bt ? true : false;
      }
    },
    toFirstPage() {
      this.currentPage = this.currentPage = 1;
    },
    toLastPage() {
      this.currentPage = this.pages;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
  },
};
</script>
<style scoped>
.page {
  /* height: 74.9rem; */
  /* background-image: url("../../../assets/img/frame_14.png"); */
  /* background-size: 100% 100%; */
  /* border: 1px solid red; */
  border: 1px solid red;
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

.title span {
  padding: 0.7rem 0 0rem 4rem !important;
  margin-left: 2rem !important;
  font-size: 1.72rem;
  text-shadow: 0px 3px 0px rgba(0, 9, 17, 0.52);
  color: #fff;
  /* padding: 0 0 1rem 4rem; */
  font-family: "YS";
  letter-spacing: 0.15rem;
  line-height: 2.58rem;
}

.button-top {
  height: 2.5rem;
  width: 7rem;
  margin: 0 0.5rem;
  font-size: 1.1rem;
  color: white;
  font-weight: 800;
  text-decoration: none;
  background-color: transparent;
  border-radius: 5px;
  border: 1px solid #81baf3;
  box-shadow: 0 12px 16px 0 rgba(52, 138, 236, 0.24),
    0 17px 50px 0 rgba(45, 154, 226, 0.19);
}

.button-top:active {
  /* 点击时效果 */
  border: 2px solid #306daa;
  background-color: #0b6e73;
  transform: translateY(1px);
}

.button-top:hover {
  /* 鼠标悬浮效果 */
  /* border: 2px solid #306daa;
  background-color: #0b6e73; */
}

.el-radio__input {
}

.content-left {
  height: 67rem;
  background-image: url("../../../assets/img/frame_15.png");
  background-size: 100% 100%;
  padding: 2rem 2rem;
  margin-left: 2rem;
  display: flex;
  justify-content: center;
}

.content-left .button {
  height: 3rem;
  width: 10rem;
  font-size: 1.1rem;
  color: white;
  font-weight: 800;
  text-decoration: none;
  background-color: #378add;
  border-radius: 5px;
  border: 1px solid #57a2ee;
  box-shadow: 0 12px 16px 0 rgba(52, 138, 236, 0.24),
    0 17px 50px 0 rgba(45, 154, 226, 0.19);
}

.content-left .button:active {
  /* 点击时效果 */
  border: 2px solid #306daa;
  background-color: #306daa;
  transform: translateY(1px);
}

.content {
  height: 66rem;
  padding: 2rem 0;
  border: 1px solid red;
}

/* 单元格设置 */
.el-table /deep/ th,
.el-table /deep/ tr,
.el-table /deep/ td {
  background-color: transparent;
  font-size: 0.9rem;
  border: 1px solid rgb(99, 148, 240);
  color: #d6bd56;
  font-weight: bolder;
}

::v-deep .el-table th.gutter {
  display: none;
}

/* 表头设置 */
.el-table /deep/ th {
  font-weight: bolder !important;
  color: #fff;
}

/*去掉表格边框*/
.el-table,
.el-table__expanded-cell {
  background-color: transparent;
  border: none;
}

.table::before {
  width: 0;
}

.table::after {
  width: 0;
}

/* 鼠标移入行样式 */
.table /deep/ tr:hover > td {
  background-color: #ec0c0c4a !important;
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

tbody tr {
  height: 3rem;
}

/* 设置鼠标悬停时行的背景颜色 */
tbody tr:hover {
  /* background-color: #f2f2f2; */
  /* border: 2px solid red; */
  /* background-image: url('../../../assets/img/frame_3.png'); */
  /* background-size: 100% 100%; */
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

.pagination {
  height: 4.5rem;
  padding: 2rem 0 2rem 0;
  border: 1px solid red;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.pagination > * {
  margin-right: 1rem;
}

.pagination .page-button {
  background-image: url("../../../assets/img/page_button_default.png");
  background-size: 100% 100%;
  width: 9rem;
  height: 3rem;
  background-color: transparent;
  border: none;
  color: #fff;
  font-size: 1.35rem;
}

.pagination .page-button:active {
  background-image: url("../../../assets/img/page_button_click.png");
}

.pagination .first-end-page-button {
  background-image: url("../../../assets/img/first_end_page_default.png");
  background-size: 100% 100%;
  width: 6rem;
  height: 5rem;
  background-color: transparent;
  border: none;
  color: #72edf1;
  font-size: 1.35rem;
}

.pagination .first-end-page-button:active {
  background-image: url("../../../assets/img/first_end_page_click.png");
}
/* .pagination .page-list {
  font-size: 1.35rem;
  color: #fff;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
} */

/* .page-list {
  background-color: transparent !important;
  max-width: 30rem;
} */

.page-list > * {
}
.page-list /deep/ ul > * {
  /* width: 2.5rem; */
}
.page-list /deep/ li {
  background-color: transparent !important;
  /* width: 2.5rem; */
  height: 2.5rem;
  color: #fff;
  font-size: 1rem !important;
  margin-left: 0.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.page-list /deep/ li.active {
  background-color: transparent !important;

  border-radius: 0.4rem;
  border: 1px solid #0095f8;
  box-shadow: inset 0 0 10px #47aef3;
}
</style>
