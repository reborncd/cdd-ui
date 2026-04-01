
// message.ts
import type { App, Plugin } from 'vue';
import { message as antdMessage } from 'ant-design-vue';
import { h } from 'vue';

const version = '1.0.0';
const INSTALLED_KEY = Symbol('INSTALLED_KEY');

type MessageType = 'success' | 'error' | 'info' | 'warning';

const createClosableMessage = (type: MessageType, content: string, duration?: number) => {
  let removeFn: () => void;
  
  const closeBtn = h('span', {
    class: 'ant-message-close',
    onClick: () => removeFn?.()
  }, '×');

  const contentNode = h('div', { class: 'custom-message' }, [
    h('span', content),
    closeBtn
  ]);
  removeFn = antdMessage[type]({
    content: contentNode,
    duration: duration ?? 3,
    class: `closable-message closable-message-${type}` // 增加类型后缀
  });
};

const Message: Plugin = {
  install(app: App) {
    if (app[INSTALLED_KEY]) return;
    app[INSTALLED_KEY] = true;

    const message = {
      success: (c: string, d?: number) => createClosableMessage('success', c, d),
      error: (c: string, d?: number) => createClosableMessage('error', c, d),
      info: (c: string, d?: number) => createClosableMessage('info', c, d),
      warning: (c: string, d?: number) => createClosableMessage('warning', c, d)
    };

    // 双通道注入
    app.config.globalProperties.$message = message;
    app.provide('message', message);
  },
  version
};

// 适配 makeInstaller 的导出方式
export default Message;

// 单独导出安装器
export const makeInstaller = (components: Plugin[] = []) => {
  const install = (app: App, options: Record<string, any> = {}) => {
    if (app[INSTALLED_KEY]) return;
    app[INSTALLED_KEY] = true;

    // 安装所有组件
    components.forEach(component => {
      app.use(component);
    });

    // 挂载全局配置
    if (options) {
      app.config.globalProperties.$UI = options;
    }
  };

  return {
    install,
    version,
    ...components
  };
};

// 类型声明
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $message: {
      success: (content: string, duration?: number) => void;
      error: (content: string, duration?: number) => void;
      info: (content: string, duration?: number) => void;
      warning: (content: string, duration?: number) => void;
    };
    $UI?: Record<string, any>;
  }
}