"use strict";(self["webpackChunkcallboard"]=self["webpackChunkcallboard"]||[]).push([[654],{4520:function(t,e,a){a.d(e,{Z:function(){return V}});var n=a(3396),r=a(9242);const c={class:"row v-product-list"};function o(t,e,a,o,s,d){const i=(0,n.up)("VProductCard");return(0,n.wg)(),(0,n.iD)("ul",c,[(0,n.Wm)(r.W3,{name:"list"},{default:(0,n.w5)((()=>[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(a.data,(t=>((0,n.wg)(),(0,n.iD)("li",{class:"col v-product-item",key:t._id},[(0,n.Wm)(i,{data:t},null,8,["data"])])))),128))])),_:1})])}var s=a(7139);const d={class:"image"},i={class:"product-card__info"},u={class:"title"},l={class:"description"},p={class:"price"};function m(t,e,a,r,c,o){const m=(0,n.up)("VImage"),v=(0,n.up)("router-link");return(0,n.wg)(),(0,n.j4)(v,{class:"v-product-card",to:"/"+a.data?._id},{default:(0,n.w5)((()=>[(0,n._)("div",d,[(0,n.Wm)(m,{src:a.data?.image||"",alt:a.data?.title,background:"rgb(46, 78, 105, 0.8)"},null,8,["src","alt"])]),(0,n._)("div",i,[(0,n._)("div",u,(0,s.zw)(o.title),1),(0,n._)("div",l,(0,s.zw)(o.description),1),(0,n._)("div",p,(0,s.zw)(a.data?.price)+"$ ",1)])])),_:1},8,["to"])}var v=a(8378),g={name:"VProductCard",props:{data:{type:Object}},components:{VImage:v.Z},computed:{title(){return this.truncateStr(this.data?.title,30)},description(){return this.truncateStr(this.data?.description,50)}},methods:{truncateStr(t,e){return e&&t&&e<t.length?t.slice(0,e+3)+"...":t}}},f=a(89);const _=(0,f.Z)(g,[["render",m],["__scopeId","data-v-09fb23ac"]]);var w=_,h={name:"VProductsList",components:{VProductCard:w},props:{data:{type:Object}},methods:{onBeforeEnter(t){console.log("onBeforeEnter",t),t.style.position="absolute",t.style.opacity=0}}};const b=(0,f.Z)(h,[["render",o],["__scopeId","data-v-336ce360"]]);var V=b},9654:function(t,e,a){a.r(e),a.d(e,{default:function(){return u}});var n=a(3396);const r={class:"v-category-page"};function c(t,e,a,c,o,s){const d=(0,n.up)("VProductsList");return(0,n.wg)(),(0,n.iD)("div",r,[(0,n.Wm)(d,{data:s.announcements},null,8,["data"])])}var o=a(4520),s={name:"VCategoryPage",components:{VProductsList:o.Z},computed:{announcements(){return this.$store.getters["getAnnouncements"]}}},d=a(89);const i=(0,d.Z)(s,[["render",c]]);var u=i}}]);
//# sourceMappingURL=654.7c90083c.js.map