<template>
  <div class="tester">
    <p class="title">检定人员</p>
    <ul class="content">
      <ol v-for="(item, index) in testerList" style="display: flex;">
        <img class="icon-avatar" src="@/assets/img/avatar.png" />
        <div class="tester-content">
          <div class="text_1">检定人：{{ item.personnelName }}</div>
          <div class="text_2">资质信息：<span>{{ item.post }}</span></div>
        </div>
      </ol>
    </ul>
  </div>
</template>
<script>
export default {
  props: ["testerList"],
  data() {
    return {};
  },
};
</script>
<style scoped>
.tester {
  width: 100%;
  height: 16rem;
  background-image: url("../../../assets/img/frame_0_new_sm.png");
  background-size: 100% 100%;
  margin-top: 1rem;
}

.title {
  padding: 0.6rem 0 1rem 3.4rem !important;
  margin-left: 2rem !important;
  font-size: 1.72rem;
  text-shadow: 0px 3px 0px rgba(0, 9, 17, 0.52);
  color: #fff;
  font-family: "YS";
  letter-spacing: 0.15rem;
  line-height: 2.78rem;
}

.content {
  /* border: 1px solid red; */
  height: 11.5rem;
}

.icon-avatar {
  /* display: inline; */
  margin: 1rem 2rem;
  width: 9rem;
}

.tester-content {
  /* padding-left: 1rem; */
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: center;
  height: 11rem;
  width: 22rem;
  /* background-image: url("../../../assets/img/icon_8.png"); */
}

.tester-content .text_1 {
  background: linear-gradient(to bottom, white, rgb(128, 190, 248));
  /* 添加兼容性前缀 */
  -webkit-background-clip: text;
  color: transparent;
  font-size: 1.5rem;
  font-weight: bolder;
  margin: 0.5rem;
}

.tester-content .text_2 {
  font-size: 1.3rem;
  font-weight: bold;
  margin: 0.5rem;
  color: #b9b8b8;
}

.tester-content .text_2 span {
  color: #d6bd56;
}

::-webkit-scrollbar {
  display: none;
}
</style>
