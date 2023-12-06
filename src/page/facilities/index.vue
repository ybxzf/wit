<template>
    <div class="indexBox">
        aaa
        <!-- <img src="@/assets/img/demo.png"> -->
        <div class="unusual">
            <p class="title">异常监测</p>
            <ul class="swiperHead row">
                <li>异常类型</li>
                <li>实验室</li>
                <li>发生时间</li>
            </ul>
            <div class="swiper" id="unusualSwiper">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="item in unusual">
                        <ul class="swiperBody row">
                            <li><span>{{ item.sensorType }}</span></li>
                            <li><span>{{ item.labName }}</span></li>
                            <li><span>{{ item.updateTime }}</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'facilities',
    data() {
        return {

        }
    },
    methods: {
        clickBack() {
            this.$router.push("/")
        }
    }
}
</script>

<style scoped>
.indexBox {
    width: 100%;
    min-height: 100%;
    background-image: url("../../assets/img/bg.png");
    background-size: cover;
    background-position: center;
    position: relative;
}
</style>