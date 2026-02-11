# Adelaide University Data Scraper

## 概述

这是一个简单、直接的爬虫脚本，用于从 Adelaide 大学官方 Staff Directory 爬取教授数据。

**设计理念（DHH 原则）：**
- ✅ 简单直接，没有过度工程化
- ✅ 6个月后仍然易于理解和维护
- ✅ 优雅的错误处理
- ✅ 遵守礼貌爬虫规则

## 技术栈

- **Playwright**: 处理 JavaScript 渲染的网页
- **TypeScript**: 类型安全
- **Node.js**: 运行环境

## 安装

```bash
# 已在项目根目录安装
npm install
```

Playwright 浏览器已自动安装（Chromium）。

## 使用方法

### 基本用法

```bash
# 运行爬虫（默认模式）
npm run scrape
```

### 开发模式（详细日志）

```bash
# 显示每个请求的详细调试信息
npm run scrape:dev
```

## 输出

爬虫会生成以下文件：

```
data/
  └── adelaide-professors.json    # 原始教授数据（JSON格式）
```

### 数据格式

```typescript
interface Professor {
  name: string;                    // 教授姓名
  title: string;                   // 职称 (Professor, Associate Professor, Lecturer, etc.)
  department: string;              // 院系
  email: string;                   // 邮箱
  office_location: string;         // 办公室位置
  courses: string[];               // 教授的课程列表（当前为空，未来版本实现）
  profile_url: string;             // 个人页面链接
  phone?: string;                  // 电话（可选）
  researcher_profile_url?: string; // 研究者档案链接（可选）
}
```

### 示例输出

```json
[
  {
    "name": "A/Prof Claudia Szabo",
    "title": "Associate Prof/Reader",
    "department": "Computer Science",
    "email": "claudia.szabo@adelaide.edu.au",
    "office_location": "Floor/Room 4 , Ingkarni Wardli , North Terrace",
    "courses": [],
    "profile_url": "https://www.adelaide.edu.au/directory/claudia.szabo",
    "phone": "831 36744",
    "researcher_profile_url": "http://researchers.adelaide.edu.au/profile/claudia.szabo"
  }
]
```

## 配置

编辑 `scripts/scrape-adelaide.ts` 中的 `CONFIG` 对象：

```typescript
const CONFIG: ScraperConfig = {
  baseUrl: 'https://www.adelaide.edu.au',
  department: 'Computer Science',
  departmentId: '12521',           // Computer Science 部门 ID
  delayBetweenPages: 2000,         // 请求间隔（毫秒）
  maxRetries: 3,                   // 失败重试次数
  headless: true,                  // 无头模式
  debug: process.env.DEBUG === 'true'
};
```

### 爬取其他院系

如需爬取其他院系，需要找到对应的 `departmentId`：

1. 访问 https://www.adelaide.edu.au/directory/
2. 选择目标院系
3. 查看 URL 中的 `v_department=` 参数

例如：
- Computer Science: `12521`
- Psychology: `?` （需要查找）
- Economics: `?` （需要查找）

## 礼貌爬虫规则

本脚本遵循以下规则：

1. **User-Agent 识别**
   ```
   OhMyProfessors/1.0 (Educational; contact@ohmyprofessors.com)
   ```

2. **请求频率限制**
   - 每个请求间隔 2 秒
   - 避免对服务器造成负担

3. **错误处理**
   - 最多重试 3 次
   - 使用指数退避策略

4. **尊重 robots.txt**
   - Adelaide 大学允许爬取公开目录

## 运行统计

脚本完成后会显示：

```
============================================================
SCRAPING COMPLETE
============================================================
Total profiles: 39
Successful: 38
Failed: 1
Success rate: 97.4%
Duration: 125.3s
Output: data/adelaide-professors.json
============================================================
```

## 常见问题

### Q: 爬虫速度很慢？

**A:** 这是设计如此。为了遵守礼貌爬虫规则，每个请求间隔 2 秒。爬取 100 个教授大约需要 3-4 分钟。

### Q: 某些教授没有邮箱？

**A:** 部分教授的邮箱未在公开目录中列出，这是正常现象。数据中会显示为空字符串。

### Q: 如何获取课程列表？

**A:** 当前版本的 `courses` 字段为空数组。未来版本将实现：
- 从研究者档案页面爬取
- 或从课程目录匹配
- 这需要额外的爬取逻辑

### Q: 爬虫失败了怎么办？

**A:** 
1. 检查网络连接
2. 确认 Adelaide 大学网站可访问
3. 运行 `npm run scrape:dev` 查看详细日志
4. 检查 `data/` 目录是否有写入权限

### Q: 网站结构改变了？

**A:** 
1. 打开浏览器访问 https://www.adelaide.edu.au/directory/
2. 检查页面结构是否发生变化
3. 修改 `scrape-adelaide.ts` 中的选择器
4. 常见修改位置：
   - `getProfessorListUrls()` - 列表页选择器
   - `scrapeProfessorProfile()` - 详情页选择器

## 数据隐私

**重要提示：** 

- ✅ 所有数据均来自 Adelaide 大学公开的 Staff Directory
- ✅ 仅爬取公开信息（姓名、职称、邮箱等）
- ✅ 不爬取敏感或私人信息
- ✅ ���守 Adelaide 大学网站使用条款

根据 Adelaide 大学的声明：

> "The information in this directory is provided to support the academic, 
> administrative and business activities of the University of Adelaide."

我们的用途（学生评价平台）属于学术相关用途。

## 未来改进

### Phase 2 功能
- [ ] 爬取课程列表（需要额外的数据源）
- [ ] 支持多院系批量爬取
- [ ] 增量更新（只爬取新增/变更的教授）
- [ ] 导出为 CSV 格式

### Phase 3 功能
- [ ] 自动检测网站结构变化
- [ ] 爬取研究兴趣、发表论文等详细信息
- [ ] 集成到自动化流程（Cron Job）

## 维护

**预期维护工作量：**
- 正常情况：几乎为零
- 网站改版：1-2 小时修复选择器
- 每学期运行：1 次（手动触发）

**6个月后如何维护：**
1. 运行 `npm run scrape:dev`
2. 检查输出是否正常
3. 如果失败，查看错误日志
4. 对比网站结构，调整选择器

## 许可

本脚本仅用于教育和研究目的。请遵守 Adelaide 大学的网站使用条款。

---

**编写日期：** 2026-02-11  
**最后更新：** 2026-02-11  
**作者：** OhMyProfessors Development Team  
**联系方式：** contact@ohmyprofessors.com
