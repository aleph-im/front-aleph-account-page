(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[357],{89176:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/earn/ccn",function(){return t(53193)}])},52984:function(e,n,t){"use strict";t.d(n,{Z:function(){return r}});var i=t(19521);let a=i.ZP.div.withConfig({displayName:"styles__StyledProgressBar",componentId:"sc-lav9ln-0"})(e=>{var n;let{theme:t,$color:a="main0",$gradient:r,$percent:o}=e,l=r?null===(n=t.gradient[r])||void 0===n?void 0:n.fn:void 0,s=l||t.color[a]||a,d="".concat(t.color.base0,"20");return[{position:"relative",height:"0.125rem",width:"100%"},(0,i.iv)(["background-color:",";&:after{"," content:'';background-color:",";width:","%;}"],d,{position:"absolute",left:"0px",top:"0px",height:"100%"},s,100*o)]});var r=a},58833:function(e,n,t){"use strict";t.d(n,{Z:function(){return d}});var i=t(85893),a=t(19521),r=t(67294),o=t(7251);let l=(0,a.ZP)(o.zx).attrs(e=>({...e,forwardedAs:"a",kind:"neon",variant:"text-only",color:"main0"})).withConfig({displayName:"styles__StyledExternalLinkButton",componentId:"sc-16jaolm-0"})([""]),s=e=>{let{children:n,href:t,size:a="big",...r}=e;return(0,i.jsx)(i.Fragment,{children:(0,i.jsxs)(l,{href:t,size:a,...r,target:"_blank",children:[n||t,(0,i.jsx)(c,{name:"square-up-right"})]})})};s.displayName="ExternalLinkButton";var d=(0,r.memo)(s),c=(0,a.ZP)(o.JO).withConfig({displayName:"cmp___StyledIcon",componentId:"sc-mpznlq-0"})({marginLeft:"0.625rem"})},28417:function(e,n,t){"use strict";t.d(n,{Z:function(){return x}});var i=t(85893),a=t(19521),r=t(67294),o=t(34816),l=t(43815),s=t(42983),d=t(13153),c=t(7251),m=t(63608),p=t(87625);let h=e=>{let{title:n,nodes:t,...s}=e,c=(0,a.Fg)(),h=(0,r.useMemo)(()=>{let e=t||[],n=e.length,i=e.reduce((e,n)=>e+Number(n.score>=.8),0),a=e.reduce((e,n)=>e+Number(n.score>=.5&&n.score<.8),0),r=e.reduce((e,n)=>e+Number(n.score<.5),0),o=n-i-a-r;return[{label:"active nodes",value:"".concat(i," nodes"),percentage:i/n,gradient:"main1"},{label:"50% < 80%",value:"".concat(a," nodes"),percentage:a/n,gradient:"main2"},{label:"< 50%",value:"".concat(r," nodes"),percentage:r/n,color:"error"},{label:"other",value:"".concat(o," nodes"),percentage:o/n,color:"transparent"}]},[t]),x="".concat(c.color.base0,"20"),N=[...h].reverse();return(0,i.jsxs)(d.Z,{loading:!t,...s,children:[(0,i.jsx)(g,{forwardedAs:"h3",type:"info",color:"main0",children:n}),(0,i.jsxs)(y,{children:[(0,i.jsxs)(u,{width:100,height:100,margin:{},children:[(0,i.jsx)("defs",{children:(0,i.jsx)(p._,{data:h})}),(0,i.jsx)(o.b,{data:[{v:1}],dataKey:"v",stroke:"transparent",innerRadius:"72%",outerRadius:"100%",startAngle:450,endAngle:90,isAnimationActive:!1,fill:x}),(0,i.jsx)(o.b,{data:N,dataKey:"percentage",stroke:"transparent",innerRadius:"72%",outerRadius:"100%",startAngle:450,endAngle:90,children:N.map(e=>{let n="gr-".concat(e.gradient),t=e.gradient?"url(#".concat(n,")"):e.color?c.color[e.color]||e.color:void 0;return(0,i.jsx)(l.b,{fill:t},e.label)})}),(0,i.jsx)("text",{x:"50%",y:"50%",dominantBaseline:"central",textAnchor:"middle",className:"tp-body3 fs-24",fill:c.color.text,children:(null==t?void 0:t.length)||0})]}),(0,i.jsx)(f,{children:Array.from({length:2},(e,n)=>(0,i.jsx)(v,{children:h.slice(2*n,2*n+2).map(e=>(0,i.jsxs)(_,{children:[(0,i.jsx)(m.Z,{$color:"transparent"===e.color?x:e.color,$gradient:e.gradient,$size:"1.25rem"}),(0,i.jsxs)(w,{className:"tp-body3",children:[(0,i.jsx)("div",{children:e.value}),(0,i.jsx)(j,{className:"fs-10",children:e.label})]})]},e.label))},n))})]})]})};h.displayName="NetworkHealthChart";var x=(0,r.memo)(h),g=(0,a.ZP)(c.DU).withConfig({displayName:"cmp___StyledTextGradient",componentId:"sc-ghx7oa-0"})({margin:"0px",minHeight:"2rem"}),y=(0,a.ZP)("div").withConfig({displayName:"cmp___StyledDiv",componentId:"sc-ghx7oa-1"})({display:"flex",flexDirection:"column",alignItems:"center"}),u=(0,a.ZP)(s.u).withConfig({displayName:"cmp___StyledPieChart",componentId:"sc-ghx7oa-2"})({marginTop:"0.75rem",marginBottom:"0.75rem",minHeight:"6.25rem"}),f=(0,a.ZP)("div").withConfig({displayName:"cmp___StyledDiv2",componentId:"sc-ghx7oa-3"})({marginTop:"0.25rem",display:"flex",width:"100%",alignItems:"stretch",justifyContent:"center",gap:"1.5rem"}),v=(0,a.ZP)("div").withConfig({displayName:"cmp___StyledDiv3",componentId:"sc-ghx7oa-4"})({display:"flex",flexDirection:"column",gap:"1rem"}),_=(0,a.ZP)("div").withConfig({displayName:"cmp___StyledDiv4",componentId:"sc-ghx7oa-5"})({display:"flex",alignItems:"center",gap:"0.75rem"}),w=(0,a.ZP)("div").withConfig({displayName:"cmp___StyledDiv5",componentId:"sc-ghx7oa-6"})({display:"flex",flexDirection:"column",justifyContent:"space-between",gap:"0.25rem",whiteSpace:"nowrap",fontStyle:"normal",lineHeight:"1rem !important"}),j=(0,a.ZP)("div").withConfig({displayName:"cmp___StyledDiv6",componentId:"sc-ghx7oa-7"})({opacity:"0.6"})},60202:function(e,n,t){"use strict";t.d(n,{Z:function(){return c}});var i=t(85893),a=t(19521),r=t(67294),o=t(63608);let l=(0,a.ZP)(o.Z).attrs(e=>{let{$performance:n,...t}=e;return{$color:n>=.8?"main1":n>=.5?"main0":"error",...t}}).withConfig({displayName:"styles__StyledAPYIcon",componentId:"sc-162ntq6-0"})([""]);var s=t(47630);let d=e=>{let{node:n,nodes:t}=e,a=new s.S,r=a.computeEstimatedStakersAPY(n,t),o=a.currentAPY(t);return(0,i.jsxs)(m,{children:[(0,i.jsx)(l,{$performance:r/o}),Number(100*r).toFixed(2),"%"]})};d.displayName="NodeAPY";var c=(0,r.memo)(d),m=(0,a.ZP)("div").withConfig({displayName:"cmp___StyledDiv",componentId:"sc-svx2na-0"})({display:"inline-flex",alignItems:"center",gap:"0.75rem"})},90709:function(e,n,t){"use strict";t.d(n,{Z:function(){return s}});var i=t(85893),a=t(19521),r=t(67294);let o=a.ZP.div.withConfig({displayName:"styles__StyledDotIcon",componentId:"sc-q6l3ug-0"})(e=>{let{theme:n,$score:t}=e,i=void 0===t?"".concat(n.color.base0,"20"):t>=.8?n.color.main1:t>=.5?n.color.main0:n.color.error;return[{height:"0.75rem",width:"0.5rem"},(0,a.iv)(["background-color:",";"],i)]}),l=e=>{let{nodes:n,subfix:t,max:a=3,...r}=e;return(0,i.jsxs)(d,{...r,children:[(0,i.jsx)(c,{children:Array.from({length:a},(e,t)=>{var a;return(0,i.jsx)(o,{$score:null==n?void 0:null===(a=n[t])||void 0===a?void 0:a.score},t)})}),(0,i.jsxs)(m,{className:"fs-10",children:[null==n?void 0:n.length," ",(0,i.jsxs)(p,{children:["of ",a,t]})]})]})};l.displayName="NodeLinkedNodes";var s=(0,r.memo)(l),d=(0,a.ZP)("div").withConfig({displayName:"cmp___StyledDiv",componentId:"sc-1i7lvnr-0"})({display:"inline-flex",alignItems:"center",gap:"0.75rem"}),c=(0,a.ZP)("div").withConfig({displayName:"cmp___StyledDiv2",componentId:"sc-1i7lvnr-1"})({display:"flex",alignItems:"stretch",gap:"0.125rem"}),m=(0,a.ZP)("div").withConfig({displayName:"cmp___StyledDiv3",componentId:"sc-1i7lvnr-2"})({whiteSpace:"nowrap",lineHeight:"1rem"}),p=(0,a.ZP)("span").withConfig({displayName:"cmp___StyledSpan",componentId:"sc-1i7lvnr-3"})({opacity:"0.2"})},11140:function(e,n,t){"use strict";t.d(n,{Z:function(){return d}});var i=t(85893),a=t(19521),r=t(67294),o=t(7251),l=t(52984);let s=e=>{let{staked:n,status:t,locked:a}=e,r=Math.min(n,5e5)/5e5,s=Number(n/1e3).toFixed(0);return(0,i.jsxs)(c,{className:"fs-10",children:[(0,i.jsxs)(m,{children:[(0,i.jsxs)("div",{children:[s,"k ",(0,i.jsx)(p,{children:"of 500k"})]}),(0,i.jsxs)(h,{children:[t.toUpperCase(),a&&(0,i.jsx)(o.JO,{name:"lock",size:"xs"})]})]}),(0,i.jsx)(x,{children:(0,i.jsx)(l.Z,{$percent:r,$color:r>=1?"main1":"main0"})})]})};s.displayName="NodeStaked";var d=(0,r.memo)(s),c=(0,a.ZP)("div").withConfig({displayName:"cmp___StyledDiv",componentId:"sc-158w15e-0"})({width:"100%",lineHeight:"1rem"}),m=(0,a.ZP)("div").withConfig({displayName:"cmp___StyledDiv2",componentId:"sc-158w15e-1"})({marginBottom:"0.625rem",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"0.375rem",whiteSpace:"nowrap",lineHeight:"1rem"}),p=(0,a.ZP)("span").withConfig({displayName:"cmp___StyledSpan",componentId:"sc-158w15e-2"})({opacity:"0.2"}),h=(0,a.ZP)("div").withConfig({displayName:"cmp___StyledDiv3",componentId:"sc-158w15e-3"})({display:"flex",alignItems:"center",gap:"0.25rem",fontSize:"0.375rem"}),x=(0,a.ZP)("div").withConfig({displayName:"cmp___StyledDiv4",componentId:"sc-158w15e-4"})({display:"flex",alignItems:"center",gap:"0.25rem"})},58160:function(e,n,t){"use strict";t.d(n,{Z:function(){return m}});var i=t(85893),a=t(19521),r=t(67294),o=t(63608);let l=(0,a.ZP)(o.Z).attrs(e=>{let{theme:n,$status:t,...i}=e,a=t>=.8?"main1":t>=.5?"main0":t>=0?"error":"".concat(n.color.base0,"20");return{$color:a,...i}}).withConfig({displayName:"styles__StyledVersionIcon",componentId:"sc-iae05r-0"})([""]);var s=t(48107),d=t(7251);let c=e=>{var n;let{node:t,lastVersion:a}=e,o=(0,r.useMemo)(()=>new s.B,[]),c=(0,r.useMemo)(()=>a?o.isNodeUptodate(t,a)&&!o.isNodeExperimental(t,a)?1:o.isNodeOutdated(t,a)||o.isNodeExperimental(t,a)?.5:0:-1,[t,a,o]),m=(0,r.useMemo)(()=>a?o.isNodeLatest(t,a)?"latest":o.isNodePrerelease(t,a)?"prerelease":o.isNodeExperimental(t,a)?"experimental":o.isNodeOutdated(t,a)?"outdated":"obsolete":"",[t,a,o]),x=(0,i.jsxs)(p,{children:[(0,i.jsx)(l,{$status:c}),(null===(n=t.metricsData)||void 0===n?void 0:n.version)||"-"]});return(0,i.jsx)(i.Fragment,{children:c<1?(0,i.jsx)(d.u,{my:"top-center",at:"bottom-center",offset:{x:0,y:10},content:m,children:(0,i.jsxs)(h,{children:[x," ",(0,i.jsx)(d.JO,{name:"info-circle",size:"sm"})]})}):x})};c.displayName="VersionCell";var m=(0,r.memo)(c),p=(0,a.ZP)("div").withConfig({displayName:"cmp___StyledDiv",componentId:"sc-i7l1ld-0"})({display:"inline-flex",alignItems:"center",gap:"0.75rem",whiteSpace:"nowrap"}),h=(0,a.ZP)("div").withConfig({displayName:"cmp___StyledDiv2",componentId:"sc-i7l1ld-1"})({display:"inline-flex",alignItems:"center",gap:"0.5rem"})},96272:function(e,n,t){"use strict";t.d(n,{v:function(){return o}});var i=t(94461),a=t(7251),r=t(67294);function o(e){let{nodes:n}=e,[t]=(0,i.mr)(),{account:o,balance:l=0}=t.account,{data:s}=t.lastCCNVersion,{entities:d}=t.ccns,[c,m]=(0,r.useState)(""),p=(0,a.$P)(c,200),h=(0,r.useCallback)(e=>{let n=e.target.value;m(n)},[]),x=(0,r.useCallback)((e,n)=>{if(n)return e?n.filter(n=>{var t;return null===(t=n.name)||void 0===t?void 0:t.toLowerCase().includes(e.toLowerCase())}):n},[]),g=(0,r.useMemo)(()=>{let e=n||d;if(e)return e.sort((e,n)=>n.score-e.score)},[n,d]),y=(0,r.useMemo)(()=>x(p,g),[x,p,g]);return{account:o,accountBalance:l,nodes:g,filteredNodes:y,filter:c,lastVersion:s,handleFilterChange:h}}},53193:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return eg}});var i=t(85893),a=t(19521),r=t(67294),o=t(9008),l=t.n(o),s=t(7251),d=t(94461),c=t(96272),m=t(38753),p=t(94527),h=t(69797),x=t(51383),g=t(68461),y=t(71806),u=t(90709),f=t(88968),v=t(60202),_=t(11140),w=t(58160),j=t(87931);let N=e=>{let{nodes:n,filteredNodes:t,lastVersion:a,nodesIssues:o}=e,l=(0,r.useMemo)(()=>[{label:"",align:"center",width:0,cellProps:()=>({css:{padding:"0px !important"}}),hcellProps:()=>({css:{borderWidth:"0px !important",padding:"0px !important"}}),render:e=>(null==o?void 0:o[e.hash])?(0,i.jsx)(I,{children:"\xa0"}):null},{label:"SCORE",sortable:!0,sortBy:e=>e.score,render:e=>(0,i.jsx)(f.Z,{score:e.score})},{label:"LINKED",sortable:!0,sortBy:e=>e.resource_nodes.length,render:e=>(0,i.jsx)(u.Z,{nodes:e.crnsData})},{label:"NAME",sortable:!0,sortBy:e=>e.name,render:e=>(0,i.jsx)(y.Z,{hash:e.hash,name:e.name,picture:e.picture})},{label:"STAKED",sortable:!0,width:"100%",sortBy:e=>e.total_staked,render:e=>(0,i.jsx)(_.Z,{staked:e.total_staked,status:e.status,locked:e.locked})},{label:"EST. APY",render:e=>(0,i.jsx)(v.Z,{node:e,nodes:n})},{label:"VERSION",sortable:!0,sortBy:e=>{var n;return null===(n=e.metricsData)||void 0===n?void 0:n.version},render:e=>(0,i.jsx)(w.Z,{node:e,nodes:n,lastVersion:a})},{label:"",align:"right",render:e=>(0,i.jsx)(S,{children:(0,i.jsx)(j.C,{kind:"neon",size:"regular",variant:"secondary",color:"main0",href:"/earn/ccn/".concat(e.hash),children:"Info"})})}],[a,n,o]);return(0,i.jsx)(g.Z,{columns:l,data:t})};N.displayName="CoreChannelNodesTable";var C=(0,r.memo)(N),I=(0,a.ZP)(s.Cc).withConfig({displayName:"cmp___StyledNotificationBadge",componentId:"sc-1gsmq73-0"})({marginLeft:"auto !important",marginRight:"auto !important",display:"flex !important"}),S=(0,a.ZP)("div").withConfig({displayName:"cmp___StyledDiv",componentId:"sc-1gsmq73-1"})({display:"inline-flex",justifyContent:"flex-end",gap:"0.75rem"}),Z=t(58833),b=t(49869),P=t(41664),D=t.n(P),A=t(33445),k=t(28417),E=t(63639),B=t(47630),T=t(34816),z=t(43815),R=t(42983),M=t(13153),F=t(63608),H=t(87625);let W=e=>{let{nodes:n,...t}=e,o=(0,r.useMemo)(()=>new B.S,[]),l=(0,a.Fg)(),d=(0,r.useMemo)(()=>{let e=o.activeNodes(n||[]),t=15e3/e.length,i=30*t,a=i+t;return[{label:"per month",value:"".concat(i.toFixed(2)),percentage:i/a,gradient:"main1",color:""},{label:"per day",value:"".concat(t.toFixed(2)),percentage:t/a,gradient:"main2",color:""}]},[n,o]),c="".concat(l.color.base0,"20");return(0,i.jsxs)(M.Z,{loading:!n,...t,children:[(0,i.jsx)(L,{forwardedAs:"h3",type:"info",color:"main0",children:"ESTIMATED REWARDS"}),(0,i.jsxs)(O,{children:[(0,i.jsxs)(q,{data:d,width:100,height:100,margin:{},children:[(0,i.jsx)("defs",{children:(0,i.jsx)(H._,{data:d})}),(0,i.jsx)(T.b,{data:[{v:1}],dataKey:"v",stroke:"transparent",innerRadius:"72%",outerRadius:"100%",startAngle:450,endAngle:90,isAnimationActive:!1,fill:c}),(0,i.jsx)(T.b,{data:d,dataKey:"percentage",stroke:"transparent",innerRadius:"72%",outerRadius:"100%",startAngle:450,endAngle:90,children:d.map(e=>{let n="gr-".concat(e.gradient),t=e.gradient?"url(#".concat(n,")"):e.color?l.color[e.color]||e.color:void 0;return(0,i.jsx)(z.b,{fill:t},e.label)})})]}),(0,i.jsx)(K,{children:d.map(e=>(0,i.jsxs)(Y,{children:[(0,i.jsx)(F.Z,{$color:"transparent"===e.color?c:e.color,$gradient:e.gradient,$size:"1.25rem"}),(0,i.jsxs)(J,{className:"tp-body3",children:[(0,i.jsxs)(V,{children:[e.value," ",(0,i.jsx)(s.TR,{text:""})]}),(0,i.jsx)(U,{className:"fs-10",children:e.label})]})]},e.label))})]})]})};W.displayName="EstimatedNodeRewardsChart";var $=(0,r.memo)(W),L=(0,a.ZP)(s.DU).withConfig({displayName:"cmp___StyledTextGradient",componentId:"sc-8p9zt4-0"})({margin:"0px",minHeight:"2rem"}),O=(0,a.ZP)("div").withConfig({displayName:"cmp___StyledDiv",componentId:"sc-8p9zt4-1"})({display:"flex",flexDirection:"column",alignItems:"center"}),q=(0,a.ZP)(R.u).withConfig({displayName:"cmp___StyledPieChart",componentId:"sc-8p9zt4-2"})({marginTop:"0.75rem",marginBottom:"0.75rem",minHeight:"6.25rem"}),K=(0,a.ZP)("div").withConfig({displayName:"cmp___StyledDiv2",componentId:"sc-8p9zt4-3"})({marginTop:"0.25rem",display:"flex",flexDirection:"column",gap:"1rem"}),Y=(0,a.ZP)("div").withConfig({displayName:"cmp___StyledDiv3",componentId:"sc-8p9zt4-4"})({display:"flex",alignItems:"center",gap:"0.75rem"}),J=(0,a.ZP)("div").withConfig({displayName:"cmp___StyledDiv4",componentId:"sc-8p9zt4-5"})({display:"flex",flexDirection:"column",justifyContent:"space-between",gap:"0.25rem",whiteSpace:"nowrap",fontStyle:"normal",lineHeight:"1rem !important"}),V=(0,a.ZP)("div").withConfig({displayName:"cmp___StyledDiv5",componentId:"sc-8p9zt4-6"})({display:"flex",alignItems:"center",gap:"0.25rem"}),U=(0,a.ZP)("div").withConfig({displayName:"cmp___StyledDiv6",componentId:"sc-8p9zt4-7"})({opacity:"0.6"});let G=e=>{let{account:n,nodes:t,filteredNodes:a,userNodes:o,filteredUserNodes:g,userNodesIssues:y,tabs:u,selectedTab:f,filter:v,lastVersion:_,userRewards:w,lastDistribution:j,handleTabChange:N,handleFilterChange:I}=function(e){let[n]=(0,d.mr)(),{account:t,balance:a=0}=n.account,{nodes:o,filteredNodes:l,...g}=(0,c.v)(e),{userNodes:y}=(0,h.M)({nodes:o}),{userNodes:u}=(0,h.M)({nodes:l}),{nodesIssues:f,warningFlag:v}=(0,m.i)({nodes:u}),{sortedNodes:_}=(0,x.L)({nodesIssues:f,nodes:u}),[w,j]=(0,r.useState)(),N=w||((null==y?void 0:y.length)?"user":"nodes"),C=(0,r.useMemo)(()=>{let e=[{id:"nodes",name:"All core nodes"},{id:"user",name:"My core nodes",label:v?{label:(0,i.jsx)(s.Cc,{children:v}),position:"top"}:void 0}];return e},[v]),{lastRewardsCalculation:I,lastRewardsDistribution:S}=(0,p._)(),Z=(0,r.useMemo)(()=>I?null==y?void 0:y.reduce((e,n)=>e+(I.rewards[n.reward]||0),0):void 0,[I,y]),b=null==S?void 0:S.timestamp;return{account:t,accountBalance:a,nodes:o,filteredNodes:l,userNodes:y,filteredUserNodes:_,selectedTab:N,tabs:C,userRewards:Z,lastDistribution:b,userNodesIssues:f,...g,handleTabChange:j}}(e),S=(0,i.jsx)(D(),{href:"/earn/ccn/new",passHref:!0,legacyBehavior:!0,children:(0,i.jsxs)(Q,{color:"main0",kind:"neon",variant:"secondary",size:"regular",disabled:!n,children:[(0,i.jsx)(s.JO,{name:"key"}),"Create core node"]})});return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(l(),{children:[(0,i.jsx)("title",{children:"Aleph.im | Account"}),(0,i.jsx)("meta",{name:"description",content:"Aleph.im Account Dashboard"}),(0,i.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1"})]}),(0,i.jsx)("section",{children:(0,i.jsx)(ee,{className:"tp-h5",children:"Core nodes"})}),(0,i.jsx)("section",{children:(0,i.jsx)(b.Z,{buttons:S,children:(0,i.jsxs)(en,{children:[(0,i.jsxs)(et,{children:[(0,i.jsx)(ei,{children:(0,i.jsx)(k.Z,{nodes:t,title:"CCN NETWORK HEALTH"})}),(0,i.jsxs)(ea,{children:[(0,i.jsx)(er,{children:(0,i.jsx)($,{nodes:t})}),(0,i.jsx)(eo,{children:(0,i.jsx)(E.Z,{title:"CCN REWARDS",calculatedRewards:w,distributionTimestamp:j,disabled:!n||!(null==o?void 0:o.length)})})]})]}),(0,i.jsxs)(el,{children:[(0,i.jsxs)("div",{children:[(0,i.jsx)(es,{className:"tp-h7",children:"What is a core node?"}),(0,i.jsx)("p",{className:"fs-16 xxl:fs-12",children:"CCNs are the cornerstone of Aleph.im, responsible for the security and functionality of our peer-to-peer network. These dedicated nodes, backed by a commitment of 200,000 Aleph tokens, play a pivotal role in network control and governance. As non-custodial operators, they are at the forefront of Aleph.im's innovative ecosystem. For more information on how to set up a node and detailed technical and token requirements, please visit our"}),(0,i.jsx)(Z.Z,{href:"https://docs.aleph.im/nodes/core/",size:"regular",children:"Node Setup Guide"})]}),(0,i.jsx)(ed,{children:S})]})]})})}),(0,i.jsxs)(ec,{children:[(0,i.jsxs)(em,{children:[(0,i.jsx)(ep,{children:(0,i.jsx)(s.mQ,{tabs:u,align:"left",selected:f,onTabChange:N})}),(0,i.jsx)(s.oi,{value:v,name:"filter-ccn",placeholder:"Search me",onChange:I,icon:(0,i.jsx)(s.JO,{name:"search"})})]}),(0,i.jsxs)(eh,{children:[(0,i.jsx)(A.Z,{show:!t}),(0,i.jsx)(i.Fragment,{children:"user"===f?(0,i.jsx)(i.Fragment,{children:t&&g&&(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(C,{nodes:t,filteredNodes:g,nodesIssues:y,lastVersion:_}),(0,i.jsx)(ex,{children:n?(null==o?void 0:o.length)?"":"You have no core node running.":"Connect your wallet to see your core node running."})]})}):(0,i.jsx)(i.Fragment,{children:t&&a&&(0,i.jsx)(C,{nodes:t,filteredNodes:a,lastVersion:_})})})]})]}),(0,i.jsx)(A.Z,{show:!t,center:!0})]})};G.displayName="CoreChannelNodesPage";var X=(0,r.memo)(G),Q=(0,a.ZP)(s.zx).withConfig({displayName:"cmp___StyledButton",componentId:"sc-yt8x4y-0"})({gap:"0.625rem"}),ee=(0,a.ZP)("h1").withConfig({displayName:"cmp___StyledH",componentId:"sc-yt8x4y-1"})({marginBottom:"2rem"}),en=(0,a.ZP)("div").withConfig({displayName:"cmp___StyledDiv",componentId:"sc-yt8x4y-2"})({display:"flex",flexWrap:"wrap",alignItems:"flex-start",gap:"1.5rem","@media (min-width: 87.5rem)":{flexWrap:"nowrap"}}),et=(0,a.ZP)("div").withConfig({displayName:"cmp___StyledDiv2",componentId:"sc-yt8x4y-3"})({order:"2",display:"flex",maxWidth:"100%",flex:"1 1 auto",flexWrap:"wrap",alignItems:"stretch",gap:"1.5rem","@media (min-width: 87.5rem)":{order:"0",flex:"none",flexWrap:"nowrap"}}),ei=(0,a.ZP)("div").withConfig({displayName:"cmp___StyledDiv3",componentId:"sc-yt8x4y-4"})({maxWidth:"100%",flex:"1 1 auto","@media (min-width: 87.5rem)":{flex:"none"}}),ea=(0,a.ZP)("div").withConfig({displayName:"cmp___StyledDiv4",componentId:"sc-yt8x4y-5"})({display:"flex",flex:"1 1 auto",flexWrap:"wrap",alignItems:"stretch",gap:"1.5rem","@media (min-width: 36rem)":{flexWrap:"nowrap"},"@media (min-width: 87.5rem)":{flex:"none"}}),er=(0,a.ZP)("div").withConfig({displayName:"cmp___StyledDiv5",componentId:"sc-yt8x4y-6"})({flex:"1 1 0%"}),eo=(0,a.ZP)("div").withConfig({displayName:"cmp___StyledDiv6",componentId:"sc-yt8x4y-7"})({flex:"1 1 0%"}),el=(0,a.ZP)("div").withConfig({displayName:"cmp___StyledDiv7",componentId:"sc-yt8x4y-8"})({order:"1",display:"flex",flex:"1 1 auto",flexDirection:"column",justifyContent:"space-between",alignSelf:"stretch","@media (min-width: 87.5rem)":{order:"0"}}),es=(0,a.ZP)("h1").withConfig({displayName:"cmp___StyledH2",componentId:"sc-yt8x4y-9"})({marginBottom:"0px"}),ed=(0,a.ZP)("div").withConfig({displayName:"cmp___StyledDiv8",componentId:"sc-yt8x4y-10"})({marginBottom:"1rem",marginTop:"1.5rem","@media (min-width: 87.5rem)":{marginBottom:"0px"}}),ec=(0,a.ZP)("section").withConfig({displayName:"cmp___StyledSection",componentId:"sc-yt8x4y-11"})({marginTop:"3.5rem"}),em=(0,a.ZP)("div").withConfig({displayName:"cmp___StyledDiv9",componentId:"sc-yt8x4y-12"})({marginBottom:"2rem",display:"flex",flexDirection:"column",flexWrap:"wrap",alignItems:"stretch",justifyContent:"space-between",gap:"2.5rem","@media (min-width: 48rem)":{flexDirection:"row",alignItems:"flex-end"}}),ep=(0,a.ZP)("div").withConfig({displayName:"cmp___StyledDiv10",componentId:"sc-yt8x4y-13"})({display:"flex",flexDirection:"column",flexWrap:"wrap",alignItems:"flex-start",gap:"2.5rem","@media (min-width: 36rem)":{flexDirection:"row",alignItems:"center",gap:"1rem"}}),eh=(0,a.ZP)("div").withConfig({displayName:"cmp___StyledDiv11",componentId:"sc-yt8x4y-14"})({position:"relative"}),ex=(0,a.ZP)("div").withConfig({displayName:"cmp___StyledDiv12",componentId:"sc-yt8x4y-15"})({marginLeft:"1rem",marginRight:"1rem",marginTop:"2.5rem",marginBottom:"2.5rem",textAlign:"center",opacity:"0.6"}),eg=X}},function(e){e.O(0,[959,983,987,399,774,888,179],function(){return e(e.s=89176)}),_N_E=e.O()}]);