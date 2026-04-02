<template>
  <div
    :class="{
      [ns.b()]: true,
      'edit-table': editTableType
    }"
  >
    <vxe-grid
      v-bind="attrs"
      :cellStyle="{ verticalAlign: 'middle' }"
      auto-resize
      round
      keep-source
      ref="vxeGrid"
      :class="{
        'table-wrapper': true,
        'wavy-line': tableType == 'wavy-line',
        'solid-border': isBottomSolidBorder,
        'dark-blue-table': colorMode === 'darkBlue'
      }"
      @sort-change="onSortChange"
      @cell-click="onCellClick"
      @scroll="onScroll"
      @checkbox-change="checkboxChange"
    >
      <template #[item]="props" v-for="item in Object.keys($slots)" :key="item">
        <slot :name="item" v-bind="props"></slot>
      </template>
      <template #pager v-if="showPager">
        <div class="cdd-table-page" :class="{ 'cdd-table-page-deep-blue': pagerConfig.mode === 'darkBlue' }">
          <div>
            <slot name="table-page-left" v-if="$slots['table-page-left']"></slot>
          </div>

          <vxe-pager
            v-show="pagerConfig.total > 0 || pagerConfig.autoHidden === false"
            v-bind="pagerConfig"
            :class="{ 'dark-blue-pager': colorMode === 'darkBlue' }"
            @page-change="onPageChange"
          ></vxe-pager>
        </div>
      </template>
      <template #empty>
        <cdd-empty :description="description" type="noItem" :image="emptyImage"></cdd-empty>
      </template>
    </vxe-grid>
  </div>
</template>

<script lang="ts">
import { ref, watch, nextTick, onMounted, useAttrs } from 'vue';
import { VxeGridInstance, VxeGridEvents, VxePagerEvents } from 'vxe-table';
import createComponent from '../../../utils/create';
import { useNamespace } from '../../../hooks';
import { TableProps } from './table';
import { debounce } from '../../../utils/util';
import { Empty } from '../../empty/index';
const { create } = createComponent('Table');

export default create({
  props: TableProps,
  components: {
    [Empty.name]: Empty
  },
  emits: ['update:data', 'pageChange', 'sortChange', 'cellClick'],
  setup(props, { emit }) {
    const ns = useNamespace('table');
    const attrs = useAttrs();
    const vxeGrid = ref<VxeGridInstance | null>(null);
    const isScrollBottom = ref(false);
    const isScrollToTop = ref(false);
    const oldSumScrollHeight = ref(0);
    const scrollCount = ref(0);
    const vxeBodyColumn = ref('30px');
    // 初始化高度
    vxeBodyColumn.value = attrs && attrs.rowConfig && attrs.rowConfig.height ? `${attrs.rowConfig.height}px` : '30px';

    watch(
      () => attrs,
      (v) => {
        vxeBodyColumn.value = v && v.rowConfig && v.rowConfig.height ? `${v.rowConfig.height}px` : '30px';
      },
      { deep: true }
    );

    const onPageChange: VxePagerEvents.PageChange = (params) => {
      emit('pageChange', params);
    };

    const onSortChange: VxeGridEvents.SortChange = (params) => {
      emit('sortChange', params);
    };

    const onCellClick: VxeGridEvents.CellClick = (params) => {
      emit('cellClick', params);
    };
    const checkboxChange: VxeGridEvents.CellDblclick = (params) => {
      emit('checkboxChange', params);
    };
    const onScroll = debounce((e: any) => {
      // TODO
      if (e.isX || isScrollToTop.value || props.showPager) return;
      isScrollToTop.value = false;
      nextTick(() => {
        const $body = e?.$table?.$el?.querySelector('.vxe-table--body-wrapper');
        if ( !$body ) return
        const { scrollTop, clientHeight, scrollHeight } = $body;
        const threshold = scrollHeight * 0.9;

        if (scrollTop + clientHeight >= threshold) {
          if (oldSumScrollHeight.value === 0 || scrollHeight > oldSumScrollHeight.value) {
            emit('onScroll');
            scrollCount.value++;
            oldSumScrollHeight.value = scrollHeight;
          } else if (scrollHeight < oldSumScrollHeight.value) {
            oldSumScrollHeight.value = 0;
            isScrollBottom.value = false;
          }
        }
      });
    }, 10);
    const updatePagerTotal = () => {
      nextTick(() => {
        const pagerTotals = document.querySelectorAll('.vxe-pager--total');

        pagerTotals.forEach((pagerTotal) => {
          const text = pagerTotal.textContent || '';
          const match = text.match(/Total (\d+) items/);
          if (match) {
            pagerTotal.innerHTML = `Total <span style="font-weight: bold;">${match[1]}</span> items`;
          } else {
            console.log('No match found for:', text);
          }
        });
      });
    };
    // 可以添加更多自定义方法
    const reloadData = (data: any[]) => {
      if (vxeGrid.value) {
        vxeGrid.value.loadData(data);
      }
    };
    watch(
      [() => props.data, () => props.pagerConfig],
      ([newData, newPagerConfig], [oldData, oldPagerConfig]) => {
        if (newData !== oldData) {
          reloadData(newData);
          if (newData && newData.length > 0) {
            updatePagerTotal();
          }
        }

        if (newPagerConfig !== oldPagerConfig && newPagerConfig && newPagerConfig.total > 0) {
          updatePagerTotal();
        }
      },
      { deep: true, immediate: true }
    );
    onMounted(() => {
      // 初始更新
      if (props.pagerConfig && props.pagerConfig.total > 0) {
        updatePagerTotal();
      }
    });
    return {
      vxeBodyColumn,
      ns,
      attrs,
      vxeGrid,
      onPageChange,
      onSortChange,
      onCellClick,
      reloadData,
      onScroll,
      updatePagerTotal,
      checkboxChange
    };
  }
});
</script>

<style scoped lang="scss">
.table-wrapper {
  :deep(.vxe-body--column) {
    height: v-bind(vxeBodyColumn) !important;
  }
  :deep(.vxe-table--header) {
    --header-color: v-bind(headerTextColor);
    margin-top: 0;
    background: var(--cdd-col-background);
    .vxe-cell--title {
      font-weight: 700;
      color: var(--header-color);
    }
  }

  :deep(.vxe-table--body) {
    color: var(--cdd-col-maintext);
  }

  :deep(.vxe-table--body tbody tr.row--stripe) {
    background-color: var(--cdd-col-background-grey) !important;
  }

  :deep(.vxe-table--body tbody tr.row--hover) {
    background-color: #f1f6ff !important;
  }
  :deep() {
    .vxe-table .vxe-sort--desc-btn,
    .vxe-table .vxe-sort--asc-btn {
      color: var(--cdd-col-secondarytext-new);
    }
  }

  :deep(.vxe-table) {
    /**
    .vxe-cell.c--tooltip {
      justify-content: space-between;
    }
      **/

    .vxe-cell--checkbox .vxe-checkbox--icon:before {
      border-width: 1px;
    }
  }

  :deep(.vxe-table .vxe-sort--asc-btn.sort--active) {
    color: var(--cdd-col-fblue5);
  }

  :deep(.vxe-table .vxe-sort--desc-btn.sort--active) {
    color: var(--cdd-col-fblue5);
  }

  :deep(.vxe-pager) {
    height: 56px;
    font-family: Nunito;
    font-size: 14px;
    font-weight: 500;
    font-variation-settings: 'wght' 600;
    /* 功能色/主文本 */
    color: var(--cdd-col-maintext);

    .vxe-pager--total {
      &::after {
        content: attr(data-content);
        color: var(--cdd-col-fblue5);
        font-weight: bold;
      }
    }

    .vxe-pager--num-btn,
    .vxe-pager--next-btn {
      &:not(.is--disabled) {
        &.is--active {
          background-color: var(--cdd-col-background-grey);
          color: var(--cdd-col-fblue5);
          box-shadow: none;
        }

        &:hover {
          color: var(--cdd-col-fblue5);
        }

        &:focus {
          background-color: var(--cdd-col-background-grey);
          color: var(--cdd-col-fblue5);
          box-shadow: none;
        }
      }
    }
  }

  :deep(.vxe-select-option.is--selected) {
    color: var(--cdd-col-fblue5);
  }

  :deep(.vxe-select-option.is--hover) {
    background-color: var(--cdd-col-background-grey);
  }

  :deep(.vxe-select.is--active:not(.is--filter) > .vxe-input) {
    border-color: var(--cdd-col-fblue5) !important;
  }

  :deep(.vxe-input.is--active) {
    border-color: var(--cdd-col-fblue5) !important;
  }

  :deep(.vxe-select) {
    width: 120px !important;
  }

  :deep(.vxe-select > .vxe-input .vxe-input--inner) {
    font-family: Nunito;
    font-size: 14px;
    font-variation-settings: 'wght' 600;
    color: var(--cdd-col-maintext);
  }
}

:deep(.doc-content-document table) {
  margin-top: 0 !important;
}

:deep(.table-wrapper) {
  .vxe-table--render-default .vxe-table--body-wrapper table {
    margin-top: 0px;
  }

  .vxe-table--render-default .vxe-body--x-space {
    height: 0;
  }

  .vxe-table--render-default.border--none .vxe-table--header-wrapper {
    background-color: transparent !important;
  }

  tr {
    // color: rgba(0, 0, 0, 0.85) !important;
    background: var(--cdd-col-background) !important;
  }

  // .vxe-table--header {
  //   background: #fff important;
  //   color: rgba(0, 0, 0, 0.85) !important;
  //   font-weight: 700;
  // }

  tr.vxe-header--row {
    th {
      background: var(--cdd-col-background-grey) !important;
      border: 0 !important;
      font-size: 12px !important;

      .vxe-cell {
        // border-right: solid 1px rgb(217, 217, 217);
        border-right: none;
      }

      &:last-child {
        .vxe-cell {
          border-right: none;
        }
      }
    }

    th:first-child {
      border-radius: 8px 0 0 8px;
    }

    th:last-child {
      border-radius: 0 8px 8px 0;
    }
  }

  th {
    font-size: 14px;
    font-variation-settings: 'wght' 700;
    font-weight: bold;
  }

  td {
    padding: 8px 0 !important;
  }

  .vxe-table--header-border-line {
    // border-bottom: 1px solid #F0F0F0;
    border-bottom: 0;
  }

  .vxe-cell {
    padding: 0 12px;
    // height: 100%;
    max-height: revert !important;
  }

  .is--line {
    display: none;
  }
}

:deep(.wavy-line) {
  .vxe-table--render-default.border--default .vxe-body--column {
    background-image: none;
    border-bottom: 1px dashed var(--cdd-col-line) !important;
  }

  .vxe-table--render-default .vxe-body--x-space {
    height: 0;
  }

  .vxe-table--render-default.border--none .vxe-table--header-wrapper {
    background-color: transparent !important;
  }

  td {
    border-top: none;
    border-bottom: 1px dashed var(--cdd-col-line) !important;

    &:last-child {
      border-bottom: none;
    }
  }

  tr.vxe-header--row {
    th {
      .vxe-cell {
        border-right: none;
      }
    }
  }
}

:deep(.dark-blue-table) {
  background-color: transparent !important;
  .vxe-table--main-wrapper .vxe-table--header-wrapper {
    background-color: transparent !important;
  }
  .vxe-table--render-wrapper{
    background-color: transparent !important;
  }
  .vxe-table--body-wrapper{
    background-color: transparent !important;
  }
  .table-wrapper .vxe-table--header{
    background-color: transparent !important;
    color: #fff !important;
  }
  .vxe-header--row th{
    background-color: transparent !important;
    color: #fff !important;
  }
  .vxe-header--column{
    background-color: transparent !important;
    color: #fff !important;
  }
  tr.vxe-header--row .vxe-header--column{
    background-color: transparent !important;
    color: #fff !important;
  }
  .vxe-header--row{
    background-color: transparent !important;
    color: #fff !important;
  }
  .vxe-table--header .vxe-cell--title{
    color: #fff !important;
  }
  .vxe-table--render-default .vxe-table--border-line{
    border-width: 0 !important;
    border-color: transparent !important;
  }
  .vxe-table--header-border-line{
    border-width: 0 !important;
    border-color: transparent !important;
  }
  .vxe-table--header{
    background-color: transparent !important;
    color: #fff !important;
  }
  .vxe-table--body-wrapper {
    &::-webkit-scrollbar {
      background-color: transparent !important;
      height: 4px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #c1c1c1;
      border-radius: 99px;
    }
  }
}
:deep(.dark-blue-table.is--loading) {
  background: none;
  &:before{
    background: none !important;
  }
  .vxe-table--render-wrapper{
    background: none !important;
  }
  .vxe-table--body-wrapper{
    background: none !important;
  }
  .table-wrapper .vxe-table--header{
    background: none !important;
  }
  .vxe-header--column{
    background: none !important;
  }
  tr.vxe-header--row .vxe-header--column{
    background: none !important;
  }
  .vxe-header--row{
    background: none !important;
  }
  .vxe-table--render-default .vxe-table--border-line{
    background: none !important;
  }
  .vxe-table--header-border-line{
    background: none !important;
  }
  .vxe-table--header{
    background: none !important;
  }
  .vxe-loading{
    background: none !important;
  }
}

.table-cdd-empty {
  border: none;
  display: flex;
  justify-content: center;
}
:deep() {
  .vxe-cell--checkbox .vxe-checkbox--icon {
    margin-right: 12px;
    &::before {
      border: none;
    }
  }
  .vxe-table--render-default .vxe-cell--checkbox.is--indeterminate .vxe-checkbox--icon {
    color: var(--cdd-col-fblue5);
    &::before {
      color: var(--cdd-col-fblue5);
    }
  }
  .vxe-checkbox--icon .vxe-table-icon-checkbox-indeterminate-fill {
    &:hover {
      color: var(--cdd-col-fblue5);
    }
  }
  .vxe-table--render-default .vxe-cell--checkbox.is--checked .vxe-checkbox--icon {
    color: var(--cdd-col-fblue5);
    &:hover {
      color: var(--cdd-col-fblue5);
    }
  }
  .vxe-table--render-default .vxe-cell--checkbox .vxe-checkbox--icon {
    &:hover {
      color: var(--cdd-col-fblue5);
    }
  }
  .vxe-checkbox--label {
    color: var(--cdd-col-neutral1);
  }
}
:deep(.solid-border) {
  .vxe-body--row:last-child td.vxe-body--column {
    background-image: none;
    border-bottom: 1px solid var(--cdd-col-line) !important;
  }
}

:deep(.vxe-body--row) {
  .vxe-body--column .vxe-cell {
    padding: 0 6px !important;
  }
  & .vxe-body--column:nth-child(1) .vxe-cell {
    padding: 0 6px 0 12px !important;
  }
  & .vxe-body--column:last-child .vxe-cell {
    padding: 0 12px 0 6px !important;
  }
}
.edit-table {
  :deep(.table-wrapper td) {
    padding: 0 !important;
    height: 40px !important;
  }
  :deep(.vxe-body--row) {
    .vxe-body--column .vxe-cell {
      padding: 0 2px !important;
    }
    & .vxe-body--column:nth-child(1) .vxe-cell {
      padding: 0 2px 0 12px !important;
    }
    & .vxe-body--column:last-child .vxe-cell {
      padding: 0 12px 0 2px !important;
    }
  }
  :deep(.vxe-body--row) {
    .edit-table-vxe-cel {
      width: 100%;
      height: 32px;
      line-height: 32px;
    }
    .edit-table-vxe-cel-right {
      text-align: right;
    }
    .vxe-body--column .edit-table-vxe-cel {
      padding: 0 4px !important;
    }
    & .vxe-body--column:nth-child(1) .edit-table-vxe-cel {
      padding: 0 4px 0 12px !important;
    }
    & .vxe-body--column:last-child .edit-table-vxe-cel {
      padding: 0 12px 0 4px !important;
    }
  }
  :deep(.iflorens-ui-select-single) {
    width: 100%;
    height: 32px;
    line-height: 32px;
    .iflorens-ui-select-selector {
      padding: 0 3px;
    }
  }
  :deep(.iflorens-ui-input) {
    width: 100%;
    padding: 3px;
    height: 32px;
    line-height: 32px;
  }
  :deep(.iflorens-ui-picker) {
    width: 100%;
    padding: 0 3px;
    height: 32px;
    line-height: 32px;
  }
  :deep(.iflorens-ui-checkbox) {
    margin-left: 3px;
  }
  :deep(.vxe-cell--checkbox) {
    margin-left: 3px;
  }
}
:deep(.vxe-header--row) {
  .vxe-header--column {
    line-height: 40px !important;
    padding: 0 !important;
  }
  .vxe-header--column .vxe-cell {
    line-height: 40px !important;
    padding: 0 6px !important;
  }

  & .vxe-header--column:nth-child(1) .vxe-cell {
    padding: 0 6px 0 12px !important;
  }
  & .vxe-header--column:last-child .vxe-cell {
    padding: 0 12px 0 6px !important;
  }
  & .vxe-header--column:last-child .is--line {
    border: none !important;
    width: 0 !important;
    height: 0 !important;
  }
  & .vxe-cell--sort-vertical-layout {
    margin-left: 4px;
    height: auto;
  }
  & .vxe-cell--filter {
    margin-left: 4px;
  }
}
// :deep() {
//   &.vxe-header--column .vxe-resizable.is--line:before {
//     width: 0;
//   }
// }
:deep(.vxe-header--column) {
  .vxe-resizable {
    height: 22px;
    background: var(--cdd-col-neutral9);
    top: 50%;
    transform: translate(0, -50%);
    width: 1px;
    right: 0;
    &:hover {
      width: 5px;
      background: var(--cdd-col-fblue5);
    }
  }
  .is--line {
    display: block;
  }
}
.cdd-table-page-deep-blue {
  :deep(.vxe-pager) {
    .vxe-select
    .vxe-select--panel-wrapper {
      padding:2px;
      background-color: var(--cdd-col-fblue-dark)!important;
      color:#999EB6!important;
      .is--hover {
        // background-color: #E8F0FF !important;
        // color:#999EB6!important;
      }
      .is--selected {
        padding:0.6px 12px;
        border-radius:2px;
        background-color: #E8F0FF!important;
        color:rgba(0, 0, 0, 1)!important;
      }
    }
  }
  :deep(.vxe-select-option) {
    background-color: var(--cdd-col-fblue-dark) !important;
    color: #999EB6 !important;
  }
  :deep(.vxe-select--panel-wrapper){
    border: 0;
  }
}
.dark-blue-pager{
  background-color: transparent !important;
  color: #fff !important;
    :deep(.vxe-pager--prev-btn){
      background-color: transparent !important;
      color: #fff !important;
    }
    :deep(.vxe-pager--num-btn){
      background-color: transparent !important;
      color: #fff !important;
    }
    :deep(.vxe-pager--next-btn){
      background-color: transparent !important;
      color: #fff !important;
    }
    :deep(.vxe-pager--jump-prev){
      background-color: transparent !important;
      color: #fff !important;
    }
    :deep(.vxe-pager--jump-next){
      background-color: transparent !important;
      color: #fff !important;
    }
    :deep(.is--active){
      color: #5970bd !important;
    }
    :deep(.vxe-pager--sizes){
      background-color: transparent !important;
      color: #fff !important;
      border-radius: 4px !important;
      .vxe-input{
        background-color: transparent !important;
        color: #fff !important;
        border-radius: 4px !important;
      }
      .vxe-input--wrapper{
        background-color: transparent !important;
        color: #fff !important;
        border-radius: 4px !important;
        .vxe-input--inner{
          background-color: transparent !important;
          color: #fff !important;
          border-radius: 4px !important;
        }
      }
    }
  
}
</style>
