<template>
  <div class="generic-title">
    {{ title }}
  </div>
</template>

<script>

 export default {
   name: 'generic-title',
   props: ['title']
 }
 
</script>

<style lang="scss">
 @import "./../../_style.scss";
 
 .generic-title {
   width: 100%;
   line-height: $title-height;
   background-color: $primary;
   text-align: center;
   vertical-align: middle;
   font-size: $size-3;
   font-weight: $weight-bold;
   color: white;
 }
</style>
