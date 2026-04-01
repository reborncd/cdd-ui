# vue3-ui

## 打包/命令使用

～～～
<!-- 打包示例 -->
yarn doc:build
<!-- 生产需要打包的 json，按需引入会用到这个 json -->
yarn build:libs:json
<!-- 打包整个组件库 -->
yarn build:libs:all
<!-- 单独打包 css -->
yarn generate:css
<!-- 生成国际化 js -->
yarn build:locale
<!-- 打包按需引入库 -->
yarn build:libs:components
<!-- 项目版本更新 -->
yarn generate:pck
<!-- 生产模板文件 -->
yarn tem
<!-- 示例 -->
yarn tem Test
<!-- 模板文件导入组件库 -->
yarn generate:files
～～～

### @vue/shared

- makeMap: 生成一个类似于Set的对象，用于判断是否存在某个值
- EMPTY_OBJ: 空对象
- EMPTY_ARR: 空数组
- NOOP: 空函数
- NO: 返回false的函数
- isOn: 判断是否是on开头的事件
- isModelListener: 判断onUpdate开头的字符串
- extend: 合并对象
- remove: 移除数组中的某个值
- hasOwn: 判断对象是否有某个属性
- isArray: 判断是否是数组
- isMap: 判断是否是Map
- isSet: 判断是否是Set
- isDate: 判断是否是Date
- isRegExp: 判断是否是RegExp
- isFunction: 判断是否是函数
- isstring: 判断是否是字符串
- isSymbol: 判断是否是Symbol
- isObject: 判断是否是对象
- isPromise: 判断是否是Promise
- objectToString: Object.prototype.toString
- toTypestring: Object.prototype.toString的简写
- toRawType: 获取对象的类型
- isPlainObject: 判断是否是普通对象
- isIntegerKey: 判断是否是整数key
- isReservedProp: 判断是否是保留属性
- isBuiltInDirective: 判断是否是内置指令
- camelize: 将字符串转换为驼峰
- hyphenate: 将字符串转换为连字符
- capitalize: 将字符串首字母大写
- toHandlerKey: 将字符串转换为事件处理的key
- hasChanged: 判断两个值是否相等
- invokeArrayFns: 调用数组中的函数
- def: 定义对象的属性
- loosetoNumber: 将字符串转换为数字
- toNumber: 将字符串转换为数字
- getGlobalThis: 获取全局对象
- genPropsAccessExp: 生成props的访问表达式