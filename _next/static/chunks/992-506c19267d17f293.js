"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[992],{87931:function(e,t,n){n.d(t,{Z:function(){return c}});var r=n(85893),a=n(67294),i=n(41664),o=n.n(i),l=n(72771);let s=e=>{let{href:t,variant:n="secondary",color:a="main0",kind:i="default",size:s="md",disabled:c,children:d,...u}=e,m=(0,r.jsx)(l.zx,{as:"a",variant:n,color:a,kind:i,size:s,disabled:c,...u,children:d});return c?m:(0,r.jsx)(o(),{href:t,passHref:!0,legacyBehavior:!0,children:m})};s.displayName="ButtonLink";var c=(0,a.memo)(s)},68390:function(e,t,n){n.d(t,{HC:function(){return m},ZP:function(){return p}});var r=n(85893),a=n(19521),i=n(67294),o=n(72771);let l=a.ZP.div.withConfig({displayName:"styles__StyledContainer",componentId:"sc-lib0cf-0"})([""," background-color:#00000033;border:1px solid #ffffff19;box-shadow:0px 4px 24px 0px rgba(135,157,202,0.12);backdrop-filter:blur(50px);"],{position:"relative",display:"flex",flexDirection:"column",gap:"1.5rem",borderRadius:"1rem",padding:"1.5rem"}),s=a.ZP.div.attrs((0,o.PT)("tp-info")).withConfig({displayName:"styles__StyledTitle",componentId:"sc-lib0cf-1"})(["",""],{textTransform:"uppercase"});var c=n(11505);let d=e=>{let{name:t,value:n,big:i=!1,...o}=e,l=(0,a.Fg)();return(0,r.jsxs)(f,{...o,children:[(0,r.jsx)(h,{className:"tp-body3 fs-10",children:t}),(0,r.jsx)(y,{className:"".concat(i?"tp-body3 fs-16":"tp-body fs-12"),children:n||(0,r.jsx)(c.g4,{width:"1em",height:"1em",color:l.color.info})})]})};d.displayName="Card2Field";let u=e=>{let{title:t,children:n,...a}=e;return(0,r.jsxs)(l,{...a,children:[(0,r.jsx)(s,{children:t}),n]})};u.displayName="Card2";let m=(0,i.memo)(d);var p=(0,i.memo)(u),f=(0,a.ZP)("div").withConfig({displayName:"cmp___StyledDiv",componentId:"sc-cjcrrw-0"})({display:"flex",alignItems:"center"}),h=(0,a.ZP)("div").withConfig({displayName:"cmp___StyledDiv2",componentId:"sc-cjcrrw-1"})({marginRight:"1rem",whiteSpace:"nowrap",textTransform:"uppercase",opacity:"0.6"}),y=(0,a.ZP)("div").withConfig({displayName:"cmp___StyledDiv3",componentId:"sc-cjcrrw-2"})({marginLeft:"auto",maxWidth:"100%",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"})},77849:function(e,t,n){n.d(t,{Z:function(){return s}});var r=n(85893),a=n(19521),i=n(67294),o=n(72771);let l=e=>{let{children:t,isOwner:n,value:a,onChange:o,onBlur:l,onKeyDown:s,wrap:f=!1,...h}=e,[y,g]=(0,i.useState)(),v=(0,i.useRef)(null),w=(0,i.useCallback)(()=>{g(e=>e||!e)},[]),x=(0,i.useCallback)(e=>{g(!1),l&&l(e)},[l]),_=(0,i.useCallback)(e=>{["Escape","Enter","NumpadEnter"].includes(e.code)&&(g(!1),s&&s(e))},[s]),b=(0,i.useCallback)(e=>{var t;let n=null===(t=e.currentTarget)||void 0===t?void 0:t.textContent;o&&o(n)},[o]);return(0,i.useEffect)(()=>{if(!v.current)return;let e=a+"";v.current.textContent!==e&&(v.current.textContent=e||null)},[a,y]),(0,i.useEffect)(()=>{v.current&&(v.current.focus(),function(e){if(!document.createRange)return;let t=document.createRange();t.selectNodeContents(e),t.collapse(!1);let n=window.getSelection();null==n||n.removeAllRanges(),null==n||n.addRange(t)}(v.current),v.current.scrollLeft=v.current.scrollWidth)},[y]),(0,r.jsxs)(c,{...h,children:[y?(0,r.jsx)(d,{ref:v,type:"text",disabled:!n,contentEditable:!0,onInput:b,onBlur:x,onKeyDown:_,suppressContentEditableWarning:!0,...h,$_css:[{minWidth:"1px",borderStyle:"none",outline:"2px solid transparent",outlineOffset:"2px"},!f&&{maxWidth:"100%",overflow:"hidden",whiteSpace:"nowrap"}]}):(0,r.jsx)(u,{$_css2:[!f&&{maxWidth:"100%",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}],children:t||a||"NONE"}),n&&(0,r.jsx)(m,{$_css3:[{display:"flex",flexShrink:"0",justifyContent:"flex-end",overflow:"hidden"},{maxWidth:y?"0":"1.75rem",transition:"max-width ease-in-out 0.25s 0s"}],children:(0,r.jsx)(p,{name:"edit",onClick:w})})]})};l.displayName="NodeDetailEditableField";var s=(0,i.memo)(l),c=(0,a.ZP)("div").withConfig({displayName:"cmp___StyledDiv",componentId:"sc-g2fwm8-0"})({display:"flex",alignItems:"baseline",overflow:"hidden"}),d=(0,a.ZP)("div").withConfig({displayName:"cmp___StyledDiv2",componentId:"sc-g2fwm8-1"})(["",""],e=>e.$_css),u=(0,a.ZP)("div").withConfig({displayName:"cmp___StyledDiv3",componentId:"sc-g2fwm8-2"})(["",""],e=>e.$_css2),m=(0,a.ZP)("div").withConfig({displayName:"cmp___StyledDiv4",componentId:"sc-g2fwm8-3"})(["",""],e=>e.$_css3),p=(0,a.ZP)(o.JO).withConfig({displayName:"cmp___StyledIcon",componentId:"sc-g2fwm8-4"})({marginLeft:"0.75rem",height:"0.875rem",width:"0.875rem",cursor:"pointer"})},1218:function(e,t,n){n.d(t,{Z:function(){return b}});var r=n(85893),a=n(67294),i=n(72771),o=n(19521);let l=o.ZP.input.withConfig({displayName:"styles__StyledHiddenFileInput",componentId:"sc-11emaos-0"})(["display:none;"]),s=(0,a.forwardRef)((e,t)=>{let{value:n,onChange:o,accept:s,children:c,error:d,label:u,resetValue:m="",...p}=e,f=(0,a.useRef)(null),h=(0,a.useCallback)(()=>{if(f.current){if(void 0!==m&&n&&n!==m){f.current.value="",o(m);return}f.current.click()}},[o,m,n]),y=(0,a.useCallback)(e=>{let t=e.target,{files:n}=t;if(n){let e=n[0];o(e)}},[o]);return(0,r.jsxs)("div",{tabIndex:-1,ref:t,onClick:h,...p,children:[u&&(0,r.jsx)(i.lX,{label:u,error:d,required:!0}),c,d&&(0,r.jsx)(i.Xq,{error:d}),(0,r.jsx)(l,{type:"file",ref:f,onChange:y,accept:s})]})});s.displayName="HiddenFileInput";var c=(0,a.memo)(s);let d=(0,o.ZP)(c).attrs(e=>({accept:"*.png,*.jpg,*.jpeg,*.svg",...e})).withConfig({displayName:"styles__StyledBackgroundEditInput",componentId:"sc-ysmt7e-0"})(["",";"],e=>{let{theme:t}=e;return(0,o.iv)([""," transition:all ease-in-out 0.25s 0s;background-color:","66;border-bottom-left-radius:100%;"],{position:"absolute",right:"-1rem",top:"-1rem",display:"flex",height:"3.5rem",width:"5rem",cursor:"pointer",alignItems:"center",justifyContent:"center",paddingBottom:"1.25rem",paddingLeft:"1.5rem",opacity:"0"},t.color.base1)}),u=o.ZP.div.withConfig({displayName:"styles__StyledContainer",componentId:"sc-ysmt7e-1"})(["",""],e=>{let{$backgroundUrl:t,$hash:n,theme:r}=e,a=Object.keys(r.gradient),i=(n||"").split("").reduce((e,t)=>t.charCodeAt(0)+e,0)%a.length,[l,s]=r.gradient[a[i]].colors,c=t?"url(".concat(t,")"):"linear-gradient(90deg, ".concat(l,"cc 0%, ").concat(s,"cc 100%)");return(0,o.iv)([""," background-image:",";background-position:center;background-size:cover;&:before{"," content:'';background:inherit;transition:transform 0.4s ease-in-out;}&:hover{&:before{","}& > ","{","}}"],{position:"relative",zIndex:"0",display:"flex",height:"12.5rem",flexDirection:"column",justifyContent:"flex-end",overflow:"hidden"},c,{position:"absolute",inset:"0px",transformOrigin:"center","--tw-scale-x":"1","--tw-scale-y":"1",transform:"translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))"},{"--tw-scale-x":"1.1","--tw-scale-y":"1.1",transform:"translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))"},d,{right:"0px",top:"0px",opacity:"1"})}),m=o.ZP.h1.attrs((0,i.PT)("tp-h5")).withConfig({displayName:"styles__StyledTitle",componentId:"sc-ysmt7e-2"})(["",";"],e=>{let{theme:t}=e;return(0,o.iv)([""," color:",";background-color:","E5;"],{zIndex:"10",margin:"0px",paddingLeft:"1.5rem",paddingRight:"1.5rem",paddingTop:"0.125rem",paddingBottom:"0.125rem"},t.color.text,t.color.base1)}),p=o.ZP.h2.attrs((0,i.PT)("tp-body3")).withConfig({displayName:"styles__StyledDescription",componentId:"sc-ysmt7e-3"})(["",";"],e=>{let{theme:t}=e;return(0,o.iv)([""," color:",";"],{margin:"0px",paddingLeft:"1.5rem",paddingRight:"1.5rem",paddingTop:"0.75rem",paddingBottom:"0.75rem"},t.color.text)}),f=(0,o.ZP)(c).attrs(e=>({accept:"*.png,*.jpg,*.jpeg,*.svg",...e})).withConfig({displayName:"styles__StyledNodeAvatarEditInput",componentId:"sc-ysmt7e-4"})(["",";"],e=>{let{theme:t}=e;return(0,o.iv)([""," transition:all ease-in-out 0.25s 0s;background-color:","66;border-radius:50%;"],{position:"absolute",inset:"0px",display:"flex",cursor:"pointer",alignItems:"center",justifyContent:"center",opacity:"0"},t.color.base1)}),h=o.ZP.div.withConfig({displayName:"styles__StyledNodeAvatarContainer",componentId:"sc-ysmt7e-5"})([""," &:hover > ","{","}"],{position:"relative",zIndex:"10",marginLeft:"1.5rem",marginRight:"1.5rem",marginTop:"1rem",marginBottom:"1rem",display:"inline-flex",overflow:"hidden"},f,{opacity:"1"}),y=(0,o.ZP)(i.pN).attrs(e=>({size:"lg",...e})).withConfig({displayName:"styles__StyledNodeAvatar",componentId:"sc-ysmt7e-6"})([""]);var g=n(77849),v=n(33358),w=n(34853);function x(e){let{file:t}=e,[n,r]=(0,a.useState)();return(0,a.useEffect)(()=>{(async function(){let e;if(!t){r(void 0);return}t instanceof File&&(e=await (0,w.s5)(t)),"string"==typeof t&&((e=new Image).src="".concat(v.pf,"/api/v0/storage/raw/").concat(t)),e&&r(e)})()},[t]),{img:n}}let _=e=>{let{nameCtrl:t,descriptionCtrl:n,bannerCtrl:a,pictureCtrl:o,isOwner:l,node:s,...c}=e,{img:v}=x({file:o.field.value}),{img:w}=x({file:a.field.value});return(0,r.jsxs)("div",{...c,children:[(0,r.jsxs)(u,{$hash:null==s?void 0:s.hash,$backgroundUrl:null==w?void 0:w.src,children:[l&&(0,r.jsx)(d,{...a.field,...a.fieldState,resetValue:null==s?void 0:s.banner,children:a.field.value!==(null==s?void 0:s.banner)?(0,r.jsx)(i.JO,{name:"trash"}):(0,r.jsx)(i.JO,{name:"edit"})}),(0,r.jsx)("div",{children:(0,r.jsxs)(h,{children:[(0,r.jsx)(y,{src:null==v?void 0:v.src}),l&&(0,r.jsx)(f,{...o.field,...o.fieldState,resetValue:null==s?void 0:s.picture,children:o.field.value!==(null==s?void 0:s.picture)?(0,r.jsx)(i.JO,{name:"trash"}):(0,r.jsx)(i.JO,{name:"edit"})})]})}),(0,r.jsx)(m,{children:(0,r.jsx)(g.Z,{...t.field,...t.fieldState,placeholder:"name",isOwner:l})})]}),(n.field.value||l)&&(0,r.jsx)(p,{children:(0,r.jsx)(g.Z,{...n.field,...n.fieldState,placeholder:"description",isOwner:l,wrap:!0})})]})};_.displayName="NodeDetailHeader";var b=(0,a.memo)(_)},43666:function(e,t,n){n.d(t,{Z:function(){return d}});var r=n(85893),a=n(19521),i=n(67294),o=n(41664),l=n.n(o),s=n(72771);let c=e=>{let{href:t,children:n,isOwner:a,...i}=e,o=(0,r.jsx)(u,{children:n||"NONE"});return(0,r.jsx)(r.Fragment,{children:t?(0,r.jsxs)(m,{href:t,target:"_blank",...i,children:[o,!a&&(0,r.jsx)(p,{name:"external-link-square-alt"})]}):(0,r.jsx)(f,{children:o})})};c.displayName="NodeDetailLink";var d=(0,i.memo)(c),u=(0,a.ZP)("span").withConfig({displayName:"cmp___StyledSpan",componentId:"sc-1nkwyfg-0"})({flex:"1 1 0%",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}),m=(0,a.ZP)(l()).withConfig({displayName:"cmp___StyledLink",componentId:"sc-1nkwyfg-1"})({display:"flex",width:"100%",alignItems:"center"}),p=(0,a.ZP)(s.JO).withConfig({displayName:"cmp___StyledIcon",componentId:"sc-1nkwyfg-2"})({marginLeft:"0.75rem",height:"0.875rem",width:"0.875rem"}),f=(0,a.ZP)("span").withConfig({displayName:"cmp___StyledSpan2",componentId:"sc-1nkwyfg-3"})({display:"flex",width:"100%",alignItems:"center"})},8978:function(e,t,n){n.d(t,{Z:function(){return p}});var r=n(85893),a=n(19521),i=n(67294),o=n(72771);let l=(0,a.ZP)(o.cu).attrs(e=>{let{$status:t,...n}=e;return{$color:"active"===t||"linked"===t?"main1":"main2",...n}}).withConfig({displayName:"styles__StyledStatusIcon",componentId:"sc-1qd83xw-0"})([""]),s=e=>{let{status:t,...n}=e;return(0,r.jsxs)(d,{...n,children:[(0,r.jsx)(l,{$status:t}),(0,r.jsx)(u,{className:"tp-body3",children:t})]})};s.displayName="NodeStatus";var c=(0,i.memo)(s),d=(0,a.ZP)("div").withConfig({displayName:"cmp___StyledDiv",componentId:"sc-b7ni1q-0"})({display:"flex",alignItems:"center",gap:"0.375rem",paddingTop:"0.375rem"}),u=(0,a.ZP)("span").withConfig({displayName:"cmp___StyledSpan",componentId:"sc-b7ni1q-1"})({textTransform:"capitalize"});let m=e=>{let{status:t,...n}=e;return(0,r.jsxs)(f,{...n,children:[(0,r.jsx)("div",{className:"tp-body fs-10",children:"STATUS"}),(0,r.jsx)(c,{status:t||"waiting"})]})};m.displayName="NodeDetailStatus";var p=(0,i.memo)(m),f=(0,a.ZP)("div").withConfig({displayName:"cmp___StyledDiv",componentId:"sc-jhruyg-0"})({backgroundColor:"#00000033",paddingLeft:"0.75rem",paddingRight:"0.75rem",paddingTop:"0.375rem",paddingBottom:"0.375rem"})},6309:function(e,t,n){n.d(t,{t:function(){return c},Z:function(){return d}});var r=n(85893),a=n(67294),i=n(19521);let o=i.ZP.span.withConfig({displayName:"styles__StyledPrice",componentId:"sc-ouxjcu-0"})(["",""],{display:"inline-flex",alignItems:"center",gap:"0.25rem",whiteSpace:"nowrap"});var l=n(72771),s=n(34853);let c=e=>{let{value:t,...n}=e;return(0,r.jsxs)(o,{...n,children:[(0,s.RK)(t),(0,r.jsx)(l.TR,{color:"currentColor"})]})};c.displayName="Price";var d=(0,a.memo)(c)},7954:function(e,t,n){n.d(t,{Z:function(){return r.Z}});var r=n(6309)},10159:function(e,t,n){n.d(t,{c:function(){return l}});var r=n(72771),a=n(67294),i=n(87536),o=n(1604);function l(e){let{onSubmit:t,onSuccess:n,onError:l,readyDeps:s=[],...c}=e,d=(0,i.cI)(c);(0,a.useEffect)(()=>{"object"==typeof c.defaultValues&&d.reset(c.defaultValues)},[...s]);let[u,m]=(0,a.useState)({data:void 0,error:void 0,loading:!1}),[p,{onLoad:f,onSuccess:h,onError:y}]=(0,r.g7)({flushData:!0,state:u,setState:m,onSuccess:n,onError:l}),g=(0,a.useCallback)(async e=>{try{f();let n=await t(e);h(n)}catch(t){let e=t instanceof o.jm?Error("Validation error, check highlighted form fields"):(null==t?void 0:t.cause)||t;d.setError("root.serverError",{...e,message:null==e?void 0:e.message}),y(e)}},[d,y,f,t,h]),v=(0,a.useCallback)(async e=>{let t;if(console.log(e),!t){let n=function e(t){let[n]=Object.entries(t);if(!n)return;let[r,a]=n;if(Array.isArray(a)){let t=a[a.length-1];return e(t)}return[r,a]}(e);if(n){let[e,r]=n,a="string"==typeof r?r:(null==r?void 0:r.message)?": ".concat(r.message):(null==r?void 0:r.type)?': "'.concat(null==r?void 0:r.type,'" validation not satisfied'):"";t=Error('Error on field "'.concat(e,'"').concat(a))}}t||(t=Error("Validation error")),y(t)},[y]),w=(0,a.useMemo)(()=>d.handleSubmit(g,v),[d,g,v]);return{...d,requestState:p,handleSubmit:w}}},73384:function(e,t,n){n.d(t,{i:function(){return s}});var r=n(94461),a=n(48107),i=n(91421),o=n(72771),l=n(67294);function s(){let[e,t]=(0,r.mr)(),{account:n}=e.account,{entities:s}=e.crns,{entities:c}=e.ccns,d=(0,l.useMemo)(()=>new a.B(n),[n]),u=(0,o.lm)(),m=(0,l.useCallback)(e=>"string"==typeof e?null==s?void 0:s.find(t=>t.hash===e):e,[s]),p=(0,l.useCallback)(e=>"string"==typeof e?null==c?void 0:c.find(t=>t.hash===e):e,[c]),f=(0,l.useCallback)(e=>{let t=m(e);return!!t&&d.isLinked(t)},[m,d]),h=(0,l.useCallback)((e,t)=>{let n=m(e),r=p(t);return!!n&&!!r&&d.isLinkableBy(n,r)[0]},[p,m,d]),y=(0,l.useCallback)(e=>{let t=m(e);if(!t)return!1;let n=p(t.parentData||t.parent||"");return!!n&&d.isUnlinkableBy(t,n)},[p,m,d]),g=(0,l.useCallback)(async(e,n)=>{try{if(!u)throw Error("Notification not ready");let r=m(e);if(!r)throw Error("Invalid CRN node");let a=p(n);if(!a)throw Error("Invalid CCN node");if(!h(r,a))throw Error("Not linkable node");await d.linkComputeResourceNode(r.hash),u.add({variant:"success",title:"Success",text:'Linked resource node "'.concat(r.hash,'" successfully.')});let[o,l]=function(e,t){let n={...t,virtual:Date.now()},r={...e,virtual:Date.now()};n.parent=r.hash,n.parentData=r;let a=r.crnsData.reduce((e,t)=>(e[t.hash]=t,e),{});return a[n.hash]=n,r.crnsData=Object.values(a),r.resource_nodes=Object.keys(a),[r,n]}(a,r);return t(new i.Wy({name:"ccns",entities:[o]})),t(new i.Wy({name:"crns",entities:[l]})),!0}catch(e){null==u||u.add({variant:"error",title:"Error",text:e.message})}return!1},[t,p,m,h,d,u]),v=(0,l.useCallback)(async e=>{try{if(!u)throw Error("Notification not ready");let n=m(e);if(!n)throw Error("Invalid CRN node");let r=p(n.parentData||n.parent||"");if(!r)throw Error("Invalid CCN node");if(!y(n))throw Error("Not unlinkable node");await d.unlinkComputeResourceNode(n.hash),u.add({variant:"success",title:"Success",text:'Unlinked resource node "'.concat(n.hash,'" successfully.')});let[a,o]=function(e,t){let n={...t,virtual:Date.now()},r={...e,virtual:Date.now()};n.parent="",n.parentData=void 0;let a=r.crnsData.filter(e=>e.hash!==n.hash);return r.crnsData=a,r.resource_nodes=a.map(e=>e.hash),[r,n]}(r,n);return t(new i.Wy({name:"ccns",entities:[a]})),t(new i.Wy({name:"crns",entities:[o]})),!0}catch(e){null==u||u.add({variant:"error",title:"Error",text:e.message})}return!1},[t,p,m,y,d,u]);return{isLinked:f,isLinkableByUser:h,isUnlinkableByUser:y,handleLink:g,handleUnlink:v}}},15457:function(e,t,n){n.d(t,{_:function(){return c}});var r=n(67294),a=n(11163),i=n(72771),o=n(48107),l=n(94461),s=n(91421);function c(e){var t;let{node:n,nodes:c}=e,d=(0,a.useRouter)(),u=(0,i.lm)(),[m,p]=(0,l.mr)(),{account:f}=m.account,h=(0,r.useMemo)(()=>new o.B(f),[f]),y=(0,r.useMemo)(()=>n?h.isCRN(n):void 0,[h,n]),g=(0,r.useCallback)(async()=>{if(n){if(!u)throw Error("Notification not ready");try{let e=null==n?void 0:n.hash;await h.removeNode(e),u.add({variant:"success",title:"Success",text:'Your node "'.concat(n.hash,'" was deleted successfully.')}),p(new s.gg({name:y?"crns":"ccns",keys:[e]})),d.replace("/earn/".concat(y?"crn":"ccn"))}catch(e){null==u||u.add({variant:"error",title:"Error",text:e.message})}}},[p,y,n,h,u,d]),{nodes_with_identical_asn:v}=(null==n?void 0:null===(t=n.scoreData)||void 0===t?void 0:t.measurements)||{},{base_latency:w,measured_at:x}=(null==n?void 0:n.metricsData)||{},_=(0,r.useMemo)(()=>w?"".concat(Number(100*(w||0)).toFixed(2)," %"):void 0,[w]),b=(0,r.useMemo)(()=>{if(!x)return;let e=new Date(1e3*x);return"".concat(e.toLocaleDateString()," (").concat(e.toLocaleTimeString(),")")},[x]),C=(0,r.useMemo)(()=>{if(!n)return;let e=new Date((null==n?void 0:n.time)*1e3);return"".concat(e.toLocaleDateString())},[n]),N=(0,r.useMemo)(()=>n&&h.isUserNode(n),[h,n]);return{account:f,node:n,nodesOnSameASN:v,baseLatency:_,lastMetricsCheck:b,creationDate:C,isOwner:N,handleRemove:g}}}}]);