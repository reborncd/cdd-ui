<template>
  <a-input
    :class="ns.b()"
    v-bind="attrs"
    :value="modelValue"
    @input="emit('update:modelValue', $event.target.value)"
    @change="inputChange"
    @pressEnter="inputPressEnter"
  >
    <template #prefix>
      <fl-icon :type="iconObj.icon" :style="iconObj.iconStyle" class="search-icon"></fl-icon>
    </template>
  </a-input>
</template>

<script lang="ts">
import createComponent from '../../../utils/create';
import { Icon } from '../../icon';
import { useNamespace, useAttrs } from '../../../hooks';
import { SearchInputProps } from './search-input';
import { emit } from 'process';
const { create } = createComponent('SearchInput');
import { Input } from 'ant-design-vue';

export default create({
  components: {
    [Icon.name]: Icon,
    [Input.name as string]: Input
  },
  props: SearchInputProps,
  emits: ['update:modelValue', 'change', 'pressEnter'],
  setup(props, { emit }) {
    const ns = useNamespace('search-input');
    const attrs = useAttrs();
    const inputChange = (e: string) => {
      emit('change', e);
    };
    const inputPressEnter = (e: string) => {
      emit('pressEnter', e);
    };

    return {
      ns,
      attrs,
      emit,
      inputChange,
      inputPressEnter
    };
  }
});
</script>

<style scoped lang="scss">
@use 'sass:map';
@use '../../../theme-chalk/mixins/mixins' as *;
@use '../../../theme-chalk/mixins/utils' as *;
@use '../../../theme-chalk/mixins/var' as *;
@include b(search-input) {
  :deep(.iflorens-ui-input) {
    border: none;
    background: var(--fl-col-background-grey);
    height: 30px;
    line-height: 30px;
  }
}
</style>
