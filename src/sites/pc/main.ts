/*
 * @Author: xiehaojie
 * @Date: 2025-04-28 16:36:30
 * @LastEditors: xiehaojie
 * @LastEditTime: 2025-05-20 10:12:15
 * @Description: edit
 * @version: 1.0
 */
import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';
import '../assets/style/index.scss';

import UI from '../../packages/main/index';
// import UI from '../../../libs/lui.es.js'
import '../../packages/main/style';
import '../../packages/theme-chalk/variables.scss';
import 'ant-design-vue/dist/reset.css';
import 'vxe-table/lib/style.css';
import 'vxe-pc-ui/lib/style.css';
import Message from '../../packages/components/message/src/message';
import { VxeGrid } from 'vxe-table';
import { VxePager } from 'vxe-pc-ui';
import { VxeUI } from 'vxe-table';
import esUs from 'vxe-table/lib/locale/lang/en-US';
// console.log(esUs);
esUs.vxe.pager.total = `Total {0} items`;
esUs.vxe.pager.pagesize = `{0}/Page`;
VxeUI.setI18n('en-Us', esUs);
VxeUI.setLanguage('en-Us');
// table分页自定义配置国际化
// VxeUI.setConfig({
//   i18n: (key: string, args: any) => {
//     switch (key) {
//       case 'vxe.pager.total':
//         return `Total ${args} items`;
//       case 'vxe.pager.pagesize':
//         return `${args}/Page`;
//       default:
//         return '';
//     }
//   }
// });
// import { ConfigProvider } from 'ant-design-vue';

 
let app = createApp(App);
// app.use(ConfigProvider, {
//   prefixCls: 'iflorens'
// });

app.use(Message);
// app.use(Antd);
app.use(UI);

app.use(VxeGrid);
app.use(VxePager);

app.use(router);
app.mount('#app');
