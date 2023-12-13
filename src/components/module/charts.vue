<script>
import Vue from 'vue';

const that = new Vue()
export default {
  /**
   * 绘制3D柱图
   * @param {string[]} xData 横坐标数组
   * @param {string[]} list 坐标数据
   * @returns
   */
  cylinderOption(xData, list) {
    const option = {
      // title: {
      //   text: "单位（台）",
      //   top: "2%",
      //   left: "2%",
      //   textStyle: {
      //     fontSize: that.$tools.getFitSize(1),
      //     color: "#fff",
      //     fontWeight: "normal",
      //   },
      // },
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
        formatter: "{b} : {c}", //显示的内容
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
        axisLine: {
          show: true,
          lineStyle: {
            color: "rgba(41, 121, 255, 0.2)",
          },
        },
        axisLabel: {
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
};
</script>
