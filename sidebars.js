/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

module.exports = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  // tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],

  // But you can create a sidebar manually
  "tutorial": [
    "introduce",
    {
      "tutorial-basics": [
        'tutorial-basics/Create a Page',
        'tutorial-basics/Create a Document',
        'tutorial-basics/Create a Blog Post',
        'tutorial-basics/Markdown Features',
        'tutorial-basics/Deploy your site',
        'tutorial-basics/Congratulations',
      ],
    },
    {
      "tutorial-extras": [
        'tutorial-extras/Manage Docs Versions',
        'tutorial-extras/Translate your site'
      ]
    }
  ],
  "tools": [
    'tools/git-command',
    'tools/commitizen',
    'tools/husky',
    'tools/webpack',
  ],
  "doc": [
    {
      'frontEnd': [
        'frontEnd/interview/index',
        'frontEnd/interview/browser',
        'frontEnd/interview/questions',
      ]
    },
    {
      'vue 3.x': [
        'frontEnd/vue3/vue2',
        'frontEnd/vue3/component',
        'frontEnd/vue3/setup',
        'frontEnd/vue3/reactivity-api',
        'frontEnd/vue3/store',
        'frontEnd/vue3/proxy',
        'frontEnd/vue3/common-api',
      ]
    },
    {
      'vue': [
        'frontEnd/vue/mvvm',
        'frontEnd/vue/vuex',
        'frontEnd/vue/I18n',
        'frontEnd/vue/vueRouter',
        'frontEnd/vue/diff',
        'frontEnd/vue/for',
        'frontEnd/vue/less',
      ]
    },
    {
      'minProgram': [
        'frontEnd/minProgram/miniProgram-tool',
        'frontEnd/minProgram/project.config.json',
        'frontEnd/minProgram/custom-tabbar',
        'frontEnd/minProgram/custom-navigation',
      ]
    },
    'frontEnd/plugins/echart',
    'frontEnd/plugins/animate',
    {
      'javascript':[
        'frontEnd/javascript/datatype',
        'frontEnd/javascript/prototype',
        'frontEnd/javascript/es6',
        'frontEnd/javascript/promise',
        'frontEnd/javascript/asyncawait',
        'frontEnd/javascript/eventLoop',
        'frontEnd/javascript/extends',
        'frontEnd/javascript/webStorage',
      ]
    },
    {
      'css':[
        'frontEnd/css/index',
        'frontEnd/css/DOM',
      ]
    },
    {
      'typescript':[
        'frontEnd/typescript/guide',
      ]
    },
    {
      'network':[
        'frontEnd/network/http',
        'frontEnd/network/performance',
      ]
    },
  ],
};
