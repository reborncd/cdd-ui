<!--
 * @Author: v_yangyaru
 * @Date: 2024-10-08 09:14:33
 * @LastEditors: yangyaru
 * @LastEditTime: 2024-12-09 14:01:35
 * @FilePath: /iflorens-web-ui/src/packages/components/upload/src/upload.vue
 * @Description: 
-->
<template>
  <div :class="ns.b()">
    <a-upload
      v-bind="attrs"
      @remove="removeFun"
      @preview="previewFileFun"
      @change="changeFun"
      @download="downloadFun"
      :progress="progress"
      :multiple="multiple"
      :beforeUpload="beforeUploadFun"
      :showUploadList="showUploadList"
    >
      <slot v-if="slots['default']"></slot>
      <div v-else class="upload-btn">
        <cdd-icon class="upload-icon" :type="iconObj.icon" :style="iconObj.iconStyle"></cdd-icon>
        <span>{{ name }}</span>
      </div>
      <slot v-if="slots['preview']" name="preview"></slot>
      <uploadPrew
        v-else
        :previewVisible="previewVisible"
        :previewFile="previewFileItem"
        :isShowImgPreview="isShowImgPreview"
        @close="previewVisible = false"
      />
      <slot v-if="slots['itemRender']" name="itemRender"></slot>
      <slot v-if="slots['iconRender']" name="iconRender"></slot>
      <slot v-if="slots['downloadIcon']" name="downloadIcon"></slot>
      <slot v-if="slots['removeIcon']" name="removeIcon"></slot>
    </a-upload>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import type { UploadFile } from 'ant-design-vue/es/upload/interface';
import type { UploadProps, UploadChangeParam } from 'ant-design-vue';
import createComponent from '../../../utils/create';
import { useNamespace, useAttrs } from '../../../hooks';
import { UploadPropsObj } from './upload';
import { Icon } from '../../icon';
import uploadPrew from './uploadPrew.vue';
import { Upload } from 'ant-design-vue';

const { create } = createComponent('Upload');
export default create({
  components: {
    [Icon.name]: Icon,
    uploadPrew,
    [Upload.name as string]: Upload
  },
  props: UploadPropsObj,
  emits: ['preview', 'remove', 'change', 'download', 'percent', 'error'],
  setup(props, { emit, slots }) {
    const attrs = useAttrs();
    console.log(attrs)
    const ns = useNamespace('upload');
    // 重写文件预览
    const previewFileFun = (file: UploadFile) => {
      console.log(file.type?.includes('image'), '--previewFileFun--');
      if (!file.type?.includes('image')) return;
      previewFileItem.value = file;
      previewVisible.value = true;
      emit('preview', file);
    };

    const beforeUploadFun: UploadProps['beforeUpload'] = (file: UploadFile) => {
      console.log('--beforeUploadFun--', file);
      const currentSize = file.size || 0;
      const defaultAllowSize = props.maxSize * 1024 * 1024;
      if (currentSize > defaultAllowSize) {
        emit('error', {
          message: 'The file size exceeds the limit',
          fileName: file.fileName || file.name,
          fileType: file.type,
          fileSize: file.size
        });
        return false;
      }
      if (attrs && typeof attrs.value.beforeUpload === 'function') {
        attrs.value.beforeUpload(file);
      }
    };
    const removeFun = (file: UploadFile) => {
      previewVisible.value = false;
      emit('remove', file);
    };

    const changeFun = (info: UploadChangeParam) => {
      emit('change', info);
    };

    const downloadFun = (file: UploadFile) => {
      emit('download', file);
    };

    const progress: UploadProps['progress'] = {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068'
      },
      strokeWidth: 3,
      format: (percent = 0) => {
        emit('percent', parseFloat(percent.toFixed(2)));
        return `${parseFloat(percent.toFixed(2))}%`;
      },
      class: 'cdd-progress'
    };

    const previewVisible = ref(false);
    const previewFileItem = ref<UploadFile>();
    return {
      ns,
      attrs,
      props,
      slots,
      progress,
      removeFun,
      previewFileFun,
      changeFun,
      downloadFun,
      beforeUploadFun,
      previewVisible,
      previewFileItem
    };
  }
});
</script>
