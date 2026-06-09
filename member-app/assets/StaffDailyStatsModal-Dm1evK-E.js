import{_ as $,c as w,G as b,a as o,k as f,t as p,j as m,F as j,y as A,B as i,q as y,aS as C,Q as B,U as H,o as k,E as V,A as E,w as T}from"./index-CeZelR0e.js";import{u as N}from"./useModalHelper-D5zXvMDp.js";import U from"./StaffClockCorrectionModal-D_IRrFTe.js";import M from"./StaffOrderDetailModal-DSUTu7k0.js";import"./mockMerchant-Blwbi3iP.js";import"./renderSiteTag-DtW3p5EY.js";import"./ThirdPartyRecordModal-DkrhWBWm.js";const F={__name:"StaffDailyStatsModal",props:{staff:{type:Object,required:!0}},setup(_,{expose:a}){a();const{openModal:l}=N(),e=_,u=y(()=>{var t;return((t=e.staff)==null?void 0:t.timezone)||"UTC+5:30"}),d=t=>t==="--"||t==null,r=y(()=>[{value:e.staff.workDuration,label:"工作时长",color:"#36a2cc"},{value:`${e.staff.completedCount??"--"} / ${e.staff.processingCount??"--"}`,label:"已完成单次 / 处理中单数",color:d(e.staff.completedCount)?"#aaa":"#2563eb",tip:`<div>
      <div style="margin-bottom:8px">
        <div style="font-size:13px;font-weight:600;color:#e2e8f0;margin-bottom:3px">● 已完成单次</div>
        <div>统计已审核完成的次数</div>
        <div style="color:#94a3b8;margin-top:2px">包含：已提交、出款成功、人工确认、人工取消</div>
        <div style="color:#94a3b8;margin-top:2px">※ 若一笔订单被多人操作过会计算多次</div>
      </div>
      <div style="border-top:1px solid rgba(255,255,255,0.15);padding-top:8px">
        <div style="font-size:13px;font-weight:600;color:#e2e8f0;margin-bottom:3px">● 处理中单数</div>
        <div>统计当前正在处理中的订单单数</div>
      </div>
    </div>`},{value:`${e.staff.transferOutCount??"--"} / ${e.staff.transferInCount??"--"}`,label:"转出单次 / 转入单次",color:d(e.staff.transferOutCount)?"#aaa":"#2563eb",tip:`<div>
      <div style="margin-bottom:8px">
        <div style="font-size:13px;font-weight:600;color:#e2e8f0;margin-bottom:3px">● 转出单次</div>
        <div>统计自己转派给他人的总单次</div>
      </div>
      <div style="border-top:1px solid rgba(255,255,255,0.15);padding-top:8px">
        <div style="font-size:13px;font-weight:600;color:#e2e8f0;margin-bottom:3px">● 转入单次</div>
        <div>统计他人转派给自己的总单次</div>
      </div>
    </div>`},{value:e.staff.avgReviewTime,label:"审核平均耗时",color:"#2563eb",tip:`<div>
      <div style="font-size:13px;font-weight:600;color:#e2e8f0;margin-bottom:3px">● 审核平均耗时</div>
      <div>统计员工审核订单的平均耗时</div>
      <div style="color:#94a3b8;margin-top:2px">公式：总审核时长 / 已完成单次</div>
    </div>`},{value:String(e.staff.overtimeUnreviewed??"--"),label:"未审核订单超时次数",color:d(e.staff.overtimeUnreviewed)?"#aaa":"#e07b2a",tip:`<div>
      <div style="font-size:13px;font-weight:600;color:#e2e8f0;margin-bottom:3px">● 未审核订单超时次数</div>
      <div>订单派发后未开始审核，超过配置时间的次数</div>
    </div>`},{value:String(e.staff.overtimeReviewed??"--"),label:"审核订单超时订单数",color:d(e.staff.overtimeReviewed)?"#aaa":"#e07b2a",tip:`<div>
      <div style="font-size:13px;font-weight:600;color:#e2e8f0;margin-bottom:3px">● 审核订单超时订单数</div>
      <div>员工开始审核后，处理时间超过配置时间的订单数</div>
    </div>`},{value:`${e.staff.activePauseCount??"--"} / ${e.staff.timeoutPauseCount??"--"}`,label:"主动暂停总次数 / 超时暂停总次数",color:d(e.staff.activePauseCount)?"#aaa":"#2563eb",tip:`<div>
      <div style="margin-bottom:8px">
        <div style="font-size:13px;font-weight:600;color:#e2e8f0;margin-bottom:3px">● 主动暂停总次数</div>
        <div>统计员工自己操作暂停的总次数</div>
        <div style="color:#94a3b8;margin-top:2px">（只统计未超时的暂停）</div>
      </div>
      <div style="border-top:1px solid rgba(255,255,255,0.15);padding-top:8px">
        <div style="font-size:13px;font-weight:600;color:#e2e8f0;margin-bottom:3px">● 超时暂停总次数</div>
        <div>统计员工因以下原因的超时暂停总次数：</div>
        <div style="color:#94a3b8;margin-top:4px;padding-left:8px">- 未审核订单导致的超时暂停</div>
        <div style="color:#94a3b8;padding-left:8px">- 主动暂停导致的超时暂停</div>
      </div>
    </div>`},{value:`${e.staff.totalPauseDuration??"--"} / ${e.staff.avgPauseDuration??"--"}`,label:"暂停总时长 / 平均暂停时长",color:d(e.staff.totalPauseDuration)?"#aaa":"#36a2cc",tip:`<div>
      <div style="margin-bottom:8px">
        <div style="font-size:13px;font-weight:600;color:#e2e8f0;margin-bottom:3px">● 暂停总时长</div>
        <div>统计员工所有暂停类型的总时长：</div>
        <div style="color:#94a3b8;margin-top:4px;padding-left:8px">- 主动暂停</div>
        <div style="color:#94a3b8;padding-left:8px">- 未审核订单导致的超时暂停</div>
        <div style="color:#94a3b8;padding-left:8px">- 主动暂停导致的超时暂停</div>
      </div>
      <div style="border-top:1px solid rgba(255,255,255,0.15);padding-top:8px">
        <div style="font-size:13px;font-weight:600;color:#e2e8f0;margin-bottom:3px">● 平均暂停时长</div>
        <div>统计员工所有暂停类型的平均时长</div>
        <div style="color:#94a3b8;margin-top:2px">公式：暂停总时长 / 暂停总次数</div>
      </div>
    </div>`}]),P={"milo-组员02":[{date:"2026-02-18",workStatus:"未上班",clockIn:"--",clockOut:"--",workDuration:"--",completed:"--",processing:"--",transferOut:"--",transferIn:"--",avgReview:"--",overtimeUn:"--",overtimeRev:"--",activePause:"--",timeoutPause:"--",totalPause:"--",avgPause:"--"},{date:"2026-02-17",workStatus:"已上班",clockIn:"08:55:12",clockOut:"20:13:48",workDuration:"11h:18m:36s",completed:3,processing:"--",transferOut:1,transferIn:0,avgReview:"0m:38s",overtimeUn:1,overtimeRev:2,activePause:2,timeoutPause:1,totalPause:"4h:12m:10s",avgPause:"1h:24m:3s"},{date:"2026-02-16",workStatus:"已上班",clockIn:"09:01:00",clockOut:"19:45:30",workDuration:"10h:44m:30s",completed:2,processing:"--",transferOut:0,transferIn:1,avgReview:"1m:02s",overtimeUn:0,overtimeRev:1,activePause:1,timeoutPause:2,totalPause:"3h:05m:22s",avgPause:"1h:01m:47s"},{date:"2026-02-15",workStatus:"已上班",clockIn:"09:10:00",clockOut:"20:00:00",workDuration:"10h:50m:0s",completed:3,processing:"--",transferOut:1,transferIn:1,avgReview:"0m:45s",overtimeUn:1,overtimeRev:1,activePause:2,timeoutPause:2,totalPause:"5h:10m:08s",avgPause:"1h:17m:32s"},{date:"2026-02-14",workStatus:"未上班",clockIn:"--",clockOut:"--",workDuration:"--",completed:"--",processing:"--",transferOut:"--",transferIn:"--",avgReview:"--",overtimeUn:"--",overtimeRev:"--",activePause:"--",timeoutPause:"--",totalPause:"--",avgPause:"--"},{date:"2026-02-13",workStatus:"未上班",clockIn:"--",clockOut:"--",workDuration:"--",completed:"--",processing:"--",transferOut:"--",transferIn:"--",avgReview:"--",overtimeUn:"--",overtimeRev:"--",activePause:"--",timeoutPause:"--",totalPause:"--",avgPause:"--"},{date:"2026-02-12",workStatus:"已上班",clockIn:"09:05:00",clockOut:"18:58:00",workDuration:"9h:53m:0s",completed:4,processing:"--",transferOut:1,transferIn:0,avgReview:"0m:22s",overtimeUn:1,overtimeRev:1,activePause:1,timeoutPause:2,totalPause:"2h:48m:12s",avgPause:"56m:4s"},{date:"2026-02-11",workStatus:"已上班",clockIn:"09:00:00",clockOut:"19:30:00",workDuration:"10h:30m:0s",completed:2,processing:"--",transferOut:0,transferIn:0,avgReview:"0m:55s",overtimeUn:1,overtimeRev:1,activePause:1,timeoutPause:1,totalPause:"3h:22m:48s",avgPause:"1h:41m:24s"},{date:"2026-02-10",workStatus:"已上班",clockIn:"09:15:00",clockOut:"20:20:00",workDuration:"11h:5m:0s",completed:1,processing:"--",transferOut:0,transferIn:0,avgReview:"0m:30s",overtimeUn:1,overtimeRev:0,activePause:1,timeoutPause:1,totalPause:"2h:03m:16s",avgPause:"1h:01m:38s"},{date:"2026-02-09",workStatus:"已上班",clockIn:"09:00:00",clockOut:"18:30:00",workDuration:"9h:30m:0s",completed:0,processing:"--",transferOut:0,transferIn:0,avgReview:"--",overtimeUn:0,overtimeRev:0,activePause:0,timeoutPause:0,totalPause:"0m:0s",avgPause:"0m:0s"}]},z=[{date:"2026-02-18",workStatus:"未上班",clockIn:"--",clockOut:"--",workDuration:"--",completed:"--",processing:"--",transferOut:"--",transferIn:"--",avgReview:"--",overtimeUn:"--",overtimeRev:"--",activePause:"--",timeoutPause:"--",totalPause:"--",avgPause:"--"}],D=y(()=>P[e.staff.account]||z);function g(t){return i("div",{style:"display:flex;flex-direction:column;gap:2px;font-size:12px;line-height:1.5"},t.map(({label:s,value:n})=>i("div",null,[i("span",{style:"color:#9ca3af"},s+"："),i("span",{style:"color:#374151"},String(n??"--"))])))}function x(t,s="110px"){return i("div",{style:"display:flex;flex-direction:column;gap:2px;font-size:12px;line-height:1.8;white-space:nowrap;"},t.map(({label:n,value:c})=>i("div",{style:"display:flex;align-items:center;"},[i("span",{style:`color:#9ca3af;display:inline-block;width:${s};text-align:right;flex-shrink:0;`},n+"："),i("span",{style:"color:#374151;font-weight:500;"},String(c??"--"))])))}function v(t,s){return()=>i("div",{style:"display:inline-flex;align-items:center;gap:3px;white-space:nowrap;"},[i("span",null,t),i(C,{trigger:"hover",placement:"top",style:{maxWidth:"300px"}},{trigger:()=>i("span",{style:"display:inline-flex;align-items:center;justify-content:center;width:13px;height:13px;border-radius:50%;border:1px solid #9ca3af;font-size:9px;color:#9ca3af;cursor:pointer;flex-shrink:0;line-height:1;"},"?"),default:()=>i("div",{innerHTML:s,style:"font-size:12px;line-height:1.8;"})})])}const L=[{key:"date",title:()=>i("span",null,["日期 ",i("span",{style:"font-size:11px;color:#9ca3af;font-weight:400;"},`(${u.value})`)]),width:140},{key:"workStatus",title:"工作状态",width:80,render:t=>i("span",{style:`color:${t.workStatus==="未上班"?"#ef4444":"#22c55e"};font-size:12px`},t.workStatus)},{key:"clock",title:()=>i("span",null,["上班信息 ",i("span",{style:"font-size:11px;color:#9ca3af;font-weight:400;"},`(${u.value})`)]),width:190,render:t=>g([{label:"上班时间",value:t.clockIn},{label:"下班时间",value:t.clockOut},{label:"工作时长",value:t.workDuration}])},{key:"orders",title:v("订单统计",`<div>
      <div style="margin-bottom:8px">
        <div style="font-size:13px;font-weight:600;color:#e2e8f0;margin-bottom:3px">● 已完成单次</div>
        <div>统计已审核完成的次数</div>
        <div style="color:#94a3b8;margin-top:2px">包含：已提交、出款成功、人工确认、人工取消</div>
        <div style="color:#94a3b8;margin-top:2px">※ 若一笔订单被多人操作过会计算多次</div>
      </div>
      <div style="border-top:1px solid rgba(255,255,255,0.15);padding-top:8px">
        <div style="font-size:13px;font-weight:600;color:#e2e8f0;margin-bottom:3px">● 处理中单数</div>
        <div>统计当前正在处理中的订单单数</div>
      </div>
    </div>`),width:130,render:t=>g([{label:"已完成单次",value:t.completed},{label:"处理中单数",value:t.processing}])},{key:"transfer",title:v("转单统计",`<div>
      <div style="margin-bottom:8px">
        <div style="font-size:13px;font-weight:600;color:#e2e8f0;margin-bottom:3px">● 转出单次</div>
        <div>统计自己转派给他人的总单次</div>
      </div>
      <div style="border-top:1px solid rgba(255,255,255,0.15);padding-top:8px">
        <div style="font-size:13px;font-weight:600;color:#e2e8f0;margin-bottom:3px">● 转入单次</div>
        <div>统计他人转派给自己的总单次</div>
      </div>
    </div>`),width:130,render:t=>g([{label:"转出单次",value:t.transferOut},{label:"转入单次",value:t.transferIn}])},{key:"avgReview",title:v("审核平均耗时",`<div>
      <div style="font-size:13px;font-weight:600;color:#e2e8f0;margin-bottom:3px">● 审核平均耗时</div>
      <div>统计员工审核订单的平均耗时</div>
      <div style="color:#94a3b8;margin-top:2px">公式：总审核时长 / 已完成单次</div>
    </div>`),width:110,render:t=>i("span",{style:"font-size:12px"},t.avgReview)},{key:"overtime",title:v("超时信息",`<div>
      <div style="margin-bottom:8px">
        <div style="font-size:13px;font-weight:600;color:#e2e8f0;margin-bottom:3px">● 未审核订单超时次数</div>
        <div>订单派发后未开始审核，超过配置时间的次数</div>
      </div>
      <div style="border-top:1px solid rgba(255,255,255,0.15);padding-top:8px">
        <div style="font-size:13px;font-weight:600;color:#e2e8f0;margin-bottom:3px">● 审核订单超时订单数</div>
        <div>员工开始审核后，处理时间超过配置时间的订单数</div>
      </div>
    </div>`),width:180,render:t=>x([{label:"未审核订单超时次数",value:t.overtimeUn},{label:"审核订单超时订单数",value:t.overtimeRev}],"120px")},{key:"pause",title:v("暂停次数统计",`<div>
      <div style="margin-bottom:8px">
        <div style="font-size:13px;font-weight:600;color:#e2e8f0;margin-bottom:3px">● 主动暂停总次数</div>
        <div>统计员工自己操作暂停的总次数</div>
        <div style="color:#94a3b8;margin-top:2px">（只统计未超时的暂停）</div>
      </div>
      <div style="border-top:1px solid rgba(255,255,255,0.15);padding-top:8px">
        <div style="font-size:13px;font-weight:600;color:#e2e8f0;margin-bottom:3px">● 超时暂停总次数</div>
        <div>统计员工因以下原因的超时暂停总次数：</div>
        <div style="color:#94a3b8;margin-top:4px;padding-left:8px">- 未审核订单导致的超时暂停</div>
        <div style="color:#94a3b8;padding-left:8px">- 主动暂停导致的超时暂停</div>
      </div>
    </div>`),width:160,render:t=>x([{label:"主动暂停总次数",value:t.activePause},{label:"超时暂停总次数",value:t.timeoutPause}],"96px")},{key:"pauseDur",title:v("暂停时长统计",`<div>
      <div style="margin-bottom:8px">
        <div style="font-size:13px;font-weight:600;color:#e2e8f0;margin-bottom:3px">● 暂停总时长</div>
        <div>统计员工所有暂停类型的总时长：</div>
        <div style="color:#94a3b8;margin-top:4px;padding-left:8px">- 主动暂停</div>
        <div style="color:#94a3b8;padding-left:8px">- 未审核订单导致的超时暂停</div>
        <div style="color:#94a3b8;padding-left:8px">- 主动暂停导致的超时暂停</div>
      </div>
      <div style="border-top:1px solid rgba(255,255,255,0.15);padding-top:8px">
        <div style="font-size:13px;font-weight:600;color:#e2e8f0;margin-bottom:3px">● 平均暂停时长</div>
        <div>统计员工所有暂停类型的平均时长</div>
        <div style="color:#94a3b8;margin-top:2px">公式：暂停总时长 / 暂停总次数</div>
      </div>
    </div>`),width:180,render:t=>x([{label:"暂停总时长",value:t.totalPause},{label:"平均暂停时长",value:t.avgPause}],"84px")},{key:"action",title:"操作",width:140,fixed:"right",render:t=>t.workStatus==="未上班"?i("span",{style:"color:#aaa;font-size:12px"},"--"):i("div",{style:"display:flex;flex-direction:column;gap:4px"},[i("a",{style:"color:#2563eb;font-size:12px;cursor:pointer",onClick:()=>O(t)},"矫正上下班时间"),i("a",{style:"color:#2563eb;font-size:12px;cursor:pointer",onClick:()=>S(t)},"已处理订单明细")])}];function O(t){l(U,{staff:e.staff,row:t,onSave:s=>{const n=D.value.find(c=>c.date===t.date);n&&Object.assign(n,s)}},{title:"矫正上下班时间",width:"630px",height:"auto"})}function S(t){const s=h=>{if(!h||h==="--")return null;const I=new Date(h).getTime();return isNaN(I)?null:I},n=s(`${t.date} ${t.clockIn}`),c=t.clockOut&&t.clockOut!=="--"?t.clockOut.includes(" ")?s(t.clockOut):s(`${t.date} ${t.clockOut}`):null;l(M,{staff:{...e.staff,defaultTimeRange:n&&c?[n,c]:void 0}},{title:`已处理订单明细 — ${e.staff.account}`,width:"min(1600px, 98vw)"})}const R={openModal:l,props:e,staffTz:u,na:d,statCards:r,DAILY_DATA:P,DEFAULT_DAILY:z,dailyRows:D,lines:g,alignedLines:x,colTitle:v,dailyColumns:L,openClockCorrection:O,openDailyOrders:S,computed:y,h:i,get NDataTable(){return H},get NDivider(){return B},get NTooltip(){return C},get useModalHelper(){return N},StaffClockCorrectionModal:U,StaffOrderDetailModal:M};return Object.defineProperty(R,"__isScriptSetup",{enumerable:!1,value:!0}),R}},q={class:"sdm"},W={class:"sdm__block"},Y={class:"sdm__info-bar"},G={class:"sdm__em"},Q={class:"sdm__em"},J={class:"sdm__em"},K={class:"sdm__em sdm__em--link"},X={class:"sdm__em sdm__em--link"},Z={class:"sdm__block"},tt={class:"sdm__stat-grid"},et={class:"sdm__stat-lbl"},it=["innerHTML"],ot={class:"sdm__block"};function at(_,a,l,e,u,d){return k(),w("div",q,[b(" 员工信息 "),o("div",W,[a[5]||(a[5]=o("div",{class:"sdm__block-title"},"员工信息",-1)),o("div",Y,[o("span",null,[a[0]||(a[0]=f("账号：",-1)),o("em",G,p(l.staff.account),1)]),m(e.NDivider,{vertical:""}),o("span",null,[a[1]||(a[1]=f("姓名：",-1)),o("em",Q,p(l.staff.name),1)]),m(e.NDivider,{vertical:""}),o("span",null,[a[2]||(a[2]=f("职位：",-1)),o("em",J,p(l.staff.position),1)]),m(e.NDivider,{vertical:""}),o("span",null,[a[3]||(a[3]=f("角色：",-1)),o("em",K,p(l.staff.role),1)]),m(e.NDivider,{vertical:""}),o("span",null,[a[4]||(a[4]=f("时间：",-1)),o("em",X,p(l.staff.dateRangeText),1)])])]),b(" 数据汇总 "),o("div",Z,[a[7]||(a[7]=o("div",{class:"sdm__block-title"},"数据汇总",-1)),o("div",tt,[(k(!0),w(j,null,A(e.statCards,r=>(k(),w("div",{key:r.label,class:"sdm__stat-card"},[o("div",{class:"sdm__stat-val",style:V({color:r.color})},p(r.value),5),o("div",et,[f(p(r.label)+" ",1),r.tip?(k(),E(e.NTooltip,{key:0,trigger:"hover",placement:"top",style:{maxWidth:"300px"}},{trigger:T(()=>[...a[6]||(a[6]=[o("span",{class:"sdm__tip-icon"},"?",-1)])]),default:T(()=>[o("div",{innerHTML:r.tip,style:{"font-size":"12px","line-height":"1.8"}},null,8,it)]),_:2},1024)):b("v-if",!0)])]))),128))])]),b(" 每日明细 "),o("div",ot,[a[8]||(a[8]=o("div",{class:"sdm__block-title"},"每日明细",-1)),m(e.NDataTable,{columns:e.dailyColumns,data:e.dailyRows,size:"small",bordered:!0,"scroll-x":1270,"max-height":420},null,8,["data"])])])}const ct=$(F,[["render",at],["__scopeId","data-v-6bc986a1"],["__file","/var/lib/jenkins/workspace/game-beck/src/views-tenant/wallet/components/StaffDailyStatsModal.vue"]]);export{ct as default};
