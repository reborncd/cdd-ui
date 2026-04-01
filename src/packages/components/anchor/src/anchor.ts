import { buildProps } from '../../../utils/props';

export const AnchorProps = buildProps({
  anchorList: {
    type: Array,
    default: () => {
      return [];
    }
  }
});
