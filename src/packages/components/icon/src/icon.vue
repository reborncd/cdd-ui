<template>
  <icon-font :class="ns.b()" :style="style" :type="type" :fill="fill" :height="height" :width="width"></icon-font>
</template>

<!-- iflorens-Export -->
<script lang="ts">
import { ref } from 'vue';
import { createFromIconfontCN } from '@ant-design/icons-vue';
import createComponent from '../../../utils/create';
import { IconProps } from './icon';
import { useNamespace } from '../../../hooks';
const { create } = createComponent('Icon');

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_4234253_0muq26sdm05.js' // 在 iconfont.cn 上生成
});
export default create({
  props: IconProps,
  components: {
    IconFont
  },
  setup(props, { emit }) {
    const ns = useNamespace('icon');

    return {
      ns
    };
  }
});
</script>
