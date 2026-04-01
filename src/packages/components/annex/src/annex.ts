import { buildProps } from '../../../utils/props';

export const AnnexProps = buildProps({
  isShowPreviewBtn: {
    type: Boolean,
    default: true
  },
  isShowDownloadBtn: {
    type: Boolean,
    default: true
  },
  isShowDelBtn: {
    type: Boolean,
    default: true
  },
  isUpdate: {
    type: Boolean,
    default: false
  },
  percent: {
    type: Number,
    default: 0
  },
  fileName: {
    type: String,
    default: ''
  },
  itemKey: {
    type: Number,
    default: 0
  },
  strokeWidth: {
    type: Number,
    default: 2
  },
  textEllipsisWidth: {
    type: String,
    default: "190px"
  },
  info: {
    type: Object,
    default: () => {
      return {}
    }
  }
});
