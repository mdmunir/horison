(window.webpackJsonp=window.webpackJsonp||[]).push([[27,11],{497:function(t,e,n){"use strict";n.d(e,"a",(function(){return l}));var o=n(13),r=(n(42),n(508),n(12),n(509),n(510),n(511),n(512),n(513),n(515),n(516),n(517),n(518),n(519),n(520),n(521),n(522),n(523),n(524),n(525),n(526),n(527),n(528),n(529),n(530),n(531),n(532),n(533),n(534),n(90),n(535).GifWriter);function l(element,t){var e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},n=e.duration||10,l=e.fps||30,c=e.depth||25,f=n*l,canvas=document.createElement("canvas");canvas.width=element.width,canvas.height=element.height;var d=canvas.getContext("2d"),m=new Uint8Array(canvas.width*canvas.height*f*5),v=new Uint8Array(canvas.width*canvas.height),h=new r(m,canvas.width,canvas.height,{loop:0}),y=0;return new Promise(function(){var e=Object(o.a)(regeneratorRuntime.mark((function e(o){var data,r,w,x,_,C,g,b,P,k,M,L,S;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!1!==t(y/f)){e.next=3;break}return o(m.subarray(0,h.end())),e.abrupt("return");case 3:for(d.drawImage(element,0,0),data=d.getImageData(0,0,canvas.width,canvas.height).data,r=[],w=0,x=0,_=data.length;w<_;w+=4,x++)C=Math.floor(data[w+0]/c)*c,g=Math.floor(data[w+1]/c)*c,b=Math.floor(data[w+2]/c)*c,P=C<<16|g<<8|b<<0,-1===(k=r.indexOf(P))?(v[x]=r.length,r.push(P)):v[x]=k;for(M=1;M<r.length;)M<<=1;if(r.length=M,L=100/l,S={palette:new Uint32Array(r),delay:L},h.addFrame(0,0,canvas.width,canvas.height,v,S),y++,S.callback&&S.callback(y/f),!(y<f)){e.next=20;break}return e.next=18,setTimeout(n,0,o);case 18:e.next=21;break;case 20:o(m.subarray(0,h.end()));case 21:case"end":return e.stop()}}),e)})));function n(t){return e.apply(this,arguments)}return n}())}},498:function(t,e,n){"use strict";e.a="varying vec2 vUv;\nvoid main()\n{\n    vUv = uv;\n    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n    gl_Position = projectionMatrix * mvPosition;\n}"},552:function(t,e,n){var content=n(577);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(44).default)("700d4276",content,!0,{sourceMap:!1})},554:function(t,e,n){"use strict";n.r(e);var o=n(26),r=n(13),l=(n(42),n(351),n(12),n(30),n(90),n(31),n(490),n(153),n(506)),c=n(507),base=n(4),f=n(497),d=n(498),m={props:{type:{type:String,default:"globe"},texture:{type:[String,Object],default:"images/earth_1600.jpg"},uniform:{type:Object,default:function(){return{}}},cameraPos:Object,scale:{type:Number,default:100},control:{type:Boolean,default:!0}},data:function(){var t={globe:new l.j(1,128,64),mer:new l.f(2,2),ae:new l.a(1,64)};this.uniform.txtr={value:(new l.m).load(this.texture)},this.uniform.isAe={value:"ae"==this.type?1:0};var e=new l.i({uniforms:this.uniform,vertexShader:d.a,fragmentShader:"uniform float esq;\nuniform float mu;\nuniform float x;\nuniform float y;\nuniform float cosd;\nuniform float sind;\nuniform float l1;\nuniform float l2;\nuniform float tanf1;\nuniform float tanf2;\nuniform int isAe;\nuniform sampler2D txtr;\nvarying vec2 vUv;\n\nvoid main(void){\n    vec2 position = -1.0 + 2.0 * vUv;\n    float lat = radians(position.y * 90.0);\n    float lng = radians(position.x * 180.0);\n    vec2 pos = vec2(vUv.x, vUv.y);\n    if(isAe == 1){\n        float r = sqrt(position.y*position.y+position.x*position.x);\n        lat = radians(90.0 - 180.0*r);    \n        lng = atan(position.y,position.x);        \n        pos.x = lng / 3.14159 / 2.0 + 0.5;\n        pos.y = 1.0 - r;\n    }\n    \n    float cosLat = cos(lat);\n    float sinLat = sin(lat);\n    float theta = mu + lng;\n    float C = 1.0 / sqrt(1.0 - esq * sinLat * sinLat);\n    float S = (1.0 - esq) * C;\n    float xi = C * cosLat * sin(theta);\n    float eta = S * sinLat * cosd - C * cosLat * sind * cos(theta);\n    float zeta = S * sinLat * sind + C * cosLat * cosd * cos(theta);\n    float u = x - xi;\n    float v = y - eta;\n    float m = sqrt(u * u + v * v);\n    float L1 = l1 - zeta * tanf1;\n    float L2 = l2 - zeta * tanf2;\n    vec3 color = texture2D(txtr, pos).rgb;\n    if (zeta < 0.0){\n        float fac = 0.4;\n        gl_FragColor = vec4(color.x * fac, color.y * fac, color.z * fac, 1.0 );\n    } else if (L2 < 0.0 && m < -L2 && zeta > 0.0){\n        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0 );\n    } else if (L2 > 0.0 && m < L2 && zeta > 0.0){\n        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0 );\n    } else if (m < L1 && zeta > 0.0){\n        float f = 0.7 - 0.0 * (L1 - m) / L1;\n        gl_FragColor = vec4(color.x * f, color.y * f, color.z * f, 1.0 );\n    } else{\n        gl_FragColor = vec4( color.x, color.y, color.z, 1.0 );\n    }\n}"}),data={animated:!0,camera:new l.e(-1.05,1.05,1.05,-1.05,.1,10),controls:null,scene:new l.h,renderer:new l.p,models:t,material:e,mesh:new l.d(t[this.type],e)};return data.camera.position.set(0,0,4),data.renderer.setPixelRatio(window.devicePixelRatio),data.mesh.position.x=0,data.mesh.position.y=0,data.scene.add(data.mesh),data},mounted:function(){var th=this;this.$el.appendChild(this.renderer.domElement),this.animate(),this.resize(),this.$nuxt.$on("pushmenu-click",(function(){th.resize(300)})),window.addEventListener("resize",(function(){th.resize()}));var t=this.controls=new c.a(this.camera,this.$el);t.rotateSpeed=1,t.zoomSpeed=1.2,t.panSpeed=.8,t.enableZoom=!1,t.enablePan=!1,t.staticMoving=!0,t.dynamicDampingFactor=.3,t.keys=[65,83,68],t.autoRotate=!1,t.addEventListener("change",(function(){th.render()})),t.enableRotate=this.control&&"globe"==this.type},methods:{render:function(){this.renderer.render(this.scene,this.camera)},animate:function(){var th=this;requestAnimationFrame((function(){th.animate()})),th.controls&&th.controls.update(),this.animated&&th.render()},doScale:function(t){var e=Math.min(100,Math.max(10,t)),n=Math.floor(this.$el.offsetWidth*e/100),o="mer"==this.type?n/2:n;this.renderer.setSize(n,o)},resize:function(){var time=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,th=this;setTimeout((function(){th.camera.aspect=1,th.camera.updateProjectionMatrix(),th.doScale(th.scale)}),time)},download:function(t){var e=arguments,n=this;return Object(r.a)(regeneratorRuntime.mark((function o(){var r,th,l,c,link;return regeneratorRuntime.wrap((function(o){for(;;)switch(o.prev=o.next){case 0:return r=e.length>1&&void 0!==e[1]?e[1]:{},th=n,n.animated=!1,o.next=5,Object(f.a)(n.renderer.domElement,(function(progress){if(t&&!1===t(progress))return!1;th.render()}),r);case 5:l=o.sent,c=new Blob([l],{type:"image/gif"}),n.animated=!0,(link=document.createElement("a")).href=URL.createObjectURL(c),link.download=r.filename||"solar-eclipse.gif",link.dispatchEvent(new MouseEvent("click"));case 12:case"end":return o.stop()}}),o)})))()}},watch:{cameraPos:{deep:!0,handler:function(t){if("globe"==this.type){var e=t||{},n=Object(base.d)(e.lon||0),r=Object(o.a)(n,2),l=r[0],c=r[1],f=Object(base.d)(e.lat||0),d=Object(o.a)(f,2),m=d[0],v=d[1],h=e.distance||4;this.camera.position.set(h*v*c,h*m,h*v*l),this.controls&&this.controls.update(),this.render()}}},scale:function(t){this.doScale(t),this.render()},type:function(t){this.mesh.geometry=this.models[t],this.uniform.isAe.value="ae"==t?1:0,this.doScale(this.scale),this.controls.enableRotate=this.control&&"globe"==t,"globe"!=t&&this.camera.position.set(0,0,4),this.render()},control:function(t){this.controls.enableRotate=t&&"globe"==this.type,this.render()}}},v=m,h=n(8),component=Object(h.a)(v,(function(){return(0,this._self._c)("div",{staticStyle:{display:"flex","justify-content":"center"}})}),[],!1,null,null,null);e.default=component.exports},576:function(t,e,n){"use strict";n(552)},577:function(t,e,n){var o=n(43)(!1);o.push([t.i,"table.element th{margin-left:5px}",""]),t.exports=o},593:function(t,e,n){"use strict";n.r(e);n(25),n(33),n(12),n(60),n(49);var o=n(13),r=(n(42),n(90),Math.sin),l=Math.cos,c=(Math.tan,Math.PI),f=(Math.abs,{props:{eclipse:Object,info:{type:Object,default:function(){return{type:0,date:null}}}},data:function(){return{uniform:{esq:{value:.006694381},x:{value:0},y:{value:0},sind:{value:0},cosd:{value:0},mu:{value:0},l1:{value:0},l2:{value:0},tanf1:{value:0},tanf2:{value:0}},slider:500,cameraPos:{lat:0,lon:0,distance:4},scale:100,options:{model:"globe",rotation:!0},save:{progress:0,cancel:!1},intervalID:null}},mounted:function(){this.updatePath(this.bessel)},methods:{run:function(){if(this.onPlay)clearInterval(this.intervalID),this.intervalID=null;else{var th=this;this.intervalID=setInterval((function(){th.slider+=1,th.slider>=1e3&&(clearInterval(th.intervalID),th.intervalID=null)}),100)}},updatePath:function(t){var e=this.uniform;e.x.value=t.x,e.y.value=t.y,e.mu.value=t.μ-1.00273790935*this.info.deltaT*(2*c/24/3600),e.sind.value=r(t.d),e.cosd.value=l(t.d),e.l1.value=t.l1,e.l2.value=t.l2,e.tanf1.value=t.tanF1,e.tanf2.value=t.tanF2,this.options.rotation&&(this.cameraPos.lon=t.μ,this.cameraPos.lat=t.d)},simpan:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var th,n,o;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return th=t,n=t.info,n.p1,n.p4,o={duration:30,fps:10,filename:"solar-eclipse-".concat(th.info.date,".gif")},t.save.cancel=!1,t.$refs.popupSave.modal("show"),e.next=7,t.$refs.map.download((function(i){if(th.slider=1e3*i,th.save.progress=Math.floor(100*i),th.save.cancel)return!1}),o);case 7:t.$refs.popupSave.modal("hide");case 8:case"end":return e.stop()}}),e)})))()}},computed:{time:function(){var t=this.info,e=t.p1;return e+(t.p4-e)*this.slider/1e3},sTime:function(){var t=this.info.JDE0+(this.time-this.info.deltaT/3600)/24;return moment(t.toDate()).utc().format("DD MMMM YYYY, hh:mm:ss [UTC]")},bessel:function(){return this.eclipse.calc(this.time)},onPlay:function(){return null!=this.intervalID}},watch:{"options.rotation":function(t){if(t){var e=this.bessel;this.cameraPos.lon=e.μ,this.cameraPos.lat=e.d}},slider:function(){this.updatePath(this.bessel)}}}),d=(n(576),n(8)),component=Object(d.a)(f,(function(){var t=this,e=t._self._c;return e("div",{staticClass:"row"},[e("div",{staticClass:"col-12"},[e("lte-card",{attrs:{title:t.sTime},on:{resize:function(e){return t.$refs.map.resize(300)}},scopedSlots:t._u([{key:"tools",fn:function(){return[e("button",{staticClass:"btn btn-tool",on:{click:t.simpan}},[e("i",{staticClass:"fas fa-save"})])]},proxy:!0}])},[t._v(" "),e("div",{staticClass:"row"},[e("div",{staticClass:"col-12"},[e("button",{staticClass:"btn btn-sm btn-flat",on:{click:t.run}},[e("i",{staticClass:"fas",class:{"fa-play":!t.onPlay,"fa-stop":t.onPlay}})]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model.number",value:t.slider,expression:"slider",modifiers:{number:!0}}],staticStyle:{width:"90%"},attrs:{type:"range",min:"0",max:"1000"},domProps:{value:t.slider},on:{__r:function(e){t.slider=t._n(e.target.value)},blur:function(e){return t.$forceUpdate()}}})]),t._v(" "),e("div",{staticClass:"col-12 col-lg-4"},[e("input",{directives:[{name:"model",rawName:"v-model.number",value:t.scale,expression:"scale",modifiers:{number:!0}}],staticStyle:{width:"100%"},attrs:{type:"range",min:"20",max:"100"},domProps:{value:t.scale},on:{__r:function(e){t.scale=t._n(e.target.value)},blur:function(e){return t.$forceUpdate()}}})]),t._v(" "),e("div",{staticClass:"col-6 col-lg-4"},[e("select",{directives:[{name:"model",rawName:"v-model",value:t.options.model,expression:"options.model"}],staticClass:"form-control",on:{change:function(e){var n=Array.prototype.filter.call(e.target.options,(function(t){return t.selected})).map((function(t){return"_value"in t?t._value:t.value}));t.$set(t.options,"model",e.target.multiple?n:n[0])}}},[e("option",{attrs:{value:"globe"}},[t._v("Globe")]),t._v(" "),e("option",{attrs:{value:"mer"}},[t._v("Mercator")]),t._v(" "),e("option",{attrs:{value:"ae"}},[t._v("AE")])])]),t._v(" "),"globe"==t.options.model?e("div",{staticClass:"col-6 col-lg-4"},[e("div",{staticClass:"form-check"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.options.rotation,expression:"options.rotation"}],staticClass:"form-check-input",attrs:{type:"checkbox",id:"ck_rotation"},domProps:{checked:Array.isArray(t.options.rotation)?t._i(t.options.rotation,null)>-1:t.options.rotation},on:{change:function(e){var n=t.options.rotation,o=e.target,r=!!o.checked;if(Array.isArray(n)){var l=t._i(n,null);o.checked?l<0&&t.$set(t.options,"rotation",n.concat([null])):l>-1&&t.$set(t.options,"rotation",n.slice(0,l).concat(n.slice(l+1)))}else t.$set(t.options,"rotation",r)}}}),t._v(" "),e("label",{staticClass:"form-check-label",attrs:{for:"ck_rotation"}},[t._v("Rotasi")])])]):t._e()]),t._v(" "),e("div",{staticClass:"row"},[e("div",{staticClass:"col-12"},[e("a-se-map",{ref:"map",attrs:{type:t.options.model,scale:t.scale,control:!t.options.rotation,uniform:t.uniform,"camera-pos":t.cameraPos}})],1)])])],1),t._v(" "),e("portal",{attrs:{to:"modals"}},[e("lte-modal",{ref:"popupSave",attrs:{size:"sm","data-backdrop":"static",title:"Download GIF"},on:{hide:function(e){t.save.cancel=!0}}},[e("p",[t._v(t._s(t.save.progress)+"% Complete")]),t._v(" "),e("div",{staticClass:"progress"},[e("div",{staticClass:"progress-bar bg-primary progress-bar-striped",style:{width:t.save.progress+"%"},attrs:{role:"progressbar","aria-valuenow":t.save.progress,"aria-valuemin":"0","aria-valuemax":"100"}},[e("span",{staticClass:"sr-only"},[t._v(t._s(t.save.progress)+"% Complete")])])])])],1)],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{ASeMap:n(554).default,LteCard:n(350).default,LteModal:n(355).default})}}]);