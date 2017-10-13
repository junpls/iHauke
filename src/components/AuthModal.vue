<template>
  <form @submit.prevent="send">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Passwort</p>
      </header>
      <section class="modal-card-body">
        Dieses Board ist Passwortgeschützt
        <b-input size="is-normal"
                 type="password"
                 ref="pw"
                 v-model="password"
                 :disabled="disabled"
                 expanded password-reveal></b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot center-outer">
        <div class="center-inner">
          <button class="button is-primary" :disabled="disabled">Lass mich rein</button>
        </div>
      </footer>
    </div>
  </form>
</template>

<script>
 export default {
   name: 'authModal',
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
