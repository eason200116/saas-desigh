import{_ as S,c as U,G as g,a as d,j as a,w as l,k as x,r as u,B as i,q as h,R as B,b9 as M,aS as C,D as k,O as j,N as K,T as V,U as W,X as H,o as Q}from"./index-CeZelR0e.js";import{u as R}from"./useModalHelper-D5zXvMDp.js";import _ from"./StaffDailyStatsModal-Dm1evK-E.js";import z from"./StaffOrderDetailModal-DSUTu7k0.js";import{I as q}from"./InfoCircleOutlined-DsX1lV5o.js";import"./StaffClockCorrectionModal-D_IRrFTe.js";import"./mockMerchant-Blwbi3iP.js";import"./renderSiteTag-DtW3p5EY.js";import"./ThirdPartyRecordModal-DkrhWBWm.js";const E={__name:"WithdrawStaffReportTab",setup(D,{expose:o}){o();const{openModal:v}=R(),t=(()=>{const e=new Date("2026-02-18").getTime();return[new Date("2026-02-09").getTime(),e]})(),p=u(t),c=u(""),n=u("");function T(){n.value=c.value.trim()}function P(){p.value=t,c.value="",n.value=""}const f=u([{id:1,account:"milo-组员02",name:"milo-组员02",position:"组员",role:"远程-组员",completedCount:15,processingCount:"--",transferOutCount:3,transferInCount:2,avgReviewTime:"0m:40s",workDuration:"1d:10h:10m:47s",overtimeUnreviewed:5,overtimeReviewed:6,activePauseCount:8,timeoutPauseCount:9,totalPauseDuration:"2d:6h:51m:54s",avgPauseDuration:"4h:13m:13s",dateRangeText:"2026-02-09 至 2026-02-18"},{id:2,account:"milo-组长01",name:"milo-组长01",position:"组长",role:"远程-组长",completedCount:3,processingCount:"--",transferOutCount:1,transferInCount:0,avgReviewTime:"0m:28s",workDuration:"2d:1h:18m:33s",overtimeUnreviewed:"--",overtimeReviewed:"--",activePauseCount:"--",timeoutPauseCount:"--",totalPauseDuration:"--",avgPauseDuration:"--",dateRangeText:"2026-02-09 至 2026-02-18"},{id:3,account:"luna01",name:"luna01",position:"组员",role:"远程-组员",completedCount:3,processingCount:"--",transferOutCount:0,transferInCount:1,avgReviewTime:"17m:14s",workDuration:"2d:7h:24m:42s",overtimeUnreviewed:2,overtimeReviewed:6,activePauseCount:8,timeoutPauseCount:5,totalPauseDuration:"4d:3h:36m:58s",avgPauseDuration:"9h:57m:41s",dateRangeText:"2026-02-09 至 2026-02-18"},{id:4,account:"luna03",name:"luna03",position:"组员",role:"远程-组员",completedCount:3,processingCount:"--",transferOutCount:2,transferInCount:3,avgReviewTime:"1h:3m:16s",workDuration:"16h:1m:6s",overtimeUnreviewed:3,overtimeReviewed:3,activePauseCount:2,timeoutPauseCount:5,totalPauseDuration:"3h:46m:40s",avgPauseDuration:"45m:20s",dateRangeText:"2026-02-09 至 2026-02-18"},{id:5,account:"milo-组长02",name:"milo-组长02",position:"组长",role:"远程-组长",completedCount:2,processingCount:"--",transferOutCount:"--",transferInCount:"--",avgReviewTime:"0m:13s",workDuration:"1d:22h:22m:19s",overtimeUnreviewed:"--",overtimeReviewed:"--",activePauseCount:1,timeoutPauseCount:"--",totalPauseDuration:"0m:21s",avgPauseDuration:"0m:21s",dateRangeText:"2026-02-09 至 2026-02-18"}]),N=h(()=>n.value?f.value.filter(e=>e.account.includes(n.value)):f.value);function y(e){v(_,{staff:{...e,timezone:e.timezone||"UTC+5:30"}},{title:"员工报表详情",width:"1410px"})}function w(e){v(z,{staff:e,defaultTimeRange:e.defaultTimeRange||p.value},{title:`已处理订单明细 — ${e.account}`,width:"min(1600px, 98vw)"})}function r(e,m){return()=>i("div",{style:"display:inline-flex;align-items:center;gap:3px;white-space:nowrap;"},[i("span",null,e),i(C,{trigger:"hover",placement:"top",style:{maxWidth:"300px"}},{trigger:()=>i("span",{style:"display:inline-flex;align-items:center;justify-content:center;width:13px;height:13px;border-radius:50%;border:1px solid #9ca3af;font-size:9px;color:#9ca3af;cursor:pointer;flex-shrink:0;line-height:1;"},"?"),default:()=>i("div",{innerHTML:m,style:"font-size:12px;line-height:1.8;"})})])}function s(e){return i("div",{style:"display:flex;flex-direction:column;gap:2px;font-size:12px;line-height:1.6"},e.map(({label:m,value:O})=>i("div",null,[i("span",{style:"color:#9ca3af"},m+"："),i("span",{style:"color:#374151"},String(O??"--"))])))}const I=[{key:"id",title:"序号",width:60},{key:"account",title:"账号",width:110},{key:"position",title:"职位",width:80,render:e=>i(k,{type:e.position==="组长"?"warning":"success",size:"small",bordered:!1},()=>e.position)},{key:"role",title:"系统角色",width:100,render:e=>i("span",{style:"font-size:12px"},e.role)},{key:"timezone",title:"统计时区",width:100,render:e=>i("span",{style:"display:inline-block;padding:1px 8px;border-radius:4px;font-size:12px;font-weight:500;background:#eff6ff;color:#2563eb;border:1px solid #bfdbfe;"},e.timezone||"UTC+5:30")},{key:"orders",title:r("订单统计",`<div>
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
    </div>`),width:140,render:e=>s([{label:"已完成单次",value:e.completedCount},{label:"处理中单数",value:e.processingCount}])},{key:"transfer",title:r("转单统计",`<div>
      <div style="margin-bottom:8px">
        <div style="font-size:13px;font-weight:600;color:#e2e8f0;margin-bottom:3px">● 转出单次</div>
        <div>统计自己转派给他人的总单次</div>
      </div>
      <div style="border-top:1px solid rgba(255,255,255,0.15);padding-top:8px">
        <div style="font-size:13px;font-weight:600;color:#e2e8f0;margin-bottom:3px">● 转入单次</div>
        <div>统计他人转派给自己的总单次</div>
      </div>
    </div>`),width:140,render:e=>s([{label:"转出单数",value:e.transferOutCount},{label:"转入单数",value:e.transferInCount}])},{key:"avgReviewTime",title:r("审核平均耗时",`<div>
      <div style="font-size:13px;font-weight:600;color:#e2e8f0;margin-bottom:3px">● 审核平均耗时</div>
      <div>统计员工审核订单的平均耗时</div>
      <div style="color:#94a3b8;margin-top:2px">公式：总审核时长 / 已完成单次</div>
    </div>`),width:110,render:e=>i("span",{style:"font-size:12px"},e.avgReviewTime)},{key:"workDuration",title:r("工作时长统计",`<div>
      <div style="font-size:13px;font-weight:600;color:#e2e8f0;margin-bottom:3px">● 工作时长统计</div>
      <div>统计员工在统计周期内的累计上班时长</div>
      <div style="color:#94a3b8;margin-top:2px">公式：下班时间 − 上班时间（扣除暂停时长）</div>
    </div>`),width:160,render:e=>i("span",{style:"font-size:12px"},e.workDuration)},{key:"overtime",title:r("超时统计",`<div>
      <div style="margin-bottom:8px">
        <div style="font-size:13px;font-weight:600;color:#e2e8f0;margin-bottom:3px">● 未审核订单超时次数</div>
        <div>订单派发后未开始审核，超过配置时间的次数</div>
      </div>
      <div style="border-top:1px solid rgba(255,255,255,0.15);padding-top:8px">
        <div style="font-size:13px;font-weight:600;color:#e2e8f0;margin-bottom:3px">● 审核订单超时订单数</div>
        <div>员工开始审核后，处理时间超过配置时间的订单数</div>
      </div>
    </div>`),width:180,render:e=>s([{label:"未审核订单超时次数",value:e.overtimeUnreviewed},{label:"审核订单超时订单数",value:e.overtimeReviewed}])},{key:"pause",title:r("暂停次数统计",`<div>
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
    </div>`),width:160,render:e=>s([{label:"主动暂停总次数",value:e.activePauseCount},{label:"超时暂停总次数",value:e.timeoutPauseCount}])},{key:"pauseDur",title:r("暂停时长统计",`<div>
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
    </div>`),width:200,render:e=>i("div",{style:"display:grid;grid-template-columns:max-content 1fr;gap:0 4px;font-size:12px;line-height:1.9;white-space:nowrap;"},[i("span",{style:"color:#9ca3af;text-align:right;"},"暂停总时长："),i("span",{style:"color:#374151;"},String(e.totalPauseDuration??"--")),i("span",{style:"color:#9ca3af;text-align:right;"},"平均暂停时长："),i("span",{style:"color:#374151;"},String(e.avgPauseDuration??"--"))])},{key:"action",title:"操作",width:140,fixed:"right",render:e=>i("div",{style:"display:flex;flex-direction:column;gap:4px"},[i("a",{style:"color:#2563eb;font-size:12px;cursor:pointer",onClick:()=>y(e)},"每日统计数据"),i("a",{style:"color:#2563eb;font-size:12px;cursor:pointer",onClick:()=>w(e)},"已处理订单明细")])}],b={openModal:v,defaultRange:t,dateRange:p,accountKeyword:c,filterKeyword:n,handleQuery:T,handleReset:P,allRows:f,filteredRows:N,openDailyStats:y,openOrderDetail:w,colTitle:r,lines:s,columns:I,computed:h,h:i,ref:u,get NButton(){return H},get NDataTable(){return W},get NDatePicker(){return V},get NIcon(){return K},get NInput(){return j},get NTag(){return k},get NTooltip(){return C},get SearchOutlined(){return M},get ReloadOutlined(){return B},get InfoCircleOutlined(){return q},get useModalHelper(){return R},StaffDailyStatsModal:_,StaffOrderDetailModal:z};return Object.defineProperty(b,"__isScriptSetup",{enumerable:!1,value:!0}),b}},G={class:"wsrt"},L={class:"wsrt__search"},X={class:"wsrt__search-item"},A={class:"wsrt__search-item"},F={class:"wsrt__tip"};function J(D,o,v,t,p,c){return Q(),U("div",G,[g(" 搜索栏 "),d("div",L,[d("div",X,[o[2]||(o[2]=d("span",{class:"wsrt__search-label"},"日期范围",-1)),a(t.NDatePicker,{value:t.dateRange,"onUpdate:value":o[0]||(o[0]=n=>t.dateRange=n),type:"daterange",clearable:"",size:"small",style:{width:"300px"}},null,8,["value"])]),d("div",A,[o[3]||(o[3]=d("span",{class:"wsrt__search-label"},"员工账号",-1)),a(t.NInput,{value:t.accountKeyword,"onUpdate:value":o[1]||(o[1]=n=>t.accountKeyword=n),placeholder:"请输入账号",clearable:"",size:"small",style:{width:"160px"}},null,8,["value"])]),a(t.NButton,{type:"primary",size:"small",onClick:t.handleQuery},{icon:l(()=>[a(t.NIcon,null,{default:l(()=>[a(t.SearchOutlined)]),_:1})]),default:l(()=>[o[4]||(o[4]=x(" 查询 ",-1))]),_:1}),a(t.NButton,{size:"small",onClick:t.handleReset},{icon:l(()=>[a(t.NIcon,null,{default:l(()=>[a(t.ReloadOutlined)]),_:1})]),default:l(()=>[o[5]||(o[5]=x(" 重置 ",-1))]),_:1})]),g(" 提示 "),d("div",F,[a(t.NIcon,{size:"14",color:"#2563eb"},{default:l(()=>[a(t.InfoCircleOutlined)]),_:1}),o[6]||(o[6]=x(" 提示：开始时间必选且距今不超过65天；结束时间可选，若选规则与开始时间跨度不能超过35天 ",-1))]),g(" 表格 "),a(t.NDataTable,{columns:t.columns,data:t.filteredRows,size:"small",bordered:!0,"scroll-x":1560,style:{"margin-top":"12px"}},null,8,["data"])])}const re=S(E,[["render",J],["__scopeId","data-v-dc76db6a"],["__file","/var/lib/jenkins/workspace/game-beck/src/views-tenant/wallet/components/WithdrawStaffReportTab.vue"]]);export{re as default};
