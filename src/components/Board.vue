<template>
  <div>
    <parallax-layout>
      <page :state="board" slot="head"></page>
      <history-title slot="balloon"></history-title>
      <history slot="body" :users="board.users" :debts="board.debts"></history>
    </parallax-layout>
  </div>
</template>

<script>
 import SourceOfTruth from '@/sourceOfTruth'
 import Page from '@/components/Page'
 import HistoryTitle from '@/components/HistoryTitle'
 import History from '@/components/History'
 
 import ParallaxLayout from '@/components/lib/ParallaxLayout'
 
 export default {
   name: 'main',
   components: {
     History,
     Page,
     ParallaxLayout,
     HistoryTitle
   },
   data () {
     return {
       state: SourceOfTruth,
       board: SourceOfTruth.boards[this.$route.params.board]
     }
   }
 }
</script>

<style>
</style>
