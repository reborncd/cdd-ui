<template>
  <div :class="ns.b()">
    <cdd-auto-complete
      v-bind="attrs"
      :options="options"
      :paginationConfig="paginationConfig"
      :customeRender="true"
      :modelValue="modelValue"
      :disabledLoadMore="disabledLoadMore"
      :popup-className="`${popupClassName}`"
      :defaultActiveFirstOption="defaultActiveFirstOption"
      :isLoading="isLoading"
      @search="onSearch"
      @clear="onClear"
      @select="onSelect"
      @loadmore="loadMore"
      @change="onChange"
      @blur="onBlur"
      @focus="onFocus"
      @pageChange="onPageChange"
    />
  </div>
</template>

<script lang="ts">
import { ref, reactive, onMounted } from 'vue';
import createComponent from '../../../utils/create';
import { useNamespace, useAttrs } from '../../../hooks';
const { create } = createComponent('AutoCompleteTable');
import { autoCompleteTableProps } from './auto-complete-table';
import { AutoComplete } from '../../auto-complete/index';
import { getObjectValueByPath, setObjectValueByPath } from '../../../utils/util';
export default create({
  props: autoCompleteTableProps,
  components: {
    [AutoComplete.name]: AutoComplete
  },
  emits: ['update:modelValue', 'search', 'change','select'],
  setup(props, { emit, expose }) {
    const ns = useNamespace('auto-complete-table');
    const attrs = useAttrs();
    const isLoading = ref(false);
    const disabledLoadMore = ref(false);
    const options = ref([
      {
        title:"",
        value: '',
        options: []
      }
    ]);
    const paginationConfig = reactive({
      total: 0,
      // pageSize: 10,
      // current: 1
      pageSize: 0,
      currentPage: 1
    });
    const { param, defaultActiveFirstOption } = props;
    const getOptions = async (pageChange?:boolean) => {
      try {
        // @ts-ignore
        isLoading.value = true;
        const { request } = props;
        // 构建请求参数
        const requestParams = {
          ...param,
          currentPage: paginationConfig.currentPage
        };
        // 统一处理搜索值，去除前后空格
        if (props.props?.searchValue) {
          const searchValue = getObjectValueByPath(requestParams, props.props.searchValue);
          if (typeof searchValue === 'string') {
            setObjectValueByPath(requestParams, props.props.searchValue, searchValue.trim());
          }
        }
        let res = await request(requestParams);
        if (!res.success) {
          return;
        }
        // @ts-ignore
        const listKey = props.primaryKey || attrs.value?.columns?.[0]?.dataIndex;
        const responseData = getObjectValueByPath(res, props.props.responseData);
        const list = responseData.map((it: any) => {
          return {
            ...it,
            label: it[props.param.label] || it[listKey],
            value: it[listKey],
            title:"",
          };
        });
        disabledLoadMore.value = responseData.length < paginationConfig.pageSize;
        // @ts-ignore
        options.value[0].options = list;
        paginationConfig.total = res.data.totalRecord || res.totalRecord;
        paginationConfig.pageSize = res.data.pageSize || res.pageSize;
        paginationConfig.currentPage = res.data.currentPage || res.currentPage;
      } catch {
        options.value[0].options = [];
        paginationConfig.total = 0;
      } finally {
        isLoading.value = false;
      }
    };
    const loadMore = (current: number) => {
      paginationConfig.currentPage = current;
      getOptions();
    };
    const onSelect = (value: any, option:any) => {
      emit('update:modelValue', value, option);
      emit('select', value, option);
    };
    const onSearch = (value: string) => {
      paginationConfig.currentPage = 1;
      setObjectValueByPath(param, props.props.searchValue, value);
      emit('search', value);
      getOptions();
    };
    const onClear = () => {
      paginationConfig.currentPage = 1;
      emit('update:modelValue', '');
    };
    const onChange = (value: string) => {
      emit('update:modelValue', value);
      emit('change', value);
    };
    const onPageChange = (current: number) => {
      paginationConfig.currentPage = current;
      getOptions(true);
    };
    const onBlur = () => {
      paginationConfig.currentPage = 1;
      setObjectValueByPath(param, props.props.searchValue, '');
      getOptions();
    };
    const onFocus = () => {
      if (props.focusOnload) {
        getOptions();
      }
    };
    onMounted(() => {
      getOptions();
    });
    expose({
      getOptions
    });

    return {
      ns,
      attrs,
      defaultActiveFirstOption,
      options,
      paginationConfig,
      disabledLoadMore,
      isLoading,
      loadMore,
      onChange,
      onSelect,
      onSearch,
      onClear,
      onBlur,
      onFocus,
      onPageChange,
    };
  }
});
</script>
