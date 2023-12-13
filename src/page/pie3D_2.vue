<template>
  <div class="chart-container">
    <div class="chart" ref="chart"></div>
    <!-- 底座背景 -->
    <div class="bg"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import "echarts-gl";

const color = ["#3cd6b7", "#fe9326", "#124fb7", "#383893"];

export default {
  name: "chart",
  data() {
    return {
      optionData: [
        {
          name: "A类企业",
          value: 176,
        },
        {
          name: "B类企业",
          value: 288,
        },
        {
          name: "C类企业",
          value: 88,
        },
        {
          name: "D类企业",
          value: 78,
        },
      ],
      statusChart: null,
      option: {},
    };
  },
  created() {
    this.setLabel();
  },
  mounted() {
    this.initChart();

    //根据窗口变化自动调节图表大小
    const that = this;
    window.onresize = function () {
      that.changeSize();
    };
  },
  methods: {
    // 初始化label样式
    setLabel() {
      this.optionData.forEach((item, index) => {
        item.itemStyle = {
          color: color[index],
        };
        item.label = {
          normal: {
            show: true,
            color: color[index],
            position: "right",
            // distance:-10,
            offset: [0, 3],
            formatter: [
              "{d|{d}%}",
              "————",
              //   '{c|{c}}{b|台}',
              "{b|{b}}",
            ].join("\n"), // 用\n来换行
            rich: {
              b: {
                // color: '#fff',
                lineHeight: 25,
                align: "left",
                color: color[index],
              },
              c: {
                fontSize: 22,
                // color: '#fff',
                textShadowColor: "#1c90a6",
                textShadowOffsetX: 0,
                textShadowOffsetY: 2,
                textShadowBlur: 5,
                color: color[index],
              },
              d: {
                color: color[index],
                align: "left",
              },
            },
          },
        };
        item.labelLine = {
          normal: {
            length2: 30,
            lineStyle: {
              width: 1,
              color: color[index],
            },
          },
        };
      });
    },
    // 图表初始化
    initChart() {
      this.statusChart = echarts.init(this.$refs.chart);
      // 传入数据生成 option, 构建3d饼状图, 参数工具文件已经备注的很详细
      this.option = this.getPie3D(this.optionData, 0.6, 180, 26, 18, 1);
      this.statusChart.setOption(this.option);
      // 是否需要label指引线，如果要就添加一个透明的2d饼状图并调整角度使得labelLine和3d的饼状图对齐，并再次setOption
      this.option.series.push({
        name: "信用评价", //自己根据场景修改
        backgroundColor: "transparent",
        type: "pie",
        label: {
          opacity: 1,
          fontSize: 13,
          lineHeight: 20,
        },
        startAngle: -40, // 起始角度，支持范围[0, 360]。
        clockwise: false, // 饼图的扇区是否是顺时针排布。上述这两项配置主要是为了对齐3d的样式
        radius: ["20%", "60%"],
        center: ["50%", "50%"],
        data: this.optionData,
        itemStyle: {
          opacity: 0, //这里必须是0，不然2d的图会覆盖在表面
        },
      });
      this.statusChart.setOption(this.option);
      this.bindListen(this.statusChart);
    },
    // 监听鼠标事件，实现饼图选中效果（单选），近似实现高亮（放大）效果。
    // optionName是防止有多个图表进行定向option传递，单个图表可以不传，默认是opiton
    bindListen(myChart, optionName = "option") {
      let selectedIndex = "";
      let hoveredIndex = "";
      // 监听点击事件，实现选中效果（单选）
      // myChart.on("click", (params) => {
      //   console.log(this[optionName].series[params.seriesIndex],'this[optionName].series[params.seriesIndex].pieStatus');
      //   // 从 option.series 中读取重新渲染扇形所需的参数，将是否选中取反。
      //   const isSelected =
      //     !this[optionName].series[params.seriesIndex].pieStatus.selected;
      //   const isHovered =
      //     this[optionName].series[params.seriesIndex].pieStatus.hovered;
      //   const k = this[optionName].series[params.seriesIndex].pieStatus.k;
      //   const startRatio =
      //     this[optionName].series[params.seriesIndex].pieData.startRatio;
      //   const endRatio =
      //     this[optionName].series[params.seriesIndex].pieData.endRatio;
      //   // 如果之前选中过其他扇形，将其取消选中（对 option 更新）
      //   if (selectedIndex !== "" && selectedIndex !== params.seriesIndex) {
      //     this[optionName].series[selectedIndex].parametricEquation =
      //       getParametricEquation(
      //         this[optionName].series[selectedIndex].pieData.startRatio,
      //         this[optionName].series[selectedIndex].pieData.endRatio,
      //         false,
      //         false,
      //         k,
      //         this[optionName].series[selectedIndex].pieData.value
      //       );
      //     this[optionName].series[selectedIndex].pieStatus.selected = false;
      //   }
      //   // 对当前点击的扇形，执行选中/取消选中操作（对 option 更新）
      //   this[optionName].series[params.seriesIndex].parametricEquation =
      //     getParametricEquation(
      //       startRatio,
      //       endRatio,
      //       isSelected,
      //       isHovered,
      //       k,
      //       this[optionName].series[params.seriesIndex].pieData.value
      //     );
      //   this[optionName].series[params.seriesIndex].pieStatus.selected =
      //     isSelected;
      //   // 如果本次是选中操作，记录上次选中的扇形对应的系列号 seriesIndex
      //   selectedIndex = isSelected ? params.seriesIndex : null;
      //   // 使用更新后的 option，渲染图表
      //   myChart.setOption(this[optionName]);
      // });
      // 监听 mouseover，近似实现高亮（放大）效果
      myChart.on("mouseover", (params) => {
        // 准备重新渲染扇形所需的参数
        let isSelected;
        let isHovered;
        let startRatio;
        let endRatio;
        let k;
        // 如果触发 mouseover 的扇形当前已高亮，则不做操作
        if (hoveredIndex === params.seriesIndex) {
          // 否则进行高亮及必要的取消高亮操作
        } else {
          // 如果当前有高亮的扇形，取消其高亮状态（对 option 更新）
          if (hoveredIndex !== "") {
            // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 false。
            isSelected =
              this[optionName].series[hoveredIndex].pieStatus.selected;
            isHovered = false;
            startRatio =
              this[optionName].series[hoveredIndex].pieData.startRatio;
            endRatio = this[optionName].series[hoveredIndex].pieData.endRatio;
            k = this[optionName].series[hoveredIndex].pieStatus.k;
            // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
            this[optionName].series[hoveredIndex].parametricEquation =
              this.getParametricEquation(
                startRatio,
                endRatio,
                isSelected,
                isHovered,
                k,
                this[optionName].series[hoveredIndex].pieData.value
              );
            this[optionName].series[hoveredIndex].pieStatus.hovered = isHovered;
            // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
            hoveredIndex = "";
          }
          // 如果触发 mouseover 的扇形不是透明圆环，将其高亮（对 option 更新）
          if (
            params.seriesName !== "mouseoutSeries" &&
            params.seriesName !== "信用评价"
          ) {
            // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
            isSelected =
              this[optionName].series[params.seriesIndex].pieStatus.selected;
            isHovered = true;
            startRatio =
              this[optionName].series[params.seriesIndex].pieData.startRatio;
            endRatio =
              this[optionName].series[params.seriesIndex].pieData.endRatio;
            k = this[optionName].series[params.seriesIndex].pieStatus.k;
            // 对当前点击的扇形，执行高亮操作（对 option 更新）
            this[optionName].series[params.seriesIndex].parametricEquation =
              this.getParametricEquation(
                startRatio,
                endRatio,
                isSelected,
                isHovered,
                k,
                this[optionName].series[params.seriesIndex].pieData.value + 60
              );
            this[optionName].series[params.seriesIndex].pieStatus.hovered =
              isHovered;
            // 记录上次高亮的扇形对应的系列号 seriesIndex
            hoveredIndex = params.seriesIndex;
          }
          // 使用更新后的 option，渲染图表
          myChart.setOption(this[optionName]);
        }
      });
      // 修正取消高亮失败的 bug
      myChart.on("globalout", () => {
        // 准备重新渲染扇形所需的参数
        let isSelected;
        let isHovered;
        let startRatio;
        let endRatio;
        let k;
        if (hoveredIndex !== "") {
          // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
          isSelected = this[optionName].series[hoveredIndex].pieStatus.selected;
          isHovered = false;
          k = this[optionName].series[hoveredIndex].pieStatus.k;
          startRatio = this[optionName].series[hoveredIndex].pieData.startRatio;
          endRatio = this[optionName].series[hoveredIndex].pieData.endRatio;
          // 对当前点击的扇形，执行取消高亮操作（对 option 更新）
          this[optionName].series[hoveredIndex].parametricEquation =
            this.getParametricEquation(
              startRatio,
              endRatio,
              isSelected,
              isHovered,
              k,
              this[optionName].series[hoveredIndex].pieData.value
            );
          this[optionName].series[hoveredIndex].pieStatus.hovered = isHovered;
          // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
          hoveredIndex = "";
        }
        // 使用更新后的 option，渲染图表
        myChart.setOption(this[optionName]);
      });
    },
    // 自适应宽高
    changeSize() {
      this.statusChart.resize();
    },
    // 生成扇形的曲面参数方程，用于 series-surface.parametricEquation
    getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, h) {
      // 计算
      let midRatio = (startRatio + endRatio) / 2;

      let startRadian = startRatio * Math.PI * 2;
      let endRadian = endRatio * Math.PI * 2;
      let midRadian = midRatio * Math.PI * 2;

      // // 如果只有一个扇形，则不实现选中效果。
      // if (startRatio === 0 && endRatio === 1) {
      //     isSelected = false;
      // }
      isSelected = false;
      // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
      k = typeof k !== "undefined" ? k : 1 / 3;

      // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
      let offsetX = isSelected ? Math.sin(midRadian) * 0.1 : 0;
      let offsetY = isSelected ? Math.cos(midRadian) * 0.1 : 0;

      // 计算高亮效果的放大比例（未高亮，则比例为 1）
      let hoverRate = isHovered ? 1.05 : 1;

      // 返回曲面参数方程
      return {
        u: {
          min: -Math.PI,
          max: Math.PI * 3,
          step: Math.PI / 32,
        },

        v: {
          min: 0,
          max: Math.PI * 2,
          step: Math.PI / 20,
        },

        x: function (u, v) {
          if (u < startRadian) {
            return (
              offsetX +
              Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate
            );
          }
          if (u > endRadian) {
            return (
              offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate
            );
          }
          return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
        },

        y: function (u, v) {
          if (u < startRadian) {
            return (
              offsetY +
              Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate
            );
          }
          if (u > endRadian) {
            return (
              offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate
            );
          }
          return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
        },

        z: function (u, v) {
          if (u < -Math.PI * 0.5) {
            return Math.sin(u);
          }
          if (u > Math.PI * 2.5) {
            return Math.sin(u) * h * 0.1;
          }
          return Math.sin(v) > 0 ? 1 * h * 0.1 : -1;
        },
      };
    },

    // 生成模拟 3D 饼图的配置项
    getPie3D(pieData, internalDiameterRatio) {
      let series = [];
      let sumValue = 0;
      let startValue = 0;
      let endValue = 0;
      let legendData = [];
      let k =
        typeof internalDiameterRatio !== "undefined"
          ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
          : 1 / 3;

      // 为每一个饼图数据，生成一个 series-surface 配置
      for (let i = 0; i < pieData.length; i++) {
        sumValue += pieData[i].value;

        let seriesItem = {
          name:
            typeof pieData[i].name === "undefined"
              ? `series${i}`
              : pieData[i].name,
          type: "surface",
          parametric: true,
          wireframe: {
            show: false,
          },
          pieData: pieData[i],
          pieStatus: {
            selected: false,
            hovered: false,
            k: 1 / 10,
          },
        };

        if (typeof pieData[i].itemStyle != "undefined") {
          let itemStyle = {};

          typeof pieData[i].itemStyle.color != "undefined"
            ? (itemStyle.color = pieData[i].itemStyle.color)
            : null;
          typeof pieData[i].itemStyle.opacity != "undefined"
            ? (itemStyle.opacity = pieData[i].itemStyle.opacity)
            : null;

          seriesItem.itemStyle = itemStyle;
        }
        series.push(seriesItem);
      }

      // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
      // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
      for (let i = 0; i < series.length; i++) {
        endValue = startValue + series[i].pieData.value;

        series[i].pieData.startRatio = startValue / sumValue;
        series[i].pieData.endRatio = endValue / sumValue;
        series[i].parametricEquation = this.getParametricEquation(
          series[i].pieData.startRatio,
          series[i].pieData.endRatio,
          false,
          false,
          k,
          100 // 控制各模块高度一致 如效果1
          // series[i].pieData.value  控制各模块高度根据value改变 如效果2
        );

        startValue = endValue;

        legendData.push(series[i].name);
      }

      // // 补充一个透明的圆环，用于支撑高亮功能的近似实现。
      series.push({
        name: "mouseoutSeries",
        type: "surface",
        parametric: true,
        wireframe: {
          show: false,
        },
        itemStyle: {
          opacity: 0.1,
          color: "#E1E8EC",
        },
        parametricEquation: {
          u: {
            min: 0,
            max: Math.PI * 2,
            step: Math.PI / 20,
          },
          v: {
            min: 0,
            max: Math.PI,
            step: Math.PI / 20,
          },
          x: function (u, v) {
            return ((Math.sin(v) * Math.sin(u) + Math.sin(u)) / Math.PI) * 2;
          },
          y: function (u, v) {
            return ((Math.sin(v) * Math.cos(u) + Math.cos(u)) / Math.PI) * 2;
          },
          z: function (u, v) {
            return Math.cos(v) > 0 ? -0.5 : -5;
          },
        },
      });

      // // 补充一个透明的圆环，用于支撑高亮功能的近似实现。
      series.push({
        name: "mouseoutSeries",
        type: "surface",
        parametric: true,
        wireframe: {
          show: false,
        },
        itemStyle: {
          opacity: 0.1,
          color: "#E1E8EC",
        },
        parametricEquation: {
          u: {
            min: 0,
            max: Math.PI * 2,
            step: Math.PI / 20,
          },
          v: {
            min: 0,
            max: Math.PI,
            step: Math.PI / 20,
          },
          x: function (u, v) {
            return ((Math.sin(v) * Math.sin(u) + Math.sin(u)) / Math.PI) * 2;
          },
          y: function (u, v) {
            return ((Math.sin(v) * Math.cos(u) + Math.cos(u)) / Math.PI) * 2;
          },
          z: function (u, v) {
            return Math.cos(v) > 0 ? -5 : -7;
          },
        },
      });
      // // 补充一个透明的圆环，用于支撑高亮功能的近似实现。
      series.push({
        name: "mouseoutSeries",
        type: "surface",
        parametric: true,
        wireframe: {
          show: false,
        },
        itemStyle: {
          opacity: 0.1,
          color: "#E1E8EC",
        },

        parametricEquation: {
          u: {
            min: 0,
            max: Math.PI * 2,
            step: Math.PI / 20,
          },
          v: {
            min: 0,
            max: Math.PI,
            step: Math.PI / 20,
          },
          x: function (u, v) {
            return ((Math.sin(v) * Math.sin(u) + Math.sin(u)) / Math.PI) * 2.2;
          },
          y: function (u, v) {
            return ((Math.sin(v) * Math.cos(u) + Math.cos(u)) / Math.PI) * 2.2;
          },
          z: function (u, v) {
            return Math.cos(v) > 0 ? -7 : -7;
          },
        },
      });

      // 准备待返回的配置项，把准备好的 legendData、series 传入。
      let option = {
        //animation: false,
        legend: {
          left: "50%",
          top: "center",
          textStyle: {
            fontSize: 8,
          },
          // icon:'diamond',
          data: legendData,
          formatter: (params) => {
            return params;
          },
        },
        xAxis3D: {},
        yAxis3D: {},
        zAxis3D: {},
        grid3D: {
          // 用于鼠标的旋转，缩放等视角控制。
          viewControl: {
            autoRotate: true,
            alpha: 42, // 视角绕 x 轴，即上下旋转的角度
            autoRotate: true, // 是否开启视角绕物体的自动旋转查看。默认 true
          },
          left: "left",
          width: "50%",
          show: false,
          boxHeight: 10,
        },
        series: series,
      };
      return option;
    },
  },
};
</script>

<style scoped>
.chart-container {
  position: relative;
  width: 100%;
  height: 100%;
}
.chart-container /deep/ .chart {
  z-index: 1;
}
.chart-container /deep/ .chart,
.chart-container /deep/ .bg {
  width: 100%;
  height: 100%;
}

.chart-container /deep/.bg {
  position: absolute;
  bottom: -10px;
  left: 50%;
  z-index: 0;
  height: calc(200 / 1080 * 100vh);
  width: calc(240 / 1920 * 100vw);
  background: no-repeat center;
  /* background-image: url("~@/assets/imgs/piebg.png"); */
  background-size: 100% 100%;
  transform: translateX(-50%);
}
</style>
