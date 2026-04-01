## Empty

### 基本用法

```vue demo
<template>
   <div style="height: 250px;">
      <fl-empty description="No Attachments"></fl-empty>
   </div>
</template>
```

```vue demo
<template>
   <div style="height: 250px;">
      <fl-empty description="No Attachments" type="noData"></fl-empty>
   </div>
</template>
```

```vue demo
<template>
   <div style="height: 250px;">
      <fl-empty description="No Attachments" type="noItem"></fl-empty>
   </div>
</template>
```

```vue demo
<template>
   <div style="height: 250px;">
      <fl-empty description="No Attachments" :isShowBtn="true"></fl-empty>
   </div>
</template>
```

### Empty 属性

|属性	|说明	|类型	|可选值	|默认值|
|---- |----- |------ |---  |---- |
|description	|名称	|string	|- |	|
|image	|图片(优先显示传入的image)	|string	|- |	- |
|type	|图片	|string	|noItem、noData |	 defaultImg|
|isShowBtn	|是否显示按钮	|Boolean	|- |	 false|
|btnName	|按钮名称	|Boolean	|- |	 false|
|btnIcon	|按钮icon	|Object	|- |	 {type: 'iflorens-Plus',style:{color: '#3E54AD',fontSize: '14px'}}|

### Empty Event
|事件	|说明	|回调	|
|---- |----- |------ |
|btnClick	|点击时触发	| Function|

### Empty 插槽

|名称	|说明	|
|---- |----- |
|default	|-	|

