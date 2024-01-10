import { defineStore } from 'pinia' //引入

const useDeviceStore = defineStore('device-status', {
    // arrow function recommended for full type inference
    state: () => {
        return {
            status: '空闲',
        }
    },
    // 相当于 vue 中的 methods 方法
    actions: {
        updateStatus(newStatus) {
            this.status = newStatus.trim() || '空闲';
            // console.log('调用状态方法更新',this.status);
        }
    }
})
export default useDeviceStore //导出
