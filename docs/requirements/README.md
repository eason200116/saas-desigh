# 需求包目录

本目录按需求包管理前期需求。每个需求包必须能独立评审、独立排期、独立交付。

命名规则：

```text
REQ-三位编号-英文短名
```

示例：

```text
REQ-001-market-template-config
REQ-002-domain-channel-binding
REQ-003-merchant-team-permission
```

标准文件：

- `00-brief.md`：背景、目标、范围、非目标。
- `01-capability-spec.md`：能力定义、参与方、使用场景。
- `02-business-rules.md`：业务规则、状态、异常。
- `03-flows.md`：主流程、分支流程、失败流程。
- `04-screens.md`：页面、字段、控件、交互状态。
- `05-data-permission.md`：数据归属、隔离、权限、审计。
- `06-acceptance.md`：验收标准、测试要点、上线检查。
- `99-change-log.md`：需求变更记录。

详细规范见 `docs/standards/product-requirements-file-system.md`。
