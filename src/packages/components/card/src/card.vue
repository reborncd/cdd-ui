<template>
  <div :class="{
    [ns.b()]: true,
    'cdd-b-card': type === 'b-card' ? true : false,
    'cdd-top-line': type === 'top-line' ? true : false
  }">
    <div class="text-border">
      <span class="text-border-title" v-if="title">{{ title }}</span>
      <slot name="card-top"></slot>
      <div class="text-border-content">
        <slot></slot>
      </div>
      <slot name="card-bottom"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import createComponent from '../../../utils/create';
import { useNamespace } from '../../../hooks';
import { CardProps } from './card'
const { create } = createComponent('Card');

export default create({
  props: CardProps,
  setup(props, { emit }) {
    const ns = useNamespace('card');

    return {
      ns
    };
  }
});
</script>
