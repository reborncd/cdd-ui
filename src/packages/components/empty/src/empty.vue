<!--
 * @Author: wukunling 13022195532@163.com
 * @Date: 2024-10-24 17:49:51
 * @LastEditors: wukunling 13022195532@163.com
 * @LastEditTime: 2024-11-18 09:50:27
 * @FilePath: /iflorens-web-ui/src/packages/components/empty/src/empty.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE.svg
-->
<template>
  <div :class="[ns.b()]">
    <a-empty :image="emptyImage">
      <template #description>
        {{ description }}
        <div class="empty-btn" @click="btnClick" v-if="isShowBtn">
          <fl-icon
            :type="btnIcon.type"
            :style="btnIcon.style"
          ></fl-icon>
          {{ btnName }}
        </div>
        <slot></slot>
      </template>
    </a-empty>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import createComponent from '../../../utils/create';
import { useNamespace } from '../../../hooks';
import defaultImg from './load.png';
import noItem from './empty-img-gray.svg';
import noData from './noData.jpg';
import { EmptyProps } from './empty';
import { Empty } from 'ant-design-vue';
import { Icon } from '../../icon/index';
const { create } = createComponent('Empty');
const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;
export default create({
  props: EmptyProps,
  components: {
    [Empty.name as string]: Empty,
    [Icon.name]: Icon
  },
  emits: ["btnClick"],
  setup(props, { emit }) {
    const ns = useNamespace('empty');
    const emptyImage = ref('');
    if (props.image) {
      emptyImage.value = props.image;
    } else if (props.type === 'noItem') {
      emptyImage.value = noItem;
    } else if (props.type === 'noData') {
      emptyImage.value = noData;
    } else if (props.type === 'simpleImage') {
      emptyImage.value = simpleImage;
    } else {
      emptyImage.value = defaultImg;
    }

    const btnClick = (e: MouseEvent) => {
      emit("btnClick", e)
    }

    return {
      ns,
      emptyImage,
      btnClick
    };
  }
});
</script>
