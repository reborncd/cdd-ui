<template>
  <a-popover v-bind="attrs" :overlayClassName="ns.b()">
    <template #content>
      <slot name="content" v-if="slots['content']"></slot>
      <div class="popover-content-box" v-else>
        <div class="content">
          <InfoCircleFilled
            :style="{
              color: 'red',
              marginRight: '2px'
            }"
          />
          {{ contentName }}
        </div>
        <div class="popover-content-bottom">
          <a-button v-bind="cancelProps" @click="cancelBtn">{{ cancelName }}</a-button>
          <a-button v-bind="deleteProps" @click="deleteBtn">{{ deleteName }}</a-button>
        </div>
      </div>
    </template>
    <slot></slot>
  </a-popover>
</template>

<script lang="ts">
import { ref } from 'vue';
import createComponent from '../../../utils/create';
import { useNamespace, useAttrs } from '../../../hooks';
import { Popover, Button } from 'ant-design-vue';
import { Icon } from '../../icon/index';
import { PopoverProps } from './popover';
import { InfoCircleFilled } from '@ant-design/icons-vue';
const { create } = createComponent('Popover');

export default create({
  props: PopoverProps,
  components: {
    [Popover.name as string]: Popover,
    [Button.name as string]: Button,
    [Icon.name]: Icon,
    InfoCircleFilled
  },
  emits: ['cancelBtn', 'deleteBtn'],
  setup(props, { emit, slots }) {
    const ns = useNamespace('popover');
    const attrs = useAttrs();
    const open = ref(true);

    const cancelBtn = (e: MouseEvent) => {
      emit('cancelBtn', e);
    };

    const deleteBtn = (e: MouseEvent) => {
      emit('deleteBtn', e);
    };

    return {
      ns,
      open,
      attrs,
      cancelBtn,
      deleteBtn,
      slots
    };
  }
});
</script>
