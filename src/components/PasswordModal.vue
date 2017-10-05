<template>
  <form action="">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Passwort</p>
      </header>
      <section class="modal-card-body">
        Damit nicht jeder reinguckt
        <b-input size="is-normal"
                 type="password"
                 ref="pw"
                 placeholder="alligator3"
                 required expanded password-reveal></b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">Zurück</button>
        <button class="button is-primary">Fertig</button>
      </footer>
    </div>
  </form>
</template>

<script>
 export default {
   name: 'debtModal',
   data () {
     return {
       users: ['a', 'b']
     }
   },
   mounted () {
     this.$refs.pw.focus()
   }
 }
</script>

<style scoped>
 .modal-card {
   width: auto;
 }
</style>
