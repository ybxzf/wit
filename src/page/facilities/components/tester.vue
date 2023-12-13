<template>
  <div class="unusual">
    <p class="title">检测人员</p>
    <ul class="swiperHead row" style="">
      <ol v-for="(item, index) in testerList">
        <img class="icon-avatar" src="@/assets/img/working.png" />
        <div class="tester-content">
          <span class="text">检定人员：</span>{{ item.name }}
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
.unusual {
  height: 27rem !important;
}
.row {
  height: 80% !important;
  overflow: auto;
}
.title {
  padding: 1.1rem 0 1rem 4rem !important;
  margin-left: 2rem !important;
}
.icon-avatar {
  display: inline;
  margin-right: 1rem;
  width: 5rem;
}
.tester-content {
  padding-left: 1rem;
  display: inline-flex;
  height: 3.7rem;
  width: 22rem;
  background-image: url("../../../assets/img/icon_8.png");
}
.tester-content .text {
  color: #fff;
}
::-webkit-scrollbar {
  display: none;
}
</style>
