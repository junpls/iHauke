<template>
  <div>
    <div class="balloon-header balloon"
         :class="{ 'balloon-header-top': scrolledTop }">
      {{ title }}
    </div>
    <div class="balloon" v-if="scrolledTop"></div>
  </div>
</template>

<script>

 export default {
   name: 'balloon-header',
   props: ['title'],
   data () {
     return {
       scrolledTop: false
     }
   },
   methods: {
     handleScroll: function (event) {
       if (window.scrollY > this.$el.offsetTop) {
         this.scrolledTop = true
       } else {
         this.scrolledTop = false
       }
     }
   },
   mounted: function () {
     window.addEventListener('scroll', this.handleScroll)
   },
   beforeDestroy: function () {
     window.removeEventListener('scroll', this.handleScroll)
   }
 }
 
</script>

<style lang="scss">
 @import "./../_style.scss";
 
 .balloon-header {
   width: 100%;
   line-height: 9vh;
   background-color: $primary;
   text-align: center;
   vertical-align: middle;
   font-size: $size-3;
   font-weight: $weight-bold;
   color: white;
 }

 .balloon-header-top {
   position: fixed;
   top: 0;
 }

 .balloon {
   height: 9vh;
   margin: 0px;
 }
</style>
