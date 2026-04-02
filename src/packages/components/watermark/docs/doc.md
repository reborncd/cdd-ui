## Watermark 水印

### 基本用法

```vue demo
<template>
  <div>
        <a-button @click="showTest = !showTest">显示全局文字水印</a-button>
        <cdd-watermark :fullPage="true" v-if="showTest" font-color="#fa2c19" content="cdd-ui"></cdd-watermark>
        <a-button @click="showImg = !showImg">显示全局图片水印</a-button>
        <cdd-watermark v-if="showImg" class="mark1" :image-width="50" :image-height="50" :z-index="1" :image="img"></cdd-watermark>
    </div>
</template>

<script lang="ts">
import { ref } from "vue"
import logo from '../../../../sites/assets/images/logo.jpg'
import { Button } from 'ant-design-vue'
export default {
  components: {
    [Button.name]: Button
  },
  setup() {
    const img = ref(logo)
    const showTest = ref(false)
    const showImg = ref(false)
    return {
        img,
        showTest,
        showImg
    }
  },
};
</script>
```

### 局部用法
```vue demo
<template>
    <div style="width: 100%;height: 300px;display: block;background: #fff;position: relative;">
        <cdd-watermark :fullPage="false" font-color="rgba(0, 0, 0, .15)" content="cdd-ui"></cdd-watermark>
    </div>
</template>

<script lang="ts">
import { ref } from "vue"
export default {
  setup() {
    return {
    }
  },
};
</script>
```

### Watermark 属性

|属性	|说明	|类型	|可选值	|默认值|
|---- |----- |------ |---  |---- |
|width	|水印的宽度	|number	|- |	|
|height	|水印的高度	|number	|- |	|
|rotate	|水印绘制时，旋转的角度	|number |- |	|
|image	|图片源，建议导出 2 倍或 3 倍图，优先使用图片渲染水印	|string |- |	|
|image-width	|图片宽度	|number |- |	|
|image-height	|图片高度	|number |- |	|
|z-index	|追加的水印元素的 z-index	|number |- |	|
|content	|水印文字内容	|string |- |	|
|font-color	|水印文字颜色	|string |- |	|
|font-size	|文字大小	|string | - |- |	|
|gap-x	|水印之间的水平间距	|number |- |	|
|gap-y	|水印之间的垂直间距	|number |- |	|
|fuly-page	|是否覆盖整个页面	|boolean |- |	|
|font-family	|水印文字字体	|boolean |- |	|