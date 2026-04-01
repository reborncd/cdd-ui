import { buildProps } from '../../../utils/props';

export const LeaseHeaderProps = buildProps({
  // class
  className: {
    type: String,
    default: ''
  },
  // 是否显示箭头按钮
  isShowArrowLeftIcon: {
    type: Boolean,
    default: true
  },
  arrowLeftText: {
    type: String,
    default: 'Return to Search'
  },
  previousText: {
    type: String,
    default: 'Previous in List'
  },
  nextText: {
    type: String,
    default: 'Next in List'
  },
  // 标题
  title: {
    type: String,
    default: ''
  },
  upDisabled: {
    type: Boolean,
    default: false
  },
  downDisabled: {
    type: Boolean,
    default: false
  },
  isShowArrowRightBtn: {
    type: Boolean,
    default: true
  },
  tooltipProps: {
    type: Object,
    default: () => {
      return {};
    }
  },
  arrowLeftTooltipProps: {
    type: Object,
    default: () => {
      return {
        placement: "top"
      };
    }
  }
});
