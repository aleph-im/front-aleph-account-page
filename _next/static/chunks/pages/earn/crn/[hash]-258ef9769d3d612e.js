(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[265],{70805:function(e,n,i){(window.__NEXT_P=window.__NEXT_P||[]).push(["/earn/crn/[hash]",function(){return i(97172)}])},33378:function(e,n,i){"use strict";i.d(n,{Z:function(){return o}});var r=i(85893),t=i(19521),a=i(67294);let l=t.ZP.div.withConfig({displayName:"styles__StyledDotIcon",componentId:"sc-1w2vi58-0"})(e=>{let{theme:n,$active:i}=e,r=i?n.color.main1:"".concat(n.color.base0,"20");return[{height:"0.75rem",width:"0.5rem"},(0,t.iv)(["background-color:",";"],r)]}),s=(0,a.memo)(e=>{let{decentralization:n}=e,i=e=>(e+1)*.3;return(0,r.jsx)(d,{children:(0,r.jsx)(c,{children:Array.from({length:3},(e,t)=>(0,r.jsx)(l,{$active:n>=i(t)},t))})})});s.displayName="NodeDecentralization";var o=s,d=(0,t.ZP)("div").withConfig({displayName:"cmp___StyledDiv",componentId:"sc-sktw9k-0"})({display:"inline-flex",alignItems:"center",gap:"0.75rem"}),c=(0,t.ZP)("div").withConfig({displayName:"cmp___StyledDiv2",componentId:"sc-sktw9k-1"})({display:"flex",alignItems:"stretch",gap:"0.125rem"})},58193:function(e,n,i){"use strict";i.d(n,{h:function(){return l}});var r=i(94461),t=i(67294),a=i(69797);function l(e){let{nodes:n}=e,[i]=(0,r.mr)(),{entities:l}=i.ccns,{userNodes:s}=(0,a.M)({nodes:n||l}),o=(0,t.useMemo)(()=>null==s?void 0:s[0],[s]);return{userNode:o}}},97172:function(e,n,i){"use strict";i.r(n),i.d(n,{default:function(){return U}});var r=i(85893),t=i(19521),a=i(67294),l=i(9008),s=i.n(l),o=i(1218),d=i(94461),c=i(48107),u=i(11163),m=i(94527),h=i(15457),v=i(58193),p=i(10159),x=i(87536),j=i(56312),f=i(7251),g=i(91077),y=i(39229),C=i(68732),w=i(34853),N=i(8978),_=i(41664),k=i.n(_),E=i(71806),b=i(33378),D=i(46445),S=i(77849),Z=i(43666);let I=()=>{var e,n,i;let{node:t,nodesOnSameASN:l,baseLatency:_,lastMetricsCheck:E,calculatedRewards:I,isUserLinked:R,isLinkable:U,creationDate:W,nameCtrl:J,descriptionCtrl:Y,bannerCtrl:q,pictureCtrl:K,isOwner:V,isDirty:X,rewardCtrl:G,addressCtrl:$,handleRemove:Q,handleSubmit:ee,handleLink:en,handleUnlink:ei}=function(){let e=(0,f.lm)(),n=(0,u.useRouter)(),{hash:i}=n.query,[r]=(0,d.mr)(),{account:t}=r.account,{entities:l}=r.crns,{node:s}=function(e){let{hash:n}=e,[i]=(0,d.mr)(),{entities:r}=i.crns,t=(0,a.useMemo)(()=>{if(r)return r.filter(e=>e.hash===n)},[r,n]),[l]=t||[];return{node:l}}({hash:i}),{userNode:o}=(0,v.h)({}),g=(0,a.useMemo)(()=>new c.B(t),[t]);g.isUserLinked;let{calculatedRewards:y}=(0,m.Ht)({address:(null==s?void 0:s.reward)||""}),C=(0,h._)({node:s,nodes:l}),w=(0,a.useMemo)(()=>{if(s)return g.isUserLinked(s,o)},[s,g,o]),N=(0,a.useMemo)(()=>{if(s)return g.isLinkable(s,o)[0]},[s,g,o]),_=(0,a.useCallback)(async()=>{if(!e)throw Error("Notification not ready");if(!s||g.isUserLinked(s,o))return;let{hash:n}=s;try{await g.linkComputeResourceNode(n),e.add({variant:"success",title:"Success",text:'Linked resource node "'.concat(n,'" successfully.')})}catch(n){null==e||e.add({variant:"error",title:"Error",text:n.message})}},[s,g,e,o]),k=(0,a.useCallback)(async()=>{if(!e)throw Error("Notification not ready");if(!s||!g.isUserLinked(s,o))return;let{hash:n}=s;try{await g.unlinkComputeResourceNode(n),e.add({variant:"success",title:"Success",text:'Unlinked resource node "'.concat(n,'" successfully.')})}catch(n){null==e||e.add({variant:"error",title:"Error",text:n.message})}},[s,g,e,o]),E=function(e){let{defaultValues:n}=e,i=(0,u.useRouter)(),[r]=(0,d.mr)(),{account:t}=r.account,l=(0,f.lm)(),s=(0,a.useMemo)(()=>new c.B(t),[t]),o=(0,a.useCallback)(async e=>{if(!s)throw Error("Manager not ready");let n=await s.updateComputeResourceNode(e);return n},[s]),m=(0,a.useCallback)(async e=>{if(!l)throw Error("Notification not ready");l.add({variant:"success",title:"Success",text:'Your node "'.concat(e,'" was updated successfully.')}),i.replace("/earn/crn/".concat(e))},[l,i]),{control:h,handleSubmit:v,formState:{errors:g,isDirty:y}}=(0,p.c)({defaultValues:n,onSubmit:o,onSuccess:m,resolver:(0,j.F)(c.B.updateCCNSchema),readyDeps:[null==n?void 0:n.hash]}),C=(0,x.qo)({control:h}),w=(0,x.bc)({control:h,name:"name"}),N=(0,x.bc)({control:h,name:"description"}),_=(0,x.bc)({control:h,name:"address"}),k=(0,x.bc)({control:h,name:"picture"}),E=(0,x.bc)({control:h,name:"banner"}),b=(0,x.bc)({control:h,name:"reward"}),D=(0,x.bc)({control:h,name:"manager"}),S=(0,x.bc)({control:h,name:"authorized"}),Z=(0,x.bc)({control:h,name:"locked"}),I=(0,x.bc)({control:h,name:"registration_url"});return{values:C,control:h,nameCtrl:w,descriptionCtrl:N,addressCtrl:_,pictureCtrl:k,bannerCtrl:E,rewardCtrl:b,managerCtrl:D,authorizedCtrl:S,lockedCtrl:Z,registrationUrlCtrl:I,errors:g,isDirty:y,handleSubmit:v}}({defaultValues:{hash:null==s?void 0:s.hash,name:null==s?void 0:s.name,description:null==s?void 0:s.description,reward:null==s?void 0:s.reward,authorized:null==s?void 0:s.authorized,locked:null==s?void 0:s.locked,registration_url:null==s?void 0:s.registration_url,manager:null==s?void 0:s.manager,picture:null==s?void 0:s.picture,banner:null==s?void 0:s.banner,address:null==s?void 0:s.address}});return{nodes:l,node:s,userNode:o,calculatedRewards:y,isUserLinked:w,isLinkable:N,handleLink:_,handleUnlink:k,...E,...C}}();return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(s(),{children:[(0,r.jsx)("title",{children:"Aleph.im | CRN Detail"}),(0,r.jsx)("meta",{name:"description",content:"Aleph.im Compute Resource Node"}),(0,r.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"})]}),(0,r.jsx)("section",{children:(0,r.jsx)(o.Z,{node:t,nameCtrl:J,descriptionCtrl:Y,bannerCtrl:q,pictureCtrl:K,isOwner:V})}),V&&(0,r.jsxs)(A,{children:[(0,r.jsxs)(f.zx,{kind:"flat",variant:"text-only",size:"regular",color:"error",onClick:Q,children:[(0,r.jsx)(f.JO,{name:"trash",color:"error",size:"lg"}),"remove node"]}),(0,r.jsx)(f.zx,{kind:"neon",variant:"primary",size:"regular",color:"main2",onClick:ee,disabled:!X,children:"save changes"})]}),(0,r.jsx)(O,{children:(0,r.jsxs)(C.Z,{children:[(0,r.jsx)("div",{children:(0,r.jsxs)(g.Z,{title:"GENERAL INFO",children:[(0,r.jsx)(N.Z,{status:null==t?void 0:t.status}),(0,r.jsx)(y.HC,{name:"NAME",value:null==t?void 0:t.name}),(0,r.jsx)(y.HC,{name:"OWNER",value:(0,r.jsx)(Z.Z,{href:(0,w.tz)({address:null==t?void 0:t.owner}),isOwner:!1,children:(null==t?void 0:t.owner)&&(0,w.zN)(null==t?void 0:t.owner)}),big:!0}),(0,r.jsx)(y.HC,{name:"REWARD ADDRESS",value:(0,r.jsx)(S.Z,{...G.field,...G.fieldState,placeholder:"address",isOwner:V,children:(0,r.jsx)(Z.Z,{href:(0,w.tz)({tokenAddress:G.field.value}),isOwner:V,children:G.field.value&&(0,w.zN)(G.field.value)})}),big:!0}),(0,r.jsx)(y.HC,{name:"ADDRESS",value:(0,r.jsx)(S.Z,{...$.field,...$.fieldState,placeholder:"address",isOwner:V,children:(0,r.jsx)(Z.Z,{href:null==t?void 0:t.address,isOwner:V,children:null==t?void 0:t.address})}),big:!0})]})}),(0,r.jsxs)("div",{children:[(0,r.jsxs)(g.Z,{title:"REWARD INDICATORS",children:[(0,r.jsx)(y.HC,{name:"ASN",value:null==t?void 0:null===(e=t.metricsData)||void 0===e?void 0:e.as_name}),(0,r.jsx)(y.HC,{name:"NODES ON ASN",value:l}),(0,r.jsx)(y.HC,{name:"VERSION",value:null==t?void 0:null===(n=t.metricsData)||void 0===n?void 0:n.version}),(0,r.jsx)(y.HC,{name:"BASE LATENCY",value:_}),(0,r.jsx)(y.HC,{name:"LAST CHECK",value:E})]}),(0,r.jsx)(g.Z,{title:"POTENTIAL REWARD",children:(0,r.jsx)(y.HC,{name:"ESTIMATED MONTHLY REWARD",value:(0,r.jsxs)(P,{children:[(0,r.jsx)(z,{children:null==I?void 0:I.toFixed(5)}),(0,r.jsx)(f.TR,{text:"",color:"main0"})]})})})]}),(0,r.jsx)("div",{children:(0,r.jsx)(g.Z,{title:"LINKED CORE NODE",children:(null==t?void 0:t.parentData)?(0,r.jsxs)(F,{children:[(0,r.jsx)(k(),{href:"/earn/ccn/".concat(t.parentData.hash),legacyBehavior:!0,children:(0,r.jsx)(B,{hash:t.parentData.hash,name:t.parentData.name,picture:t.parentData.picture})}),R?(0,r.jsx)("button",{onClick:ei,children:(0,r.jsx)(f.JO,{name:"trash",color:"error"})}):(0,r.jsx)(r.Fragment,{})]}):(0,r.jsxs)(T,{children:[(0,r.jsx)(H,{}),(0,r.jsx)(L,{className:"fs-10",children:!R&&U?(0,r.jsx)(f.zx,{color:"main2",size:"regular",kind:"neon",variant:"text-only",onClick:en,children:(0,r.jsxs)("div",{children:[(0,r.jsx)(M,{name:"link"})," link now"]})}):(0,r.jsx)(r.Fragment,{children:"not linked"})})]})})}),(0,r.jsx)("div",{children:(0,r.jsx)(g.Z,{title:"DECENTRALIZED SCORE",children:(0,r.jsx)(b.Z,{decentralization:(null==t?void 0:null===(i=t.scoreData)||void 0===i?void 0:i.decentralization)||0})})}),(0,r.jsx)("div",{children:(0,r.jsx)(g.Z,{title:"PERFORMANCE",children:(0,r.jsx)(y.HC,{name:"CREATION TIME",value:W})})})]})}),(0,r.jsx)(D.Z,{show:!t,center:!0})]})};I.displayName="ComputeResourceNodeDetailPage";var R=(0,a.memo)(I),A=(0,t.ZP)("section").withConfig({displayName:"cmp___StyledSection",componentId:"sc-b9jk28-0"})({marginTop:"2rem",marginBottom:"2rem",display:"flex",alignItems:"center",justifyContent:"flex-end",gap:"1.75rem"}),O=(0,t.ZP)("section").withConfig({displayName:"cmp___StyledSection2",componentId:"sc-b9jk28-1"})({marginTop:"2rem"}),P=(0,t.ZP)("div").withConfig({displayName:"cmp___StyledDiv",componentId:"sc-b9jk28-2"})({display:"inline-flex",alignItems:"center",gap:"0.5rem"}),z=(0,t.ZP)("div").withConfig({displayName:"cmp___StyledDiv2",componentId:"sc-b9jk28-3"})({whiteSpace:"nowrap"}),T=(0,t.ZP)("div").withConfig({displayName:"cmp___StyledDiv3",componentId:"sc-b9jk28-4"})({display:"inline-flex",alignItems:"center",gap:"0.75rem"}),H=(0,t.ZP)("div").withConfig({displayName:"cmp___StyledDiv4",componentId:"sc-b9jk28-5"})({height:"1.5rem",width:"1.5rem",borderRadius:"9999px",backgroundColor:"#C4C4C433"}),L=(0,t.ZP)("div").withConfig({displayName:"cmp___StyledDiv5",componentId:"sc-b9jk28-6"})({lineHeight:"1rem"}),M=(0,t.ZP)(f.JO).withConfig({displayName:"cmp___StyledIcon",componentId:"sc-b9jk28-7"})({height:"0.875rem",width:"0.875rem"}),F=(0,t.ZP)("div").withConfig({displayName:"cmp___StyledDiv6",componentId:"sc-b9jk28-8"})({display:"flex",alignItems:"center"}),B=(0,t.ZP)(E.Z).withConfig({displayName:"cmp___StyledNodeName",componentId:"sc-b9jk28-9"})({marginRight:"auto",width:"auto",cursor:"pointer"}),U=R}},function(e){e.O(0,[959,312,2,528,774,888,179],function(){return e(e.s=70805)}),_N_E=e.O()}]);