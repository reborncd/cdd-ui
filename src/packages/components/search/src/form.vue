<template>
  <div :class="ns.b()" ref="formRefBox">
    <a-form ref="formRef" v-bind="attrs" :model="form" name="form" autocomplete="off">
      <a-form-item
        v-for="(item, index) in form.controls"
        :key="item.labelName"
        :name="['controls', index, 'propsData', 'value']"
        :rules="item.rules"
        :labelAlign="item.labelAlign"
        :class="{ 'form-list': type == 'list' }"
      >
      <!-- card 模式 为搜索页    else  列表内嵌-->
        <template #label v-if="type === 'card'">
          <span><span v-if="item.rules && !item.hideRequired" class="required-icon">*</span> {{ item.labelName }}</span>
          <a-tooltip :title="item.tip" v-if="item.tip">
            <fl-icon style="margin-left: 8px; color: var(--fl-col-fblue5)" type="iflorens-InfoCircle" />
          </a-tooltip>
          <fl-dropdown
            v-if="type != 'card'"
            class="dropdown-card"
            v-model="item.operatorOptions.operator"
            :options="item.operatorOptions.options"
            :preventClick="item.preventClick"
            :isShowDown="isShowDown"
            type="card"
            @change="() => handleChange(index, item.operatorOptions.operator)"
          />
        </template>
        <div class="item-label-operator" :class="{'item-label-operator-darkBlue':form.colorMode=='darkBlue'}" v-if="type === 'list'">
          <span>
            <span v-if="item.rules && !item.hideRequired" class="required-icon">*</span> {{ item.labelName }}
            <a-tooltip :title="item.tip" v-if="item.tip">
              <fl-icon type="iflorens-InfoCircle" style="color: var(--fl-col-fblue5)" />
            </a-tooltip>
          </span>
          <fl-dropdown
            v-if="type != 'card'"
            class="dropdown-card"
            v-model="item.operatorOptions.operator"
            :options="item.operatorOptions.options"
            :preventClick="item.preventClick"
            :isShowDown="isShowDown"
            type="card"
            @change="() => handleChange(index, item.operatorOptions.operator)"
          />
        </div>
        <a-row v-if="type == 'card'">
          <a-col>
            <fl-dropdown
              v-model="item.operatorOptions.operator"
              :options="item.operatorOptions.options"
              :preventClick="item.preventClick"
              :isShowDown="isShowDown"
              type="card"
              @change="() => handleChange(index, item.operatorOptions.operator)"
            />
          </a-col>
          <a-col :span="12">
            <div v-if="['in', 'not in', '=', 'not ='].includes(item.operatorOptions.operator)">
              <template v-if="item.operatorOptions?.type === 'datePicker'">
                <fl-date
                  v-bind="item.propsData"
                  v-model="item.propsData.value"
                  :format="item.propsData.format"
                  @change="(date) => onDateChange(date, index)"
                />
              </template>
              <template v-else-if="item.operatorOptions?.type === 'input' && ['=', 'not ='].includes(item.operatorOptions.operator)">
                <fl-auto-complete
                  v-bind="item.propsData"
                  v-model="item.propsData.value"
                  ref="selectTableRefs"
                  :customeRender="item.propsData.customeRender"
                  :columns="item.propsData.columns"
                  :primaryKey="item.propsData.primaryKey"
                  :options="item.propsData.options"
                  :defaultActiveFirstOption="defaultActiveFirstOption"
                  :dropdownMatchSelectWidth="item.propsData.dropdownMatchSelectWidth"
                  :placeholder="item.propsData.placeholder || 'Please input'"
                  allowClear
                  showSearch
                  :paginationConfig="item.propsData.paginationConfig"
                  :props="item.propsData.selectProps"
                />
              </template>
              <template v-else-if="item.operatorOptions?.type === 'inputTable' && ['='].includes(item.operatorOptions.operator)">
                <fl-autoComplete-table
                  v-bind="item.propsData"
                  v-if="item.propsData.request"
                  v-model="item.propsData.value"
                  :columns="item.propsData.columns"
                  :request="item.propsData.request"
                  :param="item.propsData.selectParam"
                  :primaryKey="item.propsData.primaryKey"
                  :customeRender="item.propsData.customeRender"
                  :focusOnload="item.propsData.focusOnload"
                  :colorMode="form.colorMode"
                  :defaultActiveFirstOption="defaultActiveFirstOption"
                  :dropdownMatchSelectWidth="item.propsData.dropdownMatchSelectWidth"
                  placeholder="Please input"
                  allowClear
                  showSearch
                  :props="item.propsData.selectProps"
                  :paginationConfig="item.propsData.paginationConfig"
                  :popupClassName="item.propsData.popupClassName || ''"
                  :getPopupContainer="item.propsData.getPopupContainer"
                />
              </template>
              <template v-else>
                <fl-select-table
                  v-bind="item.propsData"
                  v-if="item.propsData.request"
                  ref="selectTableRefs"
                  :mode="['=', 'not ='].includes(item.operatorOptions.operator) ? '' : 'multiple'"
                  v-model="item.propsData.value"
                  showSearch
                  allowClear
                  :filter-option="false"
                  :fieldNames="item.propsData.fieldNames"
                  :optionLabelProp="item.propsData.optionLabelProp"
                  :defaultActiveFirstOption="defaultActiveFirstOption"
                  :dropdownMatchSelectWidth="item.propsData.dropdownMatchSelectWidth"
                  :customeRender="item.propsData.customeRender"
                  :focusOnload="item.propsData.focusOnload"
                  :colorMode="form.colorMode"
                  :isShowSubTitle="item.propsData.isShowSubTitle"
                  :columns="item.propsData.columns"
                  :request="item.propsData.request"
                  :param="item.propsData.selectParam"
                  :props="item.propsData.selectProps"
                  :paginationConfig="item.propsData.paginationConfig"
                  :placeholder="item.propsData.placeholder || 'Please select'"
                  :popupClassName="item.propsData.popupClassName || ''"
                  :getPopupContainer="item.propsData.getPopupContainer"
                  @blur="(val) => onBlur(val, index)"
                />
                <fl-select
                  v-else
                  v-bind="item.propsData"
                  :mode="['=', 'not ='].includes(item.operatorOptions.operator) ? '' : 'multiple'"
                  v-model="item.propsData.value"
                  showSearch
                  allowClear
                  :fieldNames="item.propsData.fieldNames"
                  :optionLabelProp="item.propsData.optionLabelProp"
                  :defaultActiveFirstOption="defaultActiveFirstOption"
                  :dropdownMatchSelectWidth="item.propsData.dropdownMatchSelectWidth"
                  :customeRender="item.propsData.customeRender"
                  :isShowSubTitle="item.propsData.isShowSubTitle"
                  :columns="item.propsData.columns"
                  :options="item.propsData.options"
                  :props="item.propsData.selectProps"
                  :paginationConfig="item.propsData.paginationConfig"
                  :popupClassName="item.propsData.popupClassName || ''"
                  :placeholder="item.propsData.placeholder || 'Please select'"
                  :getPopupContainer="item.propsData.getPopupContainer"
                  @blur="(val) => onBlur(val, index)"
                />
              </template>
            </div>
            <div v-else-if="['begins with', 'contains', 'ends with'].includes(item.operatorOptions.operator)">
              <fl-autoComplete-table
                v-bind="item.propsData"
                v-if="item.propsData.request"
                v-model="item.propsData.value"
                :columns="item.propsData.columns"
                :request="item.propsData.request"
                :param="item.propsData.selectParam"
                :primaryKey="item.propsData.primaryKey"
                :customeRender="item.propsData.customeRender"
                :focusOnload="item.propsData.focusOnload"
                :colorMode="form.colorMode"
                :defaultActiveFirstOption="defaultActiveFirstOption"
                :dropdownMatchSelectWidth="item.propsData.dropdownMatchSelectWidth"
                placeholder="Please input"
                allowClear
                showSearch
                :props="item.propsData.selectProps"
                :paginationConfig="item.propsData.paginationConfig"
                :popupClassName="item.propsData.popupClassName || ''"
                :getPopupContainer="item.propsData.getPopupContainer"
              />
              <fl-auto-complete
                v-else
                v-bind="item.propsData"
                v-model="item.propsData.value"
                :columns="item.propsData.columns"
                :primaryKey="item.propsData.primaryKey"
                :options="item.propsData.options"
                :customeRender="item.propsData.customeRender"
                :defaultActiveFirstOption="defaultActiveFirstOption"
                :dropdownMatchSelectWidth="item.propsData.dropdownMatchSelectWidth"
                placeholder="Please input"
                allowClear
                showSearch
                :props="item.propsData.selectProps"
                :paginationConfig="item.propsData.paginationConfig"
                :popupClassName="item.propsData.popupClassName || ''"
              />
            </div>
            <fl-date
              v-else-if="['from', 'to'].includes(item.operatorOptions.operator)"
              v-model="item.propsData.value"
              :format="item.propsData.format"
              v-bind="item.propsData"
              @change="(date) => onDateChange(date, index)"
            />
            <template v-else-if="item.operatorOptions.operator === 'between'">
              <fl-number-range
                v-if="item.operatorOptions.type && (item.operatorOptions.type === 'number-range'||item.operatorOptions.type === 'cockpick-input')"
                v-model="item.propsData.value"
              />
              <fl-date v-else dateType="rangePicker" v-bind="item.propsData" v-model="item.propsData.value" :format="item.propsData.format" :picker="item.propsData.picker" />
            </template>
            <template
              v-else-if="item.operatorOptions?.type === 'cockpick-input' && item.operatorOptions.operator !== 'between'"
            >
              <fl-auto-complete
                v-bind="item.propsData"
                v-model="item.propsData.value"
                ref="selectTableRefs"
                :customeRender="item.propsData.customeRender"
                :defaultActiveFirstOption="defaultActiveFirstOption"
                :columns="item.propsData.columns"
                :primaryKey="item.propsData.primaryKey"
                :options="item.propsData.options"
                :dropdownMatchSelectWidth="item.propsData.dropdownMatchSelectWidth"
                :placeholder="item.propsData.placeholder || 'Please input'"
                allowClear
                showSearch
                :paginationConfig="item.propsData.paginationConfig"
                :props="item.propsData.selectProps"
              />
            </template>
          </a-col>
        </a-row>
        <div v-else>
          <a-col :span="24">
            <div v-if="['in', 'not in', '=', 'not ='].includes(item.operatorOptions.operator)">
              <template v-if="item.operatorOptions?.type === 'datePicker'">
                <fl-date
                  v-bind="item.propsData"
                  v-model="item.propsData.value"
                  :format="item.propsData.format"
                  @change="(date) => onDateChange(date, index)"
                />
              </template>

              <template v-else-if="item.operatorOptions?.type === 'input' && ['=', 'not ='].includes(item.operatorOptions.operator)">
                <fl-auto-complete
                  v-bind="item.propsData"
                  v-model="item.propsData.value"
                  ref="selectTableRefs"
                  :customeRender="item.propsData.customeRender"
                  :defaultActiveFirstOption="defaultActiveFirstOption"
                  :columns="item.propsData.columns"
                  :primaryKey="item.propsData.primaryKey"
                  :options="item.propsData.options"
                  :dropdownMatchSelectWidth="item.propsData.dropdownMatchSelectWidth"
                  :placeholder="item.propsData.placeholder || 'Please input'"
                  allowClear
                  showSearch
                  :paginationConfig="item.propsData.paginationConfig"
                  :props="item.propsData.selectProps"
                />
              </template>
              <template v-else-if="item.operatorOptions?.type === 'inputTable' && ['='].includes(item.operatorOptions.operator)">
                <fl-autoComplete-table
                  v-bind="item.propsData"
                  v-if="item.propsData.request"
                  v-model="item.propsData.value"
                  :columns="item.propsData.columns"
                  :request="item.propsData.request"
                  :param="item.propsData.selectParam"
                  :primaryKey="item.propsData.primaryKey"
                  :customeRender="item.propsData.customeRender"
                  :focusOnload="item.propsData.focusOnload"
                  :colorMode="form.colorMode"
                  :defaultActiveFirstOption="defaultActiveFirstOption"
                  :dropdownMatchSelectWidth="item.propsData.dropdownMatchSelectWidth"
                  placeholder="Please input"
                  allowClear
                  showSearch
                  :props="item.propsData.selectProps"
                  :paginationConfig="item.propsData.paginationConfig"
                  :popupClassName="item.propsData.popupClassName || ''"
                  :getPopupContainer="item.propsData.getPopupContainer"
                />
              </template>
              <template v-else>
                <fl-select-table
                  v-bind="item.propsData"
                  v-if="item.propsData.request"
                  ref="selectTableRefs"
                  :mode="['=', 'not ='].includes(item.operatorOptions.operator) ? '' : 'multiple'"
                  v-model="item.propsData.value"
                  showSearch
                  allowClear
                  :filter-option="false"
                  :defaultActiveFirstOption="defaultActiveFirstOption"
                  :fieldNames="item.propsData.fieldNames"
                  :optionLabelProp="item.propsData.optionLabelProp"
                  :dropdownMatchSelectWidth="item.propsData.dropdownMatchSelectWidth"
                  :customeRender="item.propsData.customeRender"
                  :focusOnload="item.propsData.focusOnload"
                  :colorMode="form.colorMode"
                  :isShowSubTitle="item.propsData.isShowSubTitle"
                  :columns="item.propsData.columns"
                  :request="item.propsData.request"
                  :param="item.propsData.selectParam"
                  :props="item.propsData.selectProps"
                  :paginationConfig="item.propsData.paginationConfig"
                  :placeholder="item.propsData.placeholder || 'Please select'"
                  :popupClassName="item.propsData.popupClassName || ''"
                  :getPopupContainer="item.propsData.getPopupContainer"
                  @blur="(val) => onBlur(val, index)"
                />
                <fl-select
                  v-else
                  v-bind="item.propsData"
                  :mode="['=', 'not ='].includes(item.operatorOptions.operator) ? '' : 'multiple'"
                  v-model="item.propsData.value"
                  showSearch
                  allowClear
                  :fieldNames="item.propsData.fieldNames"
                  :defaultActiveFirstOption="defaultActiveFirstOption"
                  :optionLabelProp="item.propsData.optionLabelProp"
                  :dropdownMatchSelectWidth="item.propsData.dropdownMatchSelectWidth"
                  :customeRender="item.propsData.customeRender"
                  :isShowSubTitle="item.propsData.isShowSubTitle"
                  :columns="item.propsData.columns"
                  :options="item.propsData.options"
                  :props="item.propsData.selectProps"
                  :paginationConfig="item.propsData.paginationConfig"
                  :popupClassName="item.propsData.popupClassName || ''"
                  :placeholder="item.propsData.placeholder || 'Please select'"
                  :getPopupContainer="item.propsData.getPopupContainer"
                  @blur="(val) => onBlur(val, index)"
                />
              </template>
            </div>
            <div v-else-if="['begins with', 'contains', 'ends with'].includes(item.operatorOptions.operator)">
              <fl-autoComplete-table
                v-bind="item.propsData"
                v-if="item.propsData.request"
                v-model="item.propsData.value"
                :columns="item.propsData.columns"
                :request="item.propsData.request"
                :param="item.propsData.selectParam"
                :primaryKey="item.propsData.primaryKey"
                :customeRender="item.propsData.customeRender"
                :focusOnload="item.propsData.focusOnload"
                :colorMode="form.colorMode"
                :placeholder="item.propsData.placeholder || 'Please input'"
                :dropdownMatchSelectWidth="item.propsData.dropdownMatchSelectWidth"
                :defaultActiveFirstOption="defaultActiveFirstOption"
                allowClear
                showSearch
                :paginationConfig="item.propsData.paginationConfig"
                :props="item.propsData.selectProps"
                :getPopupContainer="item.propsData.getPopupContainer"
              />
              <fl-auto-complete
                v-else
                v-bind="item.propsData"
                v-model="item.propsData.value"
                ref="selectTableRefs"
                :customeRender="item.propsData.customeRender"
                :defaultActiveFirstOption="defaultActiveFirstOption"
                :columns="item.propsData.columns"
                :primaryKey="item.propsData.primaryKey"
                :options="item.propsData.options"
                :dropdownMatchSelectWidth="item.propsData.dropdownMatchSelectWidth"
                :placeholder="item.propsData.placeholder || 'Please input'"
                allowClear
                showSearch
                :paginationConfig="item.propsData.paginationConfig"
                :props="item.propsData.selectProps"
              />
            </div>
            <fl-date
              v-else-if="['from', 'to'].includes(item.operatorOptions.operator)"
              :colorMode="form.colorMode"
              v-model="item.propsData.value"
              v-bind="item.propsData"
              :format="item.propsData.format"
              @change="(date) => onDateChange(date, index)"
            />
            <template
              v-else-if="item.operatorOptions?.type === 'cockpick-input' && item.operatorOptions.operator !== 'between'"
            >
              <fl-auto-complete
                v-bind="item.propsData"
                v-model="item.propsData.value"
                ref="selectTableRefs"
                :customeRender="item.propsData.customeRender"
                :defaultActiveFirstOption="defaultActiveFirstOption"
                :columns="item.propsData.columns"
                :primaryKey="item.propsData.primaryKey"
                :options="item.propsData.options"
                :dropdownMatchSelectWidth="item.propsData.dropdownMatchSelectWidth"
                :placeholder="item.propsData.placeholder || 'Please input'"
                allowClear
                showSearch
                :paginationConfig="item.propsData.paginationConfig"
                :props="item.propsData.selectProps"
              />
            </template>
            <template v-else-if="item.operatorOptions.operator === 'between'">
              <fl-number-range
                v-if="item.operatorOptions.type && (item.operatorOptions.type === 'number-range'||item.operatorOptions.type === 'cockpick-input')"
                v-model="item.propsData.value"
              />
              <fl-date v-else dateType="rangePicker" v-bind="item.propsData" v-model="item.propsData.value" :format="item.propsData.format" :colorMode="form.colorMode" />
            </template>
          </a-col>
        </div>
      </a-form-item>
      <slot name="form-bottom"></slot>
    </a-form>
  </div>
</template>

<script lang="ts">
import createComponent from '../../../utils/create';
import { useNamespace, useAttrs } from '../../../hooks';
import { FormProps } from './form';
import { SelectTable } from '../../select-table';
import { Select } from '../../select';
import { AutoCompleteTable } from '../../auto-complete-table';
import { AutoComplete } from '../../auto-complete';
import { Dropdown } from '../../dropdown';
import { NumberRange } from '../../number-range/index';
import { Date } from '../../date';
const { create } = createComponent('Form');
import { Icon } from '../../icon';
import { Form, FormItem, Tooltip, Row, Col } from 'ant-design-vue';
import { ref, nextTick ,onMounted, onUnmounted} from 'vue';

export default create({
  props: FormProps,
  components: {
    [SelectTable.name]: SelectTable,
    [Select.name]: Select,
    [AutoCompleteTable.name]: AutoCompleteTable,
    [AutoComplete.name]: AutoComplete,
    [Dropdown.name]: Dropdown,
    [Icon.name]: Icon,
    [Date.name]: Date,
    [Form.name as string]: Form,
    [FormItem.name as string]: FormItem,
    [Tooltip.name as string]: Tooltip,
    [Row.name as string]: Row,
    [Col.name as string]: Col,
    [NumberRange.name]: NumberRange
  },
  emits: ['update:form'],
  setup(props, { emit, expose }) {
    const formRefBox = ref(null);
    const ns = useNamespace('form');
    const attrs = useAttrs();
    const formRef = ref();
    const selectTableRefs = ref([]);

    const handleChange = (i: number, operator: string) => {
      const form = { ...props.form };
      // let dataValue;
      // if (['=', 'not =', 'begins with', 'contains', 'ends with', 'from', 'to'].includes(operator)) {
      //   dataValue = undefined;
      // } else if (['in', 'not in', 'between'].includes(operator)) {
      //   dataValue = [];
      // }
      form.controls[i].propsData.value = []; // dataValue;
      emit('update:form', form);
    };

    // 在 setup() 函数中添加：
    const checkEllipsis = () => {
      nextTick(() => {
        document.querySelectorAll('.item-label-operator span').forEach(span => {
          if (span.offsetWidth < span.scrollWidth) {
            span.classList.add('ellipsis');
            span.setAttribute('data-text', span.textContent || '');
          } else {
            span.classList.remove('ellipsis');
            span.removeAttribute('data-text');
          }
        });
      });
    };

    // 在 onMounted 中调用
    onMounted(() => {
      checkEllipsis();

      // 如果需要响应式检测，可以添加 ResizeObserver
      const observer = new ResizeObserver(checkEllipsis);
      document.querySelectorAll('.item-label-operator').forEach(el => {
        observer.observe(el);
      });

      // 记得在组件卸载时取消观察
      onUnmounted(() => {
        observer.disconnect();
      });
    });
    const onDateChange = (date: string, i: number) => {
      const form = { ...props.form };
      form.controls[i].propsData.value = date;
      emit('update:form', form);
    };
    const onBlur = (e, i) => {
      nextTick(() => {
        const doms = document.querySelector(`#form_controls_${i}_propsData_value`);
        if (doms && doms.value) {
          nextTick(() => {
            doms.value = undefined;
          });
        }
      });
    };

    expose({ formRef, formRefBox, selectTableRefs });
    return {
      formRefBox,
      ns,
      attrs,
      handleChange,
      onDateChange,
      formRef,
      selectTableRefs,
      onBlur
    };
  }
});
</script>
<style lang="scss" scoped>
.fl-form {
  padding: 0 16px;
}
.form-list {
  :deep(.iflorens-ui-col) {
    padding: 0;
  }
  :deep(.iflorens-ui-form-item-label label) {
    display: inline-flex;
    width: 100%;
    justify-content: space-between;
    > span {
      display: inline-block;
      width: 50%;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
}
.required-icon {
  color: #e20100;
  display: inline !important;
}
.item-label-operator {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
  span {
    display: inline-block;
    // width: 48%;
    flex: 1;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    &.ellipsis:hover::after {
      content: attr(data-text);
      position: absolute;
      left: 0;
      top: 30px;
      background: #666;
      color: white;
      padding: 5px;
      border-radius: 3px;
      white-space: normal;
      z-index: 10;
      width: max-content;
      max-width: 200px;
      cursor: pointer;
    }
  }
}
.item-label-operator-darkBlue{
  span{
    color: #fff;
  }
  :deep(.fl-dropdown){
    background-color: transparent !important;
    color: #fff !important;
  }
  :deep(.iflorens-ui-dropdown-open .icon-box){
    background: #E8F0FF !important;
  }
  :deep(.fl-icon){
    color: #fff !important;
    border: none !important;
  }
}
:deep(.fl-dropdown) {
  width: 120px;
  margin-right: 10px;
  margin-left: 4px;
}
:deep(.dropdown-card) {
  margin: 0;
}
:deep(.fl-icon) {
  font-size: 14px !important;
  // margin-left: 8px;
}
:deep(.iflorens-ui-form-item) {
  margin-bottom: 14px;
}
:deep(.iflorens-ui-form-item-label > label::after) {
  content: '';
}
:deep(.iflorens-ui-row) {
  align-items: baseline;
}
:deep(.iflorens-ui-form-item-explain) {
  padding-left: 130px;
}
</style>
