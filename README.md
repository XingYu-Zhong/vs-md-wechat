# 微信 Markdown VScode插件

## 项目介绍

一个将 Markdown 文档自动即时渲染为微信图文的 VSCode 插件。让你不再为微信文章排版而发愁！只要你会基本的 Markdown 语法，就能做出一篇样式简洁而又美观大方的微信图文。

## 功能特性

- [x] 支持自定义 CSS 样式
- [x] 支持 Markdown 所有基础语法
- [x] 支持浅色、暗黑两种主题模式
- [x] 支持 <kbd>Ctrl</kbd> + <kbd>F</kbd> 快速格式化文档
- [x] 支持色盘取色，快速替换文章整体色调
- [x] 支持多图上传，可自定义配置图床
- [x] 支持自定义上传逻辑
- [x] 支持在编辑框右键弹出功能选项卡
- [x] 支持批量转换本地图片为线上图片
- [x] **新增：自动加载当前打开的Markdown文档内容**
- [x] **新增：实时同步文档变化到预览窗口**

## 使用方法

### 启动插件
有以下几种方式：

1. **快捷键方式（推荐）**
   - macOS: `Cmd + Shift + W`
   - Windows/Linux: `Ctrl + Shift + W`

2. **右键菜单方式**
   - 打开 `.md` 文件
   - 右键选择 "打开微信Markdown编辑器"

3. **编辑器工具栏按钮**
   - 打开 `.md` 文件时，点击编辑器标题栏的预览图标

4. **通过命令面板**
   - 打开命令面板（`Cmd/Ctrl + Shift + P`）
   - 输入 `vs-md-wechat`
   - 选择并执行命令

### 使用编辑器
1. **打开Markdown文档**：确保您已经打开了一个 `.md` 文件
2. **启动插件**：使用上述任一方式启动插件
3. **自动加载内容**：插件会自动将当前文档的内容加载到编辑器中
4. **实时预览**：在左侧编辑区修改内容，右侧会实时预览微信公众号效果
5. **实时同步**：当您在VSCode中修改文档时，预览窗口会自动更新

### 注意事项
- 插件需要先打开一个Markdown文档才能正常工作
- 如果没有打开Markdown文档，插件会显示提示信息
- 文档内容会自动同步到预览窗口，无需手动复制粘贴

## 打包流程

### 1. 安装依赖
```bash
# 安装项目依赖
npm install

# 安装打包工具（本地安装）
npm install --save-dev @vscode/vsce
```

### 2. 编译代码
```bash
npm run compile
```

### 3. 打包插件
```bash
# 打包生成 .vsix 文件
npx vsce package
```

## 安装方法

### 方法1：通过VSCode界面安装（推荐）
1. 打开VSCode
2. 按下 `Ctrl+Shift+P`（macOS: `Cmd+Shift+P`）打开命令面板
3. 输入 `Extensions: Install from VSIX...`
4. 选择生成的 `.vsix` 文件
5. 点击安装

### 方法2：通过命令行安装
```bash
code --install-extension vs-md-[版本号].vsix
```

## 技术实现

### 扩展与前端通信
- 使用VSCode的Webview API进行扩展与前端通信
- 通过`postMessage`方法发送文档内容
- 前端监听消息并更新编辑器内容

### 实时同步机制
- 监听VSCode文档变化事件
- 自动将变化内容发送到前端
- 前端实时更新预览效果

## 注意事项

- 请转到 [doocs/md](https://github.com/doocs/md) 查看更多详细文档。

欢迎关注我的公众号"**小风博客**"，原创技术文章第一时间推送。

<center>
    <img src="https://t.tutu.to/img/BNTeK" style="width: 100px;">
</center>



