/*! For license information please see LICENSES */
(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{243:function(e,n,t){"use strict";t.d(n,"b",(function(){return B})),t.d(n,"c",(function(){return ee})),t.d(n,"e",(function(){return ae})),t.d(n,"f",(function(){return oe})),t.d(n,"h",(function(){return se})),t.d(n,"g",(function(){return pe})),t.d(n,"d",(function(){return je})),t.d(n,"a",(function(){return Oe}));t(29),t(71),t(40),t(72);var r=t(164),o=t(165),l=t(38),c=t(21),f=(t(22),t(127),t(13),t(49),t(53),t(39),t(247),t(132),t(48),t(33),t(99),t(128),t(260)),h=t(234),d=t(239),v=t(248),j=t(249),m=(t(261),t(262)),O=t(267),y=t(244),w=(t(263),t(246)),D=t(236),P=t(254),M=t(245),H=t(264),J=t(265),T=t(266);function k(object,e){var n=Object.keys(object);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(object);e&&(t=t.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),n.push.apply(n,t)}return n}function z(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?k(Object(source),!0).forEach((function(n){Object(l.a)(e,n,source[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):k(Object(source)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(source,n))}))}return e}var E=new M.a.Planet(J.a),A=new H.a.Moon(T.a),S=Math.cos,C=(Math.sin,Math.tan),F=Math.atan,I=Math.asin,_=Math.abs,U=Math.floor,V=Math.PI,Y=V/180,B=180/V,L=86400,R=V/180/3600,Z=2*V,G=O.a.stdh0Solar(),$=6378.137,x=Z/86400,K=86400/Z,N=959.63/3600*V/180,Q=358473400/3600*Math.PI/180,W=[new D.c.Angle(!1,23,26,21.448).rad(),-4680.93*R,-1.55*R,1999.25*R,-51.38*R,-249.67*R,-39.05*R,7.12*R,27.87*R,5.79*R,2.45*R],X=[[-171996,-174.2,92025,8.9,2.1824385855759,-33.7570459366624,361e-7,3.88e-8],[-13187,-1.6,5736,-3.1,3.5069274160782,1256.66393242036,106e-7,12e-13],[-2274,-.2,977,-.5,1.33749572221986,16799.4182247616,-563e-7,184e-9],[2062,.2,-895,.5,4.3648771711518,-67.5140918733248,723e-7,7.76e-8],[1426,-3.4,54,-.1,6.24003588114838,628.301956024184,-28e-7,-5.82e-8],[712,.1,-7,0,2.35554836930326,8328.69142288292,152e-6,31e-8],[-517,1.2,224,-.6,3.46377799004699,1884.96588844454,776e-8,-5.82e-8],[-386,-.4,200,0,5.43824244382355,16833.1752706983,-924e-7,145e-9],[-301,0,129,-.1,3.69304409152311,25128.1096476446,955e-7,495e-9],[217,-.5,-95,.3,3.5500768421094,628.361976396174,134e-7,5.82e-8],[-158,0,0,0,4.52498006316159,-7214.06286945836,219e-6,126e-9],[129,.1,-70,0,1.3244888305023,1290.42097835702,-256e-7,-3.88e-8],[123,0,-53,0,5.26513266009619,8470.72680187872,-208e-6,-126e-9],[63,0,0,0,4.11375361332121,15542.7542923413,-668e-7,184e-9],[63,.1,-33,0,4.53798695487916,8294.93437694626,188e-6,349e-9],[-59,0,26,0,3.09570096623783,24013.48109422,-275e-6,5.82e-8],[-58,-.1,32,0,6.11007552345223,-8362.44846881959,-116e-6,-271e-9],[-51,0,27,0,1.51060550594721,25161.8666935812,594e-7,456e-9],[48,0,0,0,.597343125285266,1114.62855342457,37e-5,436e-9],[46,0,-24,0,.727145705217037,175.792424932456,-396e-6,-475e-9],[-38,0,16,0,5.45124933554113,32342.1725171029,-123e-6,368e-9],[-31,0,13,0,6.04859246082641,33456.8010705275,247e-6,805e-9],[29,0,0,0,4.71109673860651,16657.3828457659,304e-6,621e-9],[29,0,-12,0,5.86247578538146,9585.35535530328,162e-6,31e-8],[26,0,0,0,3.25580385824765,16866.932316635,-129e-6,107e-9],[-22,0,0,0,5.42523555210598,1324.17802429368,-617e-7,-7.76e-8],[21,0,-10,0,3.08269407452029,8504.48384781538,-244e-6,-165e-9],[17,-.1,0,0,6.19688645511721,1256.60391204837,-56e-7,-116e-9],[16,0,-8,0,3.94064382959391,7180.3058235217,-182e-6,-8.73e-8],[-16,.1,7,0,3.42062856401578,2513.26784446873,496e-8,-116e-9],[-15,0,9,0,2.13928915954469,594.544910087522,333e-7,-1.94e-8],[-13,0,7,0,.424233341557907,-7247.81991539502,255e-6,165e-9],[-12,0,6,0,2.22558801160711,-662.059001960847,389e-7,97e-9],[11,0,0,0,1.45529288035886,-209.549470869119,432e-6,514e-9],[-10,0,5,0,.913262380661928,24047.2381401567,-311e-6,1.94e-8]];"المحرم\nصفر\nربيع الأول\nربيع الثاني\nجمادي الأولي\nجمادي الأخرة\nرجب\nشعبان\nرمضان\nشوال\nذو القعدة\nذو الحجة".split(/\n/);function ee(e,n){var t=n||function(e){return e};return Object.keys(e).filter((function(n){return t(e[n])})).reduce((function(n,t){return n[t]=e[t],n}),{})}function ae(){var e=new Date;return{y:e.getFullYear(),m:e.getMonth()+1,d:e.getDate(),h:e.getHours(),i:e.getMinutes(),s:e.getSeconds()+e.getMilliseconds()/1e3}}function ne(e){var n=U(e),t=h.b.J2000Century(e),r=h.b.horner(t/100,W);if(ne.JD==n){var o=Object(c.a)(ne.val,2),l=o[0],f=o[1];return[r+f,l,f]}ne.JD=n,t=h.b.J2000Century(n+.5);var d=0,v=0;return X.forEach((function(e){var n=Object(c.a)(e,4),r=n[0],o=n[1],l=n[2],f=n[3],j=h.b.sincos(h.b.horner(t,e.slice(4))),m=Object(c.a)(j,2),s=m[0],O=m[1];d+=s*(r+o*t),v+=O*(l+f*t)})),d*=R/1e4,v*=R/1e4,ne.val=[d,v],[r+v,d,v]}function te(e){var n=U(e);return e-=n,te.Y==n||(te.Y=n,te.a=j.a.deltaT(n),te.b=j.a.deltaT(n+1)-te.a),te.a+e*te.b}function re(e){return te((e-2451545)/365.25+2e3)}function oe(e){if(!e)return!1;var n=(e=e.trim()).match(/^JD\s+([\d\.]+)/i);if(n&&n[1])return parseFloat(n[1]);e.match(/Z(\+|-)?\d*$/)||(e+="Z");try{var t=new Date(e);return w.a.DateToJD(t)}catch(e){return!1}}function ie(e,n,t){return e instanceof Date?w.a.DateToJD(e):w.a.CalendarToJD(e,n,t,!w.a.isCalendarGregorian(e,n,t))}function ue(e){var n=h.b.modf(e+.5),t=Object(c.a)(n,2),r=t[0],o=t[1];if(ue.JD0==r)return h.b.pmod(ue.v+1.00273790935*o*Z,Z);ue.JD0=r;var l=ne(e),f=Object(c.a)(l,2),d=f[0],v=f[1];return ue.v=P.a.mean(r-.5)*x+v*S(d),h.b.pmod(ue.v+1.00273790935*o*Z,Z)}function le(e){var n=/^(\+|-)?(\d\d)(\d\d)?/;if(!e||!n.test(e))return 0;var t=e.match(n),r=Object(c.a)(t,4),s=r[1],o=r[2],l=r[3],f=parseInt(o);return l&&parseInt(l),s&&"-"==s&&(f*=-1),f}function ce(e){return-.0347*Math.sqrt(e||0)*Y}function se(e){return z(z({},e),{},{lon:-e.lon*Y,lat:e.lat*Y})}function fe(e){return N*h.b.AU/e}function he(e){return Q/e}function be(e,g){var n=re(e),t=e+n/L,r=v.a.trueVSOP87(E,t),o=r.lon,l=r.lat,f=r.range,j=ne(t),m=Object(c.a)(j,2),O=m[0];o=o+m[1]+v.a.aberration(f),f*=h.b.AU;var y=new d.c.Ecliptic(o,l).toEquatorial(O),w=ue(e),D={lon:h.b.pmod(o,Z),lat:l,ra:y.ra,dec:y.dec,range:f,gst:w*B,deltaT:n,sd:fe(f),"ε":O};if(g){var P=y.toHorizontal(g,w*K),M=P.az,H=P.alt;H-=I($/f)*S(H),D.alt=H,D.az=M}return D}function de(e){var n=A.position(e-1.21/86400),t=n.lon,r=n.lat,o=n.range;return{lon:t+=-.29965*R*h.b.J2000Century(e),lat:r,range:o}}function ve(e,g){var n=re(e),t=e+n/L,r=de(e),o=r.lon,l=r.lat,v=r.range,j=ne(t),O=Object(c.a)(j,2),y=O[0];o+=O[1];var w=new d.c.Ecliptic(o,l).toEquatorial(y),D=ue(e),P=be(e),M=m.a.phaseAngleEquatorial(z({range:v},w),P),H=(1+S(M))/2,J=f.a.sep(P,w),T={lon:h.b.pmod(o,Z),lat:l,ra:w.ra,dec:w.dec,range:v,gst:D*B,deltaT:n,sd:he(v),"ε":y,phase:M,fraction:H,elongation:J};if(g){var k=w.toHorizontal(g,D*K),E=k.az,A=k.alt;A-=I($/v)*S(A),T.alt=A,T.az=E}return T}var ge=function(){function e(n,t,o,l){var c=arguments.length>4&&void 0!==arguments[4]?arguments[4]:4;Object(r.a)(this,e);var f=[],h=[],d=[],v=0;this.T0=t;for(var i=0;i<=c;i++){for(var j=i/c*(l-o)+o,m=n(t+j),O=m.lon,w=m.lat,D=m.range;O<v;)O+=Z;v=O,f.push([j,O]),h.push([j,w]),d.push([j,D])}this.L=y.a.lagrangePoly(f),this.B=y.a.lagrangePoly(h),this.R=y.a.lagrangePoly(d)}return Object(o.a)(e,[{key:"lbr",value:function(e){var n=e-this.T0,t=h.b.horner(n,this.L),r=h.b.horner(n,this.B),o=h.b.horner(n,this.R);return{lon:h.b.pmod(t,Z),lat:r,range:o}}},{key:"position",value:function(e,g){var n=re(e),t=e+n/L,r=this.lbr(t),o=r.lon,l=r.lat,f=r.range,h=ne(t),v=Object(c.a)(h,2),j=v[0];o+=v[1];var m=new d.c.Ecliptic(o,l).toEquatorial(j),O=ue(e),y={lon:o,lat:l,ra:m.ra,dec:m.dec,range:f,deltaT:n,gst:O*B,"ε":j};if(g){var w=m.toHorizontal(g,O*K),D=w.alt,P=w.az;y.alt=D,y.az=P}return y}}]),e}();function pe(e,n,t,g){if(n<=e)return[];(t=_(t))<1/L&&(t=1/L);var r,o=e,l=[],c=0;if(t<1/6&&(n-e)/t>6)for(;o<=n;){r=re(o);for(var f=o,body=new ge((function(e){var n=v.a.trueVSOP87(E,e),t=n.lon,r=n.lat,o=n.range;return{lon:t+=v.a.aberration(o),lat:r,range:o*h.b.AU}}),f+r/L,0,1,4);o<=f+1&&o<n;){var d=body.position(o,g);if(g){var j=I($/d.range);d.alt-=j*S(d.alt)}l.push(z({jd:o,sd:fe(d.range)},d)),o=e+ ++c*t}}else for(;o<=n;){var m=be(o,g);if(g){var O=I($/m.range);m.alt-=O*S(m.alt)}l.push(z({jd:o,sd:fe(m.range)},m)),o=e+ ++c*t}return l}function je(e,n,t,g){if(n<=e)return[];(t=_(t))<1/L&&(t=1/L);var r,o=e,l=[],c=0;if(t<1/7&&(n-e)/t>7)for(;o<=n;){r=re(o);for(var h=o,body=new ge((function(e){var n=de(e);return{lon:n.lon,lat:n.lat,range:n.range}}),h+r/L,0,1,5),d=new ge((function(e){var n=be(e);return{lon:n.lon,lat:n.lat,range:n.range}}),h+r/L,0,1,4);o<=h+1&&o<=n;){var v=body.position(o,g),j=d.position(o),O=m.a.phaseAngleEquatorial(v,j),y=(1+S(O))/2,w=f.a.sep(j,v);if(g){var D=I($/v.range);v.alt-=D*S(v.alt)}l.push(z(z({jd:o,sd:he(v.range)},v),{},{phase:O,fraction:y,elongation:w})),o=e+ ++c*t}}else for(;o<=n;){var P=ve(o,g),M=be(o),H=m.a.phaseAngleEquatorial(P,M),J=(1+S(H))/2,T=f.a.sep(M,P);if(g){var k=I($/P.range);P.alt-=k*S(P.alt)}l.push(z(z({jd:o,sd:he(P.range)},P),{},{phase:H,fraction:J,elongation:T})),o=e+ ++c*t}return l}var me=function(){function e(n){Object(r.a)(this,e),this.bodyFunc=n}return Object(o.a)(e,[{key:"_calcH0",value:function(e,g,n,t){var r=ue(e),o=this.bodyFunc(e),l=o.ra,c=o.dec;return(t*O.a.hourAngle(g.lat,n,c)-(h.b.pmod(r-g.lon-l+V,Z)-V))/Z}},{key:"calcH0",value:function(e,g,n,t){for(var r,i=0;i<10&&(r=this._calcH0(e,g,n,t),0==i&&r<0&&(r+=1),e+=r,!(_(r)<1e-6));i++);return e}},{key:"calcHA",value:function(e,g,n){var t;n=h.b.pmod(n+V,Z)-V;for(var i=0;i<10;i++){var r=ue(e),o=this.bodyFunc(e).ra;if(t=(n-(h.b.pmod(r-g.lon-o+V,Z)-V))/Z,0==i&&t<0&&(t+=1),e+=t,_(t)<1e-6)break}return e}}]),e}(),Oe=function(){function e(n,t,o){var l=this;Object(r.a)(this,e);var c=this.T0=ie(n,t,1);this.sun=new ge((function(e){var n=v.a.trueVSOP87(E,e),t=n.lon,r=n.lat,o=n.range;return{lon:t+=v.a.aberration(o),lat:r,range:o}}),c,-1,33,7),this.rise=new me((function(e){return l.sun.position(e)})),this.config=o}return Object(o.a)(e,[{key:"calc",value:function(e,g){if(!(e<1||e>31)){var n,t,r,o,l=this.config||{},c=this.rise,f=le(g.timezone),d=this.T0+U(e-1)-f/24,v=[];n=(l.alt_subuh||-20)*Y,t=c.calcH0(d,g,n,-1),v.push({name:"subuh",label:"Subuh",jd:t}),o=t,n=G+l.height?ce(g.height):0,t=c.calcH0(d,g,n,-1),v.push({name:"terbit",label:"Terbit",jd:t}),t=c.calcHA(d,g,0*N),v.push({name:"dzuhur",label:"Dzuhur",jd:t});var j=this.sun.position(t).dec;n=F(1/(1+_(C(j-g.lat)))),t=c.calcH0(d,g,n,1),v.push({name:"ashar",label:"Ashar",jd:t}),n=G+l.height?ce(g.height):0,t=c.calcH0(d,g,n,1),v.push({name:"maghrib",label:"Maghrib",jd:t}),r=t,n=(l.alt_isya||-18)*Y,t=c.calcH0(d,g,n,1),v.push({name:"isya",label:"Isya",jd:t});var m=h.b.pmod(o-r,1);return v.push({name:"tengah",label:"Pertengahan malam",jd:r+m/2}),v.push({name:"pertiga",label:"Pertiga malam akhir",jd:r+2*m/3}),v.map((function(e){return"terbit"!=e.name&&l[e.name]&&(e.jd+=l[e.name]/1440),e.date=w.a.JDToDate(e.jd),e}))}}}]),e}()}}]);