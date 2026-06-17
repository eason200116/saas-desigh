# V1 项目知识库（统一上下文索引）

> 本文件是 `/Users/eason/v1` 全项目的知识中枢。任何新会话先读此文件即可快速建立完整上下文。
> 维护角色：本会话负责持续整理产出、吃透 v1 代码/数据库/内容，为原型设计等其他会话提供支持。
> 📌 **置顶主线**：所有新增/迁移走 [产品工作流·从需求大纲到最终呈现](产品工作流.md)（需求大纲→归档→原型→评审→开发→验收→呈现）。
> 最后更新：2026-06-15

---

## 0. 一句话背景

把现有**单站点博彩后台系统 SitINR**（ASP.NET MVC + SQL Server）逐步迁移、重构为**多集团多商户 SaaS 后台**（Vue3 + Naive UI）。迁移过程中去重、优化、统一交互。当前处于原型设计 + 分阶段迁移阶段。

---

## 1. v1 目录全景

```
/Users/eason/v1/
├── Ar_V1_Admin/          # 【源系统-前端】SitINR 后台 ASP.NET MVC（11229 文件，29 Controller）
├── ar_v1_lotteryapi/     # 【源系统-后端】WaterCloud 框架 .NET API（2256 文件）
├── Ar_V1_DataBase/       # 【源系统-数据库】SQL Server 5 库脚本（见 §4）
├── saas-desigh/          # 【设计产出】原型 + 文档 + 会员端本地副本（本项目主目录）
├── AR SaaS - Vue.html + _files/      # SaaS 会员端前端（浏览器另存，不完整）
├── saas后台.html + _files/           # SaaS 后台首页（浏览器另存）
├── SitINR超级管理系统.html + _files/  # SitINR 后台页面（浏览器另存）
└── saas素材/             # SaaS 后台截图 54+ 张（UI 规范来源）
```

**三个源码仓库 = 迁移的「源」；saas-desigh = 迁移的「目标设计」。**

---

## 2. 源系统 SitINR（迁移来源）

### 2.1 前端 Ar_V1_Admin（ASP.NET MVC）
- 后台区域：`PC.dianzan/Areas/Admin/`
- **29 个 Controller、700+ Action、800+ 视图**
- 主布局：`Areas/Admin/Views/Shared/_Layout.cshtml`
- 权限模型：`RoleType + 权限标识(view/add/update/delete)`，检查方法 `UserHelper.CheckDataRole()` / `CheckPageRole()`
- 角色权限存储：`sys_Roles.Menus`（菜单ID逗号分隔）+ `sys_Roles.Authority`（`menusign:action|...`）

**核心 Controller（按业务）：**
| Controller | 业务 | 规模 |
|---|---|---|
| UserInfoController | 会员管理（列表/详情/分组/层级/银行卡/VIP/签到/返佣/代理/C2C/实名/任务/首充） | 208 Action · 95 视图 |
| SystemController | 系统管理（菜单/用户/角色/站点/短信/邮件/消息/IP/设备/安全/规则/客服） | 161 Action · 152 视图 |
| GameManageController | 自营游戏（WinGo/K3/5D/4D/Bingo18/TRX/XOSO/F-XOSO 期号订单控制） | 79 Action · 153 视图 |
| ThirdGameController | 第三方游戏（厂商/游戏列表/码量/RTP/投注记录） | 65 Action |
| ReportController | 报表（邀请/渠道/财务/游戏/用户/留存，D/C/M/A 四级） | 97 Action · 111 视图 |
| RechargeController | 充值提现（支付方式/渠道/UPI/USDT/人工充值） | 59 Action · 44 视图 |
| RemoteWorkController | 出款管理（仪表板/操作台/组别/报表） | 43 Action |
| ConfigController | 配置（快递/版本/套餐/推送/角色类型） | 40+ Action |
| TreasureController | 活动（每日/每周任务/礼包/老用户回归） | 28 Action |
| AgentController | 代理（返佣等级/比例/手动返佣/邀请报表） | 16 Action |
| TurntableController | 转盘（配置/任务/记录） | 12 Action |
| 其它 | FinanceController/BankController/ChannelController/ProductsController/WealthController/InvitedwheelController/GamesController 等 | — |
| 空壳 | ERP/GiftPack/Member/Orders Controller（无 Action） | — |

> 完整功能清单见 `docs/sitinr-feature-map.html`（11模块 700+功能点，可搜索/折叠）

### 2.2 后端 ar_v1_lotteryapi（WaterCloud 框架）
多 API 项目分离：
- `WaterCloud.WebApi` —— 主 API（会员端，33 Controller）
- `WaterCloud.CloudFlareApi` —— CDN/配置（5 Controller）
- `WaterCloud.WebIntranetApi` —— 内部（支付回调/通知）
- `WaterCloud.ManualWithdrawApi` —— 手动提现
- `WaterCloud.WebSitesApi` / `WebExtendApi` —— 站点/扩展
- `WaterCloud.Service`（126 Service）/ `Domain` / `Data` / `Code`
- `脚本库/` —— 版本化 SQL 升级脚本（菜单配置在 `子任务脚本/V*/【andy-*】菜单配置.sql`）

### 2.3 数据库 Ar_V1_DataBase（SQL Server 5 库）
| 文件 | 库 | 内容 |
|---|---|---|
| 1.*Lottery库.sql (2.2M) | Lottery | 主库：用户/订单/充值/提现/站点/权限/消息 |
| 2.*Lottery_Agent库.sql (180K) | Lottery_Agent | 代理库 |
| 3.*Lottery_Chart库.sql (4.0M) | Lottery_Chart | 统计分析库 |
| 4.*Lottery_Game库.sql (1.0M) | Lottery_Game | 游戏库 |
| 5.*Lottery_Log库.sql (2.6M) | Lottery_Log | 日志库 |
| 6.*代理作业.sql (161K) | — | SQL Agent 作业 |

**关键表：**
- `tab_Sites` —— 站点表（SiteID/名称/Logo/协议/APP下载/版本）
- `tab_GlobalSiteConfig` —— 全局站点配置（币种/语言/区号/货币符号/API地址/支付域名/商城or彩票模式）
- `tab_SiteMessage` —— 站点消息（Type: 0维护公告/1滚动/2登录弹框/3在线推送）
- `tab_Users` / `Users_Locked` / `Users_Safe` —— 会员/锁定/安全
- `tab_FinancialLog` / `tab_Recharges` / `tab_Withdraw` —— 账变/充值/提现
- `tab_*_Game` / `tab_*_GameOrder` —— 各游戏表+订单（0-99 分片）
- `sys_Users` / `sys_Roles` / `sys_Menus` —— 后台用户-角色-菜单三层权限
- `tab_SmsSettings` —— 短信配置（18 种短信商户）
- `tab_Chart_*` —— 各维度统计表

---

## 3. 目标系统 SaaS 后台（迁移目标）

### 3.1 技术与架构
- **Vue3 + Naive UI**，多 Tab 页签 SPA
- **多集团多商户**：顶栏支持集团→商户切换（SitINR 是单站点，这是核心架构升级）
- 会员端前端本地副本：`member-app/`（见 §6），访问 `http://localhost:8200/#/profile`，演示账号 admin/123456

### 3.2 SaaS 后台 5 大模块（来自 saas后台.html + saas素材 截图）
财务管理 · 会员管理 · 游戏管理 · 系统管理 · 报表管理

**已确认的 32 个页面**（截图核实）：
- 平台架构：集团/商户切换、多商户筛选、快捷工作台(24入口)、多Tab导航、全局自定义列、快捷时间按钮
- 会员管理：会员列表、会员详情(6Tab:基本/充提/投注/钱包/账变/操作日志)、会员层级、下级会员、在线人数、会员银行卡管理(6Tab:银行卡/USDT/PIX/电子钱包/UPI/实名认证)
- 财务管理：资金账变、人工充值+审核列表/记录、本地收款账号(4Tab)、支代付三方管理、银行字典、充值类型管理(2Tab)、充值订单管理(4Tab含直充短信)、提现类型管理(2Tab)、提现订单管理(6Tab整合出款模块)、支代付通道预警(5类预警+规则配置)
- 游戏管理：三方游戏记录(5大类Tab+左侧分类导航)
- 系统管理：系统用户(4Tab详情弹窗+批量)、系统角色、IP白名单、平台日志、中台日志
- 报表管理：数据统计(5Tab:24h报表/概况/商户/通道/三方商户号)

### 3.3 SaaS UI 控件规范（截图提取，原型必须遵循）
- **顶栏**：深色 `#1e293b`；Logo渐变图标 + ⏱时间 + 集团名+商户标签+切换；中部5模块导航(带▾下拉)；全屏按钮⛶；右侧在线/出入款/消息(竖排图标+badge)；用户头像+名称+∨
- **顶栏浮窗**：商户切换(两列网格卡片+搜索+选中勾)、在线人数、出入款统计(待出款红色)、消息通知(未读/已读Tab+详情弹窗)、用户菜单(切换语言/修改密码/退出)
- **筛选区**：白底卡片，网格布局，商户必填红星，右侧蓝色「搜索」+「重置」+「收起」+「自定义列」
- **快捷时间**：今天/昨天/本周/上周/本月/上月/所有
- **表格**：蓝灰表头、操作列蓝色链接、底部分页+页面合计/总计
- **按钮**：蓝色主(搜索/新增)、橙色警告(冻结)、绿色确认(解冻)、白底次(导出/重置)
- **状态标签**：绿成功/橙警告/红危险/蓝信息/灰禁用
- 品牌主色 `--brand:#0960bd`（后台）；会员端绿色系

---

## 4. 已生成产出清单（saas-desigh/）

### docs/ 文档
| 文件 | 用途 |
|---|---|
| **saas-workplan.html** | SaaS 后台工作计划书（8板块+三阶段计划+二阶段计划，**最重要的总览**，进度数据权威来源） |
| **saas-phase2-feature-spec.html** | 二阶段功能说明书（28功能点逐页交互规格：全局框架+通用交互规范+每页筛选/列表/操作/弹窗/反馈，验收可逐条点验；与 PRD 互补——PRD 管范围、说明书管交互） |
| **feature-inventory.html** | **V1 全功能点清单（11业务域分类，跨后台/会员端/数据库三层对齐，可搜索）** |
| migration-progress.html | 迁移对照表（数据驱动统计+点击跳转） |
| sitinr-feature-map.html | **旧版**「SitINR 超级管理系统」功能清单(ASP.NET MVC 源码图谱,11模块/700+功能,`/UserInfo/*`) |
| **sit-tenant-admin-map.html** | **新版**「SIT 租户后台」结构与交互图谱(线上 Vue 商户后台实地走查:5模块/24页/34页内子页签 + 七大页面原型,`sit-tenantadmin.lottotest6688.com`,路由 `/member/*`、`/finance/*`)。**与上一行是两个不同系统,勿混用** |
| group-to-member-hierarchy.html/.md | 核心层级体系（已发布 GitHub Pages） |
| member-detail-new-fields.html | 会员详情字段（已发布） |
| v2-core-flows.html | V2 主体系流程 |
| handoff.md | 早期交接说明 |

### prototypes/ 原型
| 文件 | 用途 |
|---|---|
| **group-admin.html** | 集团后台主原型（会员/运营/配置/系统，含权限/商户/渠道管理、保存→发布门控） |
| member-management.html | 商户后台原型 |
| **member-migration-flat.html** | 二阶段会员/运营/配置导航结构原型（7组分类+顶栏交互） |
| finance-local-payment-account.html | 本地收款账号原型 |
| risk-config-center.html | 风控配置中心 |
| vip-config-center.html | VIP/市场配置中心 |

### member-app/ 会员端本地副本
- SaaS 会员端完整离线副本（292资源文件），`http://localhost:8200/#/profile`

---

## 5. 迁移进度（以功能点为单位）

> **权威数据来源：`saas-workplan.html` 对照表（CMP），页面概览板块由 JS 从数据动态计算。**
> 下表为 saas-workplan.html CMP 数据的实时统计（163 个细粒度功能点）：

| 状态 | 数量 | 说明 |
|---|---|---|
| ✅ 已迁移 | 38 | SitINR 功能已在 SaaS 实现 |
| 🔵 SaaS新增 | 24 | SaaS 独有，SitINR 无 |
| ⬜ 待迁移 | 98 | SitINR 有但 SaaS 未做 |
| 🚫 不迁移 | 2 | 理财 / 内部API |

迁移完成率约 **28%**（38/136），含新增覆盖率约 **39%**（62/160）。总计 162 项（去除 C2C）。
模块完成度：财务管理最高（核心充提流程已完成），会员管理（基础已完成，二阶段深度迁移中 21/49），系统管理（用户/角色/日志已完成，配置类待迁移），游戏/活动/代理/报表大部分待三阶段。

**三阶段计划（详见 saas-workplan.html）：**
- 第一阶段【已完成】：多商户架构 + 财务全流程 + 会员基础 + 系统用户权限（14项）
- 第二阶段【进行中】：会员管理深度迁移 49 功能点（21 已完成 / 28 未完成），详见计划书「二阶段计划」板块
- 第三阶段【规划中+部分已建】：系统配置 + 活动营销 + 代理管理 + 报表中心 + 游戏管理；数据分析/运营/租户/系统监控模块已在 v3 原型中建成

---

## 6. 设计底层原则（所有原型必须遵循）

来自 memory `saas-prototype-design-principles.md`：
1. **交互统一**：相似功能交互方式一致
2. **控件统一**：全局同一套控件
3. **交互简洁**：能一步完成不做两步
4. **小白友好**：把使用者当无经验新手——入口明显易找、操作有文字引导、状态有视觉反馈、重要操作有确认

其它已拍板约束（memory）：
- 只用 `/Users/eason/v1/saas-desigh` 路径
- 控件与名词全局一致，不一致先问
- 层级：集团→市场→商户→域名→渠道→会员，商户是隔离边界（无品牌层）
- 发布走 GitHub Pages 标准流程（eason200116/saas-desigh）

---

## 7. 当前待办

1. **二阶段 28 个未完成功能点**：详见 `saas-workplan.html` 「二阶段计划」板块。按 8 组分类（用户查询/用户分组/实名银行卡/充提/登录签到/VIP返佣代理/活动任务/C2C），当前进度 21/49。
2. **member-migration-flat.html 导航原型完善**：7 组多列布局已搭建，子页面内容待补齐。
3. **会员管理 7 组分类映射**（已在 saas-workplan.html 设计说明中记录）：
   - 账号：会员列表/登录日志/短信验证码查询/实名认证/分组管理/IP黑名单
   - 会员层级：会员层级
   - 风控：注册IP/登录IP/浏览器指纹/同设备(待定)
   - 活动：会员活动黑名单
   - 资金：银行卡查询/异常资金处理
   - 代理：下级会员列表/会员返佣等级/昨日返佣等级/代理审核机制
   - VIP：VIP升级奖励记录

---

## 8. 本地预览方式

- 会员端：`http://localhost:8200/#/profile`（固定端口，admin/123456）
- 原型/文档：预览工具或 `python3 -m http.server` 在 saas-desigh 目录
- launch.json 已配 `saas-proto`(8090) 和 `member-app`(8200)

---

## 9. 需求调整记录（交互设计 1–5 会话汇总 · 2026-06-12）

五个「交互设计」会话拍板的全部调整已录入 **二阶段功能说明书 · §十一 需求调整记录**（`docs/saas-phase2-feature-spec.html#s11`），按 全局通用 / 菜单归属 / 会员管理 / 运营管理 / 报表与配置中心 / 风控与系统 六块整理成变更台账，正文与台账冲突时以台账为准。

关键定稿口径（速查）：
- **渠道管理**：仅官方渠道；弹窗字段 渠道名*/域名地址/渠道编码(留空自动生成)/赠送金额/打码量倍数/备注
- **分组管理**：状态列＝badge 纯展示（行内开关撤回）；行操作仅编辑；整表居中
- **昨日返佣等级**：迁入 报表管理/代理报表；五游戏拆 投注金额/返佣金额 双列；工具栏仅导出
- **归属迁移**：会员返佣等级、代理审核机制 → 运营管理/返佣·等级
- **整组移除**：代理关系(D/C/M/A)、代理关系导入、TG频道、对打查询、风控名单、活动任务、7 个废弃功能
- **全局口径**：筛选>5 收起、列数>10 才显自定义列、导出靠右、每页条数 10/20/50/100、商户筛选首位、Toast「已X」

**隐藏内容不录入**：暂未开放入口的页面与字段（域名 / 打包 / 埋点 / PWA配置、配置向导、归属与层级）均不计入台账；四个文档（spec / workplan / index / prd）的隐藏内容描述已全部清除（隐藏措辞残留 = 0）。

**已定稿**：会员列表操作列默认展开、删除「更多」折叠按钮。

待确认 6 项：公告消息加渠道维度（待修改后同步）／VIP等级+经验合并双 tab（待修改后同步）／返佣等级与昨日返佣合并子页签（待修改后同步）／配置弹窗商户作用域三类缺口先补哪个／分组管理编辑弹窗分组权限开关区是否保留／功能页计数多版本（以工作计划书为准）。
