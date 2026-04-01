<template>
  <a-button :class="[ns.b(), className]" v-bind="attrs" :icon="ic" @click.stop="onClick" :type="type">
    <slot></slot>
  </a-button>
</template>

<script lang="ts">
import { h, ref, watch } from 'vue';
import createComponent from '../../../utils/create';
import { useNamespace, useAttrs } from '../../../hooks';
import { IconBtnProps } from './index';
import { Icon } from '../../icon/index'
import { Button } from 'ant-design-vue'
const { create } = createComponent('IconButton');

export default create({
  props: IconBtnProps,
  components: {
    Icon,
    [Button.name as string]: Button
  },
  emits: ['onClick'],
  setup(props, { emit }) {
    let ic: string | any = ref('');
    const attrs = useAttrs({
      excludeKeys: ['className', 'iconStyle', 'icon', 'ns', 'ic']
    });
    const { icon, iconStyle } = props;
    const getIcon = async () => {
      let i: any;
      if (typeof props.icon === 'string') {
        ic.value = h(Icon, {
          style: props.iconStyle,
          type: props.icon
        });
      } else {
        i = props.icon
        ic.value = h(i, {
          style: props.iconStyle
        });
      }

      
    };

    getIcon();

    watch(() => props.icon, (v) => {
      getIcon()
    })
    
    const ns = useNamespace('iconbutton');
    const onClick = (event: MouseEvent) => {
      emit('onClick', event);
    };
    return {
      attrs,
      ic,
      ns,
      onClick
    };
  }
});
</script>
<style lang="scss" scoped>
.fl-iconbutton {
  display: inline-flex;
  align-items: center;
}
</style>
