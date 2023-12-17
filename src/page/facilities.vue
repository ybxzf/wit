<template>
  <div class="facilitiesBox" @click="clickBack()">
    <img src="../assets/img/demo.png">
  </div>
</template>

<script>

export default {
  name: "facilities",
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
  },
  methods: {
    clickBack() {
      this.$router.go(-1);
      // this.$router.push("/")
    },
  },
};
</script>

<style>
@import url("../assets/css/facilities.css");
</style>
