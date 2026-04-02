<template>
  <div class="cdd-async-select-table">
    <cdd-select
      v-bind="attrs"
      :modelValue="modelValue"
      :options="options"
      showSearch
      ref="selectRef"
      :isLoading="isLoading"
      :isShowPage="isShowPage"
      :disabledLoadMore="disabledLoadMore"
      :paginationConfig="paginationConfig"
      :placeholder="placeholder"
      :popupClassName="popupClassName"
      :primaryKey="primaryKey"
      :combineValue="combineValue"
      :defaultActiveFirstOption="defaultActiveFirstOption"
      @pageChange="onPageChange"
      @change="onChange"
      @search="onSearch"
      @select="onSelect"
      @blur="onBlur"
      @focus="onFocus"
      @loadmore="onLoadMore"
      @dropdownVisibleChange="dropdownVisibleChange"
    >
      <template v-if="Boolean(slots['tagRender'])" #tagRender="tagRenderItem">
        <slot name="tagRender" v-bind="tagRenderItem" v-on="tagRenderItem"></slot>
      </template>
    </cdd-select>
  </div>
</template>

<script lang="ts">
import { onMounted, ref, reactive } from 'vue';
import createComponent from '../../../utils/create';
import { getObjectValueByPath, setObjectValueByPath } from '../../../utils/util';
import { useNamespace, useAttrs } from '../../../hooks';
import { SelectTableProps } from './select-table';
import { Select } from '../../select/index';
const { create } = createComponent('SelectTable');
interface Attrs {
  value?: {
    fieldNames?: {
      value?: string;
    };
  };
}
export default create({
  components: {
    [Select.name]: Select
  },
  props: SelectTableProps,
  emits: ['search', 'blur', 'focus', 'loadmore', 'select','change','requestError','dropdownVisibleChange'],
  setup(props, { emit, expose,slots }) {
    const ns = useNamespace('select-table');
    const options = ref([]);
    const attrs = useAttrs() as Attrs;
    const disabledLoadMore = ref(false);
    const selectValue = ref([]);
    const isLoading = ref(false);
    const selectRef = ref();
    const { param,primaryKey,combineValue,defaultActiveFirstOption } = props;
    const paginationConfig = reactive({
      total: 0,
      pageSize: 0,
      currentPage: 1
    });
    const getOptions = async (searchParams?: Object,callback?: Function) => {
      try {
        isLoading.value = true;
        const { request } = props;
        // 合并参数
        const requestParams = {
          // ...param,
          ...props.param,
          ...searchParams,
          // currentPage: paginationConfig.current
          currentPage: paginationConfig.currentPage
        };
        // 统一处理搜索值，去除前后空格
        if (props.props?.searchValue) {
          const searchValue = getObjectValueByPath(requestParams, props.props.searchValue);
          if (typeof searchValue === 'string') {
            setObjectValueByPath(requestParams, props.props.searchValue, searchValue.trim());
          }
        }
        // @ts-ignore
        let res = await request(requestParams);
        if (!res.success) {
          return;
        }
        // @ts-ignore
        const listKey = props.primaryKey || attrs.value?.columns?.[0]?.dataIndex;
        const responseData = getObjectValueByPath(res, props.props.responseData);
        const list = responseData.map((it: any) => {
          if (props.combineValue){
            const keyList =  props.primaryKey.split(',');
            let unionValue = '';
            keyList.forEach((key:any) => {
              unionValue += it[key];
            });
            return {
              ...it,
              value:unionValue,
              combineKey:unionValue
            };
          }
          return {
            ...it,
            value: it[listKey]
          };
        });
        disabledLoadMore.value = responseData.length < paginationConfig.pageSize;
        if (props.combineValue) {
          options.value = props.isShowPage
            ? list
            : res.data.currentPage === 1
            ? list
            : [...options.value, ...list];
        }else {
          options.value = props.isShowPage
          ? responseData
          : res.data.currentPage === 1
          ? responseData
          : [...options.value, ...list];
        }
        paginationConfig.total = res.data.totalRecord || res.totalRecord;
        paginationConfig.pageSize = res.data.pageSize || res.pageSize;
        paginationConfig.currentPage = res.data.currentPage || res.currentPage;
        typeof callback === 'function' && callback(options.value);
      } catch {
        options.value = [];
        paginationConfig.total = 0;
        paginationConfig.currentPage = 1;
        emit('requestError');
      } finally {
        isLoading.value = false;
      }
    };

    const onPageChange = (current: number) => {
      paginationConfig.currentPage = current;
      getOptions();
    };

    const onChange = (value: any) => {
      // selectValue.value = value;
      emit('change', value);
    };
    const onSearch = (value: string) => {
      setObjectValueByPath(props.param, props.props.searchValue, value);
      if (props.onSearch && typeof props.onSearch === 'function') {
        props.onSearch(value);
        return;
      }
      paginationConfig.currentPage = 1;
      getOptions();
      emit('search', value);
    };
    const onSelect = (data: string,option:any ) => {
      const { value } = attrs.value?.fieldNames || {};
      if (value) {
        const item = props.isShowItemRecord ? options.value?.find((item: any) => item?.[value] === data) : data;
        emit('select', item,option);
      } else {
        emit('select', data,option);
      }
    };
    const onLoadMore = (current: number) => {
      paginationConfig.currentPage = current;
      getOptions();
      emit('loadmore', current);
    };
    const dropdownVisibleChange = (open: boolean)=>{
      emit('dropdownVisibleChange', open);
      if (!open){
        initPageData();
        getOptions();
      }
    }
    const initPageData = () => {
      setObjectValueByPath(param, props.props.searchValue, '');
      paginationConfig.currentPage = 1;
      paginationConfig.total = 0;
    };
    const onBlur = (e) => {
      setObjectValueByPath(param, props.props.searchValue, '');
      paginationConfig.currentPage = 1;
      paginationConfig.total = 0;
      if (props.isOnloadRequest||props.focusOnload) {
        getOptions();
      }
      emit('blur', e, initPageData);
    };
    const getSelectRef = () => {
      return selectRef.value;
    };

    const onFocus = (event: MouseEvent) => {
      if (props.focusOnload) {
        getOptions();
      }
      emit('focus', event);
    };
    expose({
      getOptions,
      options,
      paginationConfig,
      getSelectRef
    });

    onMounted(() => {
      if (props.isOnloadRequest) {
        getOptions();
      }
    });

    return {
      ns,
      attrs,
      slots,
      emit,
      primaryKey,
      combineValue,
      defaultActiveFirstOption,
      options,
      disabledLoadMore,
      isLoading,
      paginationConfig,
      selectRef,
      onPageChange,
      onSearch,
      onSelect,
      onBlur,
      dropdownVisibleChange,
      onFocus,
      selectValue,
      onLoadMore,
      onChange,
      getSelectRef
    };
  }
});
</script>
