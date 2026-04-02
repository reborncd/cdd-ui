## Annex


### 基础用法

```vue demo
<template>
    <div style="width: 350px;">
        <cdd-annex :fileName="fileName">
          <!-- <template #left>
            left
          </template>
          <template #right>
            right
          </template> -->
        </cdd-annex>
    </div>
</template>
<script lang="ts">
import { ref, h } from "vue"
export default {
  setup() {
    const fileName = ref("企业微信截图.excel")
    setTimeout(() => {
      fileName.value = "企业微信截图.png"
    }, 3000)
    return {
        fileName
    }
  },
};
</script>
```


### Annex 属性

|属性	|说明	|类型	|可选值	|默认值|
|---- |----- |------ |---  |---- |
|isShowPreviewBtn	|是否显示预览按钮	|  Boolean	| - |	true|
|isShowDownloadBtn	|是否显示下载按钮	| Boolean |	—|	 true|
|isShowdelBtn	|是否显示删除按钮	| Boolean |	—|	 true|
|isUpdate	|是否上传中	| Boolean |	—|	 false|
|percent	|上传进度条	| Number |	—|	 0|
|fileName	|文件名称	|  String |	—|	 -|
|itemKey	|key	|  Number |	—|	 0|
|strokeWidth	|线条宽度	|  Number |	—|	 2|


### Annex Events

|事件	|说明	|回调	|
|---- |----- |------ |
|eyeClick	|点击时触发	| -|
|downloadFile	|点击时触发	| -|
|delFile	|点击时触发	| -|

### Annex 插槽

|名称	|说明	|
|---- |----- |
|left slot	|-	|
|right slot	|-	|