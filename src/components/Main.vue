<template>
  <div>
    <div class="left" v-bind:class="{ 'left-landscape': landscape, 'left-portrait': !landscape }">
      <div v-bind:class="{ 'page-landscape': landscape, 'page-portrait': !landscape }">
        <page></page>
      </div>
    </div>
      <div v-bind:class="{ 'history-landscape': landscape }">
        <history v-bind:debts="debts"></history>
      </div>
  </div>
</template>

<script>
 import History from '@/components/History'
 import Page from '@/components/Page'
 
 export default {
   name: 'main',
   components: {
     History,
     Page
   },
   methods: {
     handleResize () {
       this.fullWidth = document.documentElement.clientWidth
       this.landscape = this.fullWidth > 1200
     }
   },
   mounted: function () {
     this.handleResize()
     window.addEventListener('resize', this.handleResize)
     window.scrollTo(0, 1)
   },
   beforeDestroy: function () {
     window.removeEventListener('resize', this.handleResize)
   },
   data () {
     return {
       fullWidth: document.documentElement.clientWidth,
       landscape: true,
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
 .left {
   background-color: #F8F8F8;
 }
 
 .left-landscape {
   float: left;
   width: calc(100% - 500px);
   height: 100vh;
   margin: 0px;
 }

 .left-portrait {
   height: 91vh;
   width: 100%;
 }

 .page-landscape {
   width: 700px;
   margin: auto;
   height: 100%;
 }

 .page-portrait {
   width: 100%;
 }
 
 .history-landscape {
   height: 100vh;
   overflow-y: auto;
   overflow-x: hidden;
 }
</style>
