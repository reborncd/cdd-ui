## Select

### 基础用法

```vue demo
<template>
  <fl-select
    v-model="value"
    selectStyle="width: 150px"
    :options="options"
    showSearch
    option-label-prop="label"
    placeholder="Please select"
    :getPopupContainer='getPopupContainer'
    :virtual="false"
  />
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue'
const value = ref(undefined)
const options = [
  { key: 1, value: 'ADCAN1', key: 'Port',label:'ADCAN1' },
  { key: 2, value: 'ADCAN2', key: 'Port2',label:'ADCAN2' },
  { key: 3, value: 'ADCAN3', key: 'Port2',label:'ADCAN3' },
  { key: 4, value: 'ADCAN4', key: 'Port2',label:'ADCAN4' },
  { key: 5, value: 'ADCAN5', key: 'Port2',label:'ADCAN5' },
  { key: 6, value: 'ADCAN6', key: 'Port2',label:'ADCAN6' },
  { key: 7, value: 'ADCAN7', key: 'Port2',label:'ADCAN7' },
  { key: 8, value: 'ADCAN8', key: 'Port2',label:'ADCAN8' },
  { key: 9, value: 'ADCAN9', key: 'Port2',label:'ADCAN9' },
  { key: 10, value: 'ADCAN11', key: 'Port2',label:'ADCAN10' },
  { key: 11, value: 'ADCAN12', key: 'Port2',label:'ADCAN11' },
  { key: 12, value: 'ADCAN13', key: 'Port2',label:'ADCAN12' },
  { key: 13, value: 'ADCAN14', key: 'Port2',label:'ADCAN13' },
  { key: 14, value: 'ADCAN15', key: 'Port2',label:'ADCAN14' },
]

const getPopupContainer = (node) => node.parentNode
</script>
```
### 显示主副标题

```vue demo
<template>
  <fl-select
    v-model="value"
    selectStyle="width: 420px"
    :options="options"
    showSearch
    isShowSubTitle
    :fieldNames="fieldNames"
    option-label-prop="children"
    placeholder="Please select"
  />
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue'
const value = ref(undefined)
const options = [
  { key: 1, value: 'ADCAN', key: 'Florens Asset Management (USA), Limited' }, 
  { key: 2, value: 'ADCAN2', key: 'Florens Asset Management (USA), Limited' }
]
const fieldNames = {
  label: 'value',
  value: 'value',
  subTitle: 'key'
}

</script>
```

### 自定义下拉列表-单选
```vue demo
<template>
  <fl-select v-model="value"  v-bind="selectProps"></fl-select>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue'
const value = ref(undefined)
const selectProps = ref({
    customeRender:true,
    optionLabelProp:"label",
    dropdownMatchSelectWidth:false,
    showSearch:true,
    mode:"single",
    options:[
        { key: 1, location: 'ADCAN1', level: 'Port', description: 'Canillo' },
        { key: 2, location: 'ADCAN2', level: 'Port', description: 'Canillo' },
        { key: 3, location: 'ADCAN3', level: 'Port', description: 'Canillo' },
        { key: 4, location: 'ADCAN4', level: 'Port', description: 'Canillo' },
        { key: 5, location: 'ADCAN5', level: 'Port', description: 'Canillo' },
        { key: 6, location: 'ADCAN6', level: 'Port', description: 'Canillo' },
        { key: 7, location: 'ADCAN7', level: 'Port', description: 'Canillo' },
        { key: 8, location: 'ADCAN8', level: 'Port', description: 'Canillo' },
        { key: 9, location: 'ADCAN9', level: 'Port', description: 'Canillo' },
        { key: 10, location: 'ADCAN10', level: 'Port', description: 'Canillo' },
        { key: 11, location: 'ADCAN11', level: 'Port', description: 'Canillo' },
        { key: 12, location: 'ADCAN12', level: 'Port', description: 'Canillo' },
        { key: 13, location: 'ADCAN13', level: 'Port', description: 'Canillo' },
        { key: 14, location: 'ADCAN14', level: 'Port', description: 'Canillo' },
        { key: 15, location: 'ADCAN15', level: 'Port', description: 'Canillo' }
    ],
    selectStyle:"width: 150px",
    placeholder:"Please Select",
    columns:[
    {
      title: 'LOCATION',
      dataIndex: 'location',
      width: '80px'
    },
    {
      title: 'LEVEL',
      dataIndex: 'level',
      width: '70px'
    },
    {
      title: 'DESCRIPTION',
      dataIndex: 'description',
      width: '100px'
    }
  ],
  paginationConfig : {
    total: 0,
    pageSize: 10,
    current: 1
  },
  fieldNames : {
    label: 'location',
    value: 'location'
  }
})

</script>
```
### 自定义下拉列表-多选
```vue demo
<template>
  <fl-select
    v-model="multipleValue"
    selectStyle="width: 150px"
    :options="options"
    :dropdownMatchSelectWidth="false"
    mode="multiple"
    customeRender
    showSearch
    :fieldNames="fieldNames"
    placeholder="Please select"
    :columns="columns"
    option-label-prop="label"
    :paginationConfig="paginationConfig"
    @pageChange="onPageChange"
    @search="onSearch"
  >
  </fl-select>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue'
const multipleValue = ref([])
// table数据
const options = [
  { key: 1, label: 'ADCAN1', value: 'ADCAN1', location: 'ADCAN1', level: 'Port', description: 'Canillo' },
  { key: 2, label: 'ADCAN2', value: 'ADCAN2', location: 'ADCAN2', level: 'Port', description: 'Canillo' },
  { key: 3, label: 'ADCAN3', value: 'ADCAN3', location: 'ADCAN3', level: 'Port', description: 'Canillo', disabled: true }
]
const fieldNames = reactive({
  label: 'location',
  value: 'location'
})
// 表头
const columns = [
  {
    title: 'LOCATION',
    dataIndex: 'location'
  },
  {
    title: 'LEVEL',
    dataIndex: 'level'
  },
  {
    title: 'DESCRIPTION',
    dataIndex: 'description'
  }
]
// 分页配置
const paginationConfig = reactive({
  total: options.length,
  pageSize: 10,
  current: 1
})
// 分页切换
const onPageChange = (current) => {
  Object.assign(paginationConfig, {
    current
  })
}
const onSearch = (e) => {
  console.log(e, 'onSearch')
}

</script>
```

### Select 属性

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| modelValue | 指定当前选中的条目 | string,string[],number,number[] | - |  |
| selectStyle | 下拉框样式 | object,string | - |  |
| columns | 下拉框表头 | array | - |  |
| options | 下拉框数据 | array | - |  |
| delay | 搜索事件加了防抖，默认300ms | number | 300 |  |
| fieldNames | 自定义节点 label、value、options 的字段 | object | { label: label, value: value, options: options } |  |
| customeRender | 自定义插槽 | boolean | false |  |
| paginationConfig | 分页信息, 参数格式: {total: 0,pageSize: 10,current: 1} | object | - |  |
| isShowPage | 是否显示分页 | Boolean | true |  |
| isShowHeader | 是否显示 header | Boolean | true |  |
| showLoading | 远程加载，是否显示loading | Boolean | true |  |
| maxLength | 最大输入长度限制，值为0时不限制输入长度 | number | 0 |  |





> 注意，如果发现下拉菜单跟随页面滚动，或者需要在其他弹层中触发 Select，请尝试使用 `getPopupContainer={triggerNode => triggerNode.parentNode}` 将下拉弹层渲染节点固定在触发器的父元素中。

### 事件

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| blur | 失去焦点的时回调 | function |
| change | 选中 option，或 input 的 value 变化（combobox 模式下）时，调用此函数 | function(value, option:Option \| Array&lt;Option>) |
| deselect | 取消选中时调用，参数为选中项的 value (或 key) 值，仅在 multiple 或 tags 模式下生效 | function(value，option:Option) |
| dropdownVisibleChange | 展开下拉菜单的回调 | function(open) |
| focus | 获得焦点时回调 | function |
| inputKeyDown | 键盘按下时回调 | function |
| mouseenter | 鼠标移入时回调 | function |
| mouseleave | 鼠标移出时回调 | function |
| search | 文本框值变化时回调 | function(value: string) |
| select | 被选中时调用，参数为选中项的 value (或 key) 值 | function(value, option:Option) |


### 为什么 `placeholder` 不显示 ？

`placeholder` 只有在 value = undefined 才会显示，对于其它的 null、0、'' 等等对于 JS 语言都是有意义的值。
