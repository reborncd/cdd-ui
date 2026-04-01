/*
 * @Author: 杨亚茹
 * @Date: 2025-03-07 10:39:16
 * @LastEditors: 杨亚茹
 * @LastEditTime: 2025-04-08 14:01:16
 * @FilePath: /iflorens-web-ui/src/packages/components/auto-complete-table/src/auto-complete-table.ts
 * @Description: 
 */
import { buildProps, definePropType } from '../../../utils/props';
export declare interface autoCompleteTableComponentProps {
  // totalRecord: string;
  // pageSize: string;
  // currentPage: string;
  searchValue: string;
  // pageIndex: string;
}
export const autoCompleteTableProps = buildProps({
  customeRender: {
    type: Boolean,
    default: true
  },
  modelValue: {
    type: definePropType<string | number | null | undefined>(undefined),
    default: ''
  },
  request: {
    type: Function,
    required: true
  },
  param: {
    type: Object,
    default: () => {
      return {};
    }
  },
  props: {
    type: definePropType<autoCompleteTableComponentProps>(Object),
    default: () => {
      return {
        // totalRecord: 'totalRecord',
        // pageSize: 'pageSize',
        // currentPage: 'currentPage',
        searchValue: 'title'
        // responseData: 'data',
        // pageIndex: 'pageIndex'
      };
    }
  },
  primaryKey: {
    type: String
  },
  popupClassName: {
    type: String,
    default: ''
  },
  defaultActiveFirstOption: {
    type: Boolean,
    default: undefined
  },
  focusOnload: {
    type: Boolean,
    default: false
  }
});