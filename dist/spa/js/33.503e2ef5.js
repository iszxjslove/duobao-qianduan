(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[33],{"3d0f":function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("q-page",[n("infinite-scroll",{attrs:{api:t.listApi,columns:t.columns},scopedSlots:t._u([{key:"body-cell-colors",fn:function(e){return[n("div",t._l(e.value.split(","),(function(e,i){return n("q-icon",{key:i,attrs:{name:"lens",color:t.$config.options.colors[e]}})})),1)]}}])})],1)},l=[],o=n("a474"),s=n("bd4c"),r={name:"BillingPage",data:function(){return{listApi:o["issues"],columns:[{field:"issue",title:this.$t("period"),align:"left"},{field:"code",title:this.$t("price"),align:"center"},{field:"last_digits",title:this.$t("number"),align:"center"},{field:"colors",title:this.$t("result"),align:"right"}]}},methods:{formatMoney:function(t){return t>0?"+"+t:t},formatMoneyClass:function(t){return t>0?"text-positive":"text-negative"},formatDate:function(t){return s["a"].formatDate(t,"MM-DD HH:mm")}}},a=r,c=n("2877"),u=n("9989"),f=n("0016"),d=n("eebe"),p=n.n(d),m=Object(c["a"])(a,i,l,!1,null,null,null);e["default"]=m.exports;p()(m,"components",{QPage:u["a"],QIcon:f["a"]})}}]);