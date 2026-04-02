<template>
  <div :class="ns.b()">
    <a-date-picker
      v-if="!dateType&&!colorMode"
      v-bind="attrs"
      v-model:value="dateValue"
      :style="dateStyle"
      :show-time="typeof showTime === 'string' ? { format: showTime } : showTime"
      :format="format"
      @change="onChange"
      @focus="onFocus"
      @blur="onBlur"
      :popupClassName="popupClassName"
      :disabledDate="disabledDate"
      :picker="picker"
    />
    <a-date-picker
        v-if="!dateType&&colorMode==='darkBlue'"
        class="darkBlueDatePicker"
        v-bind="attrs"
        v-model:value="dateValue"
        :style="dateStyle"
        :show-time="typeof showTime === 'string' ? { format: showTime } : showTime"
        :format="format"
        @change="onChange"
        @focus="onFocus"
        @blur="onBlur"
        :popupClassName="'darkBlueDatePickerPopupClassName'"
        :disabledDate="disabledDate"
        :picker="picker"
      />
    <div
      ref="rangePicker"
      v-if="dateType == 'rangePicker'"
      class="range-picker"
      :class="{ 'range-picker-focus': dateBarVisible, 'darkBlueRangePicker': colorMode==='darkBlue' }"
    >
      <a-date-picker
        v-if="!colorMode"
        v-bind="attrs"
        :show-time="typeof showTime === 'string' ? { format: showTime } : showTime"
        :format="format"
        suffixIcon=" "
        ref="fromDateRef"
        v-model:value="fromDate"
        :style="dateStyle"
        :disabledDate="disabledFromDateCustom?disabledFromDateCustom:disabledFromDate"
        @change="(date, dateString) => onChange(date, dateString, 'fromDate')"
        @focus="(e) => onDateFocus(e, 'fromDate')"
        @blur="(e) => onDateBlur(e, 'fromDate')"
        placeholder="From Date"
        :popupClassName="popupClassName"
        :picker="picker"
      />
      <a-date-picker
        v-if="colorMode==='darkBlue'"
        v-bind="attrs"
        :show-time="typeof showTime === 'string' ? { format: showTime } : showTime"
        :format="format"
        suffixIcon=" "
        ref="fromDateRef"
        v-model:value="fromDate"
        :style="dateStyle"
        :disabledDate="disabledFromDateCustom?disabledFromDateCustom:disabledFromDate"
        @change="(date, dateString) => onChange(date, dateString, 'fromDate')"
        @focus="(e) => onDateFocus(e, 'fromDate')"
        @blur="(e) => onDateBlur(e, 'fromDate')"
        placeholder="From Date"
        :popupClassName="'darkBlueDatePickerPopupClassName'"
        :picker="picker"
      />
      <cdd-icon type="iflorens-SwapRight" />
      <a-date-picker
        v-if="!colorMode"
        v-bind="attrs"
        :show-time="typeof showTime === 'string' ? { format: showTime } : showTime"
        :format="format"
        placeholder="To Date"
        ref="toDateRef"
        class="date-picker"
        v-model:value="toDate"
        :style="dateStyle"
        :disabledDate="disabledToDateCustom?disabledToDateCustom:disabledToDate"
        @change="(date, dateString) => onChange(date, dateString, 'to')"
        @focus="(e) => onDateFocus(e, 'toDate')"
        @blur="(e) => onDateBlur(e, 'toDate')"
        @openChange="openChange"
         :popupClassName="popupClassName"
        :picker="picker"
      />
      <a-date-picker
        v-if="colorMode==='darkBlue'"
        v-bind="attrs"
        :show-time="typeof showTime === 'string' ? { format: showTime } : showTime"
        :format="format"
        placeholder="To Date"
        ref="toDateRef"
        class="date-picker"
        v-model:value="toDate"
        :style="dateStyle"
        :disabledDate="disabledToDateCustom?disabledToDateCustom:disabledToDate"
        @change="(date, dateString) => onChange(date, dateString, 'to')"
        @focus="(e) => onDateFocus(e, 'toDate')"
        @blur="(e) => onDateBlur(e, 'toDate')"
        @openChange="openChange"
         :popupClassName="'darkBlueDatePickerPopupClassName'"
        :picker="picker"
      />
      <div v-if="dateBarVisible" :class="`${ns.b()}-picker-active-bar`" :style="dateBarActiveStyle"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, Ref, watch, onMounted, onBeforeUnmount } from 'vue';
import createComponent from '../../../utils/create';
import { useNamespace, useAttrs } from '../../../hooks';
import { DatePicker } from 'ant-design-vue';
const { create } = createComponent('Date');
import { DateProps } from './date';
import dayjs, { Dayjs } from 'dayjs';
import { Icon } from '../../icon';
export default create({
  props: DateProps,
  emits: ['update:modelValue', 'change', 'focus', 'blur'],
  components: {
    [Icon.name]: Icon,
    [DatePicker.name as string]: DatePicker
  },
  setup(props, { emit }) {
    const ns = useNamespace('date');
    const attrs = useAttrs();
    const dateBarVisible = ref(false);
    const dateBarActiveStyle = ref({});
    const rangePicker: Ref<HTMLInputElement | null> = ref(null);
    const fromDateRef: Ref<HTMLInputElement | null> = ref(null);
    const toDateRef: Ref<HTMLInputElement | null> = ref(null);
    const dateValue = ref();
    const fromDate = ref();
    const toDate = ref();
    const toDateLeftPos = ref('');
    // 当前聚焦的类型 是开始日期，还是结束日期
    const focusType = ref('');
    // 开始日期禁用设置
    const disabledFromDate = (current: Dayjs) => {
      if (!toDate.value) return false;
      // return current && current > dayjs(fromDate.value);
      // 如果是月份选择器，则禁用小于结束日期的月份
      if (props.format === 'YYYY-MM' && (attrs.picker === 'month' || props.picker === 'month')) {
        const endDate = dayjs(toDate.value).startOf('month');
        const currentDate = dayjs(current).startOf('month');
        return currentDate.isAfter(endDate);
      }
      // 比较完整日期，包括年、月、日
      return current && current > dayjs(toDate.value);
    };
    // 结束日期禁用设置
    const disabledToDate = (current: Dayjs) => {
      if (!fromDate.value) return false;
      return current && current < dayjs(fromDate.value);
    };
    // 日期选择
    const onChange = (date: Dayjs | string, dateString: string, type: string) => {
      if(typeof props.format === 'function'){
if (type === 'fromDate') fromDate.value = date || '';
      if (type === 'toDate') toDate.value = date || '';
      emit(
        'update:modelValue',
        !type ? date : [fromDate.value, toDate.value]
      );
      dateBarVisible.value = false;
       emit('change', date);
      }else{
console.log('dateString', dateString, date, type);
      const format = typeof props.format === 'string' ? props.format : props.format?.[0] || 'YYYY-MM-DD';
      const dateValue = !dateString ? '' : dayjs(dateString, format);
      if (type === 'fromDate') fromDate.value = dateValue || '';
      if (type === 'toDate') toDate.value = dateValue || '';
      const formattedFromDate = fromDate.value ? dayjs(fromDate.value).format(format) : '';
      const formattedToDate = toDate.value ? dayjs(toDate.value).format(format) : '';
      emit(
        'update:modelValue',
        !type ? (dateValue ? dayjs(dateString).format(format) : '') : [formattedFromDate, formattedToDate]
      );
      dateBarVisible.value = false;
      type !== '' && type === 'fromDate' ? fromDateRef.value?.blur() : toDateRef.value?.blur();
      emit('change', dateString);

      }

    };
    // 聚焦
    const onDateFocus = (e: FocusEvent, type: string) => {
      focusType.value = type;
      dateBarActiveStyle.value = type === 'fromDate' ? { left: '10px' } : { left: toDateLeftPos.value };
      dateBarVisible.value = true;
      emit('focus', { e, type });
    };
    // 失焦
    const onDateBlur = (e: MouseEvent, type: string) => {
      dateBarVisible.value = false;
      dateBarActiveStyle.value = { left: 0 };
      emit('blur', { e, type });
    };
    const onFocus = (e: FocusEvent) => {
      emit('focus', e);
    };
    const onBlur = (e: MouseEvent) => {
      emit('blur', e);
    };
    const openChange = (value: boolean) => {
      if (value) getPosition();
    };
    watch(
      () => props.modelValue as any,
      (date: string | [Dayjs, Dayjs]) => {
        const format = typeof props.format === 'string' ? props.format : props.format?.[0] || 'YYYY-MM-DD';
        if (!props.dateType) {
          // 如果时间解析错误，则清空
          if(isNaN(dayjs(date, format))) {
            dateValue.value = '';
            return
          }
          // 日期选择
          dateValue.value = !Array.isArray(date) ? (date ? dayjs(date, format) : '') : (date?.[0] ? dayjs(date?.[0], format) : '');
        }
        if (date && props.dateType === 'rangePicker') {
          // 日期区间选择
          const [from, to] = date;
          fromDate.value = from ? dayjs(from, format) : '';
          toDate.value = to ? dayjs(to, format) : '';
          // 如果时间解析错误，则清空
          if(isNaN(dayjs(from, format))) {
            fromDate.value = '';
          }
          if(isNaN(dayjs(to, format))) {
            toDate.value = '';
          }
        }
      },
      { immediate: true }
    );
    const getPosition = () => {
      if (rangePicker?.value) {
        const { width } = rangePicker.value.getBoundingClientRect();
        toDateLeftPos.value = width / 2 + 10 + 'px';
      }
    };
    onMounted(() => {
      getPosition();
    });
    window.addEventListener('resize', () => {
      getPosition();
      if (focusType.value === 'toDate') {
        dateBarActiveStyle.value = { left: toDateLeftPos.value };
      }
    });
    onBeforeUnmount(() => {
      window.removeEventListener('size', () => {});
    });

    return {
      ns,
      attrs,
      dateBarVisible,
      dateBarActiveStyle,
      rangePicker,
      fromDateRef,
      dateValue,
      toDateRef,
      fromDate,
      showTime: props.showTime,  // 添加这一行
      toDate,
      onChange,
      onDateFocus,
      onDateBlur,
      onFocus,
      onBlur,
      disabledFromDate,
      disabledToDate,
      openChange
    };
  }
});
</script>
<style lang="scss" scoped>
.range-picker {
  position: relative;
  :deep(.iflorens-ui-picker) {
    border: none;
    box-shadow: none;
  }
  .cdd-icon {
    color: var(--cdd-col-disabledtext);
    transform: translateX(-50%);
    margin: -2px;
  }
  .cdd-date-picker-active-bar {
    left: 0;
    width: 90px;
    height: 2px;
    position: absolute;
    bottom: -1px;
    transition: all 0.3s ease-out;
    pointer-events: none;
    border-radius: 2px 2px 0px 0px;
    background: var(--cdd-col-fblue5);
  }
}

.darkBlueRangePicker{
  background: transparent !important;
  color: #fff !important;
  :where(.iflorens-ui-picker){
		background: none !important;
		color: #fff !important;
	}
	:where(.range-picker .anticon){
		color: #fff !important;
	}
	:where(.iflorens-ui-picker-clear){
		background: none !important;
	}
	:where(.iflorens-ui-picker .iflorens-ui-picker-input >input){
		color: #fff !important;
	}
}

.darkBlueDatePicker{
  background: transparent !important;
  color: #fff !important;
  :where(.range-picker .anticon){
		color: #fff !important;
	}
	:where(.iflorens-ui-picker-clear){
		background: none !important;
    color: #fff !important;
	}
	:where(.iflorens-ui-picker .iflorens-ui-picker-input >input){
		color: #fff !important;
	}
}
</style>
<style lang="scss">
.iflorens-ui-picker-dropdown {
  .iflorens-ui-picker-cell-in-view.iflorens-ui-picker-cell-today .iflorens-ui-picker-cell-inner {
    &::before {
      border-color: var(--cdd-col-fblue5);
    }
  }
  .iflorens-ui-picker-today-btn {
    color: var(--cdd-col-fblue5);
  }
}
.darkBlueDatePickerPopupClassName{
  :where(.iflorens-ui-picker-dropdown .iflorens-ui-picker-panel-container){
    background: var(--cdd-col-fblue-dark) !important;
    color: #fff !important;
  }
  &.iflorens-ui-picker-dropdown {
		color: #fff;
		background: var(--cdd-col-fblue-dark);
	}
	th {
		color: #fff !important;
	}
	.iflorens-ui-picker-footer {
		display: none;
	}
	.iflorens-ui-picker-header {
		color: #fff;
		button {
			color: #fff;
		}
		button:hover {
			color: #fff;
		}
	}
	.iflorens-ui-picker-panel-container {
		background: var(--cdd-col-fblue-dark);
		.iflorens-ui-picker-cell-in-view {
			color: #fff;
			opacity: 1 !important;
		}
		.iflorens-ui-picker-cell {
			color: #fff;
			opacity: 0.45;
		}
	}
	.iflorens-ui-picker-cell-disabled {
		color: rgba(255, 255, 255, 0.45) !important;
		cursor: not-allowed !important;
		pointer-events: initial;
	}
}
</style>
