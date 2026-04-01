import { buildProps, definePropType } from '../../../utils/props';
export interface PageConfig {
  total: number;
  currentPage: number;
  pageSize?: number;
  [key: string]: any;
}
export const SelectProps = buildProps({
  combineValue: {
    type: Boolean,
    default: false
  },
  modelValue: {
    type: definePropType<Object | string | number | null | undefined | Array<string | object>>(undefined),
    default: () => undefined
  },
  // searchValue:{
  //   type: String,
  //   default: ''
  // },
  selectStyle: {
    type: [Object, String]
  },
  columns: {
    type: Array,
    default: () => []
  },
  isShowSubTitle: {
    type: Boolean,
    default: false
  },
  options: {
    type: Array,
    default: () => []
  },
  fieldNames: {
    type: Object,
    default: () => {
      return {
        label: 'label',
        value: 'value',
        subTitle: 'subTitle',
        key: 'key'
      };
    }
  },
  customeRender: {
    type: Boolean,
    default: false
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  showLoading: {
    type: Boolean,
    default: true
  },
  delay: {
    type: Number,
    default: 300
  },
  paginationConfig: {
    type: definePropType<PageConfig>(Object),
    default: () => {
      return {
        total: 0,
        currentPage: 1
      };
    }
  },
  isShowPage: {
    type: Boolean,
    default: true
  },
  isShowHeader: {
    type: Boolean,
    default: true
  },
  disabledLoadMore: {
    type: Boolean,
    default: false
  },
  optionLabelProp: {
    type: String,
    default: 'label'
  },
  dropdownMatchSelectWidth: {
    type: [Number, Boolean],
    default: 350
  },
  popupClassName: {
    type: String,
    default: ''
  },
  defaultActiveFirstOption: {
    type: Boolean,
    default: undefined
  },
  maxLength: {
    type: Number,
    default: 0
  },
  colorMode: {
    type: String,
    default: ''
  }
});
