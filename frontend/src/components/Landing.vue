<template>
  <div>
    <parallax-layout>
      <landing-page slot="head"></landing-page>
        <generic-title title="About" slot="balloon"></generic-title>
        <div slot="body">Hello Welt</div>
    </parallax-layout>
  </div>
</template>

<script>
 import SourceOfTruth from '@/sourceOfTruth'
 import LandingPage from '@/components/LandingPage'
 import GenericTitle from '@/components/lib/GenericTitle'
 
 import ParallaxLayout from '@/components/lib/ParallaxLayout'
 
 export default {
   name: 'landing',
   components: {
     ParallaxLayout,
     GenericTitle,
     LandingPage
   },
   data () {
     return {
       state: SourceOfTruth
     }
   }
 }
</script>

<style>
</style>
