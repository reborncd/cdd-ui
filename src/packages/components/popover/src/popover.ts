import { buildProps } from '../../../utils/props';

export const PopoverProps = buildProps({
  contentName: {
    type: String,
    default: 'Are you sure you want to delete?'
  },
  cancelName: {
    type: String,
    default: 'Cancel'
  },
  deleteName: {
    type: String,
    default: 'Delete'
  },
  cancelProps: {
    type: Object,
    default: () => {
      return {};
    }
  },
  deleteProps: {
    type: Object,
    default: () => {
      return {
        type: 'primary',
        danger: true
      };
    }
  }
});
