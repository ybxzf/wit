<template>
	<a-config-provider :locale="zh_CN">
		<div id="app" @contextmenu="showContextMenu">
			
			<router-view></router-view>
		</div>
	</a-config-provider>
</template>

<script>
	import zh_CN from "ant-design-vue/lib/locale-provider/zh_CN";

	export default {
		name: 'app',
		data() {
			return {
				zh_CN
			}
		},
		methods: {
			showContextMenu(event) {
				event.preventDefault();
			}
		}
	}
</script>

<style>
	#app {
		width: 100%;
		height: 100%;
		min-height: 100%;
	}
</style>