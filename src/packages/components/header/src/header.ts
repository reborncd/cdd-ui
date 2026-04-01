import { buildProps } from '../../../utils/props';

export const HeaderProps = buildProps({
  // 标题
  title: {
    type: String,
    default: ''
  },
  // 锚点id
  anchorId: {
    type: String,
    default: ''
  },
  // 锚点偏移量
  offsetTop: {
    type: [String, Number],
    default: -132
  }
});
