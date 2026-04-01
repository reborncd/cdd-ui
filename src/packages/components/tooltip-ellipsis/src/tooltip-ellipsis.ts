import { buildProps } from '../../../utils/props';

export const TooltipEllipsisProps = buildProps({
  content: {
    type: String,
    default: ''
  },
  rows: {
    type: Number,
    default: 1
  },
  width: {
    type: String,
    default: ''
  },
  dots: {
    type: String,
    default: '...'
  },
  isShowEllipsisTooltip: {
    type: Boolean,
    default: true
  },
  tooltipTrigger: {
    type: String,
    default: 'hover'
  },
  ellipsisStyle: {
    type: Object,
    default: () => {
      return {
        lineHeight: 1.5
      };
    }
  }
});
