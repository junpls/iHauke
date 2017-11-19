<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
 export default {
   name: 'app'
 }
</script>

<style lang="scss">
 @import "./_style.scss";
 
 @font-face {
   font-family: GloriaHallelujah;
   src: url('./assets/fonts/Gloria_Hallelujah/GloriaHallelujah.ttf');
 }
 
 @font-face {
   font-family: PTMono;
   src: url('./assets/fonts/PT_Mono/PTM55FT.ttf');
 }
 
 body {
   font-family: "PTMono";
   margin: 0;
 }
 
 #app {
   font-family: 'PTMono', Helvetica, Arial, sans-serif;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
   text-align: center;
 }

 .modal-card {
   width: auto;
 }

 .center-outer {
   display: block;
   margin-left: auto;
   margin-right: auto;
   width: 100%;
 }

 .center-inner {
   margin: 0 auto;
 }
</style>
