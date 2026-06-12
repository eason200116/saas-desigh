# SitINR ↔ 目标后台（SaaS）· 功能叫法对照表

> 同一功能在源站 SitINR 与目标 SaaS 后台的**名称对照**。来源：`saas-workplan` 的 CMP 迁移对照 + V1F 源功能清单（控制器名）。
> 用途：迁移/沟通时对齐"这功能源站叫什么、SaaS 叫什么"。时间：2026-06-10

## 一、名称不同（同一功能、叫法变了）

> 会员管理是迁移最密的模块。下表按 SitINR 真实源码 `Areas/Admin/Views/UserInfo`（93 视图，过滤纯财务后会员域 50+）+ `Views/Agent`（代理返佣）+ VIP/洗码 控制器逐一核对。
> 状态：**原**=SitINR已有·已迁移 ｜ **🆕**=SaaS新上架/重命名 ｜ **⏳**=SitINR有·原型暂未纳入 ｜ **↗**=迁至其它模块

### ① 会员列表与详情
| SitINR 叫法 | 目标后台叫法 | 源视图 | 状态 |
|---|---|---|---|
| 会员列表 | 会员列表（17筛选/14批量/自定义列）| `UserManage` | 原+🆕增强 |
| 会员详情 | 会员详情（6Tab + 红字新增字段，见末表）| `UserDetaile` | 原+🆕字段 |
| 会员投注汇总 | 详情 - 投注 Tab | `UserDetaile_BetTotal` | 原 |
| 会员审核 | 会员审核 | `UserReview` | ⏳ |
| 批量取号 / 批量红利回收 | 批量操作 | `GetBatchUser`/`BatchUserBonusBack` | 原 |
| 在线人数 | 在线人数 | （在线会员列表）| 原 |

### ② 会员层级与代理关系
| SitINR 叫法 | 目标后台叫法 | 源视图 | 状态 |
|---|---|---|---|
| 会员层级 | 会员层级（代理维度）| — | 原 |
| 下级会员列表 | 下级会员 | `SubsetUserList`/`_New` | 原 |
| 会员数据导入 | 会员数据导入 | `UserDataImport` | ⏳ |

### ③ 认证 · 银行卡 · 钱包
| SitINR 叫法 | 目标后台叫法 | 源视图 | 状态 |
|---|---|---|---|
| 银行卡查询 | 会员银行卡管理（6Tab 整合）| `UsersBanks` | 原·重组 |
| 实名认证 | 银行卡 - 实名认证 Tab | `UserRealName` | 原 |
| CPF认证 | （暂不纳入 · 已移除）| `UserCpfList` | ⏳ |
| KW认证 | KW认证 | `UserKWList` | ⏳ |
| 会员USDT钱包 | 银行卡 - USDT Tab | `UserUsdtList` | 原 |
| 会员钱包 | 详情 - 钱包 Tab | `WalletList` | 原 |
| 加卡赠送 | 加卡赠送 | `AddBankGiveAway` | ⏳ |

### ④ 登录 · 验证 · 分组
| SitINR 叫法 | 目标后台叫法 | 源视图 | 状态 |
|---|---|---|---|
| 登录日志列表 | 登录日志 | `LoginlogList`/`LoginLog` | 🆕上架 |
| 登录日志(代理) | 登录日志(代理) | `LoginLog_Agent` | ⏳ |
| 短信验证码查询 | 短信验证码查询 | `SmsList` | 🆕上架 |
| 用户分组 | 分组管理（重命名）| `UserGroup` | 🆕改名 |
| 分组权限配置 | 并入「分组管理」编辑表单 · 分组权限区 | `UserGroupRightsForm` | ↗合并 |

### ⑤ VIP 管理
| SitINR 叫法 | 目标后台叫法 | 源视图 | 状态 |
|---|---|---|---|
| VIP等级 | VIP等级 | `VipLevel` | 🆕→配置中心 |
| VIP人数 | VIP人数 | `VipLevelQuantity` | 🆕→运营数据 |
| 经验值配置 | VIP等级配置（含经验值配置）| `VipCurrencyExp` | 🆕→配置中心 |
| VIP操作日志 | VIP操作日志 | `VipRecord` | 🆕→运营数据 |
| VIP奖励记录 | VIP奖励记录 | `VipRewards` | 🆕→运营数据 |
| VIP等级调整 | VIP等级调整（操作）| `UpdateVipLevel` | 原 |

### ⑥ 返佣 · 代理（Agent 域）
| SitINR 叫法 | 目标后台叫法 | 源视图 | 状态 |
|---|---|---|---|
| 会员返佣 / 修改返佣 | 详情 - 代理数据 | `UserRebate`/`EditUserRebate` | 原 |
| 返佣报表 | 返佣报表 | `UserRebateReport` | 🆕→运营数据 |
| 返佣等级报表 | 返佣等级报表 | `UserRebateLvReport` | ⏳ |
| 会员返佣等级 / 昨日返佣等级 | 返佣等级 / 昨日返佣等级 | `User_RebateLv`/`_Last` | 🆕上架 |
| 返佣等级配置 / 比例配置 | 返佣等级 | `RebateLevel`/`RebateLvRateConfig` | 🆕→配置中心 |
| 手动返佣 | 手动返佣（操作）| `RebateManual` | 原 |
| 代理审核机制 | 代理审核机制 | `AgentAudit` | ⏳→配置中心 |

### ⑦ 风控 · 奖励 · 消息（会员侧）
| SitINR 叫法 | 目标后台叫法 | 源视图 | 状态 |
|---|---|---|---|
| 异常会员处理 | 异常会员处理 | `AbnormalUser` | 🆕→风控 |
| 相同IP | 同IP/设备检测（注册/登录 × IP/设备） | `Report/Ip_Same` | 🆕→风控 |
| 会员活动黑名单 | 会员活动黑名单 | `MemberActivityBlack` | ⏳ |
| 会员奖励记录 / 合伙人奖励 | （归运营·暂隐）| `UserRewardRecord`/`PartnerRewards` | ↗ |
| 首充管理 / 签到 / 任务活动 | （归活动营销）| `FirstRechargeManage`/`SinIn`/`TaskActivity` | ↗ |
| 会员消息 | 站内消息 | `Message` | 🆕→运营 |

### ⑧ 会员洗码（独立模块）
| SitINR 叫法 | 目标后台叫法 | 源控制器 | 状态 |
|---|---|---|---|
| 码量记录（按会员查询）| 洗码记录（流水×比例/日结周结/合计）| `CodeWashRecord` | 🆕原型已建 |
| 码量规则 | 洗码规则说明（游戏×VIP规则表）| `CodeWashRule` | 🆕原型已建 |

### 会员详情 · 新增字段（红字标注 · 会员列表点「详情」进入 · 12 板块）
> 相对源站 `UserDetaile.cshtml` 的**新增/重排字段**。✅ SitINR已有(迁移) ｜ 🟡 底层有·聚合呈现新 ｜ ❌ 真·新增

| 板块 | 目标后台字段 | SitINR 出处/叫法 | 状态 |
|---|---|---|---|
| 基本信息 | 邀请人 | 邀请码 `InviterCode` | ✅ |
| 基本信息 | 访问端 | 注册设备 `PhoneType` | 🟡 |
| 归因来源（新板块）| 主归因 | 渠道/来源数据有·"主归因"聚合 | 🟡 |
| 归因来源 | 推广平台名称（Facebook/Meta）| 推广平台（11命中）| ✅ |
| 归因来源 | 注册渠道 / 登录渠道 | 渠道号 `ChannelCode` | ✅ |
| 归因来源 | 邀请码 / 邀请类型 | `InviterCode`（类型部分新）| 🟡 |
| 归属与层级（新板块）| 集团 | 无 | ❌ |
| 归属与层级 | 市场 | 无 | ❌ |
| 归属与层级 | 商户 | CloudFlare 级商户 | 🟡 |
| 代理数据 | 上级代理ID / 下级数量 / 总佣金 | `UserDetaile.cshtml` | ✅ |
| 代理数据 | 返佣等级（3 条件达标）| `Rebate_Lv`（Agent区）| ✅ |
| 代理数据 | 是否领取返佣 | `RebateState_Bet` | ✅ |
| 代理数据 | 是否对上级返佣 | 无 | ❌ |
| 代理数据 | 代理状态 | 部分（2命中）| 🟡 |
| 代理数据 | 代理路径 / 代理层级 / 佣金模式 | 代理树底层有·详情呈现新 | 🟡 |
| 注册信息 | 注册浏览器指纹 · 同IP/同指纹注册数 | `UserDetaile.cshtml` | ✅ |
| 注册信息 | 注册端 | `PhoneType` | 🟡 |
| 注册信息 | 是否模拟器 | 无 | ❌ |
| 注册信息 | 注册域名 | 无 | ❌ |
| 登录信息（新板块）| 登录端 | `PhoneType` | 🟡 |
| 登录信息 | 登录域名 | 无 | ❌ |
| 登录信息 | 同设备登录数 / 同设备账号数 | 部分（5命中）| 🟡 |

### 财务管理
| SitINR 叫法 | 目标后台叫法 | 源控制器/视图 |
|---|---|---|
| 收款银行卡 | 本地收款账号管理（4Tab）| `RechargesBank` |
| 第三方支付 | 支代付三方管理 | `ThirdPayBank` |
| 银行管理 | 银行字典 | `Bank/TranBank` |
| 充值渠道 + 支付方式（2页）| 充值类型管理（2Tab）| `RechargeChannel`/`PayName` |
| 充值列表 | 充值订单管理（4Tab）| `Recharge` |
| 提现审核 + RemoteWork 出款（分散6页）| 提现订单管理（6Tab 整合）| `WithdrawalExamine`/`RemoteWork` |
| 出款组别权限配置 | 提现订单 - 组别配置 | `WithdrawalGroupConfig` |
| 人工充值权限配置 | 系统-权限（部分覆盖）| `ManualRechargePermission` |
| 支付测试接口 | 充值/提现通道 - 测试按钮 | — |

### 游戏管理
| SitINR 叫法 | 目标后台叫法 | 源控制器/视图 |
|---|---|---|
| 游戏历史（3视图切换）| 三方游戏记录（5大类Tab+左侧分类）| `Games/GameHistory` |
| 码量记录 | 会员洗码记录 | `PCodeWashRecordPage` |
| 码量规则 | 洗码规则说明 | `CodeWashRule` |

### 系统管理
| SitINR 叫法 | 目标后台叫法 | 源控制器/视图 |
|---|---|---|
| 后台用户列表（简单CRUD）| 系统用户（4Tab详情弹窗+批量）| `System/UserList` |
| 角色权限 | 系统角色 | `RoleList` |
| 操作日志 | 平台日志 | `OperationLog` |
| Web 日志 | 中台日志 | `WebLogList` |
| 菜单管理 | 菜单 | `System/Menus` |
| 站点设置 / H5设置 | 运营 - 站点列表（部分）| `SiteSet`/`H5Setting` |
| APP URL / APK 包管理 | 运营 - APP / 版本管理 | `AppUrlSeeting`/`APKPackageManagement` |
| 版本类型 / 套餐包配置 | 运营 - 套餐包（部分）| `Config` |
| 域名像素配置 / Facebook配置 | 埋点管理 | `EventRegionConfig`/`ApiSettingFacebook` |
| 渠道列表 / 渠道编辑 | 渠道管理 | `Channel/ChannelList` |

### 报表管理
| SitINR 叫法 | 目标后台叫法 | 源控制器/视图 |
|---|---|---|
| 实时统计 / 实时统计明细 | 数据统计（24h/概况/商户/通道/三方）| `Realtime_StatisticsDetail` |
| 横幅管理 | 轮播图管理 | `Products/Banners` |
| 推送消息 / 弹窗消息 / 滚动消息 | 站内消息 / 公告消息 | `PushUserMessage`/`SiteMessages` |

## 二、名称基本一致（其它模块·直接对应）
代理关系 D/C/M/A(`D_UserRelative`) · 返佣报表(`UserRebateReport`) · 充值等级(`RechargeLevel`) · 返佣等级(`Agent/RebateLevel`) · 签到配置(`SinInSetting`) · 首充管理(`FirstRechargeManage`) · IP白名单(`IpList`)
> 会员模块的同名项（异常会员处理/IP黑名单/在线人数/登录日志/短信验证码/VIP等级等）已并入上方「会员管理」整段。

## 三、目标后台真·新增（SitINR 无对应，无"源站叫法"）
- **平台架构**：集团/商户视角切换 · 多商户下拉筛选 · 租户列表(tenantList) · 组织架构(organization)
- **UI 框架**：快捷工作台 · 多Tab页签导航 · 全局自定义列 + 快捷时间按钮
- **数据分析(v3)**：流量看板(trafficDashboard) · 漏斗分析(funnelAnalysis) · 路径分析(pathAnalysis) · 告警(alarm) · 报表看板(dashboard)
- **平台运维(v3)**：系统监控(monitor) · 缓存管理(cache) · 调度任务(scheduler) · 样式管理(styleManage) · 图片裁剪(imageCrop)
- **个人中心**：个人中心(profile)
