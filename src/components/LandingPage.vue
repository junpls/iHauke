<template>
  <div class="page">
    <div class="page-title">
      iHauke
    </div>
    <div class="description">
      Semiprofessionelles Finanzverwaltungssystem für&nbsp;Zweier&nbsp;WGs
    </div>
    <div class="banner"
         :style="{ 'background-image': 'url(' + imgSrc + ')' }">
    </div>
    <div style="height: 20%; margin-top: -20px" class="vcenter">
      <b>Neues Board -> </b>
      <span @click="isCreateModalActive = true">
        <plus  size="20vh"></plus>
      </span>
    </div>
    <b-modal :active.sync="isCreateModalActive"
             has-modal-card>
      <create-modal></create-modal>
    </b-modal>
  </div>
</template>

<script>
 import Banners from '@/banners'
 import Plus from '@/components/lib/Plus'
 import CreateModal from '@/components/CreateModal'
 // import * as util from '@/util'

 export default {
   name: 'landing-page',
   components: {
     Plus,
     CreateModal
   },
   props: ['state'],
   data () {
     return {
       imgSrc: '/static/banners/' + Banners[Math.floor(Math.random() * Banners.length)],
       isCreateModalActive: false
     }
   },
   methods: {
   }
 }

</script>

<style lang="scss">
 @import "./../_style.scss";

 .page {
   background-color: white;
   font-size: $size-4;
   height: 100%;
 }

 .page-title {
   width: 100%;
   height: 17%;
   font-size: 12vh;
   font-weight: bold;
 }

 .banner {
   width: 100%;
   height: 45%;
   background-size: cover;
   background-position: center;
 }

 .description {
   font-size: $size-6;
   padding: 0px 10px;
   margin-bottom: 10px;
 }

 .vcenter {
   display: flex;
   justify-content: center;
   align-items: center;
 }

</style>
