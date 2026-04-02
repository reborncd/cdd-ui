## Popover

### 基础用法

```vue demo
<template>
  <div>
    <cdd-popover v-model:open="visible" trigger="click" @cancelBtn="cancelBtn" @deleteBtn="deleteBtn">
        <a-button>点击</a-button>
    </cdd-popover>
  </div>
</template>
<script lang="ts">
import { Button } from 'ant-design-vue'
import { ref } from 'vue';

export default {
    components: {
        [Button.name]: Button,
    },
    setup() {
        const visible = ref(false)
        const deleteBtn = () => {
            visible.value = false
        }

        const cancelBtn = () => {
            visible.value = false
        }

        return {
            visible,
            deleteBtn,
            cancelBtn
        }
    }
}


</script>
```

### 替换内容

```vue demo
<template>
  <div>
    <cdd-popover v-model:open="visible" trigger="click" @cancelBtn="cancelBtn" @deleteBtn="deleteBtn">
        <a-button>点击</a-button>
        <template #content>
            ceshi
        </template>
    </cdd-popover>
  </div>
</template>
<script lang="ts">
import { Button } from 'ant-design-vue'
import { ref } from 'vue';

export default {
    components: {
        [Button.name]: Button,
    },
    setup() {
        const visible = ref(false)
        const deleteBtn = () => {
            visible.value = false
        }

        const cancelBtn = () => {
            visible.value = false
        }

        return {
            visible,
            deleteBtn,
            cancelBtn
        }
    }
}


</script>
```

### 使用

原先antdv popover api属性保持不变

[link](https://www.antdv.com/components/popover-cn)


### Popover API

| 参数 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| contentName | 内容name | string | Are you sure you want to delete? | - |
| cancelName | 取消按钮name | string | Cancel |  |
| cancelProps | 按钮 props | {} | {} |  |
| deleteName | 删除按钮name | string | Delete |  |
| deleteProps | 按钮 props | {} | {} |  |


### Popover Events

|事件	|说明	|回调	|
|---- |----- |------ |
| cancelBtn	| 取消按钮点击	| Function(e) => {} |
| deleteBtn	| 删除按钮点击	| Function(e) => {}|

### Popover 插槽

|名称	|说明	|
|---- |----- |
|default	|默认插槽	|
|content	|内容插槽	|