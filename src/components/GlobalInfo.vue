/**
* 全局配置
*/
<script>
export default {
	/**
	 * HTTP地址
	 */
	HTTPURL: "http://47.108.165.207/api",
	// HTTPURL: "http://192.168.100.199/api",
	// HTTPURL:"",
	/**项目名称*/
	projectName: "wit",
	/**
	 * 账号信息
	 */
	account: {
		username: "",
		password: ""
	},
	/**
	 * 适配
	 */
	fitData:{
		/**
		 * 屏幕大小
		 */
		windowSize:{
			width:1920,
		},
		/**
		 * 参考字体号
		 */
		fontSize:14
	},
	/**
	 * 页面刷新率
	 */
	updatePage: 10000,
	/**
	 * Token失效后打开的页面
	 */
	tokenPastDueToPage: "/login",
};
</script>
