# 产品前期需求文件体系规范

更新时间：2026-04-30

## 1. 目标

这套规范用于约束产品进入原型、评审和开发前的需求文件组织方式，避免把讨论记录、结论、原型和实现细节混在一个大文档里。

标准目标：

- 每个需求都能找到明确位置。
- 已拍板规则、待确认问题和临时假设必须分开。
- 业务规则、页面交互、权限、数据边界和验收标准必须可追踪。
- 原型只能承载交互表达，不能替代规则文档。
- 后续开发前可以直接从需求包进入 SRS、任务拆分和测试用例。

## 2. 总目录标准

```text
docs/
  product/                         # 项目级产品上下文，长期稳定
    README.md
    00-product-context.md           # 产品背景、目标用户、业务边界
    01-glossary.md                  # 统一名词表
    02-domain-model.md              # 核心对象、关系、生命周期
    03-global-business-rules.md     # 全局业务规则与不变量
    04-permission-model.md          # 角色、数据范围、动作边界
    05-decision-log.md              # 已拍板决策记录
    06-open-questions.md            # 跨需求未决问题

  requirements/                    # 单个需求包，按编号归档
    README.md
    REQ-001-example-capability/
      00-brief.md                   # 背景、目标、范围、非目标
      01-capability-spec.md         # 能力定义、参与方、使用场景
      02-business-rules.md          # 业务规则、状态、异常
      03-flows.md                   # 主流程、分支流程、失败流程
      04-screens.md                 # 页面、组件、字段、交互状态
      05-data-permission.md         # 数据归属、隔离、权限、审计
      06-acceptance.md              # 验收标准、测试要点、上线检查
      99-change-log.md              # 需求变更记录

  standards/                       # 文档体系、命名、评审规范
    product-requirements-file-system.md

  templates/                       # 可复制模板
    requirement-package-template.md

prototypes/                        # 可打开的 HTML 原型
  REQ-001-example-capability.html
```

说明：不是每个早期想法都必须一次性写满全部文件。可以先写 `00-brief.md`，但进入原型评审前必须补齐规则、流程和页面说明；进入开发前必须补齐数据、权限和验收标准。

## 3. 文档层级

### 3.1 项目级产品上下文

项目级文档只写长期稳定的共识，不写某个页面的临时方案。

应该放入 `docs/product/`：

- 产品定位、业务范围、当前阶段目标。
- 核心对象：平台、商户、品牌、市场模板、域名、渠道、玩家、员工、代理等。
- 全局不变量：品牌隔离、币种规则、来源归因规则、权限模型等。
- 统一名词解释。
- 跨多个需求都必须遵守的权限、数据、审计规则。

不应该放入 `docs/product/`：

- 某个按钮怎么交互。
- 某个页面某次评审的临时改法。
- 尚未确认的猜测，除非明确标记为待确认。

### 3.2 需求包

每个可独立评审、独立排期、独立交付的能力都必须建立一个需求包。

命名规则：

```text
docs/requirements/REQ-三位编号-英文短名/
```

示例：

```text
docs/requirements/REQ-001-merchant-brand-market/
docs/requirements/REQ-002-market-template-config/
docs/requirements/REQ-003-channel-domain-binding/
```

一个需求包只解决一个能力边界。如果一个需求同时改变多个核心对象、多个后台端或多个数据归属边界，应拆成多个需求包，再用上层 brief 说明关联关系。

### 3.3 原型

原型放在 `prototypes/`，文件名必须能回溯到需求包。

推荐命名：

```text
prototypes/REQ-002-market-template-config.html
```

当前已有历史原型可以保留现名，但新增原型必须按需求编号命名。

原型职责：

- 展示页面布局、用户路径、控件状态和交互反馈。
- 辅助评审复杂规则的可用性。

原型不负责：

- 承载唯一业务规则来源。
- 替代权限矩阵、数据规则、验收标准。
- 记录所有决策历史。

## 4. 单个需求包文件职责

### 00-brief.md

用于判断这个需求是否值得继续设计。

必须包含：

- 背景和问题。
- 目标用户或操作角色。
- 业务目标。
- 范围。
- 非目标。
- 已知约束。
- 成功标准。

### 01-capability-spec.md

用于把“想做什么”变成“系统新增什么能力”。

必须包含：

- 能力一句话定义。
- 参与方。
- 使用场景。
- 涉及端：平台端、商户端、会员端、代理端。
- 上游依赖。
- 下游影响。
- 是否影响已有数据、权限、报表或结算。

### 02-business-rules.md

用于沉淀真正的产品规则。

规则写法：

```text
BR-001：一个品牌整个生命周期只能绑定一个经营币种。
状态：Approved
原因：避免历史金额、报表和钱包数据因币种切换失真。
影响：品牌创建、市场模板、报表、钱包、活动、VIP。
```

必须包含：

- 业务规则。
- 状态流转。
- 异常状态。
- 边界条件。
- 历史数据是否追溯。
- 冲突规则和优先级。

### 03-flows.md

用于描述用户、系统和数据的过程。

每条流程必须包含：

- 触发条件。
- 前置条件。
- 主流程。
- 分支流程。
- 失败处理。
- 结束状态。
- 是否产生历史快照或审计日志。

### 04-screens.md

用于约束页面和交互，不把页面细节散落在聊天记录里。

必须包含：

- 页面清单。
- 页面入口。
- 页面目标。
- 字段和控件。
- 列表列定义。
- 筛选器。
- 空状态、禁用状态、错误状态。
- 批量操作规则。
- 与原型文件的对应关系。

### 05-data-permission.md

用于确保需求不会绕过核心数据边界。

必须包含：

- 数据归属对象。
- 数据隔离维度。
- 可见范围。
- 可操作范围。
- 角色权限。
- 审计字段。
- 历史快照。
- 报表口径。

### 06-acceptance.md

用于从产品需求直接推导测试和验收。

必须包含：

- 功能验收标准。
- 规则验收标准。
- 权限验收标准。
- 异常场景。
- 数据一致性检查。
- 原型评审结论。
- 开发前是否 Ready。

### 99-change-log.md

用于记录需求变更，不把变更藏在正文里。

格式：

```text
2026-04-30
- 变更：市场模板从“可跨市场批量编辑”调整为“必须单市场编辑”。
- 原因：避免一个提交同时写入多个币种市场模板。
- 影响文件：02-business-rules.md、04-screens.md、prototypes/REQ-xxx.html
- 决策人：产品 / 业务负责人
```

## 5. 状态标准

每份需求包必须有状态。

可用状态：

- `Draft`：正在整理，不能进入原型评审。
- `Reviewing`：可评审，但存在未决问题。
- `Approved for Prototype`：规则基本确定，可以做原型。
- `Approved for Development`：可进入开发拆分。
- `Blocked`：被外部问题阻塞。
- `Deprecated`：废弃，仅保留历史。

进入 `Approved for Prototype` 的最低要求：

- brief 目标和非目标明确。
- 核心对象和业务规则明确。
- 主流程和异常流程明确。
- 页面范围明确。
- 未决问题不影响原型表达。

进入 `Approved for Development` 的最低要求：

- 规则、流程、页面、数据、权限和验收标准完整。
- 所有阻塞级 open questions 已关闭。
- 原型已评审并记录结论。
- 不存在“开发时再定”的核心规则。

## 6. 编号标准

需求包编号：

```text
REQ-001
REQ-002
REQ-003
```

规则编号：

```text
BR-001   # Business Rule
FR-001   # Functional Requirement
UX-001   # Interaction / Screen Requirement
DATA-001 # Data Requirement
PERM-001 # Permission Requirement
NFR-001  # Non-functional Requirement
OPEN-001 # Open Question
```

编号只新增，不复用。规则删除后保留编号，并标记 `Deprecated`。

## 7. 决策和未决问题

已拍板内容必须进入对应规则或 decision log。未拍板内容必须进入 open questions，不能混在正文里写成确定语气。

Open question 格式：

```text
OPEN-001
问题：多市场模板是否允许跨市场复制参数？
状态：Open
阻塞级别：Blocks Development
负责人：产品负责人
建议：允许复制为草稿，但提交必须单市场确认。
```

阻塞级别：

- `Blocks Prototype`：不解决无法画原型。
- `Blocks Development`：可以画原型，但不能开发。
- `Non-blocking`：可后续补充。

## 8. 评审流程

标准流程：

```text
Idea / 业务讨论
  -> 00-brief.md
  -> 01-capability-spec.md
  -> 02-business-rules.md + 03-flows.md
  -> 04-screens.md + prototype
  -> 05-data-permission.md
  -> 06-acceptance.md
  -> Approved for Development
```

评审必须按顺序看：

1. 目标是否成立。
2. 范围和非目标是否明确。
3. 核心规则是否有冲突。
4. 数据和权限边界是否可靠。
5. 页面交互是否服务规则，而不是反过来让规则迁就页面。
6. 验收标准是否能直接测试。

## 9. 写作规则

必须：

- 用确定语气写已拍板规则。
- 用 `OPEN-xxx` 写未决问题。
- 每条规则能追溯到影响对象。
- 同一概念只在一个地方定义，其他地方引用。
- 变更必须写入 change log。

禁止：

- 用聊天记录替代需求文档。
- 把“我觉得”“应该可能”写进规则正文。
- 在原型里藏业务规则。
- 多个需求混在一个无编号文档里。
- 已废弃结论不标记，直接覆盖旧文本。

## 10. 当前项目落地方式

当前项目已有文件暂时不强行拆分，后续新增需求必须按本规范建立需求包。

当前文件定位：

- `docs/v2-core-flows.html`：现阶段主体系说明，后续应逐步拆出项目级产品上下文。
- `docs/handoff.md`：阶段交接摘要，只记录当前最新共识，不作为完整需求源。
- `prototypes/vip-config-center.html`：VIP 配置中心历史原型。
- `prototypes/risk-config-center.html`：风控配置中心历史原型。

下一步建议：

1. 建立 `docs/product/00-product-context.md`，把当前包网主骨架沉淀为项目级上下文。
2. 将“市场模板配置”拆成第一个正式需求包：`REQ-001-market-template-config`。
3. 将“域名与渠道绑定”拆成第二个正式需求包：`REQ-002-domain-channel-binding`。
4. 后续所有原型按 `REQ-xxx` 命名并关联需求包。
