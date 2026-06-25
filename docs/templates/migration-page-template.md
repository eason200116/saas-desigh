# MIG-000 迁移单页：<页面名>

> **模板版本 v0.1 · 过程中迭代**：先用起来，每迁一页若发现模板有冗余/缺项，当场改模板（轻量优先，不追求一次到位）。
> **薄模板**：通用交互骨架（筛选区/工具栏/表格/行操作/弹窗/反馈）见 `docs/saas-phase2-feature-spec.html §二 通用交互规范`，本页**只写专属内容，不重复通用部分**。
> 字段对齐规则见 `Ar_V3_LottoPlatformDesign/CLAUDE.md §5.3`；实现走 `list-page` skill；完成后把改动同步到 `Ar_V3_LottoPlatformDesign/docs/migration-changes.md`。

| 项 | 值 |
| --- | --- |
| 状态 | Todo / Doing / Done |
| diff-list 对应 | `migration-diff-list.md` 第 N 项 |
| 差异类型 | 重组 / 重命名 / 增强 / 真·新增（对应 diff-list 的 A/B/C） |
| 源页（SitINR） | 控制器 / 视图，如 `UserManage` / `UserDetaile.cshtml` |
| 目标页（V3） | 路由 + meta.roles，如 `/member/list`，`['admin','tenant']` |

## 1. 源页盘点（SitINR 现状）
- 列字段：
- 搜索项：
- 行操作 / 批量操作：
- 详情 / 弹窗：

## 2. 目标页专属设计（通用骨架之外才写）
- 列字段（对齐源页；新增列用 `src/utils/newMark.ts` 标「新」）：
- 专属搜索项（通用的商户筛选 / 快捷时间不写）：
- 专属行 / 批量操作：
- Tab / 详情弹窗结构（如多 Tab 整合）：

## 3. 差异对照（完成后誊写进 migration-changes.md）
| 维度 | 源页 SitINR | 目标页 V3 | 改动 |
| --- | --- | --- | --- |
| 列 | | | |
| 搜索 | | | |
| 操作 | | | |
| 结构 | | | |
| 字段 | | | |

## 4. 字段对齐自检（CLAUDE.md §5.3）
- [ ] 每个列 `key` 在 mock 每条记录上都有对应字段
- [ ] 详情弹窗读取的嵌套对象（`row.bankCardDetail` / `row.userInfo` 等）构造完整
- [ ] 状态字段（state/status/type）↔ 字典 id 对得上（缺则补 `src/api/index.ts`）
- [ ] 全局 hook（useTenantOptions / useUser / useDictionary）override 齐（避免 load 死循环）

## 5. 验收
- AC-001：
- AC-002：
- [ ] `pnpm build` 通过（红线底线）

## 6. Open Questions
| 编号 | 问题 | 阻塞级 | 建议 |
| --- | --- | --- | --- |
| OPEN-001 | | Blocks / Non-blocking | |
