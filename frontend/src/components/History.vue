<template>
  <div id="debt-list">
    <div class="debt"
         v-bind:class="{ ldebt: (debt.user===0 && debt.gets >= 0), rdebt: (debt.user===1 && debt.gets >= 0) }"
         v-for="debt in debts">
      <span v-html="getDebtsString(debt.user, debt.gets, debt.reason, debt.timestamp)"></span>
    </div>
    <infinite-loading @infinite="infiniteHandler"
                      spinner="waveDots"
                      :force-use-infinite-wrapper="!landscape">
      <span slot="no-results">
        *zirp zirp*
      </span>
      <span slot="no-more"></span>
    </infinite-loading>
  </div>
</template>

<script>
 import * as util from '@/util'
 import * as Api from '@/api'
 import InfiniteLoading from 'vue-infinite-loading'

 const distance = 20

 export default {
   name: 'history',
   components: {
     InfiniteLoading
   },
   data () {
     return {
       landscape: false,
       empty: true
     }
   },
   props: ['users', 'debts'],
   methods: {
     getDebtsString (user, amount, reason, timestamp) {
       let str = timestamp.getDate() + '.' + timestamp.getMonth() + ': '
       if (amount >= 0) {
         return `${str} <b>${util.capitalize(this.users[user])}</b> bekommt ${util.toMoney(amount)} für ${reason}`
       } else {
         return `${str} <b>${util.capitalize(this.users[1 - user])}</b> hat ${util.toMoney(Math.abs(amount))} zurückgezahlt`
       }
     },
     async infiniteHandler (state) {
       let board = this.$route.params.board
       let fetched = await Api.fetchDebts(board, 'desc', distance, this.debts.length)

       if (fetched.length >= distance) {
         state.loaded()
       } else {
         if (fetched.length > 0) {
           state.loaded()
         }
         state.complete()
       }
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
