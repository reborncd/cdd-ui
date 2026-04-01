import { buildProps, definePropType } from '../../../utils/props';

export const SearchInputProps = buildProps({
  modelValue: {
    type: definePropType<string | number | null | undefined>(undefined),
    default: ''
  },
  iconObj: {
    type: Object,
    default: () => {
      return {
        icon: 'iflorens-Search',
        iconStyle: {
          fontSize: '14px',
          color: 'rgba(0, 0, 0, 0.25)'
        }
      };
    }
  }
});
