<template>
  <div>
    <parallax-layout>
      <landing-page slot="head"></landing-page>
        <generic-title title="About" slot="balloon"></generic-title>
        <div slot="body">
          <div id="about">
            <b>iHauke</b> ist das aufgehübschte Remake einer Web-App, die ich vor einigen Jahren mal an einem öden Wochenende für unsere Studenten WG geschrieben habe.<br>
            <br>
            <b>Lange Rede, kurzer Sinn:</b> Ihr schuldet euch ständig Geld für irgendwelche Anschaffungen? Einfach schnell auf iHauke eintragen und nie wieder sinnlos Geld hin und her-überweisen 🎉
            <br>
            <br>
          </div>
          <a href="https://github.com/junpls/iHauke/"><img :src="githubIcon" alt="GitHub" height="42" width="42"></a>
          <br>
          <br>
        </div>
    </parallax-layout>
  </div>
</template>

<script>
 import SourceOfTruth from '@/sourceOfTruth'
 import LandingPage from '@/components/LandingPage'
 import GenericTitle from '@/components/lib/GenericTitle'
 import config from '@/config'
 
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
       state: SourceOfTruth,
       githubIcon: config.location + 'static/icons/github.svg'
     }
   }
 }
</script>

<style>
 #about {
   text-align: left;
   margin: 15px 20px 20px;
 }
</style>
