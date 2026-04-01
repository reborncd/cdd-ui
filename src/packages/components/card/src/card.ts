import { buildProps } from '../../../utils/props';

export const CardProps = buildProps({
  title: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: ''
  }
});
