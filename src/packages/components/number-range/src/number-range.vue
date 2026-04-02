<template>
  <div
    :class="{
      [ns.b()]: true,
      'number-range-disabled': disabled
    }"
  >
    <div
      :class="{
        'number-range': true,
        'number-range-focus': dateBarVisible
      }"
      ref="numberRangeRef"
    >
      <a-input-number
        class="number-range-input"
        v-bind="attrs"
        v-model:value="modelValue[0]"
        :placeholder="fromPlaceholder"
        :disabled="disabled"
        @focus="(e) => onDateFocus(e, 'fromDate')"
        @blur="(e) => onDateBlur(e, 'fromDate')"
        @change="(e) => onChange(e, 'fromDate')"
      ></a-input-number>
      <cdd-icon class="number-range-icon" type="iflorens-SwapRight" />
      <a-input-number
        class="number-range-input number-range-input-two"
        v-bind="attrs"
        v-model:value="modelValue[1]"
        :placeholder="toPlaceholder"
        :disabled="disabled"
        @focus="(e) => onDateFocus(e, 'toDate')"
        @blur="(e) => onDateBlur(e, 'toDate')"
        @change="(e) => onChange(e, 'toDate')"
      ></a-input-number>
      <div v-if="dateBarVisible" :class="`cdd-number-active-bar`" :style="dateBarActiveStyle"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { InputNumber } from 'ant-design-vue';
import { Icon } from '../../icon';
import { ref, Ref, watch, onMounted, nextTick, toRef, onBeforeUnmount } from 'vue';
import createComponent from '../../../utils/create';
import { NumberRangeProps } from './number';
import { useNamespace, useAttrs } from '../../../hooks';

const { create } = createComponent('NumberRange');
export default create({
  components: {
    [InputNumber.name]: InputNumber,
    [Icon.name]: Icon
  },
  props: NumberRangeProps,
  emits: ['update:modelValue', 'change', 'focus', 'blur'],
  setup(props, { emit }) {
    const numberRangeRef = ref(null) as Ref<HTMLElement | null>;
    const ns = useNamespace('number-range');
    const dateBarVisible = ref(false);
    const dateBarActiveStyle = ref({
      width: '',
      left: '10px'
    });

    const attrs = useAttrs();

    const init = () => {
      dateBarActiveStyle.value.width = numberRangeRef.value ? (numberRangeRef.value.offsetWidth - 60) / 2 + 'px' : '';
    };

    const onDateFocus = (e, type) => {
      if (type === 'fromDate') {
        dateBarActiveStyle.value.left = '10px';
      } else {
        dateBarActiveStyle.value.left = numberRangeRef.value ? numberRangeRef.value.offsetWidth / 2 + 30 + 'px' : '';
      }
      dateBarVisible.value = true;
      emit('focus', { e, type });
    };

    const onDateBlur = (e, type) => {
      dateBarVisible.value = false;
      emit('blur', { e, type });
    };

    const onChange = (e, type) => {
      emit('change', props.modelValue);
    };

    onMounted(() => {
      nextTick(() => {
        init();
      });
    });

    window.addEventListener('resize', () => {
      init();
    });
    onBeforeUnmount(() => {
      window.removeEventListener('size', () => {});
    });

    return {
      ns,
      attrs,
      dateBarVisible,
      numberRangeRef,
      dateBarActiveStyle,
      onDateFocus,
      onDateBlur,
      onChange
    };
  }
});
</script>

<style lang="scss" scoped>
.number-range {
  position: relative;
  .cdd-icon {
    color: var(--cdd-col-disabledtext);
    transform: translateX(-50%);
    margin: -2px;
  }
  .cdd-number-active-bar {
    left: 0;
    height: 2px;
    position: absolute;
    bottom: -1px;
    transition: all 0.3s ease-out;
    pointer-events: none;
    border-radius: 2px 2px 0px 0px;
    background: var(--cdd-col-fblue5);
  }
}
</style>
