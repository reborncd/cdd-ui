import { buildProps } from '../../../utils/props';

export const CommentItemProps = buildProps({
  // 是否有权限编辑
  canAddCommentary: {
    type: Boolean,
    default: false
  },
  isShowShrinkIcon: {
    type: Boolean,
    default: true
  },
  // 最大可输入长度
  maxLength: {
    type: [Number, String],
    default: 5000
  },
  placeholder: {
    type: String,
    default: 'Enter commentary within 5,000 characters.'
  },
  commentaryData: {
    type: Object,
    default: () => {
      return {};
    }
  },
  itemKey: {
    type: [Number, String],
    default: ''
  },
  modeType: {
    type: String,
    default: 'shrink'
  },
  autoSize: {
    type: Object,
    default: () => {
      return {
        minRows: 2,
        maxRows: 5
      };
    }
  },
  showCount: {
    type: Boolean,
    default: false
  }
});
