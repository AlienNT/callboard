"use strict";(self["webpackChunkcallboard"]=self["webpackChunkcallboard"]||[]).push([[723],{4520:function(t,e,a){a.d(e,{Z:function(){return b}});var s=a(3396),r=a(9242);const n={class:"row v-product-list"};function o(t,e,a,o,c,i){const d=(0,s.up)("VProductCard");return(0,s.wg)(),(0,s.iD)("ul",n,[(0,s.Wm)(r.W3,{name:"list"},{default:(0,s.w5)((()=>[((0,s.wg)(!0),(0,s.iD)(s.HY,null,(0,s.Ko)(a.data,(t=>((0,s.wg)(),(0,s.iD)("li",{class:"col v-product-item",key:t._id},[(0,s.Wm)(d,{data:t},null,8,["data"])])))),128))])),_:1})])}var c=a(7139);const i={class:"image"},d={class:"product-card__info"},u={class:"title"},l={class:"description"},h={class:"price"};function f(t,e,a,r,n,o){const f=(0,s.up)("VImage"),p=(0,s.up)("router-link");return(0,s.wg)(),(0,s.j4)(p,{class:"v-product-card",to:"/"+a.data?._id},{default:(0,s.w5)((()=>[(0,s._)("div",i,[(0,s.Wm)(f,{src:a.data?.image||"",alt:a.data?.title,background:"rgb(46, 78, 105, 0.8)"},null,8,["src","alt"])]),(0,s._)("div",d,[(0,s._)("div",u,(0,c.zw)(o.title),1),(0,s._)("div",l,(0,c.zw)(o.description),1),(0,s._)("div",h,(0,c.zw)(a.data?.price)+"$ ",1)])])),_:1},8,["to"])}var p=a(8378),m={name:"VProductCard",props:{data:{type:Object}},components:{VImage:p.Z},computed:{title(){return this.truncateStr(this.data?.title,30)},description(){return this.truncateStr(this.data?.description,50)}},methods:{truncateStr(t,e){return e&&t&&e<t.length?t.slice(0,e+3)+"...":t}}},_=a(89);const v=(0,_.Z)(m,[["render",f],["__scopeId","data-v-09fb23ac"]]);var g=v,w={name:"VProductsList",components:{VProductCard:g},props:{data:{type:Object}},methods:{onBeforeEnter(t){console.log("onBeforeEnter",t),t.style.position="absolute",t.style.opacity=0}}};const I=(0,_.Z)(w,[["render",o],["__scopeId","data-v-336ce360"]]);var b=I},3723:function(t,e,a){a.r(e),a.d(e,{default:function(){return A}});var s=a(3396),r=a(7139);const n=t=>((0,s.dD)("data-v-c0db94be"),t=t(),(0,s.Cn)(),t),o={class:"row v-category-page"},c={class:"col user-info"},i=n((()=>(0,s._)("div",{class:"title"},"user info",-1))),d={key:0,class:"user-field"},u=n((()=>(0,s._)("span",{class:"user-info__label"},"name:",-1))),l={key:1,class:"user-field"},h=n((()=>(0,s._)("span",{class:"user-info__label"},"email:",-1))),f=["href"],p={key:2,class:"user-field"},m=n((()=>(0,s._)("span",{class:"user-info__label"},"phone:",-1))),_=["href"],v={key:3,class:"user-field"},g=n((()=>(0,s._)("span",{class:"user-info__label"},"registration date:",-1))),w={key:4,class:"user-field"},I=n((()=>(0,s._)("span",{class:"user-info__label"},"posts:",-1))),b={class:"col product-list"};function k(t,e,a,n,k,D){const y=(0,s.up)("VProductsList");return(0,s.wg)(),(0,s.iD)("div",o,[(0,s._)("div",c,[i,k.authorInfo?.name?((0,s.wg)(),(0,s.iD)("div",d,[u,(0,s._)("span",null,(0,r.zw)(k.authorInfo?.name),1)])):(0,s.kq)("",!0),k.authorInfo?.email?((0,s.wg)(),(0,s.iD)("div",l,[h,(0,s._)("a",{href:`mailto:${k.authorInfo?.email}`},(0,r.zw)(k.authorInfo?.email),9,f)])):(0,s.kq)("",!0),k.authorInfo?.phone?((0,s.wg)(),(0,s.iD)("div",p,[m,(0,s._)("a",{href:`tel:${k.authorInfo?.phone}`},(0,r.zw)(k.authorInfo?.phone),9,_)])):(0,s.kq)("",!0),D.date?((0,s.wg)(),(0,s.iD)("div",v,[g,(0,s.Uk)(" "+(0,r.zw)(D.date),1)])):(0,s.kq)("",!0),D.userAnnouncements?.length?((0,s.wg)(),(0,s.iD)("div",w,[I,(0,s.Uk)(" "+(0,r.zw)(D.userAnnouncements?.length),1)])):(0,s.kq)("",!0)]),(0,s._)("div",b,[(0,s.Wm)(y,{data:D.userAnnouncements},null,8,["data"])])])}var D=a(4520),y=a(4239),V={name:"VUserAnnouncementsPage",components:{VProductsList:D.Z},data(){return{authorInfo:{}}},computed:{authorId(){return this.$route.params.authorId},userAnnouncements(){return this.$store.getters["getAnnouncements"].filter((t=>t?.author?._id===this.authorId))},date(){return this.formattedDate(this.authorInfo?.created_at)}},methods:{formattedDate(t){return new Date(t).toLocaleDateString()},async fetchUser(){const t=await(0,y.c)("get",`/user/${this.authorId}`),{data:e}=t?.data;e&&(this.authorInfo=e)}},watch:{authorId:{handler(t){t&&this.fetchUser()},immediate:!0}}},z=a(89);const P=(0,z.Z)(V,[["render",k],["__scopeId","data-v-c0db94be"]]);var A=P}}]);
//# sourceMappingURL=723.e18f90a7.js.map