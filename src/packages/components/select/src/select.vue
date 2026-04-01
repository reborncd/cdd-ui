<template>
  <div :class="ns.b()" ref="selectRefBox">
    <a-select
      :listHeight = "300"
      v-bind="attrs"
      ref="selectRef"
      :style="selectStyle"
      :value="modelValue"
      :popupClassName="`${popupClassName} ${customeRender?'fl-select-dropdown-container':'fl-select-dropdown-customeRender'} ${isLoading && showLoading?'isLoading':''} ${colorMode=='darkBlue'?'darkBlue':''}`"
      :class="{'darkBlueClass':colorMode=='darkBlue'}"
      :defaultActiveFirstOption="computedDefaultActiveFirstOption"
      :optionLabelProp="optionLabelProp"
      :dropdown-match-select-width="dropdownMatchSelectWidth"
      :getPopupContainer="attrs.getPopupContainer || getPopupContainer"
      showArrow
      @change="onSelectChange"
      @select="onSelect"
      @deselect="onDeselect"
      @focus="onFocus"
      @blur="onBlur"
      @inputKeyDown="onInputKeyDown"
      @popupScroll="onPopupScroll"
      @search="onSearch"
      @dropdownVisibleChange="dropdownVisibleChange"
    >
      <!-- options列表 title设置为 "" 表格鼠标悬浮上去禁止灰色toast提示 -->
      <a-select-option
        v-for="(item,index) in options"
        v-bind="item"
        :value="combineValue?item.combineKey:item[fieldNames.value]"
        :key="`${item[fieldNames.key] || item[fieldNames.label]}${index}`"
        title=""
        :disabled="item.disabled"
      >
        <div class="option-item" :class="state.checkedList.includes(item[fieldNames.value])?'option-item-selected':''" v-if="columns.length && customeRender">
          <div v-if="isShowSubTitle" class="customeRender-show-subTitle">
            <span class="option-label">{{ item[fieldNames.label] }}</span>
            <span  class="option-sub-title">{{ item[fieldNames.subTitle] }}</span>
          </div>
          <a-checkbox
            v-if="attrs.mode === 'multiple'"
            :disabled="item.disabled"
            :checked="state.checkedList.includes(item[fieldNames.value])"
          ></a-checkbox>
          <div class="option-fields" :class="{'option-fields-multiple' : attrs.mode === 'multiple'}">
            <div v-for="filed in columns" :key="filed" :style="{ width: filed.width || 100 / columns.length + '%' }">
              <a-tooltip placement="topLeft">
                <template #title>{{ filterText(item[filed.dataIndex]) }}</template>
                {{ filterText(item[filed.dataIndex]) }}
              </a-tooltip>
            </div>
          </div>
        </div>
        <div v-else>
          <div v-if="!isShowSubTitle">{{ item[fieldNames.label] }}</div>
          <div v-else class="options-item">
            <span class="option-label">{{ item[fieldNames.label] }}</span>
            <span class="option-sub-title">{{ item[fieldNames.subTitle] }}</span>
          </div>
        </div>
      </a-select-option>
      <!-- 自定义插槽 -->
      <template #dropdownRender="{ menuNode: menu }" v-if="customeRender">
        <div class="dropdown-container" v-if="columns.length">
          <div class="total" :class="attrs.mode === 'multiple'?'multiple-total':''" v-if="isShowPage && paginationConfig.total">
            <span v-if="options.length">
              Total {{ paginationConfig.total }} records. From {{ currentPageRecord }} to {{ currentPageTotalRecord }}
            </span>
            <span>
              <fl-icon
                type="iflorens-Left"
                :class="{
                  'fl-icon-disabled': paginationConfig.currentPage == 1,
                  'fl-icon-active': paginationConfig.currentPage > 1,
                  'fl-icon-white': colorMode=='darkBlue'
                }"
                @click="onPageChange('decrease')"
              />
              <fl-icon
                type="iflorens-Left"
                class="iflorens-reverse"
                :class="[
                  {
                    'fl-icon-active': paginationConfig.currentPage < totalPageNo,
                    'fl-icon-disabled': paginationConfig.currentPage == totalPageNo,
                    'fl-icon-white': colorMode=='darkBlue'
                  }
                ]"
                @click="onPageChange('increase')"
              />
            </span>
          </div>
          <!-- 自定义表头 -->
          <div class="dropdown-head">
            <div class="header" :class="attrs.mode === 'multiple'?'multiple-header':''" v-if="isShowHeader">
              <a-checkbox
                v-if="attrs.mode === 'multiple'"
                v-model:checked="state.checkAll"
                :indeterminate="state.indeterminate"
                @change="onCheckAllChange"
              ></a-checkbox>
              <div class="header-title" :class="{'option-fields-multiple' : attrs.mode === 'multiple'}">
                <span
                  v-for="item in columns"
                  :key="item.dataIndex"
                  :style="{ width: item.width || 100 / columns.length + '%' }"
                >
                  <a-tooltip placement="topLeft">
                    <template #title>{{ item.title }}</template>
                    {{ item.title }}
                  </a-tooltip>
                </span>
              </div>
            </div>
            <v-nodes :vnodes="menu" />
          </div>
        </div>
      </template>
      <template #notFoundContent>
        <fl-empty description="No Data" />
      </template>
      <template #tagRender="tagRenderItem" v-if="Boolean(slots['tagRender'])">
        <slot name="tagRender" v-bind="tagRenderItem" v-on="tagRenderItem"></slot>
      </template>
      <!-- <template #suffixIcon><DownOutlined class="ant-select-suffix" /></template> -->
    </a-select>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, computed, watch, h, nextTick, getCurrentInstance } from 'vue';
import { Icon } from '../../icon';
import { Empty } from '../../empty';
import createComponent from '../../../utils/create';
import { useNamespace, useAttrs } from '../../../hooks';
const { create } = createComponent('Select');
import { SelectProps } from './select';
import { debounce } from '../../../utils/util';
import { Select, SelectOption as ASelectOption, Spin, Checkbox, Tooltip } from 'ant-design-vue';
import { DownOutlined } from '@ant-design/icons-vue';
const VNodes = defineComponent({
  props: {
    vnodes: {
      type: Object,
      required: true
    }
  },
  render() {
    return this.vnodes;
  }
});
export default create({
  components: {
    [Icon.name]: Icon,
    VNodes,
    DownOutlined,
    [Empty.name]: Empty,
    [Select.name as string]: Select,
    ASelectOption,
    [Checkbox.name as string]: Checkbox,
    [Tooltip.name as string]: Tooltip
  },
  props: SelectProps,
  emits: [
    'update:modelValue',
    'change',
    'pageChange',
    'select',
    'deSelect',
    'focus',
    'blur',
    'inputKeyDown',
    'popupScroll',
    'search',
    'loadmore',
    'dropdownVisibleChange'
  ],
  setup(props, { emit, slots, expose }: any) {

    const selectRef = ref();
    const selectRefBox = ref();
    const ns = useNamespace('select');
    const searchValue = ref('');
    const attrs = useAttrs();
    // 列表要展示的字段
    const fileds = props.columns || [];
    // const selectValue = ref("");
    const state = reactive({
      indeterminate: false,
      checkAll: false,
      checkedList: []
    });
    const list: [] = [];
    // 所有列表数据
    const totalRecord: any = computed(() => {
      if (!list.length) return props.options.map((it: any) => it[props.fieldNames.value]);
      return list.concat(props.options as []).map((it: any) => it[props.fieldNames.value]);
    });

    const plainOptions = computed(() => {
      return props.options.filter((it: any) => !it.disabled).map((it: any) => it[props.fieldNames.value]) || [];
    });

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

    // 全选
    const onCheckAllChange = (e: MouseEvent) => {
      const node = e.target as HTMLInputElement;
      nextTick(() => {
        // console.log(document.getElementsByName)
        const doms = document.querySelectorAll(
          '.iflorens-ui-select-selection-search .iflorens-ui-select-selection-search-input'
        );
        if (doms && doms.length > 0) {
          doms.forEach((dom) => {
            dom.value = '';
          });
        }
      });
      Object.assign(state, {
        checkedList: node.checked
          ? Array.from(new Set(state.checkedList.concat(plainOptions.value as [])))
          : state.checkedList.filter((it) => !plainOptions.value.includes(it)),
        indeterminate: false
      });

      emit('update:modelValue', state.checkedList);
      console.log('state.checkedList', state.checkedList);
      emit('change', state.checkedList);
    };
    // 切换下拉选项
    const onSelectChange = (result: any, option: any) => {

      const indeterminate = Array.isArray(props.modelValue)
        ? !plainOptions.value.every((it) => result?.includes(it)) && plainOptions.value?.some((it) => result?.includes(it))
        : false;
      // 自定义多选
      if (attrs.value.mode === 'multiple' && props.customeRender) {
        Object.assign(state, {
          checkedList: result||[],
          checkAll: plainOptions.value.every((it: any) => result?.includes(it)),
          indeterminate
        });
        emit('update:modelValue', result||[]);
        emit('change', result, option);
        return
      }
      // selectValue.value = result ? option[props.fieldNames.label] : '';
      emit('update:modelValue', result);
      emit('change', result, option);
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

    const pageConfig: any = ref({ ...props.paginationConfig });
    // 切换分页
    const onPageChange = (type: string) => {
      pageConfig.value = { ...props.paginationConfig };
      const { currentPage } = pageConfig.value;
      if (type === 'decrease') {
        // 往前翻页
        if (currentPage === 1) return;
        pageConfig.value.currentPage--;
      } else {
        // 往后翻页
        if (currentPage == totalPageNo.value) return;
        pageConfig.value.currentPage++;
      }
      emit('pageChange', pageConfig.value.currentPage);
    };
    const calculateIndeterminate = (result: string | any[]) => {
      if (!Array.isArray(props.modelValue) || !Array.isArray(plainOptions.value) || result.length === 0) {
        return false;
      }
      return (
        !plainOptions.value.every((it) => (props.modelValue as string[]).includes(it)) &&
        plainOptions.value.some((it) => (props.modelValue as string[]).includes(it))
      );
    };
    const calculateCheckAll = (result: any[]) => {
      if (!Array.isArray(props.modelValue) || !Array.isArray(state.checkedList) || result.length === 0) {
        return false;
      }
      return (
        result.every((it: { [x: string]: any }) => state.checkedList?.includes(it[props.fieldNames.value])) &&
        state.checkedList.length > 0
      );
    };
    const filterText = (text: string) => {
      return text !== "" && text !== " " && text !== null ? text : "-";
    };
    watch(
      () => props.options,
      (result) => {
        if (attrs.value.mode === 'multiple' && props.customeRender) {
          const indeterminate = calculateIndeterminate(result);
          Object.assign(state, {
            checkAll: calculateCheckAll(result),
            checkedList: props.modelValue,
            indeterminate
          });
          nextTick(() => {
            state.indeterminate = indeterminate;
          });
        }
      },
      {
        immediate: true
      }
    );
    watch(
      () => props.modelValue,
      (value) => {
        if (!value?.length) {
          Object.assign(state, {
            checkAll: false,
            checkedList: [],
            indeterminate: false
          });
        }
      }
    );

    const onSelect = (value: [string, Array<string | object>], option: any) => {
      emit('select', value, option);
    };
    const onDeselect = (value: [string, Array<string | object>]) => {
      emit('deSelect', value);
    };
    const onFocus = (e: MouseEvent) => {
      if(props.maxLength>0){
        const input = document.getElementById(e.target.id);
        if (input) {
          input.setAttribute('maxlength', props.maxLength.toString()); // 设置最大长度
        }
      }
      emit('focus', e);
    };
    const dropdownVisibleChange = (open: boolean) =>{
      emit('dropdownVisibleChange', open);
    }
    const onBlur = (e: MouseEvent) => {
      emit('blur', e);
    };
    const onInputKeyDown = (e: MouseEvent) => {
      emit('inputKeyDown', e);
    };
    const onPopupScroll = debounce(function (event: MouseEvent) {
      // 显示箭头分页，禁用滚动加载
      if (props.isShowPage) return;
      if (props.disabledLoadMore) return;
      const container = event.target as HTMLElement;
      const paginationConfig = { ...props.paginationConfig };
      if (container.scrollTop + container.clientHeight >= container.scrollHeight - 50) {
        // 接近底部时触发
        emit('loadmore', paginationConfig.currentPage + 1);
      }
    }, 300);
    const onSearch = debounce(function (value: string) {
      emit('search', value);
    }, props.delay);

    const getPopupContainer = (triggerNode:any) => {
      let currentNode = triggerNode;
      while (currentNode) {
          if (currentNode.classList && currentNode.classList.contains('iflorens-form')) {
              break;
          }
          currentNode = currentNode.parentNode; // 移动到上一级父元素
      }
      if (currentNode) {
          return currentNode
      }
      return document.body;
    }
    expose({
      selectRef
    })
    return {
      ns,
      selectRef,
      selectRefBox,
      searchValue,
      // selectValue,
      combineValue:props.combineValue,
      attrs,
      fileds,
      state,
      slots,
      totalPageNo,
      totalRecord,
      currentPageRecord,
      currentPageTotalRecord,
      onCheckAllChange,
      onSelectChange,
      onPageChange,
      onSelect,
      onDeselect,
      onFocus,
      dropdownVisibleChange,
      onBlur,
      onInputKeyDown,
      onPopupScroll,
      onSearch,
      getPopupContainer,
      computedDefaultActiveFirstOption,
      filterText
    };
  }
});
</script>
<style lang="scss" scoped>
:deep(){
  .notFoundContent {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    width: 100%;
  }
  .iflorens-reverse {
    transform: rotate(-180deg);
    margin-left: 15px;
  }
  // .rc-virtual-list-holder {
  //   max-height: 330px !important;
  // }
  .fl-icon-disabled {
    color: #ccc;
    cursor: not-allowed;
  }

  .fl-icon-active {
    color: var(--fl-col-fblue5);
  }
  .fl-icon-white {
    color: #fff !important;
  }

  .fl-icon {
    font-size: 12px !important;
  }

  .fl-icon-loading {
    margin-left: 5px;
    font-size: 12px;
    color: #bbb;
    :deep(.iflorens-ui-spin-dot) {
      font-size: transportant;
      i {
        background: #bbb;
      }
    }
  }
  .options-item {
    display: flex;
    .option-sub-title {
      flex: 1;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }

  .option-label {
    max-width: 100%;
    display: inline-block;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    color: var(--fl-col-neutral1);
    font-weight: 600;
    margin-right: 5px;
    flex-shrink: 0;
    vertical-align: middle;
  }

  .option-sub-title {
    color: var(--fl-col-secondarytext-new);
  }
  .iflorens-ui-select-dropdown {
    min-width: 257px;
  }
  .iflorens-ui-select-dropdown .iflorens-ui-select-item {
    min-height: 24px;
    padding: 0px 6px;
  }

  .iflorens-ui-select-item-option-state {
    display: none;
  }

  .iflorens-ui-checkbox {
    margin-right: 12px;
  }
}

</style>
<style lang="scss">
@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}
.iflorens-ui-select-dropdown.fl-select-dropdown-container.isLoading {
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
	  color: var(--fl-col-blue5);
  }
}
.fl-select-dropdown-container {
  .customeRender-show-subTitle {
    display: none;
  }
  .total {
    font-size: 12px;
    color: var(--fl-col-secondarytext-new);
    padding: 2px 4px 2px 6px;
    display: flex;
    justify-content: space-between;
  }

  .header {
    height: 32px;
    font-size: 12px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 4px 6px;
    background: var(--fl-col-background-grey);
    line-height: 28px;
    .header-title {
      span {
        // flex: 1;
        font-weight: bold;
        color: var(--fl-col-secondarytext-new);
      }
    }
  }

  .option-item {
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .header-title,
  .option-fields {
    width: 100%;
    display: inline-flex;
    justify-content: space-between;
    font-size: 12px;
    &.option-fields-multiple{
      width:calc(100% - 28px);
    }
    div,
    span {
      // flex: 1;
      width: 100%;
      display: inline-block;
      vertical-align: middle;
      margin-right: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .option-fields {
    span {
      font-size: 14px;
    }
  }

  .iflorens-ui-select-item-option {
    padding: 0 5px;
    min-height: 24px;
    /**
    height: 24px;
    **/
    line-height: 20px;
    border-bottom: 1px dashed var(--fl-col-line);

    &:hover {
      background: #f5f7fa;
    }
  }

  .iflorens-ui-select-dropdown-menu-item {
    &:hover {
      background: var(--fl-col-fblue10);
    }
  }
}

.fl-select-dropdown-customeRender {
  .rc-virtual-list-holder {
    max-height: 320px !important;
  }
  .iflorens-ui-select-dropdown-menu-item {
    padding: 5px 12px;
    line-height: 22px;

    &:hover {
      background: #dfe4ed;
    }
  }

  .iflorens-ui-select-dropdown-menu-item-selected {
    font-weight: 600;
    background-color: var(--fl-col-neutral12);
  }
}
.darkBlueClass{
  .iflorens-ui-select-selector{
    background-color: transparent !important;
    color: #fff !important;
  }
}
.darkBlue {
  background-color: var(--fl-col-fblue-dark);
  .total {
    padding: 0 8px;
    background: var(--fl-col-fblue-dark);
    color:#fff!important;
  }
  .multiple-total{
    padding: 0 15px;
  }
  .header {
    padding: 0 11px;
    background: var(--fl-col-fblue-dark);
    border-radius: 0px;
    .header-title {
      span {
        color:#fff!important;
      }
    }
    .iflorens-ui-checkbox-inner::after{
      background-color: var(--fl-col-fblue-dark) !important;
    }
  }
  .multiple-header{
    padding: 0 11px;
  }
  .iflorens-ui-select-item-option {
    background-color: var(--fl-col-fblue-dark)!important;
    color:#FFFFFF !important;
    &:hover {
      background-color: #E8F0FF !important;
      color: #09215C !important;
    }
  }
  .option-item-selected{
    background: #E8F0FF !important;
    color: #09215C !important;
  }
  .iflorens-ui-select-item-option-selected{
    background: #E8F0FF !important;
  }
  .rc-virtual-list-scrollbar{
    background: none !important;
  }
  .rc-virtual-list-scrollbar-thumb{
    background: #C1C1C1 !important;
  }
  /* 滚动条轨道 */
  ::-webkit-scrollbar-track {
    background: none !important;
  }
  /* 滚动条滑块 */
  ::-webkit-scrollbar-thumb {
    background: #C1C1C1 !important;
  }
  &:before{
    background: none !important;
  }
  .rc-virtual-list{
    padding: 0 6px !important;
  }
  .iflorens-ui-checkbox-wrapper{
    padding: 0 6px !important;
  }
  .iflorens-ui-checkbox-checked .iflorens-ui-checkbox-inner{
    background-color: var(--fl-col-fblue-dark) !important;
    border-color: var(--fl-col-fblue-dark) !important;
  }
  .iflorens-ui-empty-description{
    color: #fff !important;
  }
}
</style>
