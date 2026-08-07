# AR 前端自定义配置－字段表

> 文件版本：V1.0｜基准：PRD V1.0｜用途：数据模型、接口 payload、Mock 与 UAT 的字段级追溯。

## 1. 阅读规则

- 本文件只定义字段，不重述 PRD 规则；每一行的「对应功能点编号」可点击回完整 PRD 已定案章节。
- 分类只允许「新增字段／使用既有字段／既有字段扩充」三选一；「待后端确认」只表示正式数据库映射尚未取得。
- 「使用既有字段」只基于 E-04／E-05／E-06／E-08／E-09 等原型或 V3 能力证据；原型字段名不保证等于正式数据库 column。
- 接口契约集中于 [接口需求清单](./AR前端自定义配置-接口需求清单.md)；字段表只以接口编号互引，不复制接口定义。

## 2. 数量摘要

| 实体数 | 字段数 | 新增字段 | 使用既有字段 | 既有字段扩充 | 状态含「待后端确认」 |
|---:|---:|---:|---:|---:|---:|
| 23 | 147 | 78 | 20 | 49 | 147 |

## 3. 实体索引

| 实体 ID | 实体／表 | 字段数 | 对应功能点编号 |
|---|---|---:|---|
| [ENT-MER](#ent-mer) | 商户／`merchant_profile` | 6 | [MER-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-mer-01) |
| [ENT-TPL](#ent-tpl) | 模板／主题／`layout_template` | 5 | [ADM-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-adm-01) |
| [ENT-LAY](#ent-lay) | 版面／`frontend_layout` | 10 | [ADM-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-adm-01)、[MER-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-mer-01) |
| [ENT-NAV](#ent-nav) | 导航／`layout_navigation` | 5 | [ADM-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-adm-02) |
| [ENT-CAT](#ent-cat) | 内容分类／`layout_content_category` | 5 | [ADM-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-adm-02) |
| [ENT-BLK](#ent-blk) | 区块／`layout_block` | 7 | [ADM-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-adm-02) |
| [ENT-DOM](#ent-dom) | 主域名／`merchant_domain` | 7 | [DOM-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-dom-01) |
| [ENT-BND](#ent-bnd) | 主域名与版面绑定／`domain_layout_binding` | 7 | [DSP-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-dsp-01)、[DOM-03](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-dom-03) |
| [ENT-LNG](#ent-lng) | 商户语言／`merchant_language` | 6 | [I18N-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-i18n-01) |
| [ENT-I18N](#ent-i18n) | 多语内容／`localized_content` | 7 | [I18N-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-i18n-02) |
| [ENT-ASSET](#ent-asset) | 图片语言变体／`localized_asset_variant` | 6 | [I18N-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-i18n-02) |
| [ENT-GPL](#ent-gpl) | 游戏平台／场馆／`game_platform` | 5 | [GAME-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-game-01) |
| [ENT-GCAT](#ent-gcat) | 游戏分类／`game_category` | 5 | [GAME-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-game-01) |
| [ENT-GAME](#ent-game) | 子游戏／`subgame` | 6 | [GAME-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-game-01) |
| [ENT-ALLOW](#ent-allow) | 商户允许游戏／区块选择／`layout_allowed_game` | 5 | [GAME-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-game-02)、[GAME-03](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-game-03) |
| [ENT-DRF](#ent-drf) | 草稿／`layout_draft` | 6 | [ADM-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-adm-02)、[MER-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-mer-01) |
| [ENT-SCH](#ent-sch) | 定时发布计划／`layout_schedule` | 7 | [MER-04](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-mer-04) |
| [ENT-PUB](#ent-pub) | 商户发布记录／`merchant_layout_publication` | 8 | [MER-03](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-mer-03) |
| [ENT-RBK](#ent-rbk) | 回滚记录／`layout_rollback` | 6 | [MER-05](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-mer-05) |
| [ENT-SYNC](#ent-sync) | 跨端同步状态／`cross_end_sync_state` | 8 | [DSP-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-dsp-02) |
| [ENT-AUD](#ent-aud) | 操作记录／`frontend_layout_audit_log` | 10 | [AUD-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-aud-01) |
| [ENT-PERM](#ent-perm) | 权限／`v3_role_permission` | 5 | [PERM-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-perm-01) |
| [ENT-HELP](#ent-help) | 功能说明书／`page_manual_content` | 5 | [HELP-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-help-01) |

## 4. ENT-MER｜商户

- 实体／表：`merchant_profile`
- 数据来源与总控／商户读写边界：商户管理写；总控／商户端依授权只读；商户版面服务不覆盖。
- 现有证据：E-04
- 对应 PRD 章节：PRD 2.1、2.2、3.3
- 对应功能点编号：[MER-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-mer-01)

| 字段 ID | 字段代码／中文名称 | 数据类型与长度 | 必填／可空／默认／枚举 | 主外键／稳定 ID／唯一性／索引 | 分类／证据状态 | 显示条件／验证 | 语言／时区 | 敏感性／权限／保留 | 对应接口编号 | 对应 PRD | 对应功能点编号 | 1050／1048／1052／1054 代表值 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| ENT-MER-001 | `tenant_id`／商户 ID | varchar(32) | 必填；不可空；无默认 | PK／稳定 ID；索引 tenant_id | 使用既有字段；已见原型／V3 能力证据；正式数据库映射待后端确认；E-04 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [MER-API-01](./AR前端自定义配置-接口需求清单.md#mer-api-01)、[I18N-API-01](./AR前端自定义配置-接口需求清单.md#i18n-api-01) | PRD 2.1、2.2、3.3 | [MER-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-mer-01) | 1050=1050；1048=1048；1052=1052；1054=1054 |
| ENT-MER-002 | `merchant_name`／商户名称 | varchar(100) | 必填；不可空；无默认 | 普通索引 name | 使用既有字段；已见原型／V3 能力证据；正式数据库映射待后端确认；E-04 | 列表／详情显示；trim；不作跨表 join。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [MER-API-01](./AR前端自定义配置-接口需求清单.md#mer-api-01) | PRD 2.1、2.2、3.3 | [MER-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-mer-01) | 1050=daman；1048=91club；1052=fun88；1054=jeetwin |
| ENT-MER-003 | `merchant_status`／商户状态 | varchar(20) | 必填；不可空；默认 active；active/configuring/disabled | 索引 status | 既有字段扩充；待后端确认数据库映射；E-04 | 状态控制可操作范围；未知枚举拒绝。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [MER-API-01](./AR前端自定义配置-接口需求清单.md#mer-api-01)、[MER-API-05](./AR前端自定义配置-接口需求清单.md#mer-api-05) | PRD 2.1、2.2、3.3 | [MER-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-mer-01) | 1050=active；1048=disabled；1052=configuring；1054=disabled |
| ENT-MER-004 | `currency_code`／币种 | char(3) | 必填；不可空；ISO 4217 | 普通索引 currency | 使用既有字段；已见原型／V3 能力证据；正式数据库映射待后端确认；E-04 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [MER-API-01](./AR前端自定义配置-接口需求清单.md#mer-api-01) | PRD 2.1、2.2、3.3 | [MER-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-mer-01) | 1050=INR；1048=INR；1052=INR；1054=INR |
| ENT-MER-005 | `timezone`／商户时区 | varchar(64) | 必填；不可空；IANA timezone；无默认 | 普通索引 timezone | 新增字段；待后端确认数据库映射；E-04 | 定时发布计划／审计显示；必须为有效 IANA 名称。 | 本字段本身为 IANA 名称；时间仍以 UTC 保存。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [MER-API-07](./AR前端自定义配置-接口需求清单.md#mer-api-07)、[AUD-API-01](./AR前端自定义配置-接口需求清单.md#aud-api-01) | PRD 2.1、2.2、3.3 | [MER-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-mer-01) | 1050=Asia/Kolkata；1048=Asia/Kolkata；1052=Asia/Bangkok；1054=Asia/Dhaka |
| ENT-MER-006 | `updated_at`／商户数据更新时间 | datetime(3) | 必填；不可空；服务端产生 | 索引 updated_at；并发游标 | 新增字段；待后端确认数据库映射；E-04 | 同步／刷新判断；客户端不可改。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [MER-API-01](./AR前端自定义配置-接口需求清单.md#mer-api-01)、[I18N-API-01](./AR前端自定义配置-接口需求清单.md#i18n-api-01) | PRD 2.1、2.2、3.3 | [MER-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-mer-01) | 1050=2026-08-06T10:00:00Z；1048=2026-08-06T10:00:01Z；1052=2026-08-06T10:00:02Z；1054=2026-08-06T10:00:03Z |

## 5. ENT-TPL｜代码模板契约

- 实体／表：`frontend_template_contract`（由前后端代码及发布流程产生的只读契约数据）
- 数据来源与总控／商户读写边界：前后端代码与发布流程写入模板结构及能力契约；总控端与商户端都只读引用。模板不提供页面新增、命名、编辑、复制、停用或切换操作。
- 现有证据：E-02
- 对应 PRD 章节：PRD 2.3、3.1、4.1
- 对应功能点编号：[ADM-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-adm-01)

| 字段 ID | 字段代码／中文名称 | 数据类型与长度 | 必填／可空／默认／枚举 | 主外键／稳定 ID／唯一性／索引 | 分类／证据状态 | 显示条件／验证 | 语言／时区 | 敏感性／权限／保留 | 对应接口编号 | 对应 PRD | 对应功能点编号 | 1050／1048／1052／1054 代表值 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| ENT-TPL-001 | `template_id`／模板 ID | varchar(36) | 必填；不可空；无默认 | PK／稳定 ID | 既有字段扩充；待后端确认数据库映射；E-02 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [ADM-API-01](./AR前端自定义配置-接口需求清单.md#adm-api-01)、[ADM-API-02](./AR前端自定义配置-接口需求清单.md#adm-api-02) | PRD 2.3、3.1、4.1 | [ADM-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-adm-01) | 1050=tpl-mobile-a；1048=tpl-mobile-a；1052=—；1054=tpl-mobile-b |
| ENT-TPL-002 | `template_name`／模板名称 | varchar(100) | 必填；不可空；无默认 | 索引 template_name | 既有字段扩充；待后端确认数据库映射；E-02 | 双端只读显示；名称由代码发布包提供，页面不得修改。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [ADM-API-01](./AR前端自定义配置-接口需求清单.md#adm-api-01)、[ADM-API-02](./AR前端自定义配置-接口需求清单.md#adm-api-02) | PRD 2.3、3.1、4.1 | [ADM-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-adm-01) | 1050=Mobile A；1048=Mobile A；1052=—；1054=Mobile B |
| ENT-TPL-003 | `theme_id`／主题 ID | varchar(36) | 必填；不可空；无默认 | FK→layout_theme.theme_id；索引 | 既有字段扩充；待后端确认数据库映射；E-02 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [ADM-API-01](./AR前端自定义配置-接口需求清单.md#adm-api-01)、[ADM-API-02](./AR前端自定义配置-接口需求清单.md#adm-api-02)、[ADM-API-03](./AR前端自定义配置-接口需求清单.md#adm-api-03) | PRD 2.3、3.1、4.1 | [ADM-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-adm-01) | 1050=theme-red；1048=theme-blue；1052=—；1054=theme-dark |
| ENT-TPL-004 | `schema_compatibility_key`／模板结构兼容键 | varchar(32) | 必填；不可空；无默认 | 唯一(template_id,schema_compatibility_key) | 新增字段；待后端确认数据库映射；E-02 | 只供结构兼容校验；总控 UI 不显示。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [ADM-API-02](./AR前端自定义配置-接口需求清单.md#adm-api-02)、[ADM-API-03](./AR前端自定义配置-接口需求清单.md#adm-api-03) | PRD 2.3、3.1、4.1 | [ADM-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-adm-01) | 1050=compat-mobile-7；1048=compat-mobile-7；1052=—；1054=compat-mobile-8 |
| ENT-TPL-005 | `active_status`／模板状态 | varchar(20) | 必填；不可空；默认 active；active/archived | 索引 active_status | 新增字段；待后端确认数据库映射；E-02 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [ADM-API-01](./AR前端自定义配置-接口需求清单.md#adm-api-01) | PRD 2.3、3.1、4.1 | [ADM-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-adm-01) | 1050=active；1048=active；1052=—；1054=active |

## 6. ENT-LAY｜版面

- 实体／表：`frontend_layout`
- 数据来源与总控／商户读写边界：总控建立、命名、编辑、复制及停用版面并产生完整保底快照；商户内容以独立覆盖层保存。总控版面更新只更新保底，不得覆盖商户草稿或已发布覆盖。
- 现有证据：E-03、E-04
- 对应 PRD 章节：PRD 2.1、2.3、3.1–3.3、4.1–4.2
- 对应功能点编号：[ADM-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-adm-01)、[MER-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-mer-01)

| 字段 ID | 字段代码／中文名称 | 数据类型与长度 | 必填／可空／默认／枚举 | 主外键／稳定 ID／唯一性／索引 | 分类／证据状态 | 显示条件／验证 | 语言／时区 | 敏感性／权限／保留 | 对应接口编号 | 对应 PRD | 对应功能点编号 | 1050／1048／1052／1054 代表值 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| ENT-LAY-001 | `layout_id`／版面 ID | varchar(36) | 必填；不可空；无默认 | PK／稳定 ID | 使用既有字段；已见原型／V3 能力证据；正式数据库映射待后端确认；E-03、E-04 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [ADM-API-01](./AR前端自定义配置-接口需求清单.md#adm-api-01)、[ADM-API-02](./AR前端自定义配置-接口需求清单.md#adm-api-02)、[MER-API-01](./AR前端自定义配置-接口需求清单.md#mer-api-01)、[MER-API-02](./AR前端自定义配置-接口需求清单.md#mer-api-02) | PRD 2.1、2.3、3.1–3.3、4.1–4.2 | [ADM-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-adm-01)、[MER-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-mer-01) | 1050=layout-1050-home；1048=layout-1048-home；1052=—；1054=layout-1054-home |
| ENT-LAY-002 | `scope_type`／版面端类型 | varchar(16) | 必填；不可空；admin/merchant | 索引(scope_type,tenant_id) | 新增字段；待后端确认数据库映射；E-03、E-04 | 后端固定；避免混用总控／商户生命周期。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [ADM-API-01](./AR前端自定义配置-接口需求清单.md#adm-api-01)、[MER-API-01](./AR前端自定义配置-接口需求清单.md#mer-api-01) | PRD 2.1、2.3、3.1–3.3、4.1–4.2 | [ADM-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-adm-01)、[MER-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-mer-01) | 1050=merchant；1048=merchant；1052=merchant(empty)；1054=merchant |
| ENT-LAY-003 | `tenant_id`／商户 ID | varchar(32) | 总控版面可空；商户版面必填 | FK→merchant_profile；索引 | 既有字段扩充；待后端确认数据库映射；E-03、E-04 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [MER-API-01](./AR前端自定义配置-接口需求清单.md#mer-api-01)、[MER-API-02](./AR前端自定义配置-接口需求清单.md#mer-api-02)、[DSP-API-01](./AR前端自定义配置-接口需求清单.md#dsp-api-01) | PRD 2.1、2.3、3.1–3.3、4.1–4.2 | [ADM-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-adm-01)、[MER-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-mer-01) | 1050=1050；1048=1048；1052=—；1054=1054 |
| ENT-LAY-004 | `admin_layout_id`／来源总控版面 ID | varchar(36) | 总控版面可空；商户版面必填 | FK self/layout；索引 | 新增字段；待后端确认数据库映射；E-03、E-04 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [DSP-API-01](./AR前端自定义配置-接口需求清单.md#dsp-api-01)、[MER-API-02](./AR前端自定义配置-接口需求清单.md#mer-api-02) | PRD 2.1、2.3、3.1–3.3、4.1–4.2 | [ADM-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-adm-01)、[MER-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-mer-01) | 1050=admin-home-01；1048=admin-home-01；1052=—；1054=admin-home-02 |
| ENT-LAY-005 | `layout_name`／版面名称 | varchar(100) | 必填；不可空；trim | 索引(scope_type,tenant_id,layout_name) | 使用既有字段；已见原型／V3 能力证据；正式数据库映射待后端确认；E-03、E-04 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [ADM-API-01](./AR前端自定义配置-接口需求清单.md#adm-api-01)、[MER-API-01](./AR前端自定义配置-接口需求清单.md#mer-api-01) | PRD 2.1、2.3、3.1–3.3、4.1–4.2 | [ADM-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-adm-01)、[MER-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-mer-01) | 1050=1050 首页版面；1048=1048 首页版面；1052=—；1054=1054 首页版面 |
| ENT-LAY-006 | `template_id`／模板 ID | varchar(36) | 必填；不可空 | FK→frontend_template_contract；索引 | 既有字段扩充；待后端确认数据库映射；E-03、E-04 | 只读引用代码模板契约；域名已有版面绑定时不得直接切换模板或版面，必须先完成解除再另行绑定。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [ADM-API-02](./AR前端自定义配置-接口需求清单.md#adm-api-02)、[MER-API-02](./AR前端自定义配置-接口需求清单.md#mer-api-02) | PRD 2.1、2.3、3.1–3.3、4.1–4.2 | [ADM-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-adm-01)、[MER-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-mer-01) | 1050=tpl-mobile-a；1048=tpl-mobile-a；1052=—；1054=tpl-mobile-b |
| ENT-LAY-007 | `theme_id`／主题 ID | varchar(36) | 必填；不可空 | FK→layout_theme；索引 | 既有字段扩充；待后端确认数据库映射；E-03、E-04 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [ADM-API-02](./AR前端自定义配置-接口需求清单.md#adm-api-02)、[MER-API-02](./AR前端自定义配置-接口需求清单.md#mer-api-02)、[ADM-API-03](./AR前端自定义配置-接口需求清单.md#adm-api-03) | PRD 2.1、2.3、3.1–3.3、4.1–4.2 | [ADM-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-adm-01)、[MER-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-mer-01) | 1050=theme-red；1048=theme-blue；1052=—；1054=theme-dark |
| ENT-LAY-008 | `configuration_status`／配置状态 | varchar(24) | 必填；不可空；端类型枚举 | 索引(scope_type,configuration_status) | 既有字段扩充；待后端确认数据库映射；E-03、E-04 | 总控只允许 draft/previewed/published；商户允许 unconfigured/draft/scheduled/published/publish_failed/rolled_back。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [ADM-API-01](./AR前端自定义配置-接口需求清单.md#adm-api-01)、[MER-API-01](./AR前端自定义配置-接口需求清单.md#mer-api-01) | PRD 2.1、2.3、3.1–3.3、4.1–4.2 | [ADM-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-adm-01)、[MER-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-mer-01) | 1050=draft；1048=published；1052=unassigned；1054=published/unconfigured |
| ENT-LAY-009 | `published_at`／发布时间 | datetime(3) | 可空；未发布为 null | 索引 published_at | 新增字段；待后端确认数据库映射；E-03、E-04 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [ADM-API-01](./AR前端自定义配置-接口需求清单.md#adm-api-01)、[ADM-API-05](./AR前端自定义配置-接口需求清单.md#adm-api-05)、[MER-API-06](./AR前端自定义配置-接口需求清单.md#mer-api-06) | PRD 2.1、2.3、3.1–3.3、4.1–4.2 | [ADM-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-adm-01)、[MER-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-mer-01) | 1050=2026-08-01T08:00:00Z；1048=2026-08-04T10:00:00Z；1052=null；1054=2026-07-30T05:00:00Z |
| ENT-LAY-010 | `update_time`／并发更新时间 | datetime(3) | 必填；不可空；服务端产生 | 索引 update_time／ETag 来源 | 新增字段；待后端确认数据库映射；E-03、E-04 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [ADM-API-02](./AR前端自定义配置-接口需求清单.md#adm-api-02)、[ADM-API-03](./AR前端自定义配置-接口需求清单.md#adm-api-03)、[MER-API-02](./AR前端自定义配置-接口需求清单.md#mer-api-02)、[MER-API-03](./AR前端自定义配置-接口需求清单.md#mer-api-03) | PRD 2.1、2.3、3.1–3.3、4.1–4.2 | [ADM-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-adm-01)、[MER-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-mer-01) | 1050=2026-08-06T09:00:00Z；1048=2026-08-06T09:01:00Z；1052=—；1054=2026-08-06T09:03:00Z |

## 7. ENT-NAV｜导航

- 实体／表：`layout_navigation`
- 数据来源与总控／商户读写边界：总控写英文基准与限制；商户只在启用语言与允许范围写覆盖。
- 现有证据：E-03
- 对应 PRD 章节：PRD 2.3、3.1、3.3、4.1、5.3
- 对应功能点编号：[ADM-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-adm-02)

| 字段 ID | 字段代码／中文名称 | 数据类型与长度 | 必填／可空／默认／枚举 | 主外键／稳定 ID／唯一性／索引 | 分类／证据状态 | 显示条件／验证 | 语言／时区 | 敏感性／权限／保留 | 对应接口编号 | 对应 PRD | 对应功能点编号 | 1050／1048／1052／1054 代表值 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| ENT-NAV-001 | `navigation_id`／导航 ID／componentId | varchar(36) | 必填；不可空 | PK／稳定 ID；唯一(layout_id,navigation_id) | 既有字段扩充；待后端确认数据库映射；E-03 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [ADM-API-02](./AR前端自定义配置-接口需求清单.md#adm-api-02)、[ADM-API-03](./AR前端自定义配置-接口需求清单.md#adm-api-03)、[MER-API-02](./AR前端自定义配置-接口需求清单.md#mer-api-02) | PRD 2.3、3.1、3.3、4.1、5.3 | [ADM-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-adm-02) | 1050=nav-home；1048=nav-home；1052=—；1054=nav-home |
| ENT-NAV-002 | `layout_id`／版面 ID | varchar(36) | 必填；不可空 | FK→frontend_layout；索引 | 既有字段扩充；待后端确认数据库映射；E-03 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [ADM-API-02](./AR前端自定义配置-接口需求清单.md#adm-api-02)、[MER-API-02](./AR前端自定义配置-接口需求清单.md#mer-api-02) | PRD 2.3、3.1、3.3、4.1、5.3 | [ADM-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-adm-02) | 1050=layout-1050-home；1048=layout-1048-home；1052=—；1054=layout-1054-home |
| ENT-NAV-003 | `navigation_type`／导航类型 | varchar(16) | 必填；不可空；primary/secondary | 索引(layout_id,navigation_type) | 新增字段；待后端确认数据库映射；E-03 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [ADM-API-03](./AR前端自定义配置-接口需求清单.md#adm-api-03) | PRD 2.3、3.1、3.3、4.1、5.3 | [ADM-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-adm-02) | 1050=primary；1048=primary；1052=—；1054=secondary |
| ENT-NAV-004 | `display_order`／同层排序 | int | 必填；不可空；默认 0 | 索引(layout_id,parent_id,display_order) | 既有字段扩充；待后端确认数据库映射；E-03 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [ADM-API-03](./AR前端自定义配置-接口需求清单.md#adm-api-03)、[MER-API-03](./AR前端自定义配置-接口需求清单.md#mer-api-03) | PRD 2.3、3.1、3.3、4.1、5.3 | [ADM-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-adm-02) | 1050=10；1048=10；1052=—；1054=20 |
| ENT-NAV-005 | `required_flag`／必备导航 | boolean | 必填；不可空；默认 false | 普通索引 required_flag | 新增字段；待后端确认数据库映射；E-03 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [ADM-API-03](./AR前端自定义配置-接口需求清单.md#adm-api-03)、[MER-API-05](./AR前端自定义配置-接口需求清单.md#mer-api-05) | PRD 2.3、3.1、3.3、4.1、5.3 | [ADM-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-adm-02) | 1050=true；1048=true；1052=—；1054=false |

## 8. ENT-CAT｜内容分类

- 实体／表：`layout_content_category`
- 数据来源与总控／商户读写边界：总控写结构／英文基准；商户写允许的本地化与排序。
- 现有证据：E-03
- 对应 PRD 章节：PRD 2.3、3.1、3.3、4.1、5.3
- 对应功能点编号：[ADM-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-adm-02)

| 字段 ID | 字段代码／中文名称 | 数据类型与长度 | 必填／可空／默认／枚举 | 主外键／稳定 ID／唯一性／索引 | 分类／证据状态 | 显示条件／验证 | 语言／时区 | 敏感性／权限／保留 | 对应接口编号 | 对应 PRD | 对应功能点编号 | 1050／1048／1052／1054 代表值 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| ENT-CAT-001 | `category_component_id`／分类组件 ID | varchar(36) | 必填；不可空 | PK／稳定 ID；唯一(layout_id,category_component_id) | 既有字段扩充；待后端确认数据库映射；E-03 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [ADM-API-02](./AR前端自定义配置-接口需求清单.md#adm-api-02)、[ADM-API-03](./AR前端自定义配置-接口需求清单.md#adm-api-03)、[MER-API-02](./AR前端自定义配置-接口需求清单.md#mer-api-02) | PRD 2.3、3.1、3.3、4.1、5.3 | [ADM-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-adm-02) | 1050=cat-casino；1048=cat-casino；1052=—；1054=cat-sports |
| ENT-CAT-002 | `layout_id`／版面 ID | varchar(36) | 必填；不可空 | FK→frontend_layout；索引 | 既有字段扩充；待后端确认数据库映射；E-03 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [ADM-API-02](./AR前端自定义配置-接口需求清单.md#adm-api-02)、[MER-API-02](./AR前端自定义配置-接口需求清单.md#mer-api-02) | PRD 2.3、3.1、3.3、4.1、5.3 | [ADM-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-adm-02) | 1050=layout-1050-home；1048=layout-1048-home；1052=—；1054=layout-1054-home |
| ENT-CAT-003 | `parent_navigation_id`／上层导航 ID | varchar(36) | 必填；不可空 | FK→layout_navigation；索引 | 新增字段；待后端确认数据库映射；E-03 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [ADM-API-03](./AR前端自定义配置-接口需求清单.md#adm-api-03)、[MER-API-03](./AR前端自定义配置-接口需求清单.md#mer-api-03) | PRD 2.3、3.1、3.3、4.1、5.3 | [ADM-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-adm-02) | 1050=nav-home；1048=nav-home；1052=—；1054=nav-home |
| ENT-CAT-004 | `display_order`／同层排序 | int | 必填；不可空；默认 0 | 索引(layout_id,parent_navigation_id,display_order) | 既有字段扩充；待后端确认数据库映射；E-03 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [ADM-API-03](./AR前端自定义配置-接口需求清单.md#adm-api-03)、[MER-API-03](./AR前端自定义配置-接口需求清单.md#mer-api-03) | PRD 2.3、3.1、3.3、4.1、5.3 | [ADM-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-adm-02) | 1050=10；1048=10；1052=—；1054=20 |
| ENT-CAT-005 | `visible_flag`／显示状态 | boolean | 必填；不可空；默认 true | 普通索引 visible_flag | 新增字段；待后端确认数据库映射；E-03 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [ADM-API-03](./AR前端自定义配置-接口需求清单.md#adm-api-03)、[MER-API-03](./AR前端自定义配置-接口需求清单.md#mer-api-03) | PRD 2.3、3.1、3.3、4.1、5.3 | [ADM-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-adm-02) | 1050=true；1048=true；1052=—；1054=false |

## 9. ENT-BLK｜区块

- 实体／表：`layout_block`
- 数据来源与总控／商户读写边界：总控写插槽、必备与限制；商户写允许内容、排序、素材与游戏。
- 现有证据：E-03、E-06
- 对应 PRD 章节：PRD 2.3、3.1、3.3、4.1、5.3–5.4
- 对应功能点编号：[ADM-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-adm-02)

| 字段 ID | 字段代码／中文名称 | 数据类型与长度 | 必填／可空／默认／枚举 | 主外键／稳定 ID／唯一性／索引 | 分类／证据状态 | 显示条件／验证 | 语言／时区 | 敏感性／权限／保留 | 对应接口编号 | 对应 PRD | 对应功能点编号 | 1050／1048／1052／1054 代表值 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| ENT-BLK-001 | `block_id`／区块 ID／componentId | varchar(36) | 必填；不可空 | PK／稳定 ID；唯一(layout_id,block_id) | 既有字段扩充；待后端确认数据库映射；E-03、E-06 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [ADM-API-02](./AR前端自定义配置-接口需求清单.md#adm-api-02)、[ADM-API-03](./AR前端自定义配置-接口需求清单.md#adm-api-03)、[MER-API-02](./AR前端自定义配置-接口需求清单.md#mer-api-02)、[GAME-API-05](./AR前端自定义配置-接口需求清单.md#game-api-05) | PRD 2.3、3.1、3.3、4.1、5.3–5.4 | [ADM-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-adm-02) | 1050=block-hot-games；1048=block-hot-games；1052=—；1054=block-new |
| ENT-BLK-002 | `layout_id`／版面 ID | varchar(36) | 必填；不可空 | FK→frontend_layout；索引 | 既有字段扩充；待后端确认数据库映射；E-03、E-06 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [ADM-API-02](./AR前端自定义配置-接口需求清单.md#adm-api-02)、[MER-API-02](./AR前端自定义配置-接口需求清单.md#mer-api-02) | PRD 2.3、3.1、3.3、4.1、5.3–5.4 | [ADM-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-adm-02) | 1050=layout-1050-home；1048=layout-1048-home；1052=—；1054=layout-1054-new |
| ENT-BLK-003 | `block_type`／区块类型 | varchar(32) | 必填；不可空；模板定义枚举 | 索引 block_type | 新增字段；待后端确认数据库映射；E-03、E-06 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [ADM-API-03](./AR前端自定义配置-接口需求清单.md#adm-api-03) | PRD 2.3、3.1、3.3、4.1、5.3–5.4 | [ADM-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-adm-02) | 1050=game_grid；1048=game_grid；1052=—；1054=banner |
| ENT-BLK-004 | `required_flag`／必备区块 | boolean | 必填；不可空；默认 false | 索引 required_flag | 新增字段；待后端确认数据库映射；E-03、E-06 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [ADM-API-03](./AR前端自定义配置-接口需求清单.md#adm-api-03)、[MER-API-05](./AR前端自定义配置-接口需求清单.md#mer-api-05) | PRD 2.3、3.1、3.3、4.1、5.3–5.4 | [ADM-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-adm-02) | 1050=true；1048=true；1052=—；1054=false |
| ENT-BLK-005 | `display_order`／同层排序 | int | 必填；不可空；默认 0 | 索引(layout_id,display_order) | 既有字段扩充；待后端确认数据库映射；E-03、E-06 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [ADM-API-03](./AR前端自定义配置-接口需求清单.md#adm-api-03)、[MER-API-03](./AR前端自定义配置-接口需求清单.md#mer-api-03) | PRD 2.3、3.1、3.3、4.1、5.3–5.4 | [ADM-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-adm-02) | 1050=10；1048=10；1052=—；1054=20 |
| ENT-BLK-006 | `style_token_set`／区块样式变数 | json | 可空；默认 {}；只允许模板白名单 | 无独立索引 | 新增字段；待后端确认数据库映射；E-03、E-06 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [ADM-API-03](./AR前端自定义配置-接口需求清单.md#adm-api-03)、[MER-API-03](./AR前端自定义配置-接口需求清单.md#mer-api-03) | PRD 2.3、3.1、3.3、4.1、5.3–5.4 | [ADM-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-adm-02) | 1050={gap:8}；1048={gap:8}；1052=—；1054={} |
| ENT-BLK-007 | `visible_flag`／显示状态 | boolean | 必填；不可空；默认 true | 索引 visible_flag | 新增字段；待后端确认数据库映射；E-03、E-06 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [ADM-API-03](./AR前端自定义配置-接口需求清单.md#adm-api-03)、[MER-API-03](./AR前端自定义配置-接口需求清单.md#mer-api-03) | PRD 2.3、3.1、3.3、4.1、5.3–5.4 | [ADM-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-adm-02) | 1050=true；1048=true；1052=—；1054=false |

## 10. ENT-DOM｜主域名

- 实体／表：`merchant_domain`
- 数据来源与总控／商户读写边界：域名管理写；总控／商户版面服务只读资格，不覆盖生命周期。
- 现有证据：E-04、E-05
- 对应 PRD 章节：PRD 2.3、5.2
- 对应功能点编号：[DOM-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-dom-01)

| 字段 ID | 字段代码／中文名称 | 数据类型与长度 | 必填／可空／默认／枚举 | 主外键／稳定 ID／唯一性／索引 | 分类／证据状态 | 显示条件／验证 | 语言／时区 | 敏感性／权限／保留 | 对应接口编号 | 对应 PRD | 对应功能点编号 | 1050／1048／1052／1054 代表值 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| ENT-DOM-001 | `domain_id`／域名 ID | varchar(36) | 必填；不可空 | PK／稳定 ID | 使用既有字段；已见原型／V3 能力证据；正式数据库映射待后端确认；E-04、E-05 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [DOM-API-01](./AR前端自定义配置-接口需求清单.md#dom-api-01)、[DOM-API-03](./AR前端自定义配置-接口需求清单.md#dom-api-03) | PRD 2.3、5.2 | [DOM-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-dom-01) | 1050=domain-1050-main；1048=domain-1048-main；1052=domain-1052-main；1054=domain-1054-main |
| ENT-DOM-002 | `tenant_id`／商户 ID | varchar(32) | 必填；不可空 | FK→merchant_profile；索引 | 使用既有字段；已见原型／V3 能力证据；正式数据库映射待后端确认；E-04、E-05 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [DOM-API-01](./AR前端自定义配置-接口需求清单.md#dom-api-01) | PRD 2.3、5.2 | [DOM-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-dom-01) | 1050=1050；1048=1048；1052=1052；1054=1054 |
| ENT-DOM-003 | `hostname`／域名 | varchar(253) | 必填；不可空；小写 punycode | 唯一(hostname)；索引 | 使用既有字段；已见原型／V3 能力证据；正式数据库映射待后端确认；E-04、E-05 | 列表显示；正规化后唯一；不可含 path。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [DOM-API-01](./AR前端自定义配置-接口需求清单.md#dom-api-01) | PRD 2.3、5.2 | [DOM-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-dom-01) | 1050=www.1050.test；1048=www.1048.test；1052=www.1052.test；1054=www.1054.test |
| ENT-DOM-004 | `domain_type`／域名类型 | varchar(16) | 必填；不可空；main/non_main | 索引(tenant_id,domain_type) | 既有字段扩充；待后端确认数据库映射；E-04、E-05 | 只有 main 可进绑定候选。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [DOM-API-01](./AR前端自定义配置-接口需求清单.md#dom-api-01) | PRD 2.3、5.2 | [DOM-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-dom-01) | 1050=main；1048=main；1052=main；1054=main |
| ENT-DOM-005 | `verification_status`／验证状态 | varchar(16) | 必填；不可空；verified/pending/failed | 索引 verification_status | 新增字段；待后端确认数据库映射；E-04、E-05 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [DOM-API-01](./AR前端自定义配置-接口需求清单.md#dom-api-01)、[MER-API-05](./AR前端自定义配置-接口需求清单.md#mer-api-05) | PRD 2.3、5.2 | [DOM-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-dom-01) | 1050=verified；1048=verified；1052=verified；1054=failed |
| ENT-DOM-006 | `lifecycle_status`／生命周期 | varchar(16) | 必填；不可空；active/disabled/expired/deleted | 索引 lifecycle_status | 既有字段扩充；待后端确认数据库映射；E-04、E-05 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [DOM-API-01](./AR前端自定义配置-接口需求清单.md#dom-api-01)、[MER-API-05](./AR前端自定义配置-接口需求清单.md#mer-api-05) | PRD 2.3、5.2 | [DOM-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-dom-01) | 1050=active；1048=active；1052=active；1054=disabled |
| ENT-DOM-007 | `valid_until`／有效期限 | datetime(3) | 可空；永久为 null | 索引 valid_until | 新增字段；待后端确认数据库映射；E-04、E-05 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [DOM-API-01](./AR前端自定义配置-接口需求清单.md#dom-api-01) | PRD 2.3、5.2 | [DOM-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-dom-01) | 1050=2027-08-06Z；1048=2027-08-06Z；1052=2027-08-06Z；1054=2026-08-01Z |

## 11. ENT-BND｜主域名与版面绑定

- 实体／表：`domain_layout_binding`
- 数据来源与总控／商户读写边界：总控建立／取消初始下派；商户只能对已下派版面分别执行解除与绑定；域名服务提供资格。已绑定域名不得直接切换版面或模板。
- 现有证据：E-03、E-04
- 对应 PRD 章节：PRD 2.3、3.2、5.2
- 对应功能点编号：[DSP-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-dsp-01)、[DOM-03](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-dom-03)

| 字段 ID | 字段代码／中文名称 | 数据类型与长度 | 必填／可空／默认／枚举 | 主外键／稳定 ID／唯一性／索引 | 分类／证据状态 | 显示条件／验证 | 语言／时区 | 敏感性／权限／保留 | 对应接口编号 | 对应 PRD | 对应功能点编号 | 1050／1048／1052／1054 代表值 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| ENT-BND-001 | `binding_id`／绑定 ID | varchar(36) | 必填；不可空 | PK／稳定 ID | 新增字段；待后端确认数据库映射；E-03、E-04 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [DSP-API-01](./AR前端自定义配置-接口需求清单.md#dsp-api-01)、[DOM-API-02](./AR前端自定义配置-接口需求清单.md#dom-api-02)、[DOM-API-03](./AR前端自定义配置-接口需求清单.md#dom-api-03) | PRD 2.3、3.2、5.2 | [DSP-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-dsp-01)、[DOM-03](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-dom-03) | 1050=bind-1050-main；1048=bind-1048-main；1052=—；1054=bind-1054-main |
| ENT-BND-002 | `tenant_id`／商户 ID | varchar(32) | 必填；不可空 | FK→merchant_profile；索引 | 既有字段扩充；待后端确认数据库映射；E-03、E-04 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [DSP-API-01](./AR前端自定义配置-接口需求清单.md#dsp-api-01)、[DOM-API-02](./AR前端自定义配置-接口需求清单.md#dom-api-02) | PRD 2.3、3.2、5.2 | [DSP-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-dsp-01)、[DOM-03](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-dom-03) | 1050=1050；1048=1048；1052=1052；1054=1054 |
| ENT-BND-003 | `domain_id`／主域名 ID | varchar(36) | 必填；不可空 | FK→merchant_domain；唯一有效绑定条件索引 | 使用既有字段；已见原型／V3 能力证据；正式数据库映射待后端确认；E-03、E-04 | 只允许已验证、有效的主域名；同一时间最多绑定一个版面。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [DSP-API-01](./AR前端自定义配置-接口需求清单.md#dsp-api-01)、[DOM-API-02](./AR前端自定义配置-接口需求清单.md#dom-api-02)、[DOM-API-03](./AR前端自定义配置-接口需求清单.md#dom-api-03) | PRD 2.3、3.2、5.2 | [DSP-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-dsp-01)、[DOM-03](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-dom-03) | 1050=domain-1050-main；1048=domain-1048-main；1052=—；1054=domain-1054-main |
| ENT-BND-004 | `current_layout_id`／当前生效版面 ID | varchar(36) | 可空；未下派为 null | FK→frontend_layout；唯一(domain_id,current_flag=true) | 既有字段扩充；待后端确认数据库映射；E-03、E-04 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [DOM-API-02](./AR前端自定义配置-接口需求清单.md#dom-api-02)、[DOM-API-03](./AR前端自定义配置-接口需求清单.md#dom-api-03)、[MER-API-06](./AR前端自定义配置-接口需求清单.md#mer-api-06) | PRD 2.3、3.2、5.2 | [DSP-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-dsp-01)、[DOM-03](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-dom-03) | 1050=layout-1050-home；1048=layout-1048-home；1052=null；1054=layout-1054-home |
| ENT-BND-005 | `unbound_at`／最近解除时间 | datetime(3) | 可空；从未解除为 null | 索引 unbound_at | 新增字段；待后端确认数据库映射；E-03、E-04 | 只由解除操作成功后写入；绑定新版面前必须已无有效绑定。 | 时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；配置管理；与绑定审计记录同保留期限。 | [DOM-API-02](./AR前端自定义配置-接口需求清单.md#dom-api-02)、[DOM-API-03](./AR前端自定义配置-接口需求清单.md#dom-api-03) | PRD 2.3、3.2、5.2 | [DSP-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-dsp-01)、[DOM-03](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-dom-03) | 1050=null；1048=null；1052=null；1054=null |
| ENT-BND-006 | `binding_status`／绑定状态 | varchar(20) | 必填；不可空；bound/unbound | 索引 binding_status | 新增字段；待后端确认数据库映射；E-03、E-04 | 不提供待切换状态；解除与再次绑定是两个独立成功操作。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [DOM-API-02](./AR前端自定义配置-接口需求清单.md#dom-api-02)、[DOM-API-03](./AR前端自定义配置-接口需求清单.md#dom-api-03)、[DSP-API-02](./AR前端自定义配置-接口需求清单.md#dsp-api-02) | PRD 2.3、3.2、5.2 | [DSP-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-dsp-01)、[DOM-03](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-dom-03) | 1050=bound；1048=bound；1052=unbound；1054=bound |
| ENT-BND-007 | `update_time`／绑定更新时间 | datetime(3) | 必填；不可空；服务端产生 | 索引 update_time／CAS | 新增字段；待后端确认数据库映射；E-03、E-04 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [DOM-API-03](./AR前端自定义配置-接口需求清单.md#dom-api-03) | PRD 2.3、3.2、5.2 | [DSP-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-dsp-01)、[DOM-03](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-dom-03) | 1050=2026-08-06T10:00Z；1048=2026-08-05T10:00Z；1052=2026-08-01T10:00Z；1054=2026-08-04T10:00Z |

## 12. ENT-LNG｜商户语言

- 实体／表：`merchant_language`
- 数据来源与总控／商户读写边界：商户管理写；商户版面只读语言集合，内容服务不得改启用状态。
- 现有证据：E-04、E-05
- 对应 PRD 章节：PRD 2.3、5.3
- 对应功能点编号：[I18N-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-i18n-01)

| 字段 ID | 字段代码／中文名称 | 数据类型与长度 | 必填／可空／默认／枚举 | 主外键／稳定 ID／唯一性／索引 | 分类／证据状态 | 显示条件／验证 | 语言／时区 | 敏感性／权限／保留 | 对应接口编号 | 对应 PRD | 对应功能点编号 | 1050／1048／1052／1054 代表值 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| ENT-LNG-001 | `tenant_id`／商户 ID | varchar(32) | 必填；不可空 | PK 部分／FK→merchant_profile | 使用既有字段；已见原型／V3 能力证据；正式数据库映射待后端确认；E-04、E-05 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [I18N-API-01](./AR前端自定义配置-接口需求清单.md#i18n-api-01) | PRD 2.3、5.3 | [I18N-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-i18n-01) | 1050=1050；1048=1048；1052=1052；1054=1054 |
| ENT-LNG-002 | `language_code`／语言代码 | varchar(16) | 必填；不可空；BCP 47 | PK 部分；唯一(tenant_id,language_code) | 使用既有字段；已见原型／V3 能力证据；正式数据库映射待后端确认；E-04、E-05 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [I18N-API-01](./AR前端自定义配置-接口需求清单.md#i18n-api-01)、[I18N-API-02](./AR前端自定义配置-接口需求清单.md#i18n-api-02) | PRD 2.3、5.3 | [I18N-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-i18n-01) | 1050=zh/en/hi；1048=en/id；1052=en/th/vi；1054=en/bn |
| ENT-LNG-003 | `enabled_flag`／是否启用 | boolean | 必填；不可空；默认 false | 索引(tenant_id,enabled_flag) | 使用既有字段；已见原型／V3 能力证据；正式数据库映射待后端确认；E-04、E-05 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [I18N-API-01](./AR前端自定义配置-接口需求清单.md#i18n-api-01) | PRD 2.3、5.3 | [I18N-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-i18n-01) | 1050=true；1048=true；1052=true；1054=true |
| ENT-LNG-004 | `default_flag`／是否默认语言 | boolean | 必填；不可空；默认 false | 唯一(tenant_id,default_flag=true) | 使用既有字段；已见原型／V3 能力证据；正式数据库映射待后端确认；E-04、E-05 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [I18N-API-01](./AR前端自定义配置-接口需求清单.md#i18n-api-01)、[MER-API-05](./AR前端自定义配置-接口需求清单.md#mer-api-05) | PRD 2.3、5.3 | [I18N-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-i18n-01) | 1050=zh:true；1048=en:true；1052=th:true；1054=en:true |
| ENT-LNG-005 | `text_direction`／文字方向 | varchar(3) | 必填；不可空；ltr/rtl | 索引 text_direction | 新增字段；待后端确认数据库映射；E-04、E-05 | 输入与预览方向按值切换。 | BCP 47；方向依语言数据，不以 UI 猜测。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [I18N-API-01](./AR前端自定义配置-接口需求清单.md#i18n-api-01) | PRD 2.3、5.3 | [I18N-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-i18n-01) | 1050=hi:ltr；1048=id:ltr；1052=th:ltr；1054=bn:ltr |
| ENT-LNG-006 | `update_time`／语言设置更新时间 | datetime(3) | 必填；不可空 | 索引 update_time | 新增字段；待后端确认数据库映射；E-04、E-05 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [I18N-API-01](./AR前端自定义配置-接口需求清单.md#i18n-api-01)、[I18N-API-03](./AR前端自定义配置-接口需求清单.md#i18n-api-03) | PRD 2.3、5.3 | [I18N-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-i18n-01) | 1050=2026-08-06T10:00Z；1048=2026-08-06T10:01Z；1052=2026-08-06T10:02Z；1054=2026-08-06T10:03Z |

## 13. ENT-I18N｜多语内容

- 实体／表：`localized_content`
- 数据来源与总控／商户读写边界：总控写英文基准；商户写本商户已启用语言覆盖；停用内容保留只读。
- 现有证据：E-04、E-05
- 对应 PRD 章节：PRD 2.3、5.3
- 对应功能点编号：[I18N-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-i18n-02)

| 字段 ID | 字段代码／中文名称 | 数据类型与长度 | 必填／可空／默认／枚举 | 主外键／稳定 ID／唯一性／索引 | 分类／证据状态 | 显示条件／验证 | 语言／时区 | 敏感性／权限／保留 | 对应接口编号 | 对应 PRD | 对应功能点编号 | 1050／1048／1052／1054 代表值 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| ENT-I18N-001 | `content_id`／多语内容 ID | varchar(36) | 必填；不可空 | PK／稳定 ID | 新增字段；待后端确认数据库映射；E-04、E-05 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [I18N-API-02](./AR前端自定义配置-接口需求清单.md#i18n-api-02) | PRD 2.3、5.3 | [I18N-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-i18n-02) | 1050=lc-1050-nav-home-hi；1048=lc-1048-nav-home-id；1052=—；1054=lc-1054-nav-home-bn |
| ENT-I18N-002 | `layout_id`／版面 ID | varchar(36) | 必填；不可空 | FK→frontend_layout；索引 | 既有字段扩充；待后端确认数据库映射；E-04、E-05 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [I18N-API-02](./AR前端自定义配置-接口需求清单.md#i18n-api-02)、[MER-API-02](./AR前端自定义配置-接口需求清单.md#mer-api-02) | PRD 2.3、5.3 | [I18N-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-i18n-02) | 1050=layout-1050-home；1048=layout-1048-home；1052=—；1054=layout-1054-home |
| ENT-I18N-003 | `component_id`／组件 ID | varchar(36) | 必填；不可空 | FK→对应导航／分类／区块；索引 | 既有字段扩充；待后端确认数据库映射；E-04、E-05 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [I18N-API-02](./AR前端自定义配置-接口需求清单.md#i18n-api-02) | PRD 2.3、5.3 | [I18N-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-i18n-02) | 1050=nav-home；1048=nav-home；1052=—；1054=nav-home |
| ENT-I18N-004 | `language_code`／语言代码 | varchar(16) | 必填；不可空；BCP 47 | FK→merchant_language；唯一(layout_id,component_id,language_code,field_code) | 使用既有字段；已见原型／V3 能力证据；正式数据库映射待后端确认；E-04、E-05 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [I18N-API-02](./AR前端自定义配置-接口需求清单.md#i18n-api-02)、[I18N-API-03](./AR前端自定义配置-接口需求清单.md#i18n-api-03) | PRD 2.3、5.3 | [I18N-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-i18n-02) | 1050=hi；1048=id；1052=—；1054=bn |
| ENT-I18N-005 | `field_code`／文案字段代码 | varchar(32) | 必填；不可空；name/title/button_text/description | 唯一键部分；索引 | 新增字段；待后端确认数据库映射；E-04、E-05 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [I18N-API-02](./AR前端自定义配置-接口需求清单.md#i18n-api-02) | PRD 2.3、5.3 | [I18N-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-i18n-02) | 1050=title；1048=name；1052=—；1054=button_text |
| ENT-I18N-006 | `content_text`／文案内容 | varchar(1000) | 可空；默认 null；实际上限依 field_code | 全文检索视 V3 能力；唯一键不含内容 | 既有字段扩充；待后端确认数据库映射；E-04、E-05 | trim；禁 HTML/script；导航20、分类30、区块40、按钮20；默认语言必填。 | UTF-8；以 language_code 决定方向。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [I18N-API-02](./AR前端自定义配置-接口需求清单.md#i18n-api-02)、[I18N-API-03](./AR前端自定义配置-接口需求清单.md#i18n-api-03) | PRD 2.3、5.3 | [I18N-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-i18n-02) | 1050=लोकप्रिय खेल；1048=Beranda；1052=null；1054=খেলুন |
| ENT-I18N-007 | `retained_when_disabled`／停用语言保留标记 | boolean | 必填；不可空；默认 true | 普通索引 | 新增字段；待后端确认数据库映射；E-04、E-05 | 停用时隐藏／不可编辑／不发布；重新启用恢复。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [I18N-API-02](./AR前端自定义配置-接口需求清单.md#i18n-api-02) | PRD 2.3、5.3 | [I18N-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-i18n-02) | 1050=true(vi)；1048=true(zh)；1052=true(hi)；1054=true(ar) |

## 14. ENT-ASSET｜图片语言变体

- 实体／表：`localized_asset_variant`
- 数据来源与总控／商户读写边界：素材服务保存原档；商户内容服务只保存 assetId 引用；总控可定义默认。
- 现有证据：E-03
- 对应 PRD 章节：PRD 2.3、3.1、3.3、4.1、5.3
- 对应功能点编号：[I18N-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-i18n-02)

| 字段 ID | 字段代码／中文名称 | 数据类型与长度 | 必填／可空／默认／枚举 | 主外键／稳定 ID／唯一性／索引 | 分类／证据状态 | 显示条件／验证 | 语言／时区 | 敏感性／权限／保留 | 对应接口编号 | 对应 PRD | 对应功能点编号 | 1050／1048／1052／1054 代表值 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| ENT-ASSET-001 | `asset_variant_id`／图片变体 ID | varchar(36) | 必填；不可空 | PK／稳定 ID | 新增字段；待后端确认数据库映射；E-03 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [I18N-API-02](./AR前端自定义配置-接口需求清单.md#i18n-api-02) | PRD 2.3、3.1、3.3、4.1、5.3 | [I18N-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-i18n-02) | 1050=asset-hi-hero；1048=asset-id-hero；1052=—；1054=asset-bn-hero |
| ENT-ASSET-002 | `component_id`／组件 ID | varchar(36) | 必填；不可空 | FK→组件；索引 | 既有字段扩充；待后端确认数据库映射；E-03 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [I18N-API-02](./AR前端自定义配置-接口需求清单.md#i18n-api-02) | PRD 2.3、3.1、3.3、4.1、5.3 | [I18N-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-i18n-02) | 1050=block-hero；1048=block-hero；1052=—；1054=block-hero |
| ENT-ASSET-003 | `language_code`／语言代码 | varchar(16) | 必填；不可空；BCP 47 | FK→merchant_language；唯一(component_id,language_code,usage) | 新增字段；待后端确认数据库映射；E-03 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [I18N-API-02](./AR前端自定义配置-接口需求清单.md#i18n-api-02) | PRD 2.3、3.1、3.3、4.1、5.3 | [I18N-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-i18n-02) | 1050=hi；1048=id；1052=—；1054=bn |
| ENT-ASSET-004 | `asset_id`／素材 ID | varchar(64) | 必填；不可空 | FK→V3 素材服务；索引 | 新增字段；待后端确认数据库映射；E-03 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [I18N-API-02](./AR前端自定义配置-接口需求清单.md#i18n-api-02) | PRD 2.3、3.1、3.3、4.1、5.3 | [I18N-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-i18n-02) | 1050=media-1050-hi；1048=media-1048-id；1052=—；1054=media-1054-bn |
| ENT-ASSET-005 | `alt_text`／替代文字 | varchar(200) | 可空；默认 null | 无独立索引 | 新增字段；待后端确认数据库映射；E-03 | 纯文字；禁 HTML/script。 | UTF-8；与 language_code 同语言。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [I18N-API-02](./AR前端自定义配置-接口需求清单.md#i18n-api-02)、[I18N-API-03](./AR前端自定义配置-接口需求清单.md#i18n-api-03) | PRD 2.3、3.1、3.3、4.1、5.3 | [I18N-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-i18n-02) | 1050=热门游戏；1048=Beranda；1052=null；1054=হোম |
| ENT-ASSET-006 | `fallback_asset_id`／回退素材 ID | varchar(64) | 可空；默认总控默认素材 | FK→素材服务 | 新增字段；待后端确认数据库映射；E-03 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [I18N-API-03](./AR前端自定义配置-接口需求清单.md#i18n-api-03) | PRD 2.3、3.1、3.3、4.1、5.3 | [I18N-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-i18n-02) | 1050=media-admin-en；1048=media-admin-en；1052=media-admin-en；1054=media-admin-en |

## 15. ENT-GPL｜游戏平台／场馆

- 实体／表：`game_platform`
- 数据来源与总控／商户读写边界：游戏管理写；总控／商户端只读并配置引用。
- 现有证据：E-06
- 对应 PRD 章节：PRD 2.3、5.4
- 对应功能点编号：[GAME-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-game-01)

| 字段 ID | 字段代码／中文名称 | 数据类型与长度 | 必填／可空／默认／枚举 | 主外键／稳定 ID／唯一性／索引 | 分类／证据状态 | 显示条件／验证 | 语言／时区 | 敏感性／权限／保留 | 对应接口编号 | 对应 PRD | 对应功能点编号 | 1050／1048／1052／1054 代表值 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| ENT-GPL-001 | `provider_id`／供应商 ID | varchar(36) | 必填；不可空 | PK 部分／稳定 ID | 既有字段扩充；待后端确认数据库映射；E-06 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [GAME-API-01](./AR前端自定义配置-接口需求清单.md#game-api-01) | PRD 2.3、5.4 | [GAME-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-game-01) | 1050=provider-cq9；1048=provider-pg；1052=provider-cmd；1054=provider-pg |
| ENT-GPL-002 | `venue_id`／场馆 ID | varchar(36) | 必填；不可空 | PK 部分；唯一(provider_id,venue_id) | 新增字段；待后端确认数据库映射；E-06 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [GAME-API-01](./AR前端自定义配置-接口需求清单.md#game-api-01) | PRD 2.3、5.4 | [GAME-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-game-01) | 1050=venue-cq9；1048=venue-pg；1052=venue-cmd；1054=venue-pg |
| ENT-GPL-003 | `venue_name`／场馆名称 | varchar(100) | 必填；不可空 | 索引 venue_name | 既有字段扩充；待后端确认数据库映射；E-06 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [GAME-API-01](./AR前端自定义配置-接口需求清单.md#game-api-01) | PRD 2.3、5.4 | [GAME-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-game-01) | 1050=CQ9；1048=PG；1052=CMD；1054=PG |
| ENT-GPL-004 | `game_status`／游戏四态 | varchar(16) | 必填；不可空；active/maintenance/disabled/unavailable | 索引 game_status | 既有字段扩充；待后端确认数据库映射；E-06 | 四态不可合并；未知值按 unavailable。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [GAME-API-01](./AR前端自定义配置-接口需求清单.md#game-api-01)、[GAME-API-04](./AR前端自定义配置-接口需求清单.md#game-api-04) | PRD 2.3、5.4 | [GAME-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-game-01) | 1050=active；1048=maintenance；1052=unavailable；1054=disabled |
| ENT-GPL-005 | `update_time`／游戏数据更新时间 | datetime(3) | 必填；不可空 | 索引 update_time | 新增字段；待后端确认数据库映射；E-06 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [GAME-API-01](./AR前端自定义配置-接口需求清单.md#game-api-01)、[GAME-API-04](./AR前端自定义配置-接口需求清单.md#game-api-04) | PRD 2.3、5.4 | [GAME-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-game-01) | 1050=2026-08-06T10:00Z；1048=...01Z；1052=...02Z；1054=...03Z |

## 16. ENT-GCAT｜游戏分类

- 实体／表：`game_category`
- 数据来源与总控／商户读写边界：游戏管理写；双端只读与配置引用。
- 现有证据：E-06
- 对应 PRD 章节：PRD 2.3、5.4
- 对应功能点编号：[GAME-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-game-01)

| 字段 ID | 字段代码／中文名称 | 数据类型与长度 | 必填／可空／默认／枚举 | 主外键／稳定 ID／唯一性／索引 | 分类／证据状态 | 显示条件／验证 | 语言／时区 | 敏感性／权限／保留 | 对应接口编号 | 对应 PRD | 对应功能点编号 | 1050／1048／1052／1054 代表值 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| ENT-GCAT-001 | `category_id`／游戏分类 ID | varchar(36) | 必填；不可空 | PK／稳定 ID | 既有字段扩充；待后端确认数据库映射；E-06 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [GAME-API-02](./AR前端自定义配置-接口需求清单.md#game-api-02) | PRD 2.3、5.4 | [GAME-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-game-01) | 1050=cat-slots；1048=cat-slots；1052=cat-esports；1054=cat-slots |
| ENT-GCAT-002 | `provider_id`／供应商 ID | varchar(36) | 必填；不可空 | FK→game_platform；索引 | 既有字段扩充；待后端确认数据库映射；E-06 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [GAME-API-02](./AR前端自定义配置-接口需求清单.md#game-api-02) | PRD 2.3、5.4 | [GAME-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-game-01) | 1050=provider-cq9；1048=provider-pg；1052=provider-cmd；1054=provider-pg |
| ENT-GCAT-003 | `venue_id`／场馆 ID | varchar(36) | 必填；不可空 | FK→game_platform；索引 | 新增字段；待后端确认数据库映射；E-06 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [GAME-API-02](./AR前端自定义配置-接口需求清单.md#game-api-02) | PRD 2.3、5.4 | [GAME-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-game-01) | 1050=venue-cq9；1048=venue-pg；1052=venue-cmd；1054=venue-pg |
| ENT-GCAT-004 | `category_name`／分类名称 | varchar(100) | 必填；不可空 | 索引 category_name | 既有字段扩充；待后端确认数据库映射；E-06 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [GAME-API-02](./AR前端自定义配置-接口需求清单.md#game-api-02) | PRD 2.3、5.4 | [GAME-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-game-01) | 1050=Slots；1048=Slots；1052=Esports；1054=Slots |
| ENT-GCAT-005 | `game_status`／游戏四态 | varchar(16) | 必填；不可空；active/maintenance/disabled/unavailable | 索引 game_status | 新增字段；待后端确认数据库映射；E-06 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [GAME-API-02](./AR前端自定义配置-接口需求清单.md#game-api-02)、[GAME-API-04](./AR前端自定义配置-接口需求清单.md#game-api-04) | PRD 2.3、5.4 | [GAME-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-game-01) | 1050=active；1048=maintenance；1052=unavailable；1054=disabled |

## 17. ENT-GAME｜子游戏

- 实体／表：`subgame`
- 数据来源与总控／商户读写边界：游戏管理写；双端只读与配置引用。
- 现有证据：E-06
- 对应 PRD 章节：PRD 2.3、5.4
- 对应功能点编号：[GAME-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-game-01)

| 字段 ID | 字段代码／中文名称 | 数据类型与长度 | 必填／可空／默认／枚举 | 主外键／稳定 ID／唯一性／索引 | 分类／证据状态 | 显示条件／验证 | 语言／时区 | 敏感性／权限／保留 | 对应接口编号 | 对应 PRD | 对应功能点编号 | 1050／1048／1052／1054 代表值 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| ENT-GAME-001 | `game_id`／子游戏 ID | varchar(36) | 必填；不可空 | PK／稳定 ID | 既有字段扩充；待后端确认数据库映射；E-06 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [GAME-API-03](./AR前端自定义配置-接口需求清单.md#game-api-03)、[GAME-API-04](./AR前端自定义配置-接口需求清单.md#game-api-04) | PRD 2.3、5.4 | [GAME-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-game-01) | 1050=game-cq9-001；1048=game-pg-001；1052=game-cmd-001；1054=game-pg-002 |
| ENT-GAME-002 | `category_id`／游戏分类 ID | varchar(36) | 必填；不可空 | FK→game_category；索引 | 既有字段扩充；待后端确认数据库映射；E-06 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [GAME-API-03](./AR前端自定义配置-接口需求清单.md#game-api-03) | PRD 2.3、5.4 | [GAME-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-game-01) | 1050=cat-slots；1048=cat-slots；1052=cat-esports；1054=cat-slots |
| ENT-GAME-003 | `provider_id`／供应商 ID | varchar(36) | 必填；不可空 | FK→game_platform；索引 | 既有字段扩充；待后端确认数据库映射；E-06 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [GAME-API-03](./AR前端自定义配置-接口需求清单.md#game-api-03) | PRD 2.3、5.4 | [GAME-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-game-01) | 1050=provider-cq9；1048=provider-pg；1052=provider-cmd；1054=provider-pg |
| ENT-GAME-004 | `venue_id`／场馆 ID | varchar(36) | 必填；不可空 | FK→game_platform；索引 | 新增字段；待后端确认数据库映射；E-06 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [GAME-API-03](./AR前端自定义配置-接口需求清单.md#game-api-03) | PRD 2.3、5.4 | [GAME-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-game-01) | 1050=venue-cq9；1048=venue-pg；1052=venue-cmd；1054=venue-pg |
| ENT-GAME-005 | `game_name`／子游戏名称 | varchar(160) | 必填；不可空 | 索引 game_name | 既有字段扩充；待后端确认数据库映射；E-06 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [GAME-API-03](./AR前端自定义配置-接口需求清单.md#game-api-03) | PRD 2.3、5.4 | [GAME-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-game-01) | 1050=Jump High；1048=Mahjong Ways；1052=CMD League；1054=Fortune Tiger |
| ENT-GAME-006 | `game_status`／游戏四态 | varchar(16) | 必填；不可空；active/maintenance/disabled/unavailable | 索引 game_status | 新增字段；待后端确认数据库映射；E-06 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [GAME-API-03](./AR前端自定义配置-接口需求清单.md#game-api-03)、[GAME-API-04](./AR前端自定义配置-接口需求清单.md#game-api-04)、[MER-API-05](./AR前端自定义配置-接口需求清单.md#mer-api-05) | PRD 2.3、5.4 | [GAME-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-game-01) | 1050=active；1048=maintenance；1052=unavailable；1054=disabled |

## 18. ENT-ALLOW｜商户允许游戏／区块选择

- 实体／表：`layout_allowed_game`
- 数据来源与总控／商户读写边界：总控写允许池；商户授权由游戏／商户管理写；商户版面只写交集内的 selected。
- 现有证据：E-06、E-07
- 对应 PRD 章节：PRD 2.3、5.4
- 对应功能点编号：[GAME-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-game-02)、[GAME-03](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-game-03)

| 字段 ID | 字段代码／中文名称 | 数据类型与长度 | 必填／可空／默认／枚举 | 主外键／稳定 ID／唯一性／索引 | 分类／证据状态 | 显示条件／验证 | 语言／时区 | 敏感性／权限／保留 | 对应接口编号 | 对应 PRD | 对应功能点编号 | 1050／1048／1052／1054 代表值 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| ENT-ALLOW-001 | `layout_id`／版面 ID | varchar(36) | 必填；不可空 | PK 部分／FK→frontend_layout | 既有字段扩充；待后端确认数据库映射；E-06、E-07 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [GAME-API-04](./AR前端自定义配置-接口需求清单.md#game-api-04)、[GAME-API-05](./AR前端自定义配置-接口需求清单.md#game-api-05) | PRD 2.3、5.4 | [GAME-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-game-02)、[GAME-03](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-game-03) | 1050=layout-1050-home；1048=layout-1048-home；1052=—；1054=layout-1054-home |
| ENT-ALLOW-002 | `block_id`／区块 ID | varchar(36) | 必填；不可空 | PK 部分／FK→layout_block | 新增字段；待后端确认数据库映射；E-06、E-07 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [GAME-API-05](./AR前端自定义配置-接口需求清单.md#game-api-05) | PRD 2.3、5.4 | [GAME-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-game-02)、[GAME-03](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-game-03) | 1050=block-hot-games；1048=block-hot-games；1052=—；1054=block-new |
| ENT-ALLOW-003 | `game_id`／子游戏 ID | varchar(36) | 必填；不可空 | PK 部分／FK→subgame；唯一(layout_id,block_id,game_id) | 既有字段扩充；待后端确认数据库映射；E-06、E-07 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [GAME-API-04](./AR前端自定义配置-接口需求清单.md#game-api-04)、[GAME-API-05](./AR前端自定义配置-接口需求清单.md#game-api-05) | PRD 2.3、5.4 | [GAME-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-game-02)、[GAME-03](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-game-03) | 1050=game-cq9-001；1048=game-pg-001；1052=—；1054=game-pg-002 |
| ENT-ALLOW-004 | `allowed_by_admin`／总控允许 | boolean | 必填；不可空；默认 false | 索引 allowed_by_admin | 新增字段；待后端确认数据库映射；E-06、E-07 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [GAME-API-04](./AR前端自定义配置-接口需求清单.md#game-api-04) | PRD 2.3、5.4 | [GAME-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-game-02)、[GAME-03](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-game-03) | 1050=true；1048=true；1052=false；1054=true |
| ENT-ALLOW-005 | `merchant_entitled`／商户已开通 | boolean | 必填；不可空；默认 false | 索引 merchant_entitled | 新增字段；待后端确认数据库映射；E-06、E-07 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [GAME-API-04](./AR前端自定义配置-接口需求清单.md#game-api-04) | PRD 2.3、5.4 | [GAME-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-game-02)、[GAME-03](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-game-03) | 1050=true；1048=true；1052=false；1054=false |

## 19. ENT-DRF｜草稿

- 实体／表：`layout_draft`
- 数据来源与总控／商户读写边界：各端只写自身草稿；总控同步只更新代码模板契约与保底快照，不直接覆盖商户草稿或已发布覆盖。
- 现有证据：E-03、E-04
- 对应 PRD 章节：PRD 3.1、3.3、4.2
- 对应功能点编号：[ADM-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-adm-02)、[MER-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-mer-01)

| 字段 ID | 字段代码／中文名称 | 数据类型与长度 | 必填／可空／默认／枚举 | 主外键／稳定 ID／唯一性／索引 | 分类／证据状态 | 显示条件／验证 | 语言／时区 | 敏感性／权限／保留 | 对应接口编号 | 对应 PRD | 对应功能点编号 | 1050／1048／1052／1054 代表值 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| ENT-DRF-001 | `draft_id`／草稿 ID | varchar(36) | 必填；不可空 | PK／稳定 ID | 新增字段；待后端确认数据库映射；E-03、E-04 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [ADM-API-03](./AR前端自定义配置-接口需求清单.md#adm-api-03)、[MER-API-03](./AR前端自定义配置-接口需求清单.md#mer-api-03) | PRD 3.1、3.3、4.2 | [ADM-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-adm-02)、[MER-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-mer-01) | 1050=draft-1050-home-04；1048=draft-1048-promo-01；1052=—；1054=draft-1054-new-01 |
| ENT-DRF-002 | `layout_id`／版面 ID | varchar(36) | 必填；不可空 | FK→frontend_layout；唯一(layout_id,active=true) | 既有字段扩充；待后端确认数据库映射；E-03、E-04 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [ADM-API-03](./AR前端自定义配置-接口需求清单.md#adm-api-03)、[MER-API-03](./AR前端自定义配置-接口需求清单.md#mer-api-03) | PRD 3.1、3.3、4.2 | [ADM-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-adm-02)、[MER-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-mer-01) | 1050=layout-1050-home；1048=layout-1048-promo；1052=—；1054=layout-1054-new |
| ENT-DRF-003 | `fallback_snapshot_id`／下派保底快照 ID | varchar(36) | 商户草稿必填；总控草稿可空 | 索引 fallback_snapshot_id | 新增字段；待后端确认数据库映射；E-03、E-04 | 指向可独立渲染的完整保底内容；商户覆盖失效时直接使用，商户操作不可改写此快照。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [MER-API-02](./AR前端自定义配置-接口需求清单.md#mer-api-02)、[MER-API-03](./AR前端自定义配置-接口需求清单.md#mer-api-03) | PRD 3.1、3.3、4.2 | [ADM-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-adm-02)、[MER-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-mer-01) | 1050=fallback-admin-home-07；1048=fallback-admin-home-07；1052=—；1054=fallback-admin-home-08 |
| ENT-DRF-004 | `draft_payload`／草稿内容 | json | 必填；不可空；默认 {} | JSON 路径索引按查询需求 | 新增字段；待后端确认数据库映射；E-03、E-04 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [ADM-API-03](./AR前端自定义配置-接口需求清单.md#adm-api-03)、[MER-API-03](./AR前端自定义配置-接口需求清单.md#mer-api-03) | PRD 3.1、3.3、4.2 | [ADM-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-adm-02)、[MER-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-mer-01) | 1050={i18n,assets,games}；1048={i18n}；1052=—；1054={} |
| ENT-DRF-005 | `update_time`／草稿更新时间 | datetime(3) | 必填；不可空 | 索引 update_time／ETag | 新增字段；待后端确认数据库映射；E-03、E-04 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [ADM-API-03](./AR前端自定义配置-接口需求清单.md#adm-api-03)、[MER-API-03](./AR前端自定义配置-接口需求清单.md#mer-api-03) | PRD 3.1、3.3、4.2 | [ADM-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-adm-02)、[MER-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-mer-01) | 1050=2026-08-06T11:00Z；1048=2026-08-05T11:00Z；1052=—；1054=2026-08-04T11:00Z |
| ENT-DRF-006 | `template_compatibility_state`／模板兼容状态 | varchar(24) | 必填；不可空；compatible/hidden_retained/fallback_active | 索引 template_compatibility_state | 新增字段；待后端确认数据库映射；E-03、E-04 | 模板／版面更新后以稳定 ID 自动合并；被移除插槽的商户值保留但不展示，不要求商户确认；覆盖不合法或执行失败时使用保底。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [MER-API-02](./AR前端自定义配置-接口需求清单.md#mer-api-02)、[SYNC-API-01](./AR前端自定义配置-接口需求清单.md#sync-api-01) | PRD 3.1、3.3、4.2 | [ADM-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-adm-02)、[MER-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-mer-01) | 1050=hidden_retained；1048=compatible；1052=—；1054=fallback_active |

## 20. ENT-SCH｜定时发布计划

- 实体／表：`layout_schedule`
- 数据来源与总控／商户读写边界：商户版面服务写；总控端不建立定时发布计划；定时发布计划服务执行。
- 现有证据：E-04
- 对应 PRD 章节：PRD 3.3、4.2
- 对应功能点编号：[MER-04](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-mer-04)

| 字段 ID | 字段代码／中文名称 | 数据类型与长度 | 必填／可空／默认／枚举 | 主外键／稳定 ID／唯一性／索引 | 分类／证据状态 | 显示条件／验证 | 语言／时区 | 敏感性／权限／保留 | 对应接口编号 | 对应 PRD | 对应功能点编号 | 1050／1048／1052／1054 代表值 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| ENT-SCH-001 | `schedule_id`／定时发布计划 ID | varchar(36) | 必填；不可空 | PK／稳定 ID | 新增字段；待后端确认数据库映射；E-04 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [MER-API-07](./AR前端自定义配置-接口需求清单.md#mer-api-07)、[MER-API-08](./AR前端自定义配置-接口需求清单.md#mer-api-08) | PRD 3.3、4.2 | [MER-04](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-mer-04) | 1050=sched-1050-home-01；1048=—；1052=—；1054=— |
| ENT-SCH-002 | `tenant_id`／商户 ID | varchar(32) | 必填；不可空 | FK→merchant_profile；索引 | 既有字段扩充；待后端确认数据库映射；E-04 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [MER-API-07](./AR前端自定义配置-接口需求清单.md#mer-api-07) | PRD 3.3、4.2 | [MER-04](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-mer-04) | 1050=1050；1048=1048；1052=1052；1054=1054 |
| ENT-SCH-003 | `layout_id`／版面 ID | varchar(36) | 必填；不可空 | FK→frontend_layout；唯一(layout_id,status=pending) | 既有字段扩充；待后端确认数据库映射；E-04 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [MER-API-07](./AR前端自定义配置-接口需求清单.md#mer-api-07)、[MER-API-08](./AR前端自定义配置-接口需求清单.md#mer-api-08) | PRD 3.3、4.2 | [MER-04](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-mer-04) | 1050=layout-1050-home；1048=—；1052=—；1054=— |
| ENT-SCH-004 | `schedule_at_utc`／定时发布时间 UTC | datetime(3) | 必填；不可空；至少现在+5分钟 | 索引(schedule_at_utc,status) | 新增字段；待后端确认数据库映射；E-04 | 选择时间时即时校验，服务端重验。 | UTC 保存；依 display_timezone 显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [MER-API-07](./AR前端自定义配置-接口需求清单.md#mer-api-07) | PRD 3.3、4.2 | [MER-04](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-mer-04) | 1050=2026-08-07T02:30:00Z；1048=null；1052=null；1054=null |
| ENT-SCH-005 | `display_timezone`／显示时区 | varchar(64) | 必填；不可空；IANA timezone | 索引 display_timezone | 新增字段；待后端确认数据库映射；E-04 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [MER-API-07](./AR前端自定义配置-接口需求清单.md#mer-api-07) | PRD 3.3、4.2 | [MER-04](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-mer-04) | 1050=Asia/Kolkata；1048=Asia/Kolkata；1052=Asia/Bangkok；1054=Asia/Dhaka |
| ENT-SCH-006 | `schedule_status`／定时发布计划状态 | varchar(16) | 必填；不可空；pending/cancelled/executing/succeeded/failed | 索引(layout_id,schedule_status) | 既有字段扩充；待后端确认数据库映射；E-04 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [MER-API-07](./AR前端自定义配置-接口需求清单.md#mer-api-07)、[MER-API-08](./AR前端自定义配置-接口需求清单.md#mer-api-08) | PRD 3.3、4.2 | [MER-04](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-mer-04) | 1050=pending；1048=cancelled；1052=none；1054=cancelled |
| ENT-SCH-007 | `update_time`／定时发布计划更新时间 | datetime(3) | 必填；不可空 | 索引 update_time／CAS | 新增字段；待后端确认数据库映射；E-04 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [MER-API-07](./AR前端自定义配置-接口需求清单.md#mer-api-07)、[MER-API-08](./AR前端自定义配置-接口需求清单.md#mer-api-08) | PRD 3.3、4.2 | [MER-04](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-mer-04) | 1050=2026-08-06T11:10Z；1048=2026-08-05T11:10Z；1052=—；1054=2026-08-04T11:10Z |

## 21. ENT-PUB｜商户发布记录

- 实体／表：`merchant_layout_publication`
- 数据来源与总控／商户读写边界：只记录商户端成功／失败发布及商户发布版本。
- 现有证据：E-04
- 对应 PRD 章节：PRD 3.3、4.2、5.1
- 对应功能点编号：[MER-03](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-mer-03)

| 字段 ID | 字段代码／中文名称 | 数据类型与长度 | 必填／可空／默认／枚举 | 主外键／稳定 ID／唯一性／索引 | 分类／证据状态 | 显示条件／验证 | 语言／时区 | 敏感性／权限／保留 | 对应接口编号 | 对应 PRD | 对应功能点编号 | 1050／1048／1052／1054 代表值 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| ENT-PUB-001 | `publication_id`／发布记录 ID | varchar(36) | 必填；不可空 | PK／稳定 ID | 新增字段；待后端确认数据库映射；E-04 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [MER-API-06](./AR前端自定义配置-接口需求清单.md#mer-api-06) | PRD 3.3、4.2、5.1 | [MER-03](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-mer-03) | 1050=pub-1050-004；1048=pub-1048-010；1052=—；1054=pub-1054-004 |
| ENT-PUB-002 | `tenant_id`／商户 ID | varchar(36) | 必填；不可空 | FK→merchant；索引(tenant_id,published_at) | 使用既有字段；已见原型／V3 能力证据；正式数据库映射待后端确认；E-04 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [MER-API-06](./AR前端自定义配置-接口需求清单.md#mer-api-06) | PRD 3.3、4.2、5.1 | [MER-03](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-mer-03) | 1050=1050；1048=1048；1052=1052；1054=1054 |
| ENT-PUB-003 | `layout_id`／版面 ID | varchar(36) | 必填；不可空 | FK→frontend_layout；索引 | 既有字段扩充；待后端确认数据库映射；E-04 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [MER-API-06](./AR前端自定义配置-接口需求清单.md#mer-api-06) | PRD 3.3、4.2、5.1 | [MER-03](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-mer-03) | 1050=layout-1050-home；1048=layout-1048-home；1052=—；1054=layout-1054-home |
| ENT-PUB-004 | `merchant_version`／商户发布版本 | varchar(40) | 商户成功发布必填 | 唯一(tenant_id,layout_id,merchant_version) | 使用既有字段；已见原型／V3 能力证据；正式数据库映射待后端确认；E-04 | 只在商户端显示。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [MER-API-06](./AR前端自定义配置-接口需求清单.md#mer-api-06)、[MER-API-09](./AR前端自定义配置-接口需求清单.md#mer-api-09) | PRD 3.3、4.2、5.1 | [MER-03](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-mer-03) | 1050=TEN-1050-004；1048=TEN-1048-010；1052=null；1054=TEN-1054-004 |
| ENT-PUB-005 | `publish_status`／发布结果 | varchar(24) | 必填；不可空；succeeded/failed/auto_rolled_back/rolled_back | 索引 publish_status | 既有字段扩充；待后端确认数据库映射；E-04 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [MER-API-06](./AR前端自定义配置-接口需求清单.md#mer-api-06)、[MER-API-09](./AR前端自定义配置-接口需求清单.md#mer-api-09) | PRD 3.3、4.2、5.1 | [MER-03](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-mer-03) | 1050=succeeded；1048=auto_rolled_back；1052=none；1054=succeeded |
| ENT-PUB-006 | `published_at`／发布时间 | datetime(3) | 成功必填；失败可空 | 索引 published_at | 新增字段；待后端确认数据库映射；E-04 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [MER-API-06](./AR前端自定义配置-接口需求清单.md#mer-api-06) | PRD 3.3、4.2、5.1 | [MER-03](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-mer-03) | 1050=2026-08-06T12:00Z；1048=2026-08-05T12:00Z；1052=null；1054=2026-08-04T12:00Z |
| ENT-PUB-007 | `affected_domain_ids`／影响主域名 | json | 商户发布必填非空 | 按需倒排／关联表优先 | 新增字段；待后端确认数据库映射；E-04 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [MER-API-06](./AR前端自定义配置-接口需求清单.md#mer-api-06)、[MER-API-09](./AR前端自定义配置-接口需求清单.md#mer-api-09) | PRD 3.3、4.2、5.1 | [MER-03](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-mer-03) | 1050=[domain-1050-main]；1048=[domain-1048-main]；1052=[]；1054=[domain-1054-main] |
| ENT-PUB-008 | `operation_id`／操作幂等键 | varchar(64) | 必填；不可空 | 唯一(operation_id) | 新增字段；待后端确认数据库映射；E-04 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [MER-API-06](./AR前端自定义配置-接口需求清单.md#mer-api-06) | PRD 3.3、4.2、5.1 | [MER-03](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-mer-03) | 1050=op-pub-1050-004；1048=op-pub-1048-010；1052=—；1054=op-pub-1054-004 |

## 22. ENT-RBK｜回滚记录

- 实体／表：`layout_rollback`
- 数据来源与总控／商户读写边界：只允许商户版面服务写；总控端无此实体／能力。
- 现有证据：E-04
- 对应 PRD 章节：PRD 5.1
- 对应功能点编号：[MER-05](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-mer-05)

| 字段 ID | 字段代码／中文名称 | 数据类型与长度 | 必填／可空／默认／枚举 | 主外键／稳定 ID／唯一性／索引 | 分类／证据状态 | 显示条件／验证 | 语言／时区 | 敏感性／权限／保留 | 对应接口编号 | 对应 PRD | 对应功能点编号 | 1050／1048／1052／1054 代表值 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| ENT-RBK-001 | `rollback_id`／回滚 ID | varchar(36) | 必填；不可空 | PK／稳定 ID | 新增字段；待后端确认数据库映射；E-04 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [MER-API-09](./AR前端自定义配置-接口需求清单.md#mer-api-09) | PRD 5.1 | [MER-05](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-mer-05) | 1050=rbk-1050-001；1048=rbk-1048-auto-01；1052=—；1054=— |
| ENT-RBK-002 | `layout_id`／商户版面 ID | varchar(36) | 必填；不可空 | FK→frontend_layout；索引 | 既有字段扩充；待后端确认数据库映射；E-04 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [MER-API-09](./AR前端自定义配置-接口需求清单.md#mer-api-09) | PRD 5.1 | [MER-05](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-mer-05) | 1050=layout-1050-home；1048=layout-1048-home；1052=—；1054=layout-1054-home |
| ENT-RBK-003 | `target_publication_id`／目标成功发布 ID | varchar(36) | 必填；不可空 | FK→layout_publication；索引 | 新增字段；待后端确认数据库映射；E-04 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [MER-API-09](./AR前端自定义配置-接口需求清单.md#mer-api-09) | PRD 5.1 | [MER-05](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-mer-05) | 1050=pub-1050-003；1048=pub-1048-009；1052=—；1054=pub-1054-003 |
| ENT-RBK-004 | `trigger_type`／触发类型 | varchar(16) | 必填；不可空；manual/health_check | 索引 trigger_type | 新增字段；待后端确认数据库映射；E-04 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [MER-API-09](./AR前端自定义配置-接口需求清单.md#mer-api-09) | PRD 5.1 | [MER-05](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-mer-05) | 1050=manual；1048=health_check；1052=—；1054=manual |
| ENT-RBK-005 | `rollback_status`／回滚结果 | varchar(16) | 必填；不可空；succeeded/failed | 索引 rollback_status | 新增字段；待后端确认数据库映射；E-04 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [MER-API-09](./AR前端自定义配置-接口需求清单.md#mer-api-09) | PRD 5.1 | [MER-05](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-mer-05) | 1050=succeeded；1048=succeeded；1052=none；1054=failed |
| ENT-RBK-006 | `failure_reason`／失败原因 | varchar(500) | 可空；成功为 null | 无独立索引 | 新增字段；待后端确认数据库映射；E-04 | 只向 UI 转译业务文案；不显内部堆叠。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [MER-API-09](./AR前端自定义配置-接口需求清单.md#mer-api-09)、[AUD-API-01](./AR前端自定义配置-接口需求清单.md#aud-api-01) | PRD 5.1 | [MER-05](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-mer-05) | 1050=null；1048=null；1052=null；1054=DOMAIN_ATOMIC_SWITCH_FAILED |

## 23. ENT-SYNC｜跨端同步状态

- 实体／表：`cross_end_sync_state`
- 数据来源与总控／商户读写边界：代码模板发布及总控版面下派／更新产生事件；同步服务只更新模板契约与保底快照状态；商户覆盖内容不在总控至商户的同步载荷内。
- 现有证据：E-01、E-03、E-04
- 对应 PRD 章节：PRD 3.2、4.2
- 对应功能点编号：[DSP-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-dsp-02)

| 字段 ID | 字段代码／中文名称 | 数据类型与长度 | 必填／可空／默认／枚举 | 主外键／稳定 ID／唯一性／索引 | 分类／证据状态 | 显示条件／验证 | 语言／时区 | 敏感性／权限／保留 | 对应接口编号 | 对应 PRD | 对应功能点编号 | 1050／1048／1052／1054 代表值 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| ENT-SYNC-001 | `sync_operation_id`／同步操作 ID | varchar(64) | 必填；不可空 | PK／稳定 ID | 新增字段；待后端确认数据库映射；E-01、E-03、E-04 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [DSP-API-04](./AR前端自定义配置-接口需求清单.md#dsp-api-04)、[SYNC-API-01](./AR前端自定义配置-接口需求清单.md#sync-api-01)、[SYNC-API-02](./AR前端自定义配置-接口需求清单.md#sync-api-02) | PRD 3.2、4.2 | [DSP-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-dsp-02) | 1050=sync-1050-101；1048=sync-1048-099；1052=sync-1052-001；1054=sync-1054-088 |
| ENT-SYNC-002 | `tenant_id`／商户 ID | varchar(32) | 必填；不可空 | FK→merchant_profile；索引 | 新增字段；待后端确认数据库映射；E-01、E-03、E-04 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [SYNC-API-01](./AR前端自定义配置-接口需求清单.md#sync-api-01) | PRD 3.2、4.2 | [DSP-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-dsp-02) | 1050=1050；1048=1048；1052=1052；1054=1054 |
| ENT-SYNC-003 | `layout_id`／版面 ID | varchar(36) | 可空；商户整体下派可先空 | 索引 layout_id | 新增字段；待后端确认数据库映射；E-01、E-03、E-04 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [SYNC-API-01](./AR前端自定义配置-接口需求清单.md#sync-api-01) | PRD 3.2、4.2 | [DSP-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-dsp-02) | 1050=layout-1050-home；1048=layout-1048-home；1052=null；1054=layout-1054-home |
| ENT-SYNC-004 | `sync_direction`／同步方向 | varchar(24) | 必填；不可空；admin_to_merchant/merchant_to_admin_status | 索引 sync_direction | 新增字段；待后端确认数据库映射；E-01、E-03、E-04 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [SYNC-API-01](./AR前端自定义配置-接口需求清单.md#sync-api-01) | PRD 3.2、4.2 | [DSP-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-dsp-02) | 1050=admin_to_merchant；1048=admin_to_merchant；1052=admin_to_merchant；1054=merchant_to_admin_status |
| ENT-SYNC-005 | `sync_status`／同步状态 | varchar(16) | 必填；不可空；queued/running/succeeded/failed/stale | 索引(sync_status,updated_at) | 新增字段；待后端确认数据库映射；E-01、E-03、E-04 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [DSP-API-04](./AR前端自定义配置-接口需求清单.md#dsp-api-04)、[SYNC-API-01](./AR前端自定义配置-接口需求清单.md#sync-api-01) | PRD 3.2、4.2 | [DSP-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-dsp-02) | 1050=stale；1048=failed；1052=queued；1054=succeeded |
| ENT-SYNC-006 | `cursor`／同步游标 | bigint | 必填；不可空；单调递增 | 唯一(tenant_id,cursor) | 新增字段；待后端确认数据库映射；E-01、E-03、E-04 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [SYNC-API-01](./AR前端自定义配置-接口需求清单.md#sync-api-01) | PRD 3.2、4.2 | [DSP-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-dsp-02) | 1050=101；1048=99；1052=1；1054=88 |
| ENT-SYNC-007 | `last_successful_at`／最后成功时间 | datetime(3) | 可空；从未成功为 null | 索引 last_successful_at | 新增字段；待后端确认数据库映射；E-01、E-03、E-04 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [DSP-API-04](./AR前端自定义配置-接口需求清单.md#dsp-api-04)、[SYNC-API-01](./AR前端自定义配置-接口需求清单.md#sync-api-01) | PRD 3.2、4.2 | [DSP-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-dsp-02) | 1050=2026-08-06T10:00Z；1048=2026-08-05T10:00Z；1052=null；1054=2026-08-06T09:00Z |
| ENT-SYNC-008 | `last_successful_fallback_ref`／最后成功保底引用 | varchar(128) | 可空；从未成功为 null | 索引 fallback_ref；实体内容另存 | 新增字段；待后端确认数据库映射；E-01、E-03、E-04 | error/stale 时使用最近有效保底；不得跨 tenant 读取，也不得包含或覆盖商户内容。 | 引用内容依其语言字段规则处理。 | 不含商户覆盖；版面查看；与相关版面数据同保留期限。 | [DSP-API-04](./AR前端自定义配置-接口需求清单.md#dsp-api-04)、[SYNC-API-01](./AR前端自定义配置-接口需求清单.md#sync-api-01) | PRD 3.2、4.2 | [DSP-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-dsp-02) | 1050=fallback-1050-100；1048=fallback-1048-098；1052=null；1054=fallback-1054-088 |

## 24. ENT-AUD｜操作记录

- 实体／表：`frontend_layout_audit_log`
- 数据来源与总控／商户读写边界：各业务服务追加不可变事件；双端依授权只读；原型不导出。
- 现有证据：E-04
- 对应 PRD 章节：PRD 5.5
- 对应功能点编号：[AUD-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-aud-01)

| 字段 ID | 字段代码／中文名称 | 数据类型与长度 | 必填／可空／默认／枚举 | 主外键／稳定 ID／唯一性／索引 | 分类／证据状态 | 显示条件／验证 | 语言／时区 | 敏感性／权限／保留 | 对应接口编号 | 对应 PRD | 对应功能点编号 | 1050／1048／1052／1054 代表值 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| ENT-AUD-001 | `audit_id`／操作记录 ID | varchar(36) | 必填；不可空 | PK／稳定 ID | 新增字段；待后端确认数据库映射；E-04 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [AUD-API-01](./AR前端自定义配置-接口需求清单.md#aud-api-01) | PRD 5.5 | [AUD-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-aud-01) | 1050=audit-1050-501；1048=audit-1048-401；1052=audit-1052-001；1054=audit-1054-301 |
| ENT-AUD-002 | `actor_id`／操作者 ID | varchar(64) | 必填；不可空 | 索引 actor_id | 新增字段；待后端确认数据库映射；E-04 | 详情显示遮罩后识别。 | 不适用语言；时间另列。 | 个人识别；版面查看；保留 180 天。 | [AUD-API-01](./AR前端自定义配置-接口需求清单.md#aud-api-01) | PRD 5.5 | [AUD-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-aud-01) | 1050=user-daman-admin；1048=system-health；1052=user-control-admin；1054=user-jeetwin-view |
| ENT-AUD-003 | `role_id`／角色 ID | varchar(64) | 必填；不可空 | 索引 role_id | 新增字段；待后端确认数据库映射；E-04 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [AUD-API-01](./AR前端自定义配置-接口需求清单.md#aud-api-01) | PRD 5.5 | [AUD-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-aud-01) | 1050=role-full；1048=system；1052=role-config；1054=role-view |
| ENT-AUD-004 | `tenant_id`／商户 ID | varchar(32) | 可空；总控模板操作可空 | 索引 tenant_id | 既有字段扩充；待后端确认数据库映射；E-04 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [AUD-API-01](./AR前端自定义配置-接口需求清单.md#aud-api-01) | PRD 5.5 | [AUD-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-aud-01) | 1050=1050；1048=1048；1052=1052；1054=1054 |
| ENT-AUD-005 | `source_side`／来源端 | varchar(16) | 必填；不可空；admin/merchant/system | 索引 source_side | 新增字段；待后端确认数据库映射；E-04 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [AUD-API-01](./AR前端自定义配置-接口需求清单.md#aud-api-01) | PRD 5.5 | [AUD-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-aud-01) | 1050=merchant；1048=system；1052=admin；1054=merchant |
| ENT-AUD-006 | `object_id`／对象 ID | varchar(64) | 必填；不可空 | 索引(object_type,object_id) | 新增字段；待后端确认数据库映射；E-04 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [AUD-API-01](./AR前端自定义配置-接口需求清单.md#aud-api-01) | PRD 5.5 | [AUD-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-aud-01) | 1050=layout-1050-home；1048=layout-1048-home；1052=dispatch-1052；1054=layout-1054-home |
| ENT-AUD-007 | `action_code`／动作 | varchar(40) | 必填；不可空；受控枚举 | 索引 action_code | 新增字段；待后端确认数据库映射；E-04 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [AUD-API-01](./AR前端自定义配置-接口需求清单.md#aud-api-01) | PRD 5.5 | [AUD-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-aud-01) | 1050=SCHEDULE_CREATE；1048=AUTO_ROLLBACK；1052=DISPATCH_CREATE；1054=VIEW_DETAIL |
| ENT-AUD-008 | `result_code`／结果 | varchar(16) | 必填；不可空；success/failure/blocked | 索引 result_code | 新增字段；待后端确认数据库映射；E-04 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [AUD-API-01](./AR前端自定义配置-接口需求清单.md#aud-api-01) | PRD 5.5 | [AUD-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-aud-01) | 1050=success；1048=success；1052=failure；1054=success |
| ENT-AUD-009 | `change_summary`／变更前后摘要 | json | 可空；敏感值遮罩 | JSON 路径索引按需 | 新增字段；待后端确认数据库映射；E-04 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [AUD-API-01](./AR前端自定义配置-接口需求清单.md#aud-api-01) | PRD 5.5 | [AUD-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-aud-01) | 1050={before:none,after:scheduled}；1048={to:TEN-1048-009}；1052={reason:NO_DOMAIN}；1054={} |
| ENT-AUD-010 | `occurred_at`／发生时间 | datetime(3) | 必填；不可空；服务端产生 | 索引(occurred_at,audit_id) | 新增字段；待后端确认数据库映射；E-04 | 依用户选择时区显示；不可改。 | UTC 保存，回应附显示 timezone。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [AUD-API-01](./AR前端自定义配置-接口需求清单.md#aud-api-01) | PRD 5.5 | [AUD-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-aud-01) | 1050=2026-08-06T12:00Z；1048=2026-08-05T12:05Z；1052=2026-08-06T11:00Z；1054=2026-08-04T12:00Z |

## 25. ENT-PERM｜权限

- 实体／表：`v3_role_permission`
- 数据来源与总控／商户读写边界：V3 系统管理→角色管理写；双端只读；本专案不建立角色／按钮权限表。
- 现有证据：E-08
- 对应 PRD 章节：PRD 2.2
- 对应功能点编号：[PERM-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-perm-01)

| 字段 ID | 字段代码／中文名称 | 数据类型与长度 | 必填／可空／默认／枚举 | 主外键／稳定 ID／唯一性／索引 | 分类／证据状态 | 显示条件／验证 | 语言／时区 | 敏感性／权限／保留 | 对应接口编号 | 对应 PRD | 对应功能点编号 | 1050／1048／1052／1054 代表值 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| ENT-PERM-001 | `role_id`／角色 ID | varchar(64) | 必填；不可空 | PK 部分／FK→V3 role | 使用既有字段；已见原型／V3 能力证据；正式数据库映射待后端确认；E-08 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [PERM-API-01](./AR前端自定义配置-接口需求清单.md#perm-api-01)、[PERM-API-02](./AR前端自定义配置-接口需求清单.md#perm-api-02) | PRD 2.2 | [PERM-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-perm-01) | 1050=role-full；1048=role-view；1052=role-config；1054=role-view |
| ENT-PERM-002 | `permission_code`／基础权限代码 | varchar(100) | 必填；不可空；仅三个基础点 | PK 部分；唯一(role_id,permission_code) | 既有字段扩充；待后端确认数据库映射；E-08 | 不得再拆按钮级 code。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [PERM-API-01](./AR前端自定义配置-接口需求清单.md#perm-api-01)、[PERM-API-02](./AR前端自定义配置-接口需求清单.md#perm-api-02) | PRD 2.2 | [PERM-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-perm-01) | 1050=VIEW/CONFIG/PUBLISH；1048=VIEW；1052=VIEW/CONFIG；1054=VIEW |
| ENT-PERM-003 | `granted_flag`／是否授权 | boolean | 必填；不可空；默认 false | 索引(granted_flag,permission_code) | 使用既有字段；已见原型／V3 能力证据；正式数据库映射待后端确认；E-08 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [PERM-API-01](./AR前端自定义配置-接口需求清单.md#perm-api-01) | PRD 2.2 | [PERM-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-perm-01) | 1050=true；1048=VIEW:true；1052=PUBLISH:false；1054=CONFIG:false |
| ENT-PERM-004 | `permission_updated_at`／权限更新时间 | datetime(3) | 必填；不可空 | 索引 permission_updated_at | 新增字段；待后端确认数据库映射；E-08 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [PERM-API-01](./AR前端自定义配置-接口需求清单.md#perm-api-01)、[PERM-API-02](./AR前端自定义配置-接口需求清单.md#perm-api-02) | PRD 2.2 | [PERM-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-perm-01) | 1050=2026-08-06T10:00Z；1048=...01Z；1052=...02Z；1054=...03Z |
| ENT-PERM-005 | `tenant_scope`／授权商户范围 | json | 必填；不可空；由 V3 会话提供 | 索引需依 V3 现状 | 既有字段扩充；待后端确认数据库映射；E-08 | URL tenantId 不得扩张范围。 | 不适用语言／时区。 | 敏感授权数据；登录态；随 V3 角色策略保留。 | [PERM-API-01](./AR前端自定义配置-接口需求清单.md#perm-api-01)、[PERM-API-02](./AR前端自定义配置-接口需求清单.md#perm-api-02) | PRD 2.2 | [PERM-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-perm-01) | 1050=[1050]；1048=[1048]；1052=[1052]；1054=[1054] |

## 26. ENT-HELP｜功能说明书

- 实体／表：`page_manual_content`
- 数据来源与总控／商户读写边界：前端 PageManual registry 随 build 发布；V3 共用组件读；业务数据不写。
- 现有证据：E-09
- 对应 PRD 章节：PRD 7
- 对应功能点编号：[HELP-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-help-01)

| 字段 ID | 字段代码／中文名称 | 数据类型与长度 | 必填／可空／默认／枚举 | 主外键／稳定 ID／唯一性／索引 | 分类／证据状态 | 显示条件／验证 | 语言／时区 | 敏感性／权限／保留 | 对应接口编号 | 对应 PRD | 对应功能点编号 | 1050／1048／1052／1054 代表值 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| ENT-HELP-001 | `manual_key`／说明书 key | varchar(100) | 必填；不可空 | PK／稳定 ID；唯一(route_key,locale) | 使用既有字段；已见原型／V3 能力证据；正式数据库映射待后端确认；E-09 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [HELP-API-01](./AR前端自定义配置-接口需求清单.md#help-api-01) | PRD 7 | [HELP-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-help-01) | 1050=merchant-layout-edit.zh-CN；1048=merchant-audit.en；1052=merchant-layout-list.th；1054=merchant-domain.bn |
| ENT-HELP-002 | `route_key`／页面路由 key | varchar(160) | 必填；不可空 | 索引 route_key | 使用既有字段；已见原型／V3 能力证据；正式数据库映射待后端确认；E-09 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [HELP-API-01](./AR前端自定义配置-接口需求清单.md#help-api-01) | PRD 7 | [HELP-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-help-01) | 1050=merchant.layout.edit；1048=merchant.audit；1052=merchant.layout.list；1054=merchant.domain |
| ENT-HELP-003 | `locale`／后台界面语言 | varchar(16) | 必填；不可空；BCP 47 | 唯一键部分；索引 locale | 新增字段；待后端确认数据库映射；E-09 | 缺翻译回退 zh-CN。 | BCP 47；不是内容配置语言。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [HELP-API-01](./AR前端自定义配置-接口需求清单.md#help-api-01) | PRD 7 | [HELP-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-help-01) | 1050=zh-CN；1048=en；1052=th；1054=bn |
| ENT-HELP-004 | `content_payload`／说明内容 | json | 必填；不可空；固定八段结构 | 无全文索引或依 V3 能力 | 既有字段扩充；待后端确认数据库映射；E-09 | 只读；不得含接口、Mock、技术限制或未定字样。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [HELP-API-01](./AR前端自定义配置-接口需求清单.md#help-api-01) | PRD 7 | [HELP-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-help-01) | 1050={purpose,...}；1048={audit,...}；1052={emptyState,...}；1054={domain,...} |
| ENT-HELP-005 | `content_updated_at`／内容更新时间 | datetime(3) | 必填；不可空；build 产生或 CMS 产生 | 索引 content_updated_at | 新增字段；待后端确认数据库映射；E-09 | 按对应页面显示；服务端重做相同验证。 | 文字 UTF-8；时间以 UTC 保存、依商户／用户时区显示。 | 非敏感；依实体所需基础权限；随实体生命周期保留。 | [HELP-API-01](./AR前端自定义配置-接口需求清单.md#help-api-01) | PRD 7 | [HELP-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-help-01) | 1050=2026-08-06T10:00Z；1048=同；1052=同；1054=同 |

## 27. 字段治理确认清单

1. 后端评审逐字段回填正式 table/column、nullable/default/index、owner 与 migration 方式。
2. 对 existing／extension 类型保留原型证据，但正式 DB 名称未确认前不得据此直接建 migration。
3. 实作时强制 tenant scope、稳定 componentId、UTC 保存、IANA 时区显示与 BCP 47 语言代码。
4. 发布、定时发布计划、回滚、下派与同步的 operationId、ETag／updateTime、唯一索引及审计必须同一事务或可靠 outbox。
