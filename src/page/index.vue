<template>
	<div class="indexBox" @mousemove="move">
		<vue-particles v-if="isShow" color="#00C6FB" :particleOpacity="0.8" shapeType="circle" :particleSize="40"
			:lineLinked="false" :moveSpeed="3" :hoverEffect="false" :clickEffect="false" class="particles">
		</vue-particles>

		<header class="headBox">
			<p class="time">{{time}}</p>
		</header>
		<div class="mainBox flexBox">
			<div class="left">
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
									<li><span>{{item.sensorType}}</span></li>
									<li><span>{{item.labName}}</span></li>
									<li><span>{{item.updateTime}}</span></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div class="check">
					<p class="title">监测人员</p>
					<div class="swiper" id="check">
						<div class="swiper-wrapper">
							<div class="swiper-slide" v-for="item in check">
								<div class="bodyInfo flexBox">
									<img src="../assets/img/icon_7.png" class="icon">
									<div class="info">
										<div class="row">
											<p class="name fl">检定人员<span>{{item.personnelName}}</span></p>
											<p class="value fr">操作设备<span>{{item.equipName}}</span></p>
										</div>
										<p class="type">资质信息<span>{{item.post}}</span></p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="capacity">
					<p class="title">产能监测</p>
					<div class="echarts" id="capacity"></div>
				</div>
			</div>
			<div class="center">
				<div class="frame">
					<img src="../assets/img/icon_6.png" class="icon" />
					<ul class="list">
						<li v-for="(item,idx) in room" :class="idx == roomIdx ? 'active' : ''" class="txtOver"
							@click="changeRoomIdx(idx)">{{item.labName}}</li>
					</ul>
				</div>
				<div class="flexBox">
					<div class="room">
						<p class="title">实验室监测</p>
						<div class="swiper" id="room">
							<div class="swiper-wrapper">
								<div class="swiper-slide" v-for="(item,idx) in room">
									<div class="bodyInfo flexBox" :class=" (idx+1)%2 == 0 ? '' :'active'">
										<p class="tag" :class="tagList[item.labStatus].class">
											{{tagList[item.labStatus].txt}}
										</p>
										<p class="name txtOver"><span>{{item.labName}}</span></p>
										<p class="type">{{item.labStatus}}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="onLine">
						<p class="title">在线监测</p>
						<div class="roomTxt">{{room && room[roomIdx] ? room[roomIdx].labName : '--'}}</div>
						<ul class="tagList row flexBox" v-if="onLine.sensorInfo">
							<li class="flexBox">
								<img src="../assets/img/icon_2.png" class="icon">
								<div class="info">
									<p class="val" :class="onLine.sensorInfo.temperatureState == '异常' ? 'active' :''">
										{{onLine && Boolean(onLine.sensorInfo) ? onLine.sensorInfo.temperature : "--"}}
									</p>
									<p class="name">温度</p>
								</div>
							</li>
							<li class="flexBox">
								<img src="../assets/img/icon_3.png" class="icon">
								<div class="info">
									<p class="val" :class="onLine.sensorInfo.humidityState == '异常' ? 'active' :''">
										{{onLine && Boolean(onLine.sensorInfo) ? onLine.sensorInfo.humidity : "--"}}
									</p>
									<p class="name">湿度</p>
								</div>
							</li>
							<li class="flexBox">
								<img src="../assets/img/icon_4.png" class="icon">
								<div class="info">
									<p class="val" :class="onLine.sensorInfo.illuminationState == '异常' ? 'active' :''">
										{{onLine && Boolean(onLine.sensorInfo) ? onLine.sensorInfo.illumination : "--"}}
									</p>
									<p class="name">光照</p>
								</div>
							</li>
							<li class="flexBox">
								<img src="../assets/img/icon_5.png" class="icon">
								<div class="info">
									<p class="val"
										:class="onLine.sensorInfo.electromagnetismState == '异常' ? 'active' :''">
										{{onLine && Boolean(onLine.sensorInfo) ? onLine.sensorInfo.electromagnetism : "--"}}
									</p>
									<p class="name">电磁</p>
								</div>
							</li>
						</ul>
						<ul class="swiperHead row">
							<li>设备名称</li>
							<li>检定任务</li>
							<li>检定状态</li>
							<li>当前检定项目</li>
							<li>检定员</li>
						</ul>
						<div class="swiper" id="onLineSwiper">
							<div class="swiper-wrapper">
								<div class="swiper-slide" v-for="(item,idx) in onLine.rows">
									<ul class="swiperBody row" @click="clickJump(idx)">
										<li class="txtOver">{{item.equipName}}</li>
										<li class="txtOver">{{item.taskName}}</li>
										<li :class="equipState[item.equipState]">{{item.equipState }}</li>
										<li class="txtOver">{{item.projectName}}</li>
										<li>{{item.checker}}</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="right">
				<div class="quality">
					<p class="title">当前合格率</p>
					<div class="echarts" id="quality"></div>
				</div>
				<div class="data">
					<p class="title">数据监测</p>
					<div class="roomTxt">{{room && room[roomIdx] ? room[roomIdx].labName : '--'}}</div>
					<div class="box" v-for="item in dataList">
						<div class="tag">
							<p>{{item.equipName}}</p>
						</div>
						<div class="bodyInfo">
							<p class="name">基本信息</p>
							<div class="info">
								<ul class="type flexBox">
									<li>当前检定项目</li>
									<li><span>{{item.projectName}}</span></li>
								</ul>
								<ul class="type flexBox">
									<li>检定人员</li>
									<li><span>{{item.checker}}</span></li>
								</ul>
							</div>
							<p class="name" style="margin-top: 0.8rem;">实时数据</p>
							<ul class="list row">
								<li>Ua<span>{{item.Ua ? item.Ua : "--"}}</span></li>
								<li>Ia<span>{{item.La ? item.La : "--"}}</span></li>
								<li>φa<span>{{item.phia ? item.phia : "--"}}</span></li>
								<li>Ub<span>{{item.Ub ? item.Ub : "--"}}</span></li>
								<li>Ib<span>{{item.Lb ? item.Lb : "--"}}</span></li>
								<li>φb<span>{{item.phib ? item.phib : "--"}}</span></li>
								<li>Uc<span>{{item.Uc ? item.Uc : "--"}}</span></li>
								<li>Ic<span>{{item.Lc ? item.Lc : "--"}}</span></li>
								<li>φc<span>{{item.phic ? item.phic : "--"}}</span></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Swiper, {
		Autoplay,
		Grid
	} from 'swiper';
	Swiper.use([Autoplay, Grid]);
	import GlobalInfo from "@/components/GlobalInfo.vue";
	export default {
		name: 'Index',
		data() {
			return {
				refresh:0,
				tempObj: {},
				isShow: false,
				time: "",
				unusual: [],
				check: [],
				tagList: {
					"正在使用": {
						class: "green",
						txt: "使用",
					},
					"闲置待用": {
						class: "yellow",
						txt: "待用",
					},
					"故障维修": {
						class: "red",
						txt: "维修",
					}
				},
				equipState: {
					"空闲": "green",
					"运行": "green",
					"维修": "yellow",
					"保养": "yellow",
					"关机": "red",
					"异常": "red"
				},
				roomIdx: 0,
				room: null,
				roomIdx: 0,
				onLine: {},
				dataList: [],
				hideTime: 1
			}
		},
		mounted() {
			this.getData();
			this.updateTime();
			this.updateData();
		},
		destroyed() {
			if(this.tempObj.data){
				clearInterval(this.tempObj.data);
			}
			if(this.tempObj.timer){
				clearInterval(this.tempObj.timer);
			}
		},
		methods: {
			getData() {
				this.$request("get", '/bigScreen/laboratoryInfo').then((res) => {
					this.room = res.data;
					this.$nextTick(() => {
						this.updateVerticalSwiper("room", 6, true)
					});
					this.updateOnLine()
				});
				this.$request("get", '/bigScreen/durationLock').then((res) => {
					this.hideTime = res.data;
					if(this.hideTime){
						this.updateHide()
					}	
				});
				this.$request("get", '/bigScreen/sensorErrorInfo').then((res) => {
					this.unusual = res.data;
					this.$nextTick(() => {
						this.updateVerticalSwiper("unusualSwiper", 4, true)
					})
				});

				this.$request("get", '/bigScreen/personnelInfo').then((res) => {
					this.check = res.data;
					this.$nextTick(() => {
						this.updateVerticalSwiper("check", 4, true)
					})
				});

				this.$request("get", '/bigScreen/capacity').then((res) => {
					this.updateCapacity("capacity", res.data);
				});

				this.$request("get", '/bigScreen/qualityInfo').then((res) => {
					this.updateQuality("quality", res.data);
				});
			},
			updateHide() {
				if (!this.tempObj.hide) {
					this.tempObj.hide = setTimeout(() => {
						this.isShow = true
					}, this.hideTime * 1000)
				}
			},
			move() {
				if (this.isShow) {
					this.isShow = false;
					window.clearTimeout(this.tempObj.hide);
					this.tempObj.hide = null;
					this.updateHide();
				}
			},
			updateData() {
				this.tempObj.data = setInterval(() => {
					this.getData()
					this.refresh++;
					if(this.refresh > 50){
						location.reload();
					}
				}, GlobalInfo.updatePage)
			},
			updateTime() {
				this.time = this.$tools.coverTimeToFormat(this.$tools.getTime());
				this.tempObj.timer = setInterval(() => {
					this.time = this.$tools.coverTimeToFormat(this.$tools.getTime());
				}, 1000)
			},
			updateCapacity(val, data) {
				if (this.tempObj[val] == undefined) {
					this.tempObj[val] = this.$echarts.init(document.getElementById(val));
				};

				var xData = [];
				var list = [];
				for (var key in data) {
					var msg = data[key];
					list[list.length] = {
						name: key,
						value: msg
					};
					xData[xData.length] = key;
				};

				var option = {
					title: {
						text: "单位（台）",
						top: '2%',
						left: '2%',
						textStyle: {
							fontSize: this.$tools.getFitSize(1),
							color: '#fff',
							fontWeight: "normal"
						},
					},
					legend: {
						top: "2%",
						icon: "roundRect",
						textStyle: {
							color: "#97AFD8",
							fontSize: this.$tools.getFitSize(1)
						},
						itemWidth: this.$tools.getFitSize(1.28),
						itemHeight: this.$tools.getFitSize(0.5),
						itemStyle: {
							color: "#91CAFF"
						}
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'shadow'
						}
					},
					grid: {
						top: "15%",
						bottom: "5%",
						right: "3%",
						left: "3%",
						containLabel: true
					},
					xAxis: {
						type: 'category',
						axisTick: {
							show: false
						},
						axisLine: {
							show: true,
							lineStyle: {
								color: "rgba(41, 121, 255, 0.2)"
							}
						},
						axisLabel: {
							interval: 0,
							color: "#B5C5D4",
							fontSize: this.$tools.getFitSize(0.86)
						},
						data: xData
					},
					yAxis: {
						type: 'value',
						splitLine: {
							show: false,
						},
						axisTick: {
							show: false,
						},
						axisLine: {
							show: true,
							lineStyle: {
								color: "rgba(41, 121, 255, 0.2)"
							}
						},
						axisLabel: {
							color: 'rgba(255, 255, 255, 0.6)',
							fontSize: this.$tools.getFitSize(0.86),
						},
						splitNumber: 4,
					},
					color: ["#2b9cf9"],
					series: [{
						name: "委托量",
						type: 'bar',
						barWidth: this.$tools.getFitSize(1.42),
						data: list
					}]
				};
				this.$tools.updateEcharts(this.tempObj[val], option);
			},
			updateQuality(name, data) {
				if (this.tempObj[name] == undefined) {
					this.tempObj[name] = this.$echarts.init(document.getElementById(name));
				};

				var list = {
					'合格': data.qualified,
					'不合格': data.unqualified
				};

				var arr = [{
					name: '合格',
					value: data.qualified
				}, {
					name: '不合格',
					value: data.unqualified
				}];

				for (var i = 0; i < data.length; i++) {
					var msg = data[i];
					list[msg.name] = msg;
				};
				var option = {
					title: {
						top: "43%",
						left: "27.5%",
						text: data.passRate + "%",
						textStyle: {
							color: "#FFA951",
							fontSize: this.$tools.getFitSize(1.42),
							width: this.$tools.getFitSize(8),
						},
						textAlign: "center",
						subtext: "当前合格率",
						subtextStyle: {
							color: "#fff",
							fontSize: this.$tools.getFitSize(0.86),
						}
					},
					legend: {
						orient: "vertical",
						top: "center",
						right: "15%",
						icon: "circle",
						itemGap: this.$tools.getFitSize(2),
						itemWidth: this.$tools.getFitSize(0.86),
						itemHeight: this.$tools.getFitSize(0.86),
						data: arr,
						formatter: (res) => {
							return "{a|" + res + "} {b|" + list[res] + "}"
						},
						textStyle: {
							color: '#fff',
							fontSize: this.$tools.getFitSize(1.28),
							lineHeight: this.$tools.getFitSize(1),
							rich: {
								c: {
									color: '#fff',
									fontSize: this.$tools.getFitSize(1.28),
									padding: [0, 0, 0, 10],
								},
								b: {
									color: '#fff',
									fontSize: this.$tools.getFitSize(1.28),
									padding: [0, 0, 0, 10],
								}
							}
						}
					},
					grid: {
						top: "5%",
						bottom: "5%",
						right: "0%",
						left: "0%",
						containLabel: true
					},
					tooltip: {
						trigger: 'item'
					},
					color: ["#26E8C0", "#EBD22B"],
					series: [{
						type: 'pie',
						radius: ["40%", "55%"],
						center: ["28.5%", "49.5%"],
						label: false,
						data: arr
					}]
				};

				this.$tools.updateEcharts(this.tempObj[name], option);
			},
			changeRoomIdx(idx) {
				this.roomIdx = idx;
				this.updateOnLine()
			},
			updateOnLine() {
				var msg = this.room[this.roomIdx];
				this.$request("post", '/bigScreen/online', {
					"labNo": msg.labNo,
				}, {
					headers: {
						"Content-Type": "application/json"
					}
				}).then((res) => {
					this.onLine = res.data;
					if (this.tempObj.onLineSwiper) {
						this.tempObj.onLineSwiper.destroy();
						this.tempObj.onLineSwiper = null;
					};

					this.$nextTick(() => {
						this.updateVerticalSwiper("onLineSwiper", 4, false)
					})
				});

				this.$request("post", '/bigScreen/equipDataInfo', {
					"labNo": msg.labNo,
				}, {
					headers: {
						"Content-Type": "application/json"
					}
				}).then((res) => {
					this.dataList = res.data;
				});
			},
			clickJump(idx){
				this.$router.push("/facilities")
			},
			updateVerticalSwiper(name, num, type) {
				if (!this.tempObj[name]) {
					this.tempObj[name] = new Swiper('#' + name, {
						direction: 'vertical',
						slidesPerView: num,
						loop: type,
						autoplay: {
							delay: 3000,
							disableOnInteraction: false
						}
					})
				}
			},
		}
	}
</script>

<style scoped>
	@import url("../assets/css/index.css");
</style>
<style scoped>
	.ant-select-selection {
		background-color: rgba(0, 0, 0, 0);
		border: 0;
		color: #fff;
		line-height: 2.14rem;
		text-align: center;
	}

	.ant-select-selection__rendered {
		line-height: 2.14rem;
		margin: 0;
	}

	.ant-select-selection--single {
		height: 2.14rem;
	}

	.ant-select-selection--single .ant-select-selection__rendered {
		margin: 0;
	}

	.ant-select-arrow {
		display: none;
	}

	.ant-select-selection-selected-value {
		float: inherit;
		padding-right: 0.1rem;
		font-size: 1rem;
	}
</style>
