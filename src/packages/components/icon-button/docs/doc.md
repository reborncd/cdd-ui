## iconButton

### 基础用法

[icon链接](/components/icon)

```vue demo
<template>
    <fl-icon-button icon="iflorens-Edit" :iconStyle="iconStyle" type="link" size="small">
      aaa
    </fl-icon-button>
</template>

<script lang="ts">
import { ref, h } from "vue"

export default {
  setup() {
    return {
        iconStyle: {
            color: '#86909C'
        }
    }
  },
};
</script>
```

### 使用@ant-design/icons-vue

```vue demo
<template>
    <fl-icon-button :icon="EditOutlined" :iconStyle="iconStyle" type="link" size="small">
    </fl-icon-button>
</template>

<script lang="ts">
import { ref, h } from "vue"
import { EditOutlined } from '@ant-design/icons-vue';

export default {
  setup() {
    return {
        EditOutlined,
        iconStyle: {
            color: '#86909C'
        }
    }
  },
};
</script>
```

### icon按钮 属性

|属性	|说明	|类型	|可选值	|默认值|
|---- |----- |------ |---  |---- |
|type	|按钮类型	| string	| - |	link|
|className	|按钮 class	|string	|-|	|
|icon	|按钮	| string |	—|	|
|iconStyle	|按钮样式	| object|	—|	|
|size	|按钮大小	|string|	—	||

### icon按钮 Events

|事件	|说明	|回调	|
|---- |----- |------ |
|onClick	|点击时触发	|event: MouseEvent|

### icon按钮 插槽

|名称	|说明	|
|---- |----- |
|默认 slot	|-	|