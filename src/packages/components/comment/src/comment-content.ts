/*
 * @Author: 杨亚茹
 * @Date: 2025-01-08 11:33:27
 * @LastEditors: 杨亚茹
 * @LastEditTime: 2025-05-19 17:13:37
 * @FilePath: /iflorens-web-ui/src/packages/components/comment/src/comment-content.ts
 * @Description: 
 */
import { buildProps } from '../../../utils/props';
import emptyCommentarySvg from './empty-commentary.svg';

export const CommentContentProps = buildProps({
  // 是否有权限编辑
  canAddCommentary: {
    type: Boolean,
    default: false
  },
  selectTypeCommentary: {
    type: Object,
    default: () => {
      return {
        commentary: '测试 333',
        label: 'Onhire'
      };
    }
  },
  // 评论列表
  commentaryList: {
    type: Array,
    default: () => {
      return [];
    }
  },
  emptyObj: {
    type: Object,
    default: () => {
      return {
        description: 'No items to display.',
        img: emptyCommentarySvg
      };
    }
  },
  placeholder: {
    type: String,
    default: 'Enter commentary within 5,000 characters.'
  },
  // 最大可输入长度
  maxLength: {
    type: [Number, String],
    default: 5000
  },
  isShowShrinkIcon: {
    type: Boolean,
    default: true
  },
  showCount: {
    type: Boolean,
    default: false
  }
});
