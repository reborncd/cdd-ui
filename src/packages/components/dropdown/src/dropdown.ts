import { buildProps, definePropType } from '../../../utils/props';

export const DropdownProps = buildProps({
  modelValue: {
    type: definePropType<string | number | null | undefined>(undefined),
    default: ''
  },
  minWidth: {
    type: String,
    default: ''
  },
  options: {
    type: Array,
    default: () => {
      return [];
    }
  },
  type: {
    type: String,
    default: ''
  },
  isShowDelIcon: {
    type: Boolean,
    default: false
  },
  delIconClickFun: {
    type: [Function, String],
    default: ''
  },
  isShowAll: {
    type: Boolean,
    default: false
  },
  preventClick: {
    type: Boolean,
    default: false
  },
  isShowDown: {
    type: Boolean,
    default: true
  },
  dropdownWidth: {
    type: Number,
    default: 0
  },
  showEmpty: {
    type: Boolean,
    default: false
  }
});
