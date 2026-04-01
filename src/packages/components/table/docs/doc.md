## table

### 基础用法

```vue demo
<template>
    <div style="width: 100%">
      <fl-table 
        :tableType="tableType"
        isBottomSolidBorder
        headerTextColor="#CCC"
        v-bind="gridOptions"
        :pager-config="pagerConfig"
      >
        <template #table-page-left>
          table-page-left
        </template>
        <template #name={row}>
          {{ row.name }}
          <!-- <template v-if="row.id === 10001">
            <div class="edit-table-vxe-cel">{{ row.name }}</div>
          </template>
          <template v-else>
            <Input />
          </template> -->
          <!-- <Select :options="[{label: '男', value: 'Man'}]" /> -->
          <!-- <Input /> -->
          <!-- <DatePicker /> -->
          <!-- <Checkbox /> -->
        </template>
        <template #toolbar_buttons>
          <fl-icon-button icon="iflorens-arrow-left-bold" :iconStyle="{}" type="line" @click="gridOptions.align = 'left'">居左</fl-icon-button>
          <fl-icon-button icon="iflorens-InfoCircle" :iconStyle="{}" type="line" @click="gridOptions.align = 'center'">居中</fl-icon-button>
          <fl-icon-button icon="iflorens-arrow-right-bold" :iconStyle="{}" type="line" @click="gridOptions.align = 'right'">居右</fl-icon-button>
          <fl-icon-button icon="iflorens-PlusSquare" :iconStyle="{}" type="line" @click="gridOptions.rowConfig.height += 10">增加行高</fl-icon-button>
          <fl-icon-button icon="iflorens-Sync" :iconStyle="{}" type="line" @click="gridOptions.rowConfig.height = 30">恢复行高</fl-icon-button>
          <fl-icon-button icon="iflorens-Swap" :iconStyle="{}" type="line" @click="gridOptions.stripe = !gridOptions.stripe">是否需要斑马纹</fl-icon-button>
          <fl-icon-button icon="iflorens-Swap" :iconStyle="{}" type="line" @click="gridOptions.rowConfig.isHover = !gridOptions.rowConfig.isHover">是否需要hover</fl-icon-button>
          <fl-icon-button :iconStyle="{}" type="line" @click="tableType = tableType == 'wavy-line' ? '' : 'wavy-line'">切换主题</fl-icon-button>
          <fl-icon-button :iconStyle="{}" type="line" @click="gridOptions.data=[{ id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou',remark: '占位符' },]">动态渲染数据</fl-icon-button>
          <fl-icon-button :iconStyle="{}" type="line" @click="gridOptions.columns=[{ 
          field: 'sex', 
          title: 'sex', 
          sortable: true, 
          titlePrefix: {
            content: 'Click to Ascending Sort', 
            class: 'require-unit'
          } 
        },]">动态渲染列</fl-icon-button>
        <fl-icon-button :iconStyle="{}" type="line" @click="addData">新增数据</fl-icon-button>
        </template>
      </fl-table>
    </div>
</template>
<script lang="ts">
import { reactive, ref } from "vue"
import { Input, Select, DatePicker, Checkbox } from "ant-design-vue";
export default {
  components: {
    Input,
    Select,
    DatePicker,
    Checkbox
  },
  setup() {
    const pagerConfig = reactive({
      total: 100,
      currentPage: 1,
      pageSize: 100,
      pageSizes: [100, 200, 500],
      layouts: ['Total','PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes'],
      size:'medium',
      mode: 'darkBlue',
    })
    const tableType = ref('');
    const gridOptions = reactive({
      border: 'none',
      stripe: false,
      // height: 300,
      align: null,
      showOverflow: 'tooltip',
      columnConfig: {
        resizable: true,
      },
      rowConfig: {
        // isCurrent: true,
        height: 30,
        isHover: true,
      },
      
      columns: [
        { 
          type: 'seq', 
          width: 50 
        },
        { 
          field: 'name', 
          title: 'name', 
          sortable: true,
          className: "edit-table-vxe-cel",
          slots: {
            default: 'name'
          },
          // type: 'checkbox',
          // sortable: true,
          filters: [
            { label: '包含 6', value: '6', checked: false },
            { label: '包含 4', value: '4', checked: false }
          ],
          titlePrefix: {
            content: 'Click to Ascending Sort', 
            class: 'require-unit',
          }  
        },
        { 
          field: 'sex', 
          title: 'sex', 
          // sortable: true, 
          titlePrefix: {
            content: 'Click to Ascending Sort', 
            class: 'require-unit'
          } 
        },
        { 
          field: 'address', 
          title: 'Address', 
          // sortable: true, 
          titlePrefix: {
            content: 'Click to Ascending Sort', 
            class: 'require-unit'
          } 
        },
        {
          field: 'remark',
          title: 'remark',
        }
      ],
      toolbarConfig: {
        slots: {
          buttons: 'toolbar_buttons'
        }
      },
      data: [
        { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen',remark: '占位符占位符占位符占位符占位符占位符' },
        { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou',remark: '占位符' },
        { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai',remark: '占位符' },
        { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women', age: 23, address: 'Shenzhen',remark: '占位符' },
        { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai',remark: '占位符' },
        { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women', age: 21, address: 'Shenzhen',remark: '占位符' },
        { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: 'Man', age: 29, address: 'Shenzhen',remark: '占位符' },
        { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: 'Man', age: 35, address: 'Shenzhen',remark: '占位符' }
      ]
    })
    // 用于生成唯一ID的函数
    const generateUniqueId = () => {
      return Date.now() + Math.floor(Math.random() * 1000);
    }

    // 新增数据的方法
    const addData = () => {
      const newRow = {
        id: generateUniqueId(),
        name: `New User ${gridOptions.data.length + 1}`,
        nickname: `NU${gridOptions.data.length + 1}`,
        role: 'New',
        sex: Math.random() > 0.5 ? 'Man' : 'Woman',
        age: Math.floor(Math.random() * 30) + 20,
        address: 'New City',
        remark: '新增数据'
      }

      // 将新行添加到数据数组的开头
      gridOptions.data.unshift(newRow)

      // 更新分页信息（如果需要）
      if (pagerConfig.total !== undefined) {
        pagerConfig.total += 1
      }

      console.log('新行已添加:', newRow)
    }
    return {
      gridOptions,
      tableType,
      pagerConfig,
      addData
    }
  },
};
</script>
```

### 事件绑定

```vue demo
<template>
    <div style="width: 100%">
      <fl-table 
        v-bind="gridOptions"
        v-on="gridEvents"
      >
      </fl-table>
    </div>
</template>
<script lang="ts">
import { reactive } from "vue"
import { VxeGridListeners } from 'vxe-table'
export default {
  setup() {
    const meanNum = (list: any[], field: string) => {
      let count = 0
      list.forEach(item => {
        count += Number(item[field])
      })
      return count / list.length
    }

    const sumNum = (list: any[], field: string) => {
      let count = 0
      list.forEach(item => {
        count += Number(item[field])
      })
      return count
    }
    const gridOptions = reactive({
      isBottomSolidBorder: true,
      border: true,
      stripe: true,
      showFooter: true,
      showOverflow: 'tooltip',
      height: 400,
      tooltipConfig: {},
      exportConfig: {},
      menuConfig: {},
      columnConfig: {
        resizable: true
      },
      editConfig: {
        trigger: 'click',
        mode: 'cell'
      },
      columns: [
        { type: 'seq', width: 60 },
        { field: 'name', title: 'Name', editRender: { name: 'input' } },
        { field: 'role', title: 'Role', editRender: { name: 'textarea' } },
        { field: 'age', title: 'Age', editRender: { name: 'select' } },
        { field: 'sex', title: 'Sex', editRender: { name: 'input' } },
        { field: 'date', title: 'Date', editRender: { name: 'textarea' } }
      ],
      data: [
        { id: 10001, name: 'Test1', role: 'Develop', sex: '0', age: 28, date: '2021-03-13' },
        { id: 10002, name: 'Test2', role: 'Test', sex: '1', age: 22, date: '2021-01-05' },
        { id: 10003, name: 'Test3', role: 'PM', sex: '0', age: 32, date: '2021-04-13' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: '1', age: 23, date: '2021-09-13' },
        { id: 10005, name: 'Test5', role: 'Develop', sex: '1', age: 30, date: '2021-10-13' },
        { id: 10006, name: 'Test6', role: 'Designer', sex: '1', age: 21, date: '2021-01-33' }
      ],
      footerMethod ({ columns, data }) {
        return [
          columns.map((column, columnIndex) => {
            if (columnIndex === 0) {
              return '和值'
            }
            if (['age', 'rate'].includes(column.field)) {
              return sumNum(data, column.field)
            }
            return ''
          }),
          columns.map((column, columnIndex) => {
            if (columnIndex === 0) {
              return '平均'
            }
            if (['age', 'rate'].includes(column.field)) {
              return meanNum(data, column.field)
            }
            return ''
          })
        ]
      }
    })
    const gridEvents: VxeGridListeners<RowVO> = {
      headerCellClick (params) {
        const { column } = params
        console.log(`表头单元格点击${column.title}`)
      },
      headerCellDblclick (params) {
        const { column } = params
        console.log(`表头单元格双击${column.title}`)
      },
      headerCellMenu (params) {
        const { column } = params
        console.log(`表头右键单元格 ${column.title}`)
      },
      cellClick (params) {
        const { column } = params
        console.log(`单元格点击${column.title}`)
      },
      cellDblclick (params) {
        const { column } = params
        console.log(`单元格双击${column.title}`)
      },
      cellMenu (params) {
        const { row } = params
        console.log(`单元格右键行 ${row.name}`)
      },
      footerCellClick (params) {
        const { column } = params
        console.log(`表尾单元格点击${column.title}`)
      },
      footerCellDblclick (params) {
        const { column } = params
        console.log(`表尾单元格双击${column.title}`)
      },
      footerCellMenu (params) {
        const { column } = params
        console.log(`表尾右键单元格 ${column.title}`)
      },
      checkboxChange (params) {
        console.log(`复选框切换 ${params.checked}`)
      },
      checkboxAll (params) {
        console.log(`复选框全选切换 ${params.checked}`)
      },
      scroll (params) {
        console.log(`滚动事件scrollTop=${params.scrollTop} scrollLeft=${params.scrollLeft}`)
      },
      zoom (params) {
        console.log(`表格全屏 type=${params.type}`)
      },
      custom (params) {
        console.log(`表格自定义列 type=${params.type}`)
      }
    }
    return {
      gridOptions,
      gridEvents
    }
  },
};
</script>
```
## 虚拟滚动

```vue demo
<template>
    <div style="width: 100%">
      <fl-table 
        tableType='wavy-line'
        v-bind="gridOptions"
        :scroll-y="{ enabled: true }"
        :pager-config="pagerConfig"
        @pageChange="onPageChange"
      >
      </fl-table>
    </div>
</template>
<script lang="ts">
import { reactive } from "vue"
export default {
  setup() {
    const pagerConfig = reactive({
      total: 200,
      currentPage: 1,
      pageSize: 100,
      pageSizes: [100, 200, 500],
      layouts: ['Total','PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes'],
      size:'medium',
    })
    const gridOptions = reactive({
      border: 'none',
      height: 300,
      align: null,
      showOverflow: 'tooltip',
      columnConfig: {
        resizable: true
      },
      rowConfig: {
        isHover: true
      },
      columns: [
        { 
          type: 'seq', 
          width: 100
        },
        { 
          field: 'name', 
          title: 'name', 
          sortable: true,
        },
        { 
          field: 'role', 
          title: 'role', 
          sortable: true,
        },
        { 
          field: 'sex', 
          title: 'sex', 
          sortable: false, 
        }
      ],
      data: []
    })
    setTimeout(() => {
      // 模拟数据
      const mockList: any[] = []
      for (let index = 0; index < 600; index++) {
        mockList.push({
          id: index,
          name: 'Test' + index,
          role: 'Developer',
          sex: '男'
        })
      }
      gridOptions.data = mockList
      pagerConfig.total = mockList.length
    }, 100)
    const onPageChange = (params) => {
      pagerConfig.currentPage=params.currentPage
      pagerConfig.total = pagerConfig.total+1
    }
    return {
      gridOptions,
      pagerConfig,
      onPageChange
    }
  },
};
</script>
```
## 复选模式
```vue demo
<template>
    <div style="width: 100%">
      <fl-table 
        tableType='wavy-line'
        v-bind="gridOptions"
        :scroll-y="{ enabled: true }"
        :pager-config="pagerConfig"
        @pageChange="onPageChange"
      >
      </fl-table>
    </div>
</template>
<script lang="ts">
import { reactive } from "vue"
export default {
  setup() {
    const pagerConfig = reactive({
      total: 200,
      currentPage: 1,
      pageSize: 100,
      pageSizes: [100, 200, 500],
      layouts: ['Total','PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes'],
      size:'medium',
    })
    const gridOptions = reactive({
      border: 'none',
      height: 300,
      align: null,
      showOverflow: 'tooltip',
      columnConfig: {
        resizable: true
      },
      rowConfig: {
        isHover: true
      },
      columns: [
        { 
          field: 'name',
          title: 'name', 
          type: 'checkbox',
          sortable: true,
        },
        { 
          field: 'role', 
          title: 'role', 
          sortable: true,
        },
        { 
          field: 'sex', 
          title: 'sex', 
          sortable: false, 
        }
      ],
      data: []
    })
    setTimeout(() => {
      // 模拟数据
      const mockList: any[] = []
      for (let index = 0; index < 600; index++) {
        mockList.push({
          id: index,
          name: 'Test' + index,
          role: 'Developer',
          sex: '男'
        })
      }
      gridOptions.data = mockList
      pagerConfig.total = mockList.length
    }, 100)
    const onPageChange = (params) => {
      pagerConfig.currentPage=params.currentPage
      pagerConfig.total = pagerConfig.total+1
    }
    return {
      gridOptions,
      pagerConfig,
      onPageChange
    }
  },
};
</script>
```

### 使用之前项目在main引入


```javascript
import 'vxe-table/lib/style.css';

import 'vxe-pc-ui/lib/style.css';

import { VxeUI } from 'vxe-table';
VxeUI.setConfig({
  i18n: (key: string, args: any) => {
    switch (key) {
      case 'vxe.pager.total':
        return `Total ${args} items`
      case 'vxe.pager.pagesize':
        return `${args}/Page`
      default:
        return '';
    }
  }
})
```

### 编辑类型表格

```vue demo
<template>
    <div style="width: 100%">
      <fl-table 
        :tableType="tableType"
        isBottomSolidBorder
        headerTextColor="#CCC"
        v-bind="gridOptions"
        :pager-config="pagerConfig"
        :editTableType="true"
      >
        <template #name={row}>
          
          <template v-if="row.id === 10001">
            <div class="edit-table-vxe-cel">{{ row.name }}</div>
          </template>
          <template v-else>
            <Input />
          </template>
          <!-- <Select :options="[{label: '男', value: 'Man'}]" /> -->
          <!-- <Input /> -->
          <!-- <DatePicker /> -->
          <!-- <Checkbox /> -->
        </template>
        <template #sex={row}>
          <template v-if="row.id === 10001">
            <div class="edit-table-vxe-cel edit-table-vxe-cel-right">{{ row.sex }}</div>
          </template>
          <template v-else>
            <Select :options="[{label: '男', value: 'Man'}]" />
          </template>
          
        </template>
        <template #address={row}>
          <template v-if="row.id === 10001">
            <div class="edit-table-vxe-cel">{{ row.address }}</div>
          </template>
          <template v-else>
            <DatePicker :options="[{label: '男', value: 'Man'}]" />
          </template>
          
        </template>
        <template #remark={row}>
          <div class="edit-table-vxe-cel">{{ row.remark }}</div>
        </template>
      </fl-table>
    </div>
</template>
<script lang="ts">
import { reactive, ref } from "vue"
import { Input, Select, DatePicker, Checkbox } from "ant-design-vue";
export default {
  components: {
    Input,
    Select,
    DatePicker,
    Checkbox
  },
  setup() {
    const pagerConfig = reactive({
      total: 100,
      currentPage: 1,
      pageSize: 100,
      pageSizes: [100, 200, 500],
      layouts: ['Total','PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes'],
      size:'medium',
    })
    const tableType = ref('');
    const gridOptions = reactive({
      border: 'none',
      stripe: false,
      // height: 300,
      align: null,
      showOverflow: 'tooltip',
      columnConfig: {
        resizable: true,
      },
      rowConfig: {
        // isCurrent: true,
        height: 30,
        isHover: true,
      },
      
      columns: [
        { 
          type: 'seq', 
          width: 50 
        },
        { 
          field: 'name', 
          title: 'name', 
          sortable: true,
          slots: {
            default: 'name'
          },
          // type: 'checkbox',
          // sortable: true,
          filters: [
            { label: '包含 6', value: '6', checked: false },
            { label: '包含 4', value: '4', checked: false }
          ],
          titlePrefix: {
            content: 'Click to Ascending Sort', 
            class: 'require-unit',
          }  
        },
        { 
          field: 'sex', 
          title: 'sex', 
          slots: {
            default: 'sex'
          },
          // sortable: true, 
          titlePrefix: {
            content: 'Click to Ascending Sort', 
            class: 'require-unit'
          } 
        },
        { 
          field: 'address', 
          title: 'Address', 
          slots: {
            default: 'address'
          },
          // sortable: true, 
          titlePrefix: {
            content: 'Click to Ascending Sort', 
            class: 'require-unit'
          } 
        },
        {
          field: 'remark',
          title: 'remark',
          slots: {
            default: 'remark'
          },
        }
      ],
      toolbarConfig: {
        slots: {
          buttons: 'toolbar_buttons'
        }
      },
      data: [
        { id: 10001, name: 'Test1', nickname: 'T1', role: 'Develop', sex: 'Man', age: 28, address: 'Shenzhen',remark: '占位符占' },
        { id: 10002, name: 'Test2', nickname: 'T2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou',remark: '占位符' },
        { id: 10003, name: 'Test3', nickname: 'T3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai',remark: '占位符' },
        { id: 10004, name: 'Test4', nickname: 'T4', role: 'Designer', sex: 'Women', age: 23, address: 'Shenzhen',remark: '占位符' },
        { id: 10005, name: 'Test5', nickname: 'T5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai',remark: '占位符' },
        { id: 10006, name: 'Test6', nickname: 'T6', role: 'Designer', sex: 'Women', age: 21, address: 'Shenzhen',remark: '占位符' },
        { id: 10007, name: 'Test7', nickname: 'T7', role: 'Test', sex: 'Man', age: 29, address: 'Shenzhen',remark: '占位符' },
        { id: 10008, name: 'Test8', nickname: 'T8', role: 'Develop', sex: 'Man', age: 35, address: 'Shenzhen',remark: '占位符' }
      ]
    })
    // 用于生成唯一ID的函数
    const generateUniqueId = () => {
      return Date.now() + Math.floor(Math.random() * 1000);
    }

    // 新增数据的方法
    const addData = () => {
      const newRow = {
        id: generateUniqueId(),
        name: `New User ${gridOptions.data.length + 1}`,
        nickname: `NU${gridOptions.data.length + 1}`,
        role: 'New',
        sex: Math.random() > 0.5 ? 'Man' : 'Woman',
        age: Math.floor(Math.random() * 30) + 20,
        address: 'New City',
        remark: '新增数据'
      }

      // 将新行添加到数据数组的开头
      gridOptions.data.unshift(newRow)

      // 更新分页信息（如果需要）
      if (pagerConfig.total !== undefined) {
        pagerConfig.total += 1
      }

      console.log('新行已添加:', newRow)
    }
    return {
      gridOptions,
      tableType,
      pagerConfig,
      addData
    }
  },
};
</script>
```


### Table 属性(完整版)
[link](https://www.vxetable.cn/v4_old/#/grid/api)
### Table 属性(基础版)

| 属性名 | 说明 | 类型 | 可选值 | 默认值 |
|--------|------|------|--------|--------|
| tableType | 风格 | string | wavy-line | - |
| id | 唯一标识（被某些特定的功能所依赖） | string | - | - |
| columns | 列配置 | array | - | - |
| data | 表格数据（与 loadData 行为一致，更新数据是不会重置状态） | any[] | - | - |
| height | 表格的高度；支持铺满父容器或者固定高度，如果设置 auto 为铺满父容器（如果设置为 auto，则必须确保存在父节点且不允许存在相邻元素） | number \| string | auto, %, px | - |
| min-height | 表格最小高度 | number \| string | %, px | 默认 144，继承 setup.table.minHeight |
| max-height | 表格的最大高度 | number \| string | %, px | - |
| auto-resize | 自动监听父元素的变化去重新计算表格（对于父元素可能存在动态变化、显示隐藏的容器中、列宽异常等场景中的可能会用到） | boolean | - | false |
| sync-resize | 自动跟随某个属性的变化去重新计算表格，和手动调用 recalculate 方法是一样的效果（对于通过某个属性来控制显示/隐藏切换时可能会用到） | boolean \| string \| number | - | - |
| resizable | 已废弃，被 column-config.resizable 替换 | boolean | - | 默认 false，继承 setup.table.resizable |
| stripe | 是否带有斑马纹（需要注意的是，在可编辑表格场景下，临时插入的数据不会有斑马纹样式） | boolean | - | 默认 false，继承 setup.table.stripe |
| border | 是否带有边框 | boolean \| string | default（默认）, full（完整边框）, outer（外边框）, inner（内边框）, none（无边框） | 默认 false，继承 setup.table.border |
| round | 是否为圆角边框 | boolean | - | 默认 false，继承 setup.table.round |
| size | 表格的尺寸 | string | medium, small, mini | 继承上下文 |
| loading | 表格是否显示加载中 | boolean | - | true |
| align | 所有的列对齐方式 | string | left（左对齐）, center（居中对齐）, right（右对齐） | left |
| header-align | 所有的表头列的对齐方式 | string | left（左对齐）, center（居中对齐）, right（右对齐） | 继承 align |
| footer-align | 所有的表尾列的对齐方式 | string | left（左对齐）, center（居中对齐）, right（右对齐） | 继承 align |
| show-header | 是否显示表头 | boolean | - | false |
| highlight-current-row | 已废弃，被 row-config.isCurrent 替换 | boolean | - | false |
| highlight-hover-row | 已废弃，被 row-config.isHover 替换 | boolean | - | false |
| highlight-current-column | 已废弃，被 column-config.isCurrent 替换 | boolean | - | false |
| highlight-hover-column | 已废弃，被 column-config.isHover 替换 | boolean | - | false |
| row-class-name | 给行附加 className | string \| (({ row, rowIndex, $rowIndex }) => any) | - | - |
| cell-class-name | 给单元格附加 className | string \| (({ row, rowIndex, $rowIndex, column, columnIndex, $columnIndex }) => any) | - | - |
| header-row-class-name | 给表头的行附加 className | string \| (({ $rowIndex }) => any) | - | - |
| header-cell-class-name | 给表头的单元格附加 className | string \| (({ $rowIndex, column, columnIndex, $columnIndex }) => any) | - | - |
| footer-row-class-name | 给表尾的行附加 className | string \| (({ $rowIndex }) => any) | - | - |
| footer-cell-class-name | 给表尾的单元格附加 className | string \| (({ $rowIndex, column, columnIndex, $columnIndex }) => any) | - | - |
| cell-style | 给单元格附加样式 | any \| (({ row, rowIndex, $rowIndex, column, columnIndex, $columnIndex }) => any) | - | - |
| header-cell-style | 给表头单元格附加样式 | any \| (({ $rowIndex, column, columnIndex, $columnIndex }) => any) | - | - |
| footer-cell-style | 给表尾单元格附加样式 | any \| (({ $rowIndex, column, columnIndex, $columnIndex }) => any) | - | - |
| row-style | 给行附加样式，也可以是函数 | any \| (({ row, rowIndex, $rowIndex }) => any) | - | - |
| header-row-style | 给表头行附加样式 | any \| (({ $rowIndex, column, columnIndex, $columnIndex }) => any) | - | - |
| footer-row-style | 给表尾行附加样式 | any \| (({ $rowIndex }) => any) | - | - |
| show-footer | 是否显示表尾 | boolean | - | false |
| footer-data | 表尾数据 | any[] | - | - |
| footer-method | 表尾的数据获取方法，返回一个二维数组 | ({ columns, data }) => any[][] | - | - |
| merge-cells | 临时合并指定的单元格 (不能用于展开行，不建议用于固定列、树形结构) | Array<{ row: number, col: number, rowspan: number, colspan: number }> | - | - |
| merge-footer-items | 临时合并表尾 (不能用于展开行，不建议用于固定列、树形结构) | Array<{ row: number, col: number, rowspan: number, colspan: number }> | - | - |
| span-method | 自定义合并函数，返回计算后的值 (不能用于虚拟滚动、展开行，不建议用于固定列、树形结构) | ({ row, rowIndex, $rowIndex, _rowIndex, column, columnIndex, $columnIndex, _columnIndex, data }) => { rowspan: number, colspan: number} | - | { rowspan: 1, colspan: 1} |
| footer-span-method | 表尾合并行或列，返回计算后的值 (不能用于虚拟滚动、展开行，不建议用于固定列、树形结构) | ({ $rowIndex, column, columnIndex, $columnIndex, _columnIndex, data }) => { rowspan: number, colspan: number} | - | { rowspan: 1, colspan: 1} |
| show-overflow | 设置所有内容过长时显示为省略号（如果是固定列建议设置该值，提升渲染速度） | boolean \| string | ellipsis（只显示省略号）,title（并且显示为原生 title）,tooltip（并且显示为 tooltip 提示） | - |
| show-header-overflow | 设置表头所有内容过长时显示为省略号 | boolean \| string | ellipsis（只显示省略号）,title（并且显示为原生 title）,tooltip（并且显示为 tooltip 提示） | - |
| show-footer-overflow | 设置表尾所有内容过长时显示为省略号 | boolean \| string | ellipsis（只显示省略号）,title（并且显示为原生 title）,tooltip（并且显示为 tooltip 提示） | - |
| column-key | 已废弃，被 column-config.useKey 替换 | boolean | - | false |
| row-key | 已废弃，被 row-config.useKey 替换 | boolean | - | false |
| row-id | 已废弃，被 row-config.keyField 替换 | string | - | 默认 _X_ROW_KEY，继承 setup.table.rowId |









