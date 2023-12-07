<template>
  <div class="unusual">
    <p class="title">环境条件</p>
    <div class="env-content">
      <div class="env-content-item">
        <img class="icon-avatar" src="@/assets/img/icon_2.png" />
        <span>
          <div class="value" style="">{{ envList.temperature }}</div>
          <div class="name" style="">温度</div>
        </span>
      </div>
      <div class="env-content-item">
        <img class="icon-avatar" src="@/assets/img/icon_2.png" />
        <span>
          <div class="value" style="">{{ envList.humidity }}</div>
          <div class="name" style="">湿度</div>
        </span>
      </div>
      <div class="env-content-item">
        <img class="icon-avatar" src="@/assets/img/icon_2.png" />
        <span>
          <div class="value" style="">{{ envList.illumination }}</div>
          <div class="name" style="">光照</div>
        </span>
      </div>
      <div class="env-content-item">
        <img class="icon-avatar" src="@/assets/img/icon_2.png" />
        <span>
          <div class="value" style="">{{ envList.magneticField }}</div>
          <div class="name" style="">磁场</div>
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
  height: 23.7rem !important;
}
.title {
  padding: 0.8rem 0 1rem 4rem !important;
  margin-left: 2rem !important;
}
.icon-avatar {
  display: inline;
  margin-right: 2rem;
  width: 5rem;
}
.env-content {
  display: flex;
  flex-wrap: wrap;
  height: 75%;
}
.env-content-item {
  width: 50%;
  padding: 0.5rem 2rem;
  display: flex;
  align-items: center;
}
.env-content-item .name {
  color: #fff;
  font-size: 1.2rem;
  font-weight: bolder;
}
.env-content-item .value {
  color: #d6bd56;
  font-size: 2.2rem;
  font-weight: bolder;
}
</style>
