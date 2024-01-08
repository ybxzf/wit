<script>
import Vue from 'vue';
import "echarts-gl";
const that = new Vue()
export default {
  /**
   * 绘制3D柱图
   * @param {string[]} xData 横坐标数组
   * @param {string[]} list 坐标数据
   * @returns
   */
  cylinderOption(xData, list) {
    let maxNum = 2;
    list.forEach(item => {
      maxNum = item.value > maxNum ? Math.ceil(item.value) : maxNum;
    })
    const option = {
      title: {
        text: "单位：台",
        top: "2%",
        left: "2%",
        textStyle: {
          fontSize: that.$tools.getFitSize(1),
          color: "#fff",
          fontWeight: "normal",
        },
      },
      legend: {
        top: "2%",
        icon: "roundRect",
        textStyle: {
          color: "#97AFD8",
          fontSize: that.$tools.getFitSize(1),
        },
        itemWidth: that.$tools.getFitSize(1.28),
        itemHeight: that.$tools.getFitSize(0.5),
        itemStyle: {
          color: "#91CAFF",
        },
      },
      tooltip: {
        trigger: "item",
        axisPointer: {
          type: "shadow",
        },
        formatter: "{b} : {c}台", //显示的内容
        backgroundColor: "rgba(21, 45, 85, 0.6)", //背景颜色（此时为默认色）
        textStyle: {
          color: "#fff",
        },
      },
      grid: {
        top: "15%",
        bottom: "5%",
        right: "3%",
        left: "3%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        axisTick: {
          show: false,
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: "rgba(41, 121, 255, 0.2)",
          },
        },
        axisLabel: {
          interval: 0,
          color: "#B5C5D4",
          margin: 14, //边距
          fontSize: that.$tools.getFitSize(0.86),
        },
        data: xData,
      },
      yAxis: {
        type: "value",
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLine: { //坐标轴线配置
          show: true,
          lineStyle: {
            color: "rgba(41, 121, 255, 0.2)",
          },
        },
        interval: maxNum <= 2 ? 1 : undefined, //刻度值间隔
        max: maxNum <= 2 ? maxNum : undefined,  //最大刻度值
        axisLabel: {  //坐标轴值配置
          formatter: function (value) {  // 这里设置 Y 轴的单位
            return value;
          },
          color: "rgba(255, 255, 255, 0.6)",
          fontSize: that.$tools.getFitSize(0.86),
        },
        splitNumber: 4,
      },
      color: ["#2b9cf9"],
      series: [
        {
          // name: "圆柱部分",
          type: "bar", //bar 柱状图
          // barWidth: that.$tools.getFitSize(1.42),
          barWidth: that.$tools.getFitSize(4),
          barGap: "0%",
          itemStyle: {
            //柱状样式
            normal: {
              color: function (params) {
                let colorList = [
                  {
                    top: "rgba(186, 108, 238, 0.7)",
                    bottom: "rgba(186, 108, 238, 0.1)",
                  },
                  {
                    top: "rgba(60, 119, 228, 0.7)",
                    bottom: "rgba(60, 119, 228, 0.1)",
                  },
                  {
                    top: "rgba(198, 158, 71, 0.7)",
                    bottom: "rgba(198, 158, 71, 0.1)",
                  },
                ];
                let colorItem = {
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  type: "linear",
                  global: false,
                  colorStops: [
                    {
                      //第一节下面
                      offset: 0,
                      color: colorList[params.dataIndex].top,
                    },
                    {
                      offset: 1,
                      color: colorList[params.dataIndex].bottom,
                    },
                  ],
                };
                return colorItem;
              },
            },
          },
          data: list,
        },
        {
          // name: "顶部截面",
          type: "pictorialBar", //pictorialBar 象形柱图
          symbolSize: [that.$tools.getFitSize(4), 12], //调整截面形状
          symbolOffset: [0, -5],
          z: 12,
          symbolPosition: "end", //图形的位置 'start'：图形边缘与柱子开始的地方内切。'end'：图形边缘与柱子结束的地方内切。'center'：图形在柱子里居中。
          itemStyle: {
            normal: {
              color: function (params) {
                let colorList = [
                  "rgba(186, 108, 238)",
                  "rgba(60, 119, 228)",
                  "rgba(198, 158, 71)",
                ];
                let colorItem = colorList[params.dataIndex];
                return colorItem;
              },
            },
          },
          data: list,
        },
        {
          // name: "底部截面",
          type: "pictorialBar", //pictorialBar 象形柱图
          symbolSize: [that.$tools.getFitSize(4), 12], //调整截面形状
          z: 12,
          itemStyle: {
            normal: {
              color: function (params) {
                let colorList = [
                  "rgba(186, 108, 238, 0.5)",
                  "rgba(60, 119, 228, 0.5)",
                  "rgba(198, 158, 71, 0.5)",
                ];
                let colorItem = colorList[params.dataIndex];
                return colorItem;
              },
            },
          },
          // 实现数字展示在柱状图
          label: {
            show: true,
            position: "top",
            fontSize: that.$tools.getFitSize(1.28),
            color: "#2DB1EF",
            fontWeight: "bold",
            offset: [0, -10],
            formatter: "{c}", //添加单位
          },
          data: list,
        },
      ],
    };
    return option;
  },

  // 生成扇形的曲面参数方程，用于 series-surface.parametricEquation
  getParametricEquation(startRatio, endRatio, isSelected, isHovered, k, h) {
    // 计算
    let midRatio = (startRatio + endRatio) / 2;

    let startRadian = startRatio * Math.PI * 2;
    let endRadian = endRatio * Math.PI * 2;
    let midRadian = midRatio * Math.PI * 2;

    // 如果只有一个扇形，则不实现选中效果。
    // if (startRatio === 0 && endRatio === 1) {
    //     isSelected = false;
    // }
    isSelected = false;
    // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
    k = typeof k !== 'undefined' ? k : 1 / 3;

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
          return offsetX + Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
        }
        if (u > endRadian) {
          return offsetX + Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
        }
        return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
      },

      y: function (u, v) {
        if (u < startRadian) {
          return offsetY + Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate;
        }
        if (u > endRadian) {
          return offsetY + Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate;
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
    let total = 0;
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
      total += pieData[i].value
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
          k: k,
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
        true,
        false,
        1,
        series[i].pieData.value / total * 20
      );

      startValue = endValue;

      legendData.push(series[i].name);
    }

    // 补充一个透明的圆环，用于支撑高亮功能的近似实现。
    series.push({
      name: "mouseoutSeries",
      type: "surface",
      parametric: true,
      wireframe: {
        show: false,
      },
      itemStyle: {
        opacity: 1,
        color: "rgba(18,236,252,.5)",
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
          step: Math.PI / 1.4,
        },
        x: function (u, v) {
          return Math.sin(v) * Math.sin(u) + Math.sin(u);
        },
        y: function (u, v) {
          return Math.sin(v) * Math.cos(u) + Math.cos(u);
        },
        z: function (u, v) {
          return Math.cos(v) > 0 ? 0.1 : -0.1;
        },
      },
    });
    // 准备待返回的配置项，把准备好的 legendData、series 传入。
    let option = {
      // animation: false,
      legend: { //分类标识
        show: true,
        left: 'center',
        bottom: "10",
        itemGap: 20,
        data: pieData,
        textStyle: {
          color: 'white'
        },
        // formatter: function (params) {
        //   for (let i = 0; i < pieData.length; i++) {
        //     if (pieData[i].name === params) {
        //       return params + ' : ' + (pieData[i].value / total * 100).toFixed(2) + '%'
        //     }
        //   }
        // }
      },
      tooltip: { //鼠标指向时提示
        backgroundColor: "rgba(21, 45, 85, 0.6)", //背景颜色（此时为默认色）
        textStyle: {
          color: 'white'
        },
        formatter: (params) => {
          if (params.seriesName !== "mouseoutSeries") {
            return `${params.seriesName
              }<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params.color
              };"></span>${total == 0 ? 
                params.seriesName=='合格' ? 100 : 0 
                :
                (option.series[params.seriesIndex].pieData.value / total * 100).toFixed(2)
              }%`;
          }
        },
      },
      xAxis3D: {
        min: -1.3,
        max: 1.3,
      },
      yAxis3D: {
        min: -1.3,
        max: 1.3,
      },
      zAxis3D: {
        min: -1.3,
        max: 1.3,
      },
      grid3D: {
        show: false,
        boxHeight: 10,
        // top: '30%',
        left: "center",
        bottom: "center",
        viewControl: {
          //3d效果可以放大、旋转等，请自己去查看官方配置
          // alpha: 20,
          // beta: 40,
          rotateSensitivity: 0,
          zoomSensitivity: 0,
          panSensitivity: 0,
          autoRotate: true,
          autoRotateSpeed: 72,
          // autoRotateAfterStill: 10
        },
      },
      series: series,
    };
    return option;
  },
};
</script>
