/*
 * @Author: 杨亚茹
 * @Date: 2025-03-03 10:50:13
 * @LastEditors: 杨亚茹
 * @LastEditTime: 2025-06-11 15:37:37
 * @FilePath: /iflorens-web-ui/src/packages/components/auto-complete/src/auto-complete.ts
 * @Description: 
 */
import { buildProps, definePropType } from '../../../utils/props';
export const autoCompleteProps = buildProps({
  modelValue: {
    type: definePropType<string | number | null | undefined>(undefined),
    default: ''
  },
  options: {
    type: Array,
    default: () => []
  },
  delay: {
    type: Number,
    default: 300
  },
  autoCompleteStyle: {
    type: definePropType<string | object>([String, Object]),
    default: () => {
      return {
        width: '100%'
      };
    }
  },
  dropdownMatchSelectWidth: {
    type: [Number, Boolean],
    default: 350
  },
  columns: {
    type: Array,
    default: () => []
  },
  customeRender: {
    type: Boolean,
    default: false
  },
  paginationConfig: {
    type: Object,
    default: () => {
      return {};
    }
  },
  disabledLoadMore: {
    type: Boolean,
    default: false
  },
  popupClassName: {
    type: String,
    default: ''
  },
  isShowPage: {
    type: Boolean,
    default: true
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  showLoading: {
    type: Boolean,
    default: true
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
