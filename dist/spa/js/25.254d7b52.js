(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[25],{d9e9:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("q-page",[n("q-form",{staticClass:"q-pa-md",on:{submit:e.onSubmit}},[n("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],staticClass:"q-px-none",attrs:{clickable:""},on:{click:e.changeRedType}},[n("q-item-section",[n("q-item-label",[e._v(e._s(e.redPackTypeText))])],1),n("q-item-section",{attrs:{side:""}},[e._v(e._s(e.$t("click_to_change")))]),n("q-item-section",{staticClass:"side-no-padding",attrs:{side:""}},[n("q-icon",{attrs:{name:"keyboard_arrow_right"}})],1)],1),n("q-separator"),n("q-input",{attrs:{type:"text",label:e.$t("total_bonus_in_red_envelope"),clearable:""},model:{value:e.form.total_money,callback:function(t){e.$set(e.form,"total_money",t)},expression:"form.total_money"}}),n("q-input",{attrs:{type:"text",label:e.$t("numbers_of_red_envelope"),clearable:""},model:{value:e.form.number,callback:function(t){e.$set(e.form,"number",t)},expression:"form.number"}}),n("q-btn",{staticClass:"full-width q-mt-lg",attrs:{color:"primary","no-caps":"",label:e.$t("put_in"),size:"lg",unelevated:"",type:"submit",loading:e.loading.login},scopedSlots:e._u([{key:"loading",fn:function(){return[n("q-spinner-hourglass",{staticClass:"on-left"}),e._v("\n        "+e._s(e.$t("loading"))+"...\n      ")]},proxy:!0}])}),n("q-btn",{staticClass:"full-width q-mt-lg",attrs:{unelevated:"",size:"lg",color:"grey",to:"/page/red-envelope-record","no-caps":"",label:e.$t("records")}})],1)],1)},o=[],s={name:"RedEnvelope",data:function(){return{redPackTypes:{fixed:this.$t("fixed_red_envelope"),lucky:this.$t("lucky_red_envelope")},redPackTypeText:this.$t("fixed_red_envelope"),form:{type:"fixed",total_money:"",number:""}}},computed:{loading:function(){return this.$store.getters["common/loadings"]}},methods:{onSubmit:function(){},changeRedType:function(){this.form.type="fixed"===this.form.type?"lucky":"fixed",this.redPackTypeText=this.redPackTypes[this.form.type]}}},i=s,l=n("2877"),r=n("9989"),c=n("0378"),p=n("66e5"),d=n("4074"),m=n("0170"),u=n("0016"),f=n("eb85"),_=n("27f9"),b=n("9c40"),y=n("9149"),g=n("714f"),h=n("eebe"),v=n.n(h),q=Object(l["a"])(i,a,o,!1,null,null,null);t["default"]=q.exports;v()(q,"components",{QPage:r["a"],QForm:c["a"],QItem:p["a"],QItemSection:d["a"],QItemLabel:m["a"],QIcon:u["a"],QSeparator:f["a"],QInput:_["a"],QBtn:b["a"],QSpinnerHourglass:y["a"]}),v()(q,"directives",{Ripple:g["a"]})}}]);