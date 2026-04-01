## Search

### Search 自定义插槽
#### 支持禁用输入框或者下拉框

```vue demo
<template>
  <fl-search
    :isShowCollectBtn="false"
    v-model:form="formData"
    :label-col="{ span: 4 }"
    :wrapper-col="{ span: 18 }"
    :initSearch="true"
    :formSaveParam="{searchType: 'Lease Purchase2'}"
    :searchInitForm="searchInitForm"
    :fetch="fetch"
    @reset="resetForm"
    @search="onSearch"
  >
    <template v-slot:page-top-right>
      <a-button type="primary" @click="clickMe">我是自定义内容</a-button>
    </template>
    <template #form-right>
      <a-button type="primary" @click="clickMe">我是自定义内容</a-button>
    </template>
    <template #form-bottom>
      <a-row>
        <a-col style="padding: 4px 12px 0 12px; height: 32px; width: 702px;background: #F5F6F9; border-radius: 8px;">
          <a-checkbox v-model:checked="checked">Include History2</a-checkbox>
        </a-col>
      </a-row>
    </template>
  </fl-search>
</template>
<script lang="ts" setup>
import { ref, provide } from 'vue'
import dayjs, { Dayjs } from 'dayjs'
import fetch from '../../../../sites/pc/http/http.ts'
import { selectParam, selectFetch } from '../../../../sites/pc/http/do.ts';
import { Button as AButton, Checkbox as ACheckbox, Row as ARow, Col as ACol } from 'ant-design-vue'
import cloneDeep from 'lodash-es/cloneDeep'
import { sessionData, mergeForm } from '../../../utils/util.ts'
const checked = ref(true)
const dateFormat = 'YYYY/MM/DD'
const sessionFormData = sessionData("get", "leasePurchase") ? sessionData("get", "leasePurchase") : {};
const searchInitForm = ref(sessionFormData || {});

const defaultForm = {
  title: 'form',
  controls: [
    {
      labelName: 'test',
      labelAlign: 'left',
      tip: '',
      value: '',
      key: 'test',

      operatorOptions: {
        operator: 'in', // 必传
        options: []
      },
      propsData: {
        customeRender: false,
        disabled: true,
        optionLabelProp: "children",
        options:[
          {
            key: 1,
            value: 'I',
            label: 'In Review'
          },
          {
            key: 2,
            value: 'A',
            label: 'Approved'
          }
        ],
        dropdownMatchSelectWidth: false,
        value: ['A']
      },
      rules:{
        required: true,
      }
    },
    {
      labelName: 'BU',
      labelAlign: 'left',
      tip: '',
      value: '',
      key: 'BU',
      operatorOptions: {
        operator: 'contains', // 必传
        options: [
          'in',
          'not in',
          '=',
          'not =',
          'begins with',
          'contains',
          'ends with'
        ]
      },
      propsData: {
        customeRender: true,
        options:[
          {
            descrshort: 11111111,
            leaseClassOps: 2222222222,
            leaseType: 3333333
          }
        ],
        fieldNames: {
          label: 'descrshort',
          value: 'descrshort'
        },
        paginationConfig: {
          total: 2,
          currentPage: 1,
          pageSize: 10
        },
        dropdownMatchSelectWidth: false,
        selectProps: {
          totalRecord: 'totalRecord',
          pageSize: 'pageSize',
          currentPage: 'currentPage',
          searchValue: 'value'
        },
        columns: [
          {
            title: 'Descrshort',
            dataIndex: 'descrshort',
            width: '20%'
          },
          {
            title: 'LeaseClassOps',
            dataIndex: 'leaseClassOps',
            width: '30%'
          },
          {
            title: 'LeaseType',
            dataIndex: 'leaseType',
            width: '40%'
          }
        ],
        value: []
      }
    },
    {
      labelName: 'Single Selection',
      labelAlign: 'left',
      tip: '',
      value: '',
      key: 'single',
      type: 'select',
      operatorOptions: {
        operator: '=', // 必传
        isIgnoreCase: true,
        options: [
          'in',
          'not in',
          '=',
          'not =',
          'contains',
          'begins with',
          'contains',
          'ends with'
        ]
      },
      propsData: {
        customeRender: true,
        options:[],
        fieldNames: {
          label: 'descrshort',
          value: 'descrshort'
        },
        request: selectFetch,
        selectParam,
        dropdownMatchSelectWidth: false,
        selectProps: {
          totalRecord: 'totalRecord',
          pageSize: 'pageSize',
          currentPage: 'currentPage',
          searchValue: 'additionCondition.expresses.0.right.value'
        },
        columns: [
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
        ],
        value: []
      }
    },
    {
      labelName: 'Search association',
      labelAlign: 'left',
      tip: '',
      value: '',
      key: 'autocomplete',
      type: 'autocomplete',
      operatorOptions: {// in notin
        operator: 'begins with', // 必传
        options: [
          'in',
          'not in',
          '=',
          'not =',
          'contains',
          'begins with',
          'contains',
          'ends with'
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
            options: [
              { value: 'location', location: 'location', level: 'level', description: 'description' },
              { value: 'location2', location: 'location2', level: 'level2', description: 'description2' }
            ]
          }
        ],
        selectProps: {
          totalRecord: 'totalRecord',
          pageSize: 'pageSize',
          currentPage: 'currentPage',
          searchValue: 'additionCondition.expresses.0.right.value'
        },
        request: selectFetch,
        selectParam,
        columns: [
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
        ],
        value: ''
      }
    },
    {
      labelName: 'Date Selection',
      labelAlign: 'left',
      tip: '',
      value: '',
      key: 'datepicker',
      type: 'datepicker',
      operatorOptions: {// in notin
        operator: 'from', // 必传
        options: [
          'from',
          'to',
          'between'
        ]
      },
      propsData: {
        value: '',
        format: dateFormat
      }
    },
    {
      labelName: 'Date Range',
      labelAlign: 'left',
      tip: '',
      value: '',
      key: 'daterangepicker',
      type: 'daterangepicker',
      operatorOptions: {// in notin
        operator: 'between', // 必传
        type: "number-range",
        options: [
          'from',
          'to',
          'between'
        ]
      },
      propsData: {
        value: [],
        format: dateFormat
      }
    }
  ]
}
const originForm = ref(cloneDeep(defaultForm));
const fomrDataCopy = cloneDeep(defaultForm);
const formData = ref(fomrDataCopy);
const clickMe = () => {
  console.log('clickMe')
}
const resetForm = () => {
  const form = cloneDeep(originForm.value);
	formData.value.controls.forEach((it: any) => {
    if (it.operatorOptions.type === "datePicker" || it.operatorOptions.operator === "from" || it.operatorOptions.operator === "to") {
      it.propsData.value = "";
    } else {
      it.propsData.value = [];
    }
	});
	sessionData("set", "leasePurchase", formData.value);
}
const onSearch = (data: any, type?: string, form) => {
  console.log(data)
  if (type !== "init" && type !== "change") {
		sessionData("set", "leasePurchase", formData.value);
	}
}

</script>
```
#### 支持配置=日期的选择方式
```vue demo
<template>
  <fl-search
    :isShowCollectBtn="false"
    v-model:form="formData"
    :label-col="{ span: 4 }"
    :wrapper-col="{ span: 18 }"
    :initSearch="true"
    :formSaveParam="{searchType: 'Lease Purchase2'}"
    :searchInitForm="searchInitForm"
    :fetch="fetch"
    @reset="resetForm"
    @search="onSearch"
  >
    <!-- <template v-slot:page-top-right>
      <a-button type="primary" @click="clickMe">我是自定义内容</a-button>
    </template>
    <template #form-right>
      <a-button type="primary" @click="clickMe">我是自定义内容</a-button>
    </template> -->
    <!-- <template #form-bottom>
      <a-row>
        <a-col style="padding: 4px 12px 0 12px; height: 32px; width: 702px;background: #F5F6F9; border-radius: 8px;">
          <a-checkbox v-model:checked="checked">Include History2</a-checkbox>
        </a-col>
      </a-row>
    </template> -->
  </fl-search>
</template>
<script lang="ts" setup>
import { ref, provide } from 'vue'
import dayjs, { Dayjs } from 'dayjs'
import fetch from '../../../../sites/pc/http/http.ts'
import { selectParam, selectFetch } from '../../../../sites/pc/http/do.ts';
import { Button as AButton, Checkbox as ACheckbox, Row as ARow, Col as ACol } from 'ant-design-vue'
import cloneDeep from 'lodash-es/cloneDeep'
import { sessionData, mergeForm } from '../../../utils/util.ts'
const checked = ref(true)
const dateFormat = 'YYYY/MM/DD'
const sessionFormData = sessionData("get", "leasePurchase") ? sessionData("get", "leasePurchase") : {};
const searchInitForm = ref(sessionFormData || {});

const defaultForm = {
  title: 'form',
  controls: [
    {
      labelName: 'Date',
      labelAlign: 'left',
      tip: '',
      value: '',
      key: 'date',
      
      operatorOptions: {
        operator: 'between', // 必传
        type: "datePicker",
        options: [
          '=',
          "between"
        ]
      },
      propsData: {
        value: [],
        format: [dateFormat]
      }
    }
  ]
}
const originForm = ref(cloneDeep(defaultForm));
const fomrDataCopy = cloneDeep(defaultForm);
const formData = ref(fomrDataCopy);
const clickMe = () => {
  console.log('clickMe')
}
const resetForm = () => {
  const form = cloneDeep(originForm.value);
	formData.value.controls.forEach((it: any) => {
    it.propsData.value = [];
    const item = form?.controls?.find((item: any) => item.key === it.key);
		it.propsData.value = [];
		it.operatorOptions = item.operatorOptions;
	});
	sessionData("set", "leasePurchase", formData.value);
}
const onSearch = (data: any, type?: string, form) => {
  console.log(data)
  if (type !== "init" && type !== "change") {
		sessionData("set", "leasePurchase", formData.value);
	}
}

</script>
```

#### 支持月份区间的选择方式
```vue demo
<template>
  <fl-search
    :isShowCollectBtn="false"
    v-model:form="formData"
    :label-col="{ span: 4 }"
    :wrapper-col="{ span: 18 }"
    :initSearch="true"
    :formSaveParam="{searchType: 'Lease Purchase2'}"
    :searchInitForm="searchInitForm"
    :fetch="fetch"
    @reset="resetForm"
    @search="onSearch"
  >
  </fl-search>
</template>
<script lang="ts" setup>
import { ref, provide } from 'vue'
import dayjs, { Dayjs } from 'dayjs'
import fetch from '../../../../sites/pc/http/http.ts'
import { selectParam, selectFetch } from '../../../../sites/pc/http/do.ts';
import { Button as AButton, Checkbox as ACheckbox, Row as ARow, Col as ACol } from 'ant-design-vue'
import cloneDeep from 'lodash-es/cloneDeep'
import { sessionData, mergeForm } from '../../../utils/util.ts'
const checked = ref(true)
const dateFormat = 'YYYY/MM/DD'
const sessionFormData = sessionData("get", "leasePurchase2") ? sessionData("get", "leasePurchase2") : {};
const searchInitForm = ref(sessionFormData || {});

const defaultForm = {
  title: 'form',
  controls: [
    {
      labelName: 'Date',
      labelAlign: 'left',
      tip: '',
      value: '',
      key: 'date',
      operatorOptions: {
        operator: 'between', // 必传
        type: "datePicker",
        options: [
          '=',
          "between"
        ]
      },
      propsData: {
        value: [],
        format: "YYYY-MM",
        picker: 'month'
      }
    }
  ]
}
const originForm = ref(cloneDeep(defaultForm));
const fomrDataCopy = cloneDeep(defaultForm);
const formData = ref(fomrDataCopy);
const resetForm = () => {
  const form = cloneDeep(originForm.value);
	formData.value.controls.forEach((it: any) => {
    const item = form?.controls?.find((item: any) => item.key === it.key);
		it.propsData.value = [];
		it.operatorOptions = item.operatorOptions;
	});
	sessionData("set", "leasePurchase2", formData.value);
}
const onSearch = (data: any, type?: string, form) => {
  if (type !== "init" && type !== "change") {
		sessionData("set", "leasePurchase2", formData.value);
	}
}

</script>
```

### Form 配置
```vue demo
<template>
  <fl-form
    v-model:form="defaultForm"
    :label-col="{ span: 4 }"
    :wrapper-col="{ span: 18 }"
    :fetch="fetch"
    :formSaveParam="{searchType: 'Lease Purchase'}"
  >
    <template #form-bottom>
      <a-row>
        <a-col style="padding: 4px 12px 0 12px; height: 32px; width: 702px;background: #F5F6F9; border-radius: 8px;">
          <a-checkbox v-model:checked="checked">Include History</a-checkbox>
        </a-col>
      </a-row>
    </template>
  </fl-form>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import dayjs, { Dayjs } from 'dayjs'
import { selectParam, selectFetch } from '../../../../sites/pc/http/do.ts';
import { Checkbox as ACheckbox, Row as ARow, Col as ACol } from 'ant-design-vue'
import fetch from '../../../../sites/pc/http/http.ts'
const checked = ref(true)
const dateFormat = 'YYYY-MM-DD'
const  validator = (rule, value, callback) => {
  if (!value || !value[0] || !value[1] ) {
    console.log(value)
    return Promise.reject('Please complete');
  }else {
    return Promise.resolve();
  }
};
const defaultForm = ref({
  title: 'form',
  controls: [
    {
      labelName: 'BU',
      labelAlign: 'left',
      tip: '111',
      value: '',
      key: 'BU',
      preventClick: true,
      operatorOptions: {
        operator: 'in', // 必传
        options: [
          'in',
          'not in',
          '=',
          'not =',
          'contains',
          'begins with',
          'contains',
          'ends with'
        ]
      },
      propsData: {
        customeRender: true,
        options:[],
        fieldNames: {
          label: 'descrshort',
          value: 'descrshort'
        },
        request: selectFetch,
        selectParam,
        dropdownMatchSelectWidth: false,
        selectProps: {
          totalRecord: 'totalRecord',
          pageSize: 'pageSize',
          currentPage: 'currentPage',
          searchValue: 'additionCondition.expresses.0.right.value'
        },
        columns: [
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
        ],
        value: []
      }
    },
    {
      labelName: 'Single Selection',
      labelAlign: 'left',
      tip: '',
      value: '',
      key: 'single',
      type: 'select',
      operatorOptions: {
        operator: '=', // 必传
        options: [
          'in',
          'not in',
          '=',
          'not =',
          'contains',
          'begins with',
          'contains',
          'ends with'
        ]
      },
      propsData: {
        customeRender: true,
        options:[],
        fieldNames: {
          label: 'descrshort',
          value: 'descrshort'
        },
        request: selectFetch,
        selectParam,
        dropdownMatchSelectWidth: false,
        selectProps: {
          totalRecord: 'totalRecord',
          pageSize: 'pageSize',
          currentPage: 'currentPage',
          searchValue: 'additionCondition.expresses.0.right.value'
        },
        columns: [
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
        ],
        value: []
      }
    },
    {
      labelName: 'Search association',
      labelAlign: 'left',
      tip: '',
      value: '',
      key: 'autocomplete',
      type: 'autocomplete',
      operatorOptions: {// in notin
        operator: 'begins with', // 必传
        options: [
          'in',
          'not in',
          '=',
          'not =',
          'contains',
          'begins with',
          'contains',
          'ends with'
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
            options: [
              { value: 'location', location: 'location', level: 'level', description: 'description' },
              { value: 'location2', location: 'location2', level: 'level2', description: 'description2' }
            ]
          }
        ],
        selectProps: {
          totalRecord: 'totalRecord',
          pageSize: 'pageSize',
          currentPage: 'currentPage',
          searchValue: 'additionCondition.expresses.0.right.value'
        },
        request: selectFetch,
        selectParam,
        columns: [
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
        ],
        value: ''
      }
    },
    {
      labelName: 'Date Selection',
      labelAlign: 'left',
      tip: '',
      value: '',
      key: 'datepicker',
      type: 'datepicker',
      operatorOptions: {// in notin
        operator: 'from', // 必传
        options: [
          'from',
          'to',
          'between'
        ]
      },
      propsData: {
        value: '',
        format: dateFormat
      }
    },
    {
      labelName: 'Date Range',
      labelAlign: 'left',
      tip: '',
      value: '',
      key: 'daterangepicker',
      type: 'daterangepicker',
      operatorOptions: {// in notin
        operator: 'between', // 必传
        options: [
          'from',
          'to',
          'between'
        ]
      },
      propsData: {
        value: [],
        format: dateFormat
      },
      rules: [
        {
          required: true,
          message: 'Please complete',
          trigger: ['change','blur'],
          validator: validator,
        },
      ],
      hideRequired: true,
    }
  ]
})
</script>

```

### Search 基础用法
```vue demo
<template>
  <fl-search
    v-model:form="form"
    :label-col="{ span: 3 }"
    :wrapper-col="{ span: 18 }"
    :searchInitForm="searchInitForm"
    :fetch="fetch"
    :formSaveParam="{searchType: 'Lease Purchase1'}"
    @reset="resetForm"
    @search="onSearch"
    @openNewContract="openNewContract"
  />
</template>
<script lang="ts" setup>
import { ref, provide } from 'vue'
import { selectParam, selectFetch } from '../../../../sites/pc/http/do.ts';
import fetch from '../../../../sites/pc/http/http.ts'
import dayjs, { Dayjs } from 'dayjs'
const dateFormat = 'YYYY/MM/DD'
import cloneDeep from 'lodash-es/cloneDeep'
import { message, Button as AButton } from 'ant-design-vue'
const defaultForm = {
  title: 'form',
  controls: [
    {
      labelName: 'BU',
      labelAlign: 'left',
      tip: '',
      key: 'businessUnit',
      operatorOptions: {
        operator: 'in', // 必传
        options: [
          'in',
          'not in',
          '=',
          'not =',
          'contains',
          'begins with',
          'contains',
          'ends with'
        ]
      },
      propsData: {
        customeRender: true,
        options:[],
        fieldNames: {
          label: 'descrshort',
          value: 'descrshort'
        },
        request: selectFetch,
        selectParam,
        dropdownMatchSelectWidth: false,
        selectProps: {
          totalRecord: 'totalRecord',
          pageSize: 'pageSize',
          currentPage: 'currentPage',
          searchValue: 'additionCondition.expresses.0.right.value'
        },
        columns: [
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
        ],
        value: []
      }
    },
    {
      labelName: ' Customer ID',
      labelAlign: 'left',
      tip: '',
      key: 'contractNum',
      operatorOptions: {
        operator: '=', // 必传
        options: [
          'in',
          'not in',
          '=',
          'not =',
          'contains',
          'begins with',
          'contains',
          'ends with'
        ]
      },
      propsData: {
        customeRender: true,
        options:[],
        fieldNames: {
          label: 'descrshort',
          value: 'descrshort'
        },
        request: selectFetch,
        selectParam,
        dropdownMatchSelectWidth: false,
        selectProps: {
          totalRecord: 'totalRecord',
          pageSize: 'pageSize',
          currentPage: 'currentPage',
          searchValue: 'additionCondition.expresses.0.right.value'
        },
        columns: [
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
        ],
        value: []
      }
    },
    {
      labelName: 'Lease Type',
      labelAlign: 'left',
      tip: '',
      key: 'leaseType',
      operatorOptions: {// in notin
        operator: 'begins with', // 必传
        options: [
          'in',
          'not in',
          '=',
          'not =',
          'contains',
          'begins with',
          'contains',
          'ends with'
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
            options: [
              { value: 'location', location: 'location', level: 'level', description: 'description' },
              { value: 'location2', location: 'location2', level: 'level2', description: 'description2' }
            ]
          }
        ],
        selectProps: {
          totalRecord: 'totalRecord',
          pageSize: 'pageSize',
          currentPage: 'currentPage',
          searchValue: 'additionCondition.expresses.0.right.value'
        },
        request: selectFetch,
        selectParam,
        columns: [
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
        ],
        value: ''
      }
    },
    {
      labelName: 'Contract Date',
      labelAlign: 'left',
      tip: '',
      value: '',
      key: 'effdt',
      operatorOptions: {// in notin
        operator: 'between', // 必传
        options: [
          'from',
          'to',
          'between'
        ]
      },
      propsData: {
        value: [],
        format: dateFormat
      }
    }
  ]
}
const formCopy = cloneDeep(defaultForm);
const form = ref(formCopy)
const openNewContract = () => {
  console.log('openNewContract')
}
const resetForm = () => {
  form.value = cloneDeep(defaultForm);
  sessionStorage.setItem('searchForm', JSON.stringify(form.value));
}
const onSearch = (value, type, form) => {
  if (type !== 'init' && type !== 'change') {
    sessionStorage.setItem('searchForm', JSON.stringify(form))
  }
  
  console.log('onSearch', value)  
}

const searchInitForm = ref(sessionStorage.getItem('searchForm') ? JSON.parse(sessionStorage.getItem('searchForm')) : {})

</script>
```
### Search API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| v-model:form | form数据 | object | - |  |
| formWidth | form宽度 | string | - |  |
| isShowSaveSearch | 是否显示save按钮 | true | - |  |
| isShowKeyWordInput | 是否显示头部keyword input | true | - |  |
| title | 标题 | string | 'Lease Contract' |  |
| options | dropdown下拉数据 | array | [] |  |
| customContent | 使用插槽自定义内容 | v-slot="page-top-right" | - |  |
| initSearch | 初始化调用onSearch | boolean | false |  |
| searchText | 搜索组件顶部文案 | string | "USER SAVED SEARCH" |  |



### Search Events

|事件	|说明	|回调	|
|---- |----- |------ |
| reset	| 点击Reset触发	| Function |
| search	|点击Search按钮触发	| Function(value) => {}|
| delete	| dropdown列表删除	| Function(i) => {}|
| refresh	| 保存搜索条件后，刷新dropdown列表	| Function() => {}|
| openNewContract	| 点击openNewContract触发	| Function() => {}|
| change	| dropdown列表选中	| Function(value) => {}|


