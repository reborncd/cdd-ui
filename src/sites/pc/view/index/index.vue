<template>
  <a-layout class="doc-content-wapper">
    <div class="doc-aside-wapper">
      <div class="doc-logo">
        <img class="logo" :src="logo" alt="">
      </div>
      <div class="flex-1">
        <fl-scroll ref="navScrollbarRef" class="doc-sroll-aside-height" :native="true" trigger="none" direction="y">
          <doc-nav></doc-nav>
        </fl-scroll>
      </div>
    </div>
    <a-layout style="flex: 1; overflow: hidden;">
      <a-layout-header class="doc-header-wapper">
        <doc-header></doc-header>
      </a-layout-header>
      <a-layout-content class="doc-main-wapper">
        <fl-scroll  ref="mainScrollbarRef" class="doc-sroll-main-height" :native="true" trigger="none" direction="y">
          <div class="doc-content">
            <div class="doc-content-document">
              <router-view />
            </div>
          </div>
        </fl-scroll>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from '@/sites/pc/components/header.vue';
import Nav from '@/sites/pc/components/nav.vue';
import logo from '../../../assets/images/logo.jpg'
import { Layout, LayoutContent, LayoutHeader } from 'ant-design-vue'

export default defineComponent({
  name: 'Index',
  components: {
    [Header.name as string]: Header,
    [Nav.name as string]: Nav,
    [Layout.name as string]: Layout,
    [LayoutContent.name as string]: LayoutContent,
    [LayoutHeader.name as string]: LayoutHeader
  },
  setup() {
    return {
      logo
    }
  }
});
</script>

<style lang="scss" scoped>
.doc-content-wapper {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: row;
  .doc-aside-wapper {
    width: 245px !important;
  }
}
.doc-logo {
  font-size: 24px;
  font-weight: bold;
}
</style>