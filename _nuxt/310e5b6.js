(window.webpackJsonp=window.webpackJsonp||[]).push([[16,7,8,9],{255:function(t,e,o){"use strict";o.r(e);var r={props:["title"],computed:{showHeader:function(){return this.$props.title||""===this.$props.title}}},l=o(16),component=Object(l.a)(r,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"content-wrapper"},[t.showHeader?o("div",{staticClass:"content-header"},[o("div",{staticClass:"container-fluid"},[o("div",{staticClass:"row mb-2"},[o("div",{staticClass:"col-sm-6"},[o("h1",{staticClass:"m-0"},[t._v(t._s(t.title))])])])])]):t._e(),t._v(" "),o("section",{staticClass:"content"},[o("div",{staticClass:"container-fluid"},[t._t("default")],2)])])}),[],!1,null,null,null);e.default=component.exports},258:function(t,e,o){"use strict";o.r(e);o(21),o(136),o(52),o(15),o(51);var r={maximize:"fas fa-expand",collapse:"fas fa-minus",remove:"fas fa-times"},l={props:{type:{type:String,default:"default"},title:String,buttons:String},computed:{showHeader:function(){return this.$props.title||this.$props.buttons||this.$slots.tools},showFooter:function(){return this.$slots.footer},toolButtons:function(){var t=this.$props.buttons;return"string"==typeof t&&(t=t.split(/\s*,\s*/)),t?t.map((function(b){return!!r[b]&&{func:b,icon:r[b]}})).filter((function(t){return t})):[]}}},n=o(16),component=Object(n.a)(l,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{class:["card","card-"+t.type]},[t.showHeader?o("div",{staticClass:"card-header"},[o("h3",{staticClass:"card-title",domProps:{innerHTML:t._s(t.title)}}),t._v(" "),o("div",{staticClass:"card-tools"},[t._l(t.toolButtons,(function(t){return o("button",{staticClass:"btn btn-tool",attrs:{type:"button","data-card-widget":t.func}},[o("i",{class:t.icon})])})),t._v(" "),t._t("tools")],2)]):t._e(),t._v(" "),o("div",{staticClass:"card-body"},[t._t("default")],2),t._v(" "),t.showFooter?o("div",{staticClass:"card-footer"},[t._t("footer")],2):t._e()])}),[],!1,null,null,null);e.default=component.exports},274:function(t,e,o){"use strict";o.r(e);var r={props:["value"],data:function(){return{model:Object.assign({},this.$store.state.prayer),modified:!1}},watch:{value:{deep:!0,handler:function(t){Object.assign(this.model,t)}},model:{deep:!0,handler:function(t){this.modified=!0,this.$emit("modified",this.modified),this.$emit("input",t)}}},methods:{save:function(){this.modified&&(this.$store.commit("prayer/change",this.model),this.modified=!1,this.$emit("modified",this.modified))}}},l=o(16),component=Object(l.a)(r,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("form",{staticClass:"form-horizontal"},[o("div",{staticClass:"row"},[o("div",{staticClass:"col-sm-6"},[t._v("\n            Koreksi waktu.\n            "),o("div",{staticClass:"form-group row"},[o("label",{staticClass:"col-4 col-form-label",attrs:{for:"subuh"}},[t._v("Subuh")]),t._v(" "),o("div",{staticClass:"col-8"},[o("input",{directives:[{name:"model",rawName:"v-model.number",value:t.model.subuh,expression:"model.subuh",modifiers:{number:!0}}],staticClass:"form-control",attrs:{type:"number",step:"any",id:"subuh",placeholder:"Koreksi subuh"},domProps:{value:t.model.subuh},on:{input:function(e){e.target.composing||t.$set(t.model,"subuh",t._n(e.target.value))},blur:function(e){return t.$forceUpdate()}}})])]),t._v(" "),o("div",{staticClass:"form-group row"},[o("label",{staticClass:"col-4 col-form-label",attrs:{for:"terbit"}},[t._v("Terbit")]),t._v(" "),o("div",{staticClass:"col-8"},[o("input",{directives:[{name:"model",rawName:"v-model.number",value:t.model.terbit,expression:"model.terbit",modifiers:{number:!0}}],staticClass:"form-control",attrs:{type:"number",step:"any",id:"terbit",placeholder:"Koreksi terbit"},domProps:{value:t.model.terbit},on:{input:function(e){e.target.composing||t.$set(t.model,"terbit",t._n(e.target.value))},blur:function(e){return t.$forceUpdate()}}})])]),t._v(" "),o("div",{staticClass:"form-group row"},[o("label",{staticClass:"col-4 col-form-label",attrs:{for:"dzuhur"}},[t._v("Dzuhur")]),t._v(" "),o("div",{staticClass:"col-8"},[o("input",{directives:[{name:"model",rawName:"v-model.number",value:t.model.dzuhur,expression:"model.dzuhur",modifiers:{number:!0}}],staticClass:"form-control",attrs:{type:"number",step:"any",id:"dzuhur",placeholder:"Koreksi dzuhur"},domProps:{value:t.model.dzuhur},on:{input:function(e){e.target.composing||t.$set(t.model,"dzuhur",t._n(e.target.value))},blur:function(e){return t.$forceUpdate()}}})])]),t._v(" "),o("div",{staticClass:"form-group row"},[o("label",{staticClass:"col-4 col-form-label",attrs:{for:"ashar"}},[t._v("Ashar")]),t._v(" "),o("div",{staticClass:"col-8"},[o("input",{directives:[{name:"model",rawName:"v-model.number",value:t.model.ashar,expression:"model.ashar",modifiers:{number:!0}}],staticClass:"form-control",attrs:{type:"number",step:"any",id:"ashar",placeholder:"Koreksi ashar"},domProps:{value:t.model.ashar},on:{input:function(e){e.target.composing||t.$set(t.model,"ashar",t._n(e.target.value))},blur:function(e){return t.$forceUpdate()}}})])]),t._v(" "),o("div",{staticClass:"form-group row"},[o("label",{staticClass:"col-4 col-form-label",attrs:{for:"maghrib"}},[t._v("Maghrib")]),t._v(" "),o("div",{staticClass:"col-8"},[o("input",{directives:[{name:"model",rawName:"v-model.number",value:t.model.maghrib,expression:"model.maghrib",modifiers:{number:!0}}],staticClass:"form-control",attrs:{type:"number",step:"any",id:"maghrib",placeholder:"Koreksi maghrib"},domProps:{value:t.model.maghrib},on:{input:function(e){e.target.composing||t.$set(t.model,"maghrib",t._n(e.target.value))},blur:function(e){return t.$forceUpdate()}}})])]),t._v(" "),o("div",{staticClass:"form-group row"},[o("label",{staticClass:"col-4 col-form-label",attrs:{for:"isya"}},[t._v("Isya")]),t._v(" "),o("div",{staticClass:"col-8"},[o("input",{directives:[{name:"model",rawName:"v-model.number",value:t.model.isya,expression:"model.isya",modifiers:{number:!0}}],staticClass:"form-control",attrs:{type:"number",step:"any",id:"isya",placeholder:"Koreksi isya"},domProps:{value:t.model.isya},on:{input:function(e){e.target.composing||t.$set(t.model,"isya",t._n(e.target.value))},blur:function(e){return t.$forceUpdate()}}})])])]),t._v(" "),o("div",{staticClass:"col-sm-6"},[t._v("\n            Altitude matahari.\n            "),o("div",{staticClass:"form-group row"},[o("label",{staticClass:"col-4 col-form-label",attrs:{for:"alt_subuh"}},[t._v("Altitude Subuh")]),t._v(" "),o("div",{staticClass:"col-8"},[o("input",{directives:[{name:"model",rawName:"v-model.number",value:t.model.alt_subuh,expression:"model.alt_subuh",modifiers:{number:!0}}],staticClass:"form-control",attrs:{type:"number",step:"any",id:"alt_subuh",placeholder:"Altitude subuh"},domProps:{value:t.model.alt_subuh},on:{input:function(e){e.target.composing||t.$set(t.model,"alt_subuh",t._n(e.target.value))},blur:function(e){return t.$forceUpdate()}}})])]),t._v(" "),o("div",{staticClass:"form-group row"},[o("label",{staticClass:"col-4 col-form-label",attrs:{for:"alt_isya"}},[t._v("Altitude isya")]),t._v(" "),o("div",{staticClass:"col-8"},[o("input",{directives:[{name:"model",rawName:"v-model.number",value:t.model.alt_isya,expression:"model.alt_isya",modifiers:{number:!0}}],staticClass:"form-control",attrs:{type:"number",step:"any",id:"alt_isya",placeholder:"Altitude isya"},domProps:{value:t.model.alt_isya},on:{input:function(e){e.target.composing||t.$set(t.model,"alt_isya",t._n(e.target.value))},blur:function(e){return t.$forceUpdate()}}})])])])])])}),[],!1,null,null,null);e.default=component.exports},289:function(t,e,o){"use strict";o.r(e);var r={head:{title:"Setting"},data:function(){return{locModified:!1,prayerModified:!1,location:{},prayer:{}}},methods:{saveLoc:function(){this.$refs.loc.save()},savePrayer:function(){this.$refs.prayer.save()}},computed:{locBtnClass:function(){return this.locModified?"btn-primary":"btn-default"},prayerBtnClass:function(){return this.prayerModified?"btn-primary":"btn-default"}}},l=o(16),component=Object(l.a)(r,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("lte-content",{attrs:{title:"Setting"}},[o("lte-card",{attrs:{title:"Lokasi",buttons:"collapse"},scopedSlots:t._u([{key:"footer",fn:function(){return[o("button",{staticClass:"btn",class:t.locBtnClass,attrs:{type:"button"},on:{click:t.saveLoc}},[t._v("Simpan")])]},proxy:!0}])},[o("a-setting-location",{ref:"loc",on:{modified:function(e){t.locModified=e}},model:{value:t.location,callback:function(e){t.location=e},expression:"location"}})],1),t._v(" "),o("lte-card",{attrs:{title:"Waktu Shalat",buttons:"collapse"},scopedSlots:t._u([{key:"footer",fn:function(){return[o("button",{staticClass:"btn",class:t.prayerBtnClass,attrs:{type:"button"},on:{click:t.savePrayer}},[t._v("Simpan")])]},proxy:!0}])},[o("a-setting-prayer",{ref:"prayer",on:{modified:function(e){t.prayerModified=e}},model:{value:t.prayer,callback:function(e){t.prayer=e},expression:"prayer"}})],1)],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{ASettingLocation:o(283).default,LteCard:o(258).default,ASettingPrayer:o(274).default,LteContent:o(255).default})}}]);