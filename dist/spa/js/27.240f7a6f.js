(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[27],{"210b":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("q-page",[n("img",{attrs:{src:e.qrcode,width:"100%"}}),n("q-item",{staticClass:"fixed-bottom bg-white"},[n("q-item-section",[n("q-item-label",[e._v(e._s(e.$t("my_invite_link")))])],1),n("q-item-section",{attrs:{side:""}},[n("q-btn",{attrs:{unelevated:"",color:"primary","no-caps":"",label:e.$t("copy")},on:{click:function(t){return e.copyCode(e.shareUrl)}}})],1)],1)],1)},i=[],a=(n("38cf"),n("96cf"),n("c973")),o=n.n(a),c=n("a474"),s=n("d055"),u=n.n(s),l=n("f303"),h=n("cdde"),d=(l["c"].height,l["c"].width,{name:"SharePage",data:function(){return{qrcode:""}},computed:{shareBg:function(){return this.$store.state.member.userinfo.shareBg},userinfo:function(){var e=this.$store.state.member.userinfo;return e.token||this.getUserInfo(),e},shareUrl:function(){var e="hash"===this.$router.mode?"/#":"";return window.location.origin+e+"/register?referrer="+this.userinfo.referrer}},methods:{getUserInfo:function(){var e=this;Object(c["u"])().then((function(t){e.$store.commit("member/setUserinfo",t)}))},copyCode:function(e){var t=this;Object(h["a"])(e).then((function(){t.$toastr.success(t.$t("copy_success",{text:t.$t("code")}))})).catch((function(){t.$toastr.warning(t.$t("copy_error",{text:t.$t("code")}))}))}},mounted:function(){var e=this;return o()(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:n=300,r=new Image,r.src=e.shareBg,r.onload=o()(regeneratorRuntime.mark((function t(){var i,a,o,c,s,l;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return i=r.naturalWidth,a=r.naturalHeight,o=document.createElement("canvas"),o.width=i,o.height=a,c=o.getContext("2d"),c.drawImage(r,0,0,i,a),t.next=9,u.a.toDataURL(e.shareUrl);case 9:s=t.sent,l=new Image,l.src=s,l.onload=function(){c.drawImage(l,(o.width-n)/2,o.height-585,n,n),c.fillStyle="green",c.font="500 16px PingFangSC-Medium",c.fillText("-".repeat(45),82,o.height-280),c.fillStyle="rgba(33,196,71,.2)",c.fillRect((o.width-300)/2,o.height-270,300,50),c.fillStyle="rgba(33,196,71,1)",c.font="500 30px PingFangSC-Medium",c.textAlign="center",c.textBaseline="middle",c.fillText(e.userinfo.referrer,o.width/2,o.height-245),c.fillStyle="rgba(0,0,0,.8)",c.font="500 20px PingFangSC-Medium",c.textAlign="center",c.textBaseline="middle",c.fillText(e.$t("my_invite_code"),o.width/2,o.height-200),e.qrcode=o.toDataURL("image/jpeg",1)};case 13:case"end":return t.stop()}}),t)})));case 4:case"end":return t.stop()}}),t)})))()}}),f=d,m=n("2877"),g=n("9989"),p=n("66e5"),w=n("4074"),b=n("0170"),x=n("9c40"),v=n("eebe"),$=n.n(v),y=Object(m["a"])(f,r,i,!1,null,null,null);t["default"]=y.exports;$()(y,"components",{QPage:g["a"],QItem:p["a"],QItemSection:w["a"],QItemLabel:b["a"],QBtn:x["a"]})}}]);