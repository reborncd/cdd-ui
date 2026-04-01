# Tabs 标签页
用于分割内容上有关联但属于不同类别的数据集合

### 基础用法
基础的、简洁的标签页

Tabs 组件提供了选项卡的功能，默认选中第一个标签页，你也可以通过 `value` 属性来指定当前选中的标签页。

``` vue demo
<template>
  <fl-tabs style="width: 600px;"  :tab-position="'top'" v-model="activeName" class="demo-tabs" @tab-click="handleClick" :editable="true">
    <fl-tab-pane v-for="(item, index) in 30" :label="`General Information${index}`" :name="item">{{ `General Information${index}` }}</fl-tab-pane>
  </fl-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const activeName = ref(1)

const handleClick = (tab: string, event: Event) => {
  console.log(tab, event)
}

</script>

```

### 标签位置的设置

可以通过 `tab-position` 设置标签的位置

标签一共有四个方向的设置 `tabPosition="left | right | top | bottom"`

```vue demo
<template>
    <a-button label="top" @click="changPos('top')">top</a-button>
    <a-button label="right" @click="changPos('right')">right</a-button>
    <a-button label="bottom" @click="changPos('bottom')">bottom</a-button>
    <a-button label="left" @click="changPos('left')">left</a-button>

  <fl-tabs
    style="height: 200px"
    :tab-position="tabPosition"
    class="demo-tabs"
  >
  <fl-tab-pane label="User" 
    style="height: 100%;padding: 32px;
      background-color: #f4f5f7;
      color: #6b778c;
      font-size: 32px;
      font-weight: 600;">User
    </fl-tab-pane>
    <fl-tab-pane label="Config" 
    style="height: 100%;padding: 32px;
      background-color: #f4f5f7;
      color: #6b778c;
      font-size: 32px;
      font-weight: 600;">Config
    </fl-tab-pane>
    <fl-tab-pane label="Role" 
    style="height: 100%;padding: 32px;
      background-color: #f4f5f7;
      color: #6b778c;
      font-size: 32px;
      font-weight: 600;">Role
    </fl-tab-pane>
    <fl-tab-pane label="Task" 
    style="height: 100%;padding: 32px;
      background-color: #f4f5f7;
      color: #6b778c;
      font-size: 32px;
      font-weight: 600;">Task
    </fl-tab-pane>
  </fl-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { Button as AButton } from 'ant-design-vue'

const tabPosition = ref('right')

const changPos = (str) => {
  tabPosition.value = str
}

</script>
```

## 自定义标签页的内容

可以通过具名插槽来实现自定义标签页的内容

```vue demo
<template>
  <fl-tabs class="demo-tabs">
    <fl-tab-pane>
      <template #label>
        <span>
          <fl-icon-button icon="iflorens-otherfile" :iconStyle="{}" type="line"></fl-icon-button>Route
        </span>
      </template>
      Route
    </fl-tab-pane>
    <fl-tab-pane label="Config">Config</fl-tab-pane>
    <fl-tab-pane label="Role">Role</fl-tab-pane>
    <fl-tab-pane label="Task">Task</fl-tab-pane>
  </fl-tabs>
</template>

<script lang="ts" setup>

</script>
```

## 标签页 header 左边插槽

可以通过具名插槽来实现header左边插槽

```vue demo
<template>
  <fl-tabs class="demo-tabs">
    <template #tabs-header-left>
      <div>测试</div>
    </template>
    <fl-tab-pane>
      <template #label>
        <span>
          <fl-icon-button icon="iflorens-otherfile" :iconStyle="{}" type="line"></fl-icon-button>Route
        </span>
      </template>
      Route
    </fl-tab-pane>
    <fl-tab-pane label="Config">Config</fl-tab-pane>
    <fl-tab-pane label="Role">Role</fl-tab-pane>
    <fl-tab-pane label="Task">Task</fl-tab-pane>
  </fl-tabs>
</template>

<script lang="ts" setup>

</script>
```

## 标签页 header 右边插槽

可以通过具名插槽来实现header右边插槽

```vue demo
<template>
  <fl-tabs class="demo-tabs">
    <template #tabs-header-right>
      <div>测试</div>
    </template>
    <fl-tab-pane>
      <template #label>
        <span>
          <fl-icon-button icon="iflorens-otherfile" :iconStyle="{}" type="line"></fl-icon-button>Route
        </span>
      </template>
      Route
    </fl-tab-pane>
    <fl-tab-pane label="Config">Config</fl-tab-pane>
    <fl-tab-pane label="Role">Role</fl-tab-pane>
    <fl-tab-pane label="Task">Task</fl-tab-pane>
  </fl-tabs>
</template>

<script lang="ts" setup>

</script>
```

## card 风格

可以通过具名插槽来实现header右边插槽

```vue demo
<template>
  <div style="margin-bottom: 10px;">
    <a-button label="top" @click="changPos('top')">top</a-button>
    <a-button label="right" @click="changPos('right')">right</a-button>
    <a-button label="bottom" @click="changPos('bottom')">bottom</a-button>
    <a-button label="left" @click="changPos('left')">left</a-button>
  </div>

  <fl-tabs class="demo-tabs" type="card" :tab-position="tabPosition">
    <fl-tab-pane label="Route">Route</fl-tab-pane>
    <fl-tab-pane label="Config">Config</fl-tab-pane>
    <fl-tab-pane label="Role">Role</fl-tab-pane>
    <fl-tab-pane label="Task">Task</fl-tab-pane>
  </fl-tabs>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Button as AButton } from 'ant-design-vue'
const tabPosition = ref('top')

const changPos = (str) => {
  tabPosition.value = str
}

</script>
```


### 属性说明

|属性 |说明 |类型 |可选值 |默认值
|---- |----- |------ |---  |---- |
|model-value / v-model |绑定值，选中选项卡的name |string / name |— |第一个选项卡的 name |
|type |风格类型 |string |card |— |
|isShowHeaderBoder |header是否显示下划线 | boolean | false |— |
|tab-position |选项卡所在位置 |string |top/right/bottom/left |top |
|stretch |标签的宽度是否自撑开 |boolean |- |false |
|before-leave |切换标签之前的钩子函数，若返回 `false` 或者返回被 reject 的 `Promise` ，则阻止切换。 |Funtion(activeName, oldActiveName) |- |— |


### Tabs 事件

|事件名	|说明	|回调参数	|
|---- |------- |---- |
|tab-click |tab 被选中时触发 |tab 被点击的标签 |
|tab-remove |点击 tab 移除按钮后触发 |name，被删除的标签的名字 |
|tab-add |点击 tabs 的新增按钮后触发 |- |
|edit |点击 tabs 的新增按钮或者 tab被关闭后触发 |(targetName, action) |


## Tabs 插槽

| 插槽名 | 说明 |子标签 |
| ---- | ------------------------- | --- |
| —    | 默认插槽 | Tab-pane | 
| tabs-header-left    | header 左侧插槽 | header left | 
| tabs-header-right    |  header 右侧插槽 | header right | 

### Tab-pane 属性

|属性 |说明	|类型	|可选值 |默认值 |
|---- |------- |---- |--- |----|
|label |选项卡标题 |string |- |- |
|disabled |是否禁用 |boolean |- |false |
|name |与选项卡绑定值 value 对应的标识符，标识选项卡别名 |string / number |- |该选项卡在选项卡列表的书须知，如第一个选项卡则为'1' |
|closable |标签是否可关闭 |boolean |- |false |
|lazy |标签是否延迟渲染 |boolean |- |false |

## Tab-pane 插槽

| 插槽名 | 说明 |
| ---- | ------------------------- |
| —    | Tab-pane 的内容 |
| label | Tab-pane 的标题内容 |