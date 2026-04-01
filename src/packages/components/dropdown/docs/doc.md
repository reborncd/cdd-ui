## Dropdown


### 基础用法

```vue demo
<template>
    <div style="width: 80px">
      <fl-dropdown v-model="value" :options="options" :trigger="['click']" :isShowDelIcon="true" ></fl-dropdown>
      <!-- <div @click="ceshi">点击</div> -->
    </div>
</template>
<script lang="ts">
import { ref, h } from "vue"
export default {
  setup() {
    const value = ref("All")
    const options = ref([
        'in',
        'or',
        'options',
        'in',
        'or',
        'options',
        'in',
        'or',
        'options',
        'in',
        'or',
        'options',
    ])
    const delIconClickFun = () => {

    }
    const ceshi = () => {
      console.log('点击了', value)
    }
    return {
        ceshi,
        value,
        options,
        delIconClickFun
    }
  },
};
</script>
```

### 另外风格

```vue demo
<template>
    <div style="width: 150px">
      <fl-dropdown v-model="value" :options="options" :type="type" :trigger="['click']"></fl-dropdown>
    </div>
</template>
<script lang="ts">
import { ref, h } from "vue"
export default {
  setup() {
    const value = ref("All")
    const options = ref([
        'in',
        'or',
        'options',
    ])
    const type = ref('card')
    return {
        value,
        options,
        type
    }
  },
};
</script>
```

### 重写头部

```vue demo
<template>
    <div style="width: 150px">
      <fl-dropdown v-model="value" :options="options" :trigger="['click']">
        <div>点击我下啦</div>
      </fl-dropdown>
    </div>
</template>
<script lang="ts">
import { ref, h } from "vue"
export default {
  setup() {
    const value = ref("All")
    const options = ref([
        'in',
        'or',
        'options',
    ])
    const type = ref('card')
    return {
        value,
        options,
        type
    }
  },
};
</script>
```


### Dropdown 属性

|属性	|说明	|类型	|可选值	|默认值|
|---- |----- |------ |---  |---- |
|minWidth	|内容最小宽度	| string	| - |	-|
|type	|风格	| string	| card |	-|
|options	|值	|  array	| - |	[]|


