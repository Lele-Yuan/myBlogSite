/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'My Blog Site',
  tagline: 'Dinosaurs are cool',
  url: 'https://github.com/Lele-Yuan/myBlogSite.git',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'Lele Yuan', // Usually your GitHub org/user name.
  projectName: 'myBlogSite', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Lele Yuan',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        // {
        //   type: 'doc',
        //   docId: 'intro',
        //   position: 'left',
        //   label: '学习笔记',
        // },
        // {to: '/blog', label: '旅行日记', position: 'left'},
        {
          label: 'tutorial',
          type: 'doc',
          docId: 'introduce',
          position: 'right',
        },
        {
          label: '前端',
          type: 'doc',
          docId: 'frontEnd/interview/index',
          position: 'right',
        },
        {
          label: '工具箱',
          type: 'doc',
          docId: 'tools/git-command',
          position: 'right',
        },
        {
          href: 'https://github.com/Lele-Yuan/myBlogSite',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Tutorial',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/docusaurus',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/Lele-Yuan/myBlogSite',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/Lele-Yuan/myBlogSite/edit/edit/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/Lele-Yuan/myBlogSite/edit/edit/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
