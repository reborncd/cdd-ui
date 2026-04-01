import { buildProps } from '../../../utils/props';
export const SearchProps = buildProps({
  type: {
    type: String,
    default: 'card'
  },
  title: {
    type: String,
    default: 'Lease Contract'
  },
  // 通用请求参数
  fetch: {
    type: Function
  },
  fieldParams: {
    type: String,
    default: ''
  },
  prefix: {
    type: String,
    default: ''
  },
  routePath: {
    type: String,
    default: ''
  },
  initSearch: {
    type: Boolean,
    default: false
  },
  isShowKeyWordInput: {
    type: Boolean,
    default: true
  },
  isShowSaveSearch: {
    type: Boolean,
    default: true
  },
  searchInitForm: {
    type: Object,
    default: () => {
      return {};
    }
  },
  formSaveParam: {
    type: Object,
    default: () => {
      return {};
    }
  },
  isShowDown: {
    type: Boolean,
    default: true
  },
  formWidth: {
    type: String,
    default: ''
  },
  searchText: {
    type: String,
    default: 'USER SAVED SEARCH'
  },
  dropdownWidth: {
    type: Number,
    default: 200
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
  showSearchBtn: {
    type: Boolean,
    default: true
  },
  colorMode: {
    type: String,
    default: ''
  },
  searchCondition: {
    type: String,
    default: () => {
      return '';
    }
  }
});
