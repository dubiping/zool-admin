# vue3 后台管理系统

#### 安装教程

```js
pnpm install
// 或 pnpm bootstrap
```

#### 使用说明

1. 运行

```js
pnpm dev
// 或 pnpm serve
```

2. 打包

```js
// 开发环境
pnpm build:dev

// 测试环境
pnpm build:test

// 生产环境
pnpm build:dev
```

3. 预览

```js
// 预览dist
pnpm preview:dist

// 打包并预览dist
pnpm preview
```

#### vscode 工具配置

- Iconify IntelliSense - Iconify 图标插件
- windicss IntelliSense - windicss 提示插件
- I18n-ally - i18n 插件
- Volar - vue3 开发必备
- ESLint - 脚本代码检查
- Prettier - 代码格式化
- Stylelint - css 格式化
- DotENV - .env 文件 高亮

#### 参与贡献

1.  新建 develop_xxx 分支
2.  提交代码：

```js
// 命令行
git add .
pnpm commit

// 其他，如：feat: 新功能
```

需要符合`Angular`的提交规范：

```
feat      新特性、新功能
fix       修改bug
docs      文档修改
style     代码格式修改, 注意不是 css 修改
refactor  代码重构
perf      优化相关，比如提升性能、体验
test      测试用例修改
build     编译相关的修改，例如发布版本、对项目构建或者依赖的改动
ci        持续集成修改
chore     其他修改, 比如改变构建流程、或者增加依赖库、工具等
revert    回滚到上一个版本
```

3.  新建 Pull Request
