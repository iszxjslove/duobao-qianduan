(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[24],{d10b:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("q-page",{staticClass:"q-pa-md"},[a("q-item",{staticClass:"q-mb-md"},[a("q-item-section",[a("q-item-label",[t._v(t._s(t.$t("my_balance")))])],1),a("q-item-section",{staticClass:"text-h5 text-positive",attrs:{side:""}},[t._v("\n      "+t._s(t._f("symbol")(t.userinfo.money))+"\n    ")])],1),a("div",{directives:[{name:"show",rawName:"v-show",value:t.paytypes.length>1,expression:"paytypes.length > 1"}],staticClass:"q-pb-sm"},[t._v("ReCharge Methods")]),a("q-list",{staticClass:"q-mb-md",attrs:{separator:""}},[t._l(t.paytypes,(function(e,n){return a("q-item",{directives:[{name:"ripple",rawName:"v-ripple"},{name:"show",rawName:"v-show",value:t.paytypes.length>1,expression:"paytypes.length > 1"}],key:n,attrs:{tag:"label"}},[a("q-item-section",{attrs:{avatar:""}},[a("q-radio",{attrs:{val:e.id,color:"primary"},model:{value:t.form.account_id,callback:function(e){t.$set(t.form,"account_id",e)},expression:"form.account_id"}})],1),a("q-item-section",[a("q-item-label",[t._v(" "+t._s(e.title)+" ")]),a("q-item-label",{attrs:{caption:""}},[t._v(t._s(e.desc))])],1)],1)})),t.payacc.channel&&"bank"===t.payacc.channel_type?a("q-item",{directives:[{name:"ripple",rawName:"v-ripple"}],attrs:{clickable:""},on:{click:t.selectBank}},[a("q-item-section",[a("q-item-label",[t._v(t._s(t._f("default")(t.bankCard,"Select Bank")))])],1),a("q-item-section",{attrs:{side:""}},[a("q-icon",{attrs:{name:"keyboard_arrow_right"}})],1)],1):t._e()],2),t.payacc.custom_amount?a("q-input",{staticClass:"q-mb-lg",attrs:{outlined:"",placeholder:t.$t("enter_or_select_recharge_amount")},scopedSlots:t._u([{key:"prepend",fn:function(){return[t._v("\n      "+t._s(t.$store.state.common.currency.symbol)+"\n    ")]},proxy:!0}],null,!1,2755205224),model:{value:t.form.amount,callback:function(e){t.$set(t.form,"amount",e)},expression:"form.amount"}}):t._e(),t.payacc.amount_list?a("div",{staticClass:"row q-col-gutter-md q-mb-lg"},t._l(t.splitAmounts(t.payacc.amount_list),(function(e,n){return a("div",{key:n,staticClass:"col-4"},[a("q-btn",{staticClass:"full-width",attrs:{color:t.form.amount===e?"primary":"grey",unelevated:"",label:t._f("symbol")(e,0)},on:{click:function(a){t.form.amount=e}}})],1)})),0):t._e(),a("q-btn",{staticClass:"full-width q-mb-md",attrs:{label:t.$t("recharge"),"no-caps":"",unelevated:"",color:"primary",size:"lg",loading:t.loading.unifiedOrder},on:{click:t.unifiedOrder},scopedSlots:t._u([{key:"loading",fn:function(){return[a("q-spinner-hourglass",{staticClass:"on-left"}),t._v("\n      "+t._s(t.$t("loading"))+"...\n    ")]},proxy:!0}])}),a("q-btn",{staticClass:"full-width q-mb-md",attrs:{label:t.$t("historical_records"),"no-caps":"",unelevated:"",color:"grey",size:"lg",to:"/page/billing"}})],1)},i=[],s=(a("4160"),a("a15b"),a("d81d"),a("ac1f"),a("5319"),a("1276"),a("159b"),a("96cf"),a("c973")),o=a.n(s),r=a("a474"),c=(a("b06b"),a("4328")),l=a.n(c),u={name:"RechargePage",data:function(){return{bankCard:null,bankList:null,paytypes:[],form:{amount:0,account_id:null,bank_id:0}}},methods:{splitAmounts:function(t){return t.split(",").map((function(t){return t.replace(/(^\s*)|(\s*$)/g,"")}))},selectBank:function(){var t=this;Object(r["getBankList"])().then((function(e){var a=[];e.rows.length>0&&e.rows.forEach((function(t){a.push({id:t.id,label:t.account_number,icon:"credit_card"})})),a.push({}),a.push({id:0,label:"Add bank"}),t.$q.bottomSheet({message:"Select Bank",actions:a}).onOk((function(e){t.form.bank_id=e.id,e.id?t.bankCard=e.label:t.$router.push("/page/bank")}))}))},unifiedOrder:function(){var t=this;return this.payacc.channel.min_amount&&this.form.amount<this.payacc.channel.min_amount?(this.$q.notify({type:"negative",message:"Minimum amount "+this.payacc.channel.min_amount}),!1):this.payacc.channel.max_amount&&this.form.amount>this.payacc.channel.max_amount?(this.$q.notify({type:"negative",message:"Maximum amount "+this.payacc.channel.max_amount}),!1):"bank"!==this.payacc.channel_type||this.form.bank_id?void Object(r["unifiedOrder"])(this.form).then(function(){var e=o()(regeneratorRuntime.mark((function e(a){var n,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!a||!a.payurl){e.next=9;break}return e.next=3,t.$store.dispatch("member/getToken");case 3:n=e.sent,i={token:n},t.$q.loading.show(),window.location.href=[a.payurl,l.a.stringify(i)].join("?"),e.next=10;break;case 9:t.$q.notify({type:"warning",message:"refresh"});case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()):(this.$q.notify({type:"negative",message:"Please select bank card"}),!1)},getPayType:function(){var t=this;Object(r["getPayType"])().then((function(e){console.log(e),t.paytypes=e,e.length>0&&(t.form.account_id=e[0].id,e[0].amount_list&&(t.form.amount=e[0].amount_list.split(",")[0]))}))}},computed:{loading:function(){return this.$store.getters["common/loadings"]},userinfo:function(){return this.$store.state.member.userinfo},payacc:function(){var t=this,e={};return this.paytypes.forEach((function(a){a.id===t.form.account_id&&(e=a)})),e}},mounted:function(){this.getPayType()}},m=u,p=a("2877"),d=a("9989"),f=a("66e5"),h=a("4074"),y=a("0170"),b=a("1c1c"),_=a("3786"),g=a("0016"),v=a("27f9"),q=a("9c40"),k=a("9149"),w=a("714f"),$=a("eebe"),x=a.n($),C=Object(p["a"])(m,n,i,!1,null,null,null);e["default"]=C.exports;x()(C,"components",{QPage:d["a"],QItem:f["a"],QItemSection:h["a"],QItemLabel:y["a"],QList:b["a"],QRadio:_["a"],QIcon:g["a"],QInput:v["a"],QBtn:q["a"],QSpinnerHourglass:k["a"]}),x()(C,"directives",{Ripple:w["a"]})}}]);