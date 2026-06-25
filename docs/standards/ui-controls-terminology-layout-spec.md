# 控件 / 名词 / 排版规范 · SaaS 后台（基于 V3 目标站）

> 适用：`saas-desigh/prototypes/` 下原型，以及 V3 目标站（`Ar_V3_LottoPlatformDesign`，端口 3100）页面开发、迁移、评审。
> 依据：V3 实测代码（`ProComponents` / `TableRenders` / `useTenantOptions` / `api/index.ts` 字典）+ 个人规则 R16/R20/R21 + 项目 `CLAUDE.md`。
> 维护时间：2026-06-22。
> **与 `prototype-design-spec.md` 的关系**：后者定**颜色 / 字体 / 圆角 / 视觉 token / 布局骨架**（见其 §4）；**本文不重复**，只定**控件清单 / 名词术语表 / 排版细则**，两文配套。冲突项以本文（代码实测）为准。

---

## 0. 一句话总览

- **控件**：优先用自研 `ProComponents`（高级）→ 共享业务组件 → 最后才裸用 Naive UI；表单字段统一走 `ProField` 的 `valueType`，表格列统一走 `TableRenders` 渲染器。
- **名词**：同一概念全站一个叫法；商户显示 `(商户号)商户名`、「端」一律叫「设备」、状态文案以 `api/index.ts` 字典为唯一来源。
- **排版**：列表页骨架固定（筛选区→工具栏→表格→分页）；操作列永远最后一列且右侧冻结；列内容默认居中；导出按钮按条件出现。

---

## 一、控件规范（Controls）

### 1.1 控件分层（红线：自上而下优先）

| 层级 | 范围 | 取用原则 |
|---|---|---|
| ① 高级控件 | `src/components/ProComponents/`（ProCrudTable 等） | **列表 / 表单页主力，首选** |
| ② 共享业务组件 | `src/components/`（DictSelect、TableRenders 等） | 业务语义封装，次选 |
| ③ Naive UI 底层 | `naive-ui`（NInput / NTag / NModal…） | 仅在前两层无对应时使用，**不裸用做表单字段** |

> 控件与名词不一致时**先问、不擅自新造**（呼应 `prototype-design-spec.md` §2.2）。

### 1.2 ProComponents 高级控件清单

| 控件 | 用途 | 何时用 |
|---|---|---|
| `ProCrudTable` | 搜索 + 表格 + 分页 + 操作列一体 | **列表页主力**，标杆页 `src/views/finance/rechargeOrder/thirdPartyPending/` |
| `ProDataTable` | 纯数据表格（无内置搜索） | 详情子表 / 汇总表 |
| `ProSearchForm` | 搜索表单（可收起 / 高级筛选） | 通常由 ProCrudTable 内置，单独用于复杂筛选 |
| `ProForm` | 通用表单 | 新增 / 编辑弹窗 |
| `ProField` | 表单字段统一封装（见 1.3） | 一切表单 / 搜索字段 |
| `ProDateRangePicker` | 日期范围（带快捷项） | 时间筛选 |
| `ProEditDataTable` | 行内可编辑表格 | 批量配置 / 数组项增删改 |
| `ProTabs` | 多 Tab 容器 | 散页聚合（财务 / 会员 / 游戏） |
| `ProFullscreenModal` | 全屏 / 详情弹窗（`useProDetailModal`） | 复杂详情查看 |

> 详细 props 见 `src/components/ProComponents/types/`，对比说明见 `ProComponents/COMPARISON.md`。

### 1.3 ProField `valueType` 全表（共 34 种）

表单 / 搜索字段**统一用 `valueType` 声明**，由 `ProField` 自动选底层组件，不手写 Naive 组件。来源 `types/common.ts:31-65`、`types/field.ts`（`VALUE_TYPE_COMPONENT_MAP`）。

| 分组 | valueType | 底层组件 |
|---|---|---|
| 文本 / 数值（4） | `text` `password` `textarea` | NInput（文本 / 密码 / 多行） |
| | `number` | NInputNumber |
| 选择（7） | `select` `multiSelect` | NSelect（单 / 多选） |
| | `tenantSelect` | ProTenantSelect（商户选择） |
| | `dictSelect` | DictSelect（字典选择） |
| | `cascader` `cascadeSelect` `treeSelect` | NCascader / ProCascadeSelect / NTreeSelect |
| 日期时间（10） | `date` `dateRange` `datetime` `datetimeRange` `week` `month` `year` `quarter` | NDatePicker |
| | `time` `timeRange` | NTimePicker |
| 勾选 / 开关（5） | `checkbox` `checkboxGroup` `radio` `radioGroup` | NCheckbox(Group) / NRadio(Group) |
| | `switch` | NSwitch |
| 其它 / 增强（8） | `upload` `slider` `rate` `color` `custom` | NUpload / NSlider / NRate / NColorPicker / 自定义 |
| | `proDateRange` `proSelectDateRange` | ProDateRangeInput（含快捷项）/ ProSelectDateRange |
| | `numberRange` | ProNumberRange（数值区间） |

> options 必须用**函数形式** `componentProps: () => ({ options: xxx.value })`，避免响应式失效（见 `CLAUDE.md` §9.1）。

### 1.4 表格列渲染器（`TableRenders`，共 12 个）

表格列统一用以下渲染器，不手写 `h('a', {...})` / 手填颜色。来源 `src/components/TableRenders/index.ts`。

| 渲染器 | 用途 |
|---|---|
| `renderStatusTag(value, options)` | 枚举值→**五色封闭**状态标签（不手写颜色） |
| `renderTenantTag(idOrName, name?)` | 商户 / 集团标签，输出 `(商户号)商户名` |
| `renderOrgTag(orgId)` | 集团名称标签 |
| `renderMemberIdLink(memberId, tenantId, onClick)` | 会员 ID 蓝色可点击链接（开详情） |
| `renderTag` / `renderTagList` | 单个 / 多个文本标签（`auto` 轮换色） |
| `renderBoolTag(value)` | 布尔→是 / 否标签 |
| `renderSummaryAmount` / `renderSignedAmount` | 汇总行金额（加粗 / 正负号配色） |
| `renderRichText(value)` | 富文本 / HTML 编码文本（消毒 + 多行省略） |
| `renderDateTime(value)` | 日期时间格式化 |
| `renderIPLink(ip)` | IP 可点击链接 |

> 红线：状态用 `renderStatusTag`、商户用 `renderTenantTag`、会员 ID 用 `renderMemberIdLink`、集团用 `renderOrgTag`。

### 1.5 操作列工厂 `createActionColumn`

来源 `src/components/Table/src/createActionColumn.ts`。主操作直显为蓝色文字链接，多操作收进 `dropdownActions`。

```ts
const actionColumn = createActionColumn<Row>(() => ({
  width: 150,
  actions: [
    { label: '编辑', type: 'primary', onClick: handleEdit, auth: ['User:Update'] },
    { label: '删除', type: 'delete', onClick: handleDelete,   // delete 自动二次确认
      show: (row) => row.status !== 'archived' },
  ],
  dropdownActions: [{ label: '重置密码', onClick: handleReset }],
}));
```

字段：`label` / `onClick` / `auth`(权限码) / `type`(`delete`含确认) / `show`(按行显隐) / `color` / `disabled`(按行禁用)。

### 1.6 共享业务控件

| 控件 | 用途 |
|---|---|
| `DictSelect` | 字典下拉（`source: common / group`） |
| `MerchantFilterSelect` | 商户多选筛选（顶部固定「全部」、与具体商户互斥） |
| `ProTenantSelect` | 单商户选择器（表单 / 搜索 `tenantSelect`） |
| `ConfirmSwitch` | **危险开关二次确认**（启/禁用、拉黑等） |
| `CopyText` | 可复制文本（订单号 / token） |
| `RoleSwitcher` | 右下角总控 / 商户角色切换浮窗 |
| `CountTo` / `DateTime` | 数字滚动 / 日期时间展示 |

> 危险操作（删除 / 冻结 / 批量资金处置 / 发布）必须二次确认（`ConfirmSwitch` / `Popconfirm`），呼应 `prototype-design-spec.md` §2/§6。

---

## 二、名词术语表（Terminology）

### 2.1 角色

| 代码值 | 中文称谓 | 说明 |
|---|---|---|
| `admin` | **总控端** | 平台超管，`isSuperAuthUser` |
| `tenant` | **商户端** | 商户视角，默认角色 |

来源 `src/config/runtime.ts`、`src/store/modules/role.ts`。

### 2.2 商户 / 集团展示

**统一格式：`(商户号)商户名`**，例 `(1050)daman`（**ID 在前、括号内**）。由 `formatTenantLabel`（`src/hooks/useTenantOptions.ts:409-428`）/ `renderTenantTag` 统一输出：

```
同时有 id 和名称 → (id)name      只有名称 → name
只有 id          → id            都没有   → fallback('-')
```

- **集团 = org**（`orgId` / `orgName`）；商户 = tenant（`tenantId` / `tenantName`）。
- 商户主数据**三处必须同步**，否则名称解析不全显示「裸商户号」：
  1. `src/store/modules/user.ts` 的 `orgList` / `tenantList`
  2. `src/components/DictSelect/data.ts` 的 `TENANT_LIST`
  3. `src/api/index.ts` 的 `TENANT_ORG_SELECT_LIST`（总控 `organizationGetSelectList`）

### 2.3 设备 / 端（R20）

**「端」一律称「设备」**。标准 **7 种设备**（业务术语，权威）：

`H5` / `PC` / `安卓原生` / `iOS原生` / `安卓壳包` / `iOS壳包` / `PWA`

代码现有两套表示（**与 7 种标准存在差异，需注意**）：

| 来源 | 取值 | 覆盖 |
|---|---|---|
| `src/hooks/useClientType.ts` | `web` / `h5` / `ios` / `android` / `app` / `public`（6 项） | `app` 把安卓壳包 + iOS壳包合并，未拆分 |
| `api/index.ts` `phoneTypeList` | `Android` / `iOS` / `PC`（3 项） | 「注册设备」搜索用，粒度更粗 |

> 落地建议：文案展示按 7 种标准；新功能若需区分壳包，应在 `useClientType` 拆出 `androidApp` / `iosApp`。

### 2.4 状态字典目录（文案唯一来源）

状态 / 类型文案集中维护，**不在页面里手写**。来源：`src/api/index.ts`（`V1_DICTIONARY` 行 23-103 / `COMMON_DICTIONARY` 行 106-263）+ `src/components/DictSelect/data.ts`（`FULL_DICT`，动态字典）。常用抽样：

| 字典 key | id→label |
|---|---|
| `rechargeStateList` 充值状态 | 0 待支付 / 1 已支付 / 2 已取消 / 3 已退款 |
| `withdrawStateList` 提现状态 | 0 待审核 / 1 已通过 / 2 已拒绝 / 3 已提交 / 4 出款中 / 5 出款成功 / 6 出款失败 |
| `gameOrderStateList` 彩票订单 | 0 待开奖 / 1 已中奖 / 2 未中奖 / 3 已撤单 |
| `orderStatusList` 游戏订单 | 0 未结算 / 1 已结算 / 2 已取消 |
| `financialTypeList` 账变类型 | 1 充值 / 2 提现 / 3 游戏投注 / 4 游戏派彩 / 5 人工调整 |
| `agentTypeList` 代理模式 | 0 非代理 / 1 流水返佣 / 2 盈亏返利 |
| `blockStateList` 黑名单 | 0 正常 / 1 已拉黑 |
| `userStateList` / `enableStateList` 启停 | 0 禁用 / 1 启用 |
| `tenantStateList` 商户状态 | 0 禁用 / 1 正常 / 2 维护中 |
| `siteBuildStatusList` 建站 | 0 配置中 / 1 已上线 |

> **缺项症状**：状态列显示原始数字 / 下拉为空 / 列显示 `--`。**修复**：在对应字典常量加 key（见 `CLAUDE.md` §七），不在页面 data.ts 硬编码。

### 2.5 领域名词（统一中文称谓，避免同义混用）

| 字段 | 标准称谓 | 字段 | 标准称谓 |
|---|---|---|---|
| `amount` | 金额 | `account` | 会员账号 |
| `balance` | 余额 | `memberId` / `userId` | 会员ID |
| `orderNo` | 订单号 | `betAmount` | 投注金额 |
| `orgId` / `orgName` | 集团 | `validBet` / 打码 | 打码量 |
| `tenantId` / `tenantName` | 商户 | `rebate` | 返佣 |
| `createTime` | 创建时间 | `updateTime` | 更新时间 |

### 2.6 货币与时间

- **货币** `currencyList`（`api/index.ts:232-251`）：INR `₹` / BRL `R$` / VND `₫` / THB `฿` / MYR `RM` / PKR `₨` / USD `$` / USDT `$`。数据层存数值，货币符号在渲染层加。
- **时间**：统一 `YYYY-MM-DD HH:mm:ss`；按商户时区显示（`useTenantOptions().formatTenantDateTime`）。

### 2.7 命名一致性红线

同一概念全站**只能一个叫法**（如内部 = 盈亏返利、外部 = 流水返佣，全站统一）。新名词先查本表与字典，无对应再问、不擅造。

---

## 三、排版规范（Layout）

### 3.1 标准列表页骨架

```
┌─ 筛选区（白卡·网格·商户必填红星·右侧 搜索/重置/收起/自定义列）─┐
├─ 工具栏（新增 / 批量操作条 / 导出[按条件]）────────────────────┤
├─ 表格（蓝灰表头·内容居中·操作列蓝链接固定右侧）─────────────────┤
└─ 底部分页（默认20条/页）+ 页面合计 / 总计 行 ──────────────────┘
```

页面两件套：`src/views/<模块>/<页>/index.vue` + `data.ts`。详见 `list-page` skill、标杆页 `src/views/finance/rechargeOrder/thirdPartyPending/`。

### 3.2 操作列（反复改错过，固化为硬规则）

**永远最后一列 + 右侧冻结**，横版 / 竖版都冻结。实证 `src/views/member/user/useUserPage.ts:948-965`：

```ts
{
  key: 'operations',
  title: t('components.proCrudTable.action'),
  titleAlign: 'center',
  fixed: 'right',        // 横向滚动始终可见
  lockFixed: true,       // 自定义列里不可取消冻结/拖拽，仅可显隐
  order: 9999,           // 兜底排到最后
  export: false,         // 不进导出
  width: vertical ? 130 : 230,
}
```

### 3.3 列内容对齐（R16）

数据列默认 `align: 'center'`，例外须注明。操作列按钮左排（`align:'left'`）但标题居中（`titleAlign:'center'`）。

### 3.4 自定义列

所有列表页统一支持列显隐。`useColumnSetting` 按 `tableId` 重建；标 `lockFixed: true` 的列**只可显隐、不可拖拽 / 不可取消冻结**。布局（横 / 竖版）切换后列设置会重建，确认操作列仍在末位且冻结。

### 3.5 导出按钮（R21）

**仅「报表类页面 或 列数 > 20」才放导出**，其余一律不放。

### 3.6 分页 / keepAlive

- 默认 `pageSize: 20`；payload 形如 `{ list, total, totalCount, pageNo, pageSize }`。
- **列表页** `meta.keepAlive: true`（保留滚动 / 筛选）；**详情 / 表单页不加**（避免脏数据）。

### 3.7 校验红框

保存 / 发布校验失败**必须红框标出错误字段，并指名「哪个配错」**。行内表格用 `InlineNumberCell` 的 `invalid` / `errorTip`；表单用 Naive `NForm.validate()` + 必填红星 `showRequireMark`。

### 3.8 筛选区

白底卡片 + 网格布局；**商户为必填带红星**；右侧依次「搜索（蓝）」「重置（白）」「收起」「自定义列」。快捷时间固定 7 项：今天 / 昨天 / 本周 / 上周 / 本月 / 上月 / 所有（呼应 `prototype-design-spec.md` §3/§5）。

---

## 四、维护与同步

- **R34 双向同步（硬门禁）**：V3 控件 / 名词 / 排版行为变更 → 回填本文；本文规则调整 → 反向核对 V3 原型。未同步 = 不算完成。
- **颜色 / 视觉 token** 一律见 `prototype-design-spec.md` §4，本文不复写。

### 关键代码文件索引（溯源）

| 主题 | 文件 |
|---|---|
| 高级控件类型 | `src/components/ProComponents/types/{common,field,dataTable,searchForm,form}.ts` |
| 控件对比说明 | `src/components/ProComponents/COMPARISON.md` |
| 表格渲染器 | `src/components/TableRenders/index.ts`（12 个 render） |
| 操作列工厂 | `src/components/Table/src/createActionColumn.ts` |
| 商户格式化 | `src/hooks/useTenantOptions.ts`（`formatTenantLabel`） |
| 设备 / 端 | `src/hooks/useClientType.ts` |
| 状态字典 | `src/api/index.ts`（`V1_DICTIONARY` / `COMMON_DICTIONARY`）、`src/components/DictSelect/data.ts`（`FULL_DICT`） |
| 列表页规范 | `list-page` skill、标杆页 `src/views/finance/rechargeOrder/thirdPartyPending/` |
| 视觉 token | `saas-desigh/docs/standards/prototype-design-spec.md` §4 |
