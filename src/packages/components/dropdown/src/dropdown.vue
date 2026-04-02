<template>
  <!-- :open="isClickDown" -->
  <a-dropdown v-bind="attrs">
    <div
      :class="{
        [ns.b()]: true,
        'cdd-dropdown--card': type === 'card'
      }"
      @click="downClick"
    >
      <template v-if="!slots['default']">
        <div
          class="content"
          :style="{
            minWidth: minWidth
          }"
          >{{ modelValue }}</div
        >
        <!-- 'is-active': isClickDown && type === 'card' ? true : false -->
        <div
          :class="{
            'icon-box': true
          }"
        >
          <cdd-icon
            v-if="!(type === 'card' && options.length == 0)"
            type="iflorens-arrow-down-bold"
            :style="{
              fontSize: '14px',
              color: 'rgba(0, 0, 0, 0.85)'
            }"
          ></cdd-icon>
        </div>
      </template>
      <template v-else>
        <slot></slot>
      </template>
    </div>
    <template #overlay>
      <a-menu class="cdd-dropdown-ul" v-if="options.length > 0" v-model="isClickDown">
        <template v-if="isShowAll">
          <a-menu-item @click="liClick('All')"> All </a-menu-item>
          <a-menu-divider />
        </template>
        <a-menu-item
          :class="{
            'cdd-dropdown-li': true,
            'cdd-dropdown-li-active': item === modelValue ? true : false
          }"
          v-for="(item, index) in options"
          :key="item"
          @click="liClick(item)"
        >
          <div class="li-item">
            <span class="li-item-text">
              <cdd-tooltip-ellipsis
                v-if="dropdownWidth"
                :width="dropdownWidth + 'px'"
                :content="item"
                placement="topLeft"
                overlayClassName="resourceDesc"
                :tooltipTrigger="'hover'"
              >
              </cdd-tooltip-ellipsis>
              <span v-else>{{ item }}</span>
            </span>
            <a-popconfirm
              overlayClassName="cdd-dropdown-del"
              title="Are you sure you want to delete?"
              ok-text="Delete"
              cancel-text="Cancel"
              :okButtonProps="{ danger: true }"
              :icon="popconfirmIcon()"
              @confirm="
                (e) => {
                  delItem(e, index, item);
                }
              "
            >
              <cdd-icon
                type="iflorens-DeleteOutlined"
                v-if="isShowDelIcon"
                @click.stop="() => {}"
                style="color: red"
              ></cdd-icon>
            </a-popconfirm>
          </div>
        </a-menu-item>
      </a-menu>
      <!-- 没数据 -->
      <a-menu v-else-if="!options.length && showEmpty" class="cdd-dropdown-ul cdd-dropdown-no-data">
        <a-menu-item v-if="isShowAll" class="cdd-dropdown-li" @click="liClick('All')">
          <div>All</div>
          <a-menu-divider />
        </a-menu-item>
        <a-menu-item class="cdd-dropdown-li">
          <cdd-empty type="simpleImage" description="No Data" />
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script lang="ts">
import { h, ref, computed } from 'vue';
import { Icon } from '../../icon';
import { ExclamationCircleFilled } from '@ant-design/icons-vue';
import createComponent from '../../../utils/create';
import { useNamespace, useAttrs } from '../../../hooks';
import { DropdownProps } from './dropdown';
import { TooltipEllipsis } from '../../tooltip-ellipsis';
import { Empty } from '../../empty';
const { create } = createComponent('Dropdown');
import { Dropdown, Popconfirm, Menu, MenuItem, MenuDivider } from 'ant-design-vue';

export default create({
  components: {
    [Icon.name]: Icon,
    [Empty.name]: Empty,
    [String(Popconfirm.name)]: Popconfirm,
    [String(Dropdown.name)]: Dropdown,
    [String(Menu.name)]: Menu,
    [String(MenuItem.name)]: MenuItem,
    [String(MenuDivider.name)]: MenuDivider,
    [TooltipEllipsis.name]: TooltipEllipsis
  },
  props: DropdownProps,
  emits: ['update:modelValue', 'visibleChange', 'change', 'delete'],
  setup(props, { emit, slots }) {
    const ns = useNamespace('dropdown');
    const isClickDown = ref<boolean>(false);
    const attrs = useAttrs();
    // 当前选中的值
    const currentValue = computed({
      get: () => {
        return props.modelValue;
      },
      set: (val) => {
        return val;
      }
    });
    const getPopupContainer = (node: HTMLElement) => {
      return node;
    };
    const liClick = (v: string | number | undefined) => {
      if (currentValue.value === v) return;
      currentValue.value = v;
      emit('update:modelValue', v);
      emit('change', v);
    };

    document.body.addEventListener('click', () => {});

    const downClick = (e: MouseEvent) => {
      if (!props.isShowDown) {
        return;
      }
      // const downs = document.getElementsByClassName('cdd-dropdown')
      // for(let i = 0; i < downs.length; i++) {
      //   const node = downs[i] as HTMLElement
      //   const iconBox = node.getElementsByClassName('icon-box')[0] as HTMLElement
      //   if (iconBox) {
      //     iconBox.classList.remove('is-active')
      //   }
      // }
      // const dropdowns = document.getElementsByClassName('ant-dropdown')
      // for(let i = 0; i < dropdowns.length; i++) {
      //   const dropdownNode = dropdowns[i] as HTMLElement;
      //   dropdownNode.style.display = 'none'
      // }
      if (props.preventClick) {
        e.preventDefault();
        return;
      }
      isClickDown.value = !isClickDown.value;
      e.stopPropagation();
    };

    document.body.addEventListener('click', () => {
      isClickDown.value = false;
    });

    // 删除
    const delItem = (e: MouseEvent, index: number, item: string | number) => {
      // 如果外层做删除执行父方法进行操作
      if (props.delIconClickFun && typeof props.delIconClickFun == 'function') {
        props.delIconClickFun(index, item);
        return;
      }
      props.options.splice(index, 1);
      emit('delete', index, item);
      e.stopPropagation();
    };

    const popconfirmIcon = () => {
      return h(ExclamationCircleFilled, {
        style: {
          fontSize: '12px',
          color: 'red'
        }
      });
    };

    return {
      slots,
      ns,
      getPopupContainer,
      attrs,
      liClick,
      downClick,
      props,
      isClickDown,
      delItem,
      popconfirmIcon
    };
  }
});
</script>

<style lang="scss">
.iflorens-ui-btn.iflorens-ui-btn-sm {
  height: 24px;
  padding: 0px 7px;
  border-radius: 4px;
  line-height: 24px;
}
</style>
