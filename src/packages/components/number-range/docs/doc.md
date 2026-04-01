## NumberRange

### 基础用法
```vue demo
<template>
  <div>
    <fl-number-range v-model="modelValue" />
    <!-- <div>{{ modelValue }}</div> -->
  </div>
</template>
<script lang="ts">
import { ref } from "vue"
export default {
    setup() {
        const modelValue = ref([]);

        return {
            modelValue
        }
    }
}
</script>
```

### 禁用
```vue demo
<template>
  <div>
    <fl-number-range v-model="modelValue" :disabled="true" />
    <!-- <div>{{ modelValue }}</div> -->
  </div>
</template>
<script lang="ts">
import { ref } from "vue"
export default {
    setup() {
        const modelValue = ref([]);

        return {
            modelValue
        }
    }
}
</script>
```

### NumberRange 属性

|属性	|说明	|类型	|可选值	|默认值|
|---- |----- |------ |---  |---- |
|value(v-model)	|日期	| object	| - |	-|
|disabled	|是否禁用	|boolean	| - |	false|
|fromPlaceholder	|占位符	|string	| - |	-|
|toPlaceholder	|占位符	|string	| - |	-|



### NumberRange 方法

| 名称    | 描述     |
| ------- | -------- |
| blur()  | 移除焦点 |
| focus() | 获取焦点 |

