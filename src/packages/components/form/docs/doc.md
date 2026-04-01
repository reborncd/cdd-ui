## Form
## 基础用法
```vue demo
<template>
  <fl-form
    :form="form"
  >
  </fl-form>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
const form = reactive({
  title: 'form 标题',
  controls: [
    {
      labelName: 'Multiple Selection',
      tip: '多选组件',
      value: '',
      key: '',
      type: 'select',
      operatorOptions: {// in notin
        operator: 'in', // 必传
        options: [
          'in',
          'not in',
        ]
      },
      propsData: {
        customeRender: true,
        options:[
          { key: 1, location: 'ADCAN', level: 'Port', description: 'Canillo' }
        ],
        dropdownMatchSelectWidth: false,
        paginationConfig: {
          current: 1,
          pageSize: 10,
          total: 1
        },
        columns: [
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
        ],
        value: ''
      }
    },
    {
      labelName: 'Single Selection',
      tip: '搜索联想',
      value: '',
      key: '',
      type: 'autocomplete',
      operatorOptions: {// in notin
        operator: '=', // 必传
        options: [
          '='
        ]
      },
      propsData: {
        type: 'select',
        options:[
          {
            key: 1,
            location: 'ADCAN',
            level: 'Port',
            description: 'Canillo',
            columns: [
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
            ],
            options: [
              { value: 'location', location: 'location', level: 'level', description: 'description' },
              { value: 'location2', location: 'location2', level: 'level2', description: 'description2' }
            ]
          }
        ],
        value: '222'
      }
    },
    {
      labelName: 'Date Range',
      tip: '日期选择',
      value: '',
      key: '',
      type: 'datepicker',
      operatorOptions: {// in notin
        operator: '=', // 必传
        options: [
          '='
        ]
      }
    }
  ]
})
console.log(form.controls, 'form==')
</script>
```