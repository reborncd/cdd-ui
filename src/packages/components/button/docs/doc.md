## Button

### 长按钮

```vue demo
<template>
    <fl-button size="small" className="long-button" block icon="iflorens-Plus" :iconStyle="iconStyle">
      Button
    </fl-button>
</template>

<script lang="ts">
import { ref, h } from "vue"

export default {
  setup() {
    return {
        iconStyle: {
            color: '#3E54AD'
        }
    }
  },
};
</script>
```

### 普通按钮primary

```vue demo
<template>
    <div>
        <fl-button size="small" className="primary-button" type="primary">Button</fl-button>
        <br /><br />
        <fl-button size="small" className="primary-button" type="primary" disabled>Button</fl-button>

        <fl-button size="small" className="primary-button" type="primary" icon="iflorens-Plus" disabled>Button</fl-button>
    </div>
</template>

<script lang="ts">
import { ref, h } from "vue"

export default {
  setup() {
    return {
        iconStyle: {
            color: '#3E54AD'
        }
    }
  },
};
</script>
```

### 普通按钮default

```vue demo
<template>
    <div>
        <fl-button size="small" className="default-button">Button</fl-button>
    </div>
</template>

<script lang="ts">
import { ref, h } from "vue"

export default {
  setup() {
    return {
        iconStyle: {
            color: '#3E54AD'
        }
    }
  },
};
</script>
```

### 说明

button在antdv上封装保留之前所有属性

[link](https://www.antdv.com/components/button-cn)

### Button

|属性	|说明	|类型	|可选值	|默认值|
|---- |----- |------ |---  |---- |
| className | 新button | string | default-button \| primary-button \| long-button | - |
| icon | icon | string | [link](/components/icon) | - |
| type | 按钮类型 | string | - | link |
| iconStyle | icon样式 | object | - | {color: '#86909C'} |
| disabled | 是否禁用 | Boolean | - | false |
| iconPosition | 按钮方向 | string | left \| right | left |

### 按钮 Events

|事件	|说明	|回调	|
|---- |----- |------ |
|onClick	|点击时触发	|event: MouseEvent|

### 按钮 插槽

|名称	|说明	|
|---- |----- |
|默认 slot	|-	|