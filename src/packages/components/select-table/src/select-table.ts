import { buildProps, definePropType } from '../../../utils/props';

export declare interface SelectTableComponentProps {
  // totalRecord: string;
  // pageSize: string;
  // currentPage: string;
  responseData: string;
  // requestPageIndex: string;
  // requestPageSize: string;
  searchValue: string;
}

export const SelectTableProps = buildProps({
  primaryKey: {
    type: String
  },
  combineValue: {
    type: Boolean,
    default: false
  },
  props: {
    type: definePropType<SelectTableComponentProps>(Object),
    default: () => {
      return {
        // totalRecord: 'data.totalRecord',
        // pageSize: 'data.pageSize',
        // currentPage: 'data.currentPage',
        responseData: 'data.list',
        // requestPageIndex: 'currentPage',
        // requestPageSize: 'pageSize',
        searchValue: 'title'
      };
    }
  },
  modelValue: {
    type: definePropType<string | number | null | undefined>(undefined),
    default: undefined
  },
  request: {
    type: Function
  },
  param: {
    type: Object,
    default: () => {
      return {};
    }
  },
  onSearch: {
    type: Function
  },
  isShowItemRecord: {
    type: Boolean,
    default: false
  },
  isShowPage: {
    type: Boolean,
    default: true
  },
  placeholder: {
    type: String,
    default: ''
  },
  popupClassName: {
    type: String,
    default: ''
  },
  defaultActiveFirstOption: {
    type: Boolean,
    default: undefined
  },
  isOnloadRequest: {
    type: Boolean,
    default: true
  },
  focusOnload: {
    type: Boolean,
    default: false
  }
});
