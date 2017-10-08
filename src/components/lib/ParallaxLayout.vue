<template>
  <div>
    <div class="left"
         :class="{ 'left-landscape': landscape, 'left-portrait': !landscape }"
         :style="{ 'padding-top': scrollTop }">
      <div :class="{ 'page-landscape': landscape, 'page-portrait': !landscape }">
        <slot name="head"></slot>
      </div>
    </div>
    <div :class="{ 'history-landscape': landscape, 'hop-animation': jumping }">
      <div ref="balloon">
        <div class="balloon-header balloon"
             :class="{ 'balloon-header-top': scrolledTop }">
          <slot name="balloon"></slot>
        </div>
        <div class="balloon"
             v-if="scrolledTop"></div>
      </div>
      <slot name="body"></slot>
    </div>
  </div>
</template>

<script>
 import SourceOfTruth from '@/sourceOfTruth'
 import Vue from 'vue'
 
 export default {
   name: 'parallax-layout',
   data () {
     return {
       scrollTop: 0,
       scrolledTop: false,
       fullWidth: document.documentElement.clientWidth,
       landscape: SourceOfTruth.landscape,
       jumping: false
     }
   },
   props: {
     initScroll: {
       type: String,
       default: '0'
     }
   },
   methods: {
     handleResize () {
       this.fullWidth = document.documentElement.clientWidth
       this.landscape = this.fullWidth > 1200
       Vue.set(SourceOfTruth, 'landscape', this.landscape)
     },
     handleScroll (event) {
       this.scrollTop = (window.scrollY / 2) + 'px'
       if (window.scrollY > this.$refs.balloon.offsetTop) {
         this.scrolledTop = true
       } else {
         this.scrolledTop = false
       }
     },
     jump () {
       if (!this.landscape) {
         this.jumping = true
         setTimeout(() => {
           this.jumping = false
         }, 3000)
       }
     }
   },
   mounted () {
     this.handleResize()
     window.addEventListener('resize', this.handleResize)
     window.addEventListener('scroll', this.handleScroll)
   },
   beforeDestroy () {
     window.removeEventListener('resize', this.handleResize)
     window.removeEventListener('scroll', this.handleScroll)
   }
 }

</script>

<style lang="scss">
 @import "./../../_style.scss";
 
 .left {
   background-color: #F8F8F8;
   overflow: hidden;
 }
 
 .left-landscape {
   float: left;
   margin: 0px;
   width: calc(100% - 500px);
 }

 .left-portrait {
   width: 100%;
   height: calc(100vh - #{$title-height});
 }

 .page-landscape {
   width: 700px;
   margin: auto;
   height: 100vh;
 }

 .page-portrait {
   width: 100%;
   height: calc(100vh - #{$title-height});
 }
 
 .history-landscape {
   overflow-y: auto;
   overflow-x: hidden;
   height: 100vh;
 }
 
 .balloon-header-top {
   position: fixed;
   top: 0;
 }
 
 .balloon {
   width: 100%;
   margin: 0px;
   height: $title-height;
 }

 @keyframes hop {
   0%    {margin-top: 0;}
   10%   {margin-top: -50px;}
   80%   {margin-top: -50px;}
   100%  {margin-top: 0;}
 }

 .hop-animation {
   animation-name: hop;
   animation-duration: 2s;
 }
</style>
