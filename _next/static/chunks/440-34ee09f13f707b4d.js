(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[440],{88459:function(e,t,n){"use strict";n.d(t,{Z:function(){return l}});var r=n(85893),a=n(67294),i=n(7251),s=n(19521);let o=s.ZP.div.attrs((0,i.PT)("fx-dark-main0")).withConfig({displayName:"styles__StyledContainer",componentId:"sc-1hw364q-0"})(["",""],{borderRadius:"1.5rem",backgroundColor:"transparent !important",padding:"1.5rem"}),c=s.ZP.div.withConfig({displayName:"styles__StyledContent",componentId:"sc-1hw364q-1"})(["",""],e=>{let{$disabled:t}=e;return t&&(0,s.iv)(["opacity:0.4;filter:grayscale(100%);"])}),d=(0,a.memo)(e=>{let{children:t,disabled:n,...a}=e;return(0,r.jsx)(o,{...a,children:(0,r.jsx)(c,{$disabled:n,children:t})})});d.displayName="Card1";var l=d},63608:function(e,t,n){"use strict";n.d(t,{Z:function(){return i}});var r=n(19521);let a=r.ZP.div.withConfig({displayName:"styles__StyledDot",componentId:"sc-1dj2jnl-0"})(e=>{var t;let{theme:n,$color:a="main0",$gradient:i,$size:s="1rem"}=e,o=i?null===(t=n.gradient[i])||void 0===t?void 0:t.fn:void 0,c=o||n.color[a]||a;return[{flexShrink:"0",borderRadius:"9999px"},(0,r.iv)(["background:",";width:",";height:",";"],c,s,s)]});var i=a},29512:function(e,t,n){"use strict";n.d(t,{Z:function(){return u}});var r=n(85893),a=n(19521),i=n(67294),s=n(25675),o=n.n(s),c=n(7251),d=n(33358);let l=(0,i.memo)(e=>{let{hash:t,name:n,picture:a}=e;return(0,r.jsxs)(p,{children:[a?(0,r.jsx)(h,{src:"".concat(d.pf,"/api/v0/storage/raw/").concat(a),alt:"Node profile image",width:24,height:24}):(0,r.jsx)(m,{name:"circle-nodes",size:"xl"}),(0,r.jsxs)(g,{className:"fs-10",children:[(0,r.jsxs)(v,{children:["ID: ",t.slice(-10)]}),n.substring(0,30)]})]})});l.displayName="NameCell";var u=l,p=(0,a.ZP)("div").withConfig({displayName:"cmp___StyledDiv",componentId:"sc-vt9uzz-0"})({display:"inline-flex",alignItems:"center",gap:"0.75rem"}),h=(0,a.ZP)(o()).withConfig({displayName:"cmp___StyledImage",componentId:"sc-vt9uzz-1"})({height:"1.5rem",width:"1.5rem",borderRadius:"9999px"}),m=(0,a.ZP)(c.JO).withConfig({displayName:"cmp___StyledIcon",componentId:"sc-vt9uzz-2"})({borderRadius:"9999px"}),g=(0,a.ZP)("div").withConfig({displayName:"cmp___StyledDiv2",componentId:"sc-vt9uzz-3"})({lineHeight:"1rem"}),v=(0,a.ZP)("div").withConfig({displayName:"cmp___StyledDiv3",componentId:"sc-vt9uzz-4"})({whiteSpace:"nowrap"})},68461:function(e,t,n){"use strict";n.d(t,{Z:function(){return s}});var r=n(7251),a=n(19521);let i=(0,a.ZP)(r.iA).attrs(e=>({borderType:"solid",oddRowNoise:!0,...e})).withConfig({displayName:"styles__StyledTable",componentId:"sc-gp6li6-0"})(["thead th{font-size:0.8125rem;","}td,th{padding:0.75rem 1rem;width:0;}tr,td{border:none;}"],{whiteSpace:"nowrap"});var s=i},88968:function(e,t,n){"use strict";n.d(t,{Z:function(){return d}});var r=n(85893),a=n(19521),i=n(67294),s=n(63608);let o=(0,a.ZP)(s.Z).attrs(e=>{let{$score:t,...n}=e;return{$color:t>=.8?"main1":t>=.5?"main0":"error",...n}}).withConfig({displayName:"styles__StyledScoreIcon",componentId:"sc-347ktn-0"})([""]),c=(0,i.memo)(e=>{let{score:t,showPercentage:n=!0}=e,a=Number(100*t).toFixed(2);return(0,r.jsxs)(l,{children:[(0,r.jsx)(o,{$score:t}),n&&(0,r.jsxs)(r.Fragment,{children:[a,"%"]})]})});c.displayName="ScoreCell";var d=c,l=(0,a.ZP)("div").withConfig({displayName:"cmp___StyledDiv",componentId:"sc-gpthn5-0"})({display:"inline-flex",alignItems:"center",gap:"0.75rem"})},49869:function(e,t,n){"use strict";n.d(t,{Z:function(){return c}});var r=n(85893),a=n(19521),i=n(67294),s=n(7251);let o=e=>{let{children:t,...n}=e,[a,o]=(0,i.useState)(!0),{shouldMount:c,ref:m,state:g}=(0,s.Q)({onOff:!a});return(0,r.jsxs)(d,{...n,children:[c&&(0,r.jsxs)(l,{ref:m,color:"main0",kind:"neon",variant:"secondary",size:"regular",onClick:()=>o(e=>!e),$_css:[{position:"absolute !important",top:"0px",gap:"0.625rem",transitionDuration:"200ms"},"exit"===g?{opacity:"0"}:{opacity:"1",transitionDelay:"300ms !important"}],children:[(0,r.jsx)(s.JO,{name:"gauge"}),"open dashboard"]}),(0,r.jsxs)(u,{open:a,duration:500,$_css2:[{transitionProperty:"all",transitionTimingFunction:"cubic-bezier(0.4, 0, 0.2, 1)",transitionDuration:"500ms"},a&&{margin:"-20rem",padding:"20rem"}],children:[t,(0,r.jsxs)(p,{color:"main0",kind:"neon",variant:"text-only",size:"regular",onClick:()=>o(e=>!e),$_css3:[{marginLeft:"auto !important",marginTop:"1.5rem !important",display:"flex !important",gap:"0.625rem"}],children:[(0,r.jsx)(h,{name:"sort-up"}),"collapse"]})]})]})};o.displayName="ToggleDashboard";var c=(0,i.memo)(o),d=(0,a.ZP)("div").withConfig({displayName:"cmp___StyledDiv",componentId:"sc-juc50-0"})({position:"relative",marginBottom:"3.5rem",marginTop:"2rem",minHeight:"2.3125rem"}),l=(0,a.ZP)(s.zx).withConfig({displayName:"cmp___StyledButton",componentId:"sc-juc50-1"})(["",""],e=>e.$_css),u=(0,a.ZP)(s.Gd).withConfig({displayName:"cmp___StyledToggleContainer",componentId:"sc-juc50-2"})(["",""],e=>e.$_css2),p=(0,a.ZP)(s.zx).withConfig({displayName:"cmp___StyledButton2",componentId:"sc-juc50-3"})(["",""],e=>e.$_css3),h=(0,a.ZP)(s.JO).withConfig({displayName:"cmp___StyledIcon",componentId:"sc-juc50-4"})({height:"0.875rem",width:"0.875rem",paddingTop:"0.5rem"})},87625:function(e,t,n){"use strict";n.d(t,{_:function(){return i}});var r=n(85893),a=n(19521);function i(e){let{data:t}=e,n=(0,a.Fg)();return(0,r.jsx)(r.Fragment,{children:t.filter(e=>!!e.gradient).map((e,t)=>{if(!e.gradient)return null;let{colors:a,deg:i,stops:s}="string"==typeof e.gradient?n.gradient[e.gradient]:e.gradient,o="string"==typeof e.gradient?"gr-".concat(e.gradient):"gr-".concat(t);return(0,r.jsx)("linearGradient",{id:o,gradientTransform:"rotate(".concat(i+-90," 0.5 0.5)"),children:a.map((e,t)=>(0,r.jsx)("stop",{offset:"".concat(s[t],"%"),stopColor:e},e))},o)})})}},64486:function(e,t,n){"use strict";n.d(t,{B:function(){return o}});var r=n(33358),a=n(8395),i=n(34853);let{post:s}=a.messages;class o{async getCCNNodes(){var e,t,n,a;let i=await fetch("".concat(r.pf,"/api/v0/aggregates/0xa1B3bb7d2332383D96b7796B908fB7f7F3c2Be10.json?keys=corechannel&limit=100")),s=await i.json(),o=null==s?void 0:null===(e=s.data)||void 0===e?void 0:null===(t=e.corechannel)||void 0===t?void 0:t.resource_nodes,c=null==s?void 0:null===(n=s.data)||void 0===n?void 0:null===(a=n.corechannel)||void 0===a?void 0:a.nodes;return c=this.parseResourceNodes(c,o),c=await this.parseScores(c,!1),console.log(c=await this.parseMetrics(c,!1)),c}async getCRNNodes(){var e,t,n,a;let i=await fetch("".concat(r.pf,"/api/v0/aggregates/0xa1B3bb7d2332383D96b7796B908fB7f7F3c2Be10.json?keys=corechannel&limit=100")),s=await i.json(),o=null==s?void 0:null===(e=s.data)||void 0===e?void 0:null===(t=e.corechannel)||void 0===t?void 0:t.nodes,c=null==s?void 0:null===(n=s.data)||void 0===n?void 0:null===(a=n.corechannel)||void 0===a?void 0:a.resource_nodes;return c=this.parseParentNodes(c,o),c=await this.parseScores(c,!0),console.log(c=await this.parseMetrics(c,!0)),c}async getLatestVersion(e){return this.isCRN(e)?this.getLatestCRNVersion():this.getLatestCCNVersion()}async getLatestCCNVersion(){return(0,i.vM)("https://api.github.com/repos/aleph-im/pyaleph/releases","ccn_versions",3e5,i.dU)}async getLatestCRNVersion(){return(0,i.vM)("https://api.github.com/repos/aleph-im/aleph-vm/releases","crn_versions",3e5,i.dU)}isCRN(e){return Object.hasOwn(e,"parent")}isKYCRequired(e){return void 0!==e.registration_url&&""!==e.registration_url}isKYCCleared(e){var t;return!!this.account&&(null===(t=e.authorized)||void 0===t?void 0:t.includes(this.account.address))}isLocked(e){return!!e.locked&&!(this.isKYCRequired(e)&&this.isKYCCleared(e))}isUserNode(e){return!!this.account&&this.account.address===e.owner}isUserStake(e){return!!this.account&&void 0!==e.stakers[this.account.address]}isStakeable(e,t,n){return this.account?t<1e4?[!1,"You need at least 10000 ALEPH to stake"]:e.total_staked>=75e4?[!1,"Too many ALEPH staked on that node"]:this.isLocked(e)?[!1,"This node is locked"]:this.isUserNode(e)?[!1,"You can't stake while you operate a node"]:n.length?[!0,"Add this node to your staking (each node will have an equal part of your total balance staked)"]:[!0,"Stake ".concat(t.toFixed(2)," ALEPH in this node")]:[!1,"Please login"]}isNodeExperimental(e,t){var n,r;let a=(0,i.Jm)((null===(n=e.metricsData)||void 0===n?void 0:n.version)||"");return a!==(null===(r=e.metricsData)||void 0===r?void 0:r.version)&&a===t.prerelease}isNodeLatest(e,t){var n;return(null===(n=e.metricsData)||void 0===n?void 0:n.version)===t.latest}isNodePrerelease(e,t){var n;return(null===(n=e.metricsData)||void 0===n?void 0:n.version)===t.prerelease}isNodeUptodate(e,t){return this.isNodeLatest(e,t)||this.isNodePrerelease(e,t)||this.isNodeExperimental(e,t)}isNodeOutdated(e,t){var n;return t.outdated===(null===(n=e.metricsData)||void 0===n?void 0:n.version)}parseResourceNodes(e,t){let n=t.reduce((e,t)=>{let n=e[t.parent]=e[t.parent]||[];return n.push(t),e},{});return e.map(e=>{let t=n[e.hash]||[];return t?{...e,crnsData:t}:e})}parseParentNodes(e,t){let n=t.reduce((e,t)=>(e[t.hash]=t,e),{});return e.map(e=>{let t=n[e.parent];return t?{...e,parentData:t}:e})}async parseScores(e,t){let n=t?await this.getCRNScores():await this.getCCNScores(),r=new Map(n.map(e=>[e.node_id,e]));return e.map(e=>{let t=r.get(e.hash);return t?{...e,score:t.total_score,decentralization:t.decentralization,performance:t.performance,version:t.version,scoreData:t}:e})}async parseMetrics(e,t){let n=t?await this.getCRNMetrics():await this.getCCNMetrics(),r=new Map(n.map(e=>[e.node_id,e]));return e.map(e=>{let t=r.get(e.hash);return t?{...e,metricsData:t}:e})}async getScores(){var e,t;let n=await s.Get({types:"aleph-scoring-scores",addresses:[r.id],pagination:1,page:1});return null===(e=null===(t=n.posts[0])||void 0===t?void 0:t.content)||void 0===e?void 0:e.scores}async getMetrics(){var e,t;let n=await s.Get({types:"aleph-network-metrics",addresses:[r.id],pagination:1,page:1});return null===(e=null===(t=n.posts[0])||void 0===t?void 0:t.content)||void 0===e?void 0:e.metrics}async getCCNScores(){let e=await this.getScores();return e.ccn}async getCCNMetrics(){let e=await this.getMetrics();return e.ccn}async getCRNScores(){let e=await this.getScores();return e.crn}async getCRNMetrics(){let e=await this.getMetrics();return e.crn}constructor(e,t=r.Nr){this.account=e,this.channel=t}}},47630:function(e,t,n){"use strict";n.d(t,{S:function(){return o}});var r=n(33358),a=n(34853),i=n(67572),s=n(57492);class o{async getLastStakingRewards(){var e,t;let n=await i.post.Get({types:"staking-rewards-distribution",addresses:[r.j1],tags:["distribution"],pagination:1,page:1});return null===(e=null===(t=n.posts[0])||void 0===t?void 0:t.content)||void 0===e?void 0:e.rewards}async getLastUserStakingRewards(){if(!this.account)return 0;let e=await this.getLastStakingRewards();return e[this.account.address]}async stake(e){if(!this.account)throw Error("Invalid account");await i.post.Publish({account:this.account,postType:"corechan-operation",storageEngine:s.ItemType.inline,ref:e,APIServer:r.pf,channel:"FOUNDATION",content:{tags:["stake-split","mainnet"],action:"stake-split"}})}async unStake(e){if(!this.account)throw Error("Invalid account");await i.post.Publish({account:this.account,postType:"corechan-operation",storageEngine:s.ItemType.inline,ref:e,APIServer:r.pf,channel:"FOUNDATION",content:{tags:["unstake","mainnet"],action:"unstake"}})}isCRN(e){return Object.hasOwn(e,"parent")}activeNodes(e){return e.filter(e=>this.isCRN(e)?"linked"===e.status:"active"===e.status)}totalStaked(e){return e.reduce((e,t)=>e+t.total_staked,0)}totalStakedByUser(e){let{account:t}=this;return t?e.reduce((e,n)=>e+(n.stakers[t.address]||0),0):0}totalStakedByOperators(e){return 2e5*e.length}totalStakedInActive(e){return this.totalStaked(this.activeNodes(e))}totalPerDay(e){let t=this.activeNodes(e).length;return t?15e3*((Math.log10(t)+1)/3):t}totalPerAlephPerDay(e){let t=this.totalStakedInActive(e);return t?this.totalPerDay(e)/t:0}currentAPY(e){return(1+this.totalPerAlephPerDay(e))**365-1}computeEstimatedStakersAPY(e,t){let n=0;if(e.score){let r=Math.min(e.crnsData.filter(e=>e.score>=.2).length,3),i=(0,a._1)(e.score,.2,.8,0,1);n=this.currentAPY(t)*i*(1-(3-r)/10)}return n}computeCCNRewards(e,t){let n=0;if(e.score){let r=Math.min(e.crnsData.length,3),i=this.activeNodes(t).length,s=(0,a._1)(e.score,.2,.8,0,1);n=15e3/i*s*(1-(3-r)/10)}return n}computeCRNRewards(e){if(!e.parent||!e.score||!e.decentralization)return 0;let{decentralization:t,score:n}=e;return(500+2500*t)*(0,a._1)(n,.2,.8,0,1)}constructor(e,t=r.Nr){this.account=e,this.channel=t}}},9700:function(e,t,n){"use strict";n.d(t,{Q:function(){return i}});var r=n(67294),a=n(7251);function i(e){let{doRequest:t,triggerOnMount:n,triggerDeps:i=[],...s}=e,[o,{onLoad:c,onSuccess:d,onError:l}]=function(){let{onSuccess:e,onError:t,onLoad:n}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},i=(0,a.lm)(),[s,o]=(0,r.useState)({data:void 0,loading:!1,error:void 0}),c=(0,r.useCallback)(t=>{function n(){i&&i.add({variant:"success",title:"Operation complete"})}return o({data:t,loading:!1,error:void 0}),e?e(t,n):n()},[i,e]),d=(0,r.useCallback)(e=>{function n(e){var t;let n=e.message,r=null===(t=null==e?void 0:e.cause)||void 0===t?void 0:t.message;i&&i.add({variant:"error",title:"Error",text:n,detail:r})}return o({data:void 0,loading:!1,error:e}),t?t(e,n):n(e)},[t,i]),l=(0,r.useCallback)(()=>{o({data:void 0,loading:!0,error:void 0}),n&&n()},[n]);return[s,{onSuccess:c,onError:d,onLoad:l}]}(s),u=(0,r.useCallback)(async()=>{c();try{let e=await t();d(e);return}catch(e){l(e)}},[t,c,d,l]);return(0,r.useEffect)(()=>{n&&u()},i),{...o,request:u}}},70573:function(){},35883:function(){},78486:function(){},42480:function(){},75992:function(){},78110:function(){},28325:function(){},33370:function(){}}]);