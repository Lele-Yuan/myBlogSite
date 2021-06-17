---
id: commitizen
sidebar_position: 2
title: commitizen
---

[Cz工具集使用介绍 - 规范Git提交说明](https://blog.csdn.net/weixin_33890526/article/details/91393527)

### 安装 commitizen 
```
  npm install commitizen cz-conventional-changelog -D

  git add .

  git cz

  ……

  git push origin <origin/branch>
```

### 自定义提交类型和文案

```
// package.json 

  "config": {
    "commitizen": {
      "path": "cz-conventional-changelog",
      "types": {
        "🚀 feat": {
          "description": "引入新功能",
          "title": "Features"
        },
        "🐛 fix": {
          "description": "修复bug",
          "title": "Bug Fixes"
        },
        "📝 docs": {
          "description": "撰写文档",
          "title": "Documentation"
        },
        "💄 style": {
          "description": "样式修改",
          "title": "Styles"
        },
        "💬 text": {
          "description": "文案修改",
          "title": "Texts"
        },
        "💩 poo": {
          "description": "重写屎一样的代码",
          "title": "Code Poop"
        },
        "⚡️ perf": {
          "description": "性能优化",
          "title": "Performance Improvements"
        },
        "✅ test": {
          "description": "增加测试",
          "title": "Tests"
        },
        "🏗 build": {
          "description": "影响构建系统或外部依赖项的更改",
          "title": "Builds"
        },
        "✂️ tool": {
          "description": "增加开发快乐值的工具",
          "title": "Tools"
        },
        "💚 ci": {
          "description": "对CI配置文件和脚本的更改(示例范围:Travis, Circle, BrowserStack, SauceLabs)",
          "title": "Continuous Integrations"
        },
        "🧹 chore": {
          "description": "日常杂事",
          "title": "Chores"
        },
        "⏪ revert": {
          "description": "回退历史版本",
          "title": "Reverts"
        },
        "👥 conflict": {
          "description": "修改冲突",
          "title": "Conflict"
        },
        "🚮 delete": {
          "description": "删除文件",
          "title": "Delete Files"
        },
        "🔖 stash": {
          "description": "暂存文件",
          "title": "Stash Files"
        }
      }
    }
  },
```

### git commit 效果

![](./img/commit.png)