<!--
 * @Author: 杨亚茹
 * @Date: 2025-03-07 10:39:16
 * @LastEditors: 杨亚茹
 * @LastEditTime: 2025-06-18 11:09:50
 * @FilePath: /iflorens-web-ui/src/packages/components/auto-complete-table/docs/doc.md
 * @Description: 
-->
## auto-complete-table

### 基础用法
```vue demo
<template>
  <cdd-auto-complete-table
    ref="autoCompleteTableRef"
    v-model="modelValue"
    v-bind="parmas"
  >
  </cdd-auto-complete-table>
</template>
<script lang="ts" setup>
import { ref, watch, reactive } from 'vue'
import fetch from '../../../../sites/pc/http/http';
import { queryDepotCodeApi,optionGradingApi } from '../../../../sites/pc/http/do.ts';
const modelValue = ref()
const autoCompleteTableRef = ref(null)

const parmas = reactive({
    customeRender: false,
    dropdownMatchSelectWidth: false,
    optionLabelProp: "xlatshortname",
    fieldNames: {
      label: "xlatshortname",
      value: "fieldvalue",
    },
    param: {},
    props: {
      responseData: "data",
      searchValue: "keyword",
    },
    request: optionGradingApi,
    options: [],
})
</script>
```

### 分页用法1
```vue demo
<template>
  <cdd-auto-complete-table
    ref="autoCompleteTableRef"
    v-model="modelValue"
    v-bind="parmas"
  >
  </cdd-auto-complete-table>
</template>
<script lang="ts" setup>
import { ref, watch, reactive } from 'vue'
import fetch from '../../../../sites/pc/http/http';
import { queryinvoiceNoApi } from '../../../../sites/pc/http/do.ts';
const modelValue = ref()
const autoCompleteTableRef = ref(null)

const parmas = reactive({
    customeRender: true,
    dropdownMatchSelectWidth: false,
    optionLabelProp: "invoiceNo",
    fieldNames: {
      label: "invoiceNo",
      value: "invoiceNo",
    },
    param: {},
    props: {
      responseData: "data.list",
      searchValue: "keyword",
    },
    request: queryinvoiceNoApi,
    options: [],
})
</script>
```

### 分页表格用法
```vue demo
<template>
  <cdd-auto-complete-table
    ref="autoCompleteTableRef1"
    v-model="modelValue"
    v-bind="parmas"
  >
  </cdd-auto-complete-table>
</template>
<script lang="ts" setup>
import { ref, watch, reactive } from 'vue'
import fetch from '../../../../sites/pc/http/http';
import { queryDepotCodeApi } from '../../../../sites/pc/http/do.ts';
const modelValue = ref()
const autoCompleteTableRef1 = ref(null)

const parmas = reactive({
    customeRender: true,
    colorMode: 'darkBlue',
    filterOption: false,
    columns: [
      {
        title: "Depot Code",
        dataIndex: "depotCd",
      },
      {
        title: "Description",
        dataIndex: "descr",
      },
      {
        title: "Description",
        dataIndex: "descr",
      },
    ],
    fieldNames: {
      label: "label",
      value: "depotCd",
    },
    request: queryDepotCodeApi,
    options: [],
    dropdownMatchSelectWidth: false,
    param: {
      keyword:"",
    },
    props: {
      responseData: "data.list",
      searchValue: "keyword",
    },
})
</script>
```

### auto-complete-table 属性

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| modelValue | 指定当前选中的条目 | string,string[],number,number[] | - |  |
| request	| 请求	| function|	() => {}| - |
| url	|请求url	| String|	—|	-|
| param	|参数	| Object|	—|	{}|
| primaryKey | 设置选中后显示的内容 | string | '' |  |