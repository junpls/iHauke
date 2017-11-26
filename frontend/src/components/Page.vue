<template>
  <div class="page">
    <div class="columns is-gapless is-mobile shrinkHeader">
      <div class="column is-1"></div>
      <div class="page-title column">iHauke</div>
      <div class="sandwich column is-2">
        <b-dropdown position="is-bottom-left">
          <button class="hiddenbutton" slot="trigger">
            <b-icon v-if="folded" icon="expand_more" size="is-large"></b-icon>
            <b-icon v-else icon="expand_less" size="is-large"></b-icon>          
          </button>

          <b-dropdown-option subheader>Hallo <span class="name">{{ capUsr(0) }}</span> und <span class="name">{{ capUsr(1) }}</span></b-dropdown-option>
          <b-dropdown-option separator/>
          <b-dropdown-option subheader>
            <b-input type="url"
                     ref="urlField"
                     @focus="this.focus"
                     :value="getLink()">
            </b-input>
            <span @click="this.focusAndCopy">
              <b-icon icon="link"></b-icon>
              Link kopieren
            </span>
          </b-dropdown-option>
          <b-dropdown-option separator/>
          <b-dropdown-option @click="this.leaveBoard">
            <b-icon icon="exit_to_app"></b-icon>
            Board verlassen
          </b-dropdown-option>
        </b-dropdown>
      </div>
    </div>
    <div class="banner"
         :style="{ 'background-image': 'url(' + imgSrc + ')' }">
    </div>
    <div class="enter">
      <span :class="{ 'blink-animation': jumping }" v-html="getDebtsString()"></span><br>
      <a class="button is-primary is-large"
         @click="isDebtModalActive = true; tooltipsActive = false">Anschreiben</a>
      <a v-if="state.balance !== 0"
         class="button is-primary is-outlined is-large"
         @click="isSettleModalActive = true">Begleichen</a>
    </div>
    
    <b-modal :active.sync="isDebtModalActive"
             has-modal-card>
      <debt-modal :users="state.users.map(this.capitalize)"
                  :submit="submitDebt">
      </debt-modal>
    </b-modal>
    
    <b-modal :active.sync="isSettleModalActive"
             has-modal-card>
      <settle-modal :balance="state.balance"
                    :submit="submitSettle">
      </settle-modal>
    </b-modal>
  </div>
</template>

<script>
 import DebtModal from '@/components/DebtModal'
 import SettleModal from '@/components/SettleModal'
 import Banners from '@/banners'
 import config from '@/config'
 import * as Api from '@/api'
 import * as util from '@/util'

 // Some browsers take time to focus an input
 const COPY_TIMEOUT = 500
 
 export default {
   name: 'page',
   components: {
     DebtModal,
     SettleModal
   },
   props: ['state'],
   data () {
     return {
       isDebtModalActive: false,
       isSettleModalActive: false,
       imgSrc: config.location + 'static/banners/' + Banners[Math.floor(Math.random() * Banners.length)],
       jumping: false,
       folded: true
     }
   },
   computed: {
     welcomeLabel () {
       return `Willkommen ${this.state.users[0]} und ${this.state.users[1]}!
Hier könnt ihr ab jetzt eure Schulden verwalten.`
     }
   },
   methods: {
     unfold () {
       this.folded = !this.folded
     },
     getBorrower () {
       return util.capitalize(this.state.balance > 0 ? this.state.users[0] : this.state.users[1])
     },
     getDebtsString () {
       if (this.state.balance === 0) {
         return 'Ihr seid quitt'
       } else {
         return `<b>${this.getBorrower()}</b> bekommt noch <b>${util.toMoney(Math.abs(this.state.balance))}</b>`
       }
     },
     capUsr (id) {
       return util.capitalize(this.state.users[id])
     },
     capitalize (str) {
       return util.capitalize(str)
     },
     getLink () {
       return window.location.href
     },
     async submitDebt (person, money, reason) {
       await Api.createDebt(this.state.id, person, money, reason)
       this.jumping = true
       setTimeout(() => {
         this.jumping = false
       }, 3000)
       this.$emit('updateHistory')
     },
     async submitSettle (person, money) {
       await Api.createDebt(this.state.id, person, money, '')
       this.jumping = true
       setTimeout(() => {
         this.jumping = false
       }, 3000)
       this.$emit('updateHistory')
     },
     focus () {
       this.$refs.urlField.focus()
     },
     focusAndCopy (wut) {
       this.$refs.urlField.focus()
       setTimeout(() => {
         if (document.execCommand('copy')) {
           this.$toast.open({
             message: 'Kopiert!',
             type: 'is-success'
           })
         } else {
           this.$toast.open({
             message: 'Hat nicht geklappt :( Versuch\'s manuell.',
             type: 'is-danger'
           })
         }
       }, COPY_TIMEOUT)
     },
     leaveBoard () {
       this.$router.push({ name: 'landing' })
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

 .button {
   margin-bottom: 5px;
 }

 .shrinkHeader {
   margin-bottom: 0px !important;
 }
 
 .page-title {
   width: 100%;
   font-size: 12vh;
   font-weight: bold;
 }

 .sandwich {
   line-height: 120px;
 }
 
 .banner {
   width: 100%;
   height: 42%;
   background-size: cover;
   background-position: center;
 }

 .enter {
   width: 100%;
   margin: 0px;
   margin-top: 3vh;
 }

 .hiddenbutton {
   padding: 0;
   border: none;
   background: none;
 }

 .name {
   font-weight: bold;
 }

 @keyframes blink {
   0%    {opacity: 0;}
   25%   {opacity: 1;}
   60%   {opacity: 1;}
   80%   {opacity: .5;}
   100%  {opacity: 1;}
 }

 .blink-animation {
   animation-name: blink;
   animation-duration: 1s;
 }
</style>
