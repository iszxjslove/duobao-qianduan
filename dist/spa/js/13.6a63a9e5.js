(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[13],{"45eb":function(e,t,a){"use strict";a.r(t);var o=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-layout",{attrs:{view:"hHh lpR fFf"}},[a("q-header",{staticClass:"bg-grey-3 text-black",attrs:{bordered:""}},[a("q-toolbar",[a("q-btn",{directives:[{name:"go-back",rawName:"v-go-back.single",modifiers:{single:!0}}],attrs:{flat:"",round:"",dense:"",icon:"keyboard_arrow_left"}}),a("q-toolbar-title",[e._v("\n        "+e._s(e.$t(e.$route.meta.title))+"\n      ")])],1)],1),a("q-page-container",[a("router-view")],1)],1)},n=[],r={name:"MainLayout",preFetch:function(e){var t=e.store;t.commit("member/autoToken"),t.commit("member/setUserinfo")},data:function(){return{tab:"mails"}},computed:{isLogin:function(){return this.$q.sessionStorage.getItem(this.$config.key("auth"))}}},i=r,s=a("2877"),c=a("4d5a"),l=a("e359"),u=a("65c6"),b=a("9c40"),m=a("6ac5"),d=a("09e3"),f=a("2eeb"),g=a("eebe"),p=a.n(g),w=Object(s["a"])(i,o,n,!1,null,null,null);t["default"]=w.exports;p()(w,"components",{QLayout:c["a"],QHeader:l["a"],QToolbar:u["a"],QBtn:b["a"],QToolbarTitle:m["a"],QPageContainer:d["a"]}),p()(w,"directives",{GoBack:f["a"]})}}]);