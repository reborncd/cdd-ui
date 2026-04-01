import { buildProps, definePropType } from '../../../utils/props';
export const DateProps = buildProps({
  modelValue: {
    type: definePropType<string | number | null | undefined | Array<string | null>>(undefined),
    default: ''
  },
  dateType: {
    type: String,
    default: ''
  },
  dateStyle: {
    type: Object,
    default: () => {
      return {
        width: '100%'
      };
    }
  },
  format: {
    type: [String, Array,Function],
    default: 'YYYY-MM-DD'
  },
  showTime: {
    type: [Boolean, String, Object],
    default: false
  },
  popupClassName:{
    type: String,
    default: ''
  },
  picker:{
    type: String,
    default: 'date'
  },
  disabledFromDateCustom: {
    type: Function,
    default: null
  },
  disabledToDateCustom: {
    type: Function,
    default: null
  },
  disabledDate: {
    type: Function,
    default: null
  },
  colorMode: {
    type: String,
    default: ''
  }
});
