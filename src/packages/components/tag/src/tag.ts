/*
 * @Author: v_yangyaru
 * @Date: 2024-10-08 09:08:37
 * @LastEditors: v_yangyaru
 * @LastEditTime: 2024-10-08 10:12:26
 * @FilePath: /iflorens-web-ui/src/packages/components/tag/src/tag.ts
 * @Description: 
 */
import { Tag as ATag } from 'ant-design-vue';
import { getCurrentInstance, h } from 'vue';
import { buildProps, definePropType } from '../../../utils/props';
import createComponent from '../../../utils/create';
import { useNamespace } from '../../../hooks';
import {
  CloseOutlined,
} from '@ant-design/icons-vue';
const tagProps = buildProps({});

const { create } = createComponent('Tag');

// 是否有自定义icon和closeIcon插槽
export default create({
  props: tagProps,
  setup(props, { emit, slots, attrs }) {
    // console.log(props, 'props.props.');
    // console.log(attrs, 'attrs.attrs.');
    // console.log(slots, 'slots.slots.');
    const instance = getCurrentInstance()!;
    const ns = useNamespace('tag');
    return () => {
      return h(
        ATag,
        {
          class: ns.b(),
          style: {
            fontVariationSettings: `"wght" 600`
          },
          ...attrs,
          ...props
        },
        {
          // @ts-ignore
          default: () => h(slots.default),
          icon: (props: any) => (slots.icon ? h(slots.icon, { ...props }) : undefined),
          closeIcon: (props: any) =>
            slots.closeIcon ? h(slots.closeIcon, { ...props }) : h(CloseOutlined)
        }
      );
    };
  }
});
