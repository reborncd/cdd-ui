import { readdirSync } from 'fs';
import { excelParam, selectFetch, equipFuzzy, selectParam, testCustomerExcel } from '../../../../sites/pc/http/do.ts';
const dateFormat = 'YYYY-MM-DD';

export const formControls = [
  {
    labelName: 'Date',
    labelAlign: 'left',
    tip: '',
    value: '',
    key: 'date',

    operatorOptions: {
      operator: '=', // 必传
      type: 'datePicker',
      options: ['=']
    },
    propsData: {
      value: '',
      format: [dateFormat]
    },
    rules: {
      required: true
    }
  },
  {
    labelName: 'Legal Name (English)',
    labelAlign: 'left',
    tip: '',
    key: 'businessUnit',
    operatorOptions: {
      operator: 'begins with', // 必传
      options: ['in', 'not in', '=', 'not =', 'contains', 'begins with', 'ends with']
    },
    propsData: {
      customeRender: true,
      options: [],
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
    labelName: 'Type/Size',
    labelAlign: 'left',
    key: 'equip',
    operatorOptions: {
      operator: '=', // 必传
      options: ['begins with', 'ends with', '=', 'not =', 'contains', 'in', 'not in']
    },
    propsData: {
      options: [],
      fieldNames: {
        label: 'equip',
        value: 'equip',
        key: 'key'
      },
      customeRender: true,
      columns: [
        {
          title: 'Equip',
          dataIndex: 'equip',
          width: '70px'
        },
        {
          title: 'Short Description',
          dataIndex: 'descrShort',
          width: '120px'
        },
        {
          title: 'Description',
          dataIndex: 'descr',
          width: '110px'
        },
        {
          title: 'Equip Category ID',
          dataIndex: 'equipCategory',
          width: '190px'
        }
      ],
      selectProps: {
        ...{
          totalRecord: 'data.totalRecord',
          pageSize: 'data.pageSize',
          currentPage: 'data.currentPage',
          responseData: 'data.list',
          searchValue: 'keyword'
        }
      },
      request: equipFuzzy,
      dropdownMatchSelectWidth: true,
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
      options: ['in', 'not in', '=', 'not =', 'contains', 'begins with', 'contains', 'ends with']
    },
    propsData: {
      customeRender: true,
      options: [],
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
    operatorOptions: {
      // in notin
      operator: 'begins with', // 必传
      options: ['in', 'not in', '=', 'not =', 'contains', 'begins with', 'contains', 'ends with']
    },
    propsData: {
      type: 'select',
      options: [
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
    operatorOptions: {
      // in notin
      operator: 'between', // 必传
      options: ['from', 'to', 'between']
    },
    propsData: {
      value: [],
      format: dateFormat
    }
  }
];

export const tableColumnsM = [
  {
		field: "businessUnit",
		title: "Cust. Group",
		sortable: false,
		minWidth: 110,
		resizable: false,
	},
	{
		field: "businessUnit",
		title: "Inquiry Date",
		sortable: false,
		minWidth: 130,
		resizable: false,
	},
	{
		field: "businessUnit",
		title: "Inquiry Month",
		sortable: false,
		minWidth: 130,
		resizable: false
	},
	{
		field: "businessUnit",
		title: "KAM",
		sortable: false,
		minWidth: 120,
		resizable: false,
	},
	{
		field: "businessUnit",
		title: "EQP Type",
		sortable: false,
		minWidth: 90,
		resizable: false,
	},
  {
		field: "businessUnit",
		title: "Remarks",
		sortable: false,
		minWidth: 200,
		resizable: false,
	},
  {
    field: 'businessUnit',
    title: 'BU',
    slots: {
      default: 'businessUnit'
    },
    sortable: true
  },
  {
    field: 'contrType',
    title: 'Lease Type',
    sortable: true
  },
  {
    field: 'createTime',
    title: 'Effective Date',
    sortable: true,
    width: 155,
    filters: [
      { label: 'Male', value: 'Male' },
      { label: 'Female', value: 'Female' }
    ]
  },
  {
    field: 'createName',
    title: 'CreateName',
    sortable: true
  },
  {
    field: 'contractNum',
    title: 'ContractNum'
  },
  {
    field: 'updateTime',
    title: 'UpdateTime'
  },
  {
    field: 'businessUnit1',
    title: 'BU1',
    sortable: true
  },
  {
    field: 'contrType1',
    title: 'Lease Type1',
    sortable: true
  },
  {
    field: 'createTime1',
    title: 'Effective Date1',
    sortable: true,
    width: 155
  },
  {
    field: 'createName1',
    title: 'CreateName1',
    sortable: true
  },
  {
    field: 'contractNum1',
    title: 'ContractNum1'
  },
  {
    field: 'updateTime1',
    title: 'UpdateTime1'
  }
];
