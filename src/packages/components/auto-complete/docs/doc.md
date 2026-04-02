## AutoComplete

## 基础用法
```vue demo
<template>
  <cdd-auto-complete
    v-model="modelValue"
    v-bind="parmas"
    @search="onSearch"
    @select="onSelect"
    @clear="onClear"
    @onBlur="onBlur"
  >
  </cdd-auto-complete>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'
const modelValue = ref()
const parmas = ref({
  options:[],
  allowClear:  true,
  showSearch:  true,
  autoCompleteStyle:  "width: 200px",
  placeholder:  "input here",
  dropdownMatchSelectWidth: false,
  customeRender: false,
})
// 搜索
const onSearch = (value) => {
  parmas.value.options = [
      {
        label: 'label1',
        value: 'value1'
      },
      {
        label: 'label2',
        value: 'value2'
      },
      {
        label: 'label3',
        value: 'value3'
      },
      {
        label: 'label4',
        value: 'value4'
      },
      {
        label: 'label5',
        value: 'value5'
      },
      {
        label: 'label6',
        value: 'value6'
      },
      {
        label: 'label6',
        value: 'value6'
      },
      {
        label: 'label7',
        value: 'value7'
      },
      {
        label: 'label8',
        value: 'value8'
      },
      {
        label: 'label9',
        value: 'value9'
      },
      {
        label: 'label10',
        value: 'value10'
      },
      {
        label: 'label11',
        value: 'value11'
      },
      {
        label: 'label12',
        value: 'value12'
      }]
}
// 下拉选择
const onSelect = (value) => {
  console.log(value, 'onSelect')
}
const onBlur = (e) => {
  console.log(e, 'blur')
}
const onClear = (e) => {
  console.log(e, 'clear')
}
</script>
```
## 自定义选项
```vue demo
<template>
  <cdd-auto-complete
    v-model="modelValue"
    v-bind="parmas"
    @search="onSearch"
    @select="onSelect"
    @loadmore="loadMore"
  >
  </cdd-auto-complete>
</template>
<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { selectParam, selectFetch } from '../../../../sites/pc/http/do.ts';
const modelValue = ref()

const parmas = reactive({
  allowClear: true,
  showSearch: true,
  placeholder: "input here",
  customeRender: true,
  autoCompleteStyle:"width: 200px",
  dropdownMatchSelectWidth: false,
  paginationConfig: {
    current: 1,
    pageSize: 20
  },
  columns:[
    {
      title: 'Lease Class',
      dataIndex: 'leaseClass',
      width: '50px'
    },
    {
      title: 'Descr Short',
      dataIndex: 'descrshort',
      width: '60px'
    },
    {
      title: 'Lease ClassOps',
      dataIndex: 'leaseClassOps',
      width: '200px'
    }
  ],
  options: [{
      value:'',
    options: [],
    }],
  disabledLoadMore: false,
})

const loadData = async () => {
  const res = await selectFetch({
    ...selectParam,
    currentPage: parmas.paginationConfig.current,
    pageSize: parmas.paginationConfig.pageSize,
  })
  parmas.disabledLoadMore = res.data?.list?.length < parmas.paginationConfig.pageSize
  parmas.options[0].options = res.data?.list
}

// 搜索
const onSearch = (value) => {
  console.log(value, 'onSearch')
}
// 下拉选择
const onSelect = (value) => {
  console.log(value, 'onSelect')
}
const loadMore = (current) => {
  Object.assign(parmas.paginationConfig, {
    current
  })
  loadData()
}

loadData()
</script>
```
### autocomplete 属性

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| modelValue | 指定当前选中的条目 | string,string[],number,number[] | - |  |
| options | 下拉框数据 | array | - |  |
| columns | 下拉列表表头 | array | - |  |
| delay | 搜索事件加了防抖，默认300ms | number | 300 |  |
| dropdownMatchSelectWidth | 设置下拉框宽度 | number|boolean | 350 |  |
| customeRender | 自定义下拉列表 | boolean | false |  |
| paginationConfig | 分页信息, 参数格式: {total: 0,pageSize: 10,current: 1} | object | - |  |
| disabledLoadMore | 禁止上拉加载 | boolean | false |  |
| maxLength | 最大输入长度限制，值为0时不限制输入长度 | number | 0 |  |

### autocomplete 事件

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| blur | 失去焦点的时回调 | function |
| change | 选中 option，或 input 的 value 变化（combobox 模式下）时，调用此函数 | function(value, option:Option \| Array&lt;Option>) |
| focus | 获得焦点时的回调 | function() |
| search | 搜索补全项的时候调用 | function(value) |
| loadmore | 上拉加载更多 | function(current) |
	