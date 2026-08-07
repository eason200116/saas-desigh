# AR 前端自定义配置－接口需求清单

> 文件版本：V1.0｜基准：PRD V1.0｜用途：接口评审、前后端契约确认与 UAT 追溯。原型不依赖本清单任何正式接口。

## 1. 使用边界与分类

- 本文件只记接口需求与工程契约，不重述产品规则；「对应功能点编号」点击后回到完整 PRD 的已定案章节。
- 类型只允许「新增接口／使用既有接口／既有接口扩充」三选一。「待后端确认」是开发状态，可与三种类型重叠。
- 原型 data layer、localStorage 与 `/__local-api` 只作 Mock 形状证据，不等于正式 endpoint。无正式证据时不得标为可直接使用。
- 原型 UI 不展示 method、path、Mock、接口状态、内部错误码或工程字样；前端只展示业务原因与下一步。
- 字段定义集中于 [字段表](./AR前端自定义配置-字段表.md)；本清单只引用实体 ID。UAT 互引见 [可执行验收矩阵](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)。

## 2. 数量摘要

| 总数 | 新增接口 | 使用既有接口 | 既有接口扩充 | 开发状态含「待后端确认」 |
|---:|---:|---:|---:|---:|
| 36 | 17 | 3 | 16 | 34 |

## 3. 现有证据索引

| 证据 | 能力 | 只读盘点结果 |
|---|---|---|
| E-01 | 双端 API 边界 | `C/src/api/index.ts:2-3`、`M/src/api/index.ts:2-3` 明示原型只用页面本机 `data.ts`，不是正式 HTTP 证据。 |
| E-02 | 总控版面数据层 | `C/src/views/tenant/templateLibrary/data.ts:20,480,524,622,638,656,674-681`；列表、建立、商户／域名更新均读写 localStorage。 |
| E-03 | 总控版面保存／域名绑定 | `C/src/views/config/frontendCustom/templateLibraryData.ts:84,342-365,461,553`；目标规格只允许读取唯一当前绑定，并以独立解除、独立绑定两个操作维护关系。 |
| E-04 | 原型四商户 | `C/src/config/prototypeAcceptanceScenario.ts:1,63-114`、`M/src/config/prototypeAcceptanceScenario.ts:1,72-89`。 |
| E-05 | 域名与语言数据层 | `C/src/views/operations/domainMgmt/data.ts:49,109`、`C/src/views/operations/languageConfig/data.ts:34`；均为本机假数据。 |
| E-06 | 游戏数据层 | `C/src/views/game/platform/data.ts:6,253,417`、`.../merchant/category/data.ts:59,135-136`、`.../merchant/subgame/data.ts:36,331,542`、`.../merchant/game/data.ts:5,292,520`。 |
| E-07 | 本机游戏授权快照 | `C/src/views/config/frontendCustom/localGameAuthorization.ts:208,295` 使用 `/__local-api/.../published`；只能作 Mock 形状证据。 |
| E-08 | V3 权限载荷 | `C/src/views/tenant/templateLibrary/layoutPermissions.ts:6,25-42`；`M/src/views/config/frontendCustom/tenantLayoutPermissions.ts:5,24-25`，沿用 `hasPermission`／`info.menus`。 |
| E-09 | 功能说明书 | 双端 `src/components/PageManual/manuals/_registry.ts:1,6,23`，以 `import.meta.glob` 与 `getManual` 直接加载页面说明。 |

## 4. 总控端

### 模板／版面查询

#### ADM-API-01｜模板／版面列表

| 项目 | 契约记录 |
|---|---|
| 接口编号 | ADM-API-01 |
| 功能模块 | 总控端／模板／版面查询 |
| 使用页面／操作 | 模板库、版面列表／模板／版面列表 |
| 接口用途与触发时机 | 查询模板／主题引用与总控版面配置状态、发布时间。 触发：进页、搜索、筛选、分页、刷新。 |
| 类型（三选一） | 既有接口扩充 |
| 既有能力／可直接使用／缺少字段 | 原型数据层 `api.templateLibrary.getPageList`（E-02）；可沿用列表查询形状，缺正式 endpoint、配置状态／发布时间正规字段与 serverTime。 |
| 建议 method／path | GET `/v3/frontend-layouts/admin/layouts` |
| 请求字段 | keyword、templateId、themeId、configurationStatus、pageNo、pageSize |
| 回应字段 | items、total、configurationStatus、publishedAt、templateId、themeId、updateTime |
| 关键 ID | tenantId、layoutId；按模块另含 domainId／languageCode／componentId／gameId。 |
| 对应字段实体 | ENT-TPL、ENT-LAY |
| 权限点 | 版面查看 |
| 幂等键 | GET；不需幂等键 |
| 并发控制 | 读取回 ETag／updateTime |
| 错误码与前端提示 | 400 验证失败、403 无权限、404 对象不存在、409 版本冲突、422 业务阻挡、503 暂不可用；前端只显示业务原因与下一步。 |
| 数据来源 | 依 PRD 权威数据源；不得以前一租户缓存兜底。 |
| 同步方向／线上影响 | 成功写入产生同步事件；其他已开启页面 3 秒内更新。 线上影响：否；只有成功发布、取消下派安全回退或成功回滚会改变线上内容。 |
| 原型 Mock／四商户 | prototypeAcceptanceScenario；ready/loading/empty/error/stale。 1050 草稿／定时发布计划／三语；1048 停用／自动回滚；1052 未下派；1054 已配置／未配置／停用。 |
| 依赖／风险 | V3 登录会话、商户授权与三个基础权限；正式 API gateway 契约待确认。 风险：现有原型本机状态不能证明跨端口一致、幂等或并发安全。 |
| 开发状态 | 待后端确认正式 endpoint 与分页字段 |
| 验收案例编号 | [T1048-02](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[A-02](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability) |
| 对应功能点编号 | [ADM-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-adm-01) |

#### ADM-API-02｜版面详情

| 项目 | 契约记录 |
|---|---|
| 接口编号 | ADM-API-02 |
| 功能模块 | 总控端／模板／版面查询 |
| 使用页面／操作 | 总控版面详情／编辑／版面详情 |
| 接口用途与触发时机 | 取得模板、主题、导航、分类、区块及英文基准，供只读或编辑。 触发：开启详情、重新加载、冲突后重载。 |
| 类型（三选一） | 既有接口扩充 |
| 既有能力／可直接使用／缺少字段 | 原型版面记录与 localStorage（E-02、E-03）；缺正式详情 endpoint、稳定 componentId 约束与 ETag。 |
| 建议 method／path | GET `/v3/frontend-layouts/admin/layouts/{layoutId}` |
| 请求字段 | path layoutId；可选 tenantContext 仅供下派预览，不作授权 |
| 回应字段 | layout、template、theme、navigation[]、categories[]、blocks[]、allowedGamePool、ETag |
| 关键 ID | tenantId、layoutId；按模块另含 domainId／languageCode／componentId／gameId。 |
| 对应字段实体 | ENT-LAY、ENT-NAV、ENT-CAT、ENT-BLK |
| 权限点 | 版面查看 |
| 幂等键 | GET |
| 并发控制 | 回 ETag、updateTime |
| 错误码与前端提示 | 400 验证失败、403 无权限、404 对象不存在、409 版本冲突、422 业务阻挡、503 暂不可用；前端只显示业务原因与下一步。 |
| 数据来源 | 依 PRD 权威数据源；不得以前一租户缓存兜底。 |
| 同步方向／线上影响 | 成功写入产生同步事件；其他已开启页面 3 秒内更新。 线上影响：否；只有成功发布、取消下派安全回退或成功回滚会改变线上内容。 |
| 原型 Mock／四商户 | prototypeAcceptanceScenario；ready/loading/empty/error/stale。 1050 草稿／定时发布计划／三语；1048 停用／自动回滚；1052 未下派；1054 已配置／未配置／停用。 |
| 依赖／风险 | V3 登录会话、商户授权与三个基础权限；正式 API gateway 契约待确认。 风险：现有原型本机状态不能证明跨端口一致、幂等或并发安全。 |
| 开发状态 | 待后端确认正式 endpoint 与完整结构字段 |
| 验收案例编号 | [A-02](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[A-05](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability) |
| 对应功能点编号 | [ADM-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-adm-02) |

### 草稿／预览／发布

#### ADM-API-03｜保存草稿

| 项目 | 契约记录 |
|---|---|
| 接口编号 | ADM-API-03 |
| 功能模块 | 总控端／草稿／预览／发布 |
| 使用页面／操作 | 总控版面编辑－保存／保存草稿 |
| 接口用途与触发时机 | 保存总控英文基准、结构允许值与主题引用，状态回到 draft。 触发：点击保存；自动保存不在本期契约。 |
| 类型（三选一） | 既有接口扩充 |
| 既有能力／可直接使用／缺少字段 | 原型 `saveDefaultLayoutRecords`／工作流 localStorage（E-03）；缺正式事务、幂等与并发控制。 |
| 建议 method／path | PUT `/v3/frontend-layouts/admin/layouts/{layoutId}/draft` |
| 请求字段 | layoutId、templateId、themeId、content、allowedGamePool、updateTime、operationId |
| 回应字段 | configurationStatus=draft、updateTime、validationWarnings |
| 关键 ID | tenantId、layoutId；按模块另含 domainId／languageCode／componentId／gameId。 |
| 对应字段实体 | ENT-LAY、ENT-DRF、ENT-NAV、ENT-CAT、ENT-BLK |
| 权限点 | 配置管理（依赖版面查看） |
| 幂等键 | 读取不适用；写入以 operationId／Idempotency-Key 去重。 |
| 并发控制 | 写入带 updateTime 或 ETag；冲突回 409 并要求重载。 |
| 错误码与前端提示 | 400 验证失败、403 无权限、404 对象不存在、409 版本冲突、422 业务阻挡、503 暂不可用；前端只显示业务原因与下一步。 |
| 数据来源 | 依 PRD 权威数据源；不得以前一租户缓存兜底。 |
| 同步方向／线上影响 | 成功写入产生同步事件；其他已开启页面 3 秒内更新。 线上影响：否；总控既有线上基准维持不变。 |
| 原型 Mock／四商户 | prototypeAcceptanceScenario；ready/loading/empty/error/stale。 1050 草稿／定时发布计划／三语；1048 停用／自动回滚；1052 未下派；1054 已配置／未配置／停用。 |
| 依赖／风险 | V3 登录会话、商户授权与三个基础权限；正式 API gateway 契约待确认。 风险：现有原型本机状态不能证明跨端口一致、幂等或并发安全。 |
| 开发状态 | 待后端确认正式写入接口 |
| 验收案例编号 | [A-02](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[A-05](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[I-02](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability) |
| 对应功能点编号 | [ADM-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-adm-02) |

#### ADM-API-04｜预览

| 项目 | 契约记录 |
|---|---|
| 接口编号 | ADM-API-04 |
| 功能模块 | 总控端／草稿／预览／发布 |
| 使用页面／操作 | 总控版面编辑－预览／预览 |
| 接口用途与触发时机 | 以未发布草稿产生与正式发布共用渲染组件的设备预览，不写线上。手机固定以 375×812 窗口验收；PC 以 1920 宽度为基准、高度不限制，内容随可用画面宽度自适应。触发：点击预览、切换手机／PC、语言或主域名。 |
| 类型（三选一） | 新增接口 |
| 既有能力／可直接使用／缺少字段 | 未发现可证明正式 HTTP endpoint 的数据；待后端确认。 |
| 建议 method／path | POST `/v3/frontend-layouts/admin/layouts/{layoutId}/preview-sessions` |
| 请求字段 | layoutId、draftUpdateTime、deviceType=mobile\|pc、viewportWidth（mobile=375；pc=1920 基准）、viewportHeight（mobile=812；pc 可空）、languageCode、domainId、operationId |
| 回应字段 | previewToken、previewUrl／renderPayload、expiresAt、configurationStatus=previewed |
| 关键 ID | tenantId、layoutId；按模块另含 domainId／languageCode／componentId／gameId。 |
| 对应字段实体 | ENT-LAY、ENT-DRF |
| 权限点 | 版面查看；若预览会更新 workflowStatus，后端仍须校验配置管理 |
| 幂等键 | 读取不适用；写入以 operationId／Idempotency-Key 去重。 |
| 并发控制 | 写入带 updateTime 或 ETag；冲突回 409 并要求重载。 |
| 错误码与前端提示 | 400 验证失败、403 无权限、404 对象不存在、409 版本冲突、422 业务阻挡、503 暂不可用；前端只显示业务原因与下一步。 |
| 数据来源 | 依 PRD 权威数据源；不得以前一租户缓存兜底。 |
| 同步方向／线上影响 | 成功写入产生同步事件；其他已开启页面 3 秒内更新。 线上影响：否 |
| 原型 Mock／四商户 | prototypeAcceptanceScenario；ready/loading/empty/error/stale。 1050 草稿／定时发布计划／三语；1048 停用／自动回滚；1052 未下派；1054 已配置／未配置／停用。 |
| 依赖／风险 | V3 登录会话、商户授权与三个基础权限；正式 API gateway 契约待确认。 风险：现有原型本机状态不能证明跨端口一致、幂等或并发安全。 |
| 开发状态 | 待后端确认预览 token 与渲染契约 |
| 验收案例编号 | [A-02](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability) |
| 对应功能点编号 | [ADM-03](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-adm-03) |

#### ADM-API-05｜发布总控基准

| 项目 | 契约记录 |
|---|---|
| 接口编号 | ADM-API-05 |
| 功能模块 | 总控端／草稿／预览／发布 |
| 使用页面／操作 | 总控版面编辑－发布／发布总控基准 |
| 接口用途与触发时机 | 将已预览且校验通过的总控版面发布为最新下派保底；已下派商户只更新保底快照，既有商户覆盖内容保持不变。触发：点击发布并确认。 |
| 类型（三选一） | 新增接口 |
| 既有能力／可直接使用／缺少字段 | 未发现可证明正式 HTTP endpoint 的数据；待后端确认。 |
| 建议 method／path | POST `/v3/frontend-layouts/admin/layouts/{layoutId}/publish` |
| 请求字段 | layoutId、draftUpdateTime、operationId |
| 回应字段 | configurationStatus=published、publishedAt、syncOperationId、validationResult |
| 关键 ID | tenantId、layoutId；按模块另含 domainId／languageCode／componentId／gameId。 |
| 对应字段实体 | ENT-LAY、ENT-SYNC、ENT-AUD |
| 权限点 | 发布管理（依赖版面查看） |
| 幂等键 | 读取不适用；写入以 operationId／Idempotency-Key 去重。 |
| 并发控制 | 写入带 updateTime 或 ETag；冲突回 409 并要求重载。 |
| 错误码与前端提示 | 400 验证失败、403 无权限、404 对象不存在、409 版本冲突、422 业务阻挡、503 暂不可用；前端只显示业务原因与下一步。 |
| 数据来源 | 依 PRD 权威数据源；不得以前一租户缓存兜底。 |
| 同步方向／线上影响 | 成功写入产生同步事件；其他已开启页面 3 秒内更新。线上影响：更新已下派商户的保底快照；健康的商户覆盖仍优先且不得被覆盖，覆盖无效时才展示新版保底。 |
| 原型 Mock／四商户 | prototypeAcceptanceScenario；ready/loading/empty/error/stale。 1050 草稿／定时发布计划／三语；1048 停用／自动回滚；1052 未下派；1054 已配置／未配置／停用。 |
| 依赖／风险 | V3 登录会话、商户授权与三个基础权限；正式 API gateway 契约待确认。 风险：现有原型本机状态不能证明跨端口一致、幂等或并发安全。 |
| 开发状态 | 待后端确认发布事务与事件契约 |
| 验收案例编号 | [S-01](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[S-04](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[A-02](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[I-02](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability) |
| 对应功能点编号 | [ADM-04](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-adm-04) |

### 下派管理

#### DSP-API-01｜首次下派

| 项目 | 契约记录 |
|---|---|
| 接口编号 | DSP-API-01 |
| 功能模块 | 总控端／下派管理 |
| 使用页面／操作 | 总控版面列表／下派主域名／首次下派 |
| 接口用途与触发时机 | 把已发布总控版面完整下派给指定商户及有效主域名，建立可直接渲染的保底快照与独立商户覆盖层。保底包含排版、模块展示数量与有效游戏内容。触发：点击下派并提交。 |
| 类型（三选一） | 既有接口扩充 |
| 既有能力／可直接使用／缺少字段 | 原型 `updateMerchants`／`updateDomains`（E-02）只改 localStorage；缺跨端事务与正式 ID。 |
| 建议 method／path | POST `/v3/frontend-layouts/admin/dispatches` |
| 请求字段 | tenantId、adminLayoutId、domainIds[]、operationId |
| 回应字段 | dispatchId、merchantLayoutId、fallbackSnapshotId、fallbackPublishedAt、status、syncOperationId、acceptedAt |
| 关键 ID | tenantId、layoutId；按模块另含 domainId／languageCode／componentId／gameId。 |
| 对应字段实体 | ENT-BND、ENT-SYNC、ENT-LAY |
| 权限点 | 配置管理 |
| 幂等键 | 读取不适用；写入以 operationId／Idempotency-Key 去重。 |
| 并发控制 | 同 tenantId+domainId 使用唯一约束；ETag／first-write-wins |
| 错误码与前端提示 | 400 验证失败、403 无权限、404 对象不存在、409 版本冲突、422 业务阻挡、503 暂不可用；前端只显示业务原因与下一步。 |
| 数据来源 | 依 PRD 权威数据源；不得以前一租户缓存兜底。 |
| 同步方向／线上影响 | 成功写入产生同步事件；其他已开启页面 3 秒内更新。线上影响：保底内容立即具备展示资格；如已有健康商户覆盖，仍以商户覆盖优先。 |
| 原型 Mock／四商户 | prototypeAcceptanceScenario；ready/loading/empty/error/stale。 1050 草稿／定时发布计划／三语；1048 停用／自动回滚；1052 未下派；1054 已配置／未配置／停用。 |
| 依赖／风险 | V3 登录会话、商户授权与三个基础权限；正式 API gateway 契约待确认。 风险：现有原型本机状态不能证明跨端口一致、幂等或并发安全。 |
| 开发状态 | 待后端确认跨端建立工作区契约 |
| 验收案例编号 | [S-02](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[T1052-02](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[D-01](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability) |
| 对应功能点编号 | [DSP-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-dsp-01) |

#### DSP-API-02｜取消下派

| 项目 | 契约记录 |
|---|---|
| 接口编号 | DSP-API-02 |
| 功能模块 | 总控端／下派管理 |
| 使用页面／操作 | 总控版面列表／取消下派／取消下派 |
| 接口用途与触发时机 | 取消既有下派、解除主域名、封锁商户操作并触发平台默认安全回退。 触发：点击取消下派；有待执行定时发布计划时阻挡。 |
| 类型（三选一） | 新增接口 |
| 既有能力／可直接使用／缺少字段 | 未发现可证明正式 HTTP endpoint 的数据；待后端确认。 |
| 建议 method／path | DELETE `/v3/frontend-layouts/admin/dispatches/{dispatchId}` |
| 请求字段 | dispatchId、reason、updateTime、operationId |
| 回应字段 | status=cancelled、unboundDomainIds、fallbackStatus、syncOperationId |
| 关键 ID | tenantId、layoutId；按模块另含 domainId／languageCode／componentId／gameId。 |
| 对应字段实体 | ENT-BND、ENT-SCH、ENT-SYNC、ENT-AUD |
| 权限点 | 配置管理 |
| 幂等键 | 读取不适用；写入以 operationId／Idempotency-Key 去重。 |
| 并发控制 | 写入带 updateTime 或 ETag；冲突回 409 并要求重载。 |
| 错误码与前端提示 | 400 验证失败、403 无权限、404 对象不存在、409 版本冲突、422 业务阻挡、503 暂不可用；前端只显示业务原因与下一步。 |
| 数据来源 | 依 PRD 权威数据源；不得以前一租户缓存兜底。 |
| 同步方向／线上影响 | 成功写入产生同步事件；其他已开启页面 3 秒内更新。 线上影响：是；成功后主域名立即使用平台默认版面。 |
| 原型 Mock／四商户 | prototypeAcceptanceScenario；ready/loading/empty/error/stale。 1050 草稿／定时发布计划／三语；1048 停用／自动回滚；1052 未下派；1054 已配置／未配置／停用。 |
| 依赖／风险 | V3 登录会话、商户授权与三个基础权限；正式 API gateway 契约待确认。 风险：现有原型本机状态不能证明跨端口一致、幂等或并发安全。 |
| 开发状态 | 待后端确认安全回退与审计事务 |
| 验收案例编号 | [S-03](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[A-04](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability) |
| 对应功能点编号 | [DSP-03](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-dsp-03) |

#### DSP-API-03｜重新下派

| 项目 | 契约记录 |
|---|---|
| 接口编号 | DSP-API-03 |
| 功能模块 | 总控端／下派管理 |
| 使用页面／操作 | 总控版面列表／重新下派／重新下派 |
| 接口用途与触发时机 | 以最新已发布总控版面建立新的保底快照与空白商户覆盖层，不恢复先前已取消下派的旧草稿。触发：已取消下派后再次下派。 |
| 类型（三选一） | 新增接口 |
| 既有能力／可直接使用／缺少字段 | 未发现可证明正式 HTTP endpoint 的数据；待后端确认。 |
| 建议 method／path | POST `/v3/frontend-layouts/admin/dispatches/{dispatchId}/redispatch` |
| 请求字段 | previousDispatchId、tenantId、adminLayoutId、domainIds[]、operationId |
| 回应字段 | newDispatchId、merchantLayoutId、baselinePublishedAt、syncOperationId |
| 关键 ID | tenantId、layoutId；按模块另含 domainId／languageCode／componentId／gameId。 |
| 对应字段实体 | ENT-BND、ENT-LAY、ENT-SYNC、ENT-AUD |
| 权限点 | 配置管理 |
| 幂等键 | 读取不适用；写入以 operationId／Idempotency-Key 去重。 |
| 并发控制 | 写入带 updateTime 或 ETag；冲突回 409 并要求重载。 |
| 错误码与前端提示 | 400 验证失败、403 无权限、404 对象不存在、409 版本冲突、422 业务阻挡、503 暂不可用；前端只显示业务原因与下一步。 |
| 数据来源 | 依 PRD 权威数据源；不得以前一租户缓存兜底。 |
| 同步方向／线上影响 | 成功写入产生同步事件；其他已开启页面 3 秒内更新。线上影响：新的保底快照立即具备展示资格；商户未另行发布覆盖时显示保底。 |
| 原型 Mock／四商户 | prototypeAcceptanceScenario；ready/loading/empty/error/stale。 1050 草稿／定时发布计划／三语；1048 停用／自动回滚；1052 未下派；1054 已配置／未配置／停用。 |
| 依赖／风险 | V3 登录会话、商户授权与三个基础权限；正式 API gateway 契约待确认。 风险：现有原型本机状态不能证明跨端口一致、幂等或并发安全。 |
| 开发状态 | 待后端确认新工作区识别与历史隔离 |
| 验收案例编号 | [S-02](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[S-03](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability) |
| 对应功能点编号 | [DSP-03](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-dsp-03) |

#### DSP-API-04｜下派／同步状态

| 项目 | 契约记录 |
|---|---|
| 接口编号 | DSP-API-04 |
| 功能模块 | 总控端／下派管理 |
| 使用页面／操作 | 总控下派结果、商户基准更新提示／下派／同步状态 |
| 接口用途与触发时机 | 查询下派或基准同步的进度、错误、最后成功数据与可否重试。 触发：提交后轮询／事件通知、进页、手动刷新。 |
| 类型（三选一） | 新增接口 |
| 既有能力／可直接使用／缺少字段 | 未发现可证明正式 HTTP endpoint 的数据；待后端确认。 |
| 建议 method／path | GET `/v3/frontend-layouts/sync-operations/{syncOperationId}` |
| 请求字段 | syncOperationId；可选 tenantId/layoutId 供授权校验 |
| 回应字段 | status、lastSuccessfulAt、lastSuccessfulPayloadRef、errorReason、retryable、serverTime |
| 关键 ID | tenantId、layoutId；按模块另含 domainId／languageCode／componentId／gameId。 |
| 对应字段实体 | ENT-SYNC |
| 权限点 | 版面查看 |
| 幂等键 | GET |
| 并发控制 | 写入带 updateTime 或 ETag；冲突回 409 并要求重载。 |
| 错误码与前端提示 | 400 验证失败、403 无权限、404 对象不存在、409 版本冲突、422 业务阻挡、503 暂不可用；前端只显示业务原因与下一步。 |
| 数据来源 | 依 PRD 权威数据源；不得以前一租户缓存兜底。 |
| 同步方向／线上影响 | 成功写入产生同步事件；其他已开启页面 3 秒内更新。 线上影响：否 |
| 原型 Mock／四商户 | prototypeAcceptanceScenario；ready/loading/empty/error/stale。 1050 草稿／定时发布计划／三语；1048 停用／自动回滚；1052 未下派；1054 已配置／未配置／停用。 |
| 依赖／风险 | V3 登录会话、商户授权与三个基础权限；正式 API gateway 契约待确认。 风险：现有原型本机状态不能证明跨端口一致、幂等或并发安全。 |
| 开发状态 | 待后端确认状态机与最后成功快照 |
| 验收案例编号 | [S-01](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[S-02](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[S-03](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[S-04](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability) |
| 对应功能点编号 | [DSP-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-dsp-02) |

## 5. 商户端

### 版面查询

#### MER-API-01｜商户版面列表

| 项目 | 契约记录 |
|---|---|
| 接口编号 | MER-API-01 |
| 功能模块 | 商户端／版面查询 |
| 使用页面／操作 | 商户版面列表／商户版面列表 |
| 接口用途与触发时机 | 只查询本会话授权商户已下派版面；未下派回权威空结果。 触发：进页、搜索、筛选、分页、刷新。 |
| 类型（三选一） | 既有接口扩充 |
| 既有能力／可直接使用／缺少字段 | 四商户版面 fixture（E-04）及本机列表层；缺正式授权过滤与 serverTime。 |
| 建议 method／path | GET `/v3/frontend-layouts/merchant/layouts` |
| 请求字段 | session tenant scope、keyword、configurationStatus、pageNo、pageSize |
| 回应字段 | items、total、assignmentState、serverTime、lastSuccessfulAt |
| 关键 ID | tenantId、layoutId；按模块另含 domainId／languageCode／componentId／gameId。 |
| 对应字段实体 | ENT-MER、ENT-LAY、ENT-BND |
| 权限点 | 版面查看 |
| 幂等键 | GET |
| 并发控制 | 写入带 updateTime 或 ETag；冲突回 409 并要求重载。 |
| 错误码与前端提示 | 400 验证失败、403 无权限、404 对象不存在、409 版本冲突、422 业务阻挡、503 暂不可用；前端只显示业务原因与下一步。 |
| 数据来源 | 依 PRD 权威数据源；不得以前一租户缓存兜底。 |
| 同步方向／线上影响 | 成功写入产生同步事件；其他已开启页面 3 秒内更新。 线上影响：否；只有成功发布、取消下派安全回退或成功回滚会改变线上内容。 |
| 原型 Mock／四商户 | prototypeAcceptanceScenario；ready/loading/empty/error/stale。 1050 草稿／定时发布计划／三语；1048 停用／自动回滚；1052 未下派；1054 已配置／未配置／停用。 |
| 依赖／风险 | V3 登录会话、商户授权与三个基础权限；正式 API gateway 契约待确认。 风险：现有原型本机状态不能证明跨端口一致、幂等或并发安全。 |
| 开发状态 | 待后端确认正式 endpoint 与状态正规化 |
| 验收案例编号 | [T1050-01](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[T1052-01](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[T1054-01](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[I-01](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability) |
| 对应功能点编号 | [MER-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-mer-01) |

#### MER-API-02｜商户版面详情

| 项目 | 契约记录 |
|---|---|
| 接口编号 | MER-API-02 |
| 功能模块 | 商户端／版面查询 |
| 使用页面／操作 | 商户版面详情／编辑／商户版面详情 |
| 接口用途与触发时机 | 取得代码模板能力、最新下派保底快照、商户可编辑覆盖、合并后有效内容、语言、游戏、域名及草稿冲突信息。总控更新只能刷新模板能力与保底快照，不得覆盖商户覆盖。触发：开启详情、保底更新、冲突后重载。 |
| 类型（三选一） | 既有接口扩充 |
| 既有能力／可直接使用／缺少字段 | 本机版面／授权快照（E-04、E-07）；缺正式 componentId merge、ETag 与权限守门。 |
| 建议 method／path | GET `/v3/frontend-layouts/merchant/layouts/{layoutId}` |
| 请求字段 | layoutId；tenant scope 取自 session |
| 回应字段 | templateContractVersion、fallbackSnapshot、merchantOverrides、effectiveDraft、hiddenRetainedOverrides[]、languages、domains、allowedGames、fallbackUpdateState、ETag |
| 关键 ID | tenantId、layoutId；按模块另含 domainId／languageCode／componentId／gameId。 |
| 对应字段实体 | ENT-LAY、ENT-DRF、ENT-I18N、ENT-ALLOW |
| 权限点 | 版面查看 |
| 幂等键 | GET |
| 并发控制 | 写入带 updateTime 或 ETag；冲突回 409 并要求重载。 |
| 错误码与前端提示 | 400 验证失败、403 无权限、404 对象不存在、409 版本冲突、422 业务阻挡、503 暂不可用；前端只显示业务原因与下一步。 |
| 数据来源 | 依 PRD 权威数据源；不得以前一租户缓存兜底。 |
| 同步方向／线上影响 | 成功写入产生同步事件；其他已开启页面 3 秒内更新。 线上影响：否；只有成功发布、取消下派安全回退或成功回滚会改变线上内容。 |
| 原型 Mock／四商户 | prototypeAcceptanceScenario；ready/loading/empty/error/stale。 1050 草稿／定时发布计划／三语；1048 停用／自动回滚；1052 未下派；1054 已配置／未配置／停用。 |
| 依赖／风险 | V3 登录会话、商户授权与三个基础权限；正式 API gateway 契约待确认。 风险：现有原型本机状态不能证明跨端口一致、幂等或并发安全。 |
| 开发状态 | 待后端确认正式 endpoint 与合并结果 |
| 验收案例编号 | [S-04](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[T1054-01](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[I-01](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability) |
| 对应功能点编号 | [MER-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-mer-01) |

### 草稿管理

#### MER-API-03｜保存商户草稿

| 项目 | 契约记录 |
|---|---|
| 接口编号 | MER-API-03 |
| 功能模块 | 商户端／草稿管理 |
| 使用页面／操作 | 商户版面编辑－保存／保存商户草稿 |
| 接口用途与触发时机 | 保存翻译、素材、排序、显示状态及游戏选择，不改线上。 触发：点击保存。 |
| 类型（三选一） | 既有接口扩充 |
| 既有能力／可直接使用／缺少字段 | 原型 localStorage 草稿／版面记录（E-03、E-04）；缺正式事务、商户隔离与幂等。 |
| 建议 method／path | PUT `/v3/frontend-layouts/merchant/layouts/{layoutId}/draft` |
| 请求字段 | layoutId、baselineId、overrides、updateTime、operationId |
| 回应字段 | draftId、configurationStatus=draft、updateTime、warnings |
| 关键 ID | tenantId、layoutId；按模块另含 domainId／languageCode／componentId／gameId。 |
| 对应字段实体 | ENT-DRF、ENT-I18N、ENT-ASSET、ENT-ALLOW |
| 权限点 | 配置管理 |
| 幂等键 | 读取不适用；写入以 operationId／Idempotency-Key 去重。 |
| 并发控制 | 写入带 updateTime 或 ETag；冲突回 409 并要求重载。 |
| 错误码与前端提示 | 400 验证失败、403 无权限、404 对象不存在、409 版本冲突、422 业务阻挡、503 暂不可用；前端只显示业务原因与下一步。 |
| 数据来源 | 依 PRD 权威数据源；不得以前一租户缓存兜底。 |
| 同步方向／线上影响 | 成功写入产生同步事件；其他已开启页面 3 秒内更新。 线上影响：否 |
| 原型 Mock／四商户 | prototypeAcceptanceScenario；ready/loading/empty/error/stale。 1050 草稿／定时发布计划／三语；1048 停用／自动回滚；1052 未下派；1054 已配置／未配置／停用。 |
| 依赖／风险 | V3 登录会话、商户授权与三个基础权限；正式 API gateway 契约待确认。 风险：现有原型本机状态不能证明跨端口一致、幂等或并发安全。 |
| 开发状态 | 待后端确认事务与字段校验 |
| 验收案例编号 | [P-01](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[L-01](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[L-04](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[G-05](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[A-05](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[I-02](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability) |
| 对应功能点编号 | [MER-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-mer-01) |

#### MER-API-10｜复制商户版面

| 项目 | 契约记录 |
|---|---|
| 接口编号 | MER-API-10 |
| 功能模块 | 商户端／草稿管理 |
| 使用页面／操作 | 商户版面列表／复制版面 |
| 接口用途与触发时机 | 点击「复制版面」后立即建立新草稿，带入来源版面的全部可编辑配置与内容；成功回传后前端直接进入新版面编辑页。 |
| 类型（三选一） | 新增接口 |
| 既有能力／可直接使用／缺少字段 | 原型已有本机复制与草稿复制能力；缺正式事务、名称唯一处理与幂等。 |
| 建议 method／path | POST `/v3/frontend-layouts/merchant/layouts/{sourceLayoutId}/copies` |
| 请求字段 | sourceLayoutId、operationId |
| 回应字段 | layoutId、layoutName、configurationStatus=draft、editorPath、createdAt |
| 关键 ID | tenantId、sourceLayoutId、layoutId、operationId |
| 对应字段实体 | ENT-LAY、ENT-DRF、ENT-I18N、ENT-ASSET、ENT-ALLOW |
| 权限点 | 配置管理 |
| 幂等键 | operationId／Idempotency-Key；重送必须回传同一新草稿。 |
| 并发控制 | 来源版面以读取快照复制；名称由服务端产生唯一值。 |
| 错误码与前端提示 | 403 无权限、404 来源不存在、409 名称或幂等冲突、422 来源不可复制；失败留在列表，成功直接跳转编辑页。 |
| 数据来源 | 复制来源版面的结构、区块、导航、分类、素材引用、翻译与游戏配置；不复制主域名、定时发布计划、发布／版本记录、下派关系、默认状态或操作记录。 |
| 同步方向／线上影响 | 只建立未发布草稿；线上影响：否。 |
| 依赖／风险 | 需确保深拷贝及稳定 ID 重新生成策略；不得让后续编辑回写来源版面。 |
| 开发状态 | 待后端新增正式 endpoint |
| 验收案例编号 | TC-MER-COPY-01 |
| 对应功能点编号 | [MER-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-mer-01) |

### 预览／发布

#### MER-API-04｜商户预览

| 项目 | 契约记录 |
|---|---|
| 接口编号 | MER-API-04 |
| 功能模块 | 商户端／预览／发布 |
| 使用页面／操作 | 商户版面编辑－预览／商户预览 |
| 接口用途与触发时机 | 用当前未发布商户覆盖叠加最新保底，预览设备、语言与已绑主域名，不写线上。手机固定 375×812；PC 以 1920 宽度为基准、高度不限制且依可用画面自适应。触发：点击预览或切换预览条件。 |
| 类型（三选一） | 新增接口 |
| 既有能力／可直接使用／缺少字段 | 未发现可证明正式 HTTP endpoint 的数据；待后端确认。 |
| 建议 method／path | POST `/v3/frontend-layouts/merchant/layouts/{layoutId}/preview-sessions` |
| 请求字段 | layoutId、draftUpdateTime、viewportWidth、languageCode、domainId、operationId |
| 回应字段 | previewToken、renderPayload／URL、expiresAt、warnings |
| 关键 ID | tenantId、layoutId；按模块另含 domainId／languageCode／componentId／gameId。 |
| 对应字段实体 | ENT-DRF、ENT-I18N、ENT-BND |
| 权限点 | 版面查看 |
| 幂等键 | 读取不适用；写入以 operationId／Idempotency-Key 去重。 |
| 并发控制 | 写入带 updateTime 或 ETag；冲突回 409 并要求重载。 |
| 错误码与前端提示 | 400 验证失败、403 无权限、404 对象不存在、409 版本冲突、422 业务阻挡、503 暂不可用；前端只显示业务原因与下一步。 |
| 数据来源 | 依 PRD 权威数据源；不得以前一租户缓存兜底。 |
| 同步方向／线上影响 | 成功写入产生同步事件；其他已开启页面 3 秒内更新。 线上影响：否 |
| 原型 Mock／四商户 | prototypeAcceptanceScenario；ready/loading/empty/error/stale。 1050 草稿／定时发布计划／三语；1048 停用／自动回滚；1052 未下派；1054 已配置／未配置／停用。 |
| 依赖／风险 | V3 登录会话、商户授权与三个基础权限；正式 API gateway 契约待确认。 风险：现有原型本机状态不能证明跨端口一致、幂等或并发安全。 |
| 开发状态 | 待后端确认预览 session |
| 验收案例编号 | [L-05](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[D-04](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability) |
| 对应功能点编号 | [MER-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-mer-02) |

#### MER-API-05｜发布前校验

| 项目 | 契约记录 |
|---|---|
| 接口编号 | MER-API-05 |
| 功能模块 | 商户端／预览／发布 |
| 使用页面／操作 | 立即发布／定时发布计划／回滚确认前／发布前校验 |
| 接口用途与触发时机 | 检查商户状态、有效主域名、必填多语内容、必备 active 游戏、商户覆盖与最新模板能力的兼容性及定时发布计划冲突。保底更新不要求商户确认。触发：开启发布确认、提交前再次校验。 |
| 类型（三选一） | 新增接口 |
| 既有能力／可直接使用／缺少字段 | 未发现可证明正式 HTTP endpoint 的数据；待后端确认。 |
| 建议 method／path | POST `/v3/frontend-layouts/merchant/layouts/{layoutId}/validate-publish` |
| 请求字段 | layoutId、draftUpdateTime、mode=immediate\|scheduled\|rollback、scheduleAt、rollbackPublicationId |
| 回应字段 | valid、blockingIssues[]、warnings[]、validatedAt、validationToken |
| 关键 ID | tenantId、layoutId；按模块另含 domainId／languageCode／componentId／gameId。 |
| 对应字段实体 | ENT-LNG、ENT-I18N、ENT-ALLOW、ENT-BND |
| 权限点 | 发布管理 |
| 幂等键 | operationId 避免重复校验记录；validationToken 单次使用 |
| 并发控制 | 写入带 updateTime 或 ETag；冲突回 409 并要求重载。 |
| 错误码与前端提示 | 400 验证失败、403 无权限、404 对象不存在、409 版本冲突、422 业务阻挡、503 暂不可用；前端只显示业务原因与下一步。 |
| 数据来源 | 依 PRD 权威数据源；不得以前一租户缓存兜底。 |
| 同步方向／线上影响 | 成功写入产生同步事件；其他已开启页面 3 秒内更新。 线上影响：否 |
| 原型 Mock／四商户 | prototypeAcceptanceScenario；ready/loading/empty/error/stale。 1050 草稿／定时发布计划／三语；1048 停用／自动回滚；1052 未下派；1054 已配置／未配置／停用。 |
| 依赖／风险 | V3 登录会话、商户授权与三个基础权限；正式 API gateway 契约待确认。 风险：现有原型本机状态不能证明跨端口一致、幂等或并发安全。 |
| 开发状态 | 待后端确认与发布共用校验服务 |
| 验收案例编号 | [D-04](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[L-02](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[L-03](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[G-06](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[A-03](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability) |
| 对应功能点编号 | [MER-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-mer-02) |

#### MER-API-06｜立即发布

| 项目 | 契约记录 |
|---|---|
| 接口编号 | MER-API-06 |
| 功能模块 | 商户端／预览／发布 |
| 使用页面／操作 | 商户版面－立即发布／立即发布 |
| 接口用途与触发时机 | 把草稿原子发布至该版面全部有效已绑主域名，成功才产生商户发布版本。 触发：确认立即发布；如有定时发布计划先确认取消。 |
| 类型（三选一） | 新增接口 |
| 既有能力／可直接使用／缺少字段 | 未发现可证明正式 HTTP endpoint 的数据；待后端确认。 |
| 建议 method／path | POST `/v3/frontend-layouts/merchant/layouts/{layoutId}/publications` |
| 请求字段 | layoutId、validationToken、draftUpdateTime、operationId、cancelPendingSchedule=true\|false |
| 回应字段 | publicationId、merchantVersion、publishedAt、affectedDomainIds、healthCheckWindowEndsAt |
| 关键 ID | tenantId、layoutId；按模块另含 domainId／languageCode／componentId／gameId。 |
| 对应字段实体 | ENT-PUB、ENT-SCH、ENT-BND、ENT-AUD |
| 权限点 | 发布管理 |
| 幂等键 | 读取不适用；写入以 operationId／Idempotency-Key 去重。 |
| 并发控制 | 写入带 updateTime 或 ETag；冲突回 409 并要求重载。 |
| 错误码与前端提示 | 400 验证失败、403 无权限、404 对象不存在、409 版本冲突、422 业务阻挡、503 暂不可用；前端只显示业务原因与下一步。 |
| 数据来源 | 依 PRD 权威数据源；不得以前一租户缓存兜底。 |
| 同步方向／线上影响 | 成功写入产生同步事件；其他已开启页面 3 秒内更新。 线上影响：是；全部有效已绑主域名原子生效。 |
| 原型 Mock／四商户 | prototypeAcceptanceScenario；ready/loading/empty/error/stale。 1050 草稿／定时发布计划／三语；1048 停用／自动回滚；1052 未下派；1054 已配置／未配置／停用。 |
| 依赖／风险 | V3 登录会话、商户授权与三个基础权限；正式 API gateway 契约待确认。 风险：现有原型本机状态不能证明跨端口一致、幂等或并发安全。 |
| 开发状态 | 待后端确认原子发布事务 |
| 验收案例编号 | [T1048-01](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[A-03](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[A-04](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[I-02](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability) |
| 对应功能点编号 | [MER-03](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-mer-03) |

### 定时发布

#### MER-API-07｜建立／修改定时发布计划

| 项目 | 契约记录 |
|---|---|
| 接口编号 | MER-API-07 |
| 功能模块 | 商户端／定时发布 |
| 使用页面／操作 | 商户版面－定时发布／建立／修改定时发布计划 |
| 接口用途与触发时机 | 建立或修改每版面唯一待执行定时发布计划；显示商户时区、底层以 UTC 保存。 触发：选择定时发布并提交。 |
| 类型（三选一） | 新增接口 |
| 既有能力／可直接使用／缺少字段 | 未发现可证明正式 HTTP endpoint 的数据；待后端确认。 |
| 建议 method／path | PUT `/v3/frontend-layouts/merchant/layouts/{layoutId}/schedule` |
| 请求字段 | layoutId、scheduleAtUtc、displayTimezone、draftUpdateTime、validationToken、operationId |
| 回应字段 | scheduleId、status=scheduled、scheduleAtUtc、displayTimezone、updateTime |
| 关键 ID | tenantId、layoutId；按模块另含 domainId／languageCode／componentId／gameId。 |
| 对应字段实体 | ENT-SCH、ENT-DRF |
| 权限点 | 发布管理 |
| 幂等键 | 读取不适用；写入以 operationId／Idempotency-Key 去重。 |
| 并发控制 | tenantId+layoutId+pending 唯一索引；updateTime 控制修改 |
| 错误码与前端提示 | 400 验证失败、403 无权限、404 对象不存在、409 版本冲突、422 业务阻挡、503 暂不可用；前端只显示业务原因与下一步。 |
| 数据来源 | 依 PRD 权威数据源；不得以前一租户缓存兜底。 |
| 同步方向／线上影响 | 成功写入产生同步事件；其他已开启页面 3 秒内更新。 线上影响：否；执行成功时才改线上。 |
| 原型 Mock／四商户 | prototypeAcceptanceScenario；ready/loading/empty/error/stale。 1050 草稿／定时发布计划／三语；1048 停用／自动回滚；1052 未下派；1054 已配置／未配置／停用。 |
| 依赖／风险 | V3 登录会话、商户授权与三个基础权限；正式 API gateway 契约待确认。 风险：现有原型本机状态不能证明跨端口一致、幂等或并发安全。 |
| 开发状态 | 待后端确认定时发布计划服务与商户时区 |
| 验收案例编号 | [T1050-01](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[A-03](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[A-04](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[I-02](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability) |
| 对应功能点编号 | [MER-04](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-mer-04) |

#### MER-API-08｜取消定时发布计划

| 项目 | 契约记录 |
|---|---|
| 接口编号 | MER-API-08 |
| 功能模块 | 商户端／定时发布 |
| 使用页面／操作 | 商户版面－取消定时发布计划／取消定时发布计划 |
| 接口用途与触发时机 | 取消尚未执行定时发布计划并保留审计。 触发：点击取消；立即发布或回滚确认时自动取消。 |
| 类型（三选一） | 新增接口 |
| 既有能力／可直接使用／缺少字段 | 未发现可证明正式 HTTP endpoint 的数据；待后端确认。 |
| 建议 method／path | DELETE `/v3/frontend-layouts/merchant/layouts/{layoutId}/schedule/{scheduleId}` |
| 请求字段 | layoutId、scheduleId、reason、updateTime、operationId |
| 回应字段 | scheduleId、status=cancelled、cancelledAt |
| 关键 ID | tenantId、layoutId；按模块另含 domainId／languageCode／componentId／gameId。 |
| 对应字段实体 | ENT-SCH、ENT-AUD |
| 权限点 | 发布管理 |
| 幂等键 | 读取不适用；写入以 operationId／Idempotency-Key 去重。 |
| 并发控制 | 执行锁与取消锁互斥；已执行回 409 |
| 错误码与前端提示 | 400 验证失败、403 无权限、404 对象不存在、409 版本冲突、422 业务阻挡、503 暂不可用；前端只显示业务原因与下一步。 |
| 数据来源 | 依 PRD 权威数据源；不得以前一租户缓存兜底。 |
| 同步方向／线上影响 | 成功写入产生同步事件；其他已开启页面 3 秒内更新。 线上影响：否 |
| 原型 Mock／四商户 | prototypeAcceptanceScenario；ready/loading/empty/error/stale。 1050 草稿／定时发布计划／三语；1048 停用／自动回滚；1052 未下派；1054 已配置／未配置／停用。 |
| 依赖／风险 | V3 登录会话、商户授权与三个基础权限；正式 API gateway 契约待确认。 风险：现有原型本机状态不能证明跨端口一致、幂等或并发安全。 |
| 开发状态 | 待后端确认取消与执行竞态 |
| 验收案例编号 | [A-03](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[A-04](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability) |
| 对应功能点编号 | [MER-04](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-mer-04) |

### 回滚

#### MER-API-09｜商户回滚

| 项目 | 契约记录 |
|---|---|
| 接口编号 | MER-API-09 |
| 功能模块 | 商户端／回滚 |
| 使用页面／操作 | 商户发布历史－回滚／商户回滚 |
| 接口用途与触发时机 | 回滚最近 10 次且 180 天内成功发布，形成新成功版本，不覆盖历史。 触发：选择合格发布记录并确认回滚。 |
| 类型（三选一） | 新增接口 |
| 既有能力／可直接使用／缺少字段 | 未发现可证明正式 HTTP endpoint 的数据；待后端确认。 |
| 建议 method／path | POST `/v3/frontend-layouts/merchant/layouts/{layoutId}/rollbacks` |
| 请求字段 | layoutId、targetPublicationId、operationId、cancelPendingSchedule=true\|false |
| 回应字段 | rollbackId、newPublicationId、merchantVersion、publishedAt、affectedDomainIds |
| 关键 ID | tenantId、layoutId；按模块另含 domainId／languageCode／componentId／gameId。 |
| 对应字段实体 | ENT-RBK、ENT-PUB、ENT-SCH |
| 权限点 | 发布管理；仅商户端 |
| 幂等键 | 读取不适用；写入以 operationId／Idempotency-Key 去重。 |
| 并发控制 | 写入带 updateTime 或 ETag；冲突回 409 并要求重载。 |
| 错误码与前端提示 | 400 验证失败、403 无权限、404 对象不存在、409 版本冲突、422 业务阻挡、503 暂不可用；前端只显示业务原因与下一步。 |
| 数据来源 | 依 PRD 权威数据源；不得以前一租户缓存兜底。 |
| 同步方向／线上影响 | 成功写入产生同步事件；其他已开启页面 3 秒内更新。 线上影响：是；全部已绑主域名原子生效，失败维持现状。 |
| 原型 Mock／四商户 | prototypeAcceptanceScenario；ready/loading/empty/error/stale。 1050 草稿／定时发布计划／三语；1048 停用／自动回滚；1052 未下派；1054 已配置／未配置／停用。 |
| 依赖／风险 | V3 登录会话、商户授权与三个基础权限；正式 API gateway 契约待确认。 风险：现有原型本机状态不能证明跨端口一致、幂等或并发安全。 |
| 开发状态 | 待后端确认候选查询与原子回滚 |
| 验收案例编号 | [T1048-01](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[A-03](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[A-04](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability) |
| 对应功能点编号 | [MER-05](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-mer-05) |

### 主域名管理

#### DOM-API-01｜查询可用主域名

| 项目 | 契约记录 |
|---|---|
| 接口编号 | DOM-API-01 |
| 功能模块 | 商户端／主域名管理 |
| 使用页面／操作 | 下派／域名管理／发布校验／查询可用主域名 |
| 接口用途与触发时机 | 查询商户的主域名、验证、有效状态；非主域名不得成为候选。 触发：进页、切换商户、打开域名管理、发布前。 |
| 类型（三选一） | 既有接口扩充 |
| 既有能力／可直接使用／缺少字段 | 原型 `getDomainOptions`／domainMgmt data（E-02、E-05）；缺 domainType、verified、validUntil 正式字段。 |
| 建议 method／path | GET `/v3/domains/merchants/{tenantId}/main-domains` |
| 请求字段 | tenantId、verified=true、effective=true、pageNo、pageSize |
| 回应字段 | domainId、hostname、domainType、verificationStatus、lifecycleStatus、validUntil、currentLayoutId |
| 关键 ID | tenantId、layoutId；按模块另含 domainId／languageCode／componentId／gameId。 |
| 对应字段实体 | ENT-DOM、ENT-BND |
| 权限点 | 版面查看；域名管理写入需配置管理 |
| 幂等键 | GET |
| 并发控制 | 写入带 updateTime 或 ETag；冲突回 409 并要求重载。 |
| 错误码与前端提示 | 400 验证失败、403 无权限、404 对象不存在、409 版本冲突、422 业务阻挡、503 暂不可用；前端只显示业务原因与下一步。 |
| 数据来源 | 依 PRD 权威数据源；不得以前一租户缓存兜底。 |
| 同步方向／线上影响 | 成功写入产生同步事件；其他已开启页面 3 秒内更新。 线上影响：否；只有成功发布、取消下派安全回退或成功回滚会改变线上内容。 |
| 原型 Mock／四商户 | prototypeAcceptanceScenario；ready/loading/empty/error/stale。 1050 草稿／定时发布计划／三语；1048 停用／自动回滚；1052 未下派；1054 已配置／未配置／停用。 |
| 依赖／风险 | V3 登录会话、商户授权与三个基础权限；正式 API gateway 契约待确认。 风险：现有原型本机状态不能证明跨端口一致、幂等或并发安全。 |
| 开发状态 | 待后端确认正式域名接口与资格字段 |
| 验收案例编号 | [D-01](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[D-04](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[D-05](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability) |
| 对应功能点编号 | [DOM-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-dom-01) |

#### DOM-API-02｜查询域名绑定

| 项目 | 契约记录 |
|---|---|
| 接口编号 | DOM-API-02 |
| 功能模块 | 商户端／主域名管理 |
| 使用页面／操作 | 商户域名管理／查询域名绑定 |
| 接口用途与触发时机 | 查询每个有效主域名唯一的当前版面。已绑定域名不可直接切换至其他版面，必须先解除成功再另行绑定。触发：进页、刷新、跨端同步事件。 |
| 类型（三选一） | 既有接口扩充 |
| 既有能力／可直接使用／缺少字段 | 原型具备域名与版面关系的本机数据形状（E-03）；目标接口只回传唯一当前绑定，并补数据库唯一性与正式读接口。 |
| 建议 method／path | GET `/v3/frontend-layouts/merchant/domain-bindings` |
| 请求字段 | tenantId、domainId、layoutId、pageNo、pageSize |
| 回应字段 | bindings[]、currentLayoutId、bindingUpdateTime |
| 关键 ID | tenantId、layoutId；按模块另含 domainId／languageCode／componentId／gameId。 |
| 对应字段实体 | ENT-BND |
| 权限点 | 版面查看 |
| 幂等键 | GET |
| 并发控制 | 写入带 updateTime 或 ETag；冲突回 409 并要求重载。 |
| 错误码与前端提示 | 400 验证失败、403 无权限、404 对象不存在、409 版本冲突、422 业务阻挡、503 暂不可用；前端只显示业务原因与下一步。 |
| 数据来源 | 依 PRD 权威数据源；不得以前一租户缓存兜底。 |
| 同步方向／线上影响 | 成功写入产生同步事件；其他已开启页面 3 秒内更新。 线上影响：否；只有成功发布、取消下派安全回退或成功回滚会改变线上内容。 |
| 原型 Mock／四商户 | prototypeAcceptanceScenario；ready/loading/empty/error/stale。 1050 草稿／定时发布计划／三语；1048 停用／自动回滚；1052 未下派；1054 已配置／未配置／停用。 |
| 依赖／风险 | V3 登录会话、商户授权与三个基础权限；正式 API gateway 契约待确认。 风险：现有原型本机状态不能证明跨端口一致、幂等或并发安全。 |
| 开发状态 | 待后端确认正式绑定数据模型 |
| 验收案例编号 | [D-02](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[D-03](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[D-05](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability) |
| 对应功能点编号 | [DOM-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-dom-02) |

#### DOM-API-03｜解除或建立域名绑定

| 项目 | 契约记录 |
|---|---|
| 接口编号 | DOM-API-03 |
| 功能模块 | 商户端／主域名管理 |
| 使用页面／操作 | 商户域名管理－解除／绑定主域名 |
| 接口用途与触发时机 | 仅允许两个独立操作：已绑定域名先解除当前版面，解除成功后才能再次提交绑定。不得在一次请求中把域名由版面 A 直接切至版面 B。 |
| 类型（三选一） | 既有接口扩充 |
| 既有能力／可直接使用／缺少字段 | 原型具备建立与解除关系的本机数据形状（E-03）；缺正式事务、first-write-wins 与定时发布计划阻挡。 |
| 建议 method／path | 解除：DELETE `/v3/frontend-layouts/merchant/domain-bindings/{domainId}`；绑定：POST `/v3/frontend-layouts/merchant/domain-bindings` |
| 请求字段 | 解除：domainId、expectedCurrentLayoutId、bindingUpdateTime、operationId；绑定：domainId、targetLayoutId、expectedCurrentLayoutId=null、bindingUpdateTime、operationId |
| 回应字段 | currentLayoutId、bindingStatus=unbound\|bound、updateTime |
| 关键 ID | tenantId、layoutId；按模块另含 domainId／languageCode／componentId／gameId。 |
| 对应字段实体 | ENT-DOM、ENT-BND |
| 权限点 | 配置管理 |
| 幂等键 | 读取不适用；写入以 operationId／Idempotency-Key 去重。 |
| 并发控制 | domainId current 唯一；CAS/ETag，后写回 409；绑定时 current 非空一律拒绝 |
| 错误码与前端提示 | 400 验证失败、403 无权限、404 对象不存在、409 版本冲突、422 业务阻挡、503 暂不可用；前端只显示业务原因与下一步。 |
| 数据来源 | 依 PRD 权威数据源；不得以前一租户缓存兜底。 |
| 同步方向／线上影响 | 解除成功后域名改用平台默认内容；后续绑定成功后，该版面的有效结果（商户覆盖优先、否则保底）开始展示。两次操作各自写入审计记录。 |
| 原型 Mock／四商户 | prototypeAcceptanceScenario；ready/loading/empty/error/stale。 1050 草稿／定时发布计划／三语；1048 停用／自动回滚；1052 未下派；1054 已配置／未配置／停用。 |
| 依赖／风险 | V3 登录会话、商户授权与三个基础权限；正式 API gateway 契约待确认。 风险：现有原型本机状态不能证明跨端口一致、幂等或并发安全。 |
| 开发状态 | 待后端确认解除／绑定两阶段事务与唯一约束 |
| 验收案例编号 | [D-02](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[D-03](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[A-04](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability) |
| 对应功能点编号 | [DOM-03](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-dom-03) |

### 商户语言

#### I18N-API-01｜查询已启用语言

| 项目 | 契约记录 |
|---|---|
| 接口编号 | I18N-API-01 |
| 功能模块 | 商户端／商户语言 |
| 使用页面／操作 | 商户版面编辑／预览／发布校验／查询已启用语言 |
| 接口用途与触发时机 | 查询商户已启用语言、默认语言、方向与更新时间。 触发：进编辑页、切商户、语言变更通知、手动刷新。 |
| 类型（三选一） | 既有接口扩充 |
| 既有能力／可直接使用／缺少字段 | languageConfig 本机数据层与四商户 fixture（E-04、E-05）；缺正式商户管理 endpoint 与 languageUpdateTime。 |
| 建议 method／path | GET `/v3/merchants/{tenantId}/languages` |
| 请求字段 | tenantId（后端仍以 session 授权） |
| 回应字段 | languages[{code,name,enabled,direction}]、defaultLanguageCode、updateTime |
| 关键 ID | tenantId、layoutId；按模块另含 domainId／languageCode／componentId／gameId。 |
| 对应字段实体 | ENT-LNG |
| 权限点 | 版面查看 |
| 幂等键 | GET |
| 并发控制 | 写入带 updateTime 或 ETag；冲突回 409 并要求重载。 |
| 错误码与前端提示 | 400 验证失败、403 无权限、404 对象不存在、409 版本冲突、422 业务阻挡、503 暂不可用；前端只显示业务原因与下一步。 |
| 数据来源 | 依 PRD 权威数据源；不得以前一租户缓存兜底。 |
| 同步方向／线上影响 | 成功写入产生同步事件；其他已开启页面 3 秒内更新。 线上影响：否；只有成功发布、取消下派安全回退或成功回滚会改变线上内容。 |
| 原型 Mock／四商户 | prototypeAcceptanceScenario；ready/loading/empty/error/stale。 1050 草稿／定时发布计划／三语；1048 停用／自动回滚；1052 未下派；1054 已配置／未配置／停用。 |
| 依赖／风险 | V3 登录会话、商户授权与三个基础权限；正式 API gateway 契约待确认。 风险：现有原型本机状态不能证明跨端口一致、幂等或并发安全。 |
| 开发状态 | 待后端确认商户管理正式接口 |
| 验收案例编号 | [T1050-02](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[L-01](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[L-05](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability) |
| 对应功能点编号 | [I18N-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-i18n-01) |

### 多语内容

#### I18N-API-02｜保存多语内容／图片变体

| 项目 | 契约记录 |
|---|---|
| 接口编号 | I18N-API-02 |
| 功能模块 | 商户端／多语内容 |
| 使用页面／操作 | 商户版面编辑－导航／分类／区块／素材／保存多语内容／图片变体 |
| 接口用途与触发时机 | 保存 componentId+languageCode 的文案与图片语言变体；停用语言内容保留。 触发：保存商户草稿。 |
| 类型（三选一） | 既有接口扩充 |
| 既有能力／可直接使用／缺少字段 | 原型可见语言与内容模型（E-04、E-05）；未见正式内容接口、字段长度与资产引用契约。 |
| 建议 method／path | PUT `/v3/frontend-layouts/merchant/layouts/{layoutId}/localized-content` |
| 请求字段 | layoutId、items[{componentId,languageCode,textFields,assetVariantId}]、updateTime、operationId |
| 回应字段 | savedItems、warnings、updateTime |
| 关键 ID | tenantId、layoutId；按模块另含 domainId／languageCode／componentId／gameId。 |
| 对应字段实体 | ENT-I18N、ENT-ASSET |
| 权限点 | 配置管理 |
| 幂等键 | 读取不适用；写入以 operationId／Idempotency-Key 去重。 |
| 并发控制 | 写入带 updateTime 或 ETag；冲突回 409 并要求重载。 |
| 错误码与前端提示 | 400 验证失败、403 无权限、404 对象不存在、409 版本冲突、422 业务阻挡、503 暂不可用；前端只显示业务原因与下一步。 |
| 数据来源 | 依 PRD 权威数据源；不得以前一租户缓存兜底。 |
| 同步方向／线上影响 | 成功写入产生同步事件；其他已开启页面 3 秒内更新。 线上影响：否；随商户发布才生效。 |
| 原型 Mock／四商户 | prototypeAcceptanceScenario；ready/loading/empty/error/stale。 1050 草稿／定时发布计划／三语；1048 停用／自动回滚；1052 未下派；1054 已配置／未配置／停用。 |
| 依赖／风险 | V3 登录会话、商户授权与三个基础权限；正式 API gateway 契约待确认。 风险：现有原型本机状态不能证明跨端口一致、幂等或并发安全。 |
| 开发状态 | 待后端确认内容 schema 与资产引用 |
| 验收案例编号 | [L-01](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[L-04](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[L-05](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability) |
| 对应功能点编号 | [I18N-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-i18n-02) |

#### I18N-API-03｜发布语言校验

| 项目 | 契约记录 |
|---|---|
| 接口编号 | I18N-API-03 |
| 功能模块 | 商户端／多语内容 |
| 使用页面／操作 | 保存／预览／发布前校验／发布语言校验 |
| 接口用途与触发时机 | 校验默认语言必填、其他启用语言警告与固定 fallback 可用性。 触发：保存必填字段、预览、立即／定时发布。 |
| 类型（三选一） | 新增接口 |
| 既有能力／可直接使用／缺少字段 | 未发现可证明正式 HTTP endpoint 的数据；待后端确认。 |
| 建议 method／path | POST `/v3/frontend-layouts/merchant/layouts/{layoutId}/validate-localization`；可并入 `MER-API-05` 回应 |
| 请求字段 | layoutId、draftUpdateTime、languageUpdateTime |
| 回应字段 | blockingFields[]、warningFields[]、fallbackResolution[] |
| 关键 ID | tenantId、layoutId；按模块另含 domainId／languageCode／componentId／gameId。 |
| 对应字段实体 | ENT-LNG、ENT-I18N、ENT-ASSET |
| 权限点 | 配置管理（保存）或发布管理（发布）；均依赖查看 |
| 幂等键 | 读取不适用；写入以 operationId／Idempotency-Key 去重。 |
| 并发控制 | 写入带 updateTime 或 ETag；冲突回 409 并要求重载。 |
| 错误码与前端提示 | 400 验证失败、403 无权限、404 对象不存在、409 版本冲突、422 业务阻挡、503 暂不可用；前端只显示业务原因与下一步。 |
| 数据来源 | 依 PRD 权威数据源；不得以前一租户缓存兜底。 |
| 同步方向／线上影响 | 成功写入产生同步事件；其他已开启页面 3 秒内更新。 线上影响：否 |
| 原型 Mock／四商户 | prototypeAcceptanceScenario；ready/loading/empty/error/stale。 1050 草稿／定时发布计划／三语；1048 停用／自动回滚；1052 未下派；1054 已配置／未配置／停用。 |
| 依赖／风险 | V3 登录会话、商户授权与三个基础权限；正式 API gateway 契约待确认。 风险：现有原型本机状态不能证明跨端口一致、幂等或并发安全。 |
| 开发状态 | 待后端确认可与 MER-API-05 合并 |
| 验收案例编号 | [L-02](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[L-03](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[L-04](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability) |
| 对应功能点编号 | [I18N-03](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-i18n-03) |

## 6. 共用能力

### 游戏数据

#### GAME-API-01｜查询场馆／平台

| 项目 | 契约记录 |
|---|---|
| 接口编号 | GAME-API-01 |
| 功能模块 | 共用能力／游戏数据 |
| 使用页面／操作 | 总控允许池、商户游戏选择／查询场馆／平台 |
| 接口用途与触发时机 | 查询 providerId／venueId、状态、搜索与分页。 触发：进入游戏配置、搜索、筛选、分页、刷新。 |
| 类型（三选一） | 既有接口扩充 |
| 既有能力／可直接使用／缺少字段 | 原型 `api.game.platformGetPageList`（E-06）；可沿用查询形状，缺正式 endpoint 与统一四态。 |
| 建议 method／path | GET `/v3/games/platforms` |
| 请求字段 | keyword、state、maintenanceState、pageNo、pageSize |
| 回应字段 | items[{providerId,venueId,name,status}]、total、serverTime |
| 关键 ID | tenantId、layoutId；按模块另含 domainId／languageCode／componentId／gameId。 |
| 对应字段实体 | ENT-GPL |
| 权限点 | 版面查看；选取需配置管理 |
| 幂等键 | GET |
| 并发控制 | 写入带 updateTime 或 ETag；冲突回 409 并要求重载。 |
| 错误码与前端提示 | 400 验证失败、403 无权限、404 对象不存在、409 版本冲突、422 业务阻挡、503 暂不可用；前端只显示业务原因与下一步。 |
| 数据来源 | 依 PRD 权威数据源；不得以前一租户缓存兜底。 |
| 同步方向／线上影响 | 成功写入产生同步事件；其他已开启页面 3 秒内更新。 线上影响：否；只有成功发布、取消下派安全回退或成功回滚会改变线上内容。 |
| 原型 Mock／四商户 | prototypeAcceptanceScenario；ready/loading/empty/error/stale。 1050 草稿／定时发布计划／三语；1048 停用／自动回滚；1052 未下派；1054 已配置／未配置／停用。 |
| 依赖／风险 | V3 登录会话、商户授权与三个基础权限；正式 API gateway 契约待确认。 风险：现有原型本机状态不能证明跨端口一致、幂等或并发安全。 |
| 开发状态 | 待后端确认 V3 游戏正式 endpoint |
| 验收案例编号 | [G-01](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[G-02](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[G-03](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[G-04](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[G-05](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability) |
| 对应功能点编号 | [GAME-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-game-01) |

#### GAME-API-02｜查询游戏分类

| 项目 | 契约记录 |
|---|---|
| 接口编号 | GAME-API-02 |
| 功能模块 | 共用能力／游戏数据 |
| 使用页面／操作 | 总控允许池、商户游戏选择／查询游戏分类 |
| 接口用途与触发时机 | 按场馆查询稳定 categoryId、状态与父子选取信息。 触发：展开场馆、搜索／筛选／分页。 |
| 类型（三选一） | 既有接口扩充 |
| 既有能力／可直接使用／缺少字段 | 原型 `api.merchantCategory.getPageList`（E-06）；缺正式 categoryId 关联与四态。 |
| 建议 method／path | GET `/v3/games/categories` |
| 请求字段 | providerId、venueId、keyword、status、pageNo、pageSize |
| 回应字段 | items[{categoryId,providerId,venueId,name,status}]、total |
| 关键 ID | tenantId、layoutId；按模块另含 domainId／languageCode／componentId／gameId。 |
| 对应字段实体 | ENT-GCAT |
| 权限点 | 版面查看；选取需配置管理 |
| 幂等键 | GET |
| 并发控制 | 写入带 updateTime 或 ETag；冲突回 409 并要求重载。 |
| 错误码与前端提示 | 400 验证失败、403 无权限、404 对象不存在、409 版本冲突、422 业务阻挡、503 暂不可用；前端只显示业务原因与下一步。 |
| 数据来源 | 依 PRD 权威数据源；不得以前一租户缓存兜底。 |
| 同步方向／线上影响 | 成功写入产生同步事件；其他已开启页面 3 秒内更新。 线上影响：否；只有成功发布、取消下派安全回退或成功回滚会改变线上内容。 |
| 原型 Mock／四商户 | prototypeAcceptanceScenario；ready/loading/empty/error/stale。 1050 草稿／定时发布计划／三语；1048 停用／自动回滚；1052 未下派；1054 已配置／未配置／停用。 |
| 依赖／风险 | V3 登录会话、商户授权与三个基础权限；正式 API gateway 契约待确认。 风险：现有原型本机状态不能证明跨端口一致、幂等或并发安全。 |
| 开发状态 | 待后端确认 V3 游戏正式 endpoint |
| 验收案例编号 | [G-01](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[G-02](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[G-03](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[G-04](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[G-05](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability) |
| 对应功能点编号 | [GAME-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-game-01) |

#### GAME-API-03｜查询子游戏

| 项目 | 契约记录 |
|---|---|
| 接口编号 | GAME-API-03 |
| 功能模块 | 共用能力／游戏数据 |
| 使用页面／操作 | 总控允许池、商户游戏选择／查询子游戏 |
| 接口用途与触发时机 | 按场馆／分类查询 gameId、四态、搜索与分页。 触发：展开分类、搜索／筛选／分页。 |
| 类型（三选一） | 既有接口扩充 |
| 既有能力／可直接使用／缺少字段 | 原型 `api.subgame.getPageList`（E-06）；尚未接统一 acceptance source，正式 endpoint 不明。 |
| 建议 method／path | GET `/v3/games/subgames` |
| 请求字段 | providerId、venueId、categoryId、keyword、status、pageNo、pageSize |
| 回应字段 | items[{gameId,categoryId,providerId,venueId,name,status}]、total |
| 关键 ID | tenantId、layoutId；按模块另含 domainId／languageCode／componentId／gameId。 |
| 对应字段实体 | ENT-GAME |
| 权限点 | 版面查看；选取需配置管理 |
| 幂等键 | GET |
| 并发控制 | 写入带 updateTime 或 ETag；冲突回 409 并要求重载。 |
| 错误码与前端提示 | 400 验证失败、403 无权限、404 对象不存在、409 版本冲突、422 业务阻挡、503 暂不可用；前端只显示业务原因与下一步。 |
| 数据来源 | 依 PRD 权威数据源；不得以前一租户缓存兜底。 |
| 同步方向／线上影响 | 成功写入产生同步事件；其他已开启页面 3 秒内更新。 线上影响：否；只有成功发布、取消下派安全回退或成功回滚会改变线上内容。 |
| 原型 Mock／四商户 | prototypeAcceptanceScenario；ready/loading/empty/error/stale。 1050 草稿／定时发布计划／三语；1048 停用／自动回滚；1052 未下派；1054 已配置／未配置／停用。 |
| 依赖／风险 | V3 登录会话、商户授权与三个基础权限；正式 API gateway 契约待确认。 风险：现有原型本机状态不能证明跨端口一致、幂等或并发安全。 |
| 开发状态 | 待后端确认 V3 游戏正式 endpoint |
| 验收案例编号 | [G-01](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[G-02](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[G-03](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[G-04](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[G-05](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability) |
| 对应功能点编号 | [GAME-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-game-01) |

### 游戏授权

#### GAME-API-04｜查询商户允许游戏交集

| 项目 | 契约记录 |
|---|---|
| 接口编号 | GAME-API-04 |
| 功能模块 | 共用能力／游戏授权 |
| 使用页面／操作 | 商户版面游戏选择／查询商户允许游戏交集 |
| 接口用途与触发时机 | 返回总控允许池与商户已开通范围交集，以及不可选原因。 触发：进页、总控基准更新、商户游戏授权变更、刷新。 |
| 类型（三选一） | 既有接口扩充 |
| 既有能力／可直接使用／缺少字段 | 原型 merchantGame/subgame 与本机 published snapshot（E-06、E-07）；`/__local-api` 不可当正式证据。 |
| 建议 method／path | GET `/v3/frontend-layouts/merchant/layouts/{layoutId}/allowed-games` |
| 请求字段 | layoutId、keyword、providerId、categoryId、status、pageNo、pageSize |
| 回应字段 | items、selectionEligibility、reason、lastSuccessfulAt、serverTime |
| 关键 ID | tenantId、layoutId；按模块另含 domainId／languageCode／componentId／gameId。 |
| 对应字段实体 | ENT-ALLOW、ENT-GAME |
| 权限点 | 版面查看 |
| 幂等键 | GET |
| 并发控制 | 写入带 updateTime 或 ETag；冲突回 409 并要求重载。 |
| 错误码与前端提示 | 400 验证失败、403 无权限、404 对象不存在、409 版本冲突、422 业务阻挡、503 暂不可用；前端只显示业务原因与下一步。 |
| 数据来源 | 依 PRD 权威数据源；不得以前一租户缓存兜底。 |
| 同步方向／线上影响 | 成功写入产生同步事件；其他已开启页面 3 秒内更新。 线上影响：否；只有成功发布、取消下派安全回退或成功回滚会改变线上内容。 |
| 原型 Mock／四商户 | prototypeAcceptanceScenario；ready/loading/empty/error/stale。 1050 草稿／定时发布计划／三语；1048 停用／自动回滚；1052 未下派；1054 已配置／未配置／停用。 |
| 依赖／风险 | V3 登录会话、商户授权与三个基础权限；正式 API gateway 契约待确认。 风险：现有原型本机状态不能证明跨端口一致、幂等或并发安全。 |
| 开发状态 | 待后端确认商户授权与总控允许池聚合接口 |
| 验收案例编号 | [S-04](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[G-01](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[G-02](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[G-03](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[G-04](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[G-05](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability) |
| 对应功能点编号 | [GAME-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-game-02) |

### 游戏配置

#### GAME-API-05｜保存区块游戏

| 项目 | 契约记录 |
|---|---|
| 接口编号 | GAME-API-05 |
| 功能模块 | 共用能力／游戏配置 |
| 使用页面／操作 | 双端版面编辑－区块游戏／保存区块游戏 |
| 接口用途与触发时机 | 按 blockId 保存场馆／分类／子游戏选择，限制每区块 50 且不重复。 触发：保存总控允许池或商户草稿。 |
| 类型（三选一） | 新增接口 |
| 既有能力／可直接使用／缺少字段 | 未发现可证明正式 HTTP endpoint 的数据；待后端确认。 |
| 建议 method／path | PUT `/v3/frontend-layouts/{scope}/layouts/{layoutId}/blocks/{blockId}/games`；可并入草稿接口 |
| 请求字段 | layoutId、blockId、gameIds[]、updateTime、operationId |
| 回应字段 | selectedGames、warnings、updateTime |
| 关键 ID | tenantId、layoutId；按模块另含 domainId／languageCode／componentId／gameId。 |
| 对应字段实体 | ENT-BLK、ENT-ALLOW |
| 权限点 | 配置管理 |
| 幂等键 | 读取不适用；写入以 operationId／Idempotency-Key 去重。 |
| 并发控制 | 写入带 updateTime 或 ETag；冲突回 409 并要求重载。 |
| 错误码与前端提示 | 400 验证失败、403 无权限、404 对象不存在、409 版本冲突、422 业务阻挡、503 暂不可用；前端只显示业务原因与下一步。 |
| 数据来源 | 依 PRD 权威数据源；不得以前一租户缓存兜底。 |
| 同步方向／线上影响 | 成功写入产生同步事件；其他已开启页面 3 秒内更新。 线上影响：否；随对应端发布才生效。 |
| 原型 Mock／四商户 | prototypeAcceptanceScenario；ready/loading/empty/error/stale。 1050 草稿／定时发布计划／三语；1048 停用／自动回滚；1052 未下派；1054 已配置／未配置／停用。 |
| 依赖／风险 | V3 登录会话、商户授权与三个基础权限；正式 API gateway 契约待确认。 风险：现有原型本机状态不能证明跨端口一致、幂等或并发安全。 |
| 开发状态 | 待后端确认可并入 MER-API-03 |
| 验收案例编号 | [G-05](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[G-06](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[I-02](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability) |
| 对应功能点编号 | [GAME-03](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-game-03) |

### 权限

#### PERM-API-01｜取得三个基础权限

| 项目 | 契约记录 |
|---|---|
| 接口编号 | PERM-API-01 |
| 功能模块 | 共用能力／权限 |
| 使用页面／操作 | 双端选单、路由、所有相关页面／取得三个基础权限 |
| 接口用途与触发时机 | 沿用 V3 角色管理回传的权限载荷，取得版面查看、配置管理、发布管理。 触发：登录／刷新会话、角色变更通知、受保护操作前。 |
| 类型（三选一） | 使用既有接口 |
| 既有能力／可直接使用／缺少字段 | 直接使用 V3 `info.menus`／`hasPermission`（E-08）；可直接使用会话权限机制，缺双端统一的三个正式 code 映射。 |
| 建议 method／path | 不新增专案 HTTP；沿用 V3 登录／会话权限接口。 |
| 请求字段 | V3 既有登录／会话参数 |
| 回应字段 | 三个基础权限 code／勾选状态、权限更新时间 |
| 关键 ID | userId、roleId、tenantScope、permissionCode |
| 对应字段实体 | ENT-PERM |
| 权限点 | 公开登录态能力；业务页仍依版面查看 |
| 幂等键 | GET／会话刷新 |
| 并发控制 | 角色变更最迟 60 秒内或下一个受保护操作前生效 |
| 错误码与前端提示 | 401 会话失效、403 无查看；前端隐藏选单或切只读并保留未保存内容供复制。 |
| 数据来源 | V3 系统管理→角色管理 |
| 同步方向／线上影响 | 权限撤销通知／下一保护操作重新校验 线上影响：否 |
| 原型 Mock／四商户 | 原型固定 full、view-configure、view-publish、view-only、none；不得作正式角色来源。 1050 草稿／定时发布计划／三语；1048 停用／自动回滚；1052 未下派；1054 已配置／未配置／停用。 |
| 依赖／风险 | V3 登录会话、商户授权与三个基础权限；正式 API gateway 契约待确认。 风险：现有原型本机状态不能证明跨端口一致、幂等或并发安全。 |
| 开发状态 | 既有 V3 能力；正式 permission code 映射待后端确认 |
| 验收案例编号 | [A-01](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[I-01](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability) |
| 对应功能点编号 | [PERM-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-perm-01) |

#### PERM-API-02｜路由与操作校验

| 项目 | 契约记录 |
|---|---|
| 接口编号 | PERM-API-02 |
| 功能模块 | 共用能力／权限 |
| 使用页面／操作 | 路由进入与每个写入操作／路由与操作校验 |
| 接口用途与触发时机 | 以同一三权限判断选单／路由／只读与后端写入；不建立按钮级权限。 触发：导航前、页面加载、保存／下派／发布／定时发布计划／回滚前。 |
| 类型（三选一） | 使用既有接口 |
| 既有能力／可直接使用／缺少字段 | 前端 `hasPermission`／`info.menus`（E-08）；每个业务写入由其接口再做服务端权限校验，不建议额外 authz HTTP。 |
| 建议 method／path | 不新增独立 endpoint；接入 V3 路由守卫与各业务服务的 server-side guard。 |
| 请求字段 | session、resource tenant/layout、requiredBasePermission |
| 回应字段 | allow／deny（于路由／业务接口内展示） |
| 关键 ID | userId、roleId、tenantId、layoutId、permissionCode |
| 对应字段实体 | ENT-PERM |
| 权限点 | 版面查看是配置／发布管理的前置 |
| 幂等键 | 不适用 |
| 并发控制 | 权限更新时间与 session refresh |
| 错误码与前端提示 | 403：无查看跳离页面；无配置／发布则只读，对应操作隐藏或禁用。 |
| 数据来源 | V3 角色管理 |
| 同步方向／线上影响 | 60 秒内或下一操作前更新 线上影响：否 |
| 原型 Mock／四商户 | 五固定假角色 1050 草稿／定时发布计划／三语；1048 停用／自动回滚；1052 未下派；1054 已配置／未配置／停用。 |
| 依赖／风险 | V3 登录会话、商户授权与三个基础权限；正式 API gateway 契约待确认。 风险：现有原型本机状态不能证明跨端口一致、幂等或并发安全。 |
| 开发状态 | 既有 V3 守门能力；正式后端 middleware 接点待确认 |
| 验收案例编号 | [A-01](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[I-01](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability) |
| 对应功能点编号 | [PERM-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-perm-02) |

### 操作记录

#### AUD-API-01｜操作记录列表／详情

| 项目 | 契约记录 |
|---|---|
| 接口编号 | AUD-API-01 |
| 功能模块 | 共用能力／操作记录 |
| 使用页面／操作 | 双端操作记录／操作记录列表／详情 |
| 接口用途与触发时机 | 查询建立、保存、预览、下派、同步、域名、发布、定时发布计划、回滚及失败结果。 触发：进页、筛选、分页、查看详情。 |
| 类型（三选一） | 新增接口 |
| 既有能力／可直接使用／缺少字段 | 原型有局部本机历史字段（E-04），未见可证明正式 V3 审计查询 endpoint。 |
| 建议 method／path | GET `/v3/frontend-layouts/audit-logs`；GET `/v3/frontend-layouts/audit-logs/{auditId}` |
| 请求字段 | tenantId、layoutId、actorId、action、result、startAt、endAt、pageNo、pageSize |
| 回应字段 | items、total；详情含 beforeSummary、afterSummary、failureReason、timezone |
| 关键 ID | tenantId、layoutId；按模块另含 domainId／languageCode／componentId／gameId。 |
| 对应字段实体 | ENT-AUD |
| 权限点 | 版面查看 |
| 幂等键 | GET |
| 并发控制 | 以 occurredAt+auditId 稳定排序 |
| 错误码与前端提示 | 400 验证失败、403 无权限、404 对象不存在、409 版本冲突、422 业务阻挡、503 暂不可用；前端只显示业务原因与下一步。 |
| 数据来源 | 各业务写入的不可变审计事件 |
| 同步方向／线上影响 | 写入成功／失败后可查；跨端依来源端筛选 线上影响：否 |
| 原型 Mock／四商户 | prototypeAcceptanceScenario；ready/loading/empty/error/stale。 1050 草稿／定时发布计划／三语；1048 停用／自动回滚；1052 未下派；1054 已配置／未配置／停用。 |
| 依赖／风险 | V3 登录会话、商户授权与三个基础权限；正式 API gateway 契约待确认。 风险：现有原型本机状态不能证明跨端口一致、幂等或并发安全。 |
| 开发状态 | 待后端确认 V3 是否有可直接复用审计服务 |
| 验收案例编号 | [T1048-01](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[A-01](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[A-03](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability) |
| 对应功能点编号 | [AUD-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-aud-01) |

#### AUD-API-02｜CSV 导出

| 项目 | 契约记录 |
|---|---|
| 接口编号 | AUD-API-02 |
| 功能模块 | 共用能力／操作记录 |
| 使用页面／操作 | 正式产品操作记录－导出／CSV 导出 |
| 接口用途与触发时机 | 沿用列表筛选建立 CSV 导出；只列遮罩后数据。 触发：正式产品点击导出；原型不展示。 |
| 类型（三选一） | 新增接口 |
| 既有能力／可直接使用／缺少字段 | 未发现可证明正式 HTTP endpoint 的数据；待后端确认。 |
| 建议 method／path | POST `/v3/frontend-layouts/audit-exports`；GET `/.../{exportId}` |
| 请求字段 | filters、timezone、operationId |
| 回应字段 | exportId、status、expiresAt、downloadToken |
| 关键 ID | tenantId、layoutId；按模块另含 domainId／languageCode／componentId／gameId。 |
| 对应字段实体 | ENT-AUD |
| 权限点 | 版面查看；若 V3 有额外导出治理则沿用，不新增本专案按钮权限 |
| 幂等键 | operationId |
| 并发控制 | 写入带 updateTime 或 ETag；冲突回 409 并要求重载。 |
| 错误码与前端提示 | 400 验证失败、403 无权限、404 对象不存在、409 版本冲突、422 业务阻挡、503 暂不可用；前端只显示业务原因与下一步。 |
| 数据来源 | 依 PRD 权威数据源；不得以前一租户缓存兜底。 |
| 同步方向／线上影响 | 成功写入产生同步事件；其他已开启页面 3 秒内更新。 线上影响：否 |
| 原型 Mock／四商户 | prototypeAcceptanceScenario；ready/loading/empty/error/stale。 1050 草稿／定时发布计划／三语；1048 停用／自动回滚；1052 未下派；1054 已配置／未配置／停用。 |
| 依赖／风险 | V3 登录会话、商户授权与三个基础权限；正式 API gateway 契约待确认。 风险：现有原型本机状态不能证明跨端口一致、幂等或并发安全。 |
| 开发状态 | 待后端确认；原型不提供导出 |
| 验收案例编号 | [A-01](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability) |
| 对应功能点编号 | [AUD-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-aud-01) |

### 跨端同步

#### SYNC-API-01｜查询同步状态／最后成功数据

| 项目 | 契约记录 |
|---|---|
| 接口编号 | SYNC-API-01 |
| 功能模块 | 共用能力／跨端同步 |
| 使用页面／操作 | 双端基准更新、下派结果、数据 stale/error／查询同步状态／最后成功数据 |
| 接口用途与触发时机 | 按 tenant/layout 查询最新同步状态、最后成功时间与数据游标。 触发：进页、事件失联后回补、手动刷新。 |
| 类型（三选一） | 新增接口 |
| 既有能力／可直接使用／缺少字段 | 未发现可证明正式 HTTP endpoint 的数据；待后端确认。 |
| 建议 method／path | GET `/v3/frontend-layouts/sync-status?tenantId=&layoutId=` |
| 请求字段 | tenantId、layoutId、afterCursor |
| 回应字段 | status、cursor、lastSuccessfulAt、knownUpdateTime、errorReason、retryable |
| 关键 ID | tenantId、layoutId；按模块另含 domainId／languageCode／componentId／gameId。 |
| 对应字段实体 | ENT-SYNC |
| 权限点 | 版面查看 |
| 幂等键 | GET |
| 并发控制 | cursor 单调递增；knownUpdateTime 防倒退 |
| 错误码与前端提示 | 400 验证失败、403 无权限、404 对象不存在、409 版本冲突、422 业务阻挡、503 暂不可用；前端只显示业务原因与下一步。 |
| 数据来源 | 下派、代码模板版本、总控版面发布与商户发布的 outbox 事件；保底快照与商户覆盖分层保存 |
| 同步方向／线上影响 | 总控→商户只同步模板能力与保底快照，绝不覆盖商户覆盖；商户结果可回报总控状态。保底同步成功后，健康覆盖继续优先，覆盖无效才展示新版保底。 |
| 原型 Mock／四商户 | prototypeAcceptanceScenario；ready/loading/empty/error/stale。 1050 草稿／定时发布计划／三语；1048 停用／自动回滚；1052 未下派；1054 已配置／未配置／停用。 |
| 依赖／风险 | V3 登录会话、商户授权与三个基础权限；正式 API gateway 契约待确认。 风险：现有原型本机状态不能证明跨端口一致、幂等或并发安全。 |
| 开发状态 | 待后端确认，可与 DSP-API-04 共用资源 |
| 验收案例编号 | [S-01](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[S-02](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[S-03](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[S-04](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[P-02](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability) |
| 对应功能点编号 | [DSP-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-dsp-02) |

#### SYNC-API-02｜重试同步

| 项目 | 契约记录 |
|---|---|
| 接口编号 | SYNC-API-02 |
| 功能模块 | 共用能力／跨端同步 |
| 使用页面／操作 | 同步错误／过期状态－重试／重试同步 |
| 接口用途与触发时机 | 对可重试同步操作重新入列；保留上次成功数据且不得重复下派。 触发：用户点击重试或系统退避重试。 |
| 类型（三选一） | 新增接口 |
| 既有能力／可直接使用／缺少字段 | 未发现可证明正式 HTTP endpoint 的数据；待后端确认。 |
| 建议 method／path | POST `/v3/frontend-layouts/sync-operations/{syncOperationId}/retry` |
| 请求字段 | syncOperationId、knownUpdateTime、operationId |
| 回应字段 | newAttemptNo、status=queued、lastSuccessfulAt |
| 关键 ID | tenantId、layoutId；按模块另含 domainId／languageCode／componentId／gameId。 |
| 对应字段实体 | ENT-SYNC、ENT-AUD |
| 权限点 | 原操作所需基础权限；只读页的数据刷新可由版面查看触发 |
| 幂等键 | operationId；同一 attempt 只入列一次 |
| 并发控制 | 单 operation 排他锁；成功后重试回既有结果 |
| 错误码与前端提示 | 400 验证失败、403 无权限、404 对象不存在、409 版本冲突、422 业务阻挡、503 暂不可用；前端只显示业务原因与下一步。 |
| 数据来源 | 同步工作队列／outbox |
| 同步方向／线上影响 | 沿原方向；成功推进 cursor 线上影响：否 |
| 原型 Mock／四商户 | prototypeAcceptanceScenario；ready/loading/empty/error/stale。 1050 草稿／定时发布计划／三语；1048 停用／自动回滚；1052 未下派；1054 已配置／未配置／停用。 |
| 依赖／风险 | V3 登录会话、商户授权与三个基础权限；正式 API gateway 契约待确认。 风险：现有原型本机状态不能证明跨端口一致、幂等或并发安全。 |
| 开发状态 | 待后端确认重试权限与死信治理 |
| 验收案例编号 | [S-01](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[S-02](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[S-03](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[S-04](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[P-02](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability) |
| 对应功能点编号 | [DSP-02](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-dsp-02) |

### 功能说明书

#### HELP-API-01｜取得页面说明内容

| 项目 | 契约记录 |
|---|---|
| 接口编号 | HELP-API-01 |
| 功能模块 | 共用能力／功能说明书 |
| 使用页面／操作 | 总控／商户所有本专案页面／取得页面说明内容 |
| 接口用途与触发时机 | 按路由与后台语言加载正确功能说明，不改页面状态。 触发：打开页面或点击功能说明书入口。 |
| 类型（三选一） | 使用既有接口 |
| 既有能力／可直接使用／缺少字段 | 直接使用双端 `PageManual` registry 的 `import.meta.glob`／`getManual`（E-09）；内容可随前端版本发布。若 V3 另有 CMS，接口路径待后端确认但不阻挡现有能力。 |
| 建议 method／path | 无新增 HTTP；优先沿用既有 registry。 |
| 请求字段 | routeKey、locale（前端函数参数） |
| 回应字段 | PageManual 内容模型（前端本地模块） |
| 关键 ID | routeKey、locale、manualKey |
| 对应字段实体 | ENT-HELP |
| 权限点 | 版面查看 |
| 幂等键 | 本地只读 |
| 并发控制 | 随前端 build 版本一致 |
| 错误码与前端提示 | 缺少页面内容视为缺陷；不得展示技术占位文案。 |
| 数据来源 | V3 PageManual 页面内容 registry |
| 同步方向／线上影响 | 随前端部署；不参与配置跨端同步 线上影响：否 |
| 原型 Mock／四商户 | 双端既有 manual files；依 05-functional-guide-uat.md 验收。 1050 草稿／定时发布计划／三语；1048 停用／自动回滚；1052 未下派；1054 已配置／未配置／停用。 |
| 依赖／风险 | V3 登录会话、商户授权与三个基础权限；正式 API gateway 契约待确认。 风险：现有原型本机状态不能证明跨端口一致、幂等或并发安全。 |
| 开发状态 | 直接使用既有 V3 PageManual 前端能力；无 HTTP |
| 验收案例编号 | [F-01](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[F-02](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[F-03](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[F-04](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[F-05](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[F-06](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[F-07](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[F-08](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability)、[FI-01](../../ar-interface-acceptance-record/outputs/docs/02-executable-acceptance-matrix.md#interface-traceability) |
| 对应功能点编号 | [HELP-01](../../ar-prd-html/outputs/AR前端自定义配置-完整PRD.html#fp-help-01) |

## 7. 后端确认清单

1. 对所有「待后端确认」项补正式服务名称、endpoint、owner、数据库映射与完成日期；确认前不得把建议 path 当成既有接口。
2. 确认 V3 三个基础权限的双端正式 code 映射，且所有写入接口都有服务端守门。
3. 确认下派／同步 outbox、幂等键、CAS／ETag、主域名唯一有效绑定约束，以及解除与后续另行建立绑定两个操作的事务边界。
4. 确认数据错误／过期时保存最后成功快照的边界；任何快照都必须 tenant-scoped。
5. 确认功能说明书继续使用 PageManual registry；若 V3 已有 CMS，只替换内容来源，不改既有组件交互。
