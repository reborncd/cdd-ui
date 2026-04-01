import { buildProps } from '../../../utils/props';

export const EmptyProps = buildProps({
  description: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: ''
  },
  isShowBtn: {
    type: Boolean,
    default: false
  },
  btnName: {
    type: String,
    default: 'New'
  },
  btnIcon: {
    type: Object,
    default: () => {
      return {
        type: 'iflorens-Plus',
        style: {
          color: '#3E54AD',
          fontSize: '14px'
        }
      };
    }
  }
});
