import { h } from 'vue';
import { Icon } from '../../../packages/components/icon/index';
import { notification } from 'ant-design-vue';
import type { NotificationPlacement } from 'ant-design-vue/es/notification/interface';

export const useNotification = () => {
  const open = (
    key: string,
    placement: NotificationPlacement = 'topRight',
    duration?: number,
    message?: string,
    description?: string
  ) => {
    notification.open({
      closeIcon: h('i', {}, ''),
      class: 'g-notification-tips',
      key: `${key}`,
      top: '12px',
      icon: h(Icon, {
        type: 'iflorens-Redo',
        class: 'loading-3-quarters-spin',
        style: {
          color: '#3E54AD',
          fontSize: '16px'
        }
      }),
      message: message || `Preparing for download...`,
      description: description || 'Please keep the window open, and continue with your tasks.',
      placement,
      duration: duration || 0,
      style: {
        width: '300px',
        marginLeft: `${335 - 238}px`,
        top: '15px'
      }
    });
  };

  const close = (key: string) => {
    notification.close(key);
  };

  return {
    open,
    close
  };
};
