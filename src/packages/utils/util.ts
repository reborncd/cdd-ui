import { isString } from '@vue/shared';

export const isNumber = (val: unknown): val is number => typeof val === 'number';

export const SCOPE = 'Util';

/**
 * @param value
 * @returns
 */
export function addUnit(value: string | number) {
  if (isString(value)) {
    return value;
  } else if (isNumber(value)) {
    return `${value}px`;
  }
  console.warn(SCOPE, 'binding value must be a string or number');
  return '';
}

/**
 * 生产 uuid
 * @returns
 */
export function uuid() {
  let s: any[] = [];
  let hexDigits = '0123456789abcdef';
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = '4';
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
  s[8] = s[13] = s[18] = s[23] = '-';

  let uuidA = s.join('');
  return uuidA;
}

/**
 * 获取某个对象的 key
 * @param object
 * @param path
 * @returns
 */
export function getObjectValueByPath(object: Object, path: string) {
  return path.split('.').reduce((accumulator: any, currentKey: string) => {
    return (accumulator || {})[currentKey];
  }, object);
}

/**
 * 设置某个对象的 key
 * @param object
 * @param path
 * @param value
 */
export function setObjectValueByPath(object: Object, path: string, value: string | number | undefined | null) {
  const keys = path.split('.');
  const lastKey: any = keys.pop(); // 获取最后一个键
  const targetObject = keys.reduce((accumulator: any, currentKey: string) => {
    // 确保每一层都有对象
    if (!accumulator[currentKey]) {
      accumulator[currentKey] = {};
    }
    return accumulator[currentKey];
  }, object);
  targetObject[lastKey] = value; // 设置新的值
}

/**
 * 函数防抖
 * @param func
 * @param wait
 */
export function debounce(func: Function, wait: number = 300) {
  let timeout: any;
  return function (...args: any) {
    // 清除之前的定时器
    clearTimeout(timeout);
    // 设置新的定时器
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}
export function sessionData(method: string, name: string, obj: any) {
  /*
   * 参数说明：
   * method：get获取，set存入或覆盖，clean清除
   * name:session的名称
   * obj:存入的内容，可以是任意类型
   * */
  switch (method) {
    case 'get':
      if (sessionStorage.getItem(name + '_obj')) {
        // @ts-ignore
        return JSON.parse(sessionStorage.getItem(name + '_obj'));
      } else if (sessionStorage.getItem(name + '_str')) {
        return sessionStorage.getItem(name + '_str');
      } else {
        return null;
      }
    case 'set':
      // @ts-ignore
      sessionData('clean', name);
      if (typeof obj === 'object') {
        sessionStorage.setItem(name + '_obj', JSON.stringify(obj));
      } else {
        sessionStorage.setItem(name + '_str', obj);
      }
      return true;
    case 'clean':
      sessionStorage.removeItem(name + '_obj');
      sessionStorage.removeItem(name + '_str');
      return true;
  }
}

export const mergeForm = (form: object | any, data: object | any) => {
  try {
    if (!data || Object.keys(data).length === 0) return form; // 如果data为空，则直接返回form
    form.controls.forEach((item: any) => {
      data.controls.forEach((item2: any) => {
        if (item.key === item2.key) {
          item.propsData.value = item2.propsData.value;
          item.operatorOptions.operator = item2.operatorOptions.operator;
        }
      });
    });
    return form;
  } catch (error) {
    return form;
  }
};
