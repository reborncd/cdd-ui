<template>
  <a-modal v-bind="attrs" :wrapClassName="wrapClassName ? wrapClassName : ns.b()" @cancel="handleCancel">
    <slot></slot>
    <template v-if="$slots.footer" #footer>
      <slot name="footer"></slot>
    </template>
  </a-modal>
</template>

<script lang="ts">
import { ref } from 'vue';
import createComponent from '../../../utils/create';
import { useNamespace, useAttrs } from '../../../hooks';
import { Modal } from 'ant-design-vue';
import { ModalProps } from './modal'
const { create } = createComponent('Modal');

export default create({
  components: {
    [Modal.name as string]: Modal
  },
  props: ModalProps,
  setup(props, { emit }) {
    const ns = useNamespace('modal');
    const attrs = useAttrs();
    const open = ref(true);

    return {
      ns,
      open,
      attrs
    };
  }
});
</script>