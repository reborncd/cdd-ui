<template>
  <div :class="ns.b()">
    <div :class="['lease-header-cnt', className]">
      <div class="lease-header-left">
        <a-tooltip v-bind="arrowLeftTooltipProps" v-if="isShowArrowLeftIcon">
            <template #title v-if="arrowLeftText">
              {{ arrowLeftText }}
            </template>
            <ArrowLeftOutlined v-if="isShowArrowLeftIcon" class="icon-arrow" @click="jumpList" />
        </a-tooltip>
        <div class="lease-header-left-title">
          <a-tooltip v-bind="tooltipProps" v-if="!hasHeaderLeftSlot">
            <template #title>
              {{ title }}
            </template>
            <span class="ellipsis1">
              {{ title }}
            </span>
          </a-tooltip>
          <template v-else>
            <slot name="header-left"></slot>
          </template>
          <slot name="header-right"></slot>
        </div>
      </div>
      <UpdownBtn
        v-if="isShowArrowRightBtn"
        :upDisabled="upDisabled"
        :downDisabled="downDisabled"
        :previousText="previousText"
        :nextText="nextText"
        @btnClick="btnClick"
      />
    </div>
    <slot name="lease-header-bottom"></slot>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import { ArrowLeftOutlined } from '@ant-design/icons-vue';
import createComponent from '../../../utils/create';
import { useNamespace } from '../../../hooks';
import { LeaseHeaderProps } from './lease-header';
import UpdownBtn from './updown-btn.vue';
const { create } = createComponent('LeaseHeader');
import { Tooltip } from 'ant-design-vue';

export default create({
  components: {
    ArrowLeftOutlined,
    UpdownBtn,
    [Tooltip.name as string]: Tooltip
  },
  props: LeaseHeaderProps,
  emits: ['jumpList', 'btnClick'],
  setup(props, { emit, slots }) {
    const ns = useNamespace('leaseheader');
    // 是否 header-left业务侧重写
    const hasHeaderLeftSlot = ref(false);

    // 点击左侧按钮
    const jumpList = (event: MouseEvent) => {
      emit('jumpList', event);
    };

    // 右侧按钮点击
    const btnClick = (pos: string) => {
      emit('btnClick', pos);
    };

    onMounted(() => {
      if (!!slots['header-left']) {
        hasHeaderLeftSlot.value = true;
      }
    });
    return {
      ns,
      hasHeaderLeftSlot,
      jumpList,
      btnClick
    };
  }
});
</script>
