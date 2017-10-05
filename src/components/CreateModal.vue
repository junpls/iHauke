<template>
  <form @submit.prevent="ack">
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Neues Board</p>
      </header>
      <section class="modal-card-body">
        Board erstellen für
        <b-field grouped>
          <b-input size="is-normal"
                   type="text"
                   placeholder="z.B. Jörg"
                   required expanded></b-input>
          und&nbsp;
          <b-input size="is-normal"
                   type="text"
                   placeholder="Thorben"
                   required expanded></b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <button class="button" type="button" @click="$parent.close()">Zurück</button>
        <button class="button is-primary">Weiter</button>
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
   methods: {
     ack () {
       this.$emit('ack')
       this.$parent.close()
     }
   }
 }
</script>

<style scoped>
 .modal-card {
   width: auto;
 }
</style>
