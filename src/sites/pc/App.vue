<template>
  <cdd-config-provider :locale="enGb" :theme="themeData" prefix-cls="florens-ui">
    <router-view></router-view>
  </cdd-config-provider>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import enGb from 'ant-design-vue/locale/en_GB';
import { theme } from './theme/index';
export default defineComponent({
  name: 'app',
  setup() {
    return {
      enGb,
      themeData: theme
    };
  }
});
</script>

<style lang="scss"></style>
