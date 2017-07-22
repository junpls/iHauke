<template>
  <div id="debt-list">
    <div class="debt"
         v-bind:class="{ ldebt: debt.user===0, rdebt: debt.user===1 }"
         v-for="debt in debts">
      <span v-html="getDebtsString(debt.user, debt.gets, debt. reason)"></span>
    </div>
  </div>
</template>

<script>
 import * as util from '@/util'
 
 export default {
   name: 'history',
   props: ['users', 'debts'],
   methods: {
     getDebtsString (user, amount, reason) {
       return `<b>${this.users[user]}</b> bekommt ${util.toMoney(amount)} für ${reason}`
     }
   }
 }

</script>

<style lang="scss">
 @import "./../_style.scss";

 #debt-list {
   padding: 5px 5px 5px 5px;
   width: 100%
 }

 .debt {
   padding: 2px 5px 2px 5px;
 }

 .ldebt {
   color: $secondary-1;
   text-align: left;
 }

 .rdebt {
   color: $secondary-2;
   text-align: right;
 }
</style>
