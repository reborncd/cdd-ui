<template>
  <span :class="ns.b()">
    <fl-icon-button
      v-if="!slots['customize']"
      :icon="iconObj.icon"
      :iconStyle="iconObj.iconStyle"
      type="link"
      @click="exportClick"
    >
      {{ name || '' }}
    </fl-icon-button>
    <slot name="customize" :exportClick="exportClick" v-else></slot>
  </span>
</template>

<script lang="ts">
import { ref, h } from 'vue';
import createComponent from '../../../utils/create';
import { Icon } from '../../icon/index';
import { IconButton } from '../../icon-button';
import { useNamespace, useAttrs, useNotification } from '../../../hooks';
import { DataExportProps } from './data-export';
import { fileDownloadBlob } from '../../../utils/file';
import { uuid } from '../../../utils/util';

const { create } = createComponent('DataExport');

export default create({
  components: {
    [Icon.name]: Icon,
    [IconButton.name]: IconButton
  },
  props: DataExportProps,
  emits: ['btnClick', 'successAsyncExport', 'successTasksExports', 'errorAsyncExport', 'errorTasksExports'],
  setup(props, { emit, slots }) {
    const ns = useNamespace('data-export');
    const attrs = useAttrs();
    const { open, close } = useNotification();
    const { request, pollNum, isComNotification, requestFileId } = props;
    let isClick = ref<Boolean>(false);

    const openNotification = (key: string) => {
      open(key);
    };

    const tasksStatus = async (key: string, exportFileIds: string) => {
      let num = 1;
      const poll = async () => {
        try {
          // @ts-ignore
          let res: any = await request({
            url: `/iflorens-file/export/query?id=${exportFileIds}`,
            method: 'get'
          });
          num++;
          if (!res.success) {
            setTimeout(() => {
              poll();
            }, 1000);
            return;
          }
          if (res.data.exportStatus == 'success') {
            // @ts-ignore
            let fileRes = await request({
              url: `/iflorens-file/file/singleDownload?fileId=${res.data.fileId}`,
              method: 'get',
              responseType: 'blob',
              headers: {
                'Access-Control-Allow-Origin': '*'
              }
            });
            const { downFileName } = props;
            fileDownloadBlob(fileRes as Blob, downFileName || `${res.data.fileId}.xlsx`);
            if (isComNotification) {
              emit('successTasksExports', res.data);
              close(key);
            }
            return;
          }
          if (res.data.exportStatus == 'fail') {
            emit('errorTasksExports');
            close(key);
            return;
          }
          if (num >= pollNum) {
            if (isComNotification) {
              close(key);
            }
            emit('errorTasksExports');
            return;
          }
          if (res.data[0].taskStatus != 2) {
            setTimeout(() => {
              poll();
            }, 1000);
            return;
          }
        } catch (e) {
          setTimeout(() => {
            poll();
          }, 1000);
        }
      };

      setTimeout(() => {
        poll();
      }, 1000);
    };

    const exportClick = async (e: MouseEvent) => {
      emit('btnClick', e);
      if (isClick.value == true) {
        return;
      }
      isClick.value = true;
      try {
        // @ts-ignore
        let res = await props.requestFileId(props.requestFileParams);
        isClick.value = false;
        if (!res.success) {
          emit('errorAsyncExport', res);
          return;
        }
        const uid: string = uuid();
        emit('successAsyncExport', res.data);
        if (isComNotification) {
          openNotification(uid);
        }
        if(!res.data) {
          return;
        }
        tasksStatus(uid, res.data);
      } catch (e) {
        emit('errorAsyncExport', e);
        isClick.value = false;
      }
    };

    return {
      ns,
      attrs,
      exportClick,
      slots
    };
  }
});
</script>

<style scoped lang="scss"></style>
