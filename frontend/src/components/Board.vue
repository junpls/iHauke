<template>
  <div>
    <parallax-layout ref="parallaxLayout">
      <page :state="board" v-on:updateHistory="historyUpdated" slot="head"></page>
      <generic-title title="History" slot="balloon"></generic-title>
      <history slot="body" :users="board.users" :debts="board.debts"></history>
    </parallax-layout>
    <b-modal :active.sync="isAuthModalActive"
             :canCancel="false"
             has-modal-card>
      <auth-modal :submit="authSubmit">
      </auth-modal>
    </b-modal>
  </div>
</template>

<script>
 import SourceOfTruth from '@/sourceOfTruth'
 import * as Api from '@/api'
 import Page from '@/components/Page'
 import GenericTitle from '@/components/lib/GenericTitle'
 import History from '@/components/History'
 import AuthModal from '@/components/AuthModal'
 import Vue from 'vue'
 
 import ParallaxLayout from '@/components/lib/ParallaxLayout'
 
 export default {
   name: 'board',
   components: {
     History,
     Page,
     ParallaxLayout,
     GenericTitle,
     AuthModal
   },
   data () {
     return {
       isAuthModalActive: false,
       state: SourceOfTruth,
       board: SourceOfTruth.boards[this.$route.params.board]
     }
   },
   beforeCreate () {
     if (!SourceOfTruth.boards.hasOwnProperty(this.$route.params.board)) {
       Vue.set(SourceOfTruth.boards, this.$route.params.board, {
         id: this.$route.params.board,
         users: ['...', '...'],
         balance: 0,
         debts: [],
         auth: {
           username: this.$route.params.board,
           password: window.localStorage.getItem('pw_' + this.$route.params.board)
         }
       })
     }
   },
   created () {
     this.tryPoll()
   },
   methods: {
     historyUpdated () {
       this.$refs.parallaxLayout.jump()
     },
     async tryPoll () {
       try {
         await Api.fetchBoard(this.$route.params.board)
       } catch (e) {
         if (e.hasOwnProperty('response') &&
             e.response.hasOwnProperty('status') &&
             (e.response.status === 403 || e.response.status === 401)) {
           this.isAuthModalActive = true
         }
         throw e
       }
     },
     async authSubmit (pw) {
       Api.setAuth(this.$route.params.board, pw)
       await this.tryPoll()
       await Api.fetchDebts(this.$route.params.board, 'desc', 20, 0)
     }
   }
 }
</script>

<style>

</style>
