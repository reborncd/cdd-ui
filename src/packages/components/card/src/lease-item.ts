import { PropType } from 'vue';
import { buildProps } from '../../../utils/props';

export declare interface TreeNodeData {
  [key: string]: any;
}

export declare interface CardOptionProps {
  label?: string | ((data: TreeNodeData, node: Node) => string);
  value?: string | ((data: TreeNodeData, node: Node) => string);
  date?: string | ((data: TreeNodeData, node: Node) => string);
}

export declare interface CardComponentProps {
  props: CardOptionProps;
}

export const LeaseItemProps = buildProps({
  props: {
    type: Object as PropType<CardComponentProps['props']>,
    default: () => ({
      label: 'label',
      value: 'value'
    })
  },
  title: {
    type: String,
    default: ''
  },
  itemStyle: {
    type: [String, Object],
    default: ''
  },
  columns: {
    type: Array,
    default: () => []
  },
  data: {
    type: [Array, Object],
    default: () => []
  },
  gutter: {
    type: [Number, Array],
    default: 24
  },
  span: {
    type: Number,
    default: 24
  },
  textDefault: {
    type: String,
    default: '-'
  }
});
