<!--
 * @Author: xiehaojie
 * @Date: 2025-06-17 17:51:45
 * @LastEditors: xiehaojie
 * @LastEditTime: 2025-10-14 15:22:11
 * @Description: edit
 * @version: 1.0
-->
## Date
### 基础用法
```vue demo
<template>
  <fl-date
    v-model="modelValue"
    :format="dateFormat"
  />
</template>
<script lang="ts" setup>
import { ref } from "vue"
import dayjs, { Dayjs } from 'dayjs';
const dateFormat = ['YYYY-MM-DD', 'YYYY/MM/DD', 'MM/DD/YYYY', 'DD/MM/YYYY', 'YYYY-MM-DD HH:mm:ss']
const modelValue = ref(dayjs('2024/10/01', dateFormat));
</script>
```

### 时间区间选择
```vue demo
<template>
  <fl-date
    v-model="modelValue"
    dateType="rangePicker"
    :format="dateFormat"
  />
</template>
<script lang="ts" setup>
import { ref } from "vue"
import dayjs, { Dayjs } from 'dayjs';
const dateFormat = 'YYYY/MM/DD';
const modelValue = ref([dayjs('2024-09-20', dateFormat), dayjs('2024-10-01', dateFormat)]);
</script>
```
### 日期+时间选择
```vue demo
<template>
  <fl-date
    v-model="modelValue"
    :format="dateFormat"
    :showTime="'YYYY-MM-DD HH:mm:ss'"
  />
</template>
<script lang="ts" setup>
import { ref } from "vue"
import dayjs, { Dayjs } from 'dayjs';
const dateFormat = ['YYYY-MM-DD HH:mm:ss']
const modelValue = ref(dayjs('2024/10/01 19:12:12', dateFormat));
</script>
```
### 日期+时间区间选择
```vue demo
<template>
  <fl-date
    v-model="modelValue"
    dateType="rangePicker"
    :format="dateFormat"
    :showTime="'YYYY-MM-DD HH:mm:ss'"
  />
</template>
<script lang="ts" setup>
import { ref } from "vue"
import dayjs, { Dayjs } from 'dayjs';
const dateFormat = 'YYYY-MM-DD HH:mm:ss';
const modelValue = ref([dayjs('2024-09-20 19:12:12', dateFormat), dayjs('2024-10-01 19:12:12', dateFormat)]);
</script>
```

### Date 属性

|属性	|说明	|类型	|可选值	|默认值|
|---- |----- |------ |---  |---- |
|value(v-model)	|日期	| object	| - |	-|
|dateType	|日期类型，dateType='rangePicker', 选择日期区间	| string	|'' |	-|
|format	|日期格式,配置参考 dayjs，支持自定义格式	| formatType	| 'YYYY-MM-DD' |	-|
|showTime	|增加时间选择功能		| Object/boolean/String	|  '' |	-|


### Date 方法

| 名称    | 描述     |
| ------- | -------- |
| blur()  | 移除焦点 |
| focus() | 获取焦点 |


### Date 事件

| 事件名称 | 说明               | 回调参数                                            |
| -------- | ------------------ | --------------------------------------------------- |
| change   | 时间发生变化的回调 | function(date: dayjs \| string, dateString: string) |