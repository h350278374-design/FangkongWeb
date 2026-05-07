# 放空 - 网页版

一个简洁的待办、笔记、记账和日历管理工具。

## 功能特点

- ✅ **待办管理** - 创建、编辑、删除待办事项，支持截止日期和循环提醒
- 📝 **笔记功能** - 简单的文本笔记，支持置顶、加密保护
- 💰 **记账功能** - 记录收支，自动统计月度收支情况
- 📅 **日历视图** - 查看农历和节假日，关联待办和笔记
- 🗑️ **回收站** - 删除的项目可以恢复或彻底删除
- ☁️ **WebDAV 同步** - 支持与桌面版互通数据（坚果云、Nextcloud 等）
- 📤 **数据导入导出** - 支持 JSON 格式备份和恢复数据
- 🔐 **全局密码** - 设置密码保护敏感操作

## 数据存储

- **本地存储**：所有数据保存在浏览器 localStorage，不会上传到服务器
- **WebDAV 同步**：支持配置 WebDAV 服务器（如坚果云），与桌面版互通数据

**注意**：清除浏览器数据会导致数据丢失，请定期导出备份或启用 WebDAV 同步！

## WebDAV 同步配置

网页版支持与桌面版互通数据，通过 WebDAV 协议实现。

### 支持的 WebDAV 服务

- **坚果云**（推荐）- 国内速度快，免费版足够个人使用
- **Nextcloud** / **ownCloud** - 自建云盘
- **AList** - 网盘聚合工具
- **其他支持 WebDAV 的服务**

### 坚果云配置步骤

1. 注册/登录 [坚果云](https://www.jianguoyun.com/)
2. 进入「安全选项」→「第三方应用管理」→「添加应用密码」
3. 记住生成的应用密码
4. 在网页版点击「🔧 配置同步」
5. 填写配置：
   - **服务器地址**：`https://dav.jianguoyun.com/dav/`
   - **用户名**：你的坚果云邮箱
   - **密码**：刚才生成的应用密码
   - **路径**：`/`（根目录）
6. 点击「测试连接」→「保存配置」
7. 首次同步会自动将本地数据上传到云端

### 与桌面版互通

网页版和桌面版使用**相同的存储格式**，可以共享同一个 WebDAV 空间：

1. 桌面版配置好 WebDAV 同步
2. 网页版使用**相同的 WebDAV 账号**配置
3. 两边的待办和笔记会自动同步
4. **注意**：记账数据是本地-only，不会同步

## 部署到 GitHub Pages

### 方法 1：直接上传文件（最简单）

1. 在 GitHub 创建一个新仓库，命名为 `fangkong`
2. 进入仓库，点击 **Add file** → **Upload files**
3. 上传本文件夹中的**所有文件**（包括 .nojekyll）
4. 点击 **Commit changes**
5. 进入 **Settings** → **Pages**
6. 在 **Source** 部分选择 **Deploy from a branch**
7. 选择 **main** 分支和 **/(root)** 文件夹
8. 点击 **Save**
9. 等待几分钟后，访问 `https://你的用户名.github.io/fangkong`

### 方法 2：使用 Git 命令行

```bash
# 创建本地仓库
cd web
git init
git add .
git commit -m "Initial commit: 放空网页版"

# 推送到 GitHub（需要先创建空仓库）
git remote add origin https://github.com/你的用户名/fangkong.git
git push -u origin main
```

然后按照方法 1 的第 5-9 步启用 GitHub Pages。

### 自定义域名（可选）

1. 在仓库根目录添加 `CNAME` 文件，内容为你的域名
2. 在域名 DNS 设置中添加 CNAME 记录指向 `你的用户名.github.io`

## 从桌面版迁移数据

### 方法一：WebDAV 同步（推荐）

配置相同的 WebDAV 账号后，数据会自动同步，无需手动迁移。

### 方法二：手动导入

1. 在桌面版点击「数据目录」按钮，找到数据文件夹
2. 打开 `index.json` 查看所有项目 ID
3. 从 `todos/` 和 `notes/` 文件夹中找到对应 `.json` 文件
4. 在网页版点击「📥 导入本地数据」，粘贴 JSON 内容

## 浏览器兼容性

- Chrome / Edge (推荐)
- Firefox
- Safari

## 技术栈

- 纯 HTML/CSS/JavaScript
- 无框架依赖
- localStorage 本地存储

## 许可证

MIT
