<template>
  <div class="page">
    <div class="page-title">
      iHauke
    </div>
    <div class="description">
      Ein semiprofessionelles Finanzverwaltungssystem für&nbsp;Zweier&nbsp;WGs
    </div>
    <div class="banner"
         :style="{ 'background-image': 'url(' + imgSrc + ')' }">
    </div>
    <div style="height: 20%; margin-top: -20px" class="vcenter">
      <b>Neues Board -> </b>
      <span @click="isCreateModalActive = true">
        <plus size="20vh"></plus>
      </span>
    </div>
    <b-modal :active.sync="isCreateModalActive"
             has-modal-card>
      <create-modal :submit="namesEntered"></create-modal>
    </b-modal>
    <b-modal :active.sync="isPasswordModalActive"
             has-modal-card>
      <password-modal :submit="passwordEntered"></password-modal>
    </b-modal>
  </div>
</template>

<script>
 import Banners from '@/banners'
 import Plus from '@/components/lib/Plus'
 import CreateModal from '@/components/CreateModal'
 import PasswordModal from '@/components/PasswordModal'
 import config from '@/config'
 import * as Api from '@/api'
 // import * as util from '@/util'

 export default {
   name: 'landing-page',
   components: {
     Plus,
     CreateModal,
     PasswordModal
   },
   props: ['state'],
   data () {
     return {
       imgSrc: config.location + 'static/banners/' + Banners[Math.floor(Math.random() * Banners.length)],
       isCreateModalActive: false,
       isPasswordModalActive: false,
       create: {
         users: [],
         pw: ''
       }
     }
   },
   methods: {
     async namesEntered (users) {
       this.create.users = users
       this.isPasswordModalActive = true
     },
     async passwordEntered (pw) {
       this.create.pw = pw
       let created = await Api.createBoard(this.create.users, this.create.pw)
       this.$router.push({name: 'board', params: {board: created.id}})
     }
   }
 }

</script>

<style lang="scss">
 @import "./../_style.scss";

 .page {
   background-color: white;
   font-size: $size-4;
   height: 100%;
 }

 .page-title {
   width: 100%;
   height: 17%;
   font-size: 12vh;
   font-weight: bold;
 }

 .banner {
   width: 100%;
   height: 45%;
   background-size: cover;
   background-position: center;
 }

 .description {
   font-size: $size-6;
   padding: 0px 10px;
   margin-bottom: 10px;
 }

 .vcenter {
   display: flex;
   justify-content: center;
   align-items: center;
 }

</style>
