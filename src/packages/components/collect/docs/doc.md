## collect

### 基础用法

```vue demo
<template>
    <cdd-collect title="Lease Contract" :request="fetch">
      
    </cdd-collect>
</template>

<script lang="ts">
import { ref, h } from "vue"
import fetch from '../../../../sites/pc/http/http.ts'

export default {
  setup() {
    return {
        fetch
    }
  },
};
</script>
```

### 自定义

```vue demo
<template>
    <cdd-collect title="Lease Contract" :isCustomize="true" :iconBtnStatus="btnStatus" @iconClick="iconClick"></cdd-collect>
</template>

<script lang="ts">
import { ref, h } from "vue"
import fetch from '../../../../sites/pc/http/http.ts'

export default {
  setup() {
    let btnStatus = ref(false)
    const iconClick = (e) => {
      console.log(e)
      e == 'add' ? btnStatus.value = true : btnStatus.value = false
    }


    return {
        fetch,
        btnStatus,
        iconClick
    }
  },
};
</script>
```

### Collect 属性

|属性	|说明	|类型	|可选值	|默认值|
|---- |----- |------ |---  |---- |
|title	|标题	| string	| - |	link|
|startOutIcon	|收藏按钮	| object |	—| {icon: StarOutlined, iconStyle: { color: 'rgba(134,144,156, 1.00)',fontSize: '20px' }}	|
|starFilledIcon	|收藏后样式	| object|	—| {icon: StarFilled, iconStyle: { color: 'rgba(226,100,0, 1.00)',,fontSize: ‘20px’ }}	|
|request	|请求	| function|	—|	() => {}|
|host	|请求url	| String|	—|	-|
|isCustomize	|是否自定义请求	| Boolean|	false \| true|	false|
|iconBtnStatus	|icon按钮状态	| Boolean|	false \| true|	false|
|tipAddText	|tip add text	| String|	- |	Add to My favorites|
|tipRemoveText	|tip remove test	| String|	- |	Remove from My favorites|

### Collect Events

|事件	|说明	|回调	|
|---- |----- |------ |
|iconClick	|点击时触发	| del,add |
|delSuccess	|删除成功触发	| e: res.data |
|addSuccess	|添加成功触发	| e: res.data |

### Collect 插槽

|名称	|说明	|
|---- |----- |
|default	|默认插槽	|