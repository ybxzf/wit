<script>
	import GlobalInfo from '../GlobalInfo.vue';
	export default {
		/**
		 * 设置Session
		 * @param {Object} data
		 */
		setSessionStorage(data) {
			window.sessionStorage.setItem(GlobalInfo.projectName, data);
		},
		/**
		 * 获取Session
		 */
		getSessionStorage() {
			return window.sessionStorage.getItem(GlobalInfo.projectName)
		},
		/**
		 * 清理Session
		 */
		clearSessionStorage() {
			window.sessionStorage.clear()
		},
		/**
		 * 图片转换Base64
		 * @param {Object} img
		 * @param {Object} call
		 */
		coverImgToBase64(img, call) {
			const reader = new FileReader();
			reader.addEventListener('load', () => call(reader.result));
			reader.readAsDataURL(img);
		},
		/**
		 * 转换时间为01
		 * @param {Object} m
		 */
		coverTime(m) {
			return m < 10 ? '0' + m : m
		},
		/**
		 * 转换时间为年-月-日 时：分：秒
		 * @param {Object} seconds
		 */
		coverTimeToFormat(seconds) {
			var time = new Date(seconds);
			var y = time.getFullYear();
			var m = time.getMonth() + 1;
			var d = time.getDate();
			var h = time.getHours();
			var mm = time.getMinutes();
			var s = time.getSeconds();
			var week = {
			  0: '星期天',
			  1: '星期一',
			  2: '星期二',
			  3: '星期三',
			  4: '星期四',
			  5: '星期五',
			  6: '星期六'
			 };
			return y + '-' + this.coverTime(m) + '-' + this.coverTime(d) + "　"+ this.coverTime(h) + ':' + this.coverTime(
				mm);
		},
		/**
		 * 获取fontSize的文字大小
		 * @param {Object} num
		 */
		getFitSize(num) {
			var clientWidth = document.documentElement.scrollWidth;
			return GlobalInfo.fitData.fontSize * (clientWidth / GlobalInfo.fitData.windowSize.width) * num
		},
		/**
		 * 获取时间
		 */
		getTime() {
			return Date.parse(new Date())
		},
		/**数组转换为对象 */
		coverArrToObject(arr, key) {
			var data = {};
			if (arr) {
				arr.forEach((res) => {
					data[res[key]] = res
				})
			};
			return data
		},
		/**刷新echarts*/
		updateEcharts(e, option) {
			setTimeout(()=>{
				e.resize();
				e.setOption(option, true);
				window.addEventListener("resize", () => {
					e.resize()
				})
			},200)
		},
		/**深拷贝*/
		clone(sObj) {
			if (sObj === null || typeof sObj !== "object") {
				return sObj
			};
	
			let s = {};
			if (sObj.constructor === Array) {
				s = []
			};
	
			for (let i in sObj) {
				if (sObj.hasOwnProperty(i)) {
					s[i] = this.clone(sObj[i])
				}
			};
	
			return s
		},
	};
</script>