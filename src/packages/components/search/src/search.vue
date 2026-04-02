<template>
  <div :class="[ns.b(), type == 'card' ? 'cdd-search-card' : 'cdd-search-list', colorMode==='darkBlue'?'search-darkBlue':'']" ref="searchBoxRef">
    <div class="page-content">
      <div class="page-top" v-if="type == 'card'">
        <cdd-collect
          :isShowCollectBtn="isShowCollectBtn"
          class="page-collect"
          :title="title"
          @addSuccess="handleCallBack"
          @delSuccess="handleCallBack"
          :prefix="prefix"
          :path="routePath"
          :request="fetch"
        />
        <div class="page-top-right">
          <slot name="page-top-right">
            <a-button type="primary" @click="openNewContract">New Contract</a-button>
          </slot>
        </div>
      </div>
      <div class="page-middle">
        <div
          class="form-box"
          :class="{'form-box-darkBlue':colorMode==='darkBlue'}"
          :style="{
            width: formWidth
          }"
        >
          <a-row class="search-input">
            <a-col :span="type == 'card' ? 18 : 24">
              <cdd-search-input v-if="isShowKeyWordInput&&colorMode!=='darkBlue'" v-model="searchValue" allowClear placeholder="Type keyword to search" />
            </a-col>
            <a-col v-if="colorMode!=='darkBlue'" :span="24">
              <div class="tips">{{ searchText }}</div>
              <slot name="form-tips"></slot>
            </a-col>
            <div class="search-dropdown-card" v-if="hideSaveSearchSelect&&colorMode!=='darkBlue'">
              <cdd-dropdown
                v-if="isShowSaveSearch"
                v-model="searchCondition"
                :dropdownWidth="dropdownWidth"
                :options="dropdownOptions"
                showEmpty
                isShowDelIcon
                isShowAll
                :delIconClickFun="delIconClickFun"
                @change="dropdownChange"
              />
            </div>
          </a-row>
          <cdd-form
            v-bind="attrs"
            :type="type"
            :isShowDown="isShowDown"
            :defaultActiveFirstOption="defaultActiveFirstOption"
            :colorMode="colorMode"
            ref="flFormRef"
            :class="{
              'form-box-list': type == 'list'
            }"
          >
            <template #form-bottom>
              <slot name="form-bottom"></slot>
            </template>
          </cdd-form>
        </div>
        <slot name="form-right"></slot>
      </div>
      <div class="page-bottom" :class="{'page-bottom-darkBlue':colorMode==='darkBlue'}" v-if="type == 'card'">
        <a-space :size="15">
          <a-button class="search-btn" :class="{'search-btn-darkBlue':colorMode==='darkBlue'}" @click="onSearch" v-if="showSearchBtn">Search</a-button>
          <cdd-icon-button
            class="iflorens-redo"
            :class="{'reset-btn-darkBlue':colorMode==='darkBlue'}"
            icon="iflorens-Redo"
            :iconStyle="iconStyle"
            type="link"
            size="small"
            @click="resetForm"
          >
            Reset
          </cdd-icon-button>
        </a-space>
        <a-divider v-if="colorMode!=='darkBlue'" type="vertical"></a-divider>
        <cdd-icon-button
          v-if="isShowSaveSearch&&colorMode!=='darkBlue'"
          class="iflorens-save"
          icon="iflorens-Save"
          type="link"
          size="small"
          :iconStyle="iconStyle"
          @click="saveSearchCriteria"
        >
          Save Search Criteria
        </cdd-icon-button>
      </div>
      <a-row v-else class="page-bottom" :class="[type == 'card' ? 'page-bottom' : 'page-bottom page-list',colorMode==='darkBlue'?'page-bottom-darkBlue':'']">
        <a-col :span="24">
          <a-button class="search-btn" :class="{'search-btn-darkBlue':colorMode==='darkBlue'}" @click="onSearch">Search</a-button>
        </a-col>
        <cdd-icon-button :class="{'reset-btn-darkBlue':colorMode==='darkBlue'}" icon="iflorens-Redo" :iconStyle="iconStyle" type="link" size="small" @click="resetForm">
          Reset
        </cdd-icon-button>
        <a-divider type="vertical" v-if="isShowSaveSearch&&colorMode!=='darkBlue'"></a-divider>
        <cdd-icon-button
          v-if="isShowSaveSearch&&colorMode!=='darkBlue'"
          icon="iflorens-Save"
          type="link"
          size="small"
          :iconStyle="iconStyle"
          class="iflorens-save"
          @click="saveSearchCriteria"
        >
          Save Search Criteria
        </cdd-icon-button>
      </a-row>
    </div>
    <!-- Save Search Criteria弹窗 -->
    <cdd-modal
      v-model:open="open"
      title="Save Search Criteria"
      okText="Confirm"
      :centered="true"
      @ok="handleOk"
      @cancel="cancel"
    >
      <a-form :model="searchForm" autocomplete="off" layout="vertical" ref="formRef" :rules="rules">
        <a-form-item key="name" label="Name" name="name">
          <a-input :maxlength="50" v-model:value="searchForm.name" placeholder="Please input" />
        </a-form-item>
      </a-form>
    </cdd-modal>
  </div>
</template>

<script lang="ts">
import createComponent from '../../../utils/create';
import { useNamespace, useAttrs } from '../../../hooks';
const { create } = createComponent('Search');
import Form from './form.vue';
import { reactive, ref, h, inject, onMounted, nextTick } from 'vue';
import { Collect } from '../../collect/index';
import { Button, Divider, Row, Col, Space, Form as AntForm, FormItem, Input, message } from 'ant-design-vue';
import { SearchInput } from '../../search-input';
import { Dropdown } from '../../dropdown';
import { IconButton } from '../../icon-button';
import { Modal } from '../../modal';
import { SearchProps } from './search';
import { CloseOutlined } from '@ant-design/icons-vue';
import { mergeForm } from './utils/index';
import type { Rule } from 'ant-design-vue/es/form';

export default create({
  components: {
    [Form.name]: Form,
    [Collect.name]: Collect,
    [Button.name as string]: Button,
    [Divider.name as string]: Divider,
    [SearchInput.name]: SearchInput,
    [Row.name as string]: Row,
    [Col.name as string]: Col,
    [Dropdown.name]: Dropdown,
    [IconButton.name]: IconButton,
    [Space.name as string]: Space,
    [Modal.name]: Modal,
    [AntForm.name as string]: AntForm,
    [FormItem.name as string]: FormItem,
    [Input.name as string]: Input
  },
  props: SearchProps,
  emits: ['reset', 'search', 'delete', 'refresh', 'openNewContract', 'change', 'handleCollectBack'],
  setup(props, { emit }) {
    const flFormRef = ref(null);
    const dropdownOptions = ref([]);
    const searchJson = ref([]);
    const searchBoxRef = ref(null);
    const ns = useNamespace('search');
    const attrs = useAttrs();
    const dropdownSelectValue = ref('');
    const initForm = JSON.parse(JSON.stringify(attrs.value.form));
    attrs.value.form = mergeForm(attrs.value.form, props.searchInitForm);
    attrs.value.form.colorMode = props.colorMode;
    const formData = ref({});
    const searchValue = ref(props.searchInitForm && props.searchInitForm.keyword ? props.searchInitForm.keyword : '');
    const searchCondition = ref(props.searchCondition === '' ? 'All' : props.searchCondition);
    const open = ref(false);
    const searchForm = reactive({
      name: ''
    });
    const iconStyle = ref({
      color: 'var(--cdd-col-fblue5)'
    });
    const validateName = (_rule: Rule, value: string) => {
      if (!value) return Promise.reject('Please complete');
      if ( value && value.trim().length === 0) {
          return Promise.reject('Please complete');
      }
      return props
        .fetch({
          url: '/iflorens-mdm/api/v0/mdm-search-criteria/check-unique',
          method: 'post',
          data: {
            ...props.formSaveParam,
            searchName: value
          }
        })
        .then((res) => {
          if (res.success && res.data && res.data.isUnique) {
            return Promise.resolve();
          } else {
            return Promise.reject('This name is already existed. Please choose another one.');
          }
        })
        .catch((err) => {
          return Promise.reject('This name is already existed. Please choose another one.');
        });
    };
    const formRef = ref();
    const rules = ref({
      name: [{ required: true, trigger: ['blur'], validator: validateName }]
    });
    const openNewContract = () => {
      emit('openNewContract');
    };
    // 自定义消息内容
    const customContent = h(
      'div',
      {
        class: 'custom-content-container'
      },
      [
        h('span', 'Please complete search criteria'),
        h(CloseOutlined, {
          onClick: () => {
            message.destroy();
          },
          style: 'font-size: 16px; color: #ccc;'
        })
      ]
    );
    const filterSearchData = () => {
      const data = {
        dynamic: {}
      } as any;
      const trimValue = (value: any) => {
        if (Array.isArray(value)) {
          return value.map((v) => (typeof v === 'string' ? v.trim() : v));
        }
        if (typeof value === 'string') {
          return value.trim();
        }
        return value;
      };
      (attrs.value.form as { controls: any[] })?.controls?.map((it) => {
        const rawValue = it.propsData.value;
        const trimmedValue = trimValue(rawValue);
        data.dynamic[it.key] = {
          field: props.fieldParams ? `${props.fieldParams}.${it.key}` : it.key,
          key: props.fieldParams ? `${props.fieldParams}.${it.key}` : it.key,
          operator: getOperator(it, it.operatorOptions.operator),
          value: ['between', 'in', 'not in'].includes(it.operatorOptions.operator)
            ? trimmedValue
            : typeof trimmedValue === 'object'
            ? trimmedValue
            : trimmedValue
            ? [trimmedValue]
            : []
        };
        return it;
      });
      return data;
    };
    const getOperator = (it, operator: string) => {
      const commonOperators: { [key: string]: string } = {
        in: 'IN',
        'not in': 'NOT_IN',
        '=': 'EQUAL',
        'not =': 'NOT_EQUAL',
        contains: 'CONTAINS',
        'begins with': 'BEGINS_WITH',
        'ends with': 'ENDS_WITH',
        from: 'GREATER_EQUAL',
        to: 'LESS_EQUAL',
        between: 'BETWEEN'
      };
      if (operator == '=' && it.operatorOptions && it.operatorOptions.isIgnoreCase) {
        return 'EQUAL_IGNORE_CASE';
      }
      return commonOperators[operator] || '';
    };
    // 搜索
    const onSearch = (type?: string) => {
      flFormRef &&
        flFormRef.value.formRef.validate().then(() => {
          formData.value = filterSearchData();
          let formDataCopy = JSON.parse(JSON.stringify(formData.value));
          if (props.isShowKeyWordInput) {
            formDataCopy.keyword = (searchValue.value || '').trim();
          }
          const formCopyData = JSON.parse(JSON.stringify(attrs.value.form));
          formCopyData.keyword = searchValue.value;

          emit('search', formDataCopy, type || '', formCopyData);
        });
    };

    // reset form
    const resetForm = () => {
      flFormRef.value.formRef.clearValidate()
      searchValue.value = ''
      searchCondition.value = 'All';
      emit('reset');
    };
    const saveSearchCriteria = () => {
      const data = filterSearchData();
      const list = [];
      for (const i in data.dynamic) {
        list.push(data.dynamic[i].value);
      }
      const isSomeValue = list
        ?.map((it) => {
          return it?.join('');
        })
        .some((it) => it?.length > 0);
      if (!isSomeValue) {
        return message.error({
          content: customContent,
          class: 'cdd-search-message'
        });
      }
      open.value = true;
    };

    const handleOk = () => {
      let searchJson = JSON.parse(JSON.stringify(attrs.value.form));
      searchJson.keyword = searchValue.value || '';
      return new Promise((resolve, reject) => {
        formRef.value
          .validate()
          .then(async () => {
            let data = Object.assign(
              {},
              {
                searchName: searchForm.name,
                searchType: '',
                searchJson
              },
              props.formSaveParam
            );
            let res = await props.fetch({
              url: '/iflorens-mdm/api/v0/mdm-search-criteria/save-mdm-search-criteria',
              method: 'post',
              data
            });
            if (!res.success) return;
            message.success('Save Successfully');
            cancel();
            if(props.colorMode!=='darkBlue'){
              initDropdownOptions();
            }
          })
          .catch((err) => {
            console.log(err, 'err==');
          });
      });
    };
    const cancel = () => {
      open.value = false;
      searchForm.name = '';
      formRef.value.resetFields();
    };
    const handleCallBack = (data: any) => {
      emit('handleCollectBack', data);
    };

    onMounted(() => {
      // 初始化调用一次，获取参数
      if (props.initSearch) {
        onSearch('init');
      }
      nextTick(() => {
        const myDiv = searchBoxRef.value as HTMLElement;
        if (!myDiv) return;
        myDiv.addEventListener('keydown', (event) => {
          if (event.key === 'Enter') {
            onSearch();
          }
        });
        myDiv.focus();
      });
      if(props.colorMode!=='darkBlue'){
        initDropdownOptions();
      }
    });

    // 初始化下拉条件
    const initDropdownOptions = async () => {
      if (!props.fetch) return;
      let res = await props.fetch({
        url: '/iflorens-mdm/api/v0/mdm-search-criteria/query-search-json',
        method: 'post',
        data: props.formSaveParam
      });
      if (!res.success) return;
      dropdownOptions.value = [];
      if (res.data && res.data.length > 0) {
        res.data.forEach((item) => {
          dropdownOptions.value.push(item.searchName);
        });
        searchJson.value = res.data;
      }
    };

    // 选择下拉条件
    const dropdownChange = (value: any) => {
      emit('change', value);
      dropdownSelectValue.value = value;
      if (value === 'All') {
        attrs.value.form = mergeForm(
          attrs.value.form,
          Object.keys(props.searchInitForm).length > 0 ? props.searchInitForm : initForm
        );

        onSearch('change');
        return;
      }
      let formData = {};
      searchJson.value.forEach((item) => {
        if (item.searchName === value) {
          formData = item;
        }
      });
      searchValue.value = formData.searchJson?.keyword || '';
      attrs.value.form = mergeForm(attrs.value.form, formData.searchJson);
      onSearch('change');
    };

    // 删除下拉条件
    const delIconClickFun = async (index, value) => {
      if (!props.fetch) return;
      let res = await props.fetch({
        url: '/iflorens-mdm/api/v0/mdm-search-criteria/delete-mdm-search-criteria',
        method: 'post',
        data: {
          ...props.formSaveParam,
          searchName: value
        }
      });
      message.success('Delete Successfully');
      if (value === dropdownSelectValue.value) {
        searchCondition.value = 'All';
        dropdownChange('All');
      }
      dropdownOptions.value.splice(index, 1);
    };

    return {
      flFormRef,
      delIconClickFun,
      dropdownChange,
      dropdownOptions,
      searchBoxRef,
      iconStyle,
      ns,
      attrs,
      emit,
      searchValue,
      searchCondition,
      open,
      searchForm,
      rules,
      formRef,
      openNewContract,
      onSearch,
      resetForm,
      handleOk,
      cancel,
      handleCallBack,
      saveSearchCriteria
    };
  }
});
</script>
<style lang="scss" scoped>
.form-box {
  :deep(.iflorens-ui-form-item-required::before){
    content: '' !important;
  }
}
.form-box-darkBlue{
  background-color: transparent !important;
}
.page-top-right {
  :deep(.iflorens-ui-btn) {
    background: rgba(62, 86, 167, 1);
  }
}
.search-dropdown-card {
  width: 100%;
  :deep(.cdd-dropdown) {
    max-width: fit-content !important;
    width: auto !important;
    .content {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      padding: 0;
    }
    .li-item-text {
      max-width: 100%;
    }
  }
}
.form-box-list {
  :deep(.iflorens-ui-form-item-explain) {
    padding-left: 0 !important;
  }
}
</style>
<style lang="scss">
.cdd-search-message {
  .ant-message-notice-content {
    width: 395px;
    border: 1px solid var(--cdd-col-red8);
    background: var(--cdd-col-red10);
    border-radius: 2px;
    position: relative;
    text-align: left;
    .custom-content-container {
      display: inline-flex;
    }
    .ant-message-custom-content {
      display: flex;
      align-items: center;
    }
    .anticon-close {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
