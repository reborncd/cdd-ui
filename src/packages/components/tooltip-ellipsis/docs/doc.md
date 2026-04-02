## TooltipEllipsis

### 基础用法
```vue demo
<template>
    <div style="width: 200px;font-size: 14px;font-family:Nunito;font-variation-settings: 'wght' 600;">
      <div>
        <cdd-tooltip-ellipsis :content="text" placement="topLeft" overlayClassName="resourceDesc" :tooltipTrigger="'hover'">
        </cdd-tooltip-ellipsis>
      </div>
      <br />
      <br />
      <div>
        <cdd-tooltip-ellipsis :content="'没有省略号不展示'" placement="topLeft" overlayClassName="resourceDesc" :tooltipTrigger="'hover'">
        </cdd-tooltip-ellipsis>
      </div>
      <br />
      <br />
      <div>
        <cdd-tooltip-ellipsis :content="'没有省略号也要展示'" placement="topLeft" overlayClassName="resourceDesc" :tooltipTrigger="'hover'" :isShowEllipsisTooltip="false">
        </cdd-tooltip-ellipsis>
      </div>
      <br />
      <br />
      <div>
        <cdd-tooltip-ellipsis :content="`有省略号我也要展示${text}`" placement="topLeft" overlayClassName="resourceDesc" :tooltipTrigger="'hover'" isShowEllipsisTooltip="false">
        </cdd-tooltip-ellipsis>
      </div>
      <br />
      <br />
      <div>
        <cdd-tooltip-ellipsis :content="`test这是MKT文件夹测试L3jx7WgcQPcjHzaM8ZOKedL3jx7WgcQPcjHzaM8ZOKedL3jx7WgcQPcjHzaM8ZOKed'`" placement="topLeft" overlayClassName="resourceDesc" :tooltipTrigger="'hover'" isShowEllipsisTooltip="false">
        </cdd-tooltip-ellipsis>
      </div>
    </div>
    
</template>

<script lang="ts">
import { ref } from "vue"
export default {
  setup() {
    let text = ref('')
    text.value = `Daily report on CSSC customer booking volume,onhire volume and balance volume`;
    return { text };
  },
};
</script>

```


### 文本 属性

|属性	|说明	|类型	|可选值	|默认值|
|---- |----- |------ |---  |---- |
|rows	|展示的行数	|number	|1|	1|
|content	|需要展示的文本	|string	|-|	|
|dots	|省略号的文本内容	|string|	—	||
|ellipsisStyle	|文本样式	|string|	—	||
|isShowEllipsisTooltip	|是否出现省略号才展示tooltip	|Boolean|	true/false | true	||
|tooltipTrigger	|tooltip Trigger 参数	|String|	hover/focus/click/contextmenu	|hover|

### 文本 Events

|事件	|说明	|回调	|
|---- |----- |------ |
|text-click	|点击文本事件	|event: MouseEvent|