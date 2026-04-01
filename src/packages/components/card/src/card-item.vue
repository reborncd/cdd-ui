<!--
 * @Author: lingongbing
 * @Date: 2024-12-09 14:01:16
 * @LastEditors: carpediems-MacBook-Pro.local
 * @LastEditTime: 2025-12-12 15:56:58
 * @FilePath: /iflorens-web-ui/src/packages/components/card/src/card-item.vue
 * @Description:
-->
<template>
  <div :class="ns.b()" :style="itemStyle">
    <a-row class="basic-info-row" :gutter="gutter">
      <a-col
        :class="{
          'general-col-cnt': true,
          'general-col-cnt-on-end': arrange === 'on-end' ? true : false
        }"
        v-for="(item, index) in columns"
        :span="item.span || span"
        :key="index"
      >
        <div class="general-list-label">
          <slot v-if="item.labelSlot" :name="item.labelSlot" :value="getSlotValue(index, isObject(data) ? data : getArrValue(item))" :label="item[props.label] || item.label">
          </slot>
          <template v-else>
            {{ item[props.label] || item.label }}
          </template>
        </div>
        <template v-if="!item.noEmptyValue">
          <div v-if="isObject(data)" class="general-list-value">{{ data[item.prop] || textDefault }}</div>
          <div v-else class="general-list-value">{{ getArrValue(item)[item.prop] || textDefault }}</div>
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
import { CardItemProps } from './card-item';
const { create } = createComponent('CardItem');
import { Row, Col } from 'ant-design-vue';

export default create({
  props: CardItemProps,
  components: {
    [Row.name as string]: Row,
    [Col.name as string]: Col
  },
  setup(props, { emit }) {
    const ns = useNamespace('card-item');
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
