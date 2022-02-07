/*! For license information please see LICENSES */
(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{259:function(t,n,o){"use strict";o.d(n,"a",(function(){return c})),o.d(n,"b",(function(){return h}));var r=o(4),e=o(136);o(273);class c{constructor(t,n){"object"==typeof t&&(n=t.lat,t=t.lon),this.lon=t||0,this.lat=n||0}toEquatorial(t){const[n,o]=r.b.sincos(t),[e,c]=r.b.sincos(this.lat),[l,M]=r.b.sincos(this.lon);let f=Math.atan2(l*o-e/c*n,M);f<0&&(f+=2*Math.PI);const d=Math.asin(e*o+c*n*l);return new h(f,d)}}class h{constructor(t=0,n=0){this.ra=t,this.dec=n}toEcliptic(t){const[n,o]=r.b.sincos(t),[e,h]=r.b.sincos(this.ra),[l,M]=r.b.sincos(this.dec),f=Math.atan2(e*o+l/M*n,h),d=Math.asin(l*o-M*n*e);return new c(f,d)}toHorizontal(g,t){const n=new e.c.Time(t).rad()-g.lon-this.ra,[o,c]=r.b.sincos(n),[h,M]=r.b.sincos(g.lat),[f,d]=r.b.sincos(this.dec),P=Math.atan2(o,c*h-f/d*M),I=Math.asin(h*f+M*d*c);return new l(P,I)}toGalactic(){const[t,n]=r.b.sincos(d.ra-this.ra),[o,e]=r.b.sincos(d.dec),[c,h]=r.b.sincos(this.dec),l=Math.atan2(t,n*o-c/h*e),f=(I+1.5*Math.PI-l)%(2*Math.PI),P=Math.asin(c*o+h*e*n);return new M(f,P)}}class l{constructor(t=0,n=0){this.az=t,this.alt=n}toEquatorial(g,t){const[n,o]=r.b.sincos(this.az),[c,l]=r.b.sincos(this.alt),[M,f]=r.b.sincos(g.lat),d=Math.atan2(n,o*M+c/l*f),P=r.b.pmod(new e.c.Time(t).rad()-g.lon-d,2*Math.PI),I=Math.asin(M*c-f*l*o);return new h(P,I)}}class M{constructor(t=0,n=0){this.lon=t,this.lat=n}toEquatorial(){const[t,n]=r.b.sincos(this.lon-I-Math.PI/2),[o,e]=r.b.sincos(d.dec),[c,l]=r.b.sincos(this.lat),M=Math.atan2(t,n*o-c/l*e),f=r.b.pmod(M+d.ra-Math.PI,2*Math.PI),P=Math.asin(c*o+l*e*n);return new h(f,P)}}const f=new h(new e.c.RA(12,49,0).rad(),27.4*Math.PI/180),d=f,P=33*Math.PI/180,I=P;n.c={Ecliptic:c,Equatorial:h,Horizontal:l,Galactic:M,galacticNorth:f,galacticNorth1950:d,galacticLon0:P,galactic0Lon1950:I}},260:function(t,n,o){"use strict";var r=o(4),e=(o(261),o(259)),c=o(262);function h(t){const n=r.b.horner(t,280.46646,36000.76983,3032e-7)*Math.PI/180,o=l(t),e=(r.b.horner(t,1.914602,-.004817,-14e-6)*Math.sin(o)+(.019993-101e-6*t)*Math.sin(2*o)+289e-6*Math.sin(3*o))*Math.PI/180;return{lon:r.b.pmod(n+e,2*Math.PI),ano:r.b.pmod(o+e,2*Math.PI)}}function l(t){return r.b.horner(t,357.52911,35999.05029,-1537e-7)*Math.PI/180}function M(t){return r.b.horner(t,.016708634,-42037e-9,-1.267e-7)}function f(t){const n=d(t),{lon:o,ano:r}=h(t);return o-.00569*Math.PI/180-.00478*Math.PI/180*Math.sin(n)}function d(t){return 125.04*Math.PI/180-1934.136*Math.PI/180*t}function P(t,n){let{lon:o,lat:e,range:c}=t.position(n);const s=o+Math.PI,h=r.b.horner(r.b.J2000Century(n),s,-1.397*Math.PI/180,-31e-5*Math.PI/180),[l,M]=r.b.sincos(h),f=.03916/3600*Math.PI/180*(M-l);return o=r.b.pmod(s-.09033/3600*Math.PI/180,2*Math.PI),e=f-e,new r.b.Coord(o,e,c)}function I(t){return-20.4898/3600*Math.PI/180/t}n.a={trueLongitude:h,true:h,meanAnomaly:l,eccentricity:M,radius:function(t){const{lon:n,ano:o}=h(t),r=M(t);return 1.000001018*(1-r*r)/(1+r*Math.cos(o))},apparentLongitude:f,true2000:function(t){let{lon:n,ano:o}=h(t);return n-=.01397*Math.PI/180*t*100,{lon:n,ano:o}},trueEquatorial:function(t){const{lon:n,ano:o}=h(r.b.J2000Century(t)),e=c.a.meanObliquity(t),[l,M]=r.b.sincos(n),[f,d]=r.b.sincos(e),P=Math.atan2(d*l,M),I=f*l;return new r.b.Coord(P,I)},apparentEquatorial:function(t){const n=r.b.J2000Century(t),o=f(n),e=c.a.meanObliquity(t),[h,l]=r.b.sincos(o),[M,P]=r.b.sincos(e+.00256*Math.PI/180*Math.cos(d(n))),I=Math.atan2(P*h,l),L=Math.asin(M*h);return new r.b.Coord(I,L)},trueVSOP87:P,apparentVSOP87:function(t,n){let{lon:o,lat:e,range:h}=P(t,n);return o=o+c.a.nutation(n)[0]+I(h),new r.b.Coord(o,e,h)},apparentEquatorialVSOP87:function(t,n){const{lon:o,lat:h,range:l}=P(t,n),[M,f]=c.a.nutation(n),d=o+M+I(l),L=c.a.meanObliquity(n)+f,{ra:w,dec:m}=new e.c.Ecliptic(d,h).toEquatorial(L);return new r.a(w,m,l)},aberration:I}},261:function(t,n,o){"use strict";var r=o(4),e=o(136),c=o(259),h=o(276);function l(t,n){const o=[];Object.keys(n).forEach((r=>{o[r]=0;let e=n[r].length-1;for(;e>=0;e--){const c={a:n[r][e][0],b:n[r][e][1],c:n[r][e][2]};o[r]+=c.a*Math.cos(c.b+c.c*t)}}));return r.b.horner(t,...o)}n.a={Planet:class{constructor(t){if("object"!=typeof t)throw new TypeError("need planet vsop87 data");this.name=t.name,this.type=t.type||"B",this.series=t}position2000(t){const n=.1*r.b.J2000Century(t),o=r.b.pmod(l(n,this.series.L),2*Math.PI),e=l(n,this.series.B),M=l(n,this.series.R);switch(this.type){case"B":return new r.b.Coord(o,e,M);case"D":{const n=new c.c.Ecliptic(o,e),l=r.b.JDEToJulianYear(t),f=2e3,d=h.a.eclipticPosition(n,l,f);return new r.b.Coord(d.lon,d.lat,M)}}}position(t){const n=.1*r.b.J2000Century(t),o=r.b.pmod(l(n,this.series.L),2*Math.PI),e=l(n,this.series.B),M=l(n,this.series.R);switch(this.type){case"B":{const n=new c.c.Ecliptic(o,e),l=2e3,f=r.b.JDEToJulianYear(t),d=h.a.eclipticPosition(n,l,f);return new r.b.Coord(d.lon,d.lat,M)}case"D":return new r.b.Coord(o,e,M)}}},toFK5:function(t,n,o){const c=r.b.J2000Century(o),h=t-e.c.angleFromDeg((1.397+31e-5*c)*c),[l,M]=r.b.sincos(h),f=t+e.c.angleFromSec(.03916*(M+l)*Math.tan(n)-.09033),d=n+e.c.angleFromSec(.03916*(M-l));return new r.b.Coord(f,d)}}},262:function(t,n,o){"use strict";var r=o(4),e=o(136);function c(t){const n=r.b.J2000Century(t),o=r.b.horner(n,297.85036,445267.11148,-.0019142,1/189474)*Math.PI/180,e=r.b.horner(n,357.52772,35999.05034,-1603e-7,-1/3e5)*Math.PI/180,c=r.b.horner(n,134.96298,477198.867398,.0086972,1/56250)*Math.PI/180,h=r.b.horner(n,93.27191,483202.017538,-.0036825,1/327270)*Math.PI/180,M=r.b.horner(n,125.04452,-1934.136261,.0020708,1/45e4)*Math.PI/180;let f=0,d=0;for(let i=l.length-1;i>=0;i--){const t=l[i],P=t.d*o+t.m*e+t.n*c+t.f*h+t.ω*M,[s,I]=r.b.sincos(P);f+=s*(t.s0+t.s1*n),d+=I*(t.c0+t.c1*n)}return f*=1e-4/3600*(Math.PI/180),d*=1e-4/3600*(Math.PI/180),[f,d]}function h(t){return r.b.horner(r.b.J2000Century(t),new e.c.Angle(!1,23,26,21.448).rad(),-46.815/3600*(Math.PI/180),-59e-5/3600*(Math.PI/180),.001813/3600*(Math.PI/180))}const l=function(){const t="d,m,n,f,ω,s0,s1,c0,c1".split(",");return[[0,0,0,0,1,-171996,-174.2,92025,8.9],[-2,0,0,2,2,-13187,-1.6,5736,-3.1],[0,0,0,2,2,-2274,-.2,977,-.5],[0,0,0,0,2,2062,.2,-895,.5],[0,1,0,0,0,1426,-3.4,54,-.1],[0,0,1,0,0,712,.1,-7,0],[-2,1,0,2,2,-517,1.2,224,-.6],[0,0,0,2,1,-386,-.4,200,0],[0,0,1,2,2,-301,0,129,-.1],[-2,-1,0,2,2,217,-.5,-95,.3],[-2,0,1,0,0,-158,0,0,0],[-2,0,0,2,1,129,.1,-70,0],[0,0,-1,2,2,123,0,-53,0],[2,0,0,0,0,63,0,0,0],[0,0,1,0,1,63,.1,-33,0],[2,0,-1,2,2,-59,0,26,0],[0,0,-1,0,1,-58,-.1,32,0],[0,0,1,2,1,-51,0,27,0],[-2,0,2,0,0,48,0,0,0],[0,0,-2,2,1,46,0,-24,0],[2,0,0,2,2,-38,0,16,0],[0,0,2,2,2,-31,0,13,0],[0,0,2,0,0,29,0,0,0],[-2,0,1,2,2,29,0,-12,0],[0,0,0,2,0,26,0,0,0],[-2,0,0,2,0,-22,0,0,0],[0,0,-1,2,1,21,0,-10,0],[0,2,0,0,0,17,-.1,0,0],[2,0,-1,0,1,16,0,-8,0],[-2,2,0,2,2,-16,.1,7,0],[0,1,0,0,1,-15,0,9,0],[-2,0,1,0,1,-13,0,7,0],[0,-1,0,0,1,-12,0,6,0],[0,0,2,-2,0,11,0,0,0],[2,0,-1,2,1,-10,0,5,0],[2,0,1,2,2,-8,0,3,0],[0,1,0,2,2,7,0,-3,0],[-2,1,1,0,0,-7,0,0,0],[0,-1,0,2,2,-7,0,3,0],[2,0,0,2,1,-7,0,3,0],[2,0,1,0,0,6,0,0,0],[-2,0,2,2,2,6,0,-3,0],[-2,0,1,2,1,6,0,-3,0],[2,0,-2,0,1,-6,0,3,0],[2,0,0,0,1,-6,0,3,0],[0,-1,1,0,0,5,0,0,0],[-2,-1,0,2,1,-5,0,3,0],[-2,0,0,0,1,-5,0,3,0],[0,0,2,2,1,-5,0,3,0],[-2,0,2,0,1,4,0,0,0],[-2,1,0,2,1,4,0,0,0],[0,0,1,-2,0,4,0,0,0],[-1,0,1,0,0,-4,0,0,0],[-2,1,0,0,0,-4,0,0,0],[1,0,0,0,0,-4,0,0,0],[0,0,1,2,0,3,0,0,0],[0,0,-2,2,2,-3,0,0,0],[-1,-1,1,0,0,-3,0,0,0],[0,1,1,0,0,-3,0,0,0],[0,-1,1,2,2,-3,0,0,0],[2,-1,-1,2,2,-3,0,0,0],[0,0,3,2,2,-3,0,0,0],[2,-1,0,2,2,-3,0,0,0]].map((n=>{const o={};return t.forEach(((p,i)=>{o[p]=n[i]})),o}))}();n.a={nutation:c,approxNutation:function(t){const n=(t-r.b.J2000)/36525,o=(125.04452-1934.136261*n)*Math.PI/180,e=(280.4665+36000.7698*n)*Math.PI/180,c=(218.3165+481267.8813*n)*Math.PI/180,[h,l]=r.b.sincos(o),[M,f]=r.b.sincos(2*e),[d,P]=r.b.sincos(2*c),[I,L]=r.b.sincos(2*o);return[(-17.2*h-1.32*M-.23*d+.21*I)/3600*(Math.PI/180),(9.2*l+.57*f+.1*P-.09*L)/3600*(Math.PI/180)]},meanObliquity:h,meanObliquityLaskar:function(t){return r.b.horner(.01*r.b.J2000Century(t),new e.c.Angle(!1,23,26,21.448).rad(),-4680.93/3600*(Math.PI/180),-1.55/3600*(Math.PI/180),1999.25/3600*(Math.PI/180),-51.38/3600*(Math.PI/180),-249.67/3600*(Math.PI/180),-39.05/3600*(Math.PI/180),7.12/3600*(Math.PI/180),27.87/3600*(Math.PI/180),5.79/3600*(Math.PI/180),2.45/3600*(Math.PI/180))},nutationInRA:function(t){const[n,o]=c(t),r=h(t);return n*Math.cos(r+o)}}},264:function(t,n,o){"use strict";var r=o(4),e=o(103);const{abs:c,acos:h,asin:l,atan2:M,cos:f,hypot:d,sin:P,sqrt:I,tan:L}=Math;function w(t,n){const[o,e]=r.b.sincos(t.dec),[c,l]=r.b.sincos(n.dec),M=o*c+e*l*f(t.ra-n.ra);if(M<r.b.CosSmallAngle)return h(M);{const o=f((n.dec+t.dec)/2);return d((n.ra-t.ra)*o,n.dec-t.dec)}}function m(t,n,o,r,c){if(c=c||w,3!==o.length||3!==r.length)throw e.a.errorNot3;const h=new Array(3);o.forEach(((t,n)=>{h[n]=w(o[n],r[n])}));return new e.a.Len3(t,n,h).extremum()[1]}function y(a){return.5*(1-Math.cos(a))}function J(t,n){return 2*l(I(y(n.dec-t.dec)+f(t.dec)*f(n.dec)*y(n.ra-t.ra)))}function T(t,n){const[o,e]=r.b.sincos(t.dec),[c,h]=r.b.sincos(n.dec),l=f(n.ra-t.ra),I=e*c-o*h*l,L=h*P(n.ra-t.ra),w=o*c+e*h*l;return M(d(I,L),w)}n.a={sep:w,minSep:m,minSepRect:function(t,n,o,h){if(3!==o.length||3!==h.length)throw e.a.ErrorNot3;const l=new Array(3).fill(0),M=new Array(3).fill(0);o.forEach(((t,n)=>{[l[n],M[n]]=function(t,n){const[o,e]=r.b.sincos(t.dec),c=n.ra-t.ra,h=L(c),l=L(c/2),M=1/(1+o*o*h*l),f=P(n.dec-t.dec);return[-M*(1-o/e*f)*e*h,M*(f+o*e*h*l)]}(o[n],h[n])}));const f=new e.a.Len3(-1,1,l),I=new e.a.Len3(-1,1,M),w=(l[2]-l[0])/2,m=(M[2]-M[0])/2,y=l[0]+l[2]-2*l[1],J=M[0]+M[2]-2*M[1],T=w,E=m;let u,C,A=-(l[1]*T+M[1]*E)/(T*T+E*E),v=A;for(let t=0;t<10;t++){if(u=f.interpolateN(v),C=I.interpolateN(v),c(A)<1e-5)return d(u,C);const t=w+v*y,n=m+v*J;A=-(u*t+C*n)/(t*t+n*n),v+=A}throw new Error("minSepRect: failure to converge")},hav:y,sepHav:J,minSepHav:function(t,n,o,r){return m(t,n,o,r,J)},sepPauwels:T,minSepPauwels:function(t,n,o,r){return m(t,n,o,r,T)},relativePosition:function(t,n){const[o,e]=r.b.sincos(t.ra-n.ra),[c,h]=r.b.sincos(n.dec);return M(o,h*L(t.dec)-c*e)}}},265:function(t,n,o){"use strict";var r=o(4),e=o(262);function c(t){const[n,o]=r.b.modf(t+.5);return[r.b.J2000Century(n-.5),o]}const h=[24110.54841,8640184.812866,.093104,-62e-7];function l(t){const[s,n]=M(t);return s+1.00273790935*n*86400}function M(t){const[n,o]=c(t);return[r.b.horner(n,...h),o]}n.a={JDToCFrac:c,iau82:h,mean:function(t){return r.b.pmod(l(t),86400)},mean0UT:function(t){const[s,n]=M(t);return r.b.pmod(s,86400)},apparent:function(t){const s=l(t),n=3600*e.a.nutationInRA(t)*180/Math.PI/15;return r.b.pmod(s+n,86400)},apparent0UT:function(t){const[n,o]=r.b.modf(t+.5),c=(n-.5-r.b.J2000)/36525,s=r.b.horner(c,...h)+1.00273790935*o*86400,l=3600*e.a.nutationInRA(n)*180/Math.PI/15;return r.b.pmod(s+l,86400)}}},266:function(t,n,o){"use strict";var r=o(4);const e=1/3600*Math.PI/180;function c(t,n){const o=[];return Object.keys(n).forEach((e=>{o[e]=0;let c=n[e].length-1;for(;c>=0;c--){const h=n[e][c],l=r.b.horner(t,h.slice(1));o[e]+=h[0]*Math.sin(l)}})),r.b.horner(t,...o)}class h{constructor(data){if("object"!=typeof data)throw new TypeError("need Elp data");this.series=data}_calcLBR(t){const n=r.b.horner(t,this.series.W1)+c(t,this.series.L)*e,o=c(t,this.series.B)*e,h=c(t,this.series.R);return{L:r.b.pmod(n,2*Math.PI),B:o,R:h}}positionXYZ(t){const n=r.b.J2000Century(t),{L:o,B:e,R:c}=this._calcLBR(n),h=c*Math.cos(o)*Math.cos(e),l=c*Math.sin(o)*Math.cos(e),M=c*Math.sin(e),f=r.b.horner(n,0,10180391e-12,4.7020439e-7,-5.417367e-10,-2507948e-18,463486e-20),d=r.b.horner(n,0,-.000113469002,1.2372674e-7,1.265417e-9,-1371808e-18,-320334e-20),P=Math.sqrt(1-f*f-d*d);return{x:(1-2*f*f)*h+2*f*d*l+2*f*P*M,y:2*f*d*h+(1-2*d*d)*l+-2*d*P*M,z:-2*f*P*h+2*d*P*l+(1-2*f*f-2*d*d)*M}}lightTime(t){const n=c(r.b.J2000Century(t),this.series.R);return r.b.lightTime(n/r.b.AU)}position(t){const n=r.b.J2000Century(t),{L:o,B:c,R:h}=this._calcLBR(n),l=r.b.horner(n,0,5028.79695,1.112,77e-6,-2353e-8)*e;return new r.a(r.b.pmod(o+l,2*Math.PI),c,h)}}n.a={Moon:h,position:function(t,n){return new h(t).position(n)}}},267:function(t,n,o){"use strict";var base=o(4),r=o(76),e=o(259),c=o(262),h=o(276),l=o(260);const{cos:M,tan:f}=Math;function d(t,n,o){const r=c.a.meanObliquity(o),[e,h]=base.b.sincos(r),[l,M]=c.a.nutation(o),[d,P]=base.b.sincos(t),I=f(n);return[(h+e*d*I)*l-P*I*M,e*P*l+d*M]}const P=20.49552*Math.PI/180/3600;function I(t){return base.b.horner(t,102.93735,1.71946,46e-5)*Math.PI/180}function L(t,n,o){const r=c.a.meanObliquity(o),e=base.b.J2000Century(o),{lon:h,ano:d}=l.a.trueLongitude(e),L=l.a.eccentricity(e),w=I(e),[m,y]=base.b.sincos(t),[J,T]=base.b.sincos(n),[E,C]=base.b.sincos(h),[A,v]=base.b.sincos(w),D=M(r),x=y*D,z=P*(L*(x*v+m*A)-(x*C+m*E))/T,S=D*(f(r)*T-m*J),R=y*J;return[z,P*(L*(v*S+A*R)-(C*S+E*R))]}function w(t,n,o){const r=base.b.J2000Century(o),e={T:r,L2:3.1761467+1021.3285546*r,L3:1.7534703+628.3075849*r,L4:6.2034809+334.0612431*r,L5:.5995465+52.9690965*r,L6:.8740168+21.3299095*r,L7:5.4812939+7.4781599*r,L8:5.3118863+3.8133036*r,Lp:3.8103444+8399.6847337*r,D:5.1984667+7771.3771486*r,Mp:2.3555559+8328.6914289*r,F:1.6279052+8433.4661601*r};let c=0,h=0,l=0;for(let i=35;i>=0;i--){const[t,n,o]=y[i](e);c+=t,h+=n,l+=o}const[M,f]=base.b.sincos(t),[d,P]=base.b.sincos(n);return[(h*f-c*M)/(m*P),-((c*f+h*M)*d-l*P)/m]}const m=17314463350,y=[function(t){const[n,o]=base.b.sincos(t.L3);return[(-1719914-2*t.T)*n-25*o,(25-13*t.T)*n+(1578089+156*t.T)*o,(10+32*t.T)*n+(684185-358*t.T)*o]},function(t){const[n,o]=base.b.sincos(2*t.L3);return[(6434+141*t.T)*n+(28007-107*t.T)*o,(25697-95*t.T)*n+(-5904-130*t.T)*o,(11141-48*t.T)*n+(-2559-55*t.T)*o]},function(t){const[n,o]=base.b.sincos(t.L5);return[715*n,6*n-657*o,-15*n-282*o]},function(t){const[n,o]=base.b.sincos(t.Lp);return[715*n,-656*o,-285*o]},function(t){const[n,o]=base.b.sincos(3*t.L3);return[(486-5*t.T)*n+(-236-4*t.T)*o,(-216-4*t.T)*n+(5*t.T-446)*o,-94*n-193*o]},function(t){const[n,o]=base.b.sincos(t.L6);return[159*n,2*n-147*o,-6*n-61*o]},function(t){const n=Math.cos(t.F);return[0,26*n,-59*n]},function(t){const[n,o]=base.b.sincos(t.Lp+t.Mp);return[39*n,-36*o,-16*o]},function(t){const[n,o]=base.b.sincos(2*t.L5);return[33*n-10*o,-9*n-30*o,-5*n-13*o]},function(t){const[n,o]=base.b.sincos(2*t.L3-t.L5);return[31*n+o,n-28*o,-12*o]},function(t){const[n,o]=base.b.sincos(3*t.L3-8*t.L4+3*t.L5);return[8*n-28*o,25*n+8*o,11*n+3*o]},function(t){const[n,o]=base.b.sincos(5*t.L3-8*t.L4+3*t.L5);return[8*n-28*o,-25*n-8*o,-11*n+-3*o]},function(t){const[n,o]=base.b.sincos(2*t.L2-t.L3);return[21*n,-19*o,-8*o]},function(t){const[n,o]=base.b.sincos(t.L2);return[-19*n,17*o,8*o]},function(t){const[n,o]=base.b.sincos(t.L7);return[17*n,-16*o,-7*o]},function(t){const[n,o]=base.b.sincos(t.L3-2*t.L5);return[16*n,15*o,n+7*o]},function(t){const[n,o]=base.b.sincos(t.L8);return[16*n,n-15*o,-3*n-6*o]},function(t){const[n,o]=base.b.sincos(t.L3+t.L5);return[11*n-o,-n-10*o,-n-5*o]},function(t){const[n,o]=base.b.sincos(2*t.L2-2*t.L3);return[-11*o,-10*n,-4*n]},function(t){const[n,o]=base.b.sincos(t.L3-t.L5);return[-11*n-2*o,-2*n+9*o,4*o-n]},function(t){const[n,o]=base.b.sincos(4*t.L3);return[-7*n-8*o,-8*n+6*o,-3*n+3*o]},function(t){const[n,o]=base.b.sincos(3*t.L3-2*t.L5);return[-10*n,9*o,4*o]},function(t){const[n,o]=base.b.sincos(t.L2-2*t.L3);return[-9*n,-9*o,-4*o]},function(t){const[n,o]=base.b.sincos(2*t.L2-3*t.L3);return[-9*n,-8*o,-4*o]},function(t){const[n,o]=base.b.sincos(2*t.L6);return[-9*o,-8*n,-3*n]},function(t){const[n,o]=base.b.sincos(2*t.L2-4*t.L3);return[-9*o,8*n,3*n]},function(t){const[n,o]=base.b.sincos(3*t.L3-2*t.L4);return[8*n,-8*o,-3*o]},function(t){const[n,o]=base.b.sincos(t.Lp+2*t.D-t.Mp);return[8*n,-7*o,-3*o]},function(t){const[n,o]=base.b.sincos(8*t.L2-12*t.L3);return[-4*n-7*o,-6*n+4*o,-3*n+2*o]},function(t){const[n,o]=base.b.sincos(8*t.L2-14*t.L3);return[-4*n-7*o,6*n-4*o,3*n-2*o]},function(t){const[n,o]=base.b.sincos(2*t.L4);return[-6*n-5*o,-4*n+5*o,-2*n+2*o]},function(t){const[n,o]=base.b.sincos(3*t.L2-4*t.L3);return[-n-o,-2*n-7*o,n-4*o]},function(t){const[n,o]=base.b.sincos(2*t.L3-2*t.L5);return[4*n-6*o,-5*n-4*o,-2*n-2*o]},function(t){const[n,o]=base.b.sincos(3*t.L2-3*t.L3);return[-7*o,-6*n,-3*n]},function(t){const[n,o]=base.b.sincos(2*t.L3-2*t.L4);return[5*n-5*o,-4*n-5*o,-2*n-2*o]},function(t){const[n,o]=base.b.sincos(t.Lp-2*t.D);return[5*n,-5*o,-2*o]}];var J={nutation:d,perihelion:I,eclipticAberration:function(t,n,o){const r=base.b.J2000Century(o),{lon:e,ano:c}=l.a.trueLongitude(r),h=l.a.eccentricity(r),M=I(r),[f,d]=base.b.sincos(n),[L,w]=base.b.sincos(e-t),[m,y]=base.b.sincos(M-t);return[P*(h*y-w)/d,-P*f*(L-h*m)]},aberration:L,position:function(t,n,o,r,e){const c=h.a.position(t,n,o,r,e),l=base.b.JulianYearToJDE(o),[M,f]=d(c.ra,c.dec,l),[P,I]=L(c.ra,c.dec,l);return c.ra+=M+P,c.dec+=f+I,c},aberrationRonVondrak:w,positionRonVondrak:function(t,n,o,r){const c=n-2e3;let l=new e.c.Equatorial;l.ra=t.ra+o.rad()*c,l.dec=t.dec+r.rad()*c;const M=base.b.JulianYearToJDE(n),[f,P]=w(l.ra,l.dec,M);l.ra+=f,l.dec+=P,l=h.a.position(l,2e3,n,0,0);const[I,L]=d(l.ra,l.dec,M);return l.ra+=I,l.dec+=L,l}};function T(t){return t<0}var E={decimalPlaces:function(t,n,o,r){const e=Math.pow(10,-o);for(let i=0;i<r;i++){const o=t(n);if(Math.abs(o-n)<e)return o;n=o}throw new Error("Maximum iterations reached")},fullPrecision:function(t,n,o){for(let i=0;i<o;i++){const o=t(n);if(Math.abs((o-n)/o)<1e-15)return o;n=o}throw new Error("Maximum iterations reached")},binaryRoot:function(t,n,o){let r=t(n),e=0;for(let c=0;c<52;c++){e=(n+o)/2;const c=t(e);if(0===c)break;T(r)===T(c)?(n=e,r=c):o=e}return e}};function C(t,n){return 2*Math.atan(Math.sqrt((1+n)/(1-n))*Math.tan(.5*t))}var A={trueAnomaly:C,true:C,radius:function(t,n,a){return a*(1-n*Math.cos(t))},kepler1:function(t,n,o){return E.decimalPlaces((function(o){return n+t*Math.sin(o)}),n,o,5*o)},kepler2:function(t,n,o){return E.decimalPlaces((function(o){const[r,e]=base.b.sincos(o);return o+(n+t*r-o)/(1-t*e)}),n,o,o)},kepler2a:function(t,n,o){return E.decimalPlaces((function(o){const[r,e]=base.b.sincos(o);return o+Math.asin(Math.sin((n+t*r-o)/(1-t*e)))}),n,o,5*o)},kepler2b:function(t,n,o){return E.decimalPlaces((function(o){const[r,e]=base.b.sincos(o);let c=(n+t*r-o)/(1-t*e);return c>.5?c=.5:c<-.5&&(c=-.5),o+c}),n,o,o)},kepler3:function(t,n){let o=1;(n=base.b.pmod(n,2*Math.PI))>Math.PI&&(o=-1,n=2*Math.PI-n);let r=.5*Math.PI,e=.25*Math.PI;for(let i=0;i<53;i++){n-(r-t*Math.sin(r))<0?r-=e:r+=e,e*=.5}return o<0?-r:r},kepler4:function(t,n){const[o,r]=base.b.sincos(n);return Math.atan2(o,r-t)}},v=o(261);function D(t,n){const{x:o,y:r,z:e}=x(t,n);return{x:o+4.4036e-7*r-1.90919e-7*e,y:-4.79966e-7*o+.917482137087*r-.397776982902*e,z:.397776982902*r+.917482137087*e}}function x(t,n){const{lon:o,lat:r,range:e}=t.position2000(n),s=o+Math.PI,c=-r,[h,l]=base.b.sincos(s),[M,f]=base.b.sincos(c);return{x:e*f*l,y:e*f*h,z:e*M}}const z=[2306.2181,.30188,.017998],S=[2306.2181,1.09468,.018203],R=[2004.3109,-.42665,-.041833];var O={position:function(t,n){const{lon:o,lat:r,range:e}=l.a.trueVSOP87(t,n),[h,M]=base.b.sincos(c.a.meanObliquity(n)),[f,d]=base.b.sincos(o),P=Math.sin(r);return{x:e*d,y:e*(f*M-P*h),z:e*(f*h+P*M)}},longitudeJ2000:function(t,n){const o=t.position2000(n).lon;return base.b.pmod(o+Math.PI-.09033/3600*Math.PI/180,2*Math.PI)},positionJ2000:D,xyz:x,positionB1950:function(t,n){const{x:o,y:r,z:e}=x(t,n);return{x:.999925702634*o+.012189716217*r+11134016e-12*e,y:-.011179418036*o+.917413998946*r-.397777041885*e,z:-.004859003787*o+.397747363646*r+.917482111428*e}},positionEquinox:function(t,n,o){const r=D(t,n),e=r.x,c=r.y,h=r.z,l=.01*(o-2e3),M=base.b.horner(l,z)*l*Math.PI/180/3600,f=base.b.horner(l,S)*l*Math.PI/180/3600,d=base.b.horner(l,R)*l*Math.PI/180/3600,[P,I]=base.b.sincos(M),[L,w]=base.b.sincos(f),[m,y]=base.b.sincos(d);return{x:(I*w*y-P*L)*e+(-I*L-P*w*y)*c+-w*m*h,y:(P*w+I*L*y)*e+(I*w-P*L*y)*c+-L*m*h,z:I*m*e+-P*m*c+y*h}}};function j(t,n,o){const r=O.positionJ2000(o,n),[e,c,h]=[r.x,r.y,r.z];let l=0,M=0,f=0,d=0;function P(o=0){const{x:r,y:P,z:I}=t(n-o);l=e+r,M=c+P,f=h+I,d=Math.sqrt(l*l+M*M+f*f)}P();P(base.b.lightTime(d));let I=Math.atan2(M,l);I<0&&(I+=2*Math.PI);const L=Math.asin(f/d),w=Math.sqrt(e*e+c*c+h*h),m=Math.acos((l*e+M*c+f*h)/w/d);return new base.b.Coord(I,L,void 0,m)}var k={position:function(t,n,o){let r=0,h=0,l=0;const M=n.position(o),[f,d,P]=[M.lon,M.lat,M.range],[I,L]=base.b.sincos(d),[w,m]=base.b.sincos(f);function y(n=0){const e=t.position(o-n),[c,M,f]=[e.lon,e.lat,e.range],[d,y]=base.b.sincos(M),[J,T]=base.b.sincos(c);r=f*y*T-P*L*m,h=f*y*J-P*L*w,l=f*d-P*I}y();const T=Math.sqrt(r*r+h*h+l*l);y(base.b.lightTime(T));let E=Math.atan2(h,r),C=Math.atan2(l,Math.hypot(r,h));const[A,D]=J.eclipticAberration(E,C,o),x=v.a.toFK5(E+A,C+D,o);E=x.lon,C=x.lat;const[z,S]=c.a.nutation(o);E+=z;const R=c.a.meanObliquity(o)+S;return new e.c.Ecliptic(E,C).toEquatorial(R)},Elements:class{constructor(t,n,o,r,e,c){let h={};"object"==typeof t&&(h=t),this.axis=h.axis||t,this.ecc=h.ecc||n,this.inc=h.inc||o,this.argP=h.argP||r,this.node=h.node||e,this.timeP=h.timeP||c}position(t,n){const o=base.b.K/this.axis/Math.sqrt(this.axis),r=base.b.SOblJ2000,e=base.b.COblJ2000,[c,h]=base.b.sincos(this.node),[l,M]=base.b.sincos(this.inc),f=h,d=c*e,P=c*r,I=-c*M,L=h*M*e-l*r,w=h*M*r+l*e,m=Math.atan2(f,I),y=Math.atan2(d,L),J=Math.atan2(P,w),a=Math.hypot(f,I),b=Math.hypot(d,L),T=Math.hypot(P,w);return j((t=>{const n=o*(t-this.timeP);let r;try{r=A.kepler2b(this.ecc,n,15)}catch(t){r=A.kepler3(this.ecc,n)}const e=A.trueAnomaly(r,this.ecc),c=A.radius(r,this.ecc,this.axis);return{x:c*a*Math.sin(m+this.argP+e),y:c*b*Math.sin(y+this.argP+e),z:c*T*Math.sin(J+this.argP+e)}}),t,n)}},astrometricJ2000:j,velocity:function(a,t){return 42.1219*Math.sqrt(1/t-.5/a)},vAphelion:function(a,t){return 29.7847*Math.sqrt((1-t)/(1+t)/a)},vPerihelion:function(a,t){return 29.7847*Math.sqrt((1+t)/(1-t)/a)},length1:function(a,t){const b=a*Math.sqrt(1-t*t);return Math.PI*(3*(a+b)-Math.sqrt((a+3*b)*(3*a+b)))},length2:function(a,t){const b=a*Math.sqrt(1-t*t),s=a+b,p=a*b,n=.5*s,o=Math.sqrt(p),r=2*p/s;return Math.PI*(21*n-2*o-3*r)*.125},length4:function(a,t){const b=a*Math.sqrt(1-t*t),n=(a-b)/(a+b),o=n*n;let r=1,e=.25*o,c=1+e,h=-1,l=2;for(;c!==r;)h+=2,l+=2,e*=h*h*o/(l*l),r=c,c+=e;return 2*Math.PI*a*r/(1+n)}},B=o(103),_=o(104),F=o(136),N=o(265);o(273);const{acos:Y,asin:H,cos:V,sin:U}=Math,X=86400,K=Math.PI/180,G=base.b.errorCode("always above horizon",-1),W=base.b.errorCode("always below horizon",1),Z=new F.c.Angle(!1,0,34,0).rad(),Q={stellar:-Z,solar:new F.c.Angle(!0,0,50,0).rad(),lunar:F.c.angleFromDeg(.7275),lunarMean:F.c.angleFromDeg(.125)};function $(t,n){return n?t-Z-n:t}const tt=t=>$(Q.stellar,t),nt=tt(),ot=t=>$(Q.solar,t),st=ot(),et=t=>Q.lunarMean-$(t),at=et(),it=(t,n)=>Q.lunar*t-(n||Z),ct=it;function ht(t,n,o){const r=(U(n)-U(t)*U(o))/(V(t)*V(o));if(r<-1)throw G;if(r>1)throw W;return Y(r)}function ut(t,n,o){return 240*(t+n)*180/Math.PI-o}function lt(t,n){return base.b.pmod(t+360.985647*n/360,X)}function bt(t){const n=[t.rise,t.transit,t.set];return n.rise=t.rise,n.transit=t.transit,n.set=t.set,n}function Mt(p,t,n,o,r){const e=240*ht(p.lat,t,r)*180/Math.PI,c=ut(p.lon,o,n),h={};return h.transit=base.b.pmod(c,X),h.rise=base.b.pmod(c-e,X),h.set=base.b.pmod(c+e,X),bt(h)}function ft(p,t,n,o,r,e){const c=Mt(p,n,o,r[1],e[1]),h=new B.a.Len3(-86400,X,r),l=new B.a.Len3(-86400,X,e),M=c.transit+t,f=h.interpolateX(M),d=lt(o,c.transit),P=-1*ut(p.lon,f,d);c.transit-=P;const[I,L]=base.b.sincos(p.lat),w=function(r){const e=r+t,c=h.interpolateX(e),M=l.interpolateX(e),f=lt(o,r),d=-1*ut(p.lon,c,f)/240*K,P=H(I*U(M)+L*V(M)*V(d));return r+X*(P-n)/(V(M)*L*U(d)*2*Math.PI)};return c.rise=w(c.rise),c.set=w(c.set),bt(c)}n.a={errorAboveHorizon:G,errorBelowHorizon:W,meanRefraction:Z,stdh0:Q,refraction:$,stdh0Stellar:tt,Stdh0Stellar:nt,stdh0Solar:ot,Stdh0Solar:st,stdh0LunarMean:et,Stdh0LunarMean:at,stdh0Lunar:it,Stdh0Lunar:ct,hourAngle:ht,approxTimes:Mt,times:ft,PlanetRise:class{constructor(t,n,o,e,c,h){this.opts=h||{},this.refraction=this.opts.refraction||tt(),t instanceof Date&&(t=(new _.a.Calendar).fromDate(t).toJD()),this.jd=Math.floor(t-.5)+.5,this.lat=n*K,this.lon=o*K;const l=(new _.a.Calendar).fromJD(this.jd);this.jde=l.toJDE(),this.ΔT=r.a.deltaT(l.toYear()),this.earth=e,this.planet=c}approxTimes(){const body=k.position(this.planet,this.earth,this.jde),t=N.a.apparent0UT(this.jd),n=Mt({lat:this.lat,lon:this.lon},this.refraction,t,body.ra,body.dec);return this._rsToJD(n)}times(){const body=[k.position(this.planet,this.earth,this.jde-1),k.position(this.planet,this.earth,this.jde),k.position(this.planet,this.earth,this.jde+1)],t=N.a.apparent0UT(this.jd),n=ft({lat:this.lat,lon:this.lon},this.ΔT,this.refraction,t,this._toArr(body,"ra"),this._toArr(body,"dec"));return this._rsToJD(n)}_toArr(body,p){return body.map((t=>t[p]))}_rsToJD(t){return{rise:this._toJD(t.rise),transit:this._toJD(t.transit),set:this._toJD(t.set)}}_toJD(t){const n=this.jd+t/86400;return this.opts.date?(new _.a.Calendar).fromJD(n).toDate():n}}}},268:function(t,n,o){"use strict";o(4);const{sin:r,cos:e}=Math;Math.PI},269:function(t,n,o){"use strict";o(4);Math.PI},270:function(t,n,o){"use strict";var r=o(136);const{sin:e,tan:c}=Math;Math.PI,new r.c.Angle(!1,0,0,58.294).rad(),new r.c.Angle(!1,0,0,.0668).rad(),new r.c.Angle(!1,0,0,58.276).rad(),new r.c.Angle(!1,0,0,.0824).rad()},273:function(t,n,o){"use strict";class r{constructor(t,n){this.radius=t,this.flat=n}A(){return this.radius}B(){return this.radius*(1-this.flat)}eccentricity(){return Math.sqrt((2-this.flat)*this.flat)}parallaxConstants(t,n){const o=1-this.flat,r=Math.sin(Math.atan(o*Math.tan(t))),e=Math.cos(Math.atan(o*Math.tan(t))),s=Math.sin(t),c=Math.cos(t),h=.001*n/this.radius;return[r*o+h*s,e+h*c]}rho(t){return.9983271+.0016764*Math.cos(2*t)-35e-7*Math.cos(4*t)}radiusAtLatitude(t){const s=Math.sin(t),n=Math.cos(t);return this.A()*n/Math.sqrt(1-(2-this.flat)*this.flat*s*s)}radiusOfCurvature(t){const s=Math.sin(t),n=(2-this.flat)*this.flat;return this.A()*(1-n)/Math.pow(1-n*s*s,1.5)}distance(t,n){const[o,r]=e((t.lat+n.lat)/2),[c,h]=e((t.lat-n.lat)/2),[l,M]=e((t.lon-n.lon)/2),s=c*M+r*l,f=h*M+o*l,d=Math.atan(Math.sqrt(s/f)),P=Math.sqrt(s*f)/d,h1=(3*P-1)/(2*f),h2=(3*P+1)/(2*s);return 2*d*this.radius*(1+this.flat*(h1*o*h-h2*r*c))}}new r(6378.14,1/298.257);function e(t){const s=Math.sin(t),n=Math.cos(t);return[s*s,n*n]}},276:function(t,n,o){"use strict";var base=o(4),r=o(259);class e{constructor(t,n,o){"object"==typeof t&&(n=t.pode,o=t.peri,t=t.inc),this.inc=t||0,this.node=n||0,this.peri=o||0}}Math.PI,Math.PI,Math.PI;var c=o(262),h=o(136);function l(t,n,o){const[r,e,c]=M(n,o),[l,f]=base.b.sincos(t.ra),d=r+e*l*Math.tan(t.dec),P=c*f;return{ra:new h.b(!1,0,0,d).rad(),dec:new h.a(!1,0,0,P).rad()}}function M(t,n){const o=.01*(n-t);return[3.07496+.00186*o,1.33621-57e-5*o,20.0431-.0085*o]}const f=Math.PI/180,s=f/3600,d=[2306.2181*s,1.39656*s,-139e-6*s],P=[2306.2181*s,1.39656*s,-139e-6*s],I=[2004.3109*s,-.8533*s,-217e-6*s],L=[2306.2181*s,.30188*s,.017998*s],w=[2306.2181*s,1.09468*s,.018203*s],m=[2004.3109*s,-.42665*s,-.041833*s];class y{constructor(t,n){let o=L,r=w,e=m;if(2e3!==t){const n=.01*(t-2e3);o=[base.b.horner(n,...d),.30188*s-344e-6*s*n,.017998*s],r=[base.b.horner(n,...P),1.09468*s+66e-6*s*n,.018203*s],e=[base.b.horner(n,...I),-.42665*s-217e-6*s*n,-.041833*s]}const c=.01*(n-t);this.ζ=base.b.horner(c,...o)*c,this.z=base.b.horner(c,...r)*c;const h=base.b.horner(c,...e)*c;this.sθ=Math.sin(h),this.cθ=Math.cos(h)}precess(t){const[n,o]=base.b.sincos(t.dec),[e,c]=base.b.sincos(t.ra+this.ζ),h=o*e,l=this.cθ*o*c-this.sθ*n,M=this.sθ*o*c+this.cθ*n,f=new r.b;return f.ra=Math.atan2(h,l)+this.z,M<base.b.CosSmallAngle?f.dec=Math.asin(M):f.dec=Math.acos(Math.hypot(h,l)),f}}const J=[47.0029*s,-.06603*s,598e-6*s],T=[174.876384*f,3289.4789*s,.60622*s],E=[5029.0966*s,2.22226*s,-42e-6*s],C=[47.0029*s,-.03302*s,6e-5*s],A=[174.876384*f,-869.8089*s,.03536*s],v=[5029.0966*s,1.11113*s,-6e-6*s];class D{constructor(t,n){let o=C,r=A,e=v;if(2e3!==t){const n=.01*(t-2e3);o=[base.b.horner(n,...J),-.03302*s+598e-6*s*n,6e-5*s],r=[base.b.horner(n,...T),-869.8089*s-.50491*s*n,.03536*s],e=[base.b.horner(n,...E),1.11113*s-42e-6*s*n,-6e-6*s]}const c=.01*(n-t);this.π=base.b.horner(c,...r),this.p=base.b.horner(c,...e)*c;const h=base.b.horner(c,...o)*c;this.sη=Math.sin(h),this.cη=Math.cos(h)}precess(t){const[n,o]=base.b.sincos(t.lat),[e,c]=base.b.sincos(this.π-t.lon),h=this.cη*o*e-this.sη*n,l=o*c,M=this.cη*n+this.sη*o*e,f=new r.a(this.p+this.π-Math.atan2(h,l));return M<base.b.CosSmallAngle?f.lat=Math.asin(M):f.lat=Math.acos(Math.hypot(h,l)),f}reduceElements(t){const n=this.π+this.p,[o,r]=base.b.sincos(t.inc),[c,h]=base.b.sincos(t.node-this.π),l=new e;return l.inc=Math.acos(r*this.cη+o*this.sη*h),l.node=Math.atan2(o*c,this.cη*o*h-this.sη*r)+n,l.peri=Math.atan2(-this.sη*c,o*this.cη-r*this.sη*h)+t.peri,l}}function x(t,n,o,e){const h=c.a.meanObliquity(base.b.JulianYearToJDE(o)),[l,M]=base.b.sincos(h),{ra:f,dec:d}=e.toEquatorial(h),[P,I]=base.b.sincos(f),[L,w]=base.b.sincos(d),m=Math.cos(e.lat),y=(n*l*I+t*w*(M*w+l*L*P))/(m*m),J=(n*(M*w+l*L*P)-t*l*I*w)/m;return new r.a(y,J)}n.a={approxAnnualPrecession:l,mn:M,approxPosition:function(t,n,o,e,c){const{ra:h,dec:M}=l(t,n,o),f=o-n,d=new r.b;return d.ra=t.ra+(h+e)*f,d.dec=t.dec+(M+c)*f,d},Precessor:y,position:function(t,n,o,e,c){const p=new y(n,o),h=o-n,l=new r.b;return l.ra=t.ra+e*h,l.dec=t.dec+c*h,p.precess(l)},EclipticPrecessor:D,eclipticPosition:function(t,n,o,r,e){const p=new D(n,o);if(r&&e&&(0!==r.rad()||0!==e.rad())){const{lon:c,lat:h}=x(r.rad(),e.rad(),n,t),l=o-n;t.lon+=c*l,t.lat+=h*l}return p.precess(t)},properMotion:x,properMotion3D:function(t,n,o,e,c,h,l){const[M,f]=base.b.sincos(t.ra),[d,P]=base.b.sincos(t.dec),I=e*P*f,L=e*P*M,w=e*d,m=c/e,y=w*l.rad(),J=o-n,T=I+J*(I*m-y*f-L*h.rad()),E=L+J*(L*m-y*M+I*h.rad()),C=w+J*(w*m+e*l.rad()*P),A=new r.b;return A.ra=Math.atan2(E,T),A.dec=Math.atan2(C,Math.hypot(T,E)),A}}}}]);