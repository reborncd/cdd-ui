## Pages

### 基本用法

```vue demo
<template>
  <!-- :isShowSaveSearch="false" -->
  <!-- :tableHeightOffset="15" -->
	<div style="background: rgba(245,246,249, 1.00);padding: 24px;border-radius: 10px;height: 600px">
		<cdd-pages
			:fetch="fetch"
			title="Lease Contract"
      :headerDisabled="['BU']"
      :headerDraggableDisabledArr="['BU', 'BU1']"
      :requestFileId="testCustomerExcel"
			v-model:gridOptions="gridOptions"
      :gridEvents="gridEvents"
      v-model:tableColumns="tableColumns"
      :formSaveParam="{searchType: 'Lease Purchase2'}"
      v-model:form="formData"
      :initSearch="true"
      :searchWidth="340"
      @changeLineHeight="changeLineHeight"
      @dragableChange="dragableChange"
      @tableFieldChange="tableFieldChange"
      @search="onSearch"
      @reset="resetForm"
      @pageChange="onPageChange"
		>
      <!-- <template #table-page-left>
        table-page-left
      </template> -->
      
      <!-- <template #collect-default>
        我是collect自定义内容
      </template> -->
      <!-- form底部自定义内容 -->
      <template #form-bottom>
        我是自定义内容
      </template>
      <!-- page底部自定义内容 -->
      <!-- <template #page-bottom>
        page底部自定义内容
      </template> -->
      <template #businessUnit={row}>
        自定义{{row}}
      </template>
      <!-- <template #page-table-customize>
        ssss
      </template> -->
      
    </cdd-pages>
	</div>
</template>

<script lang="ts">
import { ref, h, reactive, provide } from "vue"
import { excelParam, selectFetch, selectParam, testCustomerExcel } from '../../../../sites/pc/http/do.ts'
import fetch from '../../../../sites/pc/http/http.ts'
import { VxeGridListeners } from 'vxe-table'
import { formControls, tableColumnsM } from "./index.ts"
import { Checkbox as ACheckbox, Row as ARow, Col as ACol, message } from 'ant-design-vue'
import cloneDeep from 'lodash-es/cloneDeep'
export default {
  setup() {
    const tableColumns = ref(tableColumnsM)
    // 横向滚动需要设置width
    tableColumns.value.forEach(it => {
      it.minWidth = 120
    })
    const gridOptions = reactive({
      border: false,
      stripe:true,
      // height: 500,
      loading: true,

      align: null,
      showHeaderOverflow: true,
      showOverflow: 'tooltip',
      columnConfig: {
        // resizable: true,
      },
      scrollX: {
        enabled: true,
        gt: 0
      },
      scrollY: {
        enabled: true,
        gt: 20
      },
      rowConfig: {
        height: 40,
        isHover: true,
      },
      sortConfig: {
        remote: true, // true-远程搜索 false-表格内排序
      },
      pagerConfig: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        layouts: ['Total','PrevPage', 'JumpNumber', 'NextPage', 'Sizes'],
      },
      columns: [...tableColumns.value],
      data: [
        
      ]
    })
    setTimeout(() => {
      gridOptions.loading = false;
    }, 3000)
    const gridEvents: VxeGridListeners<RowVO> = {
      sortChange (params) {
        console.log(`排序切换 ${params.column.title} ${params.order}`)
        const paramsData = {
          sort: {
            [`${params.column.field}`]: params.order ? params.order : undefined
          },
          ...formParams.value
        }
        getListData(paramsData)
      },
      filterChange (params) {
        console.log(`筛选切换 ${params.column.title} ${params.values}`)
      },
      resizableChange ({ column, width }) {
        console.log(`列宽调整，调整后列名${column.field}宽度为 ${column.resizeWidth}`)
      }
    }
    const dateFormat = 'YYYY-MM-DD'
    const defaultForm = {
      title: 'form',
      controls: formControls
    }
    const formData = ref(cloneDeep(defaultForm))
    const changeLineHeight = (height) => {
      console.log(`切换table 行高为：${height}`)
    }
    const dragableChange = (fields, columns) => {
      console.log('drageableChange')
    }
    const tableFieldChange = (columns) => {
      gridOptions.columns = columns
    }
    
    const formParams = ref([])
    const onSearch = async (form) => {
      console.log('onSearch', form)
      formParams.value = form
      getListData()
    }
    const resetForm = () => {
      formData.value = cloneDeep(defaultForm)
    }
    const onPageChange = ({ currentPage }) => {
      Object.assign(gridOptions.pagerConfig, {
        currentPage
      })
      getListData()
    }
    const getListData = async (params) =>  {
      const { pagerConfig: { currentPage, pageSize } } = gridOptions
      try {
        const data = [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]
        const totalRecord = 100
        
        gridOptions.data = data
        Object.assign(gridOptions.pagerConfig, {
          total: totalRecord
        })
      } catch (error) {
        gridOptions.data = []
        Object.assign(gridOptions.pagerConfig, {
          total: 0
        })
        console.error(error)
      }
    }
    return {
      fetch,
      testCustomerExcel,
      tableColumns,
      gridOptions,
      gridEvents,
      formData,
      changeLineHeight,
      dragableChange,
      tableFieldChange,
      onSearch,
      resetForm,
      onPageChange
      
    }
  },
};
</script>
```


## Pages 属性

|属性	|说明	|类型	|可选值	|默认值|
|---- |----- |------ |---  |---- |
|isShowSearchForm	|是否显示左边 search	| Boolean	| - |	true|
|isShowExportBtn	|是否显示导出按钮	| Boolean	| - |	true|
|isShowDensityBtn	|是否显示Density按钮	| Boolean	| - |	true|
|isShowFiltersBtn	|是否显示Filters按钮	| Boolean	| - |	true|
|request	|请求	| function|	—|	() => {}|
|url	|请求url	| String|	—|	-|
|param	|参数	| Object|	—|	{}|
|method	|请求方式	| String|	—|	-|
|gridOptions	| table配置	| Object	| - |	-|
| initSearch | 初始化调用onSearch | Boolean | - | false |
| searchWidth | 初始化search组件宽度 | Number | - | 264 |
| isShowDown | 是否显示可切换的搜索条件 | Boolean | - | true |
| dropdownWidth | 设置搜索条件dropdown宽度 | Number | - | 240 |
| defaultActiveFirstOption | 是否默认高亮第一个选项。 | Boolean | - |  false |



### Pages Events

|事件	|说明	|回调	|
|---- |----- |------ |
|changeLineHeight	| 设置table行高	| Function(height:number) => {} |
|dragableChange	| table字段排序回调	| Function(checkedList: array, allTitleList: array) => {} |
|tableFieldChange	| table显示字段修改回调	| Function(checkedList: array) => {} |
| search	|点击Search按钮触发	| Function(value: array) => {}|
| delete	| dropdown列表删除	| Function(i: number) => {}|
| pageChange	| 切换分页	| Function() => {}|


