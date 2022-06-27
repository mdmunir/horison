/*! For license information please see LICENSES */
(window.webpackJsonp=window.webpackJsonp||[]).push([[21,9],{408:function(t,e,n){"use strict";n.r(e);var r={props:["title"],computed:{showHeader:function(){return this.$props.title||""===this.$props.title}}},o=n(8),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"content-wrapper"},[t.showHeader?n("div",{staticClass:"content-header"},[n("div",{staticClass:"container-fluid"},[n("div",{staticClass:"row mb-2"},[n("div",{staticClass:"col-sm-6"},[n("h1",{staticClass:"m-0"},[t._v(t._s(t.title))])])])])]):t._e(),t._v(" "),n("section",{staticClass:"content"},[n("div",{staticClass:"container-fluid"},[t._t("default")],2)])])}),[],!1,null,null,null);e.default=component.exports},414:function(t,e,n){"use strict";n.d(e,"b",(function(){return d}));var r=n(410),o=n(409),l=n(427),c=149597870,d=new r.a.Planet(l.a);e.a={earth:d,position:function(t){var e=o.a.trueVSOP87(d,t);return e.lon-=20.4898/3600*Math.PI/180/e.range,e.range*=c,e},simple:function(t){var e=(t-2451545)/36525,n=o.a.trueLongitude(e),r=n.lon,l=n.ano,d=o.a.eccentricity(e);return{lon:r,lat:0,range:1.000001018*c*(1-d*d)/(1+d*Math.cos(l))}}}},415:function(t,e,n){"use strict";n.d(e,"b",(function(){return c}));var r=n(413),o=n(428),l=n(429),c=new r.a.Moon(l.a);e.a={elpMoon:c,position:function(t){return c.position(t)},meeus:function(t){return o.a.position(t)}}},438:function(t,e,n){"use strict";n.d(e,"a",(function(){return L})),n.d(e,"b",(function(){return H}));var r=n(143),o=n(144),l=n(23),base=(n(423),n(46),n(29),n(19),n(11),n(35),n(5)),c=n(418);const d=function(t,e,n,r){const o=1/1236.85,p=Math.PI/180,l=t*o,c=base.b.horner(l,160.7108*p,390.67050284*p/o,-.0016118*p,-227e-8*p,11e-9*p);if(Math.abs(Math.sin(c))>.36)return[!1];const d=base.b.horner(l,1,-.002516,-74e-7),h=base.b.horner(l,2.5534*p,29.1053567*p/o,-14e-7*p,-11e-8*p),f=base.b.horner(l,201.5643*p,385.81693528*p/o,.0107582*p,1238e-8*p,-58e-9*p),v=base.b.horner(l,124.7746*p,-1.56375588*p/o,.0020672*p,215e-8*p),m=Math.sin(v),_=c-.02665*p*m,M=base.b.horner(l,299.77*p,.107408*p/o,-.009173*p),y=e+n*Math.sin(f)+r*Math.sin(h)*d+.0161*Math.sin(2*f)+-.0097*Math.sin(2*_)+.0073*Math.sin(f-h)*d+-.005*Math.sin(f+h)*d+-.0023*Math.sin(f-2*_)+.0021*Math.sin(2*h)*d+.0012*Math.sin(f+2*_)+6e-4*Math.sin(2*f+h)*d+-4e-4*Math.sin(3*f)+-3e-4*Math.sin(h+2*_)*d+3e-4*Math.sin(M)+-2e-4*Math.sin(h-2*_)*d+-2e-4*Math.sin(2*f-h)*d+-2e-4*m,x=.207*Math.sin(h)*d+.0024*Math.sin(2*h)*d+-.0392*Math.sin(f)+.0116*Math.sin(2*f)+-.0073*Math.sin(f+h)*d+.0067*Math.sin(f-h)*d+.0118*Math.sin(2*_),w=5.2207+-.0048*Math.cos(h)*d+.002*Math.cos(2*h)*d+-.3299*Math.cos(f)+-.006*Math.cos(f+h)*d+.0041*Math.cos(f-h)*d,[C,P]=base.b.sincos(_);return[!0,y,(x*P+w*C)*(1-.0048*Math.abs(P)),.0059+.0046*Math.cos(h)*d+-.0182*Math.cos(f)+4e-4*Math.cos(2*f)+-5e-4*Math.cos(h+f),f]},h={None:0,Partial:1,Annular:2,AnnularTotal:3,Penumbral:4,Umbral:5,Total:6},f=function(t,q){const e=12.3685*(t-2e3);return Math.floor(e-q+.5)+q};var v={TYPE:h,solar:function(t){let e,n=h.None;const[r,o,l,u,v]=d(f(t,0),c.a.meanNew(t),-.4075,.1721),p=u+.5461;if(!r)return{type:n};const m=Math.abs(l);if(m>1.5433+u)return{type:n};const _=m<.9972;if(_)if(u<0)n=h.Total;else if(u>.0047)n=h.Annular;else{n=u<.00464*Math.sqrt(1-l*l)?h.AnnularTotal:h.Annular}else n=h.Partial,m<1.026&&m<.9972+Math.abs(u)&&(n=h.Total);return n===h.Partial&&(e=(1.5433+u-m)/(.5461+2*u)),{type:n,central:_,jdeMax:o,magnitude:e,distance:l,umbral:u,penumbral:p}},lunar:function(t){let e,n,r,o,l=h.None;const[v,m,_,u,M]=d(f(t,.5),c.a.meanFull(t),-.4065,.1727);if(!v)return{type:l};const y=1.2848+u,x=.7403-u,w=Math.abs(_);if(e=(1.0128-u-w)/.545,e>1)l=h.Total;else if(e>0)l=h.Umbral;else{if(e=(1.5573+u-w)/.545,e<0)return{type:l};l=h.Penumbral}const p=1.0128-u,C=.4678-u,P=.5458+.04*Math.cos(M),S=_*_;switch(l){case h.Total:n=Math.sqrt(C*C-S)/P/24;case h.Umbral:r=Math.sqrt(p*p-S)/P/24;default:{const t=1.5573+u;o=Math.sqrt(t*t-S)/P/24}}return{type:l,jdeMax:m,magnitude:e,distance:_,umbral:x,penumbral:y,sdTotal:n,sdPartial:r,sdPenumbral:o}}},m=n(412),_=n(425),M=n(419),y=n(106),x=n(432),w=n(409),C=n(79),P=n(414),S=n(415),T=Math.sin,j=Math.cos,D=Math.tan,k=Math.atan2,F=Math.atan,O=Math.asin,E=Math.PI,I=Math.floor,$=Math.hypot,V=.272488,z=.272281;function G(t,e,n){var r=base.b.sincos(t.ra),o=Object(l.a)(r,2),c=o[0],d=o[1],h=base.b.sincos(t.dec),f=Object(l.a)(h,2),v=f[0],m=f[1],_=base.b.sincos(e.ra),M=Object(l.a)(_,2),y=M[0],x=M[1],w=base.b.sincos(e.dec),C=Object(l.a)(w,2),P=C[0],S=C[1],j=t.range/6378,E=e.range/6378,b=E/j,I=k(m*c-b*S*y,d*m-b*x*S),$=F(T(I)*(v-b*P)/(m*c-b*S*y)),g=(v-b*P)/T($)*j,G=base.b.sincos($),R=Object(l.a)(G,2),A=R[0],J=R[1],Y=base.b.sincos(e.ra-I),N=Object(l.a)(Y,2),U=N[0],L=N[1],H=E*(S*U),B=E*(P*J-S*A*L),K=E*(P*A+S*J*L),Q=O(109.397488/g),W=O(108.852719/g),X=K+V/T(Q),Z=K-z/T(W),tt=X*D(Q),at=Z*D(W);return{x:H,y:B,d:$,"μ":base.b.pmod(n-I,2*Math.PI),l1:tt,l2:at,tanF1:D(Q),tanF2:D(W)}}function R(t,e,n,r){var o=w.a.trueVSOP87(t,e);o.lon-=20.4898/3600*Math.PI/180/o.range,o.lon+=n;var l=new m.c.Ecliptic(o).toEquatorial(r);return{ra:l.ra,dec:l.dec,range:o.range*base.b.AU}}function A(t,e,n,r){var o=t.lightTime(e),l=t.position(e-o);base.b.J2000Century(e);l.lon+=n;var c=new m.c.Ecliptic(l).toEquatorial(r);return{ra:c.ra,dec:c.dec,range:l.range}}function J(t,e,n){var r=v.solar(t);if(0==r.type)return{type:0};var o=r.jdeMax,c=base.b.modf(o+.5),d=Object(l.a)(c,2),i=d[0],h=d[1],f={type:r.type,deltaT:C.a.deltaT(t),T0:I(24*h+.5)};f.JDE0=i+f.T0/24-.5,f.GST0=M.a.mean(f.JDE0);var m,w,P={"μ":0,SRa:0,MRa:0},S={x:[],y:[],"μ":[],d:[],l1:[],l2:[]},T={ra:[],dec:[],range:[]},D={ra:[],dec:[],range:[]};for(w=0;w<5;w++){for(var k=1.5*w-3,F=f.JDE0+k/24,O=_.a.nutation(F),V=Object(l.a)(O,2),z=V[0],J=V[1],Y=_.a.meanObliquity(F)+J,N=R(e,F,z,Y),U=A(n,F,z,Y),L=(f.GST0+1.00273790935*k*3600)/86400*2*E,element=G(N,U,L=base.b.pmod(L+z*j(Y),2*E));element.μ<P.M;)element.μ+=2*E;for(P.μ=element.μ;N.ra<P.SRa;)N.ra+=2*E;for(P.SRa=N.ra;U.ra<P.MRa;)U.ra+=2*E;for(m in P.MRa=U.ra,S)S[m].push([k,element[m]]);for(m in T)T[m].push([k,N[m]]);for(m in D)D[m].push([k,U[m]]);2==w&&(f.tanF1=element.tanF1,f.tanF2=element.tanF2)}for(m in S)f[m]=y.a.lagrangePoly(S[m]);for(m in f.sun={},f.moon={},T)f.sun[m]=y.a.lagrangePoly(T[m]);for(m in D)f.moon[m]=y.a.lagrangePoly(D[m]);var H=f.x.map((function(t,i){return i*t})).slice(1),B=f.y.map((function(t,i){return i*t})).slice(1);var K=x.a.binaryRoot((function(t){return base.b.horner(t,f.x)*base.b.horner(t,H)+base.b.horner(t,f.y)*base.b.horner(t,B)}),-3,3);f.jdeMax=f.JDE0+K/24;var Q=$(base.b.horner(K,f.x),base.b.horner(K,f.y));return f.distance=Q*(r.distance>0?1:-1),f}var Y={},N=/^\d{4}-\d{2}-\d{2}$/,U=/^\d+(\.\d+)?$/,L=function(){function t(e){Object(r.a)(this,t);var n,o,l=!0;if(U.test(e+"")){if(o=I(12.3685*((n=1*e)-2e3)+.5),Y[o])return void(this._info=Y[o]);l=!1}else{if(!N.test(e))return void(this._info={type:0});var c=e.toJD();if(o=I(12.3685*((n=2e3+(c-2451545)/365.25)-2e3)+.5),Y[o]&&Y[o].date==e)return void(this._info=Y[o])}var d=J(n,P.b,S.b);if(d.k=o,0!=d.type){var h=moment(d.jdeMax.toDate()).utc().format("YYYY-MM-DD");if(l&&h!=e)this._info={type:0};else{d.date=h,this._info=Y[o]=d;var f=24*(d.jdeMax-d.JDE0);d.tMax=f,d.p1=x.a.binaryRoot(v,-3,f),d.p4=x.a.binaryRoot(v,f,3)}}else this._info={type:0};function v(t){return $(Object(base.c)(t,d.x),Object(base.c)(t,d.y))-(1+base.b.horner(t,d.l1))}}return Object(o.a)(t,[{key:"calc",value:function(t){if(0==this._info.type)return{};var e=this._info,n=["x","y","μ","d","l1","l2"],r={jde:e.JDE0+t/24,gst:e.GST0+1.00273790935*(t-e.deltaT/3600)*(2*E/24),tanF1:e.tanF1,tanF2:e.tanF2,sun:{},moon:{}};return n.forEach((function(n){r[n]=base.b.horner(t,e[n])})),(n=["ra","dec","range"]).forEach((function(n){r.sun[n]=base.b.horner(t,e.sun[n]),r.moon[n]=base.b.horner(t,e.moon[n])})),r}},{key:"isValid",value:function(){return this._info.type>0}},{key:"info",value:function(){return this._info}}]),t}(),H=Object(o.a)((function t(e){Object(r.a)(this,t);for(var n=[],o=e=10*I(e/10);o<e+10;){var l=new L(o);l.isValid()&&l.info().jdeMax.toDate().getFullYear()>=e?(n.push(l),o+=29.5/365.25):o+=15/365.25}this.rows=n}))},503:function(t,e,n){"use strict";n.r(e);var r=n(13),o=(n(41),n(81),n(11),n(46),n(29),n(107),n(438)),l=Math.sin,c=Math.cos,d=(Math.tan,Math.PI),h={head:{title:"Gerhana Matahari"},created:function(){this.eclipse=null},data:function(){return{info:{type:0,date:null},uniform:{esq:{value:.006694381},x:{value:0},y:{value:0},sind:{value:0},cosd:{value:0},mu:{value:0},l1:{value:0},l2:{value:0},tanf1:{value:0},tanf2:{value:0}},slider:500,cameraPos:{lat:0,lon:0,distance:4},zoom:100,options:{model:"se-globe",rotation:!0},intervalID:null,progressSave:0,cancelGif:!1}},mounted:function(){this.update(this.$route.params.date),this.slider++,this.slider--},methods:{update:function(t){this.eclipse=new o.a(t);var e=this.eclipse.info();this.info=e},run:function(){if(this.onPlay)clearInterval(this.intervalID),this.intervalID=null;else{var th=this;this.intervalID=setInterval((function(){th.slider+=1,th.slider>=1e3&&(clearInterval(th.intervalID),th.intervalID=null)}),100)}},updatePath:function(t){var e=this.uniform;e.x.value=t.x,e.y.value=t.y,e.mu.value=t.μ-1.00273790935*this.info.deltaT*(2*d/24/3600),e.sind.value=l(t.d),e.cosd.value=c(t.d),e.l1.value=t.l1,e.l2.value=t.l2,e.tanf1.value=t.tanF1,e.tanf2.value=t.tanF2,this.options.rotation&&(this.cameraPos.lon=t.μ,this.cameraPos.lat=t.d)},simpan:function(){var t=this;return Object(r.a)(regeneratorRuntime.mark((function e(){var th,n,r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.isValid){e.next=2;break}return e.abrupt("return");case 2:return th=t,n=t.info,n.p1,n.p4,r={duration:30,fps:10,filename:"solar-eclipse-".concat(th.info.date,".gif")},t.cancelGif=!1,t.$refs.popupSave.modal("show"),e.next=9,t.$refs.globe.download((function(i){if(th.slider=1e3*i,th.progressSave=Math.floor(100*i),th.cancelGif)return!1}),r);case 9:t.$refs.popupSave.modal("hide");case 10:case"end":return e.stop()}}),e)})))()}},computed:{isValid:function(){return this.info.type>0},time:function(){if(this.isValid){var t=this.info,e=t.p1;return e+(t.p4-e)*this.slider/1e3}},sTime:function(){if(this.isValid){var t=this.info.JDE0+(this.time-this.info.deltaT/3600)/24;return moment(t.toDate()).utc().format("DD MMMM YYYY, hh:mm:ss [UTC]")}},bessel:function(){if(this.isValid)return this.eclipse.calc(this.time)},onPlay:function(){return null!=this.intervalID},series:function(){var t=this,e={};if(this.isValid){this.info;["x","y","μ","d","l1","l2"].forEach((function(n){var s=t.info[n].slice(0,4);"μ"!=n&&"d"!=n||(s=s.map((function(t){return 180*t/Math.PI}))),e[n]=s.map((function(t){return Math.abs(t)>5e-8?t.toFixed(7):""}))}))}return e}},watch:{"options.rotation":function(t){t&&this.updatePath(this.bessel)},slider:function(){this.isValid&&this.updatePath(this.bessel)},"$route.params.date":function(t){this.update(t),this.isValid&&(this.slider=500==this.slider?501:500)},"info.date":function(){this.isValid&&(this.slider=500==this.slider?501:500)}}},f=n(8),component=Object(f.a)(h,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("lte-content",{attrs:{title:"Gerhana Matahari "+(t.info.date||"")}},[t.isValid?n("div",{staticClass:"row"},[n("div",{staticClass:"col-12 col-md-6"},[n("lte-card",{attrs:{title:t.sTime,buttons:"maximize"},on:{resize:function(e){return t.$refs.globe.resize(300)}},scopedSlots:t._u([{key:"tools",fn:function(){return[n("button",{staticClass:"btn btn-tool",on:{click:t.simpan}},[n("i",{staticClass:"fas fa-save"})])]},proxy:!0}])},[t._v(" "),n("div",{staticClass:"row"},[n("div",{staticClass:"col-12"},[n("button",{staticClass:"btn btn-sm btn-flat",on:{click:t.run}},[n("i",{staticClass:"fas",class:{"fa-play":!t.onPlay,"fa-stop":t.onPlay}})]),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model.number",value:t.slider,expression:"slider",modifiers:{number:!0}}],staticStyle:{width:"90%"},attrs:{type:"range",min:"0",max:"1000"},domProps:{value:t.slider},on:{__r:function(e){t.slider=t._n(e.target.value)},blur:function(e){return t.$forceUpdate()}}})]),t._v(" "),n("div",{staticClass:"col-12 col-lg-4"},[n("input",{directives:[{name:"model",rawName:"v-model.number",value:t.zoom,expression:"zoom",modifiers:{number:!0}}],staticStyle:{width:"100%"},attrs:{type:"range",min:"20",max:"100"},domProps:{value:t.zoom},on:{__r:function(e){t.zoom=t._n(e.target.value)},blur:function(e){return t.$forceUpdate()}}})]),t._v(" "),n("div",{staticClass:"col-6 col-lg-4"},[n("select",{directives:[{name:"model",rawName:"v-model",value:t.options.model,expression:"options.model"}],staticClass:"form-control",on:{change:function(e){var n=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.$set(t.options,"model",e.target.multiple?n:n[0])}}},[n("option",{attrs:{value:"se-globe"}},[t._v("Globe")]),t._v(" "),n("option",{attrs:{value:"se-mercator"}},[t._v("Mercator")])])]),t._v(" "),"se-globe"==t.options.model?n("div",{staticClass:"col-6 col-lg-4"},[n("div",{staticClass:"form-check"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.options.rotation,expression:"options.rotation"}],staticClass:"form-check-input",attrs:{type:"checkbox",id:"ck_rotation"},domProps:{checked:Array.isArray(t.options.rotation)?t._i(t.options.rotation,null)>-1:t.options.rotation},on:{change:function(e){var n=t.options.rotation,r=e.target,o=!!r.checked;if(Array.isArray(n)){var l=t._i(n,null);r.checked?l<0&&t.$set(t.options,"rotation",n.concat([null])):l>-1&&t.$set(t.options,"rotation",n.slice(0,l).concat(n.slice(l+1)))}else t.$set(t.options,"rotation",o)}}}),t._v(" "),n("label",{staticClass:"form-check-label",attrs:{for:"ck_rotation"}},[t._v("Rotasi")])])]):t._e()]),t._v(" "),n("div",{staticClass:"row"},[n("div",{staticClass:"col-12"},[n(t.options.model,{ref:"globe",tag:"component",attrs:{zoom:t.zoom,control:!t.options.rotations,uniform:t.uniform,"camera-pos":t.cameraPos}})],1)])])],1),t._v(" "),n("div",{staticClass:"col-md-6 col-12"},[n("lte-card",{staticStyle:{"font-size":"14px"},attrs:{title:"Besselian Element"}},[n("table",{staticClass:"table table-borderless"},[n("tbody",[n("tr",[n("th",{attrs:{width:"90"}},[t._v("DeltaT")]),t._v(" "),n("td",{staticStyle:{"text-align":"right"},attrs:{width:"60"}},[t._v(t._s(t.info.deltaT.toFixed(2)))]),t._v(" "),n("td",[t._v(" ")])]),t._v(" "),n("tr",[n("th",[t._v("T0")]),t._v(" "),n("td",{staticStyle:{"text-align":"right"}},[t._v(t._s(t.info.T0))])])])]),t._v(" "),n("table",{staticClass:"table table-bordered"},[n("tbody",[n("tr",{staticStyle:{"text-align":"center"}},[n("th",[t._v("  ")]),t._v(" "),n("th",[t._v("0")]),t._v(" "),n("th",[t._v("1")]),t._v(" "),n("th",[t._v("2")]),t._v(" "),n("th",[t._v("3")])]),t._v(" "),t._l(t.series,(function(e,r){return n("tr",[n("th",{staticStyle:{"text-align":"center"}},[t._v(t._s(r))]),t._v(" "),t._l(e,(function(e){return n("td",{staticStyle:{"text-align":"right"}},[t._v(t._s(e))])}))],2)})),t._v(" "),n("tr",[n("th",{staticStyle:{"text-align":"center"}},[t._v("tanF")]),t._v(" "),n("td"),t._v(" "),n("td",{staticStyle:{"text-align":"right"}},[t._v(t._s(t.info.tanF1.toFixed(8)))]),t._v(" "),n("td",{staticStyle:{"text-align":"right"}},[t._v(t._s(t.info.tanF2.toFixed(8)))]),t._v(" "),n("td")])],2)])])],1)]):n("div",[t._v("\n        Gerhana tidak ditemukan.\n    ")]),t._v(" "),n("portal",{attrs:{to:"modals"}},[n("lte-modal",{ref:"popupSave",attrs:{size:"sm","data-backdrop":"static",title:"Download GIF"},on:{hide:function(e){t.cancelGif=!0}}},[n("p",[t._v(t._s(t.progressSave)+"% Complete")]),t._v(" "),n("div",{staticClass:"progress"},[n("div",{staticClass:"progress-bar bg-primary progress-bar-striped",style:{width:t.progressSave+"%"},attrs:{role:"progressbar","aria-valuenow":t.progressSave,"aria-valuemin":"0","aria-valuemax":"100"}},[n("span",{staticClass:"sr-only"},[t._v(t._s(t.progressSave)+"% Complete")])])])])],1)],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{LteCard:n(338).default,LteModal:n(350).default,LteContent:n(408).default})}}]);