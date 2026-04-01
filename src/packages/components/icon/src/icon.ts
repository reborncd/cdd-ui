import { buildProps } from '../../../utils/props';

export const IconProps = buildProps({
  type: {
    type: String,
    default: ''
  },
  fill: {
    type: String,
    default: ''
  },
  height: {
    type: [String, Number],
    default: ''
  },
  style: {
    type: [String, Object],
    default: () => {
      return {
        fontSize: '20px'
      };
    }
  },
  width: {
    type: [String, Number],
    default: ''
  }
});
