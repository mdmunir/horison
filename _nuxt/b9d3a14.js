(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{278:function(e,t,o){"use strict";o.r(t);var r={props:["value"],data:function(){return{model:Object.assign({alt_subuh:-20,alt_isya:-18,alt_dhuha:4.5,subuh:2,dhuha:2,dzuhur:2,ashar:2,maghrib:2,isya:2,terbit:-2},this.$store.state.prayer),modified:!1}},watch:{value:{deep:!0,handler:function(e){Object.assign(this.model,e)}},model:{deep:!0,handler:function(e){this.modified=!0,this.$emit("modified",this.modified),this.$emit("input",e)}}},methods:{save:function(){this.modified&&(this.$store.commit("prayer/change",this.model),this.modified=!1,this.$emit("modified",this.modified))}}},l=o(16),component=Object(l.a)(r,(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("form",{staticClass:"form-horizontal"},[o("div",{staticClass:"row"},[o("div",{staticClass:"col-sm-6"},[e._v("\n            Koreksi waktu.\n            "),o("div",{staticClass:"form-group row"},[o("label",{staticClass:"col-4 col-form-label",attrs:{for:"subuh"}},[e._v("Subuh")]),e._v(" "),o("div",{staticClass:"col-8"},[o("input",{directives:[{name:"model",rawName:"v-model.number",value:e.model.subuh,expression:"model.subuh",modifiers:{number:!0}}],staticClass:"form-control",attrs:{type:"number",step:"any",id:"subuh",placeholder:"Koreksi subuh"},domProps:{value:e.model.subuh},on:{input:function(t){t.target.composing||e.$set(e.model,"subuh",e._n(t.target.value))},blur:function(t){return e.$forceUpdate()}}})])]),e._v(" "),o("div",{staticClass:"form-group row"},[o("label",{staticClass:"col-4 col-form-label",attrs:{for:"terbit"}},[e._v("Terbit")]),e._v(" "),o("div",{staticClass:"col-8"},[o("input",{directives:[{name:"model",rawName:"v-model.number",value:e.model.terbit,expression:"model.terbit",modifiers:{number:!0}}],staticClass:"form-control",attrs:{type:"number",step:"any",id:"terbit",placeholder:"Koreksi terbit"},domProps:{value:e.model.terbit},on:{input:function(t){t.target.composing||e.$set(e.model,"terbit",e._n(t.target.value))},blur:function(t){return e.$forceUpdate()}}})])]),e._v(" "),o("div",{staticClass:"form-group row"},[o("label",{staticClass:"col-4 col-form-label",attrs:{for:"dhuha"}},[e._v("Dhuha")]),e._v(" "),o("div",{staticClass:"col-8"},[o("input",{directives:[{name:"model",rawName:"v-model.number",value:e.model.dhuha,expression:"model.dhuha",modifiers:{number:!0}}],staticClass:"form-control",attrs:{type:"number",step:"any",id:"dhuha",placeholder:"Koreksi dhuha"},domProps:{value:e.model.dhuha},on:{input:function(t){t.target.composing||e.$set(e.model,"dhuha",e._n(t.target.value))},blur:function(t){return e.$forceUpdate()}}})])]),e._v(" "),o("div",{staticClass:"form-group row"},[o("label",{staticClass:"col-4 col-form-label",attrs:{for:"dzuhur"}},[e._v("Dzuhur")]),e._v(" "),o("div",{staticClass:"col-8"},[o("input",{directives:[{name:"model",rawName:"v-model.number",value:e.model.dzuhur,expression:"model.dzuhur",modifiers:{number:!0}}],staticClass:"form-control",attrs:{type:"number",step:"any",id:"dzuhur",placeholder:"Koreksi dzuhur"},domProps:{value:e.model.dzuhur},on:{input:function(t){t.target.composing||e.$set(e.model,"dzuhur",e._n(t.target.value))},blur:function(t){return e.$forceUpdate()}}})])]),e._v(" "),o("div",{staticClass:"form-group row"},[o("label",{staticClass:"col-4 col-form-label",attrs:{for:"ashar"}},[e._v("Ashar")]),e._v(" "),o("div",{staticClass:"col-8"},[o("input",{directives:[{name:"model",rawName:"v-model.number",value:e.model.ashar,expression:"model.ashar",modifiers:{number:!0}}],staticClass:"form-control",attrs:{type:"number",step:"any",id:"ashar",placeholder:"Koreksi ashar"},domProps:{value:e.model.ashar},on:{input:function(t){t.target.composing||e.$set(e.model,"ashar",e._n(t.target.value))},blur:function(t){return e.$forceUpdate()}}})])]),e._v(" "),o("div",{staticClass:"form-group row"},[o("label",{staticClass:"col-4 col-form-label",attrs:{for:"maghrib"}},[e._v("Maghrib")]),e._v(" "),o("div",{staticClass:"col-8"},[o("input",{directives:[{name:"model",rawName:"v-model.number",value:e.model.maghrib,expression:"model.maghrib",modifiers:{number:!0}}],staticClass:"form-control",attrs:{type:"number",step:"any",id:"maghrib",placeholder:"Koreksi maghrib"},domProps:{value:e.model.maghrib},on:{input:function(t){t.target.composing||e.$set(e.model,"maghrib",e._n(t.target.value))},blur:function(t){return e.$forceUpdate()}}})])]),e._v(" "),o("div",{staticClass:"form-group row"},[o("label",{staticClass:"col-4 col-form-label",attrs:{for:"isya"}},[e._v("Isya")]),e._v(" "),o("div",{staticClass:"col-8"},[o("input",{directives:[{name:"model",rawName:"v-model.number",value:e.model.isya,expression:"model.isya",modifiers:{number:!0}}],staticClass:"form-control",attrs:{type:"number",step:"any",id:"isya",placeholder:"Koreksi isya"},domProps:{value:e.model.isya},on:{input:function(t){t.target.composing||e.$set(e.model,"isya",e._n(t.target.value))},blur:function(t){return e.$forceUpdate()}}})])])]),e._v(" "),o("div",{staticClass:"col-sm-6"},[e._v("\n            Altitude matahari.\n            "),o("div",{staticClass:"form-group row"},[o("label",{staticClass:"col-4 col-form-label",attrs:{for:"alt_subuh"}},[e._v("Altitude Subuh")]),e._v(" "),o("div",{staticClass:"col-8"},[o("input",{directives:[{name:"model",rawName:"v-model.number",value:e.model.alt_subuh,expression:"model.alt_subuh",modifiers:{number:!0}}],staticClass:"form-control",attrs:{type:"number",step:"any",id:"alt_subuh",placeholder:"Altitude subuh"},domProps:{value:e.model.alt_subuh},on:{input:function(t){t.target.composing||e.$set(e.model,"alt_subuh",e._n(t.target.value))},blur:function(t){return e.$forceUpdate()}}})])]),e._v(" "),o("div",{staticClass:"form-group row"},[o("label",{staticClass:"col-4 col-form-label",attrs:{for:"alt_isya"}},[e._v("Altitude isya")]),e._v(" "),o("div",{staticClass:"col-8"},[o("input",{directives:[{name:"model",rawName:"v-model.number",value:e.model.alt_isya,expression:"model.alt_isya",modifiers:{number:!0}}],staticClass:"form-control",attrs:{type:"number",step:"any",id:"alt_isya",placeholder:"Altitude isya"},domProps:{value:e.model.alt_isya},on:{input:function(t){t.target.composing||e.$set(e.model,"alt_isya",e._n(t.target.value))},blur:function(t){return e.$forceUpdate()}}})])]),e._v(" "),o("div",{staticClass:"form-group row"},[o("label",{staticClass:"col-4 col-form-label",attrs:{for:"alt_dhuha"}},[e._v("Altitude dhuha")]),e._v(" "),o("div",{staticClass:"col-8"},[o("input",{directives:[{name:"model",rawName:"v-model.number",value:e.model.alt_dhuha,expression:"model.alt_dhuha",modifiers:{number:!0}}],staticClass:"form-control",attrs:{type:"number",step:"any",id:"alt_dhuha",placeholder:"Altitude dhuha"},domProps:{value:e.model.alt_dhuha},on:{input:function(t){t.target.composing||e.$set(e.model,"alt_dhuha",e._n(t.target.value))},blur:function(t){return e.$forceUpdate()}}})])])])])])}),[],!1,null,null,null);t.default=component.exports}}]);