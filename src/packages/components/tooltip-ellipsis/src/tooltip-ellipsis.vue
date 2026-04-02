<template>
  <a-tooltip :class="ns.b()" v-bind="attrs" :trigger="trigger">
    <template #title>
      <div>{{ content }}</div>
    </template>
    <cdd-ellipsis
      :content="content"
      :width="width"
      :rows="rows"
      :dots="dots"
      @ellipsis="ellipsis"
      :style="ellipsisStyle"
      @click="textClick"
    ></cdd-ellipsis>
  </a-tooltip>
</template>

<script lang="ts">
import { ref } from 'vue';
import createComponent from '../../../utils/create';
import { useNamespace, useAttrs } from '../../../hooks';
import { Tooltip } from 'ant-design-vue';
import { Ellipsis } from '../../ellipsis/index';
import { TooltipEllipsisProps } from './tooltip-ellipsis';
const { create } = createComponent('TooltipEllipsis');

export default create({
  props: TooltipEllipsisProps,
  components: {
    [Tooltip.name as string]: Tooltip,
    [Ellipsis.name]: Ellipsis
  },
  emits: ['textClick'],
  setup(props, { emit }) {
    const ns = useNamespace('tooltip-ellipsis');
    const trigger = ref('');
    const attrs = useAttrs();
    const { tooltipTrigger, isShowEllipsisTooltip } = props;

    const ellipsis = (e: any) => {
      if (isShowEllipsisTooltip && e.ellipsis) {
        trigger.value = tooltipTrigger;
      }
      if (!isShowEllipsisTooltip) {
        trigger.value = tooltipTrigger;
      }
    };

    const textClick = (e: MouseEvent) => {
      emit('textClick', e);
    };

    return {
      ns,
      attrs,
      ellipsis,
      trigger,
      textClick
    };
  }
});
</script>
