(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{497:function(n,t,e){"use strict";e.d(t,"a",(function(){return l}));var o=e(13),r=(e(42),e(508),e(12),e(509),e(510),e(511),e(512),e(513),e(515),e(516),e(517),e(518),e(519),e(520),e(521),e(522),e(523),e(524),e(525),e(526),e(527),e(528),e(529),e(530),e(531),e(532),e(533),e(534),e(90),e(535).GifWriter);function l(element,n){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},e=t.duration||10,l=t.fps||30,f=t.depth||25,c=e*l,canvas=document.createElement("canvas");canvas.width=element.width,canvas.height=element.height;var d=canvas.getContext("2d"),h=new Uint8Array(canvas.width*canvas.height*c*5),m=new Uint8Array(canvas.width*canvas.height),_=new r(h,canvas.width,canvas.height,{loop:0}),v=0;return new Promise(function(){var t=Object(o.a)(regeneratorRuntime.mark((function t(o){var data,r,x,y,w,L,g,b,S,D,z,C,O;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!1!==n(v/c)){t.next=3;break}return o(h.subarray(0,_.end())),t.abrupt("return");case 3:for(d.drawImage(element,0,0),data=d.getImageData(0,0,canvas.width,canvas.height).data,r=[],x=0,y=0,w=data.length;x<w;x+=4,y++)L=Math.floor(data[x+0]/f)*f,g=Math.floor(data[x+1]/f)*f,b=Math.floor(data[x+2]/f)*f,S=L<<16|g<<8|b<<0,-1===(D=r.indexOf(S))?(m[y]=r.length,r.push(S)):m[y]=D;for(z=1;z<r.length;)z<<=1;if(r.length=z,C=100/l,O={palette:new Uint32Array(r),delay:C},_.addFrame(0,0,canvas.width,canvas.height,m,O),v++,O.callback&&O.callback(v/c),!(v<c)){t.next=20;break}return t.next=18,setTimeout(e,0,o);case 18:t.next=21;break;case 20:o(h.subarray(0,_.end()));case 21:case"end":return t.stop()}}),t)})));function e(n){return t.apply(this,arguments)}return e}())}},498:function(n,t,e){"use strict";t.a="varying vec2 vUv;\nvoid main()\n{\n    vUv = uv;\n    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n    gl_Position = projectionMatrix * mvPosition;\n}"},554:function(n,t,e){"use strict";e.r(t);var o=e(26),r=e(13),l=(e(42),e(351),e(12),e(30),e(90),e(31),e(490),e(153),e(506)),f=e(507),base=e(4),c=e(497),d=e(498),h={props:{type:{type:String,default:"globe"},texture:{type:[String,Object],default:"images/earth_white_1280.png"},uniform:{type:Object,default:function(){return{}}},cameraPos:Object,scale:{type:Number,default:100},control:{type:Boolean,default:!0},path:{type:Boolean,default:!0}},data:function(){var n={globe:new l.j(1,128,64),mer:new l.f(2,2),ae:new l.a(1,64)};this.uniform.txtr={value:(new l.m).load(this.texture)},this.uniform.isAe={value:"ae"==this.type?1:0},this.uniform.isPath={value:this.path?1:0};var t=new l.i({uniforms:this.uniform,vertexShader:d.a,fragmentShader:"const float THRESHOLD = 0.0015;\nconst float THRESHOLD2 = 0.0025;\n\nuniform float esq;\nuniform float mu;\nuniform float x;\nuniform float y;\nuniform float cosd;\nuniform float sind;\nuniform float l1;\nuniform float l2;\nuniform float tanf1;\nuniform float tanf2;\nuniform float deltaTMu;\nuniform int isAe;\nuniform int isPath;\n\nuniform float X[4];\nuniform float Y[4];\nuniform float D[4];\nuniform float MU[4];\nuniform float L1[4];\nuniform float L2[4];\nuniform float DX[4];\nuniform float DY[4];\nuniform float DD[4];\nuniform float DMU[4];\n//uniform float DL1[4];\n//uniform float DL2[4];\nuniform sampler2D txtr;\nvarying vec2 vUv;\n\nfloat horner(float t, float series[4]){\n    int i = 3;\n    float result = series[i];\n    while(i > 0){\n        i--;\n        result = result*t + series[i];\n    }\n    return result;\n}\n\nvoid main(void){\n    vec2 position = -1.0 + 2.0 * vUv;\n    float lat = radians(position.y * 90.0);\n    float lon = radians(position.x * 180.0);\n    vec2 pos = vec2(vUv.x, vUv.y);\n    if(isAe == 1){\n        float r = sqrt(position.y*position.y+position.x*position.x);\n        lat = radians(90.0 - 180.0*r);    \n        lon = atan(position.y,position.x);        \n        pos.x = lon / 3.14159 / 2.0 + 0.5;\n        pos.y = 1.0 - r;\n    }\n\n    vec3 color = texture2D(txtr, pos).rgb;\n    float cosLat = cos(lat);\n    float sinLat = sin(lat);\n    float C = 1.0 / sqrt(1.0 - esq * sinLat * sinLat);\n    float S = (1.0 - esq) * C;\n    float tmp = atan(0.99664719 * tan(lat));\n    float rhoS = 0.99664719*sin(tmp);\n    float rhoC = cos(tmp);\n\n    int pathFound = 0;\n    if(isPath == 1){\n        float t = 0.0;\n        float dt = 0.0;\n        float _x;\n        float _y;\n        float _d;\n        float _mu;\n        float _dx;\n        float _dy;\n        float _dd;\n        float _dmu;\n        float _cosd;\n        float _sind;\n        float _h;\n        float _sinh;\n        float _cosh;\n        float _xi;\n        float _eta;\n        float _zeta;\n        float _dxi;\n        float _deta;\n        float _u;\n        float _v;\n        float _a;\n        float _b;\n        float _n2;\n\n        int mid = 0;\n        for(int it=0; it < 15; it++){\n            _x = horner(t, X);\n            _y = horner(t, Y);\n            _d = horner(t, D);\n            _mu = horner(t, MU);\n            _dx = horner(t, DX);\n            _dy = horner(t, DY);\n            _dd = horner(t, DD);\n            _dmu = horner(t, DMU);\n            //_dl1 = horner(t, DL1);\n            //_dl2 = horner(t, DL2);\n            _cosd = cos(_d);\n            _sind = sin(_d);\n\n            _h = _mu + lon - deltaTMu;\n            _sinh = sin(_h);\n            _cosh = cos(_h);\n\n            //_xi = rhoC * _sinh;\n            //_eta = rhoS * _cosd - rhoC * _cosh * _sind;\n            //_zeta = rhoS * _sind + rhoC * _cosh * _cosd;\n            _xi = C * cosLat * sin(_h);\n            _eta = S * sinLat * _cosd - C * cosLat * _sind * cos(_h);\n            _zeta = S * sinLat * _sind + C * cosLat * _cosd * cos(_h);\n\n            _dxi = _dmu * rhoC * _cosh;\n            _deta = _dmu * _xi * _sind - _zeta * _dd;\n            _u = _x - _xi;\n            _v = _y - _eta;\n            _a = _dx - _dxi;\n            _b = _dy - _deta;\n            _n2 = _a*_a + _b*_b;\n\n            dt = (_u*_a + _v*_b) / _n2;\n            t -= dt;\n            if(dt > -0.00001 && dt < 0.00001){\n                mid = 1;\n                break;\n            }\n        }\n        if(mid == 1 && _zeta >= 0.0){\n            float _m = sqrt(_u * _u + _v * _v);\n            float _l1 = horner(t, L1) - _zeta * tanf1;\n            float _l2 = horner(t, L2) - _zeta * tanf2;\n            //penumbra\n            if((_m - _l1) < THRESHOLD && (_m - _l1) > -THRESHOLD2){\n                gl_FragColor = vec4(0.0, 0.0, 0.8, 1.0 );\n                pathFound = 1;\n            }else if(_l2 > 0.0 && (_m - _l2) < THRESHOLD && (_m - _l2) > -THRESHOLD2){ // cincin\n                gl_FragColor = vec4(0.8, 0.0, 0.0, 1.0 );\n                pathFound = 1;\n            }else if(_l2 < 0.0 && (_m + _l2) < THRESHOLD && (_m + _l2) > -THRESHOLD2){ // total\n                gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0 );\n                pathFound = 1;\n            }\n        }\n    }\n    \n    if(pathFound == 0){\n        float theta = mu + lon;\n        float xi = C * cosLat * sin(theta);\n        float eta = S * sinLat * cosd - C * cosLat * sind * cos(theta);\n        float zeta = S * sinLat * sind + C * cosLat * cosd * cos(theta);\n        float u = x - xi;\n        float v = y - eta;\n        float m = sqrt(u * u + v * v);\n        float L1 = l1 - zeta * tanf1;\n        float L2 = l2 - zeta * tanf2;\n        if (zeta < 0.0){\n            float fac = 0.4;\n            gl_FragColor = vec4(color.x * fac, color.y * fac, color.z * fac, 1.0 );\n        } else if (L2 < 0.0 && m < -L2 && zeta > 0.0){\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0 );\n        } else if (L2 > 0.0 && m < L2 && zeta > 0.0){\n            gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0 );\n        } else if (m < L1 && zeta > 0.0){\n            float f = 0.7 - 0.0 * (L1 - m) / L1;\n            gl_FragColor = vec4(color.x * f, color.y * f, color.z * f, 1.0 );\n        } else{\n            gl_FragColor = vec4( color.x, color.y, color.z, 1.0 );\n        }\n    }\n}"}),data={animated:!0,camera:new l.e(-1.05,1.05,1.05,-1.05,.1,10),controls:null,scene:new l.h,renderer:new l.p,models:n,material:t,mesh:new l.d(n[this.type],t)};return data.camera.position.set(0,0,4),data.renderer.setPixelRatio(window.devicePixelRatio),data.mesh.position.x=0,data.mesh.position.y=0,data.scene.add(data.mesh),data},mounted:function(){var th=this;this.$el.appendChild(this.renderer.domElement),this.animate(),this.resize(),this.$nuxt.$on("pushmenu-click",(function(){th.resize(300)})),window.addEventListener("resize",(function(){th.resize()}));var n=this.controls=new f.a(this.camera,this.$el);n.rotateSpeed=1,n.zoomSpeed=1.2,n.panSpeed=.8,n.enableZoom=!1,n.enablePan=!1,n.staticMoving=!0,n.dynamicDampingFactor=.3,n.keys=[65,83,68],n.autoRotate=!1,n.addEventListener("change",(function(){th.render()})),n.enableRotate=this.control&&"globe"==this.type},methods:{render:function(){this.renderer.render(this.scene,this.camera)},animate:function(){var th=this;requestAnimationFrame((function(){th.animate()})),th.controls&&th.controls.update(),this.animated&&th.render()},doScale:function(n){var t=Math.min(100,Math.max(10,n)),e=Math.floor(this.$el.offsetWidth*t/100),o="mer"==this.type?e/2:e;this.renderer.setSize(e,o)},resize:function(){var time=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,th=this;setTimeout((function(){th.camera.aspect=1,th.camera.updateProjectionMatrix(),th.doScale(th.scale)}),time)},download:function(n){var t=arguments,e=this;return Object(r.a)(regeneratorRuntime.mark((function o(){var r,th,l,f,link;return regeneratorRuntime.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return r=t.length>1&&void 0!==t[1]?t[1]:{},th=e,e.animated=!1,o.next=5,Object(c.a)(e.renderer.domElement,(function(progress){if(n&&!1===n(progress))return!1;th.render()}),r);case 5:l=o.sent,f=new Blob([l],{type:"image/gif"}),e.animated=!0,(link=document.createElement("a")).href=URL.createObjectURL(f),link.download=r.filename||"solar-eclipse.gif",link.dispatchEvent(new MouseEvent("click"));case 12:case"end":return o.stop()}}),o)})))()}},watch:{cameraPos:{deep:!0,handler:function(n){if("globe"==this.type){var t=n||{},e=Object(base.e)(t.lon||0),r=Object(o.a)(e,2),l=r[0],f=r[1],c=Object(base.e)(t.lat||0),d=Object(o.a)(c,2),h=d[0],m=d[1],_=t.distance||4;this.camera.position.set(_*m*f,_*h,_*m*l),this.controls&&this.controls.update(),this.render()}}},scale:function(n){this.doScale(n),this.render()},type:function(n){this.mesh.geometry=this.models[n],this.uniform.isAe.value="ae"==n?1:0,this.doScale(this.scale),this.controls.enableRotate=this.control&&"globe"==n,"globe"!=n&&this.camera.position.set(0,0,4),this.render()},path:function(n){this.uniform.isPath.value=n?1:0,this.render()},control:function(n){this.controls.enableRotate=n&&"globe"==this.type,this.render()}}},m=h,_=e(8),component=Object(_.a)(m,(function(){return(0,this._self._c)("div",{staticStyle:{display:"flex","justify-content":"center"}})}),[],!1,null,null,null);t.default=component.exports}}]);