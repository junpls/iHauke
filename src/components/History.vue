<template>
  <div id="debt-list">
    <div class="debt"
         v-bind:class="{ ldebt: debt.user===0, rdebt: debt.user===1 }"
         v-for="debt in debts">
      <b>{{ debt.user === 0 ? 'Jan' : 'Fred' }}</b> bekommt {{ debt.gets/100 }}€ für {{ debt.reason }}
    </div>
  </div>
</template>

<script>
 
 export default {
   name: 'history',
   props: ['debts']
 }

</script>

<style lang="scss">
 @import "./../_style.scss";

 #debt-list {
   padding: 5px 5px 5px 5px;
   width: 100%
 }

 .debt {
   padding: 2px 5px 2px 5px;
 }

 .ldebt {
   color: $secondary-1;
   text-align: left;
 }

 .rdebt {
   color: $secondary-2;
   text-align: right;
 }
</style>
