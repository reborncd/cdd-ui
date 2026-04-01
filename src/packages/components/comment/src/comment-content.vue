<template>
  <div :class="[ns.b()]">
    <div class="right-cnt-top" :style="`height: calc(100% - ${rightBottomHeight}px)`" ref="cntTopCommentaryRef">
      <div class="right-cnt-top-cnt">
        <div v-if="commentaryList.length" class="right-cnt-top-cnt-ul">
          <fl-comment-item
            v-for="(item, index) in commentaryList"
            :class="[
              'right-cnt-top-cnt-li',
              {
                'show-full-screen': index === itemKey
              }
            ]"
            :key="index"
            :ref="setCommentaryListRefs"
            :commentaryData="item"
            :itemKey="index"
            :canAddCommentary="canAddCommentary"
            :showCount="showCount"
            :maxLength="maxLength"
            :placeholder="placeholder"
            :isShowShrinkIcon="isShowShrinkIcon"
            :modeType="itemFullScreenInfoType == 'fullScreenTextarea' ? 'fullScreen' : 'shrink'"
            @fullScreenItem="fullScreenItem"
            @saveItemConfirm="saveItemConfirm"
          >
            <template v-if="Boolean(slots['title-box'])" #title-box>
              <slot name="title-box" :row="item"></slot>
            </template>
          </fl-comment-item>
        </div>
        <fl-empty
          v-else
          :image="emptyObj.emptyCommentarySvg"
          :description="emptyObj.description"
          class="commentary-empty"
        ></fl-empty>
      </div>
    </div>
    <div
      v-if="canAddCommentary"
      :class="[
        'right-cnt-bottom',
        { 'right-cnt-bottom-shadow': showBottomShadow, 'show-full-screen': fullScreenInfoType == 'fullScreenTextarea' }
      ]"
      ref="cntBottomCommentaryRef"
    >
      <!-- :autoSize="
            fullScreenInfoType == 'fullScreenTextarea'
              ? { minRows: 2 }
              : {
                  minRows: 2,
                  maxRows: 5
                }
          " -->
      <div class="right-cnt-bottom-cnt">
        <fl-comment-textarea
          class="comment-content-save"
          v-model="saveValue"
          ref="fullScreenTextareaRef"
          :modeType="fullScreenInfoType == 'fullScreenTextarea' ? 'fullScreen' : 'shrink'"
          :placeholder="placeholder"
          :selectTypeCommentary="selectTypeCommentary"
          :maxLength="maxLength"
          :showCount="showCount"
          @shrinkTextarea="shrinkTextarea"
          @fullScreenTextarea="fullScreenTextarea"
          @saveTextareaConfirm="saveTextareaConfirm"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, nextTick, computed, onMounted, onUnmounted, watch, toRef } from 'vue';
import createComponent from '../../../utils/create';
import { useNamespace } from '../../../hooks';
import { CommentContentProps } from './comment-content';
import CommentTextarea from './comment-textarea.vue';
import commentItem from './comment-item.vue';
import { Icon } from '../../icon/index';
import { Empty } from '../../empty/index';

const { create } = createComponent('CommentContent');

export default create({
  components: {
    [Icon.name]: Icon,
    [CommentTextarea.name]: CommentTextarea,
    [commentItem.name]: commentItem,
    [Empty.name]: Empty
  },
  props: CommentContentProps,
  emits: ['saveTextareaConfirm', 'saveItemConfirm'],
  setup(props, { emit, expose, slots }) {
    const ns = useNamespace('comment-content');
    const cntTopCommentaryRef = ref<HTMLElement | null>(null);
    const fullScreenTextareaRef = ref<HTMLElement | null>(null);
    const cntBottomCommentaryRef = ref<HTMLElement | null>(null);
    const commentaryListRefs = ref<HTMLElement[]>([]);
    // 右侧评论内容下半部分高度
    const rightTopScrollHeight = ref<Number>(0);
    const rightBottomHeight = ref<Number>(props.canAddCommentary ? 160 : 0);
    const rightTopClientHeight = ref<Number>(0);
    const saveValue = ref('');
    const fullScreenInfoType = ref('');
    const itemFullScreenInfoType = ref<string | number>('');
    const itemKey = ref<string | number>('');

    // 放大输入
    const fullScreenTextarea = () => {
      fullScreenInfoType.value = fullScreenInfoType.value == 'fullScreenTextarea' ? 'shrink' : 'fullScreenTextarea';
      nextTick(() => {
        // @ts-ignore
        fullScreenTextareaRef?.value.textareafocus();
      });
    };

    // 缩小输入框
    const shrinkTextarea = () => {
      fullScreenInfoType.value = fullScreenInfoType.value == 'fullScreenTextarea' ? 'shrink' : 'fullScreenTextarea';
      nextTick(() => {
        // @ts-ignore
        fullScreenTextareaRef.value.textareafocus();
      });
    };

    const showBottomShadow = computed(() => {
      return rightTopClientHeight.value < rightTopScrollHeight.value;
    });

    // 保存
    const saveTextareaConfirm = (commentData: any) => {
      commentData.selectTypeCommentary.commentary = saveValue.value;
      emit('saveTextareaConfirm', {
        ...commentData,
        // 接口正确返回回调
        callback: () => {
          commentData.selectTypeCommentary.commentary = '';
          saveValue.value = '';
          fullScreenInfoType.value = '';
          nextTick(() => {
            props.commentaryList.forEach((item, index) => {
              // @ts-ignore
              commentaryListRefs.value[index]?.initializationData();
            });
          });
        },
        // 接口调用结束后的回调
        finallyBack: (triggerCancelEdit?:boolean) => {
          commentData.finallyBack(triggerCancelEdit);
        }
      });
    };

    // 列表 item 存储 refs
    const setCommentaryListRefs = (el: HTMLElement) => {
      if (el) {
        commentaryListRefs.value.push(el);
      }
    };

    // 列表放大/缩小
    const fullScreenItem = (infoData: any) => {
      // @ts-ignore
      itemKey.value = itemKey.value === '' ? infoData.itemKey : '';
      itemFullScreenInfoType.value =
        itemFullScreenInfoType.value == 'fullScreenTextarea' ? 'shrink' : 'fullScreenTextarea';
      nextTick(() => {
        // @ts-ignore
        commentaryListRefs.value[itemKey]?.modifyStatu(infoData.edit);
      });
    };

    // 列表保存
    const saveItemConfirm = (infoData: any) => {
      emit('saveItemConfirm', {
        ...infoData,
        callback: (callData: any) => {
          itemKey.value = '';
          nextTick(() => {
            infoData.callback(callData.commentaryData);
            // save保存关闭所有的评论编辑态
            props.commentaryList.forEach((item, index) => {
              // @ts-ignore
              commentaryListRefs.value[index]?.initializationData();
            });
          });
        },
        finallyBack: () => {
          infoData.finallyBack();
        }
      });
    };

    const handleCommentaryContentHeight = () => {
      // @ts-ignore
      rightTopClientHeight.value = cntTopCommentaryRef.value.clientHeight;
      // @ts-ignore
      rightTopScrollHeight.value = cntTopCommentaryRef.value.scrollHeight;
    };

    // 评论列表滚动到底部
    const scrollToBottom = () => {
      // @ts-ignore
      cntTopCommentaryRef.value.scrollTop = cntTopCommentary.scrollHeight;
    };

    const handleResize = (rect: any) => {
      // 在这里处理DOM元素宽高变化后的逻辑
      rightBottomHeight.value = rect.height + 16;
      nextTick(() => {
        // 当DOM元素宽高发生变化后 滚动页面到底部
        scrollToBottom();
        // 触发 获取DOM元素高度变化后的可视 滚动高度
        handleCommentaryContentHeight();
      });
    };

    watch(props.selectTypeCommentary, (newValue, oldValue) => {
      props.commentaryList.forEach((item, index) => {
        // @ts-ignore
        commentaryListRefs.value[index]?.initializationData();
      });
    });

    watch(props.commentaryList, (nVal, oVal) => {
      setTimeout(() => {
        handleCommentaryContentHeight();
        // 增加评论条数 则滚动到底部
        if (nVal.length > oVal.length) {
          // this.scrollToBottom()
        }
      }, 50);
    });

    onMounted(() => {
      const resizeObserver = new ResizeObserver((entries) => {
        // 当DOM元素的宽高发生变化时执行回调函数
        // this.handleResize(entries[0].contentRect)
      });
      if (props.canAddCommentary) {
        // @ts-ignore
        resizeObserver.observe(cntBottomCommentaryRef.value);
      }

      // 组件销毁时停止观察
      onUnmounted(() => {
        resizeObserver.disconnect();
      });

      setTimeout(() => {
        handleCommentaryContentHeight();
      }, 200);
    });

    return {
      ns,
      slots,
      cntTopCommentaryRef,
      showBottomShadow,
      rightTopScrollHeight,
      rightBottomHeight,
      rightTopClientHeight,
      saveValue,
      fullScreenInfoType,
      itemFullScreenInfoType,
      fullScreenTextarea,
      saveTextareaConfirm,
      shrinkTextarea,
      fullScreenTextareaRef,
      cntBottomCommentaryRef,
      commentaryListRefs,
      setCommentaryListRefs,
      fullScreenItem,
      itemKey,
      saveItemConfirm,
      scrollToBottom,
      handleResize
    };
  }
});
</script>
