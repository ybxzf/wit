<template>
  <div class="page">
    <p class="title">设备状态</p>
    <div class="env-content">
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
.page {
  height: 76.3rem ;
	background-image: url("../../../assets/img/frame_2.png");
	background-size: 100% 100%;

}
.title {
  padding: 0.5rem 0 1rem 4rem !important;
  margin-left: 2rem !important;
  font-size: 1.72rem;
	text-shadow: 0px 3px 0px rgba(0, 9, 17, 0.52);
	color: #fff;
	padding: 0 0 1rem 4rem;
	font-family: "YS";
	letter-spacing: 0.15rem;
	line-height: 2.58rem;
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
