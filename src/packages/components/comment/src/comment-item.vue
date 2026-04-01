<template>
  <div :class="[ns.b(), { 'is-edit': isEdit }]">
    <div class="commentary-item-head">
      <div class="commentary-item-head-title">
        <template v-if="!Boolean(slots['title-box'])">
          <span class="head-title-effdate"> Contract Effective Date: {{ commentaryData.effdt || '-' }} </span>
          <span class="head-title-creat">
            {{ commentaryData.createName || commentaryData.createBy }} created on
            {{ moment(commentaryData.createTime).format('YYYY-MM-DD') }}
          </span>
          <a-tooltip
            :overlayStyle="{
              maxWidth: 'fit-content'
            }"
          >
            <template #title>
              <a-space class="tooltip-cnt" direction="vertical" :size="0">
                <span>
                  {{ commentaryData.createName || commentaryData.createBy }} created on
                  {{ moment(commentaryData.createTime).format('YYYY-MM-DD') }},
                </span>
                <span>
                  {{ commentaryData.updateName || commentaryData.updateBy }} updated on
                  {{ moment(commentaryData.updateTime).format('YYYY-MM-DD') }}
                </span>
              </a-space>
            </template>
            <fl-icon
              v-if="commentaryData.createTime !== commentaryData.updateTime"
              type="iflorens-ExclamationCircle"
            ></fl-icon>
          </a-tooltip>
        </template>
        <template v-else>
          <slot name="title-box"></slot>
        </template>
      </div>
      <div class="right-icon">
        <template v-if="!isEdit && canAddCommentary">
          <fl-icon type="iflorens-Edit" @click="editCommentary" />
        </template>
        <template v-if="!isEdit && canAddCommentary && isShowShrinkIcon">
          <a-divider type="vertical" style="background-color: #d9d9d9" />
        </template>
        <!-- 放大缩小 -->
        <fl-icon
          v-if="isShowShrinkIcon"
          :type="modeType === 'shrink' ? 'iflorens-ExpandAlt' : 'iflorens-Shrink'"
          @click="shrinkClick"
        ></fl-icon>
      </div>
    </div>
    <!-- 编辑态 -->
    <fl-comment-textarea
      class="coment-item-save"
      ref="commentItemRef"
      v-model="itemData.commentary"
      v-if="isEdit"
      :selectTypeCommentary="itemData"
      :is-show-header="false"
      :is-show-focus-border="false"
      :showCount="showCount"
      :max-length="maxLength"
      :placeholder="placeholder"
    >
      <template #foot-btn>
        <a-button type="primary" size="small" class="cancel-btn comment-btn" @click="cancelEdit"> Cancel </a-button>
        <a-button type="primary" size="small" class="comment-btn" :loading="saveLoading" @click="saveItemConfirm">
          Save
        </a-button>
      </template>
    </fl-comment-textarea>
    <!-- 文本态 -->
    <div v-if="!isEdit" class="commentary-item-text-cnt">
      <div class="item-cnt-text">
        <div class="text-more-el-5" ref="textElRef">
          {{ commentaryData.commentary }}
        </div>
      </div>
      <div v-if="showAll && modeType !== 'fullScreen'" class="item-cnt-text-foot">
        <a-space class="text-foot-btn" :size="8" @click="fullScreenItem">
          <fl-icon type="iflorens-ExpandAlt" />
          <span>Show All</span>
        </a-space>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, nextTick, onMounted, watch } from 'vue';
import moment from 'moment';
import createComponent from '../../../utils/create';
import { useNamespace } from '../../../hooks';
import { CommentItemProps } from './comment-item';
import CommentTextarea from './comment-textarea.vue';
import { Icon } from '../../icon/index';
const { create } = createComponent('CommentItem');
import { Button, Divider, Tooltip, Space } from 'ant-design-vue';

export default create({
  components: {
    [Icon.name]: Icon,
    [CommentTextarea.name]: CommentTextarea,
    [Button.name as string]: Button,
    [Divider.name as string]: Divider,
    [Tooltip.name as string]: Tooltip,
    [Space.name as string]: Space
  },
  props: CommentItemProps,
  emits: ['fullScreenItem', 'shrinkItem', 'saveItemConfirm'],
  setup(props, { emit, slots }) {
    const ns = useNamespace('comment-item');
    const isEdit = ref(false);
    const showAll = ref(false);
    const saveLoading = ref(false);
    const commentItemRef: any = ref(null);
    const textElRef: any = ref(null);
    const textareaValue = ref('');
    const itemData = ref({
      commentary: ''
    });

    const whetherTheTextIsTooLong = () => {
      nextTick(() => {
        const el = textElRef.value;
        const curStyle = window.getComputedStyle(el, null);
        // 解决初始化时没有获取到可视高度时 手动计算
        let lineHeight = parseFloat(curStyle.lineHeight);
        let webkitLineClamp = parseFloat(curStyle.webkitLineClamp);
        let offsetHeight = lineHeight * webkitLineClamp;
        // 创建一个容器来记录文字的width
        const textDiv = document.createElement('div');
        // 设置新容器的字体样式，确保与当前需要隐藏的样式相同
        textDiv.style.width = curStyle.width;
        textDiv.style.lineHeight = curStyle.lineHeight;
        textDiv.style.fontSize = curStyle.fontSize;
        textDiv.style.fontWeight = curStyle.fontWeight;
        textDiv.style.fontFamily = curStyle.fontFamily;
        textDiv.style.whiteSpace = curStyle.whiteSpace;
        textDiv.style.wordBreak = curStyle.wordBreak;

        // 将容器插入body，如果不插入，offsetWidth为0
        document.body.appendChild(textDiv);
        // 设置新容器的文字
        textDiv.innerHTML = el.innerText;
        // 容器内的可视高度是否大于展示容器
        showAll.value = textDiv.offsetHeight > (el.offsetHeight || offsetHeight);

        // 如果 textDiv.remove方法存在（现代浏览器支持），则使用它
        if (textDiv.remove) {
          textDiv.remove();
        } else {
          // 否则，使用parentNode.removeChild方法
          // @ts-ignore
          textDiv.parentNode.removeChild(textDiv);
        }
      });
    };

    const focus = () => {
      commentItemRef?.value.textareafocus();
    };

    const modifyStatu = (v: boolean) => {
      isEdit.value = v;
      if (v) {
        nextTick(() => {
          focus();
        });
      }
    };

    const initializationData = () => {
      isEdit.value = false;
    };

    const fullScreenItem = () => {
      emit('fullScreenItem', {
        commentaryData: props.commentaryData,
        itemKey: props.itemKey,
        edit: isEdit.value,
        modifyStatu,
        focus,
        callback: (backData: any) => {
          if (backData.from === 'save') {
            itemData.value = backData.commentaryData.commentary;
          }
          itemData.value = props.commentaryData.commentary;
        }
      });
    };

    const editCommentary = () => {
      isEdit.value = true;
      itemData.value.commentary = props.commentaryData.commentary;
    };

    const shrinkClick = () => {
      // if (props.modeType === 'shrink') {
      //   fullScreenItem();
      // } else if (props.modeType === 'fullScreen') {
      //   emit('shrinkItem', {
      //     commentaryData: props.commentaryData,
      //     itemKey: props.itemKey,
      //     edit: isEdit.value,
      //     modifyStatu: modifyStatu
      //   });
      // }
      fullScreenItem();
    };

    const cancelEdit = () => {
      isEdit.value = false;
      itemData.value.commentary = '';
    };

    // 保存
    const saveItemConfirm = () => {
      saveLoading.value = true;
      const commentaryData = props.commentaryData;
      emit('saveItemConfirm', {
        modeType: props.modeType,
        commentaryData: {
          ...props.commentaryData,
          commentary: itemData.value.commentary
        },
        itemKey: props.itemKey,
        modifyStatu: modifyStatu,
        callback: (commentaryData: any) => {
          props.commentaryData.commentary = commentaryData.commentary;
        },
        finallyBack: (triggerCancelEdit?:boolean) => {
          saveLoading.value = false;
          if (triggerCancelEdit){
            cancelEdit();
          }
        }
      });
    };

    onMounted(() => {
      whetherTheTextIsTooLong();
    });

    watch(
      props.commentaryData,
      (newValue, oldValue) => {
        if (!isEdit.value) {
          whetherTheTextIsTooLong();
        }
      },
      { deep: true }
    );

    return {
      ns,
      props,
      slots,
      textareaValue,
      initializationData,
      focus,
      commentItemRef,
      textElRef,
      isEdit,
      showAll,
      saveLoading,
      fullScreenItem,
      moment,
      editCommentary,
      shrinkClick,
      cancelEdit,
      saveItemConfirm,
      itemData,
      modifyStatu
    };
  }
});
</script>

<style lang="scss" scoped>
.comment-btn {
  line-height: 0;
}
</style>
