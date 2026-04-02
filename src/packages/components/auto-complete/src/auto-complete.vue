<template>
  <div :class="ns.b()">
    <a-auto-complete
      v-bind="attrs"
      :options="options"
      :value="modelValue"
      :dropdown-match-select-width="props.customeRender?false:dropdownMatchSelectWidth"
      :popup-className="`${popupClassName} ${customClassName} ${uniqueId} ${props.customeRender?'customeRender':''} ${paginationConfig.total?'showPage':''} ${isLoading?'isLoading':''} ${disabledLoadMore?'disabledLoadMore':''} ${showSticky?'showSticky':''}${colorMode==='darkBlue'?'darkBlueClass':''}`"
      :style="autoCompleteStyle"
      :defaultActiveFirstOption="computedDefaultActiveFirstOption"
      @search="handleSearch"
      @change="onChange"
      @clear="onClear"
      @select="onSelect"
      @focus="onFocus"
      @blur="onBlur"
    >
      <!-- :filter-option="filterOption" -->
      <a-input :maxlength="maxLength > 0 ? maxLength : null" style="padding: 0 11px" />
      <template #option="item">
        <template v-if="item.options">
          <div class="dropdown-head">
            <div class="header">
              <div class="header-page total" v-if="isShowPage && paginationConfig.total">
                <span v-if="item.options.length">
                  Total {{ paginationConfig.total }} records. From {{ currentPageRecord }} to {{ currentPageTotalRecord }}
                </span>
                <span>
                  <a-button type="link" :disabled="paginationConfig.currentPage == 1" @click="onPageChange('decrease')">
                    <LeftOutlined />
                  </a-button>
                   <a-button type="link" :disabled="paginationConfig.currentPage == totalPageNo" @click="onPageChange('increase')">
                    <RightOutlined />
                  </a-button>
                </span>
              </div>
              <div class="header-title">
                <span
                  v-for="items in columns"
                  :key="items.dataIndex"
                  :style="{ width: items.width || 100 / tableColumns.length + '%' }"
                >
                  <a-tooltip placement="topLeft">
                    <template #title>{{ items.title }}</template>
                    {{ items.title }}
                  </a-tooltip>
                </span>
              </div>
            </div>
          </div>
          <cdd-empty v-if="!item.options.length" description="No Data" />
        </template>
        <template v-else>
          <div class="header-title options-item" v-if="tableColumns.length">
            <span
              v-for="filed in tableColumns"
              :key="filed"
              :style="{ width: filed.width || 100 / tableColumns.length + '%' }"
              @click="onSelect(item[tableColumns[0].dataIndex])"
            >
              <a-tooltip placement="topLeft">
                <template #title>{{ filterText(item[filed.dataIndex]) }}</template>
                {{ filterText(item[filed.dataIndex]) }}
              </a-tooltip>
            </span>
          </div>
          <template v-else>
            {{ item[attrs?.fieldNames?.label || attrs?.optionLabelProp ]  || item.label || item.value }}
          </template>
        </template>
      </template>
    </a-auto-complete>
  </div>
</template>

<script lang="ts">
import createComponent from '../../../utils/create';
import { useNamespace, useAttrs } from '../../../hooks';
const { create } = createComponent('AutoComplete');
import { autoCompleteProps } from './auto-complete';
import { debounce } from '../../../utils/util';
import { computed, ref } from 'vue';
import { Empty } from '../../empty';
import { AutoComplete, Tooltip, Input, Button } from 'ant-design-vue';
import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue';
export default create({
  props: autoCompleteProps,
  components: {
    [Empty.name]: Empty,
    [AutoComplete.name as string]: AutoComplete,
    [Tooltip.name as string]: Tooltip,
    [Button.name as string]: Button,
    LeftOutlined,
    RightOutlined,
    [Input.name as string]: Input
  },
  emits: ['update:modelValue', 'select', 'change', 'search', 'clear', 'focus', 'blur', 'loadmore'],
  setup(props, { emit, slots }) {
    const ns = useNamespace('auto-complete');
    const attrs = useAttrs();
    const customClassName = ref('custom-autocomplete-popup');
    const eleWidth = ref('70px');
    const uniqueId = ref((Math.random() * 1000).toString());
    // 下拉选择
    const onSelect = (value: string, option:any) => {
      console.log(value, 'value');
      emit('update:modelValue', value);
      emit('select', value, option);
    };
    // 搜索
    const handleSearch = debounce((value: string) => {
      emit('search', value);
    }, props.delay);
    const onChange = (value: string) => {
      console.log(value, 'onChange-value');
      emit('update:modelValue', value);
      emit('change', value);
    };
    // 清空
    const onClear = () => {
      emit('update:modelValue', '');
      emit('clear');
    };
    // 聚焦
    const onFocus = (e: MouseEvent) => {
      if (typeof props.dropdownMatchSelectWidth === 'number') {
        document
          .getElementsByClassName(uniqueId.value)[0]
          ?.setAttribute('style', `width:${props.dropdownMatchSelectWidth}px`);
      }
      emit('focus', e);
    };
    const onBlur = (e: MouseEvent) => {
      emit('blur', e);
    };

    // 总页码
    const totalPageNo = computed(() => Math.ceil(props.paginationConfig.total / props.paginationConfig.pageSize));
    const currentPageRecord = computed(() => {
      const { total, currentPage, pageSize } = props.paginationConfig;
      return total ? (currentPage - 1) * pageSize + 1 : 0;
    });

    // 当前页数据量
    const currentPageTotalRecord = computed(() => {
      const totalRecord = props.paginationConfig.pageSize * props.paginationConfig.currentPage;
      const total = props.paginationConfig.total;
      return totalRecord > total ? total : totalRecord;
    });

    // 切换分页
    const onPageChange = (type: string) => {
      let pageConfig = JSON.parse(JSON.stringify(props.paginationConfig));
      const { currentPage } = pageConfig;
      console.log(currentPage,'currentPage');
      console.log(totalPageNo.value,'totalPageNo.value');
      if (type === 'decrease') {
        // 往前翻页
        if (currentPage === 1) return;
        pageConfig.currentPage--;
      } else {
        // 往后翻页
        if (currentPage == totalPageNo.value) return;
        pageConfig.currentPage++;
      }
      emit('pageChange', pageConfig.currentPage);
    };

    const tableColumns = computed(() => {
      return props.columns || [];
    });

    const showSticky = computed(() => {
      if ( tableColumns.length ) {
        return true
      }
      return false
    });

    const filterText = (text: string) => {
      return text !== '' && text !== ' ' && text !== null ? text : '-';
    };

    // 过滤 input 输入框前后空格
  const filterOption = (input: string, option: { value: string }) => {
    return option.value.indexOf(input.trim()) >= 0;
  };

  const computedDefaultActiveFirstOption = computed(() => {
    const mode = attrs.value?.mode;
    const userValue = props.defaultActiveFirstOption;

    // 如果用户传递了明确的值（true 或 false），使用用户的值
    if (userValue !== undefined) {
      return userValue;
    }

    // 用户没有传递值，使用默认逻辑
    if (mode === 'multiple' || mode === 'tags') {
      // 多选模式默认 false
      return false;
    }
    // 单选模式默认 true
    return true;
  });

  return {
      ns,
      eleWidth,
      attrs,
      customClassName,
      slots,
      props,
      tableColumns,
      onSelect,
      onChange,
      handleSearch,
      onClear,
      onFocus,
      onBlur,
      filterText,
      filterOption,
      totalPageNo,
      currentPageRecord,
      currentPageTotalRecord,
      onPageChange,
      showSticky,
      computedDefaultActiveFirstOption,
      uniqueId
    };
  }
});
</script>
<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  font-size: 12px;
  border-bottom: 1px solid var(--cdd-col-line);
  .header-page {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background: #fff;
  }
  .header-title {
    display: flex;
    background: #ededed;
    border-radius: 4px;
    span {
      font-weight: bold;
      color: var(--cdd-col-secondarytext-new);
      margin: 0;
    }
  }
}
.option-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header-title,
.option-fields {
  width: 100%;
  padding: 0 6px;
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  span {
    // flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-right: 5px;
    display: inline-block;
    span {
      width: 100%;
      display: block;
    }
    &:last-child {
      margin: 0;
    }
  }
}
.option-fields {
  span {
    font-size: 14px;
  }
}
.options-item {
  span {
    font-size: 12px;
  }
}
:deep(.iflorens-ui-select-item) {
  padding: 0px 0 !important;
}
:deep(.iflorens-ui-select-dropdown .iflorens-ui-select-item-option) {
  padding: 0px 0 !important;
}
</style>
<style lang="scss">
@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}
.custom-autocomplete-popup.isLoading.customeRender {
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2;
    background: rgba(255, 255, 255, 0.8);
  }
  &::after {
    font-family: "iconfont" !important;
    content: '\e797';
    font-size: 20px;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    animation: rotate 1s linear infinite;
	  color: var(--cdd-col-blue5);
  }
}
.custom-autocomplete-popup {
  .rc-virtual-list-holder {
      max-height: 320px !important;
      .rc-virtual-list-holder-inner {
        .iflorens-ui-select-item.iflorens-ui-select-item-group:hover,
        .iflorens-ui-select-item.iflorens-ui-select-item-group {
          background: #fff !important;
          min-height: unset !important;
        }
      }
  }
  &.customeRender {
    &.showPage {
      .rc-virtual-list-holder {
        max-height: 396px !important;
        &>div {
          height: 100% !important;
        }
      }
    }
    .rc-virtual-list-holder {
      max-height: 363px !important;
      &>div {
        height: 100% !important;
      }
    }
    .rc-virtual-list-scrollbar.rc-virtual-list-scrollbar-show {
      display: none !important;
    }
    .iflorens-ui-select-item.iflorens-ui-select-item-group {
      display: block;
    }
    .iflorens-ui-select-item {
      min-height: 32px;
      font-size: 12px;
      padding: 0 4px;
      line-height: 32px;
      border-radius: unset;
      border-bottom: 1px dashed var(--cdd-col-line);
    }
  }
  .iflorens-ui-select-item.iflorens-ui-select-item-group {
    display: none;
  }
  .iflorens-ui-select-item {
    min-height: 32px;
    font-size: 12px;
    padding: 0 4px;
    line-height: 32px;
    border-radius: unset;
    // &:first-child {
    //   border: none;
    //   padding: 0 4px;
    //   position: sticky;
    //   top: 0;
    //   left: 0;
    //   background: var(--cdd-col-background-grey);;
    //   z-index: 1;
    //   width: 100%;
    //   .header-title {
    //     padding-left: 10px;
    //   }
    // }
  }
}
.custom-autocomplete-popup .rc-virtual-list .rc-virtual-list-holder .rc-virtual-list-holder-inner{
  .iflorens-ui-select-item.iflorens-ui-select-item-group {
      border: none;
      padding: 0;
      position: sticky;
      top: 0;
      left: 0;
      // background: #ededed !important;
      z-index: 1;
      width: 100%;
      .header-title {
        padding-left: 10px;
      }
  }
}
.darkBlueClass {
  background-color: transparent !important;
  .rc-virtual-list .rc-virtual-list-holder .rc-virtual-list-holder-inner{
  .iflorens-ui-select-item.iflorens-ui-select-item-group {
    background: #ededed !important;
  }
}
  .total{
    padding: 0 10px;
    background: var(--cdd-col-fblue-dark);
    color:#fff!important;
  }
  .header{
    padding: 0;
    background: var(--cdd-col-fblue-dark);
    border-radius: 0px;
  }
  .header-page  {
    background: var(--cdd-col-fblue-dark)!important;
    color:#fff!important;
  }
  .header-title {
    background: var(--cdd-col-fblue-dark)!important;
    border-radius: 0px!important;
  }
  .iflorens-ui-select-item{
    padding: 0 !important;
  }
  .iflorens-ui-select-item-option {
    margin: 0 4px !important;
    background-color:var(--cdd-col-fblue-dark)!important;
    color: #FFFFFF !important;
  }
  .iflorens-ui-select-item-option-content {
    width: 100% !important;
  }
  .iflorens-ui-select-item:not(:first-of-type) :hover{
    background-color: #E8F0FF !important;
    color: #09215C !important;
  }
  /* 滚动条轨道 */
  ::-webkit-scrollbar-track {
    background: none !important;
  }
  /* 滚动条滑块 */
  ::-webkit-scrollbar-thumb {
    background: #C1C1C1 !important;
  }
  .iflorens-ui-empty-description{
    color: #fff !important;
  }
  &:before{
    background: none !important;
  }
}
</style>
