(window.webpackJsonp=window.webpackJsonp||[]).push([[16,7],{406:function(t,e,n){"use strict";n.r(e);var r={props:["title"],computed:{showHeader:function(){return this.$props.title||""===this.$props.title}}},o=n(8),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"content-wrapper"},[t.showHeader?n("div",{staticClass:"content-header"},[n("div",{staticClass:"container-fluid"},[n("div",{staticClass:"row mb-2"},[n("div",{staticClass:"col-sm-6"},[n("h1",{staticClass:"m-0"},[t._v(t._s(t.title))])])])])]):t._e(),t._v(" "),n("section",{staticClass:"content"},[n("div",{staticClass:"container-fluid"},[t._t("default")],2)])])}),[],!1,null,null,null);e.default=component.exports},449:function(t,e,n){"use strict";n.r(e);var r={head:{title:"Setting"},data:function(){return{isModified:{loc:!1,prayer:!1,criteria:!1},location:{},prayer:{},criteria:{}}},methods:{save:function(t){this.$refs[t].save()},btnClass:function(t){return this.isModified[t]?"btn-primary":"btn-default"},changeModified:function(t,e){this.isModified[t]=e}}},o=n(8),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("lte-content",{attrs:{title:"Setting"}},[n("lte-card",{attrs:{title:"Lokasi",buttons:"collapse"},scopedSlots:t._u([{key:"footer",fn:function(){return[n("button",{staticClass:"btn",class:t.btnClass("loc"),attrs:{type:"button"},on:{click:function(e){return t.save("loc")}}},[t._v("Simpan")])]},proxy:!0}])},[n("a-setting-location",{ref:"loc",on:{modified:function(e){return t.changeModified("loc",e)}},model:{value:t.location,callback:function(e){t.location=e},expression:"location"}})],1),t._v(" "),n("lte-card",{attrs:{title:"Waktu Shalat",buttons:"collapse"},scopedSlots:t._u([{key:"footer",fn:function(){return[n("button",{staticClass:"btn",class:t.btnClass("prayer"),attrs:{type:"button"},on:{click:function(e){return t.save("prayer")}}},[t._v("Simpan")])]},proxy:!0}])},[n("a-setting-prayer",{ref:"prayer",on:{modified:function(e){return t.changeModified("prayer",e)}},model:{value:t.prayer,callback:function(e){t.prayer=e},expression:"prayer"}})],1),t._v(" "),n("lte-card",{attrs:{title:"Kriteria Hilal",buttons:"collapse"},scopedSlots:t._u([{key:"footer",fn:function(){return[n("button",{staticClass:"btn",class:t.btnClass("criteria"),attrs:{type:"button"},on:{click:function(e){return t.save("criteria")}}},[t._v("Simpan")])]},proxy:!0}])},[n("a-setting-criteria",{ref:"criteria",on:{modified:function(e){return t.changeModified("criteria",e)}},model:{value:t.criteria,callback:function(e){t.criteria=e},expression:"criteria"}})],1)],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{ASettingLocation:n(345).default,LteCard:n(336).default,ASettingPrayer:n(346).default,ASettingCriteria:n(347).default,LteContent:n(406).default})}}]);