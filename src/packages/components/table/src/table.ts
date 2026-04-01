import { buildProps, definePropType } from '../../../utils/props';
export interface PageConfig {
  total: number;
  currentPage: number;
  pageSize: number;
  pageSizes: number[];
  layouts: string[];
  [key: string]: any;
}
export const TableProps = buildProps({
  showPager: {
    type: Boolean,
    default: true
  },
  pagerConfig: {
    type: definePropType<PageConfig>(Object),
    default: () => {
      return {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        pageSizes: [50, 100, 200, 500],
        layouts: ['Total', 'PrevPage', 'JumpNumber', 'NextPage', 'FullJump', 'Sizes'],
        size: 'medium',
        mode: 'default'
      };
    }
  },
  description: {
    type: String,
    default: 'No items to display.'
  },
  emptyImage: {
    type: String,
    default: ''
  },
  tableType: {
    type: String,
    default: ''
  },
  isBottomSolidBorder: {
    type: Boolean,
    default: false
  },
  headerTextColor: {
    type: String,
    default: 'rgba(0, 0, 0, 0.85)' // 默认颜色
  },
  editTableType: {
    type: Boolean,
    default: false
  },
  colorMode: {
    type: String,
    default: ''
  }
});
