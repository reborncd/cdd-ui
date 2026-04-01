<template>
  <div :class="[ns.b()]">
    <a-row class="content-head">
      <a-col class="content-head-left"></a-col>
      <a-col class="content-head-name content-head-name-1">
        <slot name="title-left">
          <span class="content-head-name-title">{{ title }}</span>
        </slot>
        <slot name="title-right"></slot>
      </a-col>
      <!-- 锚点定位位置 -->
      <a-col v-if="anchorId" class="anchor" :style="{ top: `${offsetTop}px` }" :id="anchorId"></a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import createComponent from '../../../utils/create';
import { useNamespace } from '../../../hooks';
import { HeaderProps } from './header';
const { componentName, create } = createComponent('Header');
import { Row, Col } from 'ant-design-vue'

export default create({
  props: HeaderProps,
  components: {
    [Row.name as string]: Row,
    [Col.name as string]: Col
  },
  setup(props, { emit }) {
    let ns = useNamespace('header');

    return {
      ns
    };
  }
});
</script>
