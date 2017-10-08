<template>
  <div>
    <parallax-layout ref="parallaxLayout">
      <page :state="board" v-on:updateHistory="historyUpdated" slot="head"></page>
      <generic-title title="History" slot="balloon"></generic-title>
      <history slot="body" :users="board.users" :debts="board.debts"></history>
    </parallax-layout>
  </div>
</template>

<script>
 import SourceOfTruth from '@/sourceOfTruth'
 import * as Api from '@/api'
 import Page from '@/components/Page'
 import GenericTitle from '@/components/lib/GenericTitle'
 import History from '@/components/History'
 
 import ParallaxLayout from '@/components/lib/ParallaxLayout'
 
 export default {
   name: 'board',
   components: {
     History,
     Page,
     ParallaxLayout,
     GenericTitle
   },
   data () {
     return {
       state: SourceOfTruth,
       board: SourceOfTruth.boards[this.$route.params.board]
     }
   },
   created () {
     Api.fetchBoard(this.$route.params.board)
   },
   methods: {
     historyUpdated () {
       this.$refs.parallaxLayout.jump()
     }
   }
 }
</script>

<style>

</style>
