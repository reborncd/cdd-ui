## Card

### 基础用法

```vue demo
<template>
    <div style="width: 1000px">
      <a-row>
        <a-col :span="12">
          <fl-card title="Lease Contract">
            <fl-card-item :columns="columns" :data="data"></fl-card-item>
          </fl-card>
        </a-col>
        <a-col :span="12">
        </a-col>
      </a-row>
    </div>
</template>
<script lang="ts">
import { ref, h } from "vue"
import { Row, Col } from 'ant-design-vue'
export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col
  },
  setup() {
    const columns = ref([
      {
        label: "Business Unit",
        prop: "business",
      }, {
        label: "Lease Type:",
        prop: "lease",
      }, {
        label: "Lease Type2:",
        prop: "bb",
      }
    ])

    const data = ref({
      business: "Business Unit value",
      lease: "FF",
      bb: ""
    })

    return {
        columns,
        data
    }
  },
};
</script>
```

### 方向控制

```vue demo
<template>
    <div style="width: 1000px">
      <a-row>
        <a-col :span="12">
          <fl-card>
            <fl-card-item :columns="columns" :data="data" :gutter="24" :span="12" arrange="on-end"></fl-card-item>
          </fl-card>
        </a-col>
        <a-col :span="12"></a-col>
      </a-row>
    </div>
</template>
<script lang="ts">
import { ref, h } from "vue"
import { Row, Col } from 'ant-design-vue'
export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col
  },
  setup() {
    const columns = ref([
      {
        label: "Business Unit",
        prop: "business",
      }, {
        label: "Lease Type:",
        prop: "lease",
      }
    ])

    const data = ref({
      business: "Business Unit value",
      lease: "FF"
    })

    return {
        columns,
        data,
    }
  },
};
</script>
```

### 配置多个cardItem

```vue demo
<template>
    <div style="width: 1000px">
      <a-row>
        <a-col :span="12">
          <fl-card title="Lease Contract">
            <fl-card-item :columns="columns" :data="data" itemStyle="padding: 18px 12px 8px 12px;"></fl-card-item>
            <fl-card-item :columns="columns" :data="data" itemStyle="padding: 12px 12px 8px 12px;"></fl-card-item>
          </fl-card>
        </a-col>
        <a-col :span="12">
        </a-col>
      </a-row>
    </div>
</template>
<script lang="ts">
import { ref, h } from "vue"
import { Row, Col } from 'ant-design-vue'
export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col
  },
  setup() {
    const columns = ref([
      {
        label: "Business Unit",
        prop: "business",
      }, {
        label: "Lease Type:",
        prop: "lease",
      }
    ])

    const data = ref({
      business: "Business Unit value",
      lease: "FF"
    })

    return {
        columns,
        data
    }
  },
};
</script>
```

### 插槽形式

```vue demo
<template>
    <div style="width: 1000px">
      <a-row>
        <a-col :span="12">
          <fl-card title="Lease Contract">
            <fl-card-item :columns="columns" :data="data">
              <template #businessLabel={label}>
                <div>{{ label }}</div>
              </template>
              <template #business>
                <div>222</div>
              </template>
            </fl-card-item>
          </fl-card>
        </a-col>
        <a-col :span="12">
        </a-col>
      </a-row>
    </div>
</template>
<script lang="ts">
import { ref, h } from "vue"
import { Row, Col,Abutton } from 'ant-design-vue'
export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col
  },
  setup() {
    const columns = ref([
      {
        label: "Business Unit",
        labelSlot:"businessLabel",
        prop: "business",
        scope: "business",
        noEmptyValue: true
      }
    ])

    const data = ref({
      business: "Business Unit value"
    })

    return {
        columns,
        data
    }
  },
};
</script>
```

### 数组传参

```vue demo
<template>
    <div style="width: 1000px">
      <a-row>
        <a-col :span="12">
          <fl-card title="Lease Contract">
            <fl-card-item :columns="columns" :data="data"></fl-card-item>
          </fl-card>
        </a-col>
        <a-col :span="12">
        </a-col>
      </a-row>
    </div>
</template>

<script lang="ts">
import { ref, h } from "vue"
import { Row, Col } from 'ant-design-vue'
export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col
  },
  setup() {
    const columns = ref([
      {
        label: "Business Unit",
        prop: "value",
      }, {
        label: "Business Unit1",
        prop: "value"
      }
    ])

    const data = ref([
      {
        label: "Business Unit",
        value: "Business Unit value"
      }, {
        label: "Business Unit1",
        value: "Business Unit value1"
      }, , {
        label: "Business Unit2",
        value: "Business Unit value2"
      }
    ])

    return {
        columns,
        data
    }
  },
};
</script>
```

### 风格

```vue demo
<template>
    <div style="width: 1000px">
      <a-row>
        <a-col :span="12">
          <fl-card :type="type">
            <fl-card-item :columns="columns" :data="data"></fl-card-item>
          </fl-card>
        </a-col>
        <a-col :span="12">
          <fl-card :type="type1">
            <fl-card-item :columns="columns" :data="data"></fl-card-item>
          </fl-card>
        </a-col>
      </a-row>
    </div>
</template>
<script lang="ts">
import { ref, h } from "vue"
import { Row, Col } from 'ant-design-vue'
export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col
  },
  setup() {
    const columns = ref([
      {
        label: "Business Unit",
        prop: "business",
      }, {
        label: "Lease Type:",
        prop: "lease",
      }
    ])

    const data = ref({
      business: "Business Unit value",
      lease: "FF"
    })

    return {
        columns,
        data,
        type: 'b-card',
        type1: 'top-line'
    }
  },
};
</script>
```

### lease item

```vue demo
<template>
    <div style="width: 300px">
      <a-row :span="24">
        <a-col :span="24">
          <fl-card :type="type">
            <fl-lease-item title="Audit Trail" :columns="columns" :data="data"></fl-lease-item>
          </fl-card>
        </a-col>
      </a-row>
    </div>
</template>
<script lang="ts">
import { ref, h } from "vue"
import { Row, Col } from 'ant-design-vue'
export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col
  },
  setup() {
    const columns = ref([
      {
        label: "Created by:",
        prop: "lease",
        date: "date"
      }, {
        label: "Last updated by:",
        prop: "business",
        date: "date"
      }, {
        label: "Last reviewed by:",
        prop: "business",
        date: "date"
      }
    ])

    const data = ref({
      business: "Created by:",
      lease: "FredDouglass",
      date: "2024-09-13 09:38:32"
    })

    return {
        columns,
        data,
        type: 'top-line',
    }
  },
};
</script>
```

### Card 属性

|属性	|说明	|类型	|可选值	|默认值|
|---- |----- |------ |---  |---- |
|title	|标题	| string	| - |	link|
|type	|风格	| string	| b-card,top-line |	link|


### Card 插槽

|名称	|说明	|
|---- |----- |
|default	|默认插槽	|
|card-top	|顶部	|
|card-bottom	|底部	|

### CardItem 属性

|属性	|说明	|类型	|可选值	|默认值|
|---- |----- |------ |---  |---- |
|itemStyle	|style	| string	| - |	-|
|columns	|label	| array	| - |	-|
|data	|数据	| array,object	| - |	-|
|gutter	|栅格间隔，可以写成像素值或支持响应式的对象写法来设置水平间隔 { xs: 8, sm: 16, md: 24}。或者使用数组形式同时设置 [水平间距, 垂直间距]（1.5.0 后支持）。	| number	| - |	24|
|span	|栅格占位格数，为 0 时相当于 display: none	| number	| - |	24|
|arrange	|排列方式	| string	| on-end |	on-end|
|textDefault	|没有值默认	| string	| - |	-|
