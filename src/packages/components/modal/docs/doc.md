## Modal

### 基础用法

```vue demo
<template>
  <div>
    <a-button type="primary" @click="showModal">Open Modal</a-button>
    <fl-modal v-model:open="open" title="Basic Modal" @ok="handleOk" okText="确定" cancelText="取消">
      <!-- <template #footer>
        <a-button type="primary" @click="handleOk">111</a-button>
      </template> -->
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </fl-modal>
  </div>
</template>
<script lang="ts">
import { Button } from 'ant-design-vue'
import { ref } from 'vue';

export default {
    components: {
        [Button.name]: Button,
    },
    setup() {
        const open = ref<boolean>(false);

        const showModal = () => {
            open.value = true;
        };

        const handleOk = (e: MouseEvent) => {
            console.log(e)
            open.value = false;
        };

        return {
            open,
            showModal,
            handleOk
        }
    }
}


</script>
```



## API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| afterClose | Modal 完全关闭后的回调 | function | - |  |
| bodyStyle | Modal body 样式 | object | {} |  |
| cancelButtonProps | cancel 按钮 props | [ButtonProps](/components/button/#api) | - |  |
| cancelText | 取消按钮文字 | string\| slot | 取消 |  |
| centered | 垂直居中展示 Modal | boolean | `false` |  |
| closable | 是否显示右上角的关闭按钮 | boolean | true |  |
| closeIcon | 自定义关闭图标 | VNode \| slot | - |  |
| confirmLoading | 确定按钮 loading | boolean | - |  |
| destroyOnClose | 关闭时销毁 Modal 里的子元素 | boolean | false |  |
| footer | 底部内容，当不需要默认底部按钮时，可以设为 `:footer="null"` | string\|slot | 确定取消按钮 |  |
| forceRender | 强制渲染 Modal | boolean | false |  |
| getContainer | 指定 Modal 挂载的 HTML 节点 | (instance): HTMLElement | () => document.body |  |
| keyboard | 是否支持键盘 esc 关闭 | boolean | true |  |
| mask | 是否展示遮罩 | boolean | true |  |
| maskClosable | 点击蒙层是否允许关闭 | boolean | true |  |
| maskStyle | 遮罩样式 | object | {} |  |
| okButtonProps | ok 按钮 props | [ButtonProps](/components/button/#api) | - |  |
| okText | 确认按钮文字 | string\|slot | 确定 |  |
| okType | 确认按钮类型 | string | primary |  |
| title | 标题 | string\|slot | - |  |
| open(v-model) | 对话框是否可见 | boolean | - |  |
| width | 宽度 | string\|number | 520 |  |
| wrapClassName | 对话框外层容器的类名 | string | - |  |
| zIndex | 设置 Modal 的 `z-index` | number | 1000 |  |

### 事件

| 事件名称 | 说明                                 | 回调参数    |
| -------- | ------------------------------------ | ----------- |
| cancel   | 点击遮罩层或右上角叉或取消按钮的回调 | function(e) |
| ok       | 点击确定回调                         | function(e) |

#### 注意

> `<Modal />` 默认关闭后状态不会自动清空, 如果希望每次打开都是新内容，请设置 `destroyOnClose`。

### Modal.method()

包括：

- `Modal.info`
- `Modal.success`
- `Modal.error`
- `Modal.warning`
- `Modal.confirm`

以上均为一个函数，参数为 object，具体属性如下：

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| appContext | 弹窗的上下文，一般用于获取全局注册组件、vuex 等内容 | - | - |  |
| autoFocusButton | 指定自动获得焦点的按钮 | `null` \| `ok` \| `cancel` | `ok` |  |
| cancelButtonProps | cancel 按钮 props | [ButtonProps](/components/button) | - |  |
| cancelText | 取消按钮文字 | string | 取消 |  |
| centered | 垂直居中展示 Modal | boolean | `false` |  |
| class | 容器类名 | string | - |  |
| closable | 是否显示右上角的关闭按钮 | boolean | `false` |  |
| content | 内容 | string \|VNode \|function() | - |  |
| footer | 底部内容，当不需要默认底部按钮时，可以设为 `footer: null` | string \|VNode \|function() | - | 4.0.0 |
| icon | 自定义图标（1.14.0 新增） | VNode \| ()=>VNode | - |  |
| keyboard | 是否支持键盘 esc 关闭 | boolean | true |  |
| mask | 是否展示遮罩 | boolean | true |  |
| maskClosable | 点击蒙层是否允许关闭 | boolean | `false` |  |
| okButtonProps | ok 按钮 props | [ButtonProps](/components/button) | - |  |
| okText | 确认按钮文字 | string | 确定 |  |
| okType | 确认按钮类型 | string | primary |  |
| title | 标题 | string\|VNode \|function() | - |  |
| width | 宽度 | string\|number | 416 |  |
| wrapClassName | 对话框外层容器的类名 | string | - | 3.2.3 |
| zIndex | 设置 Modal 的 `z-index` | number | 1000 |  |
| onCancel | 取消回调，参数为关闭函数，返回 promise 时 resolve 后自动关闭 | function | - |  |
| onOk | 点击确定回调，参数为关闭函数，返回 promise 时 resolve 后自动关闭 | function | - |  |

以上函数调用后，会返回一个引用，可以通过该引用更新和关闭弹窗。


