<template>
  <div>
    <parallax-layout>
      <page :state="board" slot="head"></page>
      <generic-title title="History" slot="balloon"></generic-title>
      <history slot="body" :users="board.users" :debts="board.debts"></history>
    </parallax-layout>
  </div>
</template>

<script>
 import SourceOfTruth from '@/sourceOfTruth'
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
   }
 }
</script>

<style>
</style>
