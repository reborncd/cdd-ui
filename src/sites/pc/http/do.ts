import fetch from './http';

export function queryDepotSelect(data: any) {
  return fetch({
    url: '/iflorens-new-contract/api/depot/select',
    method: 'post',
    data
  });
}

export function queryDepotCodeApi(params) {
  return fetch({
    url: '/iflorens-vendor/api/depot-info/page-depot-info',
    method: 'post',
    data: params
  });
}

export const excelParam = {
  dynamicConditions: [
    {
      fieldName: 'contract_num',
      logic: 'in',
      dataType: 1
    },
    {
      fieldName: 'cust_id',
      logic: 'in',
      dataType: 1
    },
    {
      fieldName: 'lease_type',
      logic: 'in',
      dataType: 1
    },
    {
      fieldName: 'lease_inventory_type',
      logic: 'in',
      dataType: 1
    },
    {
      fieldName: 'sales_person',
      logic: 'in',
      dataType: 1
    },
    {
      fieldName: 'business_unit',
      logic: 'in',
      dataType: 1
    },
    {
      fieldName: 'contr_dept_master',
      logic: 'in',
      dataType: 1
    },
    {
      fieldName: 'contract_status',
      logic: 'in',
      dataType: 1
    }
  ],
  namedParameters: {
    contract_num: [],
    cust_id: [],
    lease_type: [],
    lease_inventory_type: [],
    sales_person: [],
    business_unit: [],
    contr_dept_master: [],
    contract_status: []
  },
  queryArguments: {},
  exportDataSettings: {
    queryCommandId: '7198961803516284928',
    fileType: 'Excel',
    exportActionType: 'sync',
    exportLimit: 1,
    exportTargetType: '1',
    targetId: '7198947376654028800',
    exportFields: [
      {
        dependFieldId: 'I7198947041499779072.P7198588843790012423',
        dictionaryId: '',
        fieldId: 'S7198588841214709760.P7198588843790012423',
        header: 'BU',
        textAlign: 'left',
        isDynamicField: 0
      },
      {
        dependFieldId: 'I7198947041499779072.P7198588843790012422',
        dictionaryId: '',
        fieldId: 'S7198588841214709760.P7198588843790012422',
        header: 'Contract ID',
        textAlign: 'left',
        isDynamicField: 0
      },
      {
        dependFieldId: 'I7198947041499779072.P7198588843790012426',
        dictionaryId: '',
        fieldId: 'S7198588841214709760.P7198588843790012426',
        header: 'Lease Type',
        textAlign: 'left',
        isDynamicField: 0
      },
      {
        dependFieldId: 'I7198947041499779072.P7198588843790012425',
        dictionaryId: '',
        fieldId: 'S7198588841214709760.P7198588843790012425',
        formatPattern: 'yyyy-MM-dd',
        header: 'Effective Date',
        textAlign: 'left',
        isDynamicField: 0
      },
      {
        dependFieldId: 'I7198947041499779072.P7198588843790012419',
        dictionaryId: '',
        fieldId: 'S7198588841214709760.P7198588843790012419',
        formatPattern: 'yyyy-MM-dd',
        header: 'Expiration Date',
        textAlign: 'left',
        isDynamicField: 0
      },
      {
        dependFieldId: 'I7198947041499779072.P7198588843790012418',
        dictionaryId: '',
        fieldId: 'S7198588841214709760.P7198588843790012418',
        formatPattern: 'yyyy-MM-dd',
        header: 'Contract Date',
        textAlign: 'left',
        isDynamicField: 0
      },
      {
        dependFieldId: 'I7198947041499779072.P7198588843790012421',
        dictionaryId: '',
        fieldId: 'S7198588841214709760.P7198588843790012421',
        header: 'Customer ID',
        textAlign: 'left',
        isDynamicField: 0
      },
      {
        dependFieldId: 'I7198947041499779072.P7198588843790012420',
        dictionaryId: '17000166059213274',
        fieldId: 'S7198588841214709760.P7198588843790012420',
        header: 'Status',
        textAlign: 'left',
        isDynamicField: 0
      },
      {
        dependFieldId: 'I7198947041499779072.P7198588843790012416',
        dictionaryId: '',
        fieldId: 'S7198588841214709760.P7198588843790012416',
        header: 'Sales Person',
        textAlign: 'left',
        isDynamicField: 0
      },
      {
        dependFieldId: 'I7198947041499779072.P7198588843748069376',
        dictionaryId: '',
        fieldId: 'S7198588841214709760.P7198588843748069376',
        header: 'Lease Inventory Type',
        textAlign: 'left',
        isDynamicField: 0
      },
      {
        dependFieldId: 'I7198947041499779072.P7208393250140434432',
        dictionaryId: '',
        fieldId: 'S7198588841214709760.P7208393250140434432',
        header: 'Department',
        textAlign: 'left',
        isDynamicField: 0
      }
    ],
    exportSets: ['exportVisibleColumns'],
    tag: '',
    expr: '',
    url: '',
    radioCheckIndex: '1',
    __flowElementDefId: 'luban-data-export-flow',
    fileName: 'Lease Contract',
    exportProgressWatchCheckbox: true,
    exportSuccessWatchCheckbox: true,
    exportProgressWatchName: 'exportPoressWatch',
    exportSuccessWatchName: 'exportSuccessWatch',
    oldCommandId: '7198588841214709760',
    timeZone: 'Asia/Shanghai',
    displayProgress: true
  },
  fileName: 'Lease Contract'
};

/**
 * @returns
 */
export function excelCustomerGroup() {
  return fetch({
    url: `/iflorens-contract/lb/common-async-export`,
    method: 'post',
    data: excelParam
  });
}

/**
 * 轮训
 * @param exportFileIds
 * @returns
 */
export function getExport(exportFileIds: string) {
  return fetch({
    url: `/iflorens-contract/lb/get-export-tasks-status?exportFileIds=${exportFileIds}`,
    method: 'get'
  });
}

// select demo 请求数据
export const selectParam = {
  commandId: '7204306411909652480',
  frontVariablesData: {},
  namedParameters: {},
  additionCondition: {
    type: 'SHOULD',
    expresses: [
      {
        type: 'OPERATOR',
        operator: 'CONTAINS',
        left: {
          type: 'FIELD',
          fieldId: ['S7204306411909652480.P7204306411909652481'],
          fieldPath: 'S7204306411909652480.P7204306411909652481'
        },
        right: {
          type: 'LITERAL_VALUE',
          value: '',
          expectType: 'string'
        }
      },
      {
        type: 'OPERATOR',
        operator: 'CONTAINS',
        left: {
          type: 'FIELD',
          fieldId: ['S7204306411909652480.P7204306411909652482'],
          fieldPath: 'S7204306411909652480.P7204306411909652482'
        },
        right: {
          type: 'LITERAL_VALUE',
          value: '',
          expectType: 'string'
        }
      },
      {
        type: 'OPERATOR',
        operator: 'CONTAINS',
        left: {
          type: 'FIELD',
          fieldId: ['S7204306411909652480.P7204306411909652483'],
          fieldPath: 'S7204306411909652480.P7204306411909652483'
        },
        right: {
          type: 'LITERAL_VALUE',
          value: '',
          expectType: 'string'
        }
      },
      {
        type: 'OPERATOR',
        operator: 'CONTAINS',
        left: {
          type: 'FIELD',
          fieldId: ['S7204306411909652480.P7204306411909652484'],
          fieldPath: 'S7204306411909652480.P7204306411909652484'
        },
        right: {
          type: 'LITERAL_VALUE',
          value: '',
          expectType: 'string'
        }
      }
    ]
  },
  pageSize: 10,
  currentPage: 1
};

export function selectFetch(data: any) {
  return fetch({
    url: '/iflorens-contract/lb/common-query?cmdId=7204306411909652480&cmdName=LeaseContractLeaseType',
    data,
    method: 'post'
  });
}
// dropdown demo 请求参数
export const dropdownParam = {
  commandId: '7100330476718333952',
  frontVariablesData: {
    '16928506866323029797656277466': '张同飞'
  },
  namedParameters: {
    searchType: 'Lease Contract'
  },
  dynamicConditions: [],
  needTotalCount: true
};

// 获取dropdown数据
export function dropdownFetch(data: any) {
  return fetch({
    url: '/iflorens-mdm/query-mdm_search_criteria',
    data,
    method: 'post'
  });
}
// dropdown 下拉选择 demo 请求参数
export function getFormParam(mdmSearchCriteriaId: string = '') {
  return {
    commandId: '7100350533309636608',
    namedParameters: {
      mdmSearchCriteriaId
    },
    frontVariablesData: {},
    dynamicConditions: [],
    needTotalCount: true
  };
}
// dropdown选中，获取form数据 demo
export function formParamFetch(data: any) {
  return fetch({
    url: '/iflorens-mdm/lb/common-query',
    data,
    method: 'post'
  });
}
export function getCheckNameParam(name: string = '') {
  return {
    entityName: 'MdmSearchCriteria',
    fieldNames: ['searchName', 'searchType', 'createName', 'isVoid'],
    fieldValues: [name, 'Lease Contract', '张同飞', 0],
    pkValue: '',
    pkValues: [],
    projectKey: 'iflorens'
  };
}
export function checkNameFetch(data: any) {
  return fetch({
    url: '/iflorens-mdm/ds-validate/unique/iflorens-mdm',
    data,
    method: 'post'
  });
}

// https://iflorens-test.florens.com
export function testCustomerExcel() {
  return fetch({
    url: '/iflorens-contract/api/v0/excel/test-customer-excel',
    method: 'get'
  });
}
export function equipFuzzy(params:any = {}) {
	return fetch({
		url: "/iflorens-mdm/api/v0/eqp-tbl/query-equip-info-by-Like",
		method: "post",
		data: params
	});
}

export const selectOptionsParams = {
  equip: '',
  descr: '',
  eqpClsLvl: '',
  pageSize: 10,
  currentPage: 1
};
export function selectOptionsFetch(data: any) {
  return fetch({
    url: '/iflorens-mdm/api/v0/eqp-tbl/query-equip-info',
    data,
    method: 'post'
  });
}

export function optionGradingApi(params) {
  return fetch({
    url: '/iflorens-mdm/api/v0/psxlatitem/query-mdm-dict-data-by-code-effdt?fieldName=GRADING_FZ',
    method: 'get',
    params: params,
    data: params
  });
}

export function queryMovementOrderType(params: any) {
  return fetch({
    url: '/iflorens-container/api/v0/odm-booking/query-order-type',
    method: 'GET',
    params
  });
}

export function queryinvoiceNoApi(params: any) {
  return fetch({
    url: '/iflorens-order/api/lp/query-combox-invoice',
    method: 'post',
    data:params
  });
}