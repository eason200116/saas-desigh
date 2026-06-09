import{ao as R,ap as B,d as L,B as c,aq as S,ar as h,as as _,at as k,q as g,au as y,av as p}from"./index-CeZelR0e.js";const I=R("input-group-label",`
 position: relative;
 user-select: none;
 -webkit-user-select: none;
 box-sizing: border-box;
 padding: 0 12px;
 display: inline-block;
 border-radius: var(--n-border-radius);
 background-color: var(--n-group-label-color);
 color: var(--n-group-label-text-color);
 font-size: var(--n-font-size);
 line-height: var(--n-height);
 height: var(--n-height);
 flex-shrink: 0;
 white-space: nowrap;
 transition: 
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
`,[B("border",`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 border-radius: inherit;
 border: var(--n-group-label-border);
 transition: border-color .3s var(--n-bezier);
 `)]),P=Object.assign(Object.assign({},h.props),{size:String,bordered:{type:Boolean,default:void 0}}),T=L({name:"InputGroupLabel",props:P,setup(e){const{mergedBorderedRef:l,mergedClsPrefixRef:r,inlineThemeDisabled:n,mergedComponentPropsRef:d}=S(e),v=h("Input","-input-group-label",I,y,e,r),{mergedSizeRef:u}=_(e,{mergedSize(i){var s,t;if(e.size!==void 0)return e.size;if(i)return i.mergedSize.value;const a=(t=(s=d==null?void 0:d.value)===null||s===void 0?void 0:s.Input)===null||t===void 0?void 0:t.size;return a||"medium"}}),b=g(()=>{const{value:i}=u,{common:{cubicBezierEaseInOut:s},self:{groupLabelColor:t,borderRadius:a,groupLabelTextColor:f,lineHeight:m,groupLabelBorder:z,[p("fontSize",i)]:C,[p("height",i)]:x}}=v.value;return{"--n-bezier":s,"--n-group-label-color":t,"--n-group-label-border":z,"--n-border-radius":a,"--n-group-label-text-color":f,"--n-font-size":C,"--n-line-height":m,"--n-height":x}}),o=n?k("input-group-label",g(()=>u.value[0]),b,e):void 0;return{mergedClsPrefix:r,mergedBordered:l,cssVars:n?void 0:b,themeClass:o==null?void 0:o.themeClass,onRender:o==null?void 0:o.onRender}},render(){var e,l,r;const{mergedClsPrefix:n}=this;return(e=this.onRender)===null||e===void 0||e.call(this),c("div",{class:[`${n}-input-group-label`,this.themeClass],style:this.cssVars},(r=(l=this.$slots).default)===null||r===void 0?void 0:r.call(l),this.mergedBordered?c("div",{class:`${n}-input-group-label__border`}):null)}});export{T as N};
