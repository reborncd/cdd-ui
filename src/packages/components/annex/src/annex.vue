<template>
  <div :class="ns.b()">
    <div class="file-content">
      <cdd-icon :type="leftIconType"></cdd-icon>
      <span class="file-name">
        <cdd-tooltip-ellipsis :content="fileName" placement="topLeft" overlayClassName="resourceDesc" :tooltipTrigger="'hover'">
        </cdd-tooltip-ellipsis>
      </span>
      <slot name="left"></slot>
      <cdd-icon v-if="isShowPreviewBtn" class="right-icon" type="iflorens-Eye" @click="eyeClick"></cdd-icon>
      <cdd-icon v-if="isShowDownloadBtn" class="right-icon" type="iflorens-Download" @click="downloadFile"></cdd-icon>
      <cdd-icon v-if="isShowDelBtn" class="right-icon" type="iflorens-DeleteOutlined" @click="delFile"></cdd-icon>
      <slot name="right"></slot>
    </div>
    <a-progress v-if="isUpdate" :percent="percent" :show-info="false" :strokeWidth="strokeWidth" />
  </div>
</template>

<script lang="ts">
import { ref, watch } from 'vue';
import createComponent from '../../../utils/create';
import { useNamespace } from '../../../hooks';
import { AnnexProps } from './annex';
import { TooltipEllipsis } from "../../tooltip-ellipsis";
import { handlePicture } from '../../../utils/fileUtil';
import { Icon } from '../../icon/index';
const { create } = createComponent('Annex');
import { Progress } from 'ant-design-vue';

export default create({
  components: {
    [Icon.name]: Icon,
    [Progress.name as string]: Progress,
    [TooltipEllipsis.name]: TooltipEllipsis
  },
  emits: ['eyeClick', 'downloadFile', 'delFile'],
  props: AnnexProps,
  setup(props, { emit }) {
    const ns = useNamespace('annex');
    const leftIconType = ref('');
    const { fileName, itemKey, info } = props;

    leftIconType.value = handlePicture(fileName);

    watch(props, (v) => {
      leftIconType.value = handlePicture(v.fileName);
    });

    // 展示按钮点击
    const eyeClick = () => {
      emit('eyeClick', {
        fileName: props.fileName,
        itemKey: props.itemKey,
        info: props.info
      });
    };

    // 下载
    const downloadFile = () => {
      emit('downloadFile', {
        fileName: props.fileName,
        itemKey: props.itemKey,
        info: props.info
      });
    };

    // 删除
    const delFile = () => {
      emit('delFile', {
        fileName: props.fileName,
        itemKey: props.itemKey,
        info: props.info
      });
    };

    return {
      ns,
      leftIconType,
      eyeClick,
      downloadFile,
      delFile
    };
  }
});
</script>

<style scoped lang="scss">
:deep(.iflorens-ui-progress) {
  margin-bottom: 0px;
  height: 15px;
}
</style>
