"use strict";(self["webpackChunkcallboard"]=self["webpackChunkcallboard"]||[]).push([[128],{5128:function(e,a,n){n.r(a),n.d(a,{default:function(){return C}});var t=n(3396);const l={class:"row v-announcement-page"};function i(e,a,n,i,o,r){const s=(0,t.up)("VAnnouncementForm");return(0,t.wg)(),(0,t.iD)("div",l,[(0,t.Wm)(s)])}var o=n(9242);const r=e=>((0,t.dD)("data-v-717ea993"),e=e(),(0,t.Cn)(),e),s=r((()=>(0,t._)("div",{class:"title"}," Add new post ",-1))),c={class:"announcement-form__image-preview"},m={class:"image-wrapper"},u={class:"announcement-form__fields"},d={class:"announcement-form__label"},p={class:"image-loader"},f={class:"announcement-form__label"},_=["disabled"],g={class:"announcement-form__label"},b=["disabled"],h={class:"announcement-form__label"},D={class:"announcement-form__label"},v=["disabled"];function w(e,a,n,l,i,r){const w=(0,t.up)("VImage");return(0,t.wg)(),(0,t.iD)("form",{class:"v-announcement-form",onSubmit:a[5]||(a[5]=(0,o.iM)(((...e)=>r.onSubmit&&r.onSubmit(...e)),["prevent","stop"]))},[s,(0,t._)("div",c,[(0,t._)("div",m,[(0,t.Wm)(w,{src:i.fileImage||i.uploadImage,background:"rgb(46, 78, 105, 0.8)",alt:"preview"},null,8,["src"])])]),(0,t._)("div",u,[(0,t._)("label",d,[(0,t.wy)((0,t._)("input",{placeholder:"title *",type:"text",class:"announcement-form__input","onUpdate:modelValue":a[0]||(a[0]=e=>i.formData.title=e)},null,512),[[o.nr,i.formData.title]])]),(0,t._)("div",p,[(0,t._)("label",f,[(0,t._)("input",{placeholder:"image",type:"text",class:"announcement-form__input",disabled:r.isFile,onBlur:a[1]||(a[1]=(...e)=>r.onBlur&&r.onBlur(...e))},null,40,_)]),(0,t._)("label",g,[(0,t._)("input",{placeholder:"image",type:"file",accept:"image/png, image/jpeg",class:"announcement-form__input",disabled:r.isLink,onChange:a[2]||(a[2]=(...e)=>r.uploadFile&&r.uploadFile(...e))},null,40,b)])]),(0,t._)("label",h,[(0,t.wy)((0,t._)("input",{placeholder:"price",type:"number",class:"announcement-form__input","onUpdate:modelValue":a[3]||(a[3]=e=>i.formData.price=e)},null,512),[[o.nr,i.formData.price]])]),(0,t._)("label",D,[(0,t.wy)((0,t._)("textarea",{placeholder:"description",class:"announcement-form__input","onUpdate:modelValue":a[4]||(a[4]=e=>i.formData.description=e)},null,512),[[o.nr,i.formData.description]])]),(0,t._)("button",{class:"submit",disabled:!r.isValid}," submit ",8,v)])],32)}var I=n(8378),F={name:"VAnnouncementForm",components:{VImage:I.Z},data(){return{formData:{title:"",description:"",price:null},uploadImage:null,fileImage:null}},computed:{isFile(){return!!this.fileImage},isLink(){return!!this.uploadImage},isValid(){return!!this.formData.title?.trim()?.length}},methods:{getFormData(){return{...this.formData,image:this.uploadImage||this.fileImage||null}},async onSubmit(e){if(this.isValid){const a=await this.createAnnouncement();a._id&&(alert("create success"),this.clearFormData(e))}},onBlur(e){this.uploadImage=e.target.value},clearFormData(e){e.target.reset(),this.formData={title:"",description:"",price:null},this.uploadImage="",this.fileImage=""},async createAnnouncement(){return await this.$store.dispatch("createAnnouncement",this.getFormData())},async fileToData(e){if(e)return await new Promise((a=>{const n=new FileReader;n.onloadend=()=>a(n.result),n.readAsDataURL(e)}))},async uploadFile(e){const a=await this.fileToData(e.target.files[0]);this.fileImage=a}}},V=n(89);const y=(0,V.Z)(F,[["render",w],["__scopeId","data-v-717ea993"]]);var A=y,k={name:"VAnnouncementPage",components:{VAnnouncementForm:A}};const B=(0,V.Z)(k,[["render",i]]);var C=B}}]);
//# sourceMappingURL=128.583db77c.js.map