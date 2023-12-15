<template>
	<div class="indexBox" @mousemove="move">
		<vue-particles v-if="isShow" color="#00C6FB" :particleOpacity="0.8" shapeType="circle" :particleSize="40"
			:lineLinked="false" :moveSpeed="3" :hoverEffect="false" :clickEffect="false" class="particles">
		</vue-particles>

		<header class="headBox">
			<p class="time">{{ time }}</p>
		</header>
		<div class="mainBox flexBox">
			<div class="left">
				<div class="unusual">
					<p class="title">异常监测</p>
					<ul class="swiperHead row">
						<li>异常类型</li>
						<li>实验室</li>
						<li>发送时间</li>
					</ul>
					<div class="swiper" id="unusualSwiper">
						<div class="swiper-wrapper">
							<div class="swiper-slide" v-for="item in unusual">
								<ul class="swiperBody row">
									<li>
										<span>{{ item.sensorType }}</span>
									</li>
									<li>
										<span>{{ item.labName }}</span>
									</li>
									<li>
										<span>{{ item.updateTime }}</span>
									</li>
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
									<img src="../assets/img/working.png" class="icon" />
									<div class="info">
										<div class="name fl">
											<div>{{ item.personnelName }}</div>
											<p class="type">
												资质信息：<span>{{ item.post }}</span>
											</p>
										</div>
										<div class="status">
											<span :class="item.userStatus ? 'work' : 'rest'">
												{{ item.userStatus ? item.userStatus : '休息' }}
											</span>
										</div>
										<!-- <div class="row">
						<p class="name fl">
							检定人员<span>{{ item.personnelName }}</span>
						</p>
						<p class="value fr">
							操作设备<span>{{ item.equipName }}</span>
						</p>
					</div>
					<p class="type">
						资质信息<span>{{ item.post }}</span>
					</p> -->
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
					<img src="../assets/img/icon_6_new.png" class="icon" />
					<ul class="list">
						<li v-for="(item, idx) in room" :class="idx == roomIdx ? 'active' : item.errNum ? 'warn' : 'wait'" class="txtOver" @click="changeRoomIdx(idx)">
							<span>
								<el-badge class="badge" v-if="item.errNum" :value="item.errNum" />
							</span>
							<span>{{ item.labName }}</span>
						</li>
					</ul>
				</div>
				<div class="flexBox">
					<div class="room">
						<p class="title">实验室监测</p>
						<div class="swiper" id="room">
							<div class="swiper-wrapper">
								<div class="swiper-slide" v-for="(item, idx) in room">
									<div class="bodyInfo flexBox" :class="tagList[item.labStatus].class">
										<p class="tag" :class="tagList[item.labStatus].class">
											<!-- {{ tagList[item.labStatus].txt }} -->
										</p>
										<p class="name txtOver">
											<span>{{ item.labName }}</span>
										</p>
										<p class="type">{{ item.labStatus }}</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="onLine">
						<p class="title">在线监测</p>
						<div class="roomTxt">
							{{ room && room[roomIdx] ? room[roomIdx].labName : "" }}
						</div>
						<ul class="tagList row flexBox" v-if="onLine.sensorInfo">
							<li class="flexBox">
								<img src="../assets/img/icon_2_new.png" class="icon" />
								<div class="info">
									<p class="val" :class="onLine.sensorInfo.temperatureState == '异常'
											? 'active'
											: ''
										">
										{{
											onLine && Boolean(onLine.sensorInfo)
											? onLine.sensorInfo.temperature
											: "--"
										}}
									</p>
									<p class="name">温度</p>
								</div>
							</li>
							<li class="flexBox">
								<img src="../assets/img/icon_3_new.png" class="icon" />
								<div class="info">
									<p class="val" :class="onLine.sensorInfo.humidityState == '异常' ? 'active' : ''
											">
										{{
											onLine && Boolean(onLine.sensorInfo)
											? onLine.sensorInfo.humidity
											: "--"
										}}
									</p>
									<p class="name">湿度</p>
								</div>
							</li>
							<li class="flexBox">
								<img src="../assets/img/icon_4_new.png" class="icon" />
								<div class="info">
									<p class="val" :class="onLine.sensorInfo.illuminationState == '异常'
												? 'active'
												: ''
											">
										{{
											onLine && Boolean(onLine.sensorInfo)
											? onLine.sensorInfo.illumination
											: "--"
										}}
									</p>
									<p class="name">光照</p>
								</div>
							</li>
							<li class="flexBox">
								<img src="../assets/img/icon_5_new.png" class="icon" />
								<div class="info">
									<p class="val" :class="onLine.sensorInfo.electromagnetismState == '异常'
												? 'active'
												: ''
											">
										{{
											onLine && Boolean(onLine.sensorInfo)
											? onLine.sensorInfo.electromagnetism
											: "--"
										}}
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
						<div class="swiper">
						<!-- <div class="swiper" v-show="onLineRows"> -->
							<div class="swiper-wrapper" id="onLineSwiper">
								<div class="swiper-slide">
									<ul class="swiperBody row" v-for="(item, idx) in onLine.rows"
										@click="clickJump(item, idx)">
										<li class="txtOver">{{ item.equipName }}</li>
										<li class="txtOver">{{ item.taskName }}</li>
										<li :class="equipState[item.equipState]">
											{{ item.equipState }}
										</li>
										<li class="txtOver">{{ item.projectName }}</li>
										<li>{{ item.checker }}</li>
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
					<div class="content">
						<div style="color: #45c2ff">合格率：{{ (passRate * 100).toFixed(2) }}%</div>
						<div style="color: #ffd635">不合格率：{{ ((1 - passRate) * 100).toFixed(2) }}%</div>
					</div>
					<div class="echarts" id="quality"></div>
				</div>
				<div class="data">
					<p class="title">数据监测</p>
					<div class="roomTxt">
						{{ room && room[roomIdx] ? room[roomIdx].labName : "--" }}
					</div>
					<div id="dataWatch">
						<div class="box" v-for="item in dataList">
							<div class="tag">
								<p>{{ item.equipName }}</p>
							</div>
							<div class="bodyInfo">
								<p class="name">基本信息</p>
								<div class="info">
									<ul class="type flexBox">
										<li>当前检定项目</li>
										<li>
											<span>{{ item.projectName }}</span>
										</li>
									</ul>
									<ul class="type flexBox">
										<li>检定人员</li>
										<li>
											<span>{{ item.checker }}</span>
										</li>
									</ul>
								</div>
								<p class="name" style="margin-top: 0.8rem">实时数据</p>
								<ul class="list row">
									<li>
										Ua<span>{{ item.Ua ? item.Ua : "--" }}</span>
									</li>
									<li>
										Ia<span>{{ item.La ? item.La : "--" }}</span>
									</li>
									<li>
										φa<span>{{ item.phia ? item.phia : "--" }}</span>
									</li>
									<li>
										Ub<span>{{ item.Ub ? item.Ub : "--" }}</span>
									</li>
									<li>
										Ib<span>{{ item.Lb ? item.Lb : "--" }}</span>
									</li>
									<li>
										φb<span>{{ item.phib ? item.phib : "--" }}</span>
									</li>
									<li>
										Uc<span>{{ item.Uc ? item.Uc : "--" }}</span>
									</li>
									<li>
										Ic<span>{{ item.Lc ? item.Lc : "--" }}</span>
									</li>
									<li>
										φc<span>{{ item.phic ? item.phic : "--" }}</span>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import "echarts-gl";
import Swiper, { Autoplay, Grid } from "swiper";
Swiper.use([Autoplay, Grid]);
import GlobalInfo from "@/components/GlobalInfo.vue";
export default {
	name: "Index",
	data() {
		return {
			refresh: 0,
			tempObj: {},
			isShow: false,
			passRate: 0,
			time: "",
			unusual: [],
			check: [],
			tagList: {
				正在使用: {
					class: "green",
					txt: "使用",
				},
				闲置待用: {
					class: "yellow",
					txt: "待用",
				},
				故障维修: {
					class: "red",
					txt: "维修",
				},
			},
			equipState: {
				空闲: "green",
				运行: "green",
				维修: "yellow",
				保养: "yellow",
				关机: "red",
				异常: "red",
			},
			roomIdx: 0,
			room: null,
			roomIdx: 0,
			onLine: {},
			onLineRows: false,
			dataList: [],
			hideTime: 1,
		};
	},
	mounted() {
		this.getData();
		this.updateTime();
		this.updateData();
	},
	destroyed() {
		if (this.tempObj.data) {
			clearInterval(this.tempObj.data);
		}
		if (this.tempObj.timer) {
			clearInterval(this.tempObj.timer);
		}
	},
	methods: {
		getData() {
			this.$request("get", "/bigScreen/laboratoryInfo").then((res) => {
				this.room = res.data;
				this.room = [
				  {
				    labNo: "2303",
				    labName: "2303实验室",
				    labStatus: "闲置待用",
				  },
				  {
				    labNo: "2304",
				    labName: "2304实验室",
				    labStatus: "正在使用",
				  },
				  {
				    labNo: "2308",
				    labName: "2308实验室",
				    labStatus: "故障维修",
						errNum:'12'
				  },
				  {
				    labNo: "2309",
				    labName: "2309实验室",
				    labStatus: "正在使用",
				  },
				  {
				    labNo: "2311",
				    labName: "2311实验室",
				    labStatus: "正在使用",
				  },
				  {
				    labNo: "2313",
				    labName: "2313实验室",
				    labStatus: "正在使用",
				  },
				];
				this.$nextTick(() => {
					this.updateVerticalSwiper(
						"room",
						6,
						this.room.length < 6 ? false : true
					);
				});
				this.updateOnLine();
			});
			this.$request("get", "/bigScreen/durationLock").then((res) => {
				this.hideTime = res.data;
				if (this.hideTime) {
					this.updateHide();
				}
			});
			this.$request("get", "/bigScreen/sensorErrorInfo").then((res) => {
				this.unusual = res.data;
				this.unusual = [
					{
						"durationTime": "273.00小时",
						"sensorType": "光照超标",
						"labName": "2303实验室",
						"updateTime": "2023-12-03 14:00:00"
					},
					{
						"durationTime": "273.00小时",
						"sensorType": "温度超标",
						"labName": "2303实验室",
						"updateTime": "2023-12-03 14:00:00"
					},
					{
						"durationTime": "273.00小时",
						"sensorType": "湿度不达标",
						"labName": "2308实验室",
						"updateTime": "2023-12-03 14:00:00"
					}
				]
				this.$nextTick(() => {
					this.updateVerticalSwiper(
						"unusualSwiper",
						4,
						this.unusual.length < 4 ? false : true
					);
				});
			});

			this.$request("post", "/bigScreen/personnelInfo", {}).then((res) => {
				this.check = res.data;
				this.check = [
					{
						"personnelName": "江*涛",
						"post": "电能,"
					},
					{
						"personnelName": "江正涛",
						"userStatus": "正常",
						"post": "电能,电阻,"
					},
					{
						"personnelName": "张三",
						"post": "电能,"
					},
					{
						"personnelName": "李四",
						"post": "电阻,"
					}
				];
				this.$nextTick(() => {
					this.updateVerticalSwiper(
						"check",
						3,
						this.check.length < 3 ? false : true
					);
				});
			});

			if (this.refresh % 3 === 0) {
				this.$request("get", "/bigScreen/capacity").then((res) => {
					this.updateCapacity("capacity", res.data);
				});
				this.$request("get", "/bigScreen/qualityInfo").then((res) => {
					this.updateQuality("quality", res.data);
				});
			}
		},
		updateHide() {
			if (!this.tempObj.hide) {
				this.tempObj.hide = setTimeout(() => {
					this.isShow = true;
				}, this.hideTime * 1000);
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
				this.getData();
				this.refresh++;
				if (this.refresh > 50) {
					location.reload();
				}
			}, GlobalInfo.updatePage);
		},
		updateTime() {
			this.time = this.$tools.coverTimeToFormat(this.$tools.getTime());
			this.tempObj.timer = setInterval(() => {
				this.time = this.$tools.coverTimeToFormat(this.$tools.getTime());
			}, 1000);
		},
		updateCapacity(val, data) {
			  data = [
					{
						"num": 156
					},
					{
						"equipType": "标准表",
						"num": 12
					},
					{
						"equipType": "电能表",
						"num": 12
					}
				];
			if (this.tempObj[val] == undefined) {
				this.tempObj[val] = this.$echarts.init(document.getElementById(val));
			}

			let xData = [];
			let list = [];
			data.forEach(ele => {
				if (ele.equipType) {
					xData.push(ele.equipType)
					list.push({
						name: ele.equipType,
						value: ele.num,
					})
				}
			});
			let option = this.$myCharts.cylinderOption(xData, list);
			this.$tools.updateEcharts(this.tempObj[val], option);
		},
		updateQuality(name, data) {
			data = {
				"qualified": 50,
				"unqualified": 23,
				"passRate": "0.6849"
			};
			if (this.tempObj[name] == undefined) {
				this.tempObj[name] = this.$echarts.init(document.getElementById(name));
			}
			this.passRate = Number(data.passRate)
			// 传入数据生成 option
			let option = this.$myCharts.getPie3D(
				[
					{
						name: "合格",
						value: Number(data.qualified),
						itemStyle: {
							color: "#45c2ff",
						},
					},
					{
						name: "不合格",
						value: Number(data.unqualified),
						itemStyle: {
							color: "#ffd635",
						},
					},
				],
				0.59
			);
			this.$tools.updateEcharts(this.tempObj[name], option);
		},
		changeRoomIdx(idx) {
			this.roomIdx = idx;
			this.updateOnLine();
		},
		updateOnLine() {
			let msg = this.room[this.roomIdx];
			this.onLineRows = false
			this.onLine.sensorInfo = {
				"illuminationState": "正常",
				"illumination": " 3300lux",
				"electromagnetism": "100mg/L",
				"electromagnetismState": "正常",
				"temperature": " 25℃",
				"humidityState": "正常",
				"humidity": " 55%RH",
				"temperatureState": "正常"
			}
			this.onLine.rows = [
				{
					"equipName": "单相电能表检定装置",
					"equipNo": "2309##004##GN002",
					"taskName": "1202002",
					"checker": "江正涛",
					"projectDetailName": "Q+ 合元 0.8C 1.0Ib 基本误差",
					"equipState": "运行",
					"projectName": "基本误差"
				},
				{
					"equipName": "三相电能表检定装置",
					"equipNo": "2309##004##HP003",
					"taskName": "1202002",
					"checker": "江正涛",
					"projectDetailName": "Q+ 合元 0.8C 1.0Ib 基本误差",
					"equipState": "运行",
					"projectName": "基本误差"
				}
			]
			this.$request(
				"post",
				"/bigScreen/onlineLab",
				{
					labNo: msg.labNo,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			).then((res) => {
				this.onLine.sensorInfo = res.data.sensorInfo
				this.$request(
					"post",
					"/bigScreen/online",
					{
						labNo: msg.labNo,
					},
					{
						headers: {
							"Content-Type": "application/json",
						},
					}
				).then((res) => {
					this.onLine.rows = res.data.rows;
					if (this.tempObj.onLineSwiper) {
						this.tempObj.onLineSwiper.destroy();
						this.tempObj.onLineSwiper = null;
					}
				}).finally(() => {
					this.$nextTick(() => {
						this.updateVerticalSwiper(
							"onLineSwiper",
							4,
							this.onLine.rows.length < 4 ? false : true
						);
					});
					this.onLineRows = true
				});
			})

			this.$request(
				"post",
				"/bigScreen/equipDataInfo",
				{
					labNo: msg.labNo,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			).then((res) => {
				this.dataList = res.data;
				console.log(res);
				this.dataList = [
					{
						"equipName": "三相电能表检定装置",
						"phia": "0.00",
						"phib": "240.00",
						"phic": "120.00",
						"checker": "江正涛",
						"Ua": "219.99",
						"Ub": "220.01",
						"Uc": "220.10",
						"La": "5.01",
						"Lb": "4.99",
						"Lc": "4.98",
						"equipNo": "2303##001##GN001",
						"projectName": "Q+ 合元 0.8C 1.0Ib 基本误差"
					},
					{
						"equipName": "三相标准表检定装置",
						"phia": "0.00",
						"phib": "240.00",
						"phic": "120.00",
						"checker": "江正涛",
						"Ua": "99.99",
						"Ub": "100.01",
						"Uc": "99.10",
						"La": "5.01",
						"Lb": "4.99",
						"Lc": "4.98",
						"equipNo": "2303##001##HP001",
						"projectName": "Q+ 合元 0.8C 1.0Ib 基本误差"
					},
					{
						"equipName": "三相标准表检定装置",
						"phia": "0.00",
						"phib": "240.00",
						"phic": "120.00",
						"checker": "江正涛",
						"Ua": "100.99",
						"Ub": "99.01",
						"Uc": "100.10",
						"La": "4.99",
						"Lb": "4.99",
						"Lc": "4.98",
						"equipNo": "2303##001##HP002",
						"projectName": "Q+ 合元 0.8C 1.0Ib 基本误差"
					},
					{
						"equipName": "功率电能表标准装置",
						"phia": "0.00",
						"phib": "240.00",
						"phic": "120.00",
						"checker": "江正涛",
						"Ua": "99.99",
						"Ub": "99.01",
						"Uc": "100.10",
						"La": "4.99",
						"Lb": "4.99",
						"Lc": "4.98",
						"equipNo": "2303##001##ZERA001",
						"projectName": "Q+ 合元 0.8C 1.0Ib 基本误差"
					}
				].slice(0, 2)

			});
		},
		clickJump(item, idx) {
			this.$router.push({
				path: "/facilities",
				query: {
					equipName: item.equipName
				}
			});
		},
		updateVerticalSwiper(name, num, type) {
			if (!this.tempObj[name]) {
				this.tempObj[name] = new Swiper("#" + name, {
					direction: "vertical",
					slidesPerView: num,
					loop: type,
					autoplay: {
						delay: 3000,
						disableOnInteraction: false,
					},
				});
			}
		},
	},
};
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
