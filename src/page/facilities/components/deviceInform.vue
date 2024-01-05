<template>
  <div class="unusual">
    <p class="title">设备信息</p>
    <ul class="information">
      <ol v-for="(item, index) in deviceList">
        <img class="icon-number" :src="`/static/assets/img/device_icon_${index}.png`" />
        <span>{{ item.name }}</span>：
        <span :style="{
          color: item.name == '设备运行状态' ?
            item.value == '运行' ? '#3DFFCF' : 'rgb(255, 0, 0)'
            : 'rgb(30, 128, 240)'
        }">{{ item.value ? item.value : '--' }}</span>
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
  width: 1.6rem;
}

.title {
  padding: 0.7rem 0 1rem 3.4rem !important;
  margin-left: 2rem !important;
}

.information {
  width: 28.42rem;
  margin: 0.5rem auto;
  font-size: 1.28rem;
  color: #b9b8b8;
  line-height: 2.58rem;
  font-weight: bold;
}
</style>
