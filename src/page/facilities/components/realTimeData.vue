<template>
  <div class="unusual">
    <p class="title">实时数据</p>
    <div class="content">
      <div class="left" :style="{ width: realTimeList.equipType == '标准表' ? '20rem' : '15rem' }">
        <img class="icon" src="@/assets/img/realTimeData.png">
        <img class="triangle" src="@/assets/img/tag_4.png">
        <span>实时数据</span>
      </div>
      <ul v-if="realTimeList.equipType == '互感器'" class="right_1 list">
        <li>
          I<sub>1</sub>
          <span>{{ realTimeList.oneCurrent ? realTimeList.oneCurrent : "--" }}</span>
        </li>
        <li>
          Pn<span>{{ realTimeList.rating ? realTimeList.rating : "--" }}</span>
        </li>
        <li>
          cosφ<span>{{ realTimeList.powerFactor ? realTimeList.powerFactor : "--" }}</span>
        </li>
        <li>
          I<sub>2</sub>
          <span>{{ realTimeList.twoCurrent ? realTimeList.twoCurrent : "--" }}</span>
        </li>
        <li>
          Q&nbsp;
          <span>{{ realTimeList.lightLoad ? realTimeList.lightLoad : "--" }}</span>
        </li>
        <li>
          φ&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span>{{ realTimeList.phase ? realTimeList.phase : "--" }}</span>
        </li>
      </ul>
      <ul v-else class="right_2 list">
        <li>
          Ua<span>{{ realTimeList.Ua ? realTimeList.Ua : "--" }}</span>
        </li>
        <li>
          Ia<span>{{ realTimeList.La ? realTimeList.La : "--" }}</span>
        </li>
        <li>
          φa<span>{{ realTimeList.phia ? realTimeList.phia : "--" }}</span>
        </li>
        <li>
          Ub<span>{{ realTimeList.Ub ? realTimeList.Ub : "--" }}</span>
        </li>
        <li>
          Ib<span>{{ realTimeList.Lb ? realTimeList.Lb : "--" }}</span>
        </li>
        <li>
          φb<span>{{ realTimeList.phib ? realTimeList.phib : "--" }}</span>
        </li>
        <li>
          Uc<span>{{ realTimeList.Uc ? realTimeList.Uc : "--" }}</span>
        </li>
        <li>
          Ic<span>{{ realTimeList.Lc ? realTimeList.Lc : "--" }}</span>
        </li>
        <li>
          φc<span>{{ realTimeList.phic ? realTimeList.phic : "--" }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  props: ["realTimeList"],
  data() {
    return {};
  },
};
</script>
<style scoped>
.unusual {
  height: 16rem !important;
  background-image: url("../../../assets//img/frame_0_new_sm.png") !important;
  margin-top: 1rem;
}

.title {
  padding: 0.6rem 0 1rem 3.4rem !important;
  margin-left: 2rem !important;
}

.content {
  width: 100%;
  height: 70%;
  display: flex;
  align-items: center;
}

.left {
  height: 100%;
  position: relative;
}

.left .icon {
  width: 8.5rem;
  position: absolute;
  top: 2.2rem;
}

.left .triangle {
  width: 1rem;
  position: absolute;
  top: 5rem;
  left: 8rem;
}

.left span {
  color: #e4eff7;
  text-shadow: 2px 2px 5px #6fa3ef, -2px -2px 5px #6fa3ef, 0 0 10px #6fa3ef;
  position: absolute;
  top: 8rem;
  font-size: 1rem;
  font-weight: bold;
  left: 2.3rem;
}

.list li {
  width: 33.3333%;
  height: 3.3rem;
  float: left;
  line-height: 1.66rem;
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: #fff;
}

.right_1 {
  width: 100%;
}

.right_1 li {
  font-size: 1.1rem;
}

.list li span {
  background: linear-gradient(0deg, #F5D133 0%, #EFB921 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
  margin: 0 0 0 0.3rem;
}
</style>
