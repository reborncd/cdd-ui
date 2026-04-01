import { buildProps } from '../../../utils/props';

export const IconBtnProps = buildProps({
  className: {
    type: String,
    default: ''
  },
  icon: {
    type: [String, Function],
    default: ''
  },
  type: {
    type: String,
    default: 'link'
  },
  iconStyle: {
    type: Object,
    default: () => {
      return {
        color: '#86909C'
      };
    }
  },
} as const);
