(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9],{88459:function(e,t,a){"use strict";a.d(t,{Z:function(){return d}});var r=a(85893),n=a(67294),i=a(7251),s=a(19521);let o=s.ZP.div.attrs((0,i.PT)("fx-dark-main0")).withConfig({displayName:"styles__StyledContainer",componentId:"sc-1hw364q-0"})(["",""],{borderRadius:"1.5rem",backgroundColor:"transparent !important",padding:"1.5rem"}),c=(0,n.memo)(e=>{let{children:t,...a}=e;return(0,r.jsx)(o,{...a,children:t})});c.displayName="Card1";var d=c},63608:function(e,t,a){"use strict";a.d(t,{Z:function(){return i}});var r=a(19521);let n=r.ZP.div.withConfig({displayName:"styles__StyledDot",componentId:"sc-1dj2jnl-0"})(e=>{var t;let{theme:a,$color:n="main0",$gradient:i,$size:s="1rem"}=e,o=i?null===(t=a.gradient[i])||void 0===t?void 0:t.fn:void 0,c=o||a.color[n]||n;return[{flexShrink:"0",borderRadius:"9999px"},(0,r.iv)(["background:",";width:",";height:",";"],c,s,s)]});var i=n},29512:function(e,t,a){"use strict";a.d(t,{Z:function(){return u}});var r=a(85893),n=a(19521),i=a(67294),s=a(25675),o=a.n(s),c=a(7251),d=a(33358);let l=(0,i.memo)(e=>{let{hash:t,name:a,picture:n}=e;return(0,r.jsxs)(h,{children:[n?(0,r.jsx)(p,{src:"".concat(d.pf,"/api/v0/storage/raw/").concat(n),alt:"Node profile image",width:24,height:24}):(0,r.jsx)(v,{name:"circle-nodes",size:"xl"}),(0,r.jsxs)(g,{className:"fs-10",children:[(0,r.jsxs)(m,{children:["ID: ",t.slice(-10)]}),a.substring(0,30)]})]})});l.displayName="NameCell";var u=l,h=(0,n.ZP)("div").withConfig({displayName:"cmp___StyledDiv",componentId:"sc-vt9uzz-0"})({display:"inline-flex",alignItems:"center",gap:"0.75rem"}),p=(0,n.ZP)(o()).withConfig({displayName:"cmp___StyledImage",componentId:"sc-vt9uzz-1"})({height:"1.5rem",width:"1.5rem",borderRadius:"9999px"}),v=(0,n.ZP)(c.JO).withConfig({displayName:"cmp___StyledIcon",componentId:"sc-vt9uzz-2"})({borderRadius:"9999px"}),g=(0,n.ZP)("div").withConfig({displayName:"cmp___StyledDiv2",componentId:"sc-vt9uzz-3"})({lineHeight:"1rem"}),m=(0,n.ZP)("div").withConfig({displayName:"cmp___StyledDiv3",componentId:"sc-vt9uzz-4"})({whiteSpace:"nowrap"})},68461:function(e,t,a){"use strict";a.d(t,{Z:function(){return s}});var r=a(7251),n=a(19521);let i=(0,n.ZP)(r.iA).attrs(e=>({borderType:"solid",oddRowNoise:!0,...e})).withConfig({displayName:"styles__StyledTable",componentId:"sc-gp6li6-0"})(["thead th{font-size:0.8125rem;","}td,th{padding:0.75rem 1rem;width:0;}tr,td{border:none;}"],{whiteSpace:"nowrap"});var s=i},88968:function(e,t,a){"use strict";a.d(t,{Z:function(){return d}});var r=a(85893),n=a(19521),i=a(67294),s=a(63608);let o=(0,n.ZP)(s.Z).attrs(e=>{let{$score:t,...a}=e;return{$color:t>=.8?"main1":t>=.5?"main0":"error",...a}}).withConfig({displayName:"styles__StyledScoreIcon",componentId:"sc-347ktn-0"})([""]),c=(0,i.memo)(e=>{let{score:t,showPercentage:a=!0}=e,n=Number(100*t).toFixed(2);return(0,r.jsxs)(l,{children:[(0,r.jsx)(o,{$score:t}),a&&(0,r.jsxs)(r.Fragment,{children:[n,"%"]})]})});c.displayName="ScoreCell";var d=c,l=(0,n.ZP)("div").withConfig({displayName:"cmp___StyledDiv",componentId:"sc-gpthn5-0"})({display:"inline-flex",alignItems:"center",gap:"0.75rem"})},64486:function(e,t,a){"use strict";a.d(t,{B:function(){return o}});var r=a(33358),n=a(8395),i=a(34853);let{post:s}=n.messages;class o{async getCCNNodes(){var e,t,a,n;let i=await fetch("".concat(r.pf,"/api/v0/aggregates/0xa1B3bb7d2332383D96b7796B908fB7f7F3c2Be10.json?keys=corechannel&limit=100")),s=await i.json(),o=null==s?void 0:null===(e=s.data)||void 0===e?void 0:null===(t=e.corechannel)||void 0===t?void 0:t.resource_nodes,c=null==s?void 0:null===(a=s.data)||void 0===a?void 0:null===(n=a.corechannel)||void 0===n?void 0:n.nodes;return c=this.parseResourceNodes(c,o),c=await this.parseScores(c,!1),console.log(c=await this.parseMetrics(c,!1)),c}async getCRNNodes(){var e,t,a,n;let i=await fetch("".concat(r.pf,"/api/v0/aggregates/0xa1B3bb7d2332383D96b7796B908fB7f7F3c2Be10.json?keys=corechannel&limit=100")),s=await i.json(),o=null==s?void 0:null===(e=s.data)||void 0===e?void 0:null===(t=e.corechannel)||void 0===t?void 0:t.nodes,c=null==s?void 0:null===(a=s.data)||void 0===a?void 0:null===(n=a.corechannel)||void 0===n?void 0:n.resource_nodes;return c=this.parseParentNodes(c,o),c=await this.parseScores(c,!0),console.log(c=await this.parseMetrics(c,!0)),c}async getLatestVersion(e){return this.isCRN(e)?this.getLatestCRNVersion():this.getLatestCCNVersion()}async getLatestCCNVersion(){return(0,i.vM)("https://api.github.com/repos/aleph-im/pyaleph/releases","ccn_versions",3e5,i.dU)}async getLatestCRNVersion(){return(0,i.vM)("https://api.github.com/repos/aleph-im/aleph-vm/releases","crn_versions",3e5,i.dU)}isCRN(e){return Object.hasOwn(e,"parent")}isKYCRequired(e){return void 0!==e.registration_url&&""!==e.registration_url}isKYCCleared(e){var t;return!!this.account&&(null===(t=e.authorized)||void 0===t?void 0:t.includes(this.account.address))}isLocked(e){return!!e.locked&&!(this.isKYCRequired(e)&&this.isKYCCleared(e))}isUserNode(e){return!!this.account&&this.account.address===e.owner}isUserStake(e){return!!this.account&&void 0!==e.stakers[this.account.address]}isStakeable(e,t,a){return this.account?t<1e4?[!1,"You need at least 10000 ALEPH to stake"]:e.total_staked>=75e4?[!1,"Too many ALEPH staked on that node"]:this.isLocked(e)?[!1,"This node is locked"]:this.isUserNode(e)?[!1,"You can't stake while you operate a node"]:a.length?[!0,"Add this node to your staking (each node will have an equal part of your total balance staked)"]:[!0,"Stake ".concat(t.toFixed(2)," ALEPH in this node")]:[!1,"Please login"]}isNodeExperimental(e,t){var a,r;let n=(0,i.Jm)((null===(a=e.metricsData)||void 0===a?void 0:a.version)||"");return n!==(null===(r=e.metricsData)||void 0===r?void 0:r.version)&&n===t.prerelease}isNodeLatest(e,t){var a;return(null===(a=e.metricsData)||void 0===a?void 0:a.version)===t.latest}isNodePrerelease(e,t){var a;return(null===(a=e.metricsData)||void 0===a?void 0:a.version)===t.prerelease}isNodeUptodate(e,t){return this.isNodeLatest(e,t)||this.isNodePrerelease(e,t)||this.isNodeExperimental(e,t)}isNodeOutdated(e,t){var a;return t.outdated===(null===(a=e.metricsData)||void 0===a?void 0:a.version)}parseResourceNodes(e,t){let a=t.reduce((e,t)=>{let a=e[t.parent]=e[t.parent]||[];return a.push(t),e},{});return e.map(e=>{let t=a[e.hash]||[];return t?{...e,crnsData:t}:e})}parseParentNodes(e,t){let a=t.reduce((e,t)=>(e[t.hash]=t,e),{});return e.map(e=>{let t=a[e.parent];return t?{...e,parentData:t}:e})}async parseScores(e,t){let a=t?await this.getCRNScores():await this.getCCNScores(),r=new Map(a.map(e=>[e.node_id,e]));return e.map(e=>{let t=r.get(e.hash);return t?{...e,score:t.total_score,decentralization:t.decentralization,performance:t.performance,version:t.version,scoreData:t}:e})}async parseMetrics(e,t){let a=t?await this.getCRNMetrics():await this.getCCNMetrics(),r=new Map(a.map(e=>[e.node_id,e]));return e.map(e=>{let t=r.get(e.hash);return t?{...e,metricsData:t}:e})}async getScores(){var e,t;let a=await s.Get({types:"aleph-scoring-scores",addresses:[r.id],pagination:1,page:1});return null===(e=null===(t=a.posts[0])||void 0===t?void 0:t.content)||void 0===e?void 0:e.scores}async getMetrics(){var e,t;let a=await s.Get({types:"aleph-network-metrics",addresses:[r.id],pagination:1,page:1});return null===(e=null===(t=a.posts[0])||void 0===t?void 0:t.content)||void 0===e?void 0:e.metrics}async getCCNScores(){let e=await this.getScores();return e.ccn}async getCCNMetrics(){let e=await this.getMetrics();return e.ccn}async getCRNScores(){let e=await this.getScores();return e.crn}async getCRNMetrics(){let e=await this.getMetrics();return e.crn}constructor(e,t=r.Nr){this.account=e,this.channel=t}}},47630:function(e,t,a){"use strict";a.d(t,{S:function(){return o}});var r=a(33358),n=a(34853),i=a(67572),s=a(57492);class o{async getLastStakingRewards(){var e,t;let a=await i.post.Get({types:"staking-rewards-distribution",addresses:[r.j1],tags:["distribution"],pagination:1,page:1});return null===(e=null===(t=a.posts[0])||void 0===t?void 0:t.content)||void 0===e?void 0:e.rewards}async getLastUserStakingRewards(){if(!this.account)return 0;let e=await this.getLastStakingRewards();return e[this.account.address]}async stake(e){if(!this.account)throw Error("Invalid account");await i.post.Publish({account:this.account,postType:"corechan-operation",storageEngine:s.ItemType.inline,ref:e,APIServer:r.pf,channel:"FOUNDATION",content:{tags:["stake-split","mainnet"],action:"stake-split"}})}async unStake(e){if(!this.account)throw Error("Invalid account");await i.post.Publish({account:this.account,postType:"corechan-operation",storageEngine:s.ItemType.inline,ref:e,APIServer:r.pf,channel:"FOUNDATION",content:{tags:["unstake","mainnet"],action:"unstake"}})}isCRN(e){return Object.hasOwn(e,"parent")}activeNodes(e){return e.filter(e=>this.isCRN(e)?"linked"===e.status:"active"===e.status)}totalStaked(e){return e.reduce((e,t)=>e+t.total_staked,0)}totalStakedByOperators(e){return 2e5*e.length}totalStakedInActive(e){return this.totalStaked(this.activeNodes(e))}totalPerDay(e){let t=this.activeNodes(e).length;return t?15e3*((Math.log10(t)+1)/3):t}totalPerAlephPerDay(e){let t=this.totalStakedInActive(e);return t?this.totalPerDay(e)/t:0}currentAPY(e){return(1+this.totalPerAlephPerDay(e))**365-1}computeEstimatedStakersAPY(e,t){let a=0;if(e.score){let r=Math.min(e.crnsData.filter(e=>e.score>=.2).length,3),i=(0,n._1)(e.score,.2,.8,0,1);a=this.currentAPY(t)*i*(1-(3-r)/10)}return a}computeCCNRewards(e,t){let a=0;if(e.score){let r=Math.min(e.crnsData.length,3),i=this.activeNodes(t).length,s=(0,n._1)(e.score,.2,.8,0,1);a=15e3/i*s*(1-(3-r)/10)}return a}computeCRNRewards(e){if(!e.parent||!e.score||!e.decentralization)return 0;let{decentralization:t,score:a}=e;return(500+2500*t)*(0,n._1)(a,.2,.8,0,1)}constructor(e,t=r.Nr){this.account=e,this.channel=t}}},9700:function(e,t,a){"use strict";a.d(t,{Q:function(){return i}});var r=a(67294),n=a(7251);function i(e){let{doRequest:t,triggerOnMount:a,triggerDeps:i=[],...s}=e,[o,{onLoad:c,onSuccess:d,onError:l}]=function(){let{onSuccess:e,onError:t,onLoad:a}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},i=(0,n.lm)(),[s,o]=(0,r.useState)({data:void 0,loading:!1,error:void 0}),c=(0,r.useCallback)(t=>{function a(){i&&i.add({variant:"success",title:"Operation complete"})}return o({data:t,loading:!1,error:void 0}),e?e(t,a):a()},[i,e]),d=(0,r.useCallback)(e=>{function a(e){var t;let a=e.message,r=null===(t=null==e?void 0:e.cause)||void 0===t?void 0:t.message;i&&i.add({variant:"error",title:"Error",text:a,detail:r})}return o({data:void 0,loading:!1,error:e}),t?t(e,a):a(e)},[t,i]),l=(0,r.useCallback)(()=>{o({data:void 0,loading:!0,error:void 0}),a&&a()},[a]);return[s,{onSuccess:c,onError:d,onLoad:l}]}(s),u=(0,r.useCallback)(async()=>{c();try{let e=await t();d(e);return}catch(e){l(e)}},[t,c,d,l]);return(0,r.useEffect)(()=>{a&&u()},i),{...o,request:u}}},70573:function(){},35883:function(){},78486:function(){},42480:function(){},75992:function(){},78110:function(){},28325:function(){},33370:function(){}}]);