<!--
 * @Author: v_yangyaru
 * @Date: 2024-10-08 09:14:33
 * @LastEditors: v_yangyaru
 * @LastEditTime: 2024-10-12 09:23:20
 * @FilePath: /iflorens-web-ui/src/packages/components/upload/src/uploadPrew.vue
 * @Description: 
-->
<template>
  <!-- <a-modal :open="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel"> -->
  <!-- <img alt="example" style="width: 100%" :src="previewImage" /> -->
  <div v-if="isShowImgPreview">
    <a-image
      :alt="previewTitle"
      :style="{ display: 'none' }"
      :preview="{
        visible,
        onVisibleChange: handleCancel
      }"
      :src="previewImage"
    />
  </div>
  <!-- </a-modal> -->
</template>
<script lang="ts">
import { ref, watch } from 'vue';
import type { UploadProps, UploadFile } from 'ant-design-vue';
import { Image } from 'ant-design-vue';
export default {
  props: {
    previewVisible: {
      type: Boolean,
      default: false
    },
    previewFile: {
      type: Object,
      default: () => ({})
    },
    isShowImgPreview: {
      type: Boolean,
      default: true
    }
  },
  components: {
    [Image.name]: Image
  },
  emits: ['close'],
  setup(props, { emit }) {
    const visible = ref<boolean>(false);
    const previewImage = ref('');
    const previewTitle = ref('');
    const handleCancel = () => {
      emit('close');
      previewImage.value = '';
      previewTitle.value = '';
      visible.value = false;
    };
    const getBase64 = (file: File) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    };
    const handlePreview = async (file: UploadFile) => {
      const a = file.originFileObj as File;
      file.preview = (await getBase64(a)) as string;
      previewImage.value = file.url || file.preview || '';
      previewTitle.value = file.name || '';
    };
    watch(
      () => props.previewVisible,
      (newVal, oldVal) => {
        if (newVal) {
          handlePreview(props.previewFile as UploadFile);
          visible.value = true;
        } else {
          visible.value = false;
        }
      },
      {
        immediate: true
      }
    );
    return {
      handlePreview,
      handleCancel,
      previewTitle,
      previewImage,
      visible
    };
  }
};
</script>
