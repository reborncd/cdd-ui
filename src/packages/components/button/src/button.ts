import { buildProps } from '../../../utils/props';

export const ButtonProps = buildProps({
  className: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
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
  disabled: {
    type: Boolean,
    default: false
  },
  iconPosition: {
    type: String,
    default: "left",
    validator(value: string) {
      return value === "left" || value === "right";
    },
  },
} as const);
