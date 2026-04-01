import { buildProps } from '../../../utils/props';
import { StarOutlined, StarFilled } from '@ant-design/icons-vue';

export const CollectProps = buildProps({
  title: {
    type: String,
    default: ''
  },
  startOutIcon: {
    type: Object,
    default: () => {
      return {
        icon: StarOutlined,
        iconStyle: {
          color: 'rgba(134,144,156, 1.00)',
          fontSize: '18px'
        }
      };
    }
  },
  starFilledIcon: {
    type: Object,
    default: () => {
      return {
        icon: StarFilled,
        iconStyle: {
          color: 'rgba(226,100,0, 1.00)',
          fontSize: '18px'
        }
      };
    }
  },
  request: {
    type: Function
  },
  host: {
    type: String,
    default: ''
  },
  isCustomize: {
    type: Boolean,
    default: false
  },
  iconBtnStatus: {
    type: Boolean,
    default: false
  },
  tipAddText: {
    type: String,
    default: 'Add to My favorites'
  },
  tipRemoveText: {
    type: String,
    default: 'Remove from My favorites'
  },
  prefix: {
    type: String,
    default: ''
  },
  path: {
    type: String,
    default: ''
  },
  isShowCollectBtn: {
    type: Boolean,
    default: true
  },
  colorMode: {
    type: String,
    default: ''
  },
});
