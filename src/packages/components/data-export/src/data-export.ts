import { buildProps } from '../../../utils/props';

export const DataExportProps = buildProps({
  isComNotification: {
    type: Boolean,
    default: true
  },
  name: {
    type: String,
    default: ''
  },
  iconObj: {
    type: Object,
    default: () => {
      return {
        icon: 'iflorens-Download',
        iconStyle: {
          color: 'rgba(62, 86, 167, 1.00)',
          fontSize: '14px'
        }
      };
    }
  },
  // 业务请求接口
  requestFileId: {
    type: Function,
    required: true
  },
  // 业务请求参数
  requestFileParams: {
    type: Object,
    default: () => {
      return {};
    }
  },
  request: {
    type: Function,
    required: true
  },
  pollNum: {
    type: Number,
    default: 50
  },
  downFileName: {
    type: String,
    default: ''
  }
});
