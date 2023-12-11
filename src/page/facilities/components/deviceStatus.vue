<template>
  <div class="page">
    <p class="title">设备状态</p>
    <el-row>
      <el-col :span="24">
        <div style="float: right; padding: 0 2rem">
          <button v-for="(item, index) in buttonMun" class="button-top"
            :style="{ backgroundColor: status == index + 1 ? '#0b6e73' : '' }" @click="toggleStatus(index + 1)">
            {{ item }}
          </button>
        </div>
      </el-col>
      <el-col :span="4">
        <div class="content-left">
          <button class="button">基本误差试验</button>
        </div>
      </el-col>
      <el-col :span="20">
        <div class="content-right">
          <el-table class="table" :data="tableData" border height="65rem" style="width: 100%">
            <el-table-column label="序号" min-width="15%">
              <template slot-scope="scope">
                <span style="color: #fff">
                  {{ scope.$index + 1 }}
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="epitope1" label="01表位" min-width="20%">
            </el-table-column>
            <el-table-column prop="epitope2" label="02表位" min-width="20%">
            </el-table-column>
            <el-table-column prop="epitope3" label="03表位" min-width="20%">
            </el-table-column>
            <el-table-column prop="epitope4" label="04表位" min-width="20%">
            </el-table-column>
            <el-table-column prop="epitope5" label="05表位" min-width="20%">
            </el-table-column>
            <el-table-column prop="epitope6" label="06表位" min-width="20%">
            </el-table-column>
            <el-table-column prop="epitope7" label="07表位" min-width="20%">
            </el-table-column>
            <el-table-column prop="epitope8" label="08表位" min-width="20%">
            </el-table-column>
            <el-table-column prop="epitope9" label="09表位" min-width="20%">
            </el-table-column>
            <el-table-column prop="epitope10" label="10表位" min-width="20%">
            </el-table-column>
            <el-table-column prop="epitope11" label="11表位" min-width="20%">
            </el-table-column>
            <el-table-column prop="epitope12" label="12表位" min-width="20%">
            </el-table-column>
            <el-table-column prop="epitope13" label="13表位" min-width="20%">
            </el-table-column>
            <el-table-column prop="epitope14" label="14表位" min-width="20%">
            </el-table-column>
            <el-table-column prop="epitope15" label="15表位" min-width="20%">
            </el-table-column>
            <el-table-column prop="epitope16" label="16表位" min-width="20%">
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  props: ["envList"],
  data() {
    return {
      status: 3,
      buttonMun: ["启动", "暂停", "停止"],
      tableData: [
        {
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
        }, {
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
        }
      ],
    };
  },
  mounted() { },
  methods: {
    toggleStatus(status) {
      this.status = status;
    },
  },
};
</script>
<style scoped>
.page {
  height: 74.9rem;
  background-image: url("../../../assets/img/frame_14.png");
  background-size: 100% 100%;
  /* border: 1px solid red; */
}

.title {
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

.el-radio__input {}

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

.content-right {
  height: 67rem;
  padding: 1rem 2rem 0 0;
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
  color: #21e1ea;
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
.table /deep/ tr:hover>td {
  background-color: #b5bbe64a !important;
}
</style>
