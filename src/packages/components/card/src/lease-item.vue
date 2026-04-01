<!--
 * @Author: 杨亚茹
 * @Date: 2024-12-09 14:01:16
 * @LastEditors: 杨亚茹
 * @LastEditTime: 2025-01-07 18:58:38
 * @FilePath: /iflorens-web-ui/src/packages/components/card/src/lease-item.vue
 * @Description: 
-->
<template>
  <div :class="ns.b()" :style="itemStyle">
    <div class="title">{{ title }}</div>
    <a-row class="basic-info-row" :gutter="gutter">
      <a-col
        :span="span"
        :class="{
          'general-col-cnt': true
        }"
        v-for="(item, index) in columns"
        :key="index"
      >
        <div class="general-list-label">{{ item[props.label] || item.label }}</div>
        <template v-if="!item.noEmptyValue">
          <div v-if="isObject(data)" class="general-list-value">
            <span class="value-text">{{ data[item.prop] || textDefault }}</span>
            <span class="value-date">{{ data[item.date] || textDefault }}</span>
          </div>
          <div v-else class="general-list-value">
            <span class="value-text">{{ getArrValue(item)[item.prop] || textDefault }}</span>
            <span class="value-date">{{ getArrValue(item)[item.date] || textDefault }}</span>
          </div>
        </template>
        <template v-else>
          <slot
            :name="item.prop || item.scope"
            :value="getSlotValue(index, isObject(data) ? data : getArrValue(item))"
          ></slot>
        </template>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import createComponent from '../../../utils/create';
import { useNamespace } from '../../../hooks';
import { LeaseItemProps } from './lease-item';
const { create } = createComponent('LeaseItem');
import { Row, Col } from 'ant-design-vue';

export default create({
  props: LeaseItemProps,
  components: {
    [Row.name as string]: Row,
    [Col.name as string]: Col
  },
  setup(props, { emit }) {
    const ns = useNamespace('lease-item');
    const { data } = props;

    const isObject = (obj: Object) => {
      return Object.prototype.toString.call(obj) === '[object Object]';
    };

    const getSlotValue = (index: number, data: any) => {
      return {
        $index: index,
        data
      };
    };

    const getArrValue = (item: any) => {
      let newData = JSON.parse(JSON.stringify(data));
      const arrData = newData.find((v: any) => {
        if (v && v.label && item.label == v.label) {
          return v;
        }
      });
      return arrData || {};
    };

    return {
      ns,
      isObject,
      getSlotValue,
      getArrValue
    };
  }
});
</script>
