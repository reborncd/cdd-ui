<template>
  <div :class="ns.b()">
    <a-row class="content-title">
      <a-col v-if="title" class="content-title-left" :class="colorMode==='darkBlue'?'content-title-left-darkBlue':''">{{ title }}</a-col>
      <a-col v-if="isShowCollectBtn&&colorMode!=='darkBlue'" class="content-title-icon">
        <a-tooltip :title="isCustomize ? (!iconBtnStatus ? tipAddText : tipRemoveText) : !isFavorite ? tipAddText : tipRemoveText
          ">
          <cdd-icon-button id="user-guide-target" @click="iconClick" :icon="isCustomize
            ? !iconBtnStatus
              ? startOutIcon.icon
              : starFilledIcon.icon
            : !isFavorite
              ? startOutIcon.icon
              : starFilledIcon.icon
            " :iconStyle="isCustomize
              ? !iconBtnStatus
                ? startOutIcon.iconStyle
                : starFilledIcon.iconStyle
              : !isFavorite
                ? startOutIcon.iconStyle
                : starFilledIcon.iconStyle
              " type="link" size="small">
          </cdd-icon-button>
        </a-tooltip>
      </a-col>
      <a-col>
        <slot></slot>
      </a-col>
      <i-user-guide id="myGuide" target="#user-guide-target" message="Click to add to My Favorites."
        storage-key="guide-key" position="bottom"></i-user-guide>
    </a-row>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, computed } from 'vue';
import createComponent from '../../../utils/create';
import { useNamespace } from '../../../hooks';
import { CollectProps } from './collect';
import { IconButton } from '../../icon-button';
import { useRoute } from 'vue-router';
const { create } = createComponent('Collect');
import { Row, Col, Tooltip } from 'ant-design-vue';


export default create({
  components: {
    [IconButton.name]: IconButton,
    [Row.name as string]: Row,
    [Col.name as string]: Col,
    [Tooltip.name as string]: Tooltip
  },
  props: CollectProps,
  emits: ['iconClick', 'delSuccess', 'addSuccess'],
  setup(props, { emit }) {
    const ns = useNamespace('collect');
    const isFavorite = ref(false);
    let isLading = ref(false);
    let favoriteList = ref<string[]>([]);
    const route = useRoute();

    const currentPath: string = props.path ? props.path : `${props.prefix}${route.path}`;

    const { request, host } = props;

    // 获取收藏过的
    const getFavoritesList = async () => {
      if (isLading.value) return;
      isLading.value = true;
      try {
        // @ts-ignore
        let res = await request.get(`${host}/iflorens-ram/api/v0/menu-favorites/List`);
        isLading.value = false;
        if (!res.success) {
          return;
        }
        favoriteList.value = res.data.menuPaths;
        if (favoriteList.value.includes(currentPath)) {
          isFavorite.value = true;
        } else {
          isFavorite.value = false;
          setTimeout(() => {
            const guide: any = document.getElementById('myGuide');
            guide.start()
          }, 1000);
        }
      } catch (e) {
        isLading.value = false;
      }
    };

    // 添加
    const addFavorite = async () => {
      if (isLading.value) return;
      isLading.value = true;
      try {
        // @ts-ignore
        let res = await request.get(`${host}/iflorens-ram/api/v0/menu-favorites/save-favorite?path=${currentPath}`);
        isLading.value = false;
        emit('addSuccess', res.data);
        if (!res.success) {
          return;
        }
        favoriteList.value = [...favoriteList.value, currentPath];
        if (favoriteList.value.includes(currentPath)) {
          isFavorite.value = true;
        } else {
          isFavorite.value = false;
        }
      } catch (e) {
        isLading.value = false;
      }
    };

    // 删除
    const delFavorite = async () => {
      if (isLading.value) return;
      isLading.value = true;
      try {
        // @ts-ignore
        let res = await request.get(`${host}/iflorens-ram/api/v0/menu-favorites/delete-favorite?path=${currentPath}`);
        isLading.value = false;
        emit('delSuccess', res.data);
        if (!res.success) {
          return;
        }
        favoriteList.value = favoriteList.value.filter((item) => item !== currentPath);
        if (favoriteList.value.includes(currentPath)) {
          isFavorite.value = true;
        } else {
          isFavorite.value = false;
        }
      } catch (e) {
        isLading.value = false;
      }
    };

    const iconClick = (event: MouseEvent) => {
      if (!props.isCustomize) {
        isFavorite.value ? delFavorite() : addFavorite();
      }
      emit('iconClick', props.isCustomize ? (props.iconBtnStatus ? 'del' : 'add') : isFavorite.value ? 'del' : 'add');
    };

    onMounted(() => {
      if (!props.isCustomize) {
        getFavoritesList();
      }
    });

    return {
      ns,
      iconClick,
      isFavorite
    };
  }
});
</script>
