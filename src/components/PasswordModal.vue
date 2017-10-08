<template>
  <form @submit.prevent="send">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Passwort</p>
      </header>
      <section class="modal-card-body">
        Damit nicht jeder reinguckt
        <b-input size="is-normal"
                 type="password"
                 ref="pw"
                 v-model="password"
                 placeholder="z.B. alligator3"
                 :disabled="disabled"
                 expanded password-reveal></b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot center-outer">
        <div class="center-inner">
          <button class="button" type="button" @click="$parent.close()" :disabled="disabled">Zurück</button>
          <button class="button is-primary" :disabled="disabled">Fertig</button>
        </div>
      </footer>
    </div>
  </form>
</template>

<script>
 export default {
   name: 'debtModal',
   props: ['submit'],
   data () {
     return {
       password: '',
       disabled: false
     }
   },
   mounted () {
     this.$refs.pw.focus()
   },
   methods: {
     send () {
       this.disabled = true
       this.submit(this.password).then(() => {
         this.$parent.close()
       })
     }
   }
 }
</script>

<style scoped>
 .modal-card {
   width: auto;
 }
</style>
