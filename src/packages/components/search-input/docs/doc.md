## SearchInput

### 基础用法


```vue demo
<template>
    <!-- <a-button style="margin-bottom: 10px;" @click="ceshi">测试</a-button> -->
    <cdd-search-input @onInput="input" v-model="value" placeholder="input search" :allowClear="true"></cdd-search-input>
</template>
<script lang="ts">
import { defineComponent, ref, h, getCurrentInstance } from 'vue'

export default {
  setup() {
    const value = ref('')
    const ceshi = () => {
      console.log(value)
    }
    const input = (e) => {
      console.log(e)
    }
    return {
      value,
      ceshi,
      input
    }
  },
};
</script>
```

### Input


| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| iconObj | 图标 | object | { icon: 'iflorens-Search', iconStyle: { fontSize: '14px', color: 'rgba(0, 0, 0, 0.25)' } } |  |
| addonAfter | 带标签的 input，设置后置标签 | string\|slot |  |  |
| addonBefore | 带标签的 input，设置前置标签 | string\|slot |  |  |
| allowClear | 可以点击清除图标删除内容 | boolean |  |  |
| bordered | 是否有边框 | boolean | true | 3.0 |
| clearIcon | 自定义清除图标 （allowClear 为 true 时生效） | slot | `<CloseCircleFilled />` | 3.3.0 |
| defaultValue | 输入框默认内容 | string |  |  |
| disabled | 是否禁用状态，默认为 false | boolean | false |  |
| id | 输入框的 id | string |  |  |
| maxlength | 最大长度 | number |  | 1.5.0 |
| prefix | 带有前缀图标的 input | string\|slot |  |  |
| showCount | 是否展示字数 | boolean | false | 3.0 |
| status | 设置校验状态 | 'error' \| 'warning' | - | 3.3.0 |
| size | 控件大小。注：标准表单内的输入框大小限制为 `middle`。可选 `large` `middle` `small` | string | - |  |
| suffix | 带有后缀图标的 input | string\|slot |  |  |
| type | 声明 input 类型，同原生 input 标签的 type 属性，见：[MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/input#属性)(请直接使用 `<a-textarea />` 代替 `type="textarea"`)。 | string | `text` |  |
| value(v-model) | 输入框内容 | string |  |  |

### Input 事件

| 事件名称   | 说明                   | 回调参数    |     |
| ---------- | ---------------------- | ----------- | --- |
| change     | 输入框内容变化时的回调 | function(e) |     |
| pressEnter | 按下回车的回调         | function(e) |     |