<template>
  <div :class="[ns.b(), isDragging ? 'no-select' : '',colorMode==='darkBlue'?'page-darkBlue':'']" ref="flPages">
    <div class="page-content">
      <div class="page-top">
        <fl-collect
          :isShowCollectBtn="isShowCollectBtn"
          class="page-collect"
          @addSuccess="handleCallBack"
          @delSuccess="handleCallBack"
          :title="title"
          :prefix="prefix"
          :path="routePath"
          :request="fetch"
          :colorMode="colorMode"
        >
          <slot name="collect-default"></slot>
        </fl-collect>
        <div class="page-top-right">
          <slot name="table-top-left"></slot>
          <template v-if="colorMode === 'darkBlue'">
            <a-tooltip placement="top" v-if="isShowFiltersBtn===true">
              <template #title>
                <span>{{ isShowSearch ? 'Hide Filters' : 'Display Filters' }}</span>
              </template>
              <a-button class="dark-blue-filters-btn" @click="filterBtnClick">
                <img style="width: 18px; height: 18px;margin-right: 4px;" src="../../../../../public/assets/images/sac-filter-icon.svg" />
                Filters
              </a-button>
            </a-tooltip>
            <!-- 表头设置 -->
            <a-tooltip placement="top" v-if="isShowSettingBtn">
              <template #title>
                <span>Column Setting</span>
              </template>
              <a-popover
                placement="bottom"
                title="Column Setting"
                :overlayClassName="{'dark-blue-column-setting': colorMode === 'darkBlue'}"
                trigger="click"
                :arrow="false"
                v-model:open="settingVisible"
                :getPopupContainer="(triggerNode) => triggerNode.parentNode.parentNode"
              >
                <template #content>
                  <div class="pages-down-ul" :style="{ maxHeight: tableHeight * 0.9 + 'px' }">
                    <a-checkbox-group
                      v-model:value="checkedList"
                      class="pages-down-checkbox-box"
                      @change="checkboxChange"
                    >
                      <draggable :list="headerOptions" @change="draggableChange" draggable=".draggable-item">
                        <div
                          class="li"
                          v-for="(item, index) in headerOptions"
                          :key="index"
                          :class="{
                            'draggable-item': headerDraggableDisabledArr.includes(item.title) ? false : true,
                            'is-active': headerOptions.includes(item.title),
                            'draggable-item-disabled': headerDisabled.includes(item.title) || (internalDisabledColumns&&internalDisabledColumns.includes(item.title))
                          }"
                        >
                          <a-checkbox
                            :value="item.title"
                            :disabled="headerDisabled.includes(item.title) || (internalDisabledColumns&&internalDisabledColumns.includes(item.title)) ? true : false"
                            >{{ item.title }}</a-checkbox
                          >
                          <fl-icon
                            v-if="!headerDraggableDisabledArr.includes(item.title)"
                            type="iflorens-drag-vertical"
                            :style="{
                              color: '#000',
                              fontSize: '14px'
                            }"
                          ></fl-icon>
                        </div>
                      </draggable>
                    </a-checkbox-group>
                  </div>
                </template>
                <fl-icon-button
                  class="page-button dark-blue-setting-btn"
                  icon="iflorens-Setting"
                  :iconStyle="{
                    color: 'rgba(62, 86, 167, 1.00)',
                    fontSize: '14px'
                  }"
                  type="link"
                >
                </fl-icon-button>
              </a-popover>
            </a-tooltip>
            <!-- 下载导出 -->
            <a-tooltip placement="top" v-if="isShowExportBtn">
              <template #title>
                <span>Export</span>
              </template>
              <fl-data-export
                class="dark-blue-export-btn"
                :request="fetch"
                type="primary"
                :downFileName="downFileName"
                :requestFileId="requestFileId"
                :pollNum="pollNum"
                :requestFileParams="requestFileParams"
                @btnClick="(e) => emit('btnClick', e)"
                @errorAsyncExport="(e) => emit('errorAsyncExport', e)"
                @errorTasksExports="() => emit('errorTasksExports')"
                >Export</fl-data-export
              >
            </a-tooltip>
          </template>
          <template v-else>
            <!-- 下载导出 -->
            <a-tooltip placement="top" v-if="isShowExportBtn">
              <template #title>
                <span>Export</span>
              </template>
              <fl-data-export
                :request="fetch"
                type="primary"
                :downFileName="downFileName"
                :requestFileId="requestFileId"
                :pollNum="pollNum"
                :requestFileParams="requestFileParams"
                @btnClick="(e) => emit('btnClick', e)"
                @errorAsyncExport="(e) => emit('errorAsyncExport', e)"
                @errorTasksExports="() => emit('errorTasksExports')"
                >Export</fl-data-export
              >
            </a-tooltip>
            <!-- 列宽 -->
            <a-tooltip placement="top" v-if="isShowDensityBtn">
              <template #title>
                <span>Density</span>
              </template>
              <a-popover
                placement="bottom"
                title="Density"
                trigger="click"
                :arrow="false"
                v-model:open="densityVisible"
                :getPopupContainer="(triggerNode) => triggerNode.parentNode.parentNode"
              >
                <template #content>
                  <div class="pages-down-ul">
                    <div
                      class="li"
                      v-for="(item, index) in densityOptions"
                      :key="index"
                      :class="{
                        'is-active': densityValue == item.value
                      }"
                      @click="densityClick(index)"
                      >{{ item.title }}</div
                    >
                  </div>
                </template>
                <fl-icon-button
                  class="page-button"
                  icon="iflorens-ColumnHeightOutlined"
                  :iconStyle="{
                    color: 'rgba(62, 86, 167, 1.00)',
                    fontSize: '14px'
                  }"
                  type="link"
                >
                </fl-icon-button>
              </a-popover>
            </a-tooltip>
            <!-- 是否显示搜索栏 -->
            <a-tooltip placement="top" v-if="isShowFiltersBtn">
              <template #title>
                <span>{{ isShowSearch ? 'Hide Filters' : 'Display Filters' }}</span>
              </template>
              <fl-icon-button
                class="page-button"
                icon="iflorens-Filter"
                :iconStyle="{
                  color: 'rgba(62, 86, 167, 1.00)',
                  fontSize: '14px'
                }"
                type="link"
                @click="filterBtnClick"
              >
              </fl-icon-button>
            </a-tooltip>
            <a-tooltip placement="top" v-if="isShowSacFiltersBtn===true">
              <template #title>
                <span>{{ isShowSearch ? 'Hide Filters' : 'Display Filters' }}</span>
              </template>
              <a-button class="sac-filters-btn" @click="filterBtnClick">
                <img style="width: 18px; height: 18px;margin-right: 4px;" src="../../../../../public/assets/images/sac-filter-icon.svg" />
                Filters
              </a-button>
            </a-tooltip>
            <!-- 表头设置 -->
            <a-tooltip placement="top" v-if="isShowSettingBtn">
              <template #title>
                <span>Column Setting</span>
              </template>
              <a-popover
                placement="bottom"
                title="Column Setting"
                :overlayClassName="{'dark-blue-column-setting': colorMode === 'darkBlue'}"
                trigger="click"
                :arrow="false"
                v-model:open="settingVisible"
                :getPopupContainer="(triggerNode) => triggerNode.parentNode.parentNode"
              >
                <template #content>
                  <div class="pages-down-ul" :style="{ maxHeight: tableHeight * 0.9 + 'px' }">
                    <a-checkbox-group
                      v-model:value="checkedList"
                      class="pages-down-checkbox-box"
                      @change="checkboxChange"
                    >
                      <draggable :list="headerOptions" @change="draggableChange" draggable=".draggable-item">
                        <div
                          class="li"
                          v-for="(item, index) in headerOptions"
                          :key="index"
                          :class="{
                            'draggable-item': headerDraggableDisabledArr.includes(item.title) ? false : true,
                            'is-active': headerOptions.includes(item.title)
                          }"
                        >
                          <a-checkbox
                            :value="item.title"
                            :disabled="headerDisabled.includes(item.title) ? true : false"
                            >{{ item.title }}</a-checkbox
                          >
                          <fl-icon
                            v-if="!headerDraggableDisabledArr.includes(item.title)"
                            type="iflorens-drag-vertical"
                            :style="{
                              color: '#000',
                              fontSize: '14px'
                            }"
                          ></fl-icon>
                        </div>
                      </draggable>
                    </a-checkbox-group>
                  </div>
                </template>
                <fl-icon-button
                  class="page-button"
                  icon="iflorens-Setting"
                  :iconStyle="{
                    color: 'rgba(62, 86, 167, 1.00)',
                    fontSize: '14px'
                  }"
                  type="link"
                >
                </fl-icon-button>
              </a-popover>
            </a-tooltip>
          </template>
          <slot name="table-top-right"></slot>
        </div>
      </div>
      <div class="page-table" :class="{'page-table-dark-blue': colorMode === 'darkBlue'}">
        <slot name="page-table-customize" v-if="$slots['page-table-customize']"></slot>
        <fl-table
          ref="tableRef"
          v-bind="gridOptions"
          v-on="gridEvents"
          :height="tableHeight"
          :pagerConfig="gridOptions.pagerConfig"
          :editTableType="editTableType"
          :colorMode="colorMode"
          @pageChange="onPageChange"
        >
          <template v-for="slotName in Object.keys($slots)" #[slotName]="props">
            <slot :name="slotName" v-bind="props"></slot>
          </template>
        </fl-table>
      </div>
      <slot name="page-bottom"></slot>
    </div>
    <div class="page-search" v-show="isShowSearchForm && isShowSearch" :style="{ width: containerWidth + 'px' }">
      <fl-search
        :form="form"
        type="list"
        :fetch="fetch"
        :hideSaveSearchSelect="hideSaveSearchSelect"
        :dropdownWidth="dropdownWidth"
        :defaultActiveFirstOption="defaultActiveFirstOption"
        :formSaveParam="formSaveParam"
        :options="options"
        :label-col="{ span: 24 }"
        :initSearch="initSearch"
        :searchInitForm="searchInitForm"
        :searchCondition="searchCondition"
        :isShowKeyWordInput="isShowKeyWordInput"
        :isShowSaveSearch="isShowSaveSearch"
        :isShowDown="isShowDown"
        :searchText="searchText"
        :colorMode="colorMode"
        @search="onSearch"
        @reset="resetForm"
        @delete="onDelete"
        @refresh="emit('refresh')"
        @change="(value) => emit('change', value)"
      >
        <template #form-tips>
          <slot name="form-tips"></slot>
        </template>
        <template #form-bottom>
          <slot name="form-bottom"></slot>
        </template>
      </fl-search>
      <div class="drag-handle" ref="dragRef" @mousedown="startResize"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, onUnmounted, computed, nextTick } from 'vue';
import createComponent from '../../../utils/create';
import { useNamespace } from '../../../hooks';
import { Collect } from '../../collect/index';
import { PagesProps, DraggableMoved } from './pages';
import { DataExport } from '../../data-export/index';
import { IconButton } from '../../icon-button';
import { Icon } from '../../icon/index';
import { Tooltip, Popover, Checkbox, CheckboxGroup } from 'ant-design-vue';
// https://www.itxst.com/vue-draggable-next/tutorial.html
import { VueDraggableNext } from 'vue-draggable-next';
const { create } = createComponent('Pages');
import { Table } from '../../table';
import { Search } from '../../search';
import { Anchor } from '../../anchor';

export default create({
  components: {
    [Anchor.name]: Anchor,
    [Collect.name]: Collect,
    [DataExport.name]: DataExport,
    [IconButton.name]: IconButton,
    [Icon.name]: Icon,
    draggable: VueDraggableNext,
    [Tooltip.name as string]: Tooltip,
    [Popover.name as string]: Popover,
    [Checkbox.name as string]: Checkbox,
    [CheckboxGroup.name as string]: CheckboxGroup,
    [Table.name]: Table,
    [Search.name]: Search
  },
  props: PagesProps,
  emits: [
    'changeLineHeight',
    'dragableChange',
    'tableFieldChange',
    'search',
    'reset',
    'update:form',
    'update:gridOptions',
    'update:tableColumns',
    'pageChange',
    'delete',
    'change',
    'handleCollectBack',
    'btnClick',
    'errorAsyncExport',
    'errorTasksExports'
  ],
  setup(props, { emit, expose, slots }) {
    let tableHeight = ref(0);
    const flPages = ref(null);
    const ns = useNamespace('pages');
    // 头部行高
    const densityValue = ref<string | number | undefined>(40);
    const densityVisible = ref<boolean>(false);
    const densityOptions = ref([
      {
        title: 'Compact',
        value: 32
      },
      {
        title: 'Default',
        value: 40
      },
      {
        title: 'Roomy',
        value: 48
      }
    ]);
    const densityClick = (index: number) => {
      densityValue.value = densityOptions.value[index].value;
      densityVisible.value = false;
      const tableConfig = { ...props.gridOptions };
      tableConfig.rowConfig.height = densityValue.value;
      emit('update:gridOptions', tableConfig);
      // TODO 设置表格行高
      emit('changeLineHeight', densityValue.value);
    };
    const isShowSearch = ref(true);
    const filterBtnClick = () => {
      isShowSearch.value = !isShowSearch.value;
    };
    // 表格设置
    const settingVisible = ref<boolean>(false);
    const headerValues = ref<string[]>(['Roomy', 'Compact', 'Default']);
    const headerOptions = computed(() => {
      let headerOptions = props.tableColumns.filter((it: any) => it.title);
      return headerOptions;
    });
    const tableFields = props.gridOptions?.columns?.map((it: any) => it.title);
    const checkedList = ref(headerOptions.value?.map((it: any) => it.title)?.filter((it) => tableFields.includes(it)));
    // 保存上一次的选中状态，用于防止所有关键列被取消勾选
    const previousCheckedList = ref([...checkedList.value]);
    // 内部禁用列跟踪变量
    const internalDisabledColumns = ref<string[]>([]);
    const checkboxChange = () => {
      if(props.colorMode === 'darkBlue'&&props.mktNpInquiryDetail) {
        const keyColumns = ['Cust. Group', 'Inquiry Date', 'Inquiry Month', 'KAM', 'EQP Type'];
        // 检查当前操作是否会导致所有关键列被取消勾选
        const remainingKeyColumns = keyColumns.filter(col => checkedList.value.includes(col));
        if (remainingKeyColumns.length === 0) {
          // 如果所有关键列都被取消勾选，恢复到之前的状态
          checkedList.value = [...previousCheckedList.value];
          return;
        }

        const allKeyColumnsChecked = remainingKeyColumns.length === keyColumns.length;

        if (!allKeyColumnsChecked) {
          // 有任何一个关键列未勾选：移除Remarks的勾选状态，并禁用它
          const remarkIndex = checkedList.value.findIndex(it => it === 'Remarks');
          if (remarkIndex > -1) {
            checkedList.value.splice(remarkIndex, 1);
          }
          if (!internalDisabledColumns.value.includes('Remarks')) {
            internalDisabledColumns.value.push('Remarks');
          }
        } else {
          // 所有关键列都勾选：取消禁用Remarks，允许用户自由控制其勾选状态
          // 只在第一次满足条件且Remarks未被勾选时自动勾选，之后让用户自由控制
          const wasDisabled = internalDisabledColumns.value.includes('Remarks');
          // 取消禁用Remarks
          const remarkDisabledIndex = internalDisabledColumns.value.findIndex(it => it === 'Remarks');
          if (remarkDisabledIndex > -1) {
            internalDisabledColumns.value.splice(remarkDisabledIndex, 1);
          }
          // 只有在从禁用状态变为启用状态时才自动勾选Remarks
          if (wasDisabled && !checkedList.value.includes('Remarks')) {
            checkedList.value.push('Remarks');
          }
        }
      }
      const gridOptions = { ...props.gridOptions };
      const filterColumns = headerOptions.value?.filter((it) => checkedList.value.includes(it.title));
      gridOptions.columns = filterColumns;
      emit('update:gridOptions', gridOptions);
      emit('update:tableColumns', headerOptions.value);
      emit('tableFieldChange', filterColumns);
      // 计算所有未勾选的列
      if(props.colorMode === 'darkBlue'&&props.mktNpInquiryDetail){
        const allColumnTitles = headerOptions.value?.map((it: any) => it.title) || [];
        const uncheckedColumns = allColumnTitles.filter((title: string) => !checkedList.value.includes(title));
        emit('settingColumnsChange', uncheckedColumns);
      }
      if(props.colorMode === 'darkBlue'&&props.mktNpInquiryDetail){
        // 更新上一次的选中状态，用于下一次操作
        previousCheckedList.value = [...checkedList.value];
      }
    };
    // 拖拽后 change 然后改变 header
    const draggableChange = (e: DraggableMoved) => {
      // 拖拽完成 改变表格的columns
      const gridColumns = { ...props.gridOptions };
      gridColumns.columns = headerOptions.value.filter((it) => checkedList.value.includes(it.title));
      emit('update:gridOptions', gridColumns);
      emit('update:tableColumns', headerOptions.value);
      emit('dragableChange', checkedList.value, headerOptions.value);
      if(props.colorMode === 'darkBlue'&&props.mktNpInquiryDetail){
        // 更新上一次的选中状态，用于下一次操作
        previousCheckedList.value = [...checkedList.value];
      }
    };

    const containerWidth = ref(props.searchWidth); // 初始宽度
    const isDragging = ref(false);
    let initialX = 0;
    let startWidth = 0;

    const startResize = (event: MouseEvent) => {
      isDragging.value = true;
      initialX = event.clientX;
      startWidth = containerWidth.value;
      document.addEventListener('mousemove', resize);
      document.addEventListener('mouseup', stopResize);
    };
    const resize = (event: MouseEvent) => {
      if (!isDragging.value) return;
      const delta = initialX - event.clientX;
      let newWidth = startWidth + delta;
      if (newWidth >= props.searchWidth && newWidth <= 400) {
        requestAnimationFrame(() => {
          containerWidth.value = newWidth;
        });
      }
    };

    const stopResize = () => {
      isDragging.value = false;
      document.removeEventListener('mousemove', resize);
      document.removeEventListener('mouseup', stopResize);
    };
    const dragRef = ref(null);
    const onSearch = async (value: any, type?: string) => {
      emit('search', value, type);
    };
    const resetForm = () => {
      emit('reset');
    };
    const onPageChange = (params: any) => {
      emit('pageChange', params);
    };
    const onDelete = (i: number, item: any) => {
      emit('delete', i, item);
    };
    const handleCallBack = (data: any) => {
      emit('handleCollectBack', data);
    };
    const setTableHeight = () => {
      if (props.gridOptions.height) {
        tableHeight.value = props.gridOptions.height;
      } else {
        tableHeight.value = flPages.value.clientHeight - 73 - props.tableHeightOffset;
      }
    };
    // 组件挂载时添加鼠标离开窗口时停止调整大小
    onMounted(() => {
      setTableHeight();
      window.addEventListener('mouseleave', stopResize);
      window.addEventListener('resize', setTableHeight);
    });
    // 组件卸载时移除监听器
    onUnmounted(() => {
      window.removeEventListener('mouseleave', stopResize);
    });

    const tableRef = ref();
    const getTableRef = () => {
      return tableRef.value;
    };
    expose({
      filterBtnClick,
      getTableRef
    });
    return {
      ns,
      tableHeight,
      flPages,
      emit,
      densityOptions,
      densityClick,
      densityValue,
      densityVisible,
      isShowSearch,
      containerWidth,
      dragRef,
      isDragging,
      checkedList,
      startResize,
      filterBtnClick,
      settingVisible,
      headerOptions,
      headerValues,
      draggableChange,
      checkboxChange,
      onSearch,
      resetForm,
      onPageChange,
      onDelete,
      handleCallBack,
      slots,
      tableRef,
      getTableRef
    };
  }
});
</script>

<style lang="scss" scoped>
:deep(.fl-dropdown) {
  width: auto;
}
.resize-handle {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 1px;
  cursor: ew-resize;
  background: var(--fl-col-neutral9);
  &:hover {
    width: 5px;
    background: red;
  }
}
/* 禁用文本选择 */
.no-select {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}
:deep(.vxe-table--render-default) {
  .vxe-table--resizable-bar:before {
    background: var(--fl-col-fblue5);
  }
}
:deep(.vxe-header--column) {
  .vxe-resizable {
    height: 22px;
    background: var(--fl-col-neutral9);
    top: 50%;
    transform: translate(0, -50%);
    width: 1px;
    right: 0;
    &:hover {
      width: 5px;
      background: var(--fl-col-fblue5);
    }
  }
  .is--line {
    display: block;
  }
}
.page-table {
  :deep(.table-wrapper) {
    td {
      padding: 0 !important;
    }
  }
  :deep(.fl-table) {
    height: 100%;
  }
  :deep(.vxe-grid) {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  :deep(.vxe-grid .vxe-grid--table-container) {
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  :deep(.vxe-grid .vxe-grid--table-wrapper) {
    display: flex;
    flex-direction: column;
    padding-bottom: 10px;
  }
  :deep(.vxe-table--render-default) {
    flex: 1;
  }
}
.page-table-dark-blue{
  background-color: transparent !important;
}
:deep(.iflorens-ui-checkbox-disabled + span) {
  color: rgba(0, 0, 0, 1);
}
.page-darkBlue{
  background-color: transparent !important;
  .page-content{
    background-color: transparent !important;
    color: #FFFFFF;
    .page-top{
      background-color: transparent !important;
      color: #FFFFFF;
      border-bottom: 0;
    }
  }
}
:deep(){
  .dark-blue-column-setting{
    .iflorens-ui-popover-inner{
      background: #09215C !important;
      color: #FFFFFF !important;
      .iflorens-ui-popover-title{
        color: #fff !important;
      }
      .iflorens-ui-popover-inner-content{
        color: #FFFFFF !important;
      }
      .iflorens-ui-checkbox-group{
        color: #FFFFFF !important;
      }
      .iflorens-ui-checkbox-wrapper{
        color: #FFFFFF !important;
      }
      .li{
        // margin-top: 2px !important;
        margin-bottom: 2px !important;
        border-bottom: 1px dashed #D9D9D9 !important;
        border-bottom-left-radius: 0 !important;
        border-bottom-right-radius: 0 !important;
        .iflorens-ui-checkbox-wrapper{
          color: #fff !important;
        }
        .iflorens-ui-checkbox-wrapper-disabled{
          color: #fff !important;
          span{
            color: #fff !important;
          }
        }
      }
      .draggable-item-disabled{
        .iflorens-ui-checkbox-wrapper{
          .iflorens-ui-checkbox{
            .iflorens-ui-checkbox-inner{
              background: #F5F5F5 !important;
              &::after{
                border-color: #000 !important;
              }
            }
          }
        }
      }
      .li:hover{
        height: 32px !important;
        border-bottom-left-radius: 4px !important;
        border-bottom-right-radius: 4px !important;
        border-color: #D9D9D9 !important;
        .iflorens-ui-checkbox-wrapper{
          color: #09215C !important;
        }
        .iflorens-ui-checkbox-wrapper-disabled{
          color: #09215C !important;
          span{
            color: #09215C !important;
          }
        }
      }
      .iflorens-ui-checkbox-checked .iflorens-ui-checkbox-inner{
        background: #3E54AD !important;
        border-color: #D9D9D9 !important;
      }
    }
  }
}
</style>
