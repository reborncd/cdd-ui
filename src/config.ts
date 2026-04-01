const config: any = {
  versions: [
    {
      name: '1.x',
      link: '/1x/'
    }
  ],
  header: [
    {
      name: 'guide',
      cName: '指南',
      path: '/guide/intro'
    },
    {
      name: 'js',
      cName: '公共js库',
      path: '/guide/js'
    },
    {
      name: 'component',
      cName: '组件',
      path: '/components/scroll'
    }
  ],
  docs: {
    baseUrl: '/guide/',
    nav: [
      {
        name: '指南',
        enName: 'guide',
        children: [
          {
            name: 'intro',
            cName: '介绍',
            show: true
          },
          {
            name: 'start',
            cName: '快速上手',
            show: true
          },
          {
            name: 'color',
            cName: '色彩',
            show: true
          },
          {
            name: 'theme',
            cName: '主题定制',
            show: true
          },
          {
            name: 'i18n',
            cName: '国际化',
            show: true
          },
          {
            name: 'contributing',
            cName: '开发者指南',
            show: true
          },
          {
            name: 'js',
            cName: '公共js库',
            show: true
          }
        ]
      }
    ]
  },
  components: {
    baseUrl: '/components/',
    nav: [
      {
        name: '基础组件',
        enName: 'base',
        children: [
          {
            name: 'icon',
            type: 'component',
            cName: 'Icon',
            desc: 'icon',
            show: true,
            author: 'xiaolin',
            progress: '100%'
          },
          {
            name: 'modal',
            type: 'component',
            cName: '模态框',
            desc: 'model 模态框',
            show: true,
            author: 'xiaolin',
            progress: '100%'
          },
          {
            name: 'popover',
            type: 'component',
            cName: '气泡卡片',
            desc: 'popover 气泡卡片',
            show: true,
            author: 'xiaolin',
            progress: '100%'
          },
          {
            name: 'header',
            type: 'component',
            cName: 'Header',
            desc: 'Header',
            show: true,
            author: 'xiaolin',
            progress: '100%'
          },
          {
            name: 'scroll',
            type: 'component',
            cName: '滚动条',
            desc: '滚动条',
            show: true,
            author: 'xiaolin',
            progress: '100%'
          },
          {
            name: 'watermark',
            type: 'component',
            cName: '水印',
            desc: '水印',
            show: true,
            author: 'xiaolin',
            progress: '100%'
          },
          {
            name: 'ellipsis',
            type: 'component',
            cName: '文本',
            desc: '文本省略',
            show: true,
            author: 'xiaolin',
            progress: '100%'
          },
          {
            name: 'tooltip-ellipsis',
            type: 'component',
            cName: 'textTooltip',
            desc: '提示文本',
            show: true,
            author: 'xiaolin',
            progress: '100%'
          },
          {
            name: 'button',
            type: 'component',
            cName: '按钮',
            desc: '按钮',
            show: true,
            author: 'xiaolin',
            progress: '100%'
          },
          {
            name: 'icon-button',
            type: 'component',
            cName: 'icon按钮',
            desc: 'icon按钮',
            show: true,
            author: 'xiaolin',
            progress: '100%'
          },
          {
            name: 'tabs',
            type: 'component',
            cName: '标签页',
            desc: 'tabs 标签页',
            show: true,
            author: 'xiaolin',
            progress: '100%'
          },
          {
            name: 'lease-header',
            type: 'component',
            cName: '表头',
            desc: 'leaseheader',
            show: true,
            author: 'xiaolin',
            progress: '100%'
          },
          {
            name: 'card',
            type: 'component',
            cName: '卡片',
            desc: 'card 卡片',
            show: true,
            author: 'xiaolin',
            progress: '100%'
          },
          {
            name: 'empty',
            type: 'component',
            cName: '空状态',
            desc: 'empty 空状态',
            show: true,
            author: 'xiaolin',
            progress: '100%'
          },
          {
            name: 'select',
            type: 'component',
            cName: '选择器',
            desc: 'select 选择器',
            show: true,
            author: 'xiaolin',
            progress: '100%'
          },
          {
            name: 'date',
            type: 'component',
            cName: '日期组件',
            desc: 'date 日期组件',
            show: true,
            author: 'xiaolin',
            progress: '100%'
          },
          {
            name: 'number-range',
            type: 'component',
            cName: '数字区间',
            desc: 'number',
            show: true,
            author: 'xiaolin',
            progress: '100%'
          },
          {
            name: 'dropdown',
            type: 'component',
            cName: '下拉菜单',
            desc: 'dropdown 下拉菜单',
            show: true,
            author: 'xiaolin',
            progress: '100%'
          },
          {
            name: 'auto-complete',
            type: 'component',
            cName: '自动完成',
            desc: 'auto-complete 自动完成',
            show: true,
            author: 'xiaolin',
            progress: '100%'
          },
          {
            name: 'search-input',
            type: 'component',
            cName: '搜索',
            desc: 'search-input 搜索',
            show: true,
            author: 'xiaolin',
            progress: '100%'
          },
          {
            name: 'table',
            type: 'component',
            cName: 'Table',
            desc: 'Table',
            show: true,
            author: 'xiaolin',
            progress: '100%'
          },
          {
            name: 'upload',
            type: 'component',
            cName: '上传',
            desc: 'upload 上传',
            show: true,
            author: 'xiaolin',
            progress: '100%'
          },
          {
            name: 'tag',
            type: 'component',
            cName: '标签',
            desc: 'tag 标签',
            show: true,
            author: 'xiaolin',
            progress: '100%'
          },
          {
            name: 'anchor',
            type: 'component',
            cName: '锚点',
            desc: 'anchor 锚点',
            show: true,
            author: 'xiaolin',
            progress: '100%'
          },
          {
            name: 'comment',
            type: 'component',
            cName: '评论',
            desc: 'comment 评论',
            show: true,
            author: 'xiaolin',
            progress: '100%'
          },
          {
            name: 'annex',
            type: 'component',
            cName: '附件',
            desc: 'annex 附件',
            show: true,
            author: 'xiaolin',
            progress: '100%'
          },
          {
            name: 'message',
            type: 'component',
            cName: '消息',
            desc: 'message',
            show: true,
            author: 'xiehaojie',
            progress: '100%'
          }
        ]
      },
      {
        name: '业务组件',
        enName: 'business',
        children: [
          {
            name: 'collect',
            type: 'component',
            cName: '收藏',
            desc: 'collect 收藏',
            show: true,
            author: 'xiaolin',
            progress: '100%'
          },
          {
            name: 'data-export',
            type: 'component',
            cName: '导出数据',
            desc: 'date 数据导出',
            show: true,
            author: 'xiaolin',
            progress: '100%'
          },
          {
            name: 'search',
            type: 'component',
            cName: '搜索',
            desc: 'search 搜索',
            show: true,
            author: 'xiaolin',
            progress: '100%'
          },
          {
            name: 'pages',
            type: 'component',
            cName: '列表',
            desc: 'pages 列表',
            show: true,
            author: 'xiaolin',
            progress: '100%'
          },
          {
            name: 'select-table',
            type: 'component',
            cName: '联想控件',
            desc: 'select-table 联想控件',
            show: true,
            author: 'xiaolin',
            progress: '100%'
          },
          {
            name: 'auto-complete-table',
            type: 'component',
            cName: '远程搜索',
            desc: 'auto-complete-table 远程搜索',
            show: true,
            author: 'xiaolin',
            progress: '100%'
          }
        ]
      }
    ]
  }
};

export default config;
