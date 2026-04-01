/*
 * @Author: 杨亚茹
 * @Date: 2025-01-08 11:33:24
 * @LastEditors: 杨亚茹
 * @LastEditTime: 2025-05-19 17:08:39
 * @FilePath: /iflorens-web-ui/src/packages/components/comment/src/comment-textarea.ts
 * @Description: 
 */
import { buildProps, definePropType } from '../../../utils/props';

export const CommentTextareaProps = buildProps({
  modelValue: {
    type: definePropType<string | number | null | undefined>(undefined),
    default: ''
  },
  // 输入组件类型 shrink 缩放模式 fullScreen全屏模式
  modeType: {
    type: String,
    default: 'shrink'
  },
  selectTypeCommentary: {
    type: Object,
    default: () => {
      return {};
    }
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
  autoSize: {
    type: Object,
    default: () => {
      return {
        minRows: 2,
        maxRows: 5
      };
    }
  },
  isShowHeader: {
    type: Boolean,
    default: true
  },
  isShowFocusBorder: {
    type: Boolean,
    default: true
  },
  showCount: {
    type: Boolean,
    default: false
  }
});
