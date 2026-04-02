<!--
 * @Author: v_yangyaru
 * @Date: 2024-10-08 09:14:33
 * @LastEditors: v_yangyaru
 * @LastEditTime: 2024-10-12 09:40:55
 * @FilePath: /iflorens-web-ui/src/packages/components/upload/docs/doc.md
 * @Description: 
-->
## Upload

### 基本用法

```vue demo
<template>
  <cdd-upload :isShowImgPreview="false" :showUploadList="true" listType="text" :multiple="true" @error="onError" accept="image/png,.jpg" action="https://www.mocky.io/v2/5cc8019d300000980a055e76"></cdd-upload>
  <br/>
  <cdd-upload :showUploadList="true" listType="picture"></cdd-upload>
  <br/>
  <cdd-upload :showUploadList="true" listType="picture-card" @preview="onPreview" :customRequest="onCustomRequest"></cdd-upload>
</template>

<script lang="ts">
import { ref } from "vue"
export default {
  setup() {
    function onPreview(file){
      console.log(file,'--file--')
    }
    const onError = (msg)=> {
      console.log(msg,'--msg--')
    }
    const onCustomRequest = () =>{

    }
    return {
      onPreview,
      onError,
      onCustomRequest
    }
  },
};
</script>
```


### Upload 属性

|属性	|说明	|类型	|可选值	|默认值|
|---- |----- |------ |---  |---- |
|name	|名称	|String 	| - | Upload|
|isShowImgPreview	|是否显示底部预览图片	|boolean 	| - | true|
|iconObj |icon |Object  | - | {icon: 'iflorens-Upload',iconStyle: {color: 'rgba(62, 84, 173, 1.00)',fontSize: '14px'}}|
|showUploadList	|是否展示上传列表	|boolean 	| - | false|
|multiple	|是否支持多文件上传	|boolean 	| - | true|
|beforeUpload	|上传之前操作	| function 	| - | function|
|maxSize |允许上传的大小,单位:M| Number ||100  |

### Upload 事件
|事件名称 |说明 |回调参数|
|----|----|----|
|preview| 预览 |function|
|remove| 删除 |function |
|change| 监听变化 |function |
|download| 下载 |function |
|percent| percent |function |
|error| 错误 |function |

### Upload 插槽
|名称	|说明	|备注|
|---- |----- |----|
|default |默认插槽 | - |
|itemRender |itemRender | -|
|iconRender |iconRender | -|
|downloadIcon |downloadIcon | -|
|removeIcon |removeIcon | -|
