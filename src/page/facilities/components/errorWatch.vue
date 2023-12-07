<template>
  <div class="unusual">
    <p class="title">异常监测</p>
    <ul class="swiperHead row">
      <ol v-for="(item, index) in deviceList">
        <img class="icon-number" src="@/assets/img/tag_3.png" />
        <span style="color: white">{{ item.name }}</span
        >：
        <span>{{ item.value }}</span>
      </ol>
    </ul>
  </div>
</template>
<script>
export default {
  props: ["deviceList"],
  data() {
    return {};
  },
};
</script>
<style scoped>
.icon-number {
  display: inline;
  margin-right: 10px;
  width: 1rem;
}
.title {
  padding: 0.75rem 0 1rem 4rem !important;
  margin-left: 2rem !important;
}
</style>
