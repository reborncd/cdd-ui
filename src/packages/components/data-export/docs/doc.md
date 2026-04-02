## DataExport

### 基础用法

```vue demo
<template>
    <cdd-data-export :request="fetch" :requestFileId="inquiryDownload" :requestFileParams="requestFileParams" type="primary" downFileName="x.xlsx"></cdd-data-export>
</template>

<script lang="ts">
import { ref, h } from "vue"
import fetch from '../../../../sites/pc/http/http.ts'
import { inquiryDownload } from './index.ts'


export default {
  setup() {
    let f = ref(inquiryDownload)
    let requestFileParams = ref({
      page: {
        currentPage: 1,
        pageSize: 23
      }
    })
    setTimeout(() => {
        requestFileParams.value = {
          page: {
            currentPage: 1,
            pageSize: 40
          }
        }
      }, 1000);
    return {
        fetch,
        inquiryDownload,
        requestFileParams
    }
  },
};
</script>
```

### 自定义插槽

```vue demo
<template>
    <cdd-data-export :request="fetch" :requestFileId="testCustomerExcel" type="primary" downFileName="x.xlsx">
      <template v-slot:customize="{ exportClick }" #customize>
        <cdd-button type="primary" @click="exportClick">自定义按钮</cdd-button>
      </template>
    </cdd-data-export>
</template>

<script lang="ts">
import { ref, h } from "vue"
import fetch from '../../../../sites/pc/http/http.ts'
import { testCustomerExcel } from '../../../../sites/pc/http/do.ts'


export default {
  setup() {
    return {
        fetch,
        testCustomerExcel
    }
  },
};
</script>
```


### DataExport 属性

|属性	|说明	|类型	|可选值	|默认值|
|---- |----- |------ |---  |---- |
|name	|名称	| string	| - | -|
|iconObj	|icon	| Object	| - |	{icon: 'iflorens-Export',iconStyle: {color: 'rgba(62, 84, 173, 1.00)',fontSize: '14px'}}|
|pollNum	|轮训次数	|   Number	| - |	50|
|isComNotification	|是否本地展示论寻弹窗	|   boolean	| - |	true|
|request	|请求	| Function	| - |	-|
|requestFileId	|业务请求	| Function	| - |	-|
|requestFileParams	|业务请求参数	| {}	| - |	-|
|downFileName	|下载名称需要带扩展名（xxxx.xlsx）	| string	| - |	-|



### DataExport 事件

|事件名	|说明	|回调参数	|
|---- |------- |---- |
|success-async-export |请求成功触发 |
|success-tasks-exports |轮训成功触发 |
|error-async-export |请求下载错误触发 |
|error-tasks-exports |轮训超时触发 |
|btn-click |按钮点击处罚 |- |

### DataExport 插槽

|名称	|说明	|
|---- |----- |
|customize	|-	|