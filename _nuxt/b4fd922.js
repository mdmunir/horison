/*! For license information please see LICENSES */
(window.webpackJsonp=window.webpackJsonp||[]).push([[14,10,11],{256:function(t,e,n){"use strict";n.r(e);var o={props:["title"],computed:{showHeader:function(){return this.$props.title||""===this.$props.title}}},r=n(16),component=Object(r.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"content-wrapper"},[t.showHeader?n("div",{staticClass:"content-header"},[n("div",{staticClass:"container-fluid"},[n("div",{staticClass:"row mb-2"},[n("div",{staticClass:"col-sm-6"},[n("h1",{staticClass:"m-0"},[t._v(t._s(t.title))])])])])]):t._e(),t._v(" "),n("section",{staticClass:"content"},[n("div",{staticClass:"container-fluid"},[t._t("default")],2)])])}),[],!1,null,null,null);e.default=component.exports},257:function(t,e,n){"use strict";n.d(e,"c",(function(){return j})),n.d(e,"f",(function(){return E})),n.d(e,"g",(function(){return P})),n.d(e,"e",(function(){return k})),n.d(e,"a",(function(){return H})),n.d(e,"h",(function(){return F})),n.d(e,"i",(function(){return I})),n.d(e,"b",(function(){return L}));var o=n(24),r=n(138),c=n(139),l=n(22),d=(n(42),n(73),n(260),n(4)),f=(n(259),n(262),n(78)),h=(n(265),n(273),n(271),n(104),n(269),n(105),n(137),n(268)),m=(n(263),n(270),Math.cos),v=(Math.sin,Math.tan,Math.atan,Math.atan2),C=Math.asin,_=(Math.acos,Math.abs),w=Math.floor,M=Math.PI,y=M/180,j=180/M,O=M/180/3600,S=1/O,D=2*M,x=D/86400,T=(Math.PI,[23.439291111*y,-4680.93*O,-1.55*O,1999.25*O,-51.38*O,-249.67*O,-39.05*O,7.12*O,27.87*O,5.79*O,2.45*O]),$=[[-171996,-174.2,92025,8.9,2.1824385855759,-33.7570459366624,361e-7,3.88e-8],[-13187,-1.6,5736,-3.1,3.5069274160782,1256.66393242036,106e-7,12e-13],[-2274,-.2,977,-.5,1.33749572221986,16799.4182247616,-563e-7,184e-9],[2062,.2,-895,.5,4.3648771711518,-67.5140918733248,723e-7,7.76e-8],[1426,-3.4,54,-.1,6.24003588114838,628.301956024184,-28e-7,-5.82e-8],[712,.1,-7,0,2.35554836930326,8328.69142288292,152e-6,31e-8],[-517,1.2,224,-.6,3.46377799004699,1884.96588844454,776e-8,-5.82e-8],[-386,-.4,200,0,5.43824244382355,16833.1752706983,-924e-7,145e-9],[-301,0,129,-.1,3.69304409152311,25128.1096476446,955e-7,495e-9],[217,-.5,-95,.3,3.5500768421094,628.361976396174,134e-7,5.82e-8],[-158,0,0,0,4.52498006316159,-7214.06286945836,219e-6,126e-9],[129,.1,-70,0,1.3244888305023,1290.42097835702,-256e-7,-3.88e-8],[123,0,-53,0,5.26513266009619,8470.72680187872,-208e-6,-126e-9],[63,0,0,0,4.11375361332121,15542.7542923413,-668e-7,184e-9],[63,.1,-33,0,4.53798695487916,8294.93437694626,188e-6,349e-9],[-59,0,26,0,3.09570096623783,24013.48109422,-275e-6,5.82e-8],[-58,-.1,32,0,6.11007552345223,-8362.44846881959,-116e-6,-271e-9],[-51,0,27,0,1.51060550594721,25161.8666935812,594e-7,456e-9],[48,0,0,0,.597343125285266,1114.62855342457,37e-5,436e-9],[46,0,-24,0,.727145705217037,175.792424932456,-396e-6,-475e-9],[-38,0,16,0,5.45124933554113,32342.1725171029,-123e-6,368e-9],[-31,0,13,0,6.04859246082641,33456.8010705275,247e-6,805e-9],[29,0,0,0,4.71109673860651,16657.3828457659,304e-6,621e-9],[29,0,-12,0,5.86247578538146,9585.35535530328,162e-6,31e-8],[26,0,0,0,3.25580385824765,16866.932316635,-129e-6,107e-9],[-22,0,0,0,5.42523555210598,1324.17802429368,-617e-7,-7.76e-8],[21,0,-10,0,3.08269407452029,8504.48384781538,-244e-6,-165e-9],[17,-.1,0,0,6.19688645511721,1256.60391204837,-56e-7,-116e-9],[16,0,-8,0,3.94064382959391,7180.3058235217,-182e-6,-8.73e-8],[-16,.1,7,0,3.42062856401578,2513.26784446873,496e-8,-116e-9],[-15,0,9,0,2.13928915954469,594.544910087522,333e-7,-1.94e-8],[-13,0,7,0,.424233341557907,-7247.81991539502,255e-6,165e-9],[-12,0,6,0,2.22558801160711,-662.059001960847,389e-7,97e-9],[11,0,0,0,1.45529288035886,-209.549470869119,432e-6,514e-9],[-10,0,5,0,.913262380661928,24047.2381401567,-311e-6,1.94e-8],[-8,0,3,0,1.52361239766474,40670.8639399859,287e-7,679e-9],[7,0,-3,0,1.29434629618863,17427.7201807858,-591e-7,126e-9],[-7,0,0,0,4.48183063713039,-6585.76091343418,216e-6,6.79e-8],[-7,0,3,0,1.38064514825107,16171.1162687375,-535e-7,242e-9],[-7,0,3,0,3.26881074996523,32375.9295630396,-159e-6,33e-8],[6,0,0,0,.186116675444927,23871.4457152242,85e-6,495e-9],[6,0,-3,0,1.93483884750512,17914.0467781862,314e-6,621e-9],[6,0,-3,0,3.68003719980556,9619.11240123995,126e-6,271e-9],[-6,0,3,0,1.58509546029063,-1148.38559936123,-334e-6,-398e-9],[-6,0,3,0,.013006891717527,15508.9972464046,-307e-7,223e-9],[5,0,0,0,2.39869779533447,7700.38946685874,155e-6,368e-9],[-5,0,3,0,1.36763825653347,662.119022332837,-228e-7,1.94e-8],[-5,0,3,0,4.35187027943423,-15576.5113382779,103e-6,-145e-9],[-5,0,3,0,3.86615387525051,33490.5581164642,211e-6,766e-9],[4,0,0,0,2.77978171086117,1080.8715074879,407e-6,475e-9],[4,0,0,0,1.28133940447109,1918.72293438121,-284e-7,-97e-9],[4,0,0,0,5.38292981823519,-8538.24089375204,28e-5,204e-9],[-4,0,0,0,3.44026421623243,557.314276712283,185e-6,218e-9],[-4,0,0,0,2.12628226782713,-14914.4523363171,64e-6,-242e-9],[-4,0,0,0,5.19846946025042,7771.37714617064,-334e-7,9.21e-8],[3,0,0,0,5.6113522275509,25195.6237395179,233e-7,417e-9],[-3,0,0,0,2.90958429079294,142.035378995794,-36e-5,-436e-9],[-3,0,0,0,3.48341364226363,-70.987679311902,188e-6,276e-9],[-3,0,0,0,2.31239894327205,8956.99337890711,149e-6,252e-9],[-3,0,0,0,3.73619351755432,24499.8076916204,983e-7,553e-9],[-3,0,0,0,3.13885039226906,23385.1791381958,-272e-6,116e-9],[-3,0,0,0,2.12095552295003,41785.4924934104,399e-6,112e-8],[-3,0,0,0,5.49439876157231,31713.8705610787,-12e-5,427e-9]];function E(){var t=new Date;return{y:t.getFullYear(),m:t.getMonth()+1,d:t.getDate(),h:t.getHours(),i:t.getMinutes(),s:t.getSeconds()+t.getMilliseconds()/1e3,jd:2299160.5+(t.getTime()- -122192928e5)/864e5}}function P(t){var e=d.b.J2000Century(t),n=d.b.horner(e/100,T),o=Y(t),r=Object(l.a)(o,2),c=r[0],f=r[1];return[n+f,c,f]}function Y(t){for(var e=d.b.J2000Century(t),n=0,o=0,i=$.length-1;i>=0;i--){var r=$[i],c=Object(l.a)(r,4),f=c[0],h=c[1],m=c[2],v=c[3],C=d.b.sincos(d.b.horner(e,r.slice(4))),_=Object(l.a)(C,2);n+=_[0]*(f+h*e),o+=_[1]*(m+v*e)}return[n*=1e-4*O,o*=1e-4*O]}function J(t){var e=w(t);return t-=e,J.Y==e||(J.Y=e,J.a=f.a.deltaT(e),J.b=f.a.deltaT(e+1)-J.a),J.a+t*J.b}function k(t){return J((t-2451545)/365.25+2e3)}function H(t){var e=d.b.modf(t+.5),n=Object(l.a)(e,2),o=n[0],r=n[1];if(H.JD0==o)return d.b.pmod(H.v+1.00273790935*r*D,D);H.JD0=o;var c=P(t),f=Object(l.a)(c,2),v=f[0],C=f[1];return H.v=h.a.mean(o-.5)*x+C*m(v),d.b.pmod(H.v+1.00273790935*r*D,D)}function F(t,e){var n=d.b.sincos(e),o=Object(l.a)(n,2),r=o[0],c=o[1],f=d.b.sincos(t.lat),h=Object(l.a)(f,2),m=h[0],_=h[1],w=d.b.sincos(t.lon),y=Object(l.a)(w,2),j=y[0],O=y[1],S=v(j*c-m/_*r,O);return S<0&&(S+=2*M),{ra:S,dec:C(m*c+_*r*j),range:t.range}}function I(t,g){var e=t.gha-g.lon,n=d.b.sincos(e),o=Object(l.a)(n,2),r=o[0],c=o[1],f=d.b.sincos(g.lat),h=Object(l.a)(f,2),m=h[0],_=h[1],w=d.b.sincos(t.dec),M=Object(l.a)(w,2),y=M[0],j=M[1],O=v(r,c*m-y/j*_);return{alt:C(m*y+_*j*c),az:O}}var L=function(){function t(e,n,c){Object(r.a)(this,t);var l={};"object"===Object(o.a)(e)&&(l=e),this.lon=l.lon||e,this.lat=l.lat||n,this.height=l.height||c||0}return Object(c.a)(t,[{key:"toString",value:function(){var t=this.lat*j,e=this.lon*j;return"".concat(_(t)," ").concat(t>0?"N":"S",", ").concat(_(e)," ").concat(e>0?"W":"E")}},{key:"toLoc",value:function(){return{lon:-this.lon*j,lat:this.lat*j,height:this.height}}}],[{key:"fromLoc",value:function(e){return new t(-e.lon*y,e.lat*y,e.height||0)}}]),t}();e.d={now:E,obliquity:P,deltaT:J,deltaTJD:k,D2R:y,R2D:j,SECS_PER_DAY:86400,SEC2RAD:O,RAD2SEC:S,Globe:L}},258:function(t,e,n){"use strict";n.r(e);n(21),n(136),n(52),n(14),n(51);var o={maximize:"fas fa-expand",collapse:"fas fa-minus",remove:"fas fa-times"},r={props:{type:{type:String,default:"default"},title:String,buttons:String},computed:{showHeader:function(){return this.$props.title||this.$props.buttons||this.$slots.tools},showFooter:function(){return this.$slots.footer},toolButtons:function(){var t=this.$props.buttons;return"string"==typeof t&&(t=t.split(/\s*,\s*/)),t?t.map((function(b){return!!o[b]&&{func:b,icon:o[b]}})).filter((function(t){return t})):[]}}},c=n(16),component=Object(c.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{class:["card","card-"+t.type]},[t.showHeader?n("div",{staticClass:"card-header"},[n("h3",{staticClass:"card-title",domProps:{innerHTML:t._s(t.title)}}),t._v(" "),n("div",{staticClass:"card-tools"},[t._l(t.toolButtons,(function(t){return n("button",{staticClass:"btn btn-tool",attrs:{type:"button","data-card-widget":t.func}},[n("i",{class:t.icon})])})),t._v(" "),t._t("tools")],2)]):t._e(),t._v(" "),n("div",{staticClass:"card-body"},[t._t("default")],2),t._v(" "),t.showFooter?n("div",{staticClass:"card-footer"},[t._t("footer")],2):t._e()])}),[],!1,null,null,null);e.default=component.exports},292:function(t,e,n){"use strict";n.r(e);var o=n(22),r=(n(14),n(26),n(73),n(194),n(25),n(267),n(193),n(257)),base=n(4),c=n(259),l=n(264),d=n(262);const{cos:f,sin:h,tan:m}=Math;const v=function(t){return base.b.horner(t,280.4664567,360007.6982779,.03032028,1/49931,-1/15300,-5e-7)*Math.PI/180};var C={e:function(t,e){const n=.1*base.b.J2000Century(t),o=v(n),{lon:r,lat:h,range:m}=d.a.trueVSOP87(e,t),[C,_]=l.a.nutation(t),w=r+C+-20.4898/3600*Math.PI/180/m,M=l.a.meanObliquity(t)+_,y=new c.c.Ecliptic(w,h).toEquatorial(M),j=o-.0057183*Math.PI/180-y.ra+C*f(M);return base.b.pmod(j+Math.PI,2*Math.PI)-Math.PI},eSmart:function(t){const e=l.a.meanObliquity(t),n=m(.5*e),o=n*n,r=base.b.J2000Century(t),c=v(.1*r),f=d.a.eccentricity(r),C=d.a.meanAnomaly(r),[_,w]=base.b.sincos(2*c),M=h(C);return o*_-2*f*M+4*f*o*M*w-o*o*_*w-1.25*f*f*h(2*C)}},_={data:function(){return{model:{time:""},values:null}},head:{title:"Kalkulator"},mounted:function(){this.setModel(this.$route.query),this.calcValue()},watch:{"$route.query":function(t){this.setModel(t),this.calcValue()}},methods:{submit:function(){var t=Object.assign({},this.$route.query,this.model);this.$router.push({query:t})},setModel:function(t){this.model.time=t.time},calcValue:function(){var time=this.model.time?this.model.time.toDate():new Date,t=time.toJD(),e=Object(r.e)(t),n=t+e/86400,c=Object(r.g)(n),l=Object(o.a)(c,3),d=l[0],f=l[1],h=l[2];this.values={jd:t,time:time,deltaT:e,"ε":d*r.c,"Δψ":f*r.c*3600,"Δε":h*r.c*3600,EoT:C.eSmart(n)/(2*Math.PI)*864e5,gst:Object(r.a)(t)*r.c}}},computed:{rawStr:function(){if(!this.values)return"";var t=this.values,time=t.time,e=t.deltaT,n=t.jd,o=t.ε,r=t.EoT,c=t.gst,l=t.Δψ,d=t.Δε,f=r<0?"-":"";return"JD               : ".concat(n.toFixed(6),"\nTime (UT)        : ").concat(moment(time).utc().format("YYYY-MM-DD HH:mm:ss"),"\nDeltaT           : ").concat(e.toFixed(2),"\nObliquity(ε)     : ").concat(o.toFixed(5),"°\nNutasi Lon (Δψ)  : ").concat(l.toFixed(6),'"\nNutasi ε(Δε)     : ').concat(d.toFixed(6),'"\nEoT              : ').concat(f).concat(moment(Math.abs(r)).format("mm:ss.S"),"\nGST              : ").concat(c.toFixed(5),"°\n")},contentDownload:function(){return URL.createObjectURL(new Blob([this.rawStr],{type:"plain/text"}))}}},w=n(16),component=Object(w.a)(_,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("lte-content",{attrs:{title:"Kalkulator"}},[n("lte-card",{attrs:{buttons:"collapse"}},[n("div",{staticClass:"row"},[n("div",{staticClass:"col-lg-4 col-sm-12"},[n("form",{staticClass:"form-horizontal"},[n("div",{staticClass:"form-group row"},[n("label",{staticClass:"col-4 col-form-label",attrs:{for:"time"}},[t._v("Waktu")]),t._v(" "),n("div",{staticClass:"col-8"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.model.time,expression:"model.time"}],staticClass:"form-control",attrs:{type:"text",id:"time",placeholder:"YYYY-MM-dd HH:mm:ss"},domProps:{value:t.model.time},on:{input:function(e){e.target.composing||t.$set(t.model,"time",e.target.value)}}})])]),t._v(" "),n("div",{staticClass:"form-group row"},[n("div",{staticClass:"offset-4 col-8"},[n("button",{staticClass:"btn btn-sm btn-primary",on:{click:function(e){return t.submit()}}},[t._v("Generate")])])])])])])]),t._v(" "),n("lte-card",{scopedSlots:t._u([{key:"tools",fn:function(){return[t.rawStr?n("a",{staticClass:"btn btn-tool",attrs:{href:t.contentDownload,download:"calc.txt"}},[n("i",{staticClass:"fas fa-save"})]):t._e()]},proxy:!0}])},[t._v(" "),n("pre",[t._v(t._s(t.rawStr))])])],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{LteCard:n(258).default,LteContent:n(256).default})}}]);