## Tag

### 基础使用

```vue demo
<template>
  <div class="tags-box" style="display:flex;flex-wrap: wrap;gap: 5px;">
    <fl-tag bordered color="warning" closable>
        <template #icon>
          <ExclamationCircleFilled />
        </template>
        <template #closeIcon>
          <CloseOutlined />
        </template>
        Risk Content
    </fl-tag>
    <fl-tag bordered color="processing" closable>
        <template #icon>
          <InfoCircleOutlined />
        </template>
        Information Content
    </fl-tag>
    <fl-tag bordered color="error">
        <template #icon>
        <CloseCircleOutlined />
        <CloseCircleFilled />
        </template>
        Information Content
    </fl-tag>
    <fl-tag color="default" >default</fl-tag>
    <fl-tag color="processing">processing</fl-tag>
    <fl-tag color="error" >error</fl-tag>
    <fl-tag color="warning" >warning</fl-tag>
    <fl-tag color="success" >success</fl-tag>
    <fl-tag color="cyan" >cyan</fl-tag>
    <fl-tag color="purple" >purple</fl-tag>
    <fl-tag color="magenta" >magenta</fl-tag>
    <fl-tag color="geekblue" >Florens Blue</fl-tag> 
    <fl-tag color="default" :bordered="false">default</fl-tag>
    <fl-tag color="processing" :bordered="false">processing</fl-tag>
    <fl-tag color="error" :bordered="false">error</fl-tag>
    <fl-tag color="warning" :bordered="false">warning</fl-tag>
    <fl-tag color="success" :bordered="false">success</fl-tag>
    <fl-tag color="cyan" :bordered="false">cyan</fl-tag>
    <fl-tag color="purple" :bordered="false">purple</fl-tag>
    <fl-tag color="magenta" :bordered="false">magenta</fl-tag>
    <fl-tag color="geekblue" :bordered="false">Florens Blue</fl-tag>
  </div>
</template>

<script lang="ts">
import { ref  } from 'vue'
import { 
  ExclamationCircleFilled,
  CloseOutlined,
  InfoCircleOutlined,
  CloseCircleOutlined,
  CloseCircleFilled
  } from '@ant-design/icons-vue'
export default {
  components:{
    ExclamationCircleFilled,
    CloseOutlined,
    InfoCircleOutlined,
    CloseCircleOutlined,
    CloseCircleFilled
  },
  setup() {
    return {

    }
  },
};
</script>

```

进行标记和分类的小标签。

## 何时使用

- 用于标记事物的属性和维度。
- 进行分类。

## API

### Tag

| 参数      | 说明             | 类型          | 默认值 | 版本  |
| --------- | ---------------- | ------------- | ------ | ----- |
| closable  | 标签是否可以关闭 | boolean       | false  |       |
| closeIcon | 自定义关闭按钮   | VNode \| slot | -      | 2.0.0 |
| color     | 标签色           | string        | -      |       |
| icon      | 设置图标         | VNode \| slot | -      | 2.0.0 |
| bordered  | 是否有边框       | boolean       | `true` | 4.x   |

### 事件

| 事件名称 | 说明         | 回调参数    |
| -------- | ------------ | ----------- |
| close    | 关闭时的回调 | (e) => void |

### Tag.CheckableTag

| 参数             | 说明               | 类型    | 默认值 |
| ---------------- | ------------------ | ------- | ------ |
| checked(v-model) | 设置标签的选中状态 | boolean | false  |

### 事件

| 事件名称 | 说明                 | 回调参数          |
| -------- | -------------------- | ----------------- |
| change   | 点击标签时触发的回调 | (checked) => void |
