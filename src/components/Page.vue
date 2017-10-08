<template>
  <div class="page">
    <div class="page-title">
      iHauke
    </div>
    <div class="banner"
         :style="{ 'background-image': 'url(' + imgSrc + ')' }">
    </div>
    <div class="enter">
      <span :class="{ 'blink-animation': jumping }"v-html="getDebtsString()"></span><br>
      <a class="button is-primary is-large"
         @click="isDebtModalActive = true">Anschreiben</a>
      <a v-if="state.balance !== 0"
         class="button is-primary is-outlined is-large"
         @click="isSettleModalActive = true">Begleichen</a>
    </div>
    
    <b-modal :active.sync="isDebtModalActive"
             has-modal-card>
      <debt-modal :users="state.users.map(this.capitalize)"
                  :submit="submitDebt">
      </debt-modal>
    </b-modal>
    
    <b-modal :active.sync="isSettleModalActive"
             has-modal-card>
      <settle-modal :balance="state.balance"
                    :submit="submitSettle">
      </settle-modal>
    </b-modal>
  </div>
</template>

<script>
 import DebtModal from '@/components/DebtModal'
 import SettleModal from '@/components/SettleModal'
 import Banners from '@/banners'
 import * as Api from '@/api'
 import * as util from '@/util'
 
 export default {
   name: 'page',
   components: {
     DebtModal,
     SettleModal
   },
   props: ['state'],
   data () {
     return {
       isDebtModalActive: false,
       isSettleModalActive: false,
       imgSrc: '/static/banners/' + Banners[Math.floor(Math.random() * Banners.length)],
       jumping: false
     }
   },
   methods: {
     getBorrower () {
       return util.capitalize(this.state.balance > 0 ? this.state.users[0] : this.state.users[1])
     },
     getDebtsString () {
       if (this.state.balance === 0) {
         return 'Ihr seid quit'
       } else {
         return `<b>${this.getBorrower()}</b> bekommt noch <b>${util.toMoney(Math.abs(this.state.balance))}</b>`
       }
     },
     capitalize (str) {
       return util.capitalize(str)
     },
     async submitDebt (person, money, reason) {
       await Api.createDebt(this.state.id, person, money, reason)
       this.jumping = true
       setTimeout(() => {
         this.jumping = false
       }, 3000)
       this.$emit('updateHistory')
     },
     async submitSettle (person, money) {
       await Api.createDebt(this.state.id, person, money, '')
       this.jumping = true
       setTimeout(() => {
         this.jumping = false
       }, 3000)
       this.$emit('updateHistory')
     }
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

 .button {
   margin-bottom: 5px;
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

 .enter {
   width: 100%;
   margin: 0px;
   margin-top: 3vh;
 }

 @keyframes blink {
   0%    {opacity: 0;}
   25%   {opacity: 1;}
   60%   {opacity: 1;}
   80%   {opacity: .5;}
   100%  {opacity: 1;}
 }

 .blink-animation {
   animation-name: blink;
   animation-duration: 1s;
 }
</style>
