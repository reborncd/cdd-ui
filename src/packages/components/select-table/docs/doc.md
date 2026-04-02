## SelectTable

### 远程搜索 单选 主副标题 上拉加载
```vue demo
<template>
  <div style="width: 300px">
    <cdd-select-table
      ref="selectTableRef"
      v-model="multipleValue"
      selectStyle="width: 100%"
      :request="selectOptionsFetch"
      :param="selectOptionsParams"
      :dropdownMatchSelectWidth="false"
      :filter-option="false"
      :showLoading="true"
      isShowSubTitle
      showSearch
      :primaryKey="`componentFlg,descr`"
      :combineValue="true"
      :isShowPage="false"
      placeholder="Please select"
      :columns="columns"
      option-label-prop="children"
      :fieldNames="fieldNames"
      :isOnloadRequest="false"
      @select="onSelect"
      @loadmore="onLoadMore"
      @focus="onFocus"
    />
  </div>
</template>
<script lang="ts" setup>
import { selectOptionsParams, selectOptionsFetch } from '../../../../sites/pc/http/do.ts';
import fetch from '../../../../sites/pc/http/http';
import { ref, reactive } from 'vue'
const multipleValue = ref([])
const selectTableRef = ref(null)
const params = reactive(selectOptionsParams)
const onFocus = () => {
  selectTableRef.value.getOptions()
}
const columns = ref([
  {
    title: 'componentFlg',
    dataIndex: 'componentFlg'
  },
  {
    title: 'descr',
    dataIndex: 'descr'
  },
  {
    title: 'equip',
    dataIndex: 'equip'
  }
])
const fieldNames = reactive({
  label: 'componentFlg',
  value: 'descr',
  subTitle: 'equip'
})
const onSelect = (value,option) => {
  console.log(value,option,'val==')
}
const onSearch = (value) => {
  selectTableRef.value.getOptions()
}
const onLoadMore = (e) => {
  console.log(e, 'loadMore')
}
</script>
```

### 单选 选中后返回单一字段
```vue demo
<template>
  <div style="width: 300px">
    <cdd-select-table
      ref="selectTableRef"
      v-model="multipleValue"
      selectStyle="width: 100%"
      :request="selectFetch"
      :param="params"
      :dropdownMatchSelectWidth="false"
      :filter-option="false"
      :showLoading="true"
      mode="single"
      colorMode="darkBlue"
      customeRender
      showSearch
      placeholder="Please select"
      :columns="columns"
      option-label-prop="label"
      :fieldNames="fieldNames"
      :isOnloadRequest="false"
      @focus="onFocus"
    />
  </div>
</template>
<script lang="ts" setup>
import { selectParam, selectFetch } from '../../../../sites/pc/http/do.ts';
import fetch from '../../../../sites/pc/http/http';
import { ref, reactive } from 'vue'
const multipleValue = ref([])
const selectTableRef = ref(null)
const params = reactive(selectParam)
const onFocus = () => {
  selectTableRef.value.getOptions()
}
const columns = ref([
  {
    title: 'Descrshort',
    dataIndex: 'descrshort'
  },
  {
    title: 'LeaseClassOps',
    dataIndex: 'leaseClassOps'
  },
  {
    title: 'LeaseType',
    dataIndex: 'leaseType'
  }
])
const fieldNames = reactive({
  label: 'leaseType',
  value: 'descrshort'
})
const onSearch = (value) => {
  params.additionCondition.expresses[0].right.value = value
  selectTableRef.value.getOptions()
}
</script>
```

### 单选 选中后回显subTitle值
```vue demo
<template>
  <div style="width: 300px">
    <cdd-select-table
      ref="autoCompleteTableRef"
      v-bind="parmas"
      v-model="modelValue"
      selectStyle="width: 100%"
      placeholder="Please select"
    />
  </div>
</template>
<script lang="ts" setup>
import { ref, watch, reactive } from 'vue'
import { queryDepotCodeApi } from '../../../../sites/pc/http/do.ts';
const modelValue = ref([])
const autoCompleteTableRef = ref(null)

const parmas = reactive({
    customeRender: true,
    filterOption: false,
    isShowSubTitle:true,
    optionLabelProp:"children",
    columns: [
      {
        title: "Depot Code",
        dataIndex: "depotCd",
      },
      {
        title: "Description",
        dataIndex: "descr",
      },
    ],
    fieldNames: {
      label: "depotCd",
      value: "depotCd",
      subTitle: "depotCd",
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

### 单选 选中后返回当前那条对象信息
```vue demo
<template>
  <div style="width: 300px">
    <cdd-select-table
      ref="selectTableRef"
      v-model="multipleValue"
      selectStyle="width: 100%"
      :request="selectFetch"
      :param="params"
      :dropdownMatchSelectWidth="false"
      :filter-option="false"
      :showLoading="false"
      mode="single"
      customeRender
      colorMode="darkBlue"
      showSearch
      isShowItemRecord
      placeholder="Please select"
      :columns="columns"
      option-label-prop="label"
      :fieldNames="fieldNames"
      @select="onSelect"
    />
  </div>
</template>
<script lang="ts" setup>
import { selectParam, selectFetch } from '../../../../sites/pc/http/do.ts';
import fetch from '../../../../sites/pc/http/http';
import { ref, reactive } from 'vue'
const multipleValue = ref([])
const selectTableRef = ref(null)
const params = reactive(selectParam)
const columns = ref([
  {
    title: 'Descrshort',
    dataIndex: 'descrshort'
  },
  {
    title: 'LeaseClassOps',
    dataIndex: 'leaseClassOps'
  },
  {
    title: 'LeaseType',
    dataIndex: 'leaseType'
  }
])
const fieldNames = reactive({
  label: 'leaseType',
  value: 'descrshort'
})
const onSearch = (value) => {
  params.additionCondition.expresses[0].right.value = value
  selectTableRef.value.getOptions()
}
const onSelect = (value) => {
  console.log(value, 'val==')
}
</script>
```


## 多选 props
```vue demo
<template>
  <div style="width: 300px">
    <cdd-select-table
      ref="selectTableRef"
      v-model="multipleValue"
      selectStyle="width: 100%"
      :request="selectFetch"
      :param="params"
      :dropdownMatchSelectWidth="false"
      :filter-option="false"
      :showLoading="false"
      mode="multiple"
      colorMode="darkBlue"
      customeRender
      showSearch
      placeholder="Please select"
      isShowItemRecord
      :columns="columns"
      option-label-prop="label"
      :fieldNames="fieldNames"
      @select="onSelect"
    />
  </div>
</template>
<script lang="ts" setup>
import { selectParam, selectFetch } from '../../../../sites/pc/http/do.ts';
import fetch from '../../../../sites/pc/http/http';
import { InfoCircleOutlined } from '@ant-design/icons-vue'
import { ref, reactive } from 'vue'
const multipleValue = ref([])
const selectTableRef = ref(null)
const params = reactive(selectParam)
const columns = ref([
  {
    title: 'Descrshort',
    dataIndex: 'descrshort'
  },
  {
    title: 'LeaseClassOps',
    dataIndex: 'leaseClassOps'
  },
  {
    title: 'LeaseType',
    dataIndex: 'leaseType'
  }
])
const fieldNames = reactive({
  label: 'leaseType',
  value: 'descrshort'
})
const onSearch = (value) => {
  params.additionCondition.expresses[0].right.value = value
  selectTableRef.value.getOptions()
}
const onSelect = (value) => {
  console.log(value)
}
</script>
```

## 多选 props 自定义多选tag
```vue demo
<template>
  <div style="width: 300px">
    <cdd-select-table
      ref="selectTableRef"
      v-model="multipleValue"
      selectStyle="width: 100%"
      :request="selectFetch"
      :param="params"
      :dropdownMatchSelectWidth="false"
      :filter-option="false"
      :showLoading="false"
      mode="multiple"
      customeRender
      showSearch
      placeholder="Please select"
      isShowItemRecord
      :columns="columns"
      option-label-prop="label"
      :fieldNames="fieldNames"
      @select="onSelect"
    >
      <template #tagRender="tagRenderItem">
        <cdd-tag :closable="tagRenderItem.closable" style="margin-right: 3px" @close="tagRenderItem.onClose">
          <InfoCircleOutlined style="margin-right: 3px"/>
          <span>{{ tagRenderItem.option.label }}</span>
          <span>{{ tagRenderItem.option.value }}</span>
          <span></span>
        </cdd-tag>
      </template>
    </cdd-select-table>
  </div>
</template>
<script lang="ts" setup>
import { selectParam, selectFetch } from '../../../../sites/pc/http/do.ts';
import fetch from '../../../../sites/pc/http/http';
import { InfoCircleOutlined } from '@ant-design/icons-vue'
import { ref, reactive } from 'vue'
const multipleValue = ref([])
const selectTableRef = ref(null)
const params = reactive(selectParam)
const columns = ref([
  {
    title: 'Descrshort',
    dataIndex: 'descrshort'
  },
  {
    title: 'LeaseClassOps',
    dataIndex: 'leaseClassOps'
  },
  {
    title: 'LeaseType',
    dataIndex: 'leaseType'
  }
])
const fieldNames = reactive({
  label: 'leaseType',
  value: 'descrshort'
})
const onSearch = (value) => {
  params.additionCondition.expresses[0].right.value = value
  selectTableRef.value.getOptions()
}
const onSelect = (value) => {
  console.log(value)
}
</script>
```

## 多选 onSearch 方式
```vue demo
<template>
  <div style="width: 300px">
    <cdd-select-table
      ref="selectTableRef"
      v-model="multipleValue"
      selectStyle="width: 100%"
      :request="selectFetch"
      :param="params"
      :dropdownMatchSelectWidth="false"
      :filter-option="false"
      mode="multiple"
      customeRender
      showSearch
      placeholder="Please select"
      :columns="columns"
      option-label-prop="label"
      :fieldNames="fieldNames"
      :onSearch="onSearch"
    />
  </div>
</template>
<script lang="ts" setup>
import { selectParam, selectFetch } from '../../../../sites/pc/http/do.ts';
import fetch from '../../../../sites/pc/http/http';
import { ref, reactive } from 'vue'
const multipleValue = ref([])
const selectTableRef = ref(null)
const params = reactive(selectParam)
const columns = ref([
  {
    title: 'Descrshort',
    dataIndex: 'descrshort'
  },
  {
    title: 'LeaseClassOps',
    dataIndex: 'leaseClassOps'
  },
  {
    title: 'LeaseType',
    dataIndex: 'leaseType'
  }
])
const fieldNames = reactive({
  label: 'leaseType',
  value: 'descrshort'
})
const onSearch = (value) => {
  params.additionCondition.expresses[0].right.value = value
  selectTableRef.value.getOptions()
}
</script>
```


## SelectTable 属性

[select 属性请看](/components/select)

|属性	|说明	|类型	|可选值	|默认值|
|---- |----- |------ |---  |---- |
|request	|请求	| function|	—|	() => {}|
|isShowSubTitle	| 是否显示副标题	| Boolean |	false |	-|
|fieldNames	| 配置下拉列表要显示字段，label: 'businessUnit', value: 'businessUnit', subTitle: 'contractNum', value配置主标题，subTitle配置副标题 	| Object | - |	-|
|param	|参数	| Object|	—|	{}|
|isShowItemRecord	|是否返回当前选中对象信息，默认只返回选择的value值	| Boolean |	false |	-|
|method	|请求方式	| String|	—|	-|
|onSearch	|search 回调	| Function|	—|	-|
|loadmore	|上拉加载 回调	| Function|	—|	-|
|props	|值	| Object	{totalRecord: 'totalRecord', pageSize: 'pageSize', currentPage: 'currentPage', searchValue: 'title'}|	-| -|



