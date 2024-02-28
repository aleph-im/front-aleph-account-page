"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[992],{87931:function(e,t,n){n.d(t,{Z:function(){return c}});var r=n(85893),i=n(67294),a=n(41664),o=n.n(a),s=n(72771);let l=e=>{let{href:t,variant:n="secondary",color:i="main0",kind:a="default",size:l="md",disabled:c,children:d,...u}=e,m=(0,r.jsx)(s.zx,{as:"a",variant:n,color:i,kind:a,size:l,disabled:c,...u,children:d});return c?m:(0,r.jsx)(o(),{href:t,passHref:!0,legacyBehavior:!0,children:m})};l.displayName="ButtonLink";var c=(0,i.memo)(l)},68390:function(e,t,n){n.d(t,{HC:function(){return m},ZP:function(){return p}});var r=n(85893),i=n(19521),a=n(67294),o=n(72771);let s=i.ZP.div.withConfig({displayName:"styles__StyledContainer",componentId:"sc-lib0cf-0"})([""," background-color:#00000033;border:1px solid #ffffff19;box-shadow:0px 4px 24px 0px rgba(135,157,202,0.12);backdrop-filter:blur(50px);"],{position:"relative",display:"flex",flexDirection:"column",gap:"1.5rem",borderRadius:"1rem",padding:"1.5rem"}),l=i.ZP.div.attrs((0,o.PT)("tp-info")).withConfig({displayName:"styles__StyledTitle",componentId:"sc-lib0cf-1"})(["",""],{textTransform:"uppercase"});var c=n(11505);let d=e=>{let{name:t,value:n,big:a=!1,...o}=e,s=(0,i.Fg)();return(0,r.jsxs)(f,{...o,children:[(0,r.jsx)(h,{className:"tp-body3 fs-10",children:t}),(0,r.jsx)(y,{className:"".concat(a?"tp-body3 fs-16":"tp-body fs-12"),children:n||(0,r.jsx)(c.g4,{width:"1em",height:"1em",color:s.color.info})})]})};d.displayName="Card2Field";let u=e=>{let{title:t,children:n,...i}=e;return(0,r.jsxs)(s,{...i,children:[(0,r.jsx)(l,{children:t}),n]})};u.displayName="Card2";let m=(0,a.memo)(d);var p=(0,a.memo)(u),f=(0,i.ZP)("div").withConfig({displayName:"cmp___StyledDiv",componentId:"sc-cjcrrw-0"})({display:"flex",alignItems:"center"}),h=(0,i.ZP)("div").withConfig({displayName:"cmp___StyledDiv2",componentId:"sc-cjcrrw-1"})({marginRight:"1rem",whiteSpace:"nowrap",textTransform:"uppercase",opacity:"0.6"}),y=(0,i.ZP)("div").withConfig({displayName:"cmp___StyledDiv3",componentId:"sc-cjcrrw-2"})({marginLeft:"auto",maxWidth:"100%",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"})},77849:function(e,t,n){n.d(t,{Z:function(){return l}});var r=n(85893),i=n(19521),a=n(67294),o=n(72771);let s=e=>{let{children:t,isOwner:n,value:i,onChange:o,onBlur:s,onKeyDown:l,wrap:f=!1,...h}=e,[y,g]=(0,a.useState)(),v=(0,a.useRef)(null),w=(0,a.useCallback)(()=>{g(e=>e||!e)},[]),x=(0,a.useCallback)(e=>{g(!1),s&&s(e)},[s]),_=(0,a.useCallback)(e=>{["Escape","Enter","NumpadEnter"].includes(e.code)&&(g(!1),l&&l(e))},[l]),b=(0,a.useCallback)(e=>{var t;let n=null===(t=e.currentTarget)||void 0===t?void 0:t.textContent;o&&o(n)},[o]);return(0,a.useEffect)(()=>{v.current&&(v.current.textContent=i?i+"":null)},[i,y]),(0,a.useEffect)(()=>{v.current&&(v.current.focus(),function(e){if(!document.createRange)return;let t=document.createRange();t.selectNodeContents(e),t.collapse(!1);let n=window.getSelection();null==n||n.removeAllRanges(),null==n||n.addRange(t)}(v.current),v.current.scrollLeft=v.current.scrollWidth)},[y]),(0,r.jsxs)(c,{...h,children:[y?(0,r.jsx)(d,{ref:v,type:"text",disabled:!n,contentEditable:!0,onInput:b,onBlur:x,onKeyDown:_,suppressContentEditableWarning:!0,...h,$_css:[{minWidth:"1px",borderStyle:"none",outline:"2px solid transparent",outlineOffset:"2px"},!f&&{maxWidth:"100%",overflow:"hidden",whiteSpace:"nowrap"}]}):(0,r.jsx)(u,{$_css2:[!f&&{maxWidth:"100%",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}],children:t||i||"NONE"}),n&&(0,r.jsx)(m,{$_css3:[{display:"flex",flexShrink:"0",justifyContent:"flex-end",overflow:"hidden"},{maxWidth:y?"0":"1.75rem",transition:"max-width ease-in-out 0.25s 0s"}],children:(0,r.jsx)(p,{name:"edit",onClick:w})})]})};s.displayName="NodeDetailEditableField";var l=(0,a.memo)(s),c=(0,i.ZP)("div").withConfig({displayName:"cmp___StyledDiv",componentId:"sc-g2fwm8-0"})({display:"flex",alignItems:"baseline",overflow:"hidden"}),d=(0,i.ZP)("div").withConfig({displayName:"cmp___StyledDiv2",componentId:"sc-g2fwm8-1"})(["",""],e=>e.$_css),u=(0,i.ZP)("div").withConfig({displayName:"cmp___StyledDiv3",componentId:"sc-g2fwm8-2"})(["",""],e=>e.$_css2),m=(0,i.ZP)("div").withConfig({displayName:"cmp___StyledDiv4",componentId:"sc-g2fwm8-3"})(["",""],e=>e.$_css3),p=(0,i.ZP)(o.JO).withConfig({displayName:"cmp___StyledIcon",componentId:"sc-g2fwm8-4"})({marginLeft:"0.75rem",height:"0.875rem",width:"0.875rem",cursor:"pointer"})},1218:function(e,t,n){n.d(t,{Z:function(){return b}});var r=n(85893),i=n(67294),a=n(72771),o=n(19521);let s=o.ZP.input.withConfig({displayName:"styles__StyledHiddenFileInput",componentId:"sc-11emaos-0"})(["display:none;"]),l=(0,i.forwardRef)((e,t)=>{let{value:n,onChange:o,accept:l,children:c,error:d,label:u,resetValue:m="",...p}=e,f=(0,i.useRef)(null),h=(0,i.useCallback)(()=>{if(f.current){if(void 0!==m&&n&&n!==m){f.current.value="",o(m);return}f.current.click()}},[o,m,n]),y=(0,i.useCallback)(e=>{let t=e.target,{files:n}=t;if(n){let e=n[0];o(e)}},[o]);return(0,r.jsxs)("div",{tabIndex:-1,ref:t,onClick:h,...p,children:[u&&(0,r.jsx)(a.lX,{label:u,error:d,required:!0}),c,d&&(0,r.jsx)(a.Xq,{error:d}),(0,r.jsx)(s,{type:"file",ref:f,onChange:y,accept:l})]})});l.displayName="HiddenFileInput";var c=(0,i.memo)(l);let d=(0,o.ZP)(c).attrs(e=>({accept:"*.png,*.jpg,*.jpeg,*.svg",...e})).withConfig({displayName:"styles__StyledBackgroundEditInput",componentId:"sc-ysmt7e-0"})(["",";"],e=>{let{theme:t}=e;return(0,o.iv)([""," transition:all ease-in-out 0.25s 0s;background-color:","66;border-bottom-left-radius:100%;"],{position:"absolute",right:"-1rem",top:"-1rem",display:"flex",height:"3.5rem",width:"5rem",cursor:"pointer",alignItems:"center",justifyContent:"center",paddingBottom:"1.25rem",paddingLeft:"1.5rem",opacity:"0"},t.color.base1)}),u=o.ZP.div.withConfig({displayName:"styles__StyledContainer",componentId:"sc-ysmt7e-1"})(["",""],e=>{let{$backgroundUrl:t,$hash:n,theme:r}=e,i=Object.keys(r.gradient),a=(n||"").split("").reduce((e,t)=>t.charCodeAt(0)+e,0)%i.length,[s,l]=r.gradient[i[a]].colors,c=t?"url(".concat(t,")"):"linear-gradient(90deg, ".concat(s,"cc 0%, ").concat(l,"cc 100%)");return(0,o.iv)([""," background-image:",";background-position:center;background-size:cover;&:before{"," content:'';background:inherit;transition:transform 0.4s ease-in-out;}&:hover{&:before{","}& > ","{","}}"],{position:"relative",zIndex:"0",display:"flex",height:"12.5rem",flexDirection:"column",justifyContent:"flex-end",overflow:"hidden"},c,{position:"absolute",inset:"0px",transformOrigin:"center","--tw-scale-x":"1","--tw-scale-y":"1",transform:"translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))"},{"--tw-scale-x":"1.1","--tw-scale-y":"1.1",transform:"translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))"},d,{right:"0px",top:"0px",opacity:"1"})}),m=o.ZP.h1.attrs((0,a.PT)("tp-h5")).withConfig({displayName:"styles__StyledTitle",componentId:"sc-ysmt7e-2"})(["",";"],e=>{let{theme:t}=e;return(0,o.iv)([""," color:",";background-color:","E5;"],{zIndex:"10",margin:"0px",paddingLeft:"1.5rem",paddingRight:"1.5rem",paddingTop:"0.125rem",paddingBottom:"0.125rem"},t.color.text,t.color.base1)}),p=o.ZP.h2.attrs((0,a.PT)("tp-body3")).withConfig({displayName:"styles__StyledDescription",componentId:"sc-ysmt7e-3"})(["",";"],e=>{let{theme:t}=e;return(0,o.iv)([""," color:",";"],{margin:"0px",paddingLeft:"1.5rem",paddingRight:"1.5rem",paddingTop:"0.75rem",paddingBottom:"0.75rem"},t.color.text)}),f=(0,o.ZP)(c).attrs(e=>({accept:"*.png,*.jpg,*.jpeg,*.svg",...e})).withConfig({displayName:"styles__StyledNodeAvatarEditInput",componentId:"sc-ysmt7e-4"})(["",";"],e=>{let{theme:t}=e;return(0,o.iv)([""," transition:all ease-in-out 0.25s 0s;background-color:","66;border-radius:50%;"],{position:"absolute",inset:"0px",display:"flex",cursor:"pointer",alignItems:"center",justifyContent:"center",opacity:"0"},t.color.base1)}),h=o.ZP.div.withConfig({displayName:"styles__StyledNodeAvatarContainer",componentId:"sc-ysmt7e-5"})([""," &:hover > ","{","}"],{position:"relative",zIndex:"10",marginLeft:"1.5rem",marginRight:"1.5rem",marginTop:"1rem",marginBottom:"1rem",display:"inline-flex",overflow:"hidden"},f,{opacity:"1"}),y=(0,o.ZP)(a.pN).attrs(e=>({size:"lg",...e})).withConfig({displayName:"styles__StyledNodeAvatar",componentId:"sc-ysmt7e-6"})([""]);var g=n(77849),v=n(33358),w=n(34853);function x(e){let{file:t}=e,[n,r]=(0,i.useState)();return(0,i.useEffect)(()=>{(async function(){let e;if(!t){r(void 0);return}t instanceof File&&(e=await (0,w.s5)(t)),"string"==typeof t&&((e=new Image).src="".concat(v.pf,"/api/v0/storage/raw/").concat(t)),e&&r(e)})()},[t]),{img:n}}let _=e=>{let{nameCtrl:t,descriptionCtrl:n,bannerCtrl:i,pictureCtrl:o,isOwner:s,node:l,...c}=e,{img:v}=x({file:o.field.value}),{img:w}=x({file:i.field.value});return(0,r.jsxs)("div",{...c,children:[(0,r.jsxs)(u,{$hash:null==l?void 0:l.hash,$backgroundUrl:null==w?void 0:w.src,children:[s&&(0,r.jsx)(d,{...i.field,...i.fieldState,resetValue:null==l?void 0:l.banner,children:i.field.value!==(null==l?void 0:l.banner)?(0,r.jsx)(a.JO,{name:"trash"}):(0,r.jsx)(a.JO,{name:"edit"})}),(0,r.jsx)("div",{children:(0,r.jsxs)(h,{children:[(0,r.jsx)(y,{src:null==v?void 0:v.src}),s&&(0,r.jsx)(f,{...o.field,...o.fieldState,resetValue:null==l?void 0:l.picture,children:o.field.value!==(null==l?void 0:l.picture)?(0,r.jsx)(a.JO,{name:"trash"}):(0,r.jsx)(a.JO,{name:"edit"})})]})}),(0,r.jsx)(m,{children:(0,r.jsx)(g.Z,{...t.field,...t.fieldState,placeholder:"name",isOwner:s})})]}),(n.field.value||s)&&(0,r.jsx)(p,{children:(0,r.jsx)(g.Z,{...n.field,...n.fieldState,placeholder:"description",isOwner:s,wrap:!0})})]})};_.displayName="NodeDetailHeader";var b=(0,i.memo)(_)},43666:function(e,t,n){n.d(t,{Z:function(){return d}});var r=n(85893),i=n(19521),a=n(67294),o=n(41664),s=n.n(o),l=n(72771);let c=e=>{let{href:t,children:n,isOwner:i,...a}=e,o=(0,r.jsx)(u,{children:n||"NONE"});return(0,r.jsx)(r.Fragment,{children:t?(0,r.jsxs)(m,{href:t,target:"_blank",...a,children:[o,!i&&(0,r.jsx)(p,{name:"external-link-square-alt"})]}):(0,r.jsx)(f,{children:o})})};c.displayName="NodeDetailLink";var d=(0,a.memo)(c),u=(0,i.ZP)("span").withConfig({displayName:"cmp___StyledSpan",componentId:"sc-1nkwyfg-0"})({flex:"1 1 0%",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}),m=(0,i.ZP)(s()).withConfig({displayName:"cmp___StyledLink",componentId:"sc-1nkwyfg-1"})({display:"flex",width:"100%",alignItems:"center"}),p=(0,i.ZP)(l.JO).withConfig({displayName:"cmp___StyledIcon",componentId:"sc-1nkwyfg-2"})({marginLeft:"0.75rem",height:"0.875rem",width:"0.875rem"}),f=(0,i.ZP)("span").withConfig({displayName:"cmp___StyledSpan2",componentId:"sc-1nkwyfg-3"})({display:"flex",width:"100%",alignItems:"center"})},8978:function(e,t,n){n.d(t,{Z:function(){return p}});var r=n(85893),i=n(19521),a=n(67294),o=n(72771);let s=(0,i.ZP)(o.cu).attrs(e=>{let{$status:t,...n}=e;return{$color:"active"===t||"linked"===t?"main1":"main2",...n}}).withConfig({displayName:"styles__StyledStatusIcon",componentId:"sc-1qd83xw-0"})([""]),l=e=>{let{status:t,...n}=e;return(0,r.jsxs)(d,{...n,children:[(0,r.jsx)(s,{$status:t}),(0,r.jsx)(u,{className:"tp-body3",children:t})]})};l.displayName="NodeStatus";var c=(0,a.memo)(l),d=(0,i.ZP)("div").withConfig({displayName:"cmp___StyledDiv",componentId:"sc-b7ni1q-0"})({display:"flex",alignItems:"center",gap:"0.375rem",paddingTop:"0.375rem"}),u=(0,i.ZP)("span").withConfig({displayName:"cmp___StyledSpan",componentId:"sc-b7ni1q-1"})({textTransform:"capitalize"});let m=e=>{let{status:t,...n}=e;return(0,r.jsxs)(f,{...n,children:[(0,r.jsx)("div",{className:"tp-body fs-10",children:"STATUS"}),(0,r.jsx)(c,{status:t||"waiting"})]})};m.displayName="NodeDetailStatus";var p=(0,a.memo)(m),f=(0,i.ZP)("div").withConfig({displayName:"cmp___StyledDiv",componentId:"sc-jhruyg-0"})({backgroundColor:"#00000033",paddingLeft:"0.75rem",paddingRight:"0.75rem",paddingTop:"0.375rem",paddingBottom:"0.375rem"})},6309:function(e,t,n){n.d(t,{t:function(){return c},Z:function(){return d}});var r=n(85893),i=n(67294),a=n(19521);let o=a.ZP.span.withConfig({displayName:"styles__StyledPrice",componentId:"sc-ouxjcu-0"})(["",""],{display:"inline-flex",alignItems:"center",gap:"0.25rem",whiteSpace:"nowrap"});var s=n(72771),l=n(34853);let c=e=>{let{value:t,...n}=e;return(0,r.jsxs)(o,{...n,children:[(0,l.RK)(t),(0,r.jsx)(s.TR,{color:"currentColor"})]})};c.displayName="Price";var d=(0,i.memo)(c)},7954:function(e,t,n){n.d(t,{Z:function(){return r.Z}});var r=n(6309)},10159:function(e,t,n){n.d(t,{c:function(){return s}});var r=n(72771),i=n(67294),a=n(87536),o=n(1604);function s(e){let{onSubmit:t,onSuccess:n,onError:s,readyDeps:l=[],...c}=e,d=(0,a.cI)(c);(0,i.useEffect)(()=>{"object"==typeof c.defaultValues&&d.reset(c.defaultValues)},[...l]);let[u,m]=(0,i.useState)({data:void 0,error:void 0,loading:!1}),[p,{onLoad:f,onSuccess:h,onError:y}]=(0,r.g7)({flushData:!0,state:u,setState:m,onSuccess:n,onError:s}),g=(0,i.useCallback)(async e=>{try{f();let n=await t(e);h(n)}catch(t){let e=t instanceof o.jm?Error("Validation error, check highlighted form fields"):(null==t?void 0:t.cause)||t;d.setError("root.serverError",{...e,message:null==e?void 0:e.message}),y(e)}},[d,y,f,t,h]),v=(0,i.useCallback)(async e=>{let t;if(console.log(e),!t){let n=function e(t){let[n]=Object.entries(t);if(!n)return;let[r,i]=n;if(Array.isArray(i)){let t=i[i.length-1];return e(t)}return[r,i]}(e);if(n){let[e,r]=n,i="string"==typeof r?r:(null==r?void 0:r.message)?": ".concat(r.message):(null==r?void 0:r.type)?': "'.concat(null==r?void 0:r.type,'" validation not satisfied'):"";t=Error('Error on field "'.concat(e,'"').concat(i))}}t||(t=Error("Validation error")),y(t)},[y]),w=(0,i.useMemo)(()=>d.handleSubmit(g,v),[d,g,v]);return{...d,requestState:p,handleSubmit:w}}},73384:function(e,t,n){n.d(t,{i:function(){return c}});var r=n(94461),i=n(48107),a=n(91421),o=n(72771),s=n(67294),l=n(58193);function c(){let[e,t]=(0,r.mr)(),{account:n}=e.account,{entities:c}=e.crns,d=(0,s.useMemo)(()=>new i.B(n),[n]),u=(0,o.lm)(),{userNode:m}=(0,l.h)({}),p=(0,s.useCallback)(async e=>{try{if(!u)throw Error("Notification not ready");if(!n)throw Error("Invalid account");if(!m)throw Error("Invalid user node");let r=null==c?void 0:c.find(t=>t.hash===e);if(!r)throw Error("Invalid staking node");if(!d.isLinkable(r,m)||d.isUserLinked(r,m))throw Error("Not linkable node");await d.linkComputeResourceNode(e),u.add({variant:"success",title:"Success",text:'Linked resource node "'.concat(e,'" successfully.')});let[i,o]=function(e,t){let n={...t,virtual:Date.now()},r={...e,virtual:Date.now()};n.parent=r.hash,n.parentData=r;let i=r.crnsData.reduce((e,t)=>(e[t.hash]=t,e),{});return i[n.hash]=n,r.crnsData=Object.values(i),r.resource_nodes=Object.keys(i),[r,n]}(m,r);return t(new a.Wy({name:"ccns",entities:[i]})),t(new a.Wy({name:"crns",entities:[o]})),!0}catch(e){null==u||u.add({variant:"error",title:"Error",text:e.message})}return!1},[n,t,d,c,u,m]),f=(0,s.useCallback)(async e=>{try{if(!u)throw Error("Notification not ready");if(!n)throw Error("Invalid account");if(!m)throw Error("Invalid user node");let r=null==c?void 0:c.find(t=>t.hash===e);if(!r)throw Error("Invalid staking node");if(!d.isUserLinked(r,m))throw Error("Not linkable node");await d.unlinkComputeResourceNode(e),u.add({variant:"success",title:"Success",text:'Unlinked resource node "'.concat(e,'" successfully.')});let[i,o]=function(e,t){let n={...t,virtual:Date.now()},r={...e,virtual:Date.now()};n.parent="",n.parentData=void 0;let i=r.crnsData.filter(e=>e.hash!==n.hash);return r.crnsData=i,r.resource_nodes=i.map(e=>e.hash),[r,n]}(m,r);return t(new a.Wy({name:"ccns",entities:[i]})),t(new a.Wy({name:"crns",entities:[o]})),!0}catch(e){null==u||u.add({variant:"error",title:"Error",text:e.message})}return!1},[n,t,d,c,u,m]);return{handleLink:p,handleUnlink:f}}},15457:function(e,t,n){n.d(t,{_:function(){return c}});var r=n(67294),i=n(11163),a=n(72771),o=n(48107),s=n(94461),l=n(91421);function c(e){var t;let{node:n,nodes:c}=e,d=(0,i.useRouter)(),u=(0,a.lm)(),[m,p]=(0,s.mr)(),{account:f}=m.account,h=(0,r.useMemo)(()=>new o.B(f),[f]),y=(0,r.useMemo)(()=>n?h.isCRN(n):void 0,[h,n]),g=(0,r.useCallback)(async()=>{if(n){if(!u)throw Error("Notification not ready");try{let e=null==n?void 0:n.hash;await h.removeNode(e),u.add({variant:"success",title:"Success",text:'Your node "'.concat(n.hash,'" was deleted successfully.')}),p(new l.gg({name:y?"crns":"ccns",keys:[e]})),d.replace("/earn/".concat(y?"crn":"ccn"))}catch(e){null==u||u.add({variant:"error",title:"Error",text:e.message})}}},[p,y,n,h,u,d]),{nodes_with_identical_asn:v}=(null==n?void 0:null===(t=n.scoreData)||void 0===t?void 0:t.measurements)||{},{base_latency:w,measured_at:x}=(null==n?void 0:n.metricsData)||{},_=(0,r.useMemo)(()=>w?"".concat(Number(100*(w||0)).toFixed(2)," %"):void 0,[w]),b=(0,r.useMemo)(()=>{if(!x)return;let e=new Date(1e3*x);return"".concat(e.toLocaleDateString()," (").concat(e.toLocaleTimeString(),")")},[x]),N=(0,r.useMemo)(()=>{if(!n)return;let e=new Date((null==n?void 0:n.time)*1e3);return"".concat(e.toLocaleDateString())},[n]),j=(0,r.useMemo)(()=>(null==n?void 0:n.owner)===(null==f?void 0:f.address),[f,n]);return{node:n,nodesOnSameASN:v,baseLatency:_,lastMetricsCheck:b,creationDate:N,isOwner:j,handleRemove:g}}},58193:function(e,t,n){n.d(t,{h:function(){return o}});var r=n(94461),i=n(67294),a=n(69797);function o(e){let{nodes:t}=e,[n]=(0,r.mr)(),{entities:o}=n.ccns,{userNodes:s}=(0,a.M)({nodes:t||o}),l=(0,i.useMemo)(()=>null==s?void 0:s[0],[s]);return{userNode:l}}}}]);