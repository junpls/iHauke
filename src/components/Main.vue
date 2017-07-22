<template>
  <div>
    <parallax-layout>
      <page slot="head"></page>
      <history-title slot="balloon"></history-title>
      <history slot="body" :debts="debts"></history>
    </parallax-layout>
  </div>
</template>

<script>
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
       debts: [{
         user: 0,
         gets: 100,
         reason: 'Spagheten, Pesto, Kaffee'
       }, {
         user: 0,
         gets: 101,
         reason: 'Müllbeutel'
       }, {
         user: 1,
         gets: 1,
         reason: 'Kackpappe'
       }, {
         user: 1,
         gets: 1,
         reason: 'Kackpappe'
       }, {
         user: 1,
         gets: 1,
         reason: 'Kackpappe'
       }, {
         user: 1,
         gets: 1,
         reason: 'Kackpappe'
       }, {
         user: 1,
         gets: 1,
         reason: 'Kackpappe'
       }, {
         user: 1,
         gets: 1,
         reason: 'Kackpappe'
       }, {
         user: 1,
         gets: 1,
         reason: 'Kackpappe'
       }, {
         user: 1,
         gets: 1,
         reason: 'Kackpappe'
       }, {
         user: 1,
         gets: 1,
         reason: 'Kackpappe'
       }, {
         user: 1,
         gets: 1,
         reason: 'Kackpappe'
       }, {
         user: 1,
         gets: 1,
         reason: 'Kackpappe'
       }, {
         user: 1,
         gets: 1,
         reason: 'Kackpappe'
       }, {
         user: 1,
         gets: 1,
         reason: 'Kackpappe'
       }, {
         user: 1,
         gets: 1,
         reason: 'Kackpappe'
       }, {
         user: 1,
         gets: 1,
         reason: 'Kackpappe'
       }, {
         user: 1,
         gets: 1,
         reason: 'Kackpappe'
       }, {
         user: 1,
         gets: 1,
         reason: 'Kackpappe'
       }, {
         user: 1,
         gets: 1,
         reason: 'Kackpappe'
       }, {
         user: 1,
         gets: 1,
         reason: 'Kackpappe'
       }, {
         user: 1,
         gets: 1,
         reason: 'Kackpappe'
       }, {
         user: 1,
         gets: 1,
         reason: 'Kackpappe'
       }, {
         user: 1,
         gets: 1,
         reason: 'Kackpappe'
       }, {
         user: 1,
         gets: 1,
         reason: 'Kackpappe'
       }, {
         user: 1,
         gets: 1,
         reason: 'Kackpappe'
       }, {
         user: 1,
         gets: 1,
         reason: 'Kackpappe'
       }, {
         user: 1,
         gets: 1,
         reason: 'Kackpappe'
       }, {
         user: 1,
         gets: 1,
         reason: 'Kackpappe'
       }, {
         user: 1,
         gets: 1,
         reason: 'Kackpappe'
       }, {
         user: 1,
         gets: 1,
         reason: 'Kackpappe'
       }, {
         user: 1,
         gets: 1,
         reason: 'Kackpappe'
       }, {
         user: 1,
         gets: 1,
         reason: 'Kackpappe'
       }, {
         user: 1,
         gets: 1,
         reason: 'Kackpappe'
       }, {
         user: 1,
         gets: 1,
         reason: 'Kackpappe'
       }, {
         user: 1,
         gets: 1,
         reason: 'Kackpappe'
       }, {
         user: 1,
         gets: 1,
         reason: 'Kackpappe'
       }, {
         user: 1,
         gets: 1,
         reason: 'Kackpappe'
       }, {
         user: 1,
         gets: 1,
         reason: 'Kackpappe'
       }, {
         user: 1,
         gets: 1,
         reason: 'Kackpappe'
       }, {
         user: 1,
         gets: 1,
         reason: 'Kackpappe'
       }, {
         user: 1,
         gets: 1,
         reason: 'Kackpappe'
       }, {
         user: 1,
         gets: 1,
         reason: 'Kackpappe'
       }, {
         user: 1,
         gets: 1,
         reason: 'Kackpappe'
       }]
     }
   }
 }
 
</script>

<style>
</style>
