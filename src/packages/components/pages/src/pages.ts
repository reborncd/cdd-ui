import { buildProps } from '../../../utils/props';

export const PagesProps = buildProps({
  // 顶部标题参数
  title: {
    type: String,
    default: ''
  },
  // 顶部参数
  prefix: {
    type: String,
    default: ''
  },
  routePath: {
    type: String,
    default: ''
  },
  host: {
    type: String,
    default: ''
  },
  // 导出参数
  documentHost: {
    type: String,
    default: ''
  },
  saveExcelParam: {
    type: Object,
    default: () => {
      return {};
    }
  },
  isComNotification: {
    type: Boolean,
    default: true
  },
  // 通用请求参数
  fetch: {
    type: Function
  },
  // 业务请求接口
  requestFileId: {
    type: Function,
    required: true
  },
  pollNum: {
    type: Number,
    default: 50
  },
  downFileName: {
    type: String,
    default: ''
  },
  // 业务请求接口参数
  requestFileParams: {
    type: Object,
    default: () => {
      return {};
    }
  },
  // 顶部配置
  isShowExportBtn: {
    type: Boolean,
    default: true
  },
  isShowDensityBtn: {
    type: Boolean,
    default: true
  },
  isShowFiltersBtn: {
    type: Boolean,
    default: true
  },
  isShowSettingBtn: {
    type: Boolean,
    default: true
  },
  gridOptions: {
    type: Object,
    default: () => {
      return {};
    }
  },
  tableHeightOffset: {
    type: Number,
    default: 0
  },
  editTableType: {
    type: Boolean,
    default: false
  },
  gridEvents: {
    type: Object,
    default: () => {
      return {};
    }
  },
  tableColumns: {
    type: Array,
    default: () => {
      return [];
    }
  },
  form: {
    type: Object,
    default: () => {
      return {};
    }
  },
  searchInitForm: {
    type: Object,
    default: () => {
      return {};
    }
  },
  searchCondition: {
    type: String,
    default: () => {
      return '';
    }
  },
  options: {
    type: Array,
    default: () => {
      return [];
    }
  },
  initSearch: {
    type: Boolean,
    default: false
  },
  searchWidth: {
    type: Number,
    default: 280
  },
  isShowKeyWordInput: {
    type: Boolean,
    default: true
  },
  formSaveParam: {
    type: Object,
    default: () => {
      return {};
    }
  },
  isShowSaveSearch: {
    type: Boolean,
    default: true
  },
  isShowSearchForm: {
    type: Boolean,
    default: true
  },
  isShowDown: {
    type: Boolean,
    default: true
  },
  searchText: {
    type: String,
    default: 'USER SAVED SEARCH'
  },
  dropdownWidth: {
    type: Number,
    default: 240
  },
  headerDisabled: {
    type: Array,
    default: () => {
      return [];
    }
  },
  headerDraggableDisabledArr: {
    type: Array,
    default: () => {
      return [];
    }
  },
  isShowCollectBtn: {
    type: Boolean,
    default: true
  },
  defaultActiveFirstOption: {
    type: Boolean,
    default: false
  },
  hideSaveSearchSelect:{
    type: Boolean,
    default: true
  },
  isShowSacFiltersBtn: {
    type: Boolean,
    default: false
  },
  colorMode: {
    type: String,
    default: ''
  },
  mktNpInquiryDetail: {
    type: Boolean,
    default: false
  }

});

export declare interface DraggableMoved {
  moved: {
    element: {
      [key: string]: any;
    };
    newIndex: number;
    oldIndex: number;
  };
}
