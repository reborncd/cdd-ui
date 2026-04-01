import { buildProps, definePropType } from '../../../utils/props';
export const FormProps = buildProps({
  form: {
    type: Object,
    default: () => {
      return {}
    }
  },
  type: {
    type: String,
    default: 'card'
  },
  isShowDown: {
    type: Boolean,
    default: true
  },
  defaultActiveFirstOption: {
    type: Boolean,
    default: false
  },
});
