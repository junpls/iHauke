<template>
  <div class="page">
    <div class="page-title">
      iHauke
    </div>
    <div class="banner"
         :style="{ 'background-image': 'url(' + imgSrc + ')' }">
    </div>
    <div style="width:100%; margin:0px;">
      Jan bekommt noch <b>10mio€</b><br>
      <a class="button is-primary is-large" @click="isDebtModalActive = true">Anschreiben</a>
      <a class="button is-primary is-outlined is-large">Begleichen</a>
    </div>
    
    <b-modal :active.sync="isDebtModalActive"
             has-modal-card>
      <debt-modal></debt-modal>
    </b-modal>
  </div>
</template>

<script>
 import DebtModal from '@/components/DebtModal'
 import Banners from '@/banners'
 
 export default {
   name: 'page',
   components: {
     DebtModal
   },
   data () {
     return {
       isDebtModalActive: false,
       imgSrc: '/static/banners/' + Banners[Math.floor(Math.random() * Banners.length)]
     }
   }
 }

</script>

<style lang="scss">
 @import "./../_style.scss";

 .page {
   height: 100vh;
   background-color: white;
   font-size: 4vh;
 }

 .button {
   margin-bottom: 5px;
 }
 
 .enter {
   width: 100%;
 }

 .page-title {
   width: 100%;
   height: 17vh;
   line-height: 17vh;
   font-size: 12vh;
   font-weight: bold;
 }

 .banner {
   width:100%;
   height:40vh;
   margin-bottom: 3vh;
   background-size: cover;
   background-position: center;
 }
</style>
