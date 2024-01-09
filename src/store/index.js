import { defineStore } from 'pinia' //引入

const useDeviceStore = defineStore('deviceStatus', {
    // arrow function recommended for full type inference
    state: () => {
        return {
            status: '',
        }
    },
    // 相当于 vue 中的 methods 方法
    actions: {
        updateStatus(newStatus) {
            this.status = newStatus;
        }
    }
})
export default useDeviceStore //导出
