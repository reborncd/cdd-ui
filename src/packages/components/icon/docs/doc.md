## Icon

### 基础用法

使用库：//at.alicdn.com/t/c/font_4234253_n5rcilvs4u.js

```vue demo
<template>
    <div class="md-icon-font">
        <a-row>
            <a-col :span="2" v-for="(item, index) in iconJson.glyphs" :key="index" @click="handleCopy(item.font_class)">
                <cdd-icon :type="`iflorens-${item.font_class}`"></cdd-icon>
                <div class="icon-class">iflorens-{{item.font_class}}</div>
            </a-col>
        </a-row>
      
    </div>
</template>
<script lang="ts">
import useClipboard from 'vue-clipboard3'
import { defineComponent, ref, h, getCurrentInstance } from 'vue'
import { message, Row, Col } from 'ant-design-vue';
import iconJson from './iconfont.json'



export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col
  },
  setup() {
    let { proxy } = getCurrentInstance()
    const { toClipboard } = useClipboard()
    const handleCopy = async (iconClass) => {
        try {
            await toClipboard(`iflorens-${iconClass}`)
            message.success(`copy success iflorens-${iconClass}`);
        } catch (e) {
            console.error(e)
        }
    }

    return {
        handleCopy,
        iconJson
    }
  },
};
</script>
```

### icon 属性

| 字段   | 说明                    | 类型             | 只读值         |
| ------ | ----------------------- | ---------------- | -------------- |
| class  | 计算后的 `svg` 类名     | string           | -              |
| fill   | `svg` 元素填充的颜色    | string           | '' |
| height | `svg` 元素高度          | string \| number | '1em'          |
| style  | 计算后的 `svg` 元素样式 | CSSProperties    | -              |
| width  | `svg` 元素宽度          | string \| number | '1em'          |