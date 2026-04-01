import { PropType } from 'vue';
import { buildProps } from '../../../utils/props';

export const ConfigProviderProps = buildProps({
  locale: {
    type: [String, Number, Object],
    default: ''
  },
  theme: {
    type: [String, Number, Object],
    default: ''
  },
  prefixCls: {
    type: [String, Number, Object],
    default: 'iflorens-ui'
  }
});
