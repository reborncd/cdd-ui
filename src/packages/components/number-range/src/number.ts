import { buildProps, definePropType } from '../../../utils/props';
export const NumberRangeProps = buildProps({
  modelValue: {
    type: definePropType<string | number | null | undefined | Array<string | null>>(undefined),
    default: ''
  },
  fromPlaceholder: {
    type: definePropType<string>(String),
    default: 'From Number'
  },
  toPlaceholder: {
    type: definePropType<string>(String),
    default: 'To Number'
  },
  disabled: {
    type: definePropType<boolean>(Boolean),
    default: false
  }
});
