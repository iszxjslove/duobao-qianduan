(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[9],{bc13:function(t,e,o){"use strict";o.r(e);var s=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("q-page",{staticClass:"bg-grey-2"},[o("div",{staticClass:"q-mb-md bg-white text-center q-py-md"},[o("div",{staticClass:"text-h6"},[t._v("WELCOME BACK")]),o("div",{staticClass:"text-grey-6 text-caption"},[t._v("Quality Guarantee")])]),o("div",{staticClass:"text-body1 text-center q-pa-md bg-white"},[t._v("RECOMMEND")]),o("q-img",{staticClass:"bg-grey-1",attrs:{src:"shop_img.jpg",ratio:16/9},scopedSlots:t._u([{key:"error",fn:function(){return[o("div",{staticClass:"absolute-full flex flex-center bg-grey-3 text-grey-8 text-body2"},[t._v("\n        Error\n      ")])]},proxy:!0},{key:"loading",fn:function(){return[o("q-spinner-facebook",{attrs:{color:"grey-5",size:"20px"}})]},proxy:!0}])}),o("div",{staticClass:"row items-start row q-col-gutter-md q-pa-md bg-white"},t._l(t.goodsRows,(function(t){return o("div",{key:t.id,staticClass:"col-6"},[o("goods",{attrs:{to:"/goods/details",data:t}})],1)})),0)],1)},a=[],n=o("ff5b"),r=o("a474"),i={name:"HomePage",components:{Goods:n["a"]},data:function(){return{goodsRows:[]}},created:function(){var t=this;Object(r["goodsList"])().then((function(e){t.goodsRows=e.rows}))}},c=i,l=o("2877"),d=o("9989"),u=o("068f"),f=o("e669"),p=o("eebe"),g=o.n(p),m=Object(l["a"])(c,s,a,!1,null,null,null);e["default"]=m.exports;g()(m,"components",{QPage:d["a"],QImg:u["a"],QSpinnerFacebook:f["a"]})},ff5b:function(t,e,o){"use strict";var s=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("q-card",{attrs:{flat:""},on:{click:t.onClick}},[o("q-separator"),o("q-img",{staticClass:"bg-grey-1",attrs:{src:t._f("cdn")(t.data.picture),ratio:1},scopedSlots:t._u([{key:"error",fn:function(){return[o("div",{staticClass:"absolute-full flex flex-center bg-grey-3 text-grey-8 text-body2"},[t._v("\n        Error\n      ")])]},proxy:!0},{key:"loading",fn:function(){return[o("q-spinner-facebook",{attrs:{color:"grey-5",size:"20px"}})]},proxy:!0}])}),o("q-card-section",[o("div",{staticClass:"text-h7"},[t._v(t._s(t.data.title))]),o("div",{staticClass:"text-subtitle2 text-warning"},[t._v("\n      "+t._s(t._f("symbol")(t.data.selling_price))+"\n    ")])])],1)},a=[],n={name:"GoodsComponent",props:{to:{type:[Boolean,String],default:!1},data:{type:[Object],default:function(){return{}}}},computed:{currency:function(){return this.$store.state.common.currency},cdnurl:function(){return this.$store.state.common.cdnurl}},methods:{onClick:function(){this.to&&(this.$store.commit("common/setTmpGoods",this.data),this.$router.push({path:this.to,query:{id:this.data.id}}))}}},r=n,i=o("2877"),c=o("f09f"),l=o("eb85"),d=o("068f"),u=o("e669"),f=o("a370"),p=o("eebe"),g=o.n(p),m=Object(i["a"])(r,s,a,!1,null,null,null);e["a"]=m.exports;g()(m,"components",{QCard:c["a"],QSeparator:l["a"],QImg:d["a"],QSpinnerFacebook:u["a"],QCardSection:f["a"]})}}]);