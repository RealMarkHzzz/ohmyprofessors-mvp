# 课程优先模式验证清单

## 首页测试
- [ ] 显示课程列表（5 门课程）
- [ ] 课程卡片显示正确（代码、名称、教授数量、评分）
- [ ] 搜索框 placeholder 为 "Search courses..."
- [ ] 点击课程卡片跳转到课程详情页

## 课程详情页测试
- [ ] CourseInfoCard 显示正确（代码、名称、统计）
- [ ] ProfessorComparisonTable 显示正确（表格格式）
- [ ] 教授数据正确（名称、评分、难度、Top Tags）
- [ ] 难度指示器颜色正确（🟢/🟡/🔴）
  - Easy: 绿色 (🟢)
  - Medium: 黄色 (🟡)  
  - Hard: 红色 (🔴)

## 样式测试
- [ ] 蓝色 CTA 按钮（不是金色）
- [ ] Hover 效果正常（上浮、边框变蓝）
- [ ] 响应式布局正常（桌面端）
- [ ] 三列布局显示正确

## TypeScript 测试
- [ ] `npx tsc --noEmit` 无错误
- [ ] 所有类型正确推断

## 测试路径

### 首页
```
http://localhost:3000
```

### 课程详情页（示例）
```
http://localhost:3000/courses/university-of-adelaide-comp-1012
http://localhost:3000/courses/university-of-adelaide-comp-2123
http://localhost:3000/courses/university-of-adelaide-math-1200
```

## 验证步骤

1. **环境检查**
   ```bash
   cd /Users/mark/.openclaw/workspace/projects/ohmyprofessors
   cat .env.local | grep USE_MOCK_COURSES
   # 应该显示：USE_MOCK_COURSES=true
   ```

2. **TypeScript 编译**
   ```bash
   npx tsc --noEmit
   # 应该没有错误
   ```

3. **启动开发服务器**
   ```bash
   npm run dev
   # 应该在 http://localhost:3000 启动
   ```

4. **浏览器测试**
   - 打开首页，检查课程列表
   - 点击任意课程卡片
   - 验证课程详情页显示正确
   - 检查教授对比表数据

## Mock 数据概览

### 课程列表（5门）
1. COMP 1012 - Computer Science I (3 professors)
2. COMP 2123 - Data Structures and Algorithms (2 professors)
3. COMP 3301 - Operating Systems (2 professors)
4. COMP 4501 - Machine Learning (2 professors)
5. MATH 1200 - Calculus I (4 professors)

### 教授数据
- 每门课程至少有 2 位教授
- 包含评分、难度、Top Tags
- 难度等级：Easy, Medium, Hard

## 成功标准

✅ **文件创建**
- [x] lib/data/mock-course-professors.ts
- [x] .env.local (USE_MOCK_COURSES=true)
- [x] COURSE_FIRST_VERIFICATION.md

✅ **API 修改**
- [x] lib/api/courses.ts 添加 mock fallback
- [x] getCourses() 使用 mock 数据
- [x] getCourseByCode() 使用 mock 数据
- [x] getCourseProfessors() 使用 mock 数据

✅ **TypeScript 编译**
- [ ] 无编译错误
- [ ] 所有类型正确

✅ **本地测试**
- [ ] 开发服务器启动成功
- [ ] 首页显示 5 门课程
- [ ] 课程详情页正常访问
- [ ] 教授对比表正确显示

## 注意事项

⚠️ **Mock 数据是临时的**
- 当 Supabase courses 表迁移完成后，设置 `USE_MOCK_COURSES=false`
- Mock 数据仅用于本地开发测试
- 生产环境不应使用 mock 数据

⚠️ **数据一致性**
- Mock 数据的 professor slugs 应与实际数据库一致
- 点击教授姓名链接可能会跳转到实际教授页面（如果存在）

## 下一步

测试通过后：
1. 迁移课程数据到 Supabase courses 表
2. 设置 `USE_MOCK_COURSES=false`
3. 验证真实数据正常工作
4. 删除 mock 相关代码（或保留用于测试）
