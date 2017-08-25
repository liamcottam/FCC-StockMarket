webpackJsonp([1],{172:function(t,n,a){"use strict";function i(t,n){return t.findIndex(function(t){return t.name===n.toUpperCase()})}var e=a(202),o=a.n(e),r=a(116),s=a(452),c=a(178),u=a.n(c);r.a.use(s.a);var d={data:[],loading:[]},l={init:function(t){var n=t.commit;u.a.get("/api/v1/init").then(function(t){n("init",t.data)}).catch(function(){})},addItem:function(t,n){var a=t.commit,e=t.state,r=i(e.loading,n);if(-1!==r)return r.promise;var s=new o.a(function(t,o){if(-1!==i(e.data,n))return void t();u.a.get("/api/v1/get/"+n).then(function(n){a("add",n.data),t()}).catch(function(){o()})});return a("loading",{name:n,promise:s}),s},removeItem:function(t,n){(0,t.commit)("remove",n)}},p={init:function(t,n){t.data=n,t.data.sort(function(t,n){return t.symbol.localeCompare(n.symbol)})},add:function(t,n){-1===i(t.data,name)&&(t.data.push(n),t.data.sort(function(t,n){return t.name.localeCompare(n.name)}),t.loading.splice(i(t.loading,name),1))},remove:function(t,n){var a=i(t.data,n);-1!==a&&t.data.splice(a,1)},loading:function(t,n){t.loading.push(n)}};n.a=new s.a.Store({state:d,actions:l,mutations:p,strict:!0})},174:function(t,n,a){"use strict";function i(t){a(442)}var e=a(197),o=a(449),r=a(114),s=i,c=r(e.a,o.a,s,null,null);n.a=c.exports},175:function(t,n,a){"use strict";var i=a(198),e=a(448),o=a(114),r=o(i.a,e.a,null,null,null);n.a=r.exports},176:function(t,n,a){"use strict";function i(t){a(443)}var e=a(199),o=a(450),r=a(114),s=i,c=r(e.a,o.a,s,null,null);n.a=c.exports},196:function(t,n,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=a(173),e=(a.n(i),a(116)),o=a(177),r=a.n(o),s=a(174),c=a(176),u=a(175),d=a(172);e.a.config.productionTip=!1,e.a.use(r.a,window.location.host),e.a.mixin({created:function(){this.$appName="FCC-StockMarket"}}),e.a.component("Options",c.a),e.a.component("Chart",u.a),new e.a({el:"#app",store:d.a,render:function(t){return t(s.a)}})},197:function(t,n,a){"use strict";n.a={created:function(){var t=this;this.$options.sockets.add=function(n){t.$store.dispatch("addItem",n)},this.$options.sockets.remove=function(n){t.$store.dispatch("removeItem",n)},this.$options.sockets.connect=function(){t.$store.dispatch("init")},this.$options.sockets.disconnect=function(){t.$store.dispatch("init")}}}},198:function(t,n,a){"use strict";var i=a(201),e=a.n(i),o=a(444),r=a.n(o);a(445)(r.a),a(171)(r.a),a(171)(r.a),n.a={data:function(){return{chart:null,options:{title:{text:"Stock Chart"},tooltip:{formatter:function(){var t="";this.points.sort(function(t,n){return t.y<n.y?1:t.y>n.y?-1:0});for(var n=0;n<this.points.length;n++)t+='<span style="color:'+this.points[n].series.color+'">●</span> '+this.points[n].series.name+": <b>"+this.points[n].y+"</b><br/>";return t}}}}},mounted:function(){this.drawBoard()},watch:{data:function(){this.drawBoard()}},methods:{drawBoard:function(){this.chart=r.a.stockChart("container",e()({series:this.data},this.options))}},computed:{data:function(){return this.$store.state.data}}}},199:function(t,n,a){"use strict";n.a={data:function(){return{input:"",error:null}},methods:{removeItem:function(t){this.$socket.emit("remove",this.data[t].name),this.$store.dispatch("removeItem",this.data[t].name)},addItem:function(){var t=this;this.isValid&&this.$store.dispatch("addItem",this.input.toUpperCase()).then(function(){t.input="",t.error=null}).catch(function(){t.error="Could not add item"})}},computed:{isValid:function(){return 0!==this.input.length},data:function(){return this.$store.state.data}}}},442:function(t,n){},443:function(t,n){},448:function(t,n,a){"use strict";var i=function(){var t=this,n=t.$createElement;return(t._self._c||n)("div",{staticStyle:{height:"400px","min-width":"310px"},attrs:{id:"container"}})},e=[],o={render:i,staticRenderFns:e};n.a=o},449:function(t,n,a){"use strict";var i=function(){var t=this,n=t.$createElement,a=t._self._c||n;return a("div",[a("a",{attrs:{href:"https://github.com/liamcottam/"+t.$appName,target:"_blank"}},[a("img",{staticStyle:{position:"fixed",top:"0",right:"0",border:"0","z-index":"1"},attrs:{src:"https://camo.githubusercontent.com/365986a132ccd6a44c23a9169022c0b5c890c387/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f7265645f6161303030302e706e67",alt:"Fork me on GitHub","data-canonical-src":"https://s3.amazonaws.com/github/ribbons/forkme_right_red_aa0000.png"}})]),t._v(" "),a("div",{staticClass:"container"},[a("h1",{ref:"appname"},[t._v(t._s(t.$appName))]),t._v(" "),a("chart"),t._v(" "),a("options")],1)])},e=[],o={render:i,staticRenderFns:e};n.a=o},450:function(t,n,a){"use strict";var i=function(){var t=this,n=t.$createElement,a=t._self._c||n;return a("div",[a("div",{staticClass:"form-container"},[a("button",{staticClass:"form-btn",attrs:{disabled:!t.isValid},on:{click:t.addItem}},[t._v("Add")]),t._v(" "),a("div",{staticClass:"input-container"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.input,expression:"input"}],attrs:{placeholder:"Add new stock"},domProps:{value:t.input},on:{keydown:function(n){if(!("button"in n)&&t._k(n.keyCode,"enter",13))return null;n.preventDefault(),t.addItem(n)},input:function(n){n.target.composing||(t.input=n.target.value)}}})]),t._v(" "),t.error?a("div",{staticClass:"error"},[a("span",[t._v("Error: "+t._s(t.error))]),t._v(" "),a("span",{staticStyle:{height:"16px",width:"16px",float:"right",cursor:"pointer"},on:{click:function(n){t.error=null}}},[a("svg",{attrs:{width:"16",height:"16",viewBox:"0 0 1792 1792",xmlns:"http://www.w3.org/2000/svg"}},[a("path",{attrs:{d:"M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z"}})])])]):t._e()]),t._v(" "),a("div",{staticClass:"cards"},t._l(t.data,function(n,i){return a("div",{key:i,staticClass:"card"},[a("div",{staticClass:"card-content"},[a("span",{on:{click:function(n){t.removeItem(i)}}},[a("svg",{attrs:{width:"20",height:"20",viewBox:"0 0 1792 1792",xmlns:"http://www.w3.org/2000/svg"}},[a("path",{attrs:{d:"M1490 1322q0 40-28 68l-136 136q-28 28-68 28t-68-28l-294-294-294 294q-28 28-68 28t-68-28l-136-136q-28-28-28-68t28-68l294-294-294-294q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294 294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68l-294 294 294 294q28 28 28 68z"}})])]),t._v(" "),a("h3",{staticClass:"card-title"},[t._v(t._s(n.name))]),t._v(" "),a("p",[t._v(t._s(n.longName))])])])}))])},e=[],o={render:i,staticRenderFns:e};n.a=o}},[196]);