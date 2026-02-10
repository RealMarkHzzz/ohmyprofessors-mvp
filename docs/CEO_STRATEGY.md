# OhMyProfessors - CEO 战略定义

**Version:** 1.0  
**Date:** 2026-02-10  
**Author:** PA (Main Orchestrator)

---

## 1. Executive Summary

**一句话定位:**  
OhMyProfessors 是面向澳洲大学生的下一代教授评价平台，通过结构化数据、AI 驱动推荐和社区驱动内容，帮助学生做出更明智的选课决策。

**目标市场规模:**
- **Phase 1 (Adelaide):** 50,000+ 在校大学生
- **Phase 2 (Australia):** 1.5M+ 大学生
- **Phase 3 (Global):** 20M+ 英语国家大学生

**核心差异化优势:**
1. **结构化评价:** 难度、工作量、考试形式等可量化指标
2. **课程关联:** 评价与具体课程代码绑定，精准匹配
3. **AI 驱动推荐:** 基于学生偏好推荐教授和课程组合
4. **本地化优先:** 深度服务澳洲市场，理解本地教育体系

---

## 2. Product Positioning

### 核心价值主张 (Value Proposition)

**Why OhMyProfessors > RateMyProfessors?**

| 维度 | RateMyProfessors | OhMyProfessors |
|------|------------------|----------------|
| **数据结构** | 自由文本为主 | 结构化评分 + 标签 |
| **课程关联** | 弱关联 | 强绑定课程代码 |
| **本地化** | 美国中心化 | 澳洲优先 |
| **AI 能力** | 无 | 推荐算法 + 智能筛选 |
| **移动体验** | 一般 | Mobile-first 设计 |

### 目标用户 (Target Audience)

**Phase 1: Adelaide 大学生** (Week 1-12)
- University of Adelaide
- Flinders University  
- UniSA

**Phase 2: 全澳扩展** (Month 4-12)
- Group of Eight 名校
- 其他州主要大学

**Phase 3: 全球市场** (Year 2+)
- 英国、加拿大、新西兰
- 新加坡、香港

### 3 个关键差异点

1. **结构化数据采集**
   - 难度评分 (1-5)
   - 工作量评估 (Hours/week)
   - 考试形式标签 (Open book / Closed book / Take-home)
   - 推荐度 (Yes/No/Maybe)

2. **课程代码强绑定**
   - 每条评价必须关联具体课程 (e.g., COMP SCI 1012)
   - 支持按课程、按教授双向查询
   - 课程难度趋势分析

3. **澳洲本地化**
   - 理解澳洲学期制 (Semester 1/2)
   - 支持 WAM/GPA 计算辅助
   - 本地化内容审核（符合澳洲法律）

---

## 3. Business Model

### Revenue Strategy (3-Phase)

#### **Phase 1 (0-6 Months): 增长优先，零收入**
- **策略:** 免费使用，全力获取用户和数据
- **投入:** 技术开发 + 社区运营
- **目标:** 10,000+ 注册用户，50,000+ 评价数据

#### **Phase 2 (6-12 Months): 数据变现探索**
- **B2C 路径:**
  - 高级功能订阅 ($4.99/月)
    - AI 选课规划
    - 课程难度预测
    - 无广告体验
- **B2B 路径:**
  - 大学教学质量分析报告 ($5,000-$20,000/年)
  - 匿名化数据授权 (教育科研机构)

#### **Phase 3 (12 Months+): 规模化收入**
- **广告变现:** 教育相关广告 (Tutoring, Textbooks)
- **企业服务:** EdTech 平台数据 API
- **Premium Tier:** 团队账号 (学生社团、学习小组)

### Unit Economics (预估)

- **CAC (获客成本):** $2-5 (社交媒体 + SEO)
- **LTV (生命周期价值):** $15-30 (订阅 + 广告)
- **LTV/CAC 目标:** 3:1 以上

---

## 4. MVP Roadmap

### **Phase 1 (Week 1-4): 核心功能 MVP**

**Must-Have Features:**
- ✅ 教授搜索 (名字、课程代码)
- ✅ 评价提交表单
  - 结构化字段 (难度、工作量、推荐度)
  - 课程代码绑定
  - 自由文本评论
- ✅ 评价展示页面
  - 平均评分统计
  - 最新评价列表
  - 标签云 (Tag Cloud)
- ✅ 用户认证
  - 邮箱注册 (.edu.au 优先)
  - 邮箱验证

**Tech Stack:**
- Next.js 16 + React 19
- Supabase (Auth + Database)
- Tailwind CSS v4

**Launch Strategy:**
- Soft launch 于 Adelaide 3 所大学
- 目标: 500 注册用户，2,000 条评价

---

### **Phase 2 (Week 5-8): 社区功能**

**New Features:**
- ✅ 点赞/举报系统
  - 评价质量投票
  - 垃圾/诽谤内容举报
- ✅ 高级筛选
  - 按难度范围筛选
  - 按学期筛选 (S1/S2)
  - 按推荐度筛选
- ✅ 用户个人主页
  - 评价历史
  - 贡献度徽章

**Growth Target:**
- 2,000 注册用户
- 10,000 条评价
- 日活用户 (DAU) 200+

---

### **Phase 3 (Week 9-12): 增长功能**

**New Features:**
- ✅ SEO 优化
  - 静态生成教授详情页
  - Sitemap + Metadata 优化
  - Schema.org 结构化数据
- ✅ AI 推荐引擎 (Beta)
  - 基于历史选课推荐教授
  - 课程组合优化建议
- ✅ 社交分享
  - 分享教授评价到社交媒体
  - 嵌入式评价卡片

**Growth Target:**
- 5,000 注册用户
- 25,000 条评价
- Google 自然搜索流量 1,000/月

---

## 5. Success Metrics

### North Star Metric
**每周新增高质量评价数** (Weekly Quality Reviews)

定义: 包含结构化数据 + 100字以上评论的评价

**为什么?**
- 直接反映平台价值创造
- 平衡数量与质量
- 驱动用户留存和网络效应

---

### Key Performance Indicators (KPIs)

#### **Week 1 Target (Soft Launch)**
- ✅ 100 注册用户
- ✅ 500 条评价提交
- ✅ 50 条高质量评价
- ✅ 10% 用户回访率

#### **Month 1 Target**
- ✅ 500 注册用户
- ✅ 2,000 条评价
- ✅ 200 DAU
- ✅ 20% 用户回访率

#### **Month 3 Target (PMF Validation)**
- ✅ 2,000 注册用户
- ✅ 10,000 条评价
- ✅ 500 DAU
- ✅ 30% 用户回访率
- ✅ NPS (Net Promoter Score) > 40

---

### PMF 验证标准 (Product-Market Fit)

**达成条件 (满足 3/5):**

1. **用户留存:** 30-day retention > 30%
2. **口碑传播:** 50%+ 用户通过口碑获取 (非付费渠道)
3. **使用频率:** 周活用户 (WAU) / MAU > 60%
4. **用户调研:** "如果这个产品消失，你会多失望？" > 40% 回答 "非常失望"
5. **自然增长:** 月增长率 > 20% (无付费推广)

---

## 6. Go-to-Market Strategy

### **Step 1: 软启动 (Soft Launch) - Week 1-2**

**Target:** Adelaide 3 所大学核心用户群

**Tactics:**
- ✅ 校园大使计划
  - 招募 10-15 名学生大使
  - 每人负责 1-2 个学院/专业
  - 奖励机制: 每邀请 10 人获赠 Premium 1 个月
- ✅ 线下推广
  - 校园海报 (高流量区域: 图书馆、食堂)
  - 传单发放 (开学周)
- ✅ 社交媒体
  - 小红书 Adelaide 学生社区
  - ACSA 官方渠道合作
  - Facebook 校园群组

**Success Criteria:**
- 100 注册用户
- 500 条评价

---

### **Step 2: 首批用户获取 - Week 3-4**

**Channels:**

1. **Organic Social (有机社交)**
   - 小红书话题: #阿德莱德选课攻略 #教授推荐
   - Instagram: @ohmyprofessors_au
   - TikTok: 短视频教授评价合集

2. **Content Marketing (内容营销)**
   - 博客: "Adelaide 选课生存指南"
   - YouTube: "如何避开水课教授"
   - Podcast 访谈: 邀请学生分享选课经验

3. **Community Partnerships (社区合作)**
   - ACSA 官方推荐
   - 各学院学生会合作
   - 留学中介渠道 (Pre-arrival 资源)

**Success Criteria:**
- 500 注册用户
- 2,000 条评价
- 10+ 媒体提及 (小红书 KOL, 学生博主)

---

### **Step 3: 病毒式传播机制 - Week 5-8**

**Viral Loops:**

1. **邀请奖励**
   - 邀请 3 个好友 → 解锁 "所有教授平均工作量" 数据
   - 邀请 10 个好友 → Premium 免费 1 个月

2. **社交分享**
   - 评价后自动生成精美卡片 (含评分、标签)
   - 一键分享到小红书/Instagram Story
   - 分享后解锁查看更多评价

3. **Gamification (游戏化)**
   - 贡献度徽章: Bronze/Silver/Gold Reviewer
   - 排行榜: 本周最有帮助的评价
   - 抽奖: 每月抽取 3 名活跃用户送 $50 Coles 礼品卡

**Success Criteria:**
- K-factor (病毒系数) > 0.5
- 50%+ 用户通过邀请获取

---

### **Step 4: SEO 优化 - Week 9-12**

**Long-tail Keywords:**
- "University of Adelaide [Course Code] review"
- "Best professors for [Course Name] Adelaide"
- "[Professor Name] teaching style"

**Technical SEO:**
- ✅ 静态生成所有教授/课程页面 (Next.js SSG)
- ✅ Schema.org markup (AggregateRating, Course, Person)
- ✅ Sitemap 自动生成
- ✅ Open Graph 优化 (社交分享预览)

**Content SEO:**
- ✅ 每周发布 2-3 篇选课指南博客
- ✅ YouTube SEO (字幕、标题优化)
- ✅ Guest posting 于教育论坛/博客

**Success Criteria:**
- Google 自然搜索流量 > 1,000/月
- 20+ 长尾关键词排名前 10

---

## 7. Risk Mitigation

### **Key Risks & Mitigation:**

| 风险 | 影响 | 概率 | 应对策略 |
|------|------|------|----------|
| **法律风险 (诽谤)** | 高 | 中 | 内容审核机制 + 用户协议 + 举报系统 |
| **冷启动问题** | 高 | 高 | 校园大使 + 线下推广 + ACSA 合作 |
| **数据质量低** | 中 | 中 | 结构化表单 + 质量激励 + 审核流程 |
| **竞品进入** | 中 | 低 | 本地化优势 + 快速迭代 + 社区粘性 |
| **隐私问题** | 高 | 低 | 匿名评价 + .edu.au 验证 + GDPR 合规 |

---

## 8. Resource Requirements

### **Team (MVP Phase)**
- ✅ 1x Fullstack Developer (已有技术栈)
- ✅ 1x Product/Growth (兼任)
- ✅ 10-15x 校园大使 (兼职)

### **Budget (Month 1-3)**
- Infrastructure: $50/月 (Vercel + Supabase)
- Marketing: $500/月 (海报、传单、校园活动)
- Incentives: $300/月 (大使奖励、抽奖)
- **Total:** ~$1,000/月

### **Time to Launch**
- Week 1-4: MVP 开发
- Week 5: 内测 (50 用户)
- Week 6: Soft Launch (Adelaide)

---

## 9. Exit Strategy (Optional)

**Potential Acquirers:**
- 教育科技公司 (Blackboard, Canvas)
- 大学管理系统 (Ellucian, Workday)
- 学习平台 (Coursera, Udemy)

**Acquisition Multiple:**
- 预估: 3-5x ARR (年度经常性收入)
- Target ARR for exit: $500K-$1M

---

## 10. Next Steps (Immediate Actions)

### **Week 1 (This Week):**
- [ ] 完成 CTO 架构设计文档
- [ ] 完成 Product 功能规格文档
- [ ] 搭建企业级项目结构
- [ ] 配置 Supabase 数据库

### **Week 2:**
- [ ] 开发核心功能 (搜索 + 评价 + 展示)
- [ ] 设计 UI/UX (参考 shadcn/ui)
- [ ] 编写用户协议和隐私政策

### **Week 3:**
- [ ] 内测 (邀请 50 名学生)
- [ ] 收集反馈并迭代
- [ ] 准备 Soft Launch 物料

### **Week 4:**
- [ ] Soft Launch (Adelaide 3 所大学)
- [ ] 启动校园大使计划
- [ ] 监控核心指标

---

**Last Updated:** 2026-02-10  
**Document Owner:** CEO (Jeff Bezos Persona)  
**Review Cycle:** Bi-weekly during MVP phase

---

*"Your margin is my opportunity." - Jeff Bezos*  
*在教授评价市场，我们的机会是本地化深度 + 数据结构化。*
