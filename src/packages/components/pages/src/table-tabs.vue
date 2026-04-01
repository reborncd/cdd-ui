<template>
  <div :class="[ns.b()]"> </div>
</template>

<script lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import createComponent from '../../../utils/create';
import { useNamespace } from '../../../hooks';
import { Collect } from '../../collect/index';
import { TabaleTabsProps } from './table-tabs';
import { DataExport } from '../../data-export/index';
import { IconButton } from '../../icon-button';
import { Icon } from '../../icon/index';
import { Tooltip, Popover, Checkbox, CheckboxGroup } from 'ant-design-vue';
import { VueDraggableNext } from 'vue-draggable-next';
const { create } = createComponent('PagesTabs');
import { Table } from '../../table';

export default create({
  components: {},
  props: TabaleTabsProps,
  emits: [],
  setup(props, { emit, expose, slots }) {
    const ns = useNamespace('pages-tabs');
    return {
      ns
    };
  }
});
</script>

<style lang="scss" scoped>
:deep(.fl-dropdown) {
  width: auto;
}
.resize-handle {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 1px;
  cursor: ew-resize;
  background: var(--fl-col-neutral9);
  &:hover {
    width: 5px;
    background: red;
  }
}
/* 禁用文本选择 */
.no-select {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}
:deep(.vxe-table--render-default) {
  .vxe-table--resizable-bar:before {
    background: var(--fl-col-fblue5);
  }
}
:deep(.vxe-header--column) {
  .vxe-resizable {
    height: 50%;
    background: var(--fl-col-neutral9);
    top: 50%;
    transform: translate(0, -50%);
    width: 1px;
    right: 0;
    &:hover {
      width: 5px;
      background: var(--fl-col-fblue5);
    }
  }
  .is--line {
    display: block;
  }
}
</style>
