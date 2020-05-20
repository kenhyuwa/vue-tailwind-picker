module.exports = {
  title: 'Vue Tailwind Picker',
  description: 'Datepicker for vue.js of tailwindcss & dayjs',
  base: '/',
  themeConfig: {
    repo: 'kenhyuwa/vue-tailwind-picker',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: 'Edit this page on GitHub',
    sidebarDepth: 1,
    sidebar: [
      {
        title: 'Guide',
        collapsable: false,
        children: ['/guide/'],
      },
      {
        title: 'Usage',
        collapsable: false,
        children: ['/usage/'],
      },
      {
        title: 'Options',
        collapsable: false,
        children: ['/options/'],
      },

      {
        title: 'Examples & Demo',
        collapsable: false,
        children: ['/examples/'],
      },
    ],
  },
}
