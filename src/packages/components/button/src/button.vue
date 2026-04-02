<template>
  <a-button
    :class="{
      [ns.b()]: true,
      [className]: true,
      [`icon-${iconPosition}`]: true,
      'is-disabled': props.disabled && ['primary-button'].includes(className)
    }"
    v-bind="attrs"
    @click.stop="onClick"
    :disabled="disabled"
    :type="type"
  >
    <cdd-icon v-if="icon" :type="icon" :style="iconStyle"></cdd-icon>
    <div class="button-content">
      <slot></slot>
    </div>
  </a-button>
</template>

<script lang="ts">
import { ref } from 'vue';
import createComponent from '../../../utils/create';
import { useNamespace, useAttrs } from '../../../hooks';
import { ButtonProps } from './button';
import { Icon } from '../../icon/index';
import { Button } from 'ant-design-vue';
const { create } = createComponent('Button');

export default create({
  props: ButtonProps,
  components: {
    [Icon.name]: Icon,
    [Button.name as string]: Button
  },
  emits: ['onClick'],
  setup(props, { emit }) {
    let ic: string | any = ref('');
    const attrs = useAttrs();

    const ns = useNamespace('button');

    const onClick = (event: MouseEvent) => {
      emit('onClick', event);
    };
    return {
      attrs,
      ns,
      onClick,
      props
    };
  }
});
</script>
<style lang="scss" scoped>
.cdd-iconbutton {
  display: inline-flex;
  align-items: center;
}
</style>
