import { Fragment, getCurrentInstance, h, nextTick, onMounted, onUpdated, provide, ref, renderSlot, watch } from 'vue';
import { isPromise, NOOP } from '@vue/shared';
import type { Component, ComponentInternalInstance, VNode, ExtractPropTypes, Ref } from 'vue';
import createComponent from '../../../utils/create';
import { buildProps, definePropType } from '../../../utils/props';
import TabNav from './tab-nav';
import { UPDATE_MODEL_EVENT, INPUT_EVENT } from '../../../constants/event';
import type { TabsPaneContext } from '../../../tokens/tabs';

import { tabsRootContextKey } from '../../../tokens/tabs';

export const tabsProps = buildProps({
  type: {
    type: String,
    values: ['card', 'border-card', ''],
    default: ''
  },
  activeName: {
    type: String,
    default: ''
  },
  closable: Boolean,
  addable: Boolean,
  modelValue: {
    type: [String, Number],
    default: ''
  },
  editable: Boolean,
  tabPosition: {
    type: String,
    values: ['top', 'right', 'bottom', 'left'],
    default: 'top'
  },
  isShowHeaderBoder: {
    type: Boolean,
    default: false
  },
  beforeLeave: {
    type: definePropType<
      (newTabName: string | number, oldTabName: string | number) => void | boolean | Promise<void | boolean>
    >(Function),
    default: () => true
  },
  stretch: Boolean
} as const);
export type TabsProps = ExtractPropTypes<typeof tabsProps>;
export const tabsEmits = {
  [UPDATE_MODEL_EVENT]: (tabName: string | number) => typeof tabName === 'string' || typeof tabName === 'number',
  [INPUT_EVENT]: (tabName: string | number) => typeof tabName === 'string' || typeof tabName === 'number',
  'tab-click': (pane: TabsPaneContext, ev: Event) => ev instanceof Event,
  edit: (paneName: string | number | null, action: 'remove' | 'add') => action === 'remove' || action === 'add',
  'tab-remove': (paneName: string | number) => typeof paneName === 'string' || typeof paneName === 'number',
  'tab-add': () => true
};

export type TabsEmits = typeof tabsEmits;

const getPaneInstanceFromSlot = (vnode: VNode, paneInstanceList: ComponentInternalInstance[] = []) => {
  const children = (vnode.children || []) as ArrayLike<VNode>;
  Array.from(children).forEach((node) => {
    let type = node.type;
    type = (type as Component).name || type;
    if (type === 'FlTabPane' && node.component) {
      paneInstanceList.push(node.component);
    } else if (type === Fragment || type === 'template') {
      getPaneInstanceFromSlot(node, paneInstanceList);
    }
  });
  return paneInstanceList;
};

const { create } = createComponent('Tabs');

export default create({
  props: tabsProps,
  emits: tabsEmits,
  setup(props, { emit, slots, expose }) {
    const instance = getCurrentInstance()!;
    const nav$ = ref<InstanceType<typeof TabNav>>();

    const panes: Ref<TabsPaneContext[]> = ref([]);
    const currentName = ref(props.modelValue || props.activeName || '0');

    const paneStatesMap: Record<number, TabsPaneContext> = {};

    const updatePaneInstances = (isForceUpdate = false) => {
      if (slots.default) {
        const children = instance.subTree.children as ArrayLike<VNode>;
        const content = Array.from(children).find(({ props }) => props?.class === 'fl-tabs__content');
        if (!content) return;

        const paneInstanceList: TabsPaneContext[] = getPaneInstanceFromSlot(content).map(
          (paneComponent) => paneStatesMap[paneComponent.uid]
        );

        const panesChanged = !(
          paneInstanceList.length === panes.value.length &&
          paneInstanceList.every((pane, index) => pane.uid === panes.value[index].uid)
        );

        if (isForceUpdate || panesChanged) {
          panes.value = paneInstanceList;
        }
      } else if (panes.value.length !== 0) {
        panes.value = [];
      }
    };

    const changeCurrentName = (value: string | number) => {
      currentName.value = value;
      emit(INPUT_EVENT, value);
      emit(UPDATE_MODEL_EVENT, value);
    };

    const setCurrentName = (value: string | number) => {
      // should do nothing.
      if (currentName.value === value) return;

      const canLeave = props.beforeLeave?.(value, currentName.value);
      if (isPromise(canLeave)) {
        canLeave.then(
          () => {
            changeCurrentName(value);

            // call exposed function, Vue doesn't support expose in typescript yet.
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            nav$.value?.removeFocus?.();
          },
          // ignore promise rejection in `before-leave` hook
          NOOP
        );
      } else if (canLeave !== false) {
        changeCurrentName(value);
      }
    };

    const handleTabClick = (tab: TabsPaneContext, tabName: string | number, event: Event) => {
      if (tab.props.disabled) return;
      setCurrentName(tabName);
      emit('tab-click', tab, event);
    };

    const handleTabRemove = (pane: TabsPaneContext, ev: Event) => {
      if (pane.props.disabled) return;
      ev.stopPropagation();
      emit('edit', pane.props.name, 'remove');
      emit('tab-remove', pane.props.name);
    };

    const handleTabAdd = () => {
      emit('edit', null, 'add');
      emit('tab-add');
    };

    onUpdated(() => updatePaneInstances());
    onMounted(() => updatePaneInstances());

    watch(
      () => props.activeName,
      (modelValue) => setCurrentName(modelValue)
    );

    watch(
      () => props.modelValue,
      (modelValue) => setCurrentName(modelValue)
    );

    watch(currentName, async () => {
      updatePaneInstances(true);
      await nextTick();
      await nav$.value?.$nextTick();

      // call exposed function, Vue doesn't support expose in typescript yet.
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-nocheck
      nav$.value?.scrollToActiveTab();
    });

    provide(tabsRootContextKey, {
      props,
      currentName,
      updatePaneState: (pane) => (paneStatesMap[pane.uid] = pane)
    });

    expose({
      currentName
    });
    return () => {
      const slotsLeft = slots['tabs-header-left'] ? h(slots['tabs-header-left']) : null;

      const slotsRight = slots['tabs-header-right'] ? h(slots['tabs-header-right']) : null;

      const header = h(
        'div',
        {
          class: [
            'fl-tabs__header',
            `is-${props.tabPosition}`,
            `${props.isShowHeaderBoder ? 'is-show-header-boder' : 'is-hide-header-boder'}`
          ]
        },
        [
          slotsLeft,
          h(TabNav, {
            currentName: currentName.value,
            editable: props.editable,
            type: props.type,
            panes: panes.value,
            stretch: props.stretch,
            ref: nav$,
            onTabClick: handleTabClick,
            onTabRemove: handleTabRemove
          }),
          slotsRight
        ]
      );

      const panels = h('div', { class: 'fl-tabs__content' }, [renderSlot(slots, 'default')]);

      return h(
        'div',
        {
          class: {
            'fl-tabs': true,
            'fl-tabs--card': props.type === 'card',
            [`fl-tabs--${props.tabPosition}`]: true,
            'fl-tabs--border-card': props.type === 'border-card'
          }
        },
        props.tabPosition !== 'bottom' ? [header, panels] : [panels, header]
      );
    };
  }
});
