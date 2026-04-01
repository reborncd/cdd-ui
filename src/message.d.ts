/*
 * @Author: xiehaojie
 * @Date: 2025-05-20 09:37:55
 * @LastEditors: xiehaojie
 * @LastEditTime: 2025-05-20 09:38:13
 * @Description: edit
 * @version: 1.0
 */
// types/message.d.ts
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
      $message: {
        success: (content: string, duration?: number) => void;
        error: (content: string, duration?: number) => void;
        info: (content: string, duration?: number) => void;
        warning: (content: string, duration?: number) => void;
      };
    }
  }