<template>
  <div class="history-title">
    History
  </div>
</template>

<script>

 export default {
   name: 'history-title'
 }
 
</script>

<style lang="scss">
 @import "./../_style.scss";
 
 .history-title {
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
