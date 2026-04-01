<template>
  <div :class="ns.b()">
    <a-anchor v-bind="attrs" :items="anchorList" @change="anchorChange" @click="handlerClick"></a-anchor>
  </div>
</template>

<script lang="ts">
import createComponent from '../../../utils/create';
import { useNamespace, useAttrs } from '../../../hooks';
import { AnchorProps } from './anchor';
const { create } = createComponent('Anchor');
import { Anchor } from 'ant-design-vue'
interface Link {
  href?: string;
}
export default create({
  props: AnchorProps,
  components: {
    [Anchor.name as string]: Anchor
  },
  emits: ['click', 'change'],
  setup(props, { emit }) {
    const ns = useNamespace('anchor');
    const attrs = useAttrs();
    
    const handlerClick = (e: MouseEvent, link: Link) => {
      e.preventDefault()
      emit('click', e, link)
      if (link?.href) {
        const element = document.querySelector(link?.href)
        element && element.scrollIntoView()
      }
    };
    const anchorChange = (currentActiveLink: string) => {
      emit('change', currentActiveLink)
    }
    return {
      ns,
      attrs,
      handlerClick,
      anchorChange,
    };
  }
});
</script>
