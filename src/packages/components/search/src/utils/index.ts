/*
 * @Author: 杨亚茹
 * @Date: 2025-01-17 10:23:45
 * @LastEditors: 杨亚茹
 * @LastEditTime: 2025-04-08 18:31:42
 * @FilePath: /iflorens-web-ui/src/packages/components/search/src/utils/index.ts
 * @Description: 
 */
/**
 * 合并 form
 * @param form
 * @param data
 * @returns
 */
export const mergeForm = (form: object | any, data: object | any) => {
  try {
    if (!data || Object.keys(data).length === 0) return form; // 如果data为空，则直接返回form
    form.controls.forEach((item: any) => {
      data.controls.forEach((item2: any) => {
        if (item.key === item2.key) {
          item.propsData.value = item2.propsData.value || [];
          item.operatorOptions.operator = item2.operatorOptions.operator;
        }
      });
    });
    return form;
  } catch (error) {
    return form;
  }
};
