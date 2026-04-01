## Message 消息提示

### 基本用法
```vue demo
<template>
  <fl-space>
    <fl-button @click="showSuccess">警告提示</fl-button>
    <fl-button @click="showError">错误提示</fl-button>
  </fl-space>
</template>

<script setup>
import { getCurrentInstance } from 'vue';

const { proxy } = getCurrentInstance();

const showSuccess = () => {
  proxy.$message.warning( '告警信息', 0);// 手动关闭
};

const showError = () => {
  proxy.$message.error('发生错误', 0); // 手动关闭
};
</script>