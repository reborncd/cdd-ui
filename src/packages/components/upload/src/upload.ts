/*
 * @Author: v_yangyaru
 * @Date: 2024-10-08 09:14:33
 * @LastEditors: yangyaru
 * @LastEditTime: 2024-12-10 13:32:25
 * @FilePath: /iflorens-web-ui/src/packages/components/upload/src/upload.ts
 * @Description:
 */
import { buildProps } from '../../../utils/props';

export const UploadPropsObj = buildProps({
  name: {
    type: String,
    default: 'Upload'
  },
  isShowImgPreview: {
    type: Boolean,
    default: true
  },
  iconObj: {
    type: Object,
    default: () => {
      return {
        icon: 'iflorens-Upload',
        iconStyle: {
          color: 'rgba(62, 84, 173, 1.00)',
          fontSize: '14px'
        }
      };
    }
  },
  // 默认不展示上传列表
  showUploadList: {
    type: Boolean,
    default: false
  },
  // 默认支持多文件上传
  multiple: {
    type: Boolean,
    default: true
  },
  // 默认支持做大100M上传
  maxSize: {
    type: Number,
    default: 100
  }
});
