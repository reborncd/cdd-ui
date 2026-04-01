const version = 1.0;
const INSTALLED_KEY = Symbol('INSTALLED_KEY');
import type { App, Plugin } from 'vue';
import type { ConfigProviderContext } from '../tokens';
// import UserGuide from '../components/tour/tour';

/**
 * 注册组件
 * @param components
 * @returns
 */
export const makeInstaller = (components: any) => {
  // customElements.define("i-user-guide", UserGuide);
  const install = (app: any, options: any = {}) => {
    if (app[INSTALLED_KEY]) return;

    app[INSTALLED_KEY] = true;
    components.forEach((c: any) => app.use(c));
    app.config.globalProperties.$UI = options;
  };
  return {
    install,
    version,
    ...components
  };
};
