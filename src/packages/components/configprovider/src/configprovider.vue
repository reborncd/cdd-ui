<template>
  <a-config-provider :theme="theme" :locale="locale" prefix-cls="iflorens-ui">
    <slot></slot>
  </a-config-provider>
</template>

<script lang="ts">
import { ref } from 'vue';
import createComponent from '../../../utils/create';
import { ConfigProvider } from 'ant-design-vue';
import { useNamespace, useAttrs } from '../../../hooks';
import { ConfigProviderProps } from './configprovider';
const { create } = createComponent('ConfigProvider');

export default create({
  props: ConfigProviderProps,
  components: {
    [ConfigProvider.name as string]: ConfigProvider
  },
  setup(props, { emit }) {
    const ns = useNamespace('configprovider');
    const attrs = useAttrs();
    return {
      ns,
      attrs
    };
  }
});
</script>
