<template>
  <div>
    <div class="left"
         :class="{ 'left-landscape': landscape, 'left-portrait': !landscape }"
         :style="{ 'padding-top': scrollTop }">
      <div :class="{ 'page-landscape': landscape, 'page-portrait': !landscape }">
        <slot name="head"></slot>
      </div>
    </div>
    <div :class="{ 'history-landscape': landscape }">
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
 export default {
   name: 'parallax-layout',
   data () {
     return {
       scrollTop: 0,
       scrolledTop: false,
       fullWidth: document.documentElement.clientWidth,
       landscape: true
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
     },
     handleScroll: function (event) {
       this.scrollTop = (window.scrollY / 2) + 'px'
       if (window.scrollY > this.$refs.balloon.offsetTop) {
         this.scrolledTop = true
       } else {
         this.scrolledTop = false
       }
     }
   },
   mounted: function () {
     this.handleResize()
     window.addEventListener('resize', this.handleResize)
     window.addEventListener('scroll', this.handleScroll)
   },
   beforeDestroy: function () {
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
   height: calc(100vh - #{$title-height});
 }
 
 .left-landscape {
   float: left;
   margin: 0px;
   width: calc(100% - 500px);
 }

 .left-portrait {
   width: 100%;
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
</style>
