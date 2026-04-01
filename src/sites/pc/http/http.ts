declare var cdnFl: any;

import domain from './config';
import { whiteList } from './white-list';

// @ts-ignore
const requestHost = domain().requestHost;

/**
 * 校验白名单
 * @param url
 * @returns
 */
function whiteListFun(url: string) {
  return whiteList.some((item) => url.includes(item));
}

/**
 * 成功函数
 * @param response
 * @returns
 */
function succesResponse(response: any) {
  const data: any = response.data;

  if (data.status === 401 || data.status === 4011 || data.status === 405) {
    if (whiteListFun(response.config.url)) {
      return false;
    }
  }
}

/**
 * 处理header部分
 * @param config
 */
function dynamicHeader(config: any) {
  let header: any = {
    language: '',
    api: 'v4'
  };

  const token = cdnFl.localData('get', 'LOCAL_TOKEN');

  if (token && !config.url.includes('/auth/refresh_token')) {
    header.Authorization = token;
  }
  // 获取浏览器当前时区
  let timeZoneNum = new Date().getTimezoneOffset() / -60;

  if (timeZoneNum >= 0) {
    header.timeZone = 'GMT+' + timeZoneNum;
  } else {
    header.timeZone = 'GMT' + timeZoneNum;
  }

  return header;
}

const errorResponse = (e: any, options: any) => {
  if (e.response && e.response.status == 403) {
    window.location.href = '/login';
  }
};

/**
 * 处理 request 部分
 * @param config
 * @param options
 */
// function succesRequest(config: any, options: any) {}

const $fetch = new cdnFl.flFetch(
  {
    baseURL: requestHost,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  },
  {
    // succesRequest,
    dynamicHeader: dynamicHeader,
    succesResponse,
    errorResponse
  }
);

// 导出 axios service 部分 同 原fetch
export default $fetch.axiosService;
