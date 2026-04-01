# 标题 header

### 基本用法

```vue demo
<template>
    <fl-header title="Down Payment" :offsetTop="-250"></fl-header>
</template>

```

### 插槽

```vue demo
<template>
    <fl-header title="Down Payment" :offsetTop="-250">
        <template #title-left>
            <div>left</div>
        </template>
        <template #title-right>
            <div>right</div>
        </template>
    </fl-header>
</template>

```


### Header 属性

|属性	|说明	|类型	|可选值	|默认值|
|---- |----- |------ |---  |---- |
|title	|名称	|string	|- |	|
|anchorId	|锚点id	|string	|- |	|
|offsetTop	|偏移量	|string number  |- |	|

### Header 插槽

|名称	|说明	|
|---- |----- |
|title-left	|-	|
|title-right	|-	|