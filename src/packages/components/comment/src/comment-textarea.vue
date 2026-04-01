<template>
  <div :class="[ns.b(), { 'is-edit': isEdit && isShowFocusBorder }]">
    <div class="commentary-textarea-head" v-if="isShowHeader">
      <div class="commentary-textarea-head-tag">
        {{ selectTypeCommentary.label }}
      </div>
      <fl-icon :type="modeType === 'shrink' ? 'iflorens-ExpandAlt' : 'iflorens-Shrink'" @click="shrinkClick"></fl-icon>
    </div>
    <div class="commentary-textarea-cnt">
      <a-textarea
        v-if="maxLength != 0"
        ref="textareaRef"
        class="commentary-textarea-textarea"
        :value="modelValue"
        :maxLength="maxLength"
        :placeholder="placeholder"
        :autosize="{ minRows: 4 }"
        @input="emit('update:modelValue', $event.target.value)"
        @focus="focusInput"
        @blur="blurInput"
        @keydown="emit('keydown', $event)"
        @change="emit('change', $event)"
      />
      <a-textarea
        v-else
        ref="textareaRef"
        class="commentary-textarea-textarea"
        :value="modelValue"
        :placeholder="placeholder"
        :autosize="{ minRows: 4 }"
        @input="emit('update:modelValue', $event.target.value)"
        @focus="focusInput"
        @blur="blurInput"
        @keydown="emit('keydown', $event)"
        @change="emit('change', $event)"
      />
    </div>
    <a-space class="commentary-textarea-foot" :size="12">
      <div v-if="showCount" class="foot-hint">
        <span class="foot-hint-max">
          {{ modelValue ? modelValue.length || "0" :"0" }}
        </span>
        <span v-if="maxLength">{{ "/" +maxLength }}</span>
      </div>
      <a-space class="foot-btn">
        <template v-if="slots['foot-btn']">
          <slot name="foot-btn"> </slot>
        </template>
        <template v-else>
          <a-button
            type="primary"
            size="small"
            class="comment-btn"
            :loading="saveLoading"
            :disabled="!(modelValue || '').length"
            @click="saveTextareaConfirm"
          >
            Save
          </a-button>
        </template>
      </a-space>
    </a-space>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import createComponent from '../../../utils/create';
import { useNamespace } from '../../../hooks';
import { CommentTextareaProps } from './comment-textarea';
import { Icon } from '../../icon/index';
import { emit } from 'process';
const { create } = createComponent('CommentTextarea');
import { Button, Space, Textarea } from 'ant-design-vue';

export default create({
  components: {
    [Icon.name]: Icon,
    [Button.name as string]: Button,
    [Space.name as string]: Space,
    [Textarea.name as string]: Textarea
  },
  props: CommentTextareaProps,
  emits: ['update:modelValue', 'fullScreenTextarea', 'shrinkTextarea', 'saveTextareaConfirm', 'change', 'keydown'],
  setup(props, { emit, slots }) {
    const ns = useNamespace('comment-textarea');
    const textareaRef: any = ref(null);
    const saveLoading = ref(false);
    const isEdit = ref(false);

    // 按钮点击展开缩放
    const shrinkClick = () => {
      if (props.modeType === 'shrink') {
        // 展示全屏
        emit('fullScreenTextarea', {
          modeType: 'fullScreen',
          selectTypeCommentary: props.selectTypeCommentary
        });
      } else if (props.modeType === 'fullScreen') {
        // 全屏缩放
        emit('shrinkTextarea', {
          modeType: 'shrink',
          selectTypeCommentary: props.selectTypeCommentary
        });
      }
    };

    const focusInput = () => {
      isEdit.value = true;
    };

    const blurInput = () => {
      isEdit.value = false;
    };

    const textareafocus = () => {
      textareaRef.value?.focus();
    };
    const textareablur = () => {
      textareaRef.value?.blur();
    };

    // 保存
    const saveTextareaConfirm = () => {
      saveLoading.value = true;
      emit('saveTextareaConfirm', {
        modeType: props.modeType,
        selectTypeCommentary: props.selectTypeCommentary,
        finallyBack: () => {
          saveLoading.value = false;
        }
      });
    };

    return {
      slots,
      emit,
      ns,
      saveLoading,
      isEdit,
      shrinkClick,
      focusInput,
      blurInput,
      textareaRef,
      textareafocus,
      saveTextareaConfirm,
      textareablur
    };
  }
});
</script>

<style lang="scss" scoped>
.comment-btn {
  line-height: 0;
}
</style>
