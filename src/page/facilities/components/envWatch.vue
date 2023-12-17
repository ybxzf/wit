<template>
  <div class="unusual">
    <p class="title">环境监测</p>
    <div class="env-content">
      <div class="env-content-item">
        <img class="icon-avatar" src="@/assets/img/icon_2_new.png" />
        <span>
          <div class="value" style="">{{ envList.temperature }}</div>
          <div class="name" style="">温度</div>
        </span>
      </div>
      <div class="env-content-item">
        <img class="icon-avatar" src="@/assets/img/icon_3_new.png" />
        <span>
          <div class="value" style="">{{ envList.humidity }}</div>
          <div class="name" style="">湿度</div>
        </span>
      </div>
      <div class="env-content-item">
        <img class="icon-avatar" src="@/assets/img/icon_4_new.png" />
        <span>
          <div class="value" style="">{{ envList.illumination }}</div>
          <div class="name" style="">光照</div>
        </span>
      </div>
      <div class="env-content-item">
        <img class="icon-avatar" src="@/assets/img/icon_5_new.png" />
        <span>
          <div class="value" style="">{{ envList.magneticField }}</div>
          <div class="name" style="">电磁</div>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["envList"],
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
  padding: 0.6rem 0 0 3.4rem !important;
  margin-left: 2rem !important;
}
.icon-avatar {
  display: inline;
  margin-right: 0.5rem;
  width: 5rem;
}
.env-content {
  display: flex;
  flex-wrap: wrap;
  height: 75%;
}
.env-content-item {
  width: 50%;
  padding: 0.2rem 2rem;
  display: flex;
  align-items: center;
}
.env-content-item .name {
  color: #fff;
  font-size: 1.1rem;
  font-weight: bolder;
}
.env-content-item .value {
  width: 9rem;
  color: #d6bd56;
  font-size: 1.6rem;
  font-weight: bolder;
}
</style>
