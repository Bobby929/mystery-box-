# 🎁 神秘盒子抽奖网站

一个支持自定义上传图片的神秘盒子抽奖网站，深色调设计，带粒子特效。

## ✨ 功能特点

- 🎨 **深色调设计**：紫色渐变背景，科技感十足
- ✨ **粒子特效**：动态粒子背景，营造神秘氛围
- 📤 **自定义上传**：支持批量上传图片
- 🎯 **随机抽奖**：纯随机 + 不重复机制
- 🎁 **3D 盒子动画**：精美的盒子打开动画
- 🎉 **中奖展示**：图片展示 + 旋转边框特效
- 💾 **本地存储**：使用 LocalStorage，无需服务器
- 📱 **响应式设计**：完美适配手机和电脑

## 🚀 快速开始

### 在线预览

直接在浏览器中打开 `index.html` 即可使用。

### 部署到 Netlify

1. **上传文件到 GitHub**
   - 创建新仓库，例如 `mystery-box`
   - 上传以下文件：
     - `index.html`
     - `styles.css`
     - `script.js`

2. **连接 Netlify**
   - 登录 [Netlify](https://app.netlify.com/)
   - 连接 GitHub 仓库
   - 部署完成

详细部署步骤请参考下方的部署指南。

## 📖 使用说明

### 第一步：上传图片

1. 点击首页的 **"上传图片"** 按钮
2. 点击或拖拽图片到上传区域
3. 支持批量上传
4. 上传完成后点击 **"完成"** 按钮

**支持的格式**：JPG、PNG、GIF

**注意事项**：
- LocalStorage 存储空间有限（通常 5-10MB）
- 建议单张图片不超过 2MB
- 总图片数量建议不超过 50 张

### 第二步：开始抽奖

1. 点击首页的 **"开始抽奖"** 按钮
2. 神秘盒子会执行打开动画
3. 随机展示一张图片
4. 点击 **"关闭"** 按钮，生成新的盒子

### 第三步：查看统计

首页底部会显示：
- 已上传图片数量
- 已抽取图片数量
- 剩余图片数量

### 第四步：管理图片

1. 点击 **"上传图片"** 按钮
2. 查看已上传的所有图片
3. 点击图片右上角的 ❌ 删除不需要的图片
4. 点击 **"清空所有图片"** 清空所有数据

## 🎮 抽奖规则

- **纯随机**：每张图片中奖概率相同
- **不重复**：已抽取的图片不会再次出现
- **重新开始**：所有图片抽取完毕后，会提示是否重新开始

## 🛠️ 技术栈

- HTML5
- CSS3（3D transform、动画）
- JavaScript（ES6+）
- LocalStorage API

## 📁 文件结构

```
mystery-box/
├── index.html          # 主页面
├── styles.css          # 样式文件
├── script.js           # JavaScript 逻辑
└── README.md           # 使用说明
```

## 🎨 自定义配置

### 修改配色

编辑 `styles.css`，修改以下变量：

```css
:root {
    --primary-color: #7c3aed;      /* 主色调 */
    --secondary-color: #a78bfa;    /* 次色调 */
    --accent-color: #f59e0b;      /* 强调色 */
    --dark-bg: #0f172a;            /* 深色背景 */
    --darker-bg: #020617;          /* 更深背景 */
    --light-text: #f8fafc;         /* 浅色文字 */
}
```

### 修改动画速度

编辑 `styles.css`，调整动画时长：

```css
.box-opening {
    animation: boxOpen 2s ease forwards;  /* 盒子打开动画 */
}

.prize-display.active {
    animation: prizeAppear 1s ease;  /* 奖品出现动画 */
}
```

## 💡 常见问题

### Q: LocalStorage 空间不足怎么办？

A: 网站会自动压缩图片，但如果空间还是不足，可以：
1. 减少图片数量
2. 使用更小的图片
3. 定期清理不需要的图片

### Q: 如何备份已上传的图片？

A: 目前不支持导出功能，建议：
1. 保留原始图片文件
2. 在不同浏览器中使用时需要重新上传

### Q: 可以在手机上使用吗？

A: 可以！网站完全响应式，支持手机、平板、电脑。

### Q: 可以分享给朋友使用吗？

A: 可以分享网站链接，但 LocalStorage 是浏览器级别的，每个人需要自己上传图片。

### Q: 如何清空所有数据？

A:
1. 进入上传页面
2. 点击 **"清空所有图片"** 按钮
3. 确认清空

## 🚀 部署指南

### 方法一：Netlify（推荐）

1. **创建 GitHub 仓库**
   - 访问 https://github.com/new
   - 创建新仓库 `mystery-box`

2. **上传文件**
   - 上传 `index.html`、`styles.css`、`script.js`

3. **连接 Netlify**
   - 登录 https://app.netlify.com/
   - 点击 "Add new site" → "Import an existing project"
   - 选择 GitHub 仓库
   - 点击 "Deploy site"

4. **完成**
   - 获得 Netlify 免费域名
   - 网站可以立即访问

### 方法二：GitHub Pages

1. **创建 GitHub 仓库**
   - 创建新仓库 `mystery-box`

2. **上传文件**
   - 上传 `index.html`、`styles.css`、`script.js`

3. **启用 GitHub Pages**
   - 进入仓库 Settings
   - 点击 "Pages"
   - 选择 "main" 分支，"/ (root)" 文件夹
   - 点击 "Save"

4. **完成**
   - 获得 `https://your-username.github.io/mystery-box` 域名
   - 网站可以立即访问

## 📝 更新日志

### v1.0.0 (2026-03-03)

- ✅ 首次发布
- ✅ 支持图片上传
- ✅ 随机抽奖功能
- ✅ 不重复机制
- ✅ 3D 盒子动画
- ✅ 粒子特效
- ✅ 响应式设计

## 📄 许可证

MIT License - 可自由使用、修改和分发

## 🎉 享受抽奖乐趣！

如有任何问题或建议，欢迎反馈！
