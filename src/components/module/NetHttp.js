/**
 * 通讯类
 */
import axios from 'axios';
import GlobalInfo from '../GlobalInfo.vue';
import tools from './tools.vue';
import {
	message
} from 'ant-design-vue';
axios.defaults.timeout = 10000;
// axios.defaults.baseURL = "/base/";

/**
 * 正常请求
 * @param {*请求类型:post、get、put、del} type 
 * @param {*请求URL地址} url 
 * @param {*数据} data 
 */
export function request(type, url, data = {},headrs) {
	axios.defaults.baseURL = GlobalInfo.HTTPURL;
	return new Promise((resolve, reject) => {
		axios[type](url, data,headrs).then(res => {
			if (res.data.code != 0) {
				message.error(res.data.message)
			} else {
				resolve(res.data)
			}
		}, err => {
			resolve(err)
		})
	})
};

/**
 * 正常请求
 * @param {*请求类型:post、get、put、del} type 
 * @param {*请求URL地址} url 
 * @param {*数据} data 
 */
export function requestSys(type, url, data = {},headrs) {
	axios.defaults.baseURL = GlobalInfo.BaseExecUrl;
	return new Promise((resolve, reject) => {
		axios[type](url, data,headrs).then(res => {
			if (res.data.code != 0) {
				message.error(res.data.message)
			} else {
				resolve(res.data)
			}
		}, err => {
			resolve(err)
		})
	})
};
