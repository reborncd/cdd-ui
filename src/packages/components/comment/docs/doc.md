## Comment

### Comment-content

```vue demo
<template>
  <div style="width: 800px; height: 700px; padding: 24px 24px 24px 0;">
    <button @click="clear">清空</button>
    <fl-comment-content :selectTypeCommentary="selectTypeCommentary"
    :canAddCommentary="true"
    :maxLength="0"
    :showCount="true"
    :commentaryList="commentaryList"
    :isShowShrinkIcon="true"
    @saveTextareaConfirm="saveTextareaConfirm"
    @saveItemConfirm="saveItemConfirm">
      <!-- <template #title-box="row">
        <div>{{ row }}</div>
      </template> -->
    </fl-comment-content>
  </div>
</template>

<script lang="ts">
import { ref } from "vue"
export default {
  setup() {
    const selectTypeCommentary = ref({
        label: 'Onhire',
        commentary: ''
    })

    const commentaryList = ref([
      {
        canAddCommentary: true,
        label: 'Onhire',
        commentary: `1
        2
        3
        4
        5
        `
      }
    ])

    const saveTextareaConfirm = (infoData) => {
      commentaryList.value.unshift({
        canAddCommentary: true,
        label: infoData.selectTypeCommentary.label,
        commentary: infoData.selectTypeCommentary.commentary
      })
      infoData.callback()
      infoData.finallyBack()
    }

    const saveItemConfirm = (infoData) => {
      console.log(infoData)
      infoData.callback(infoData)
      infoData.finallyBack()
    }
    const clear = () => {
      commentaryList.value = []
    }
    return {
      clear,
      selectTypeCommentary,
      commentaryList,
      saveTextareaConfirm,
      saveItemConfirm
    }
  },
};
</script>
```

### Comment-textarea

```vue demo
<template>
  <div style="width: 800px;padding: 24px;background: #F5F6F9;">
    <fl-comment-textarea :selectTypeCommentary="selectTypeCommentary" :showCount="true" v-model="value" @saveTextareaConfirm="saveTextareaConfirm"></fl-comment-textarea>
  </div>
</template>

<script lang="ts">
import { ref } from "vue"
export default {
  setup() {
    const value = ref('value')
    const selectTypeCommentary = ref({
        label: 'Onhire',
        commentary: ''
    })
    const saveTextareaConfirm = (infoData) => {
      console.log(value)
      infoData.finallyBack()
    }
    return {
        selectTypeCommentary,
        value,
        saveTextareaConfirm
    }
  },
};
</script>
```

### Comment-item

```vue demo
<template>
  <div style="width: 800px;padding: 24px;background: #F5F6F9;">
    <fl-comment-item :commentaryData="selectTypeCommentary" :showCount="true" :canAddCommentary="true" @saveItemConfirm="saveItemConfirm"></fl-comment-item>
  </div>
</template>

<script lang="ts">
import { ref } from "vue"
export default {
  setup() {
    const selectTypeCommentary = ref({
        label: 'Onhire',
        commentary: '测试 333'
    })

    const saveItemConfirm = (e) => {
        e.callback(e.commentaryData)
        e.finallyBack()
        e.modifyStatu(false)
    }

    return {
        selectTypeCommentary,
        saveItemConfirm
    }
  },
};
</script>
```



### Comment-item 属性

|属性	|说明	|类型	|可选值	|默认值|
|---- |----- |------ |---  |---- |
|canAddCommentary	|是否有权限编辑	| Boolean	| - | false|
|maxLength	|最大可输入长度	| Number, String	| - |	5000|
|showCout	|是否显示已输入个数	| Boolean	| - |	false|
|commentaryData	|commentaryData	| Object	| - |	-|
|itemKey	|轮训条数key	| Number	| - |	-|
|modeType	| modeType | string	| - |	shrink|
|autoSize	|autoSize	| Object	| - |	{ minRows: 2, maxRows: 5 }|

### Comment-item Event

|事件	|说明	|回调	|
|---- |----- |------ |
|fullScreenItem	|点击时触发	| {commentaryData: '', itemKey: '', edit: '', modifyStatu: Function, focus: Function, callback: Function}|
|shrinkItem	|点击时触发	| {commentaryData: '', itemKey: '', edit: '', modifyStatu: Function}|
|fullScreenItem	|点击时触发	| {commentaryData: '', itemKey: '', modeType: '', modifyStatu: Function, focus: Function, callback: Function}|
|shrinkItem	|点击时触发	| {commentaryData: '', itemKey: '', edit: '', modifyStatu: Function, finallyBack: Function}|


### Comment-textarea 属性

|属性	|说明	|类型	|可选值	|默认值|
|---- |----- |------ |---  |---- |
|modeType	|输入组件类型 shrink 缩放模式 fullScreen全屏模式	| String	| - | shrink|
|selectTypeCommentary	|selectTypeCommentary	| Object	| - | {}|
|maxLength	|最大可输入长度	| Object	| - | {}|
|showCout	|是否显示已输入个数	| Boolean	| - |	false|
|autoSize	|autoSize	| Object	| - | { minRows: 2, maxRows: 5 }|
|placeholder	|placeholder	| String	| - | Enter commentary within 5,000 characters.|

### Comment-textarea Event

|事件	|说明	|回调	|
|---- |----- |------ |
|fullScreenTextarea	|点击时触发	| {}|
|shrinkTextarea	|点击时触发	| {}|
|saveTextareaConfirm	|点击时触发	| {modeType: '', selectTypeCommentary: {}, finallyBack: Function}|

### Comment-content 属性

|属性	|说明	|类型	|可选值	|默认值|
|---- |----- |------ |---  |---- |
|canAddCommentary	|是否有权限	| Boolean	| - | false|
|selectTypeCommentary	|selectTypeCommentary	| Object	| - | {}|
|showCout	|是否显示已输入个数	| Boolean	| - |	false|
|commentaryList	|评论列表	| Array	| - | []|
|emptyObj	|默认无列表样式	| Array	| - | {img: '', description: ''}|

### Comment-content Event
|事件	|说明	|回调	|
|---- |----- |------ |
|saveTextareaConfirm	|点击时触发	| {}|
|saveItemConfirm	|点击时触发	| {}|
