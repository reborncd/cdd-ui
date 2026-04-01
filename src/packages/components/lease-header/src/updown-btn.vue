<template>
  <div class="updown-btn">
    <a-button-group class="updown-btn-group">
      <a-tooltip>
        <template #title v-if="previousText"> {{ previousText }} </template>
        <a-button :disabled="upDisabled" @click="refresh('up')" class="left">
          <LeftOutlined :style="{ color: '#3E54AD' }" />
        </a-button>
      </a-tooltip>
      <a-tooltip>
        <template #title v-if="nextText"> {{ nextText }} </template>
        <a-button :disabled="downDisabled" @click="refresh('down')" class="right">
          <RightOutlined :style="{ color: '#3E54AD' }" />
        </a-button>
      </a-tooltip>
    </a-button-group>
  </div>
</template>

<script lang="ts">
import { RightOutlined, LeftOutlined } from '@ant-design/icons-vue';
import createComponent from '../../../utils/create';
const { create } = createComponent('UpdownBtn');
import { Button, ButtonGroup, Tooltip } from 'ant-design-vue';

export default create({
  props: {
    upDisabled: {
      type: Boolean,
      default: false
    },
    downDisabled: {
      type: Boolean,
      default: false
    },
    previousText: {
      type: String,
      default: ''
    },
    nextText: {
      type: String,
      default: ''
    }
  },
  components: {
    RightOutlined,
    LeftOutlined,
    [Button.name as string]: Button,
    [ButtonGroup.name as string]: ButtonGroup,
    [Tooltip.name as string]: Tooltip
  },
  emits: ['btnClick'],
  setup(props, { emit, slots }) {
    const refresh = (pos: string) => {
      emit('btnClick', pos);
    };
    return {
      refresh
    };
  }
});
</script>

<style lang="scss" scoped>
.updown-btn {
  .updown-btn-group {
    display: inline-flex;
  }
  .iflorens-ui-btn {
    width: 32px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  :deep(.left) {
    border-top-left-radius: 4px !important;
    border-bottom-left-radius: 4px !important;
    border-top-right-radius: 0px !important;
    border-bottom-right-radius: 0px !important;
  }

  :deep(.right) {
    border-top-left-radius: 0px !important;
    border-bottom-left-radius: 0px !important;
    border-top-right-radius: 4px !important;
    border-bottom-right-radius: 4px !important;
  }
}
</style>
