## LeaseHeader

### 基础用法

```vue demo
<template>
    <fl-lease-header :title="title" :tooltipProps="{
      placement: 'leftBottom'
    }">
      <!-- <template v-slot:header-left>
        <div>Content for header-left slot</div>
      </template> -->
      <template v-slot:header-right>
        <div>right</div>
      </template>
      <template v-slot:lease-header-bottom>
        <div>bottom</div>
      </template>
    </fl-lease-header>
</template>

<script lang="ts">
import { ref, h } from "vue"

export default {
  setup() {
    return {
      title: "测试"
    }
  }
};
</script>
```

### 基础用法 不需要移入提示

```vue demo
<template>
    <fl-lease-header :title="title" arrowLeftText="" previousText="" nextText="">
      <template v-slot:header-right>
        <div>right</div>
      </template>
      <template v-slot:lease-header-bottom>
        <div>bottom</div>
      </template>
    </fl-lease-header>
</template>

<script lang="ts">
import { ref, h } from "vue"

export default {
  setup() {
    return {
      title: "测试"
    }
  }
};
</script>
```

### 英文情况

```vue demo
<template>
    <fl-lease-header :title="title" className="en">
      <!-- <template v-slot:header-left>
        <div>Content for header-left slot</div>
      </template> -->
      <template v-slot:header-right>
        <div>right</div>
      </template>
      <template v-slot:lease-header-bottom>
        <div>bottom</div>
      </template>
    </fl-lease-header>
</template>

<script lang="ts">
import { ref, h } from "vue"

export default {
  setup() {
    return {
      title: "DDW2"
    }
  },
};
</script>
```

## lease-header 属性

|属性	|说明	|类型	|可选值	|默认值|
|---- |----- |------ |---  |---- |
|className	|class	| cn,lease-header-cnt-approval	| - |	-|
|isShowArrowLeftIcon	|按钮是否显示	| boolean |	-|	true|
|title	|标题	|  string|	-|	-|
|upDisabled	|左边箭头是否禁用	|   boolean|	-|	false|
|downDisabled	|右边箭头是否禁用	|   boolean|	-|	false|
|isShowArrowRightBtn	|右侧箭头组件是否显示	|   boolean|	-|	true|
|arrowLeftText	| 左侧箭头移入提示	|   string|	- |	Reture to Search |
|arrowLeftTooltipProps	| 左侧箭头tooltip配置	|   object |	- |	- |
|previousText	| 右侧箭头组件，上一个移入提示	|  string |	- |	Previous in List |
|nextText	| 右侧箭头组件，下一个移入提示	|  string |	- |	Next in List |




### lease-header Events

|事件	|说明	|回调	|
|---- |----- |------ |
|jumpList	|点击按钮箭头时触发	|event: MouseEvent|
|btnClick	|点击右侧按钮触发	| up,down|

### lease-header 插槽

|名称	|说明	|
|---- |----- |
|header-left	|头部左侧插槽	|
|header-right	|头部右侧插槽	|
|lease-header-bottom	|底部插槽	|